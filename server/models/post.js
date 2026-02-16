import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: function() {
            return this.categories === 'Blog';
        }
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createDate: {
        type: Date
    },
    techStack: { type: String },
    liveLink: { type: String },
    githubLink: { type: String },
    skills: { type: String },
    linkedIn: { type: String },
    instagram: { type: String },
    project: { type: String },
    blog: { type: String },
    portfolio: { type: String },
    contact: { type: String }
    


});

const post = mongoose.model('post', postSchema);

export default post;