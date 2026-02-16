import Post from '../models/post.js';

export const createPost = async (req, res) => {
    try {
        // Force user credentials from token to prevent spoofing
        const post = new Post({
            ...req.body,
            username: req.user.username,
            userId: req.user._id
        });
        await post.save();

        return res.status(200).json({ isSuccess: true, msg: 'Post saved successfully', data: post });
    } catch (error) {
        console.error("Error in createPost:", error);
        return res.status(500).json({ isSuccess: false, msg: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        console.log("🔍 SERVER: Fetching post with ID:", req.params.id);
        const post = await Post.findById(req.params.id);
        console.log("📦 SERVER: Found post:", post ? 'YES' : 'NO');
        return res.status(200).json({ isSuccess: true, data: post });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try {
        if (category)
            posts = await Post.find({ categories: { $regex: new RegExp(`^${category}$`, 'i') } });
        else
            posts = await Post.find({});

        return res.status(200).json({ isSuccess: true, data: posts });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        return res.status(500).json({ msg: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Ownership Check: Allow if user is Owner OR Admin
        // req.user comes from authenticateToken middleware
        if (post.userId !== req.user._id && req.user.role !== 'admin') {
            return res.status(403).json({ isSuccess: false, msg: 'Access Denied: You can only edit your own posts.' });
        }

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({ isSuccess: true, msg: 'Post updated successfully' });
    } catch (error) {
        console.error("Error in updatePost:", error);
        return res.status(500).json({ isSuccess: false, msg: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ isSuccess: false, msg: 'Post not found' });
        }

        // Ownership Check: Allow if user is Owner OR Admin
        if (post.userId !== req.user._id && req.user.role !== 'admin') {
            return res.status(403).json({ isSuccess: false, msg: 'Access Denied: You can only delete your own posts.' });
        }

        await post.deleteOne();
        return res.status(200).json({ isSuccess: true, msg: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({ isSuccess: false, msg: error.message });
    }
}
