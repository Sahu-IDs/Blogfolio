// Quick script to update Sandeep's Name portfolio item with picture URL
// Run: node scripts/update-owner-picture.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const updateOwnerPicture = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);
        console.log('✅ Connected to MongoDB');

        const OWNER_ID = '697b9fcebc927aa3691a0231';

        // Update Name category item with picture
        const result = await mongoose.connection.db.collection('portfolios').updateOne(
            {
                userId: OWNER_ID,
                categories: 'Name'
            },
            {
                $set: {
                    picture: 'https://ui-avatars.com/api/?name=Sandeep+Kumar&size=400&background=6366f1&color=fff&bold=true&rounded=true'
                }
            }
        );

        if (result.modifiedCount > 0) {
            console.log('✅ Picture updated successfully!');
            console.log('🖼️ Picture URL: https://ui-avatars.com/api/?name=Sandeep+Kumar&size=400&background=6366f1&color=fff&bold=true&rounded=true');
        } else {
            console.log('⚠️ No Name category item found for owner');
            console.log('Creating new Name item...');

            // Create Name item if doesn't exist
            await mongoose.connection.db.collection('portfolios').insertOne({
                userId: OWNER_ID,
                username: 'Sandeep1',
                categories: 'Name',
                title: 'Sandeep Kumar Sahu',
                description: 'Full Stack Developer | MERN Stack Expert\nBuilding modern and responsive web applications.',
                picture: 'https://ui-avatars.com/api/?name=Sandeep+Kumar&size=400&background=6366f1&color=fff&bold=true&rounded=true',
                phoneNumber: '6394767773',
                contact: 'vaibhav12679@gmail.com',
                githubLink: 'https://github.com/Sahu-IDs',
                linkedIn: '',
                createDate: new Date()
            });

            console.log('✅ Name item created with picture!');
        }

        console.log('\n🎉 Done! Refresh your browser to see the picture.');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

updateOwnerPicture();
