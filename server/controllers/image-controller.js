import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
});

export const uploadImage = (req, res) => {
    console.log('📤 Upload request received');
    console.log('File present:', !!req.file);

    if (!req.file) {
        console.log('❌ No file in request');
        return res.status(404).json({ msg: "File not found" });
    }

    console.log('📁 File details:', {
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
    });

    const filename = `${Date.now()}-blog-${req.file.originalname}`;
    console.log('💾 Saving as:', filename);

    const uploadStream = gridfsBucket.openUploadStream(filename, {
        contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
        const imageUrl = `${url}/file/${filename}`;
        console.log('✅ Upload successful:', imageUrl);
        return res.status(200).json(imageUrl);
    });

    uploadStream.on('error', (err) => {
        console.error('❌ Upload error:', err.message);
        return res.status(500).json({ msg: err.message });
    });
}

export const getImage = async (req, res) => {
    try {
        const file = await conn.db.collection('photos.files').findOne({ filename: req.params.filename });
        if (file) {
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        } else {
            return res.status(404).json({ msg: 'File not found' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
