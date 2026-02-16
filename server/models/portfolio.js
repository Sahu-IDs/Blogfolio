import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    categories: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    techStack: {
        type: String,
        default: ''
    },
    skills: {
        type: String,
        default: ''
    },
    liveLink: {
        type: String,
        default: ''
    },
    githubLink: {
        type: String,
        default: ''
    },
    linkedIn: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    contact: {
        type: String,
        default: ''
    },
    mediaType: {
        type: String,
        default: 'Image'
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

const Portfolio = mongoose.model('portfolio', portfolioSchema);

export default Portfolio;