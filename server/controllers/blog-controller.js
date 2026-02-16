import Blog from '../models/blog.js';

/**
 * =================================================================================
 *  BLOG CONTROLLER (Business Logic Layer)
 * ---------------------------------------------------------------------------------
 *  This file contains all the business logic for Blog operations.
 *  It handles CRUD operations and interacts with the Blog Model.
 * =================================================================================
 */

// ==================== CREATE BLOG ====================
/**
 * Create a new blog post
 * @route POST /api/blog/create
 * @access Private (Requires Authentication)
 */
export const createBlog = async (req, res) => {
    try {
        const blogData = {
            ...req.body,
            userId: req.user?.id || req.body.userId, // From JWT token
            username: req.user?.username || req.body.username
        };

        const blog = new Blog(blogData);
        await blog.save();

        return res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        console.error('❌ Error in createBlog:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to create blog post',
            error: error.message
        });
    }
};

// ==================== GET SINGLE BLOG ====================
/**
 * Get a single blog post by ID
 * @route GET /api/blog/:id
 * @access Public
 */
export const getBlog = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('🔍 Fetching blog with ID:', id);

        // Try to find in new Blog model first
        let blog = await Blog.findById(id);

        if (blog) {
            // Increment view count
            blog.views += 1;
            await blog.save();

            console.log('✅ Blog found in new model:', blog.title);

            return res.status(200).json({
                success: true,
                data: blog
            });
        }

        // If not found, try legacy Post model
        console.log('⚠️ Not found in Blog model, checking legacy Post model...');

        try {
            const legacyPost = await Post.findById(id).lean();

            if (legacyPost) {
                console.log('✅ Legacy post found:', legacyPost.title);

                // Transform legacy post to blog format
                const transformedBlog = {
                    _id: legacyPost._id,
                    title: legacyPost.title || 'Untitled',
                    description: legacyPost.description || '',
                    story: legacyPost.story || '',
                    picture: legacyPost.picture || '',
                    username: legacyPost.username || 'Anonymous',
                    userId: legacyPost.userId,
                    category: legacyPost.categories || 'Blog',
                    createdAt: legacyPost.createDate || legacyPost.createdAt || new Date(),
                    updatedAt: legacyPost.createDate || new Date(),
                    views: 0,
                    likes: 0,
                    status: 'published',
                    isLegacy: true,
                    // Include any additional fields from legacy post
                    liveLink: legacyPost.liveLink,
                    githubLink: legacyPost.githubLink,
                    techStack: legacyPost.techStack,
                    mediaType: legacyPost.mediaType
                };

                return res.status(200).json({
                    success: true,
                    data: transformedBlog
                });
            }
        } catch (legacyError) {
            console.error('⚠️ Error checking legacy Post model:', legacyError.message);
        }

        // Not found in either model
        console.log('❌ Blog not found in any model');
        return res.status(404).json({
            success: false,
            message: 'Blog post not found'
        });

    } catch (error) {
        console.error('❌ Error in getBlog:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch blog post',
            error: error.message
        });
    }
};

// ==================== GET ALL BLOGS ====================
/**
 * Get all blog posts with optional filtering
 * @route GET /api/blog/all
 * @access Public
 */
import Post from '../models/post.js'; // Import Legacy Post Model

// ==================== GET ALL BLOGS ====================
/**
 * Get all blog posts with optional filtering
 * @route GET /api/blog/all
 * @access Public
 */
export const getAllBlogs = async (req, res) => {
    try {
        const { category, userId, status, search, page = 1, limit = 10 } = req.query;

        // --- 1. Fetch NEW Blogs (MVC) ---
        const blogQuery = {};
        if (category) blogQuery.category = category;
        if (userId) blogQuery.userId = userId;
        if (status) blogQuery.status = status;
        else blogQuery.status = 'published';

        if (search) {
            blogQuery.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const newBlogs = await Blog.find(blogQuery).lean();

        // --- 2. Fetch OLD Posts (Legacy) ---
        let legacyPosts = [];
        try {
            // Only fetch if status is published (legacy posts don't have status, assume published)
            if (!status || status === 'published') {
                const postQuery = {};
                if (category) postQuery.categories = category;
                if (userId) postQuery.userId = userId;
                if (search) {
                    postQuery.$or = [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ];
                }

                // Broad filter to capture potential blog content from legacy posts
                if (!category) {
                    postQuery.categories = { $in: ['Blog', 'Tech', 'Code', 'Story'] };
                }

                const rawPosts = await Post.find(postQuery).lean();

                if (rawPosts && rawPosts.length > 0) {
                    legacyPosts = rawPosts.map(post => ({
                        _id: post._id,
                        title: post.title || 'Untitled',
                        description: post.description || '',
                        picture: post.picture || '',
                        username: post.username || 'Anonymous',
                        userId: post.userId,
                        category: post.categories || 'Blog',
                        createdAt: post.createDate || post.createdAt || new Date(),
                        updatedAt: post.createDate || new Date(),
                        views: 0,
                        likes: 0,
                        status: 'published',
                        isLegacy: true
                    }));
                }
            }
        } catch (legacyError) {
            console.error("⚠️ Failed to fetch legacy posts:", legacyError.message);
            // Non-blocking error - continue with new blogs
        }

        // --- 3. Merge & Sort ---
        const allContent = [...newBlogs, ...legacyPosts];

        // Sort by Date Descending (Newest First)
        allContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // --- 4. Pagination (In-Memory) ---
        const total = allContent.length;
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedResults = allContent.slice(startIndex, endIndex);

        console.log(`📚 Found ${newBlogs.length} new blogs & ${legacyPosts.length} legacy posts. Total: ${total}`);

        return res.status(200).json({
            success: true,
            data: paginatedResults,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('❌ Error in getAllBlogs:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch blog posts',
            error: error.message
        });
    }
};

// ==================== GET BLOGS BY USER ====================
/**
 * Get all blogs by a specific user
 * @route GET /api/blog/user/:userId
 * @access Public
 */
export const getBlogsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const blogs = await Blog.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('❌ Error in getBlogsByUser:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user blogs',
            error: error.message
        });
    }
};

// ==================== UPDATE BLOG ====================
/**
 * Update a blog post
 * @route PUT /api/blog/update/:id
 * @access Private (Only author can update)
 */
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id || req.body.userId;

        // Find the blog
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Check if user is the author
        if (blog.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this blog'
            });
        }

        // Update the blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        console.log('✅ Blog updated:', updatedBlog.title);

        return res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        console.error('❌ Error in updateBlog:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to update blog post',
            error: error.message
        });
    }
};

// ==================== DELETE BLOG ====================
/**
 * Delete a blog post
 * @route DELETE /api/blog/delete/:id
 * @access Private (Only author can delete)
 */
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Extract userId from multiple possible sources
        const userId = req.user?.id ||
            req.user?._id ||
            req.user?.userId ||
            req.body?.userId;

        console.log('🗑️ Delete request for blog:', id);
        console.log('👤 Full req.user object:', req.user);
        console.log('👤 Extracted User ID:', userId);

        if (!userId) {
            console.log('❌ No user ID found - authentication issue');
            return res.status(401).json({
                success: false,
                message: 'User authentication failed. Please login again.'
            });
        }

        // Find the blog
        const blog = await Blog.findById(id);

        if (!blog) {
            console.log('❌ Blog not found in database');
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        console.log('📝 Blog found:', blog.title);
        console.log('👤 Blog author ID:', blog.userId.toString());
        console.log('👤 Current user ID:', userId.toString());

        // Check if user is the author
        if (blog.userId.toString() !== userId.toString()) {
            console.log('⛔ Authorization failed - user is not the author');
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this blog'
            });
        }

        await blog.deleteOne();

        console.log('✅ Blog deleted successfully:', blog.title);

        return res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error in deleteBlog:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete blog post',
            error: error.message
        });
    }
};

// ==================== LIKE BLOG ====================
/**
 * Like/Unlike a blog post
 * @route POST /api/blog/like/:id
 * @access Private
 */
export const toggleLikeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'like' or 'unlike'

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        if (action === 'like') {
            blog.likes += 1;
        } else if (action === 'unlike' && blog.likes > 0) {
            blog.likes -= 1;
        }

        await blog.save();

        return res.status(200).json({
            success: true,
            message: `Blog ${action}d successfully`,
            likes: blog.likes
        });
    } catch (error) {
        console.error('❌ Error in toggleLikeBlog:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update likes',
            error: error.message
        });
    }
};

// ==================== GET BLOG STATS ====================
/**
 * Get statistics for blogs
 * @route GET /api/blog/stats
 * @access Public
 */
export const getBlogStats = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments({ status: 'published' });
        const totalViews = await Blog.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);
        const totalLikes = await Blog.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: null, total: { $sum: '$likes' } } }
        ]);

        const categoryStats = await Blog.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalBlogs,
                totalViews: totalViews[0]?.total || 0,
                totalLikes: totalLikes[0]?.total || 0,
                categoryStats
            }
        });
    } catch (error) {
        console.error('❌ Error in getBlogStats:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch blog statistics',
            error: error.message
        });
    }
};
