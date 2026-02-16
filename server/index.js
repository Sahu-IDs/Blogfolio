import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// MVC Components
import Connection from './config/db.js';
import Router from './views/route.js';
import blogRouter from './views/blog-routes.js'; // Blog MVC Module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config({ path: path.join(__dirname, '.env') });

// --- SECURITY MIDDLEWARE ---
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
}));

// Set security HTTP headers (Relaxed for Dev)
// app.use(helmet({
//     contentSecurityPolicy: false, // Disable CSP to avoid blocking images/scripts in Dev
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: false // Disable CORP header entirely to allow all cross-origin resources
// }));

// Limit requests from same API (Relaxed)
// const limiter = rateLimit({
//     max: 3000, // Very high limit for Dev to prevent blocking
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/', limiter); // Apply globally

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());


app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`\n--- [${new Date().toISOString()}] Incoming Request ---`);
    console.log(`Method: ${req.method} | URL: ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }
    console.log('Request Query:', req.query);
    console.log('-------------------------------------------');
    next();
});

app.use('/', Router);
app.use('/api/blog', blogRouter); // Blog Routes (Clean MVC Structure)
const PORT = process.env.PORT || 8000;
const URL = process.env.ATLASDB_URL;

Connection(URL);

app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server is running successfully on PORT ${PORT}`));
