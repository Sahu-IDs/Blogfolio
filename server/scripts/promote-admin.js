import mongoose from 'mongoose';
import User from '../models/user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root (one level up from scripts)
dotenv.config({ path: path.join(__dirname, '../.env') });

const promoteUserToAdmin = async (targetUsername) => {
    try {
        const URL = process.env.ATLASDB_URL;
        if (!URL) {
            console.error('❌ ATLASDB_URL is missing in .env');
            process.exit(1);
        }

        console.log('🔄 Connecting to Database...');
        await mongoose.connect(URL);
        console.log('✅ Database connected');

        const user = await User.findOne({ username: targetUsername });

        if (!user) {
            console.log(`⚠️ User '${targetUsername}' not found! Please ensure the username is correct (case-sensitive).`);
            // List all users to help debug
            const allUsers = await User.find({}, 'username role');
            console.log('📋 Existing Users:', allUsers.map(u => `${u.username} (${u.role || 'user'})`).join(', '));
        } else {
            if (user.role === 'admin') {
                console.log(`ℹ️ User '${targetUsername}' is ALREADY an Admin.`);
            } else {
                user.role = 'admin';
                await user.save();
                console.log(`🎉 User '${targetUsername}' has been promoted to ADMIN successfully!`);
            }
        }

        await mongoose.disconnect();
        console.log('👋 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

// Target User: Sandeep1 (As requested)
promoteUserToAdmin('Sandeep1');
