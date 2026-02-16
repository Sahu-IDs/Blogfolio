

import express from 'express';

// Import Controllers (Business Logic Layer)
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controllers/post-controller.js';
import { uploadImage, getImage } from '../controllers/image-controller.js';
import { newComment, getComments, deleteComment } from '../controllers/comment-controller.js';
import { loginUser, signupUser, getAllUsers } from '../controllers/user-controller.js';
import { authenticateToken } from '../controllers/jwt-controller.js';
import { createPortfolioItem, getPortfolioByUserId, updatePortfolioItem, deletePortfolioItem, getAllPortfolios } from '../controllers/portfolio-controller.js';
import { newMessage, getMessages } from '../controllers/message-controller.js';
import upload from '../utils/upload.js';

// Import Middleware
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

/**
 * =================================================================================
 *  MVC ROUTER CONFIGURATION
 * ---------------------------------------------------------------------------------
 *  This file acts as the Entry Point for Client Requests.
 *  It routes requests to the appropriate CONTROLLER based on the URL endpoint.
 * =================================================================================
 */

// --- AUTHENTICATION ROUTES ---
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/users', authenticateToken, checkRole(['admin']), getAllUsers);
// router.post('/logout', logoutUser); // Removed - doesn't exist
// router.post('/token', createNewToken); // Removed - doesn't exist

// --- BLOG POST ROUTES (CRUD Operations) ---
// Any Authenticated User can Create (Ownership enforced by Controller for Edit/Delete)
router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', getPost); // Public - view single post
router.get('/posts', getAllPosts); // Public - view all posts

// --- FILE UPLOAD ROUTES ---
// Allowed for any authenticated user (needed for creating posts)
router.post('/file/upload', authenticateToken, upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

// --- COMMENT ROUTES ---
// Authenticated Users (any role) can comment
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

// --- PORTFOLIO ROUTES (Core Project Feature) ---
// Any Authenticated User can manage their OWN portfolio
router.post('/portfolio/add', authenticateToken, createPortfolioItem);
router.get('/portfolio/get', getPortfolioByUserId); // Public Access allowed
router.get('/portfolio/all', getAllPortfolios); // Community View
router.get('/portfolio/user/:userId', getPortfolioByUserId); // Fetch Specific User Portfolio
router.put('/portfolio/update/:id', authenticateToken, updatePortfolioItem);
router.delete('/portfolio/delete/:id', authenticateToken, deletePortfolioItem);

// --- MESSAGING ROUTES (Communication Module) ---
router.post('/message/new', newMessage);
router.get('/messages/:id', authenticateToken, getMessages);

export default router;
