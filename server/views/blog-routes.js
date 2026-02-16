import express from 'express';
import { authenticateToken } from '../controllers/jwt-controller.js';
import {
    createBlog,
    getBlog,
    getAllBlogs,
    getBlogsByUser,
    updateBlog,
    deleteBlog,
    toggleLikeBlog,
    getBlogStats
} from '../controllers/blog-controller.js';

/**
 * =================================================================================
 *  BLOG ROUTES (View Layer - Router Configuration)
 * ---------------------------------------------------------------------------------
 *  This file defines all the routes for Blog operations.
 *  It acts as the entry point for blog-related HTTP requests.
 *  
 *  Route Pattern: /api/blog/*
 * =================================================================================
 */

const blogRouter = express.Router();

// ==================== PUBLIC ROUTES ====================
/**
 * These routes are accessible without authentication
 */

// Get all blogs (with filtering, search, pagination)
// Example: GET /api/blog/all?category=Technology&page=1&limit=10
blogRouter.get('/all', getAllBlogs);

// Get blog statistics (MUST come before /:id)
// Example: GET /api/blog/stats/overview
blogRouter.get('/stats/overview', getBlogStats);

// Get blogs by specific user (MUST come before /:id)
// Example: GET /api/blog/user/507f1f77bcf86cd799439011
blogRouter.get('/user/:userId', getBlogsByUser);

// Get single blog by ID (MUST be last among GET routes)
// Example: GET /api/blog/507f1f77bcf86cd799439011
blogRouter.get('/:id', getBlog);

// ==================== PROTECTED ROUTES ====================
/**
 * These routes require authentication (JWT token)
 */

// Create new blog post
// Example: POST /api/blog/create
blogRouter.post('/create', authenticateToken, createBlog);

// Update blog post (only author)
// Example: PUT /api/blog/update/507f1f77bcf86cd799439011
blogRouter.put('/update/:id', authenticateToken, updateBlog);

// Delete blog post (only author)
// Example: DELETE /api/blog/delete/507f1f77bcf86cd799439011
blogRouter.delete('/delete/:id', authenticateToken, deleteBlog);

// Like/Unlike blog post
// Example: POST /api/blog/like/507f1f77bcf86cd799439011
blogRouter.post('/like/:id', authenticateToken, toggleLikeBlog);

/**
 * =================================================================================
 *  ROUTE SUMMARY
 * ---------------------------------------------------------------------------------
 *  PUBLIC ROUTES:
 *    - GET    /api/blog/all              → Get all blogs (with filters)
 *    - GET    /api/blog/:id              → Get single blog
 *    - GET    /api/blog/user/:userId     → Get user's blogs
 *    - GET    /api/blog/stats/overview   → Get blog statistics
 *  
 *  PROTECTED ROUTES (Require Authentication):
 *    - POST   /api/blog/create           → Create new blog
 *    - PUT    /api/blog/update/:id       → Update blog (author only)
 *    - DELETE /api/blog/delete/:id       → Delete blog (author only)
 *    - POST   /api/blog/like/:id         → Like/Unlike blog
 * =================================================================================
 */

export default blogRouter;
