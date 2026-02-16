// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occurred while fetching response from server. Please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'Server did not respond. Please check your internet connection or try again later.'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later'
    }
}

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: '/', method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false }
export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST', authenticate: false },
    userLogin: { url: '/login', method: 'POST', authenticate: false },
    getAllUsers: { url: '/users', method: 'GET', authenticate: true },
    uploadFile: { url: '/file/upload', method: 'POST', authenticate: false },
    createPost: { url: '/create', method: 'POST', authenticate: true },
    getAllPosts: { url: '/posts', method: 'GET', query: true, authenticate: false },
    getPostById: { url: '/post', method: 'GET', params: true, authenticate: false },
    deletePost: { url: '/delete', method: 'DELETE', params: true, authenticate: true },
    updatePost: { url: '/update', method: 'PUT', params: true, authenticate: true },
    newComment: { url: '/comment/new', method: 'POST', authenticate: true },
    getAllComments: { url: '/comments', method: 'GET', params: true, authenticate: false },
    deleteComment: { url: '/comment/delete', method: 'DELETE', query: true, authenticate: true },
    createPortfolioItem: { url: '/portfolio/add', method: 'POST', authenticate: true }, // Updated
    getPortfolioByUserId: { url: '/portfolio/user', method: 'GET', params: true, authenticate: false }, // Updated to params
    getAllPortfolios: { url: '/portfolio/all', method: 'GET', authenticate: false }, // Updated
    updatePortfolioItem: { url: '/portfolio/update', method: 'PUT', params: true, authenticate: true }, // Updated
    deletePortfolioItem: { url: '/portfolio/delete', method: 'DELETE', params: true, authenticate: true }, // Updated
    newMessage: { url: '/message/new', method: 'POST', authenticate: false }, // Public Access

    // BLOG MVC ROUTES
    createBlog: { url: '/api/blog/create', method: 'POST', authenticate: true },
    getAllBlogs: { url: '/api/blog/all', method: 'GET', query: true, authenticate: false },
    getBlogById: { url: '/api/blog', method: 'GET', params: true, authenticate: false },
    getBlogsByUser: { url: '/api/blog/user', method: 'GET', params: true, authenticate: false },
    updateBlog: { url: '/api/blog/update', method: 'PUT', params: true, authenticate: true },
    deleteBlog: { url: '/api/blog/delete', method: 'DELETE', params: true, authenticate: true },
    likeBlog: { url: '/api/blog/like', method: 'POST', params: true, authenticate: true },
    getBlogStats: { url: '/api/blog/stats/overview', method: 'GET', authenticate: false }
}