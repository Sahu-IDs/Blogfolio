export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const addElipsis = (str, limit) => {
    if (!str) return '';
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

export const getType = (value, body) => {
    if (value.params) {
        // If it's a string, it's likely being handled as a path param (e.g. /post/:id)
        // so we don't want to add it as a query param (?0=...)
        if (typeof body === 'string') return {};
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { params: body }
        } else {
            return { params: { id: body } }
        }
    }
    return {};
}

// Helper to fix image URLs (localhost -> production)
export const fixImageUrl = (url) => {
    if (!url) return '';
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    if (url.includes('localhost:8000')) {
        return url.replace('http://localhost:8000', API_URL);
    }
    // Handle relative path if passed
    if (url.startsWith('/file/')) {
        return `${API_URL}${url}`;
    }
    return url;
}
