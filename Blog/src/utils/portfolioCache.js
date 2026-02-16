// Portfolio Cache Utility Functions

/**
 * Clear all portfolio-related cache from localStorage
 */
export const clearPortfolioCache = () => {
    const keys = Object.keys(localStorage);
    const portfolioKeys = keys.filter(key => key.startsWith('portfolio_'));

    portfolioKeys.forEach(key => {
        localStorage.removeItem(key);
    });

    console.log(`🗑️ Cleared ${portfolioKeys.length} portfolio cache entries`);
    return portfolioKeys.length;
};

/**
 * Clear cache for a specific user
 * @param {string} userId - The user ID
 */
export const clearUserCache = (userId) => {
    const cacheKey = `portfolio_user_${userId}`;
    const timestampKey = `${cacheKey}_timestamp`;

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(timestampKey);

    console.log(`🗑️ Cleared cache for user: ${userId}`);
};

/**
 * Clear the "all users" portfolio cache
 */
export const clearAllUsersCache = () => {
    localStorage.removeItem('portfolio_all_users');
    localStorage.removeItem('portfolio_all_users_timestamp');

    console.log('🗑️ Cleared all users portfolio cache');
};

/**
 * Get cache info for debugging
 */
export const getCacheInfo = () => {
    const keys = Object.keys(localStorage);
    const portfolioKeys = keys.filter(key => key.startsWith('portfolio_'));

    const info = portfolioKeys.map(key => {
        const data = localStorage.getItem(key);
        const timestamp = localStorage.getItem(`${key}_timestamp`);

        return {
            key,
            size: data ? `${(data.length / 1024).toFixed(2)} KB` : 'N/A',
            timestamp: timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'N/A',
            age: timestamp ? `${((Date.now() - parseInt(timestamp)) / 1000).toFixed(0)}s ago` : 'N/A'
        };
    });

    console.table(info);
    return info;
};

/**
 * Force refresh portfolio data (clear cache and reload)
 * @param {string} userId - The user ID (optional, defaults to current user)
 */
export const forceRefreshPortfolio = (userId = null) => {
    if (userId) {
        clearUserCache(userId);
    } else {
        clearPortfolioCache();
    }

    // Reload the page to fetch fresh data
    window.location.reload();
};

// Make functions available globally for debugging in browser console
if (typeof window !== 'undefined') {
    window.portfolioCache = {
        clear: clearPortfolioCache,
        clearUser: clearUserCache,
        clearAll: clearAllUsersCache,
        info: getCacheInfo,
        refresh: forceRefreshPortfolio
    };

    console.log('💡 Portfolio cache utilities available at window.portfolioCache');
    console.log('   - portfolioCache.clear() - Clear all cache');
    console.log('   - portfolioCache.clearUser(userId) - Clear user cache');
    console.log('   - portfolioCache.info() - View cache info');
    console.log('   - portfolioCache.refresh() - Force refresh');
}
