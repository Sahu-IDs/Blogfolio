import mongoose from 'mongoose';

/**
 * =================================================================================
 *  BLOG MODEL (Schema Definition)
 * ---------------------------------------------------------------------------------
 *  This defines the structure of a Blog Post in MongoDB.
 *  It includes validation rules and default values.
 * =================================================================================
 */

const blogSchema = mongoose.Schema({
    // Basic Information
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },

    description: {
        type: String,
        trim: true,
        default: '',
        minlength: [10, 'Description must be at least 10 characters long']
    },

    story: {
        type: String,
        trim: true,
        default: ''
    },

    picture: {
        type: String,
        default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
    },

    mediaType: {
        type: String,
        enum: ['Image', 'Video', 'Audio'],
        default: 'Image'
    },

    // Project/Tech Related Fields
    techStack: {
        type: String,
        default: ''
    },

    githubLink: {
        type: String,
        default: ''
    },

    liveLink: {
        type: String,
        default: ''
    },

    // Author Information
    username: {
        type: String,
        required: [true, 'Author username is required']
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    // Categorization
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Blog',
            'Story',
            'Technology',
            'Lifestyle',
            'Travel',
            'Food',
            'Health',
            'Business',
            'Education',
            'Tutorial',
            'News',
            'Review',
            'Other'
        ],
        default: 'Blog'
    },

    tags: [{
        type: String,
        trim: true
    }],

    // Metadata
    views: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt
});

// Index for better query performance
blogSchema.index({ userId: 1, createdAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ status: 1 });

// Virtual for comment count (if you have comments)
blogSchema.virtual('commentCount', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',
    count: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
