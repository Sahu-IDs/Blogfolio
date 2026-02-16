// Portfolio & Blog Categories Constants
export const PORTFOLIO_CATEGORIES = [
    'Name',
    'Hero',
    'Skill',
    'Project',
    'Education',
    'Certificate',
    'Experience',
    'Portfolio',
    'Dev',
    'Code'
];

export const BLOG_CATEGORIES = [
    'Technology',
    'Tutorial',
    'News',
    'Review',
    'Development',
    'Design',
    'Career'
];

// Owner Configuration
export const OWNER_USER_ID = '697b9fcebc927aa3691a0231';

// API Response Messages
export const MESSAGES = {
    SUCCESS: {
        CREATED: 'Created successfully',
        UPDATED: 'Updated successfully',
        DELETED: 'Deleted successfully',
        FETCHED: 'Data fetched successfully'
    },
    ERROR: {
        NOT_FOUND: 'Resource not found',
        UNAUTHORIZED: 'Unauthorized access',
        VALIDATION_FAILED: 'Validation failed',
        SERVER_ERROR: 'Internal server error'
    }
};

// Pagination Defaults
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};

export default {
    PORTFOLIO_CATEGORIES,
    BLOG_CATEGORIES,
    OWNER_USER_ID,
    MESSAGES,
    PAGINATION
};
