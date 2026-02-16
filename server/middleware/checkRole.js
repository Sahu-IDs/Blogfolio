
/**
 * Middleware to restrict access based on user roles (RBAC)
 * @param {string[]} allowedRoles - Array of roles allowed to access the route (e.g., ['admin'])
 */
export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Ensure user is authenticated first
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized: Authentication required before role check.' });
        }

        const userRole = req.user.role || 'user'; // Default to 'user'

        if (!allowedRoles.includes(userRole)) {
            console.warn(`[Security] Access Denied: User '${req.user.username}' with role '${userRole}' attempted to access protected route.`);
            return res.status(403).json({
                msg: 'Forbidden: You do not have permission to perform this action.'
            });
        }

        next();
    };
};
