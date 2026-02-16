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
