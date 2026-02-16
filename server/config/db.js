import mongoose from 'mongoose';

const Connection = async (URL) => {
    if (!URL) {
        console.log('Error: ATLASDB_URL is missing from .env file');
        return;
    }

    try {
        console.log('Connecting to MongoDB...');

        // Connection options to handle timeout and DNS issues
        const options = {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
        };

        await mongoose.connect(URL, options);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
        console.log('\n⚠️  Connection Tips:');
        console.log('1. Check if your IP address is whitelisted in MongoDB Atlas');
        console.log('2. Go to: MongoDB Atlas → Network Access → Add IP Address');
        console.log('3. Add "0.0.0.0/0" to allow all IPs (for development only)');
        console.log('4. Check your internet connection and firewall settings\n');
    }
}

export default Connection;