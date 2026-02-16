import Portfolio from '../models/portfolio.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

// --- DATABASE ONLY PORTFOLIO ---
// Fetching ONLY from Portfolio Collection (Database)
// One consolidated card per user with all their portfolio items merged

export const createPortfolioItem = async (req, res) => {
    try {
        const portfolio = new Portfolio({
            ...req.body,
            userId: req.user._id,
            username: req.user.username
        });
        await portfolio.save();
        return res.status(200).json({ isSuccess: true, msg: 'Portfolio item saved successfully', data: portfolio });
    } catch (error) {
        return res.status(500).json({ isSuccess: false, msg: error.message });
    }
}

export const getPortfolioByUserId = async (req, res) => {
    try {
        const userId = req.query.userId || req.params.userId;

        // Fetch ONLY from Portfolio Collection (Database)
        const portfolios = await Portfolio.find({ userId: userId }).lean().sort({ createDate: -1 });

        if (!portfolios || portfolios.length === 0) {
            return res.status(404).json({ isSuccess: false, msg: 'No portfolios found for this user' });
        }

        // Enrich with User Data
        let userInfo = null;
        if (mongoose.isValidObjectId(userId)) {
            userInfo = await User.findById(userId).select('name picture username').lean();
        }

        const enriched = portfolios.map(p => ({
            ...p,
            userInfo: userInfo,
        }));

        return res.status(200).json({ isSuccess: true, data: enriched });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getAllPortfolios = async (req, res) => {
    try {
        const { category } = req.query;

        // Fetch ONLY from Portfolio Collection (Database)
        const portfolioQuery = {};
        if (category) portfolioQuery.categories = category;

        const portfolios = await Portfolio.find(portfolioQuery).lean().sort({ createDate: -1 });

        console.log(`📂 Found ${portfolios.length} portfolio items from database`);

        // GROUP BY USER ID - Consolidate all items per user into ONE CARD
        const userPortfolioMap = {};

        portfolios.forEach(item => {
            const uid = item.userId;
            if (!uid) return;

            if (!userPortfolioMap[uid]) {
                // Initialize with first item as base
                userPortfolioMap[uid] = { ...item };
            } else {
                // Merge subsequent items into the base
                const master = userPortfolioMap[uid];

                // Merge skills and techStack
                if (item.skills && item.skills.trim()) {
                    master.skills = master.skills
                        ? master.skills + ', ' + item.skills
                        : item.skills;
                }
                if (item.techStack && item.techStack.trim()) {
                    master.techStack = master.techStack
                        ? master.techStack + ', ' + item.techStack
                        : item.techStack;
                }

                // Merge descriptions
                if (item.description && item.description.trim() && !master.description.includes(item.description)) {
                    master.description += `\n\n--- ${item.title} ---\n${item.description}`;
                }

                // Fill in missing links and contact info
                if (!master.liveLink && item.liveLink) master.liveLink = item.liveLink;
                if (!master.githubLink && item.githubLink) master.githubLink = item.githubLink;
                if (!master.linkedIn && item.linkedIn) master.linkedIn = item.linkedIn;
                if (!master.phoneNumber && item.phoneNumber) master.phoneNumber = item.phoneNumber;
                if (!master.email && item.email) master.email = item.email;
                if (!master.contact && item.contact) master.contact = item.contact;

                // Prefer items with pictures
                if (!master.picture && item.picture) master.picture = item.picture;

                // Use first non-empty title
                if (!master.title || !master.title.trim()) {
                    if (item.title && item.title.trim()) master.title = item.title;
                }
            }
        });

        // Convert map to array
        const consolidatedPortfolios = Object.values(userPortfolioMap);

        console.log(`👥 Consolidated into ${consolidatedPortfolios.length} unique users`);

        // Enrich with User Data but KEEP userId as string
        const userIds = [...new Set(consolidatedPortfolios.map(p => p.userId).filter(id => id))];
        const validUserIds = userIds.filter(id => mongoose.isValidObjectId(id));
        const users = await User.find({ _id: { $in: validUserIds } }).select('name picture username').lean();
        const userMap = {};
        users.forEach(u => userMap[u._id.toString()] = u);

        const final = consolidatedPortfolios.map(p => ({
            ...p,
            userInfo: userMap[p.userId.toString()] || null,
        }));

        return res.status(200).json({ isSuccess: true, data: final });
    } catch (error) {
        console.error('❌ Error in getAllPortfolios:', error);
        return res.status(500).json({ msg: error.message });
    }
}

export const updatePortfolioItem = async (req, res) => {
    try {
        const id = req.query.id || req.params.id;
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).json({ isSuccess: false, msg: 'Portfolio not found' });
        }

        // Ownership Check: Allow if user is Owner OR Admin
        if (portfolio.userId !== req.user._id && req.user.role !== 'admin') {
            return res.status(403).json({ isSuccess: false, msg: 'Access Denied: You can only edit your own portfolio items.' });
        }

        await Portfolio.updateOne({ _id: id }, req.body);
        return res.status(200).json({ isSuccess: true, msg: 'Portfolio updated successfully' });
    } catch (error) {
        return res.status(500).json({ isSuccess: false, msg: error.message });
    }
}

export const deletePortfolioItem = async (req, res) => {
    try {
        const id = req.query.id || req.params.id;
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).json({ isSuccess: false, msg: 'Portfolio not found' });
        }

        // Ownership Check
        if (portfolio.userId !== req.user._id && req.user.role !== 'admin') {
            return res.status(403).json({ isSuccess: false, msg: 'Access Denied: You can only delete your own portfolio items.' });
        }

        await portfolio.deleteOne();
        return res.status(200).json({ isSuccess: true, msg: 'Portfolio item deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
