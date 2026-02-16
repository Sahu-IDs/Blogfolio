import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Stack, IconButton, styled, Skeleton, Menu, MenuItem, ListItemIcon, ListItemText, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, Work, School, EmojiEvents, Visibility, Code, Rocket, Star, Share, LinkedIn, Twitter, WhatsApp, Email, ContentCopy, Check } from '@mui/icons-material';
import { API } from '../../service/api';

// --- STYLED COMPONENTS ---
const PortfolioCard = styled(Card)(({ theme }) => ({
    background: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(40px)',
    borderRadius: '35px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-10px)',
        borderColor: '#6366f1',
        boxShadow: '0 30px 60px rgba(99, 102, 241, 0.2)',
        '& .portfolio-avatar': {
            transform: 'scale(1.1)',
            boxShadow: '0 15px 30px rgba(99, 102, 241, 0.4)',
        },
        '& .view-button, & .share-button': {
            opacity: 1,
            transform: 'translateX(0)',
        }
    }
}));

const PortfolioHeader = styled(Box)({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 30px 60px',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
    }
});

const StyledAvatar = styled(Avatar)({
    width: 90,
    height: 90,
    border: '4px solid rgba(255, 255, 255, 0.2)',
    fontSize: '36px',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
});

const ViewButton = styled(IconButton)({
    position: 'absolute',
    top: 20,
    right: 70,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    opacity: 0,
    transform: 'translateX(20px)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.25)',
    }
});

const ShareButton = styled(IconButton)({
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'rgba(16, 185, 129, 0.15)',
    backdropFilter: 'blur(10px)',
    color: '#10b981',
    opacity: 0,
    transform: 'translateX(20px)',
    transition: 'all 0.3s ease 0.1s',
    '&:hover': {
        background: 'rgba(16, 185, 129, 0.25)',
        transform: 'scale(1.1)',
    }
});

const InfoChip = styled(Chip)(({ $color }) => ({
    background: `${$color}15`,
    color: $color,
    fontWeight: 700,
    fontSize: '11px',
    height: '28px',
    '& .MuiChip-icon': {
        color: $color,
        fontSize: '16px',
    }
}));

const PortfolioShowcase = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shareAnchor, setShareAnchor] = useState(null);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const response = await API.getAllPortfolios();
            if (response.isSuccess) {
                // Show max 6 portfolios on homepage (Relaxed filtering for visibility)
                setPortfolios(response.data.slice(0, 6));
            }
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePortfolioClick = (portfolio) => {
        const userId = portfolio.userId?._id || portfolio.userId;
        navigate(`/portfolio/${userId}`);
    };

    const handleShareClick = (event, portfolio) => {
        event.stopPropagation();
        setSelectedPortfolio(portfolio);
        setShareAnchor(event.currentTarget);
    };

    const handleShareClose = () => {
        setShareAnchor(null);
    };

    const getPortfolioUrl = (portfolio) => {
        const userId = portfolio.userId?._id || portfolio.userId;
        return `${window.location.origin}/portfolio/${userId}`;
    };

    const getShareText = (portfolio) => {
        const userName = portfolio.userId?.name || portfolio.username || 'Unknown User';
        return `Check out ${userName}'s amazing portfolio!`;
    };

    const handleShare = async (platform) => {
        if (!selectedPortfolio) return;

        const url = getPortfolioUrl(selectedPortfolio);
        const text = getShareText(selectedPortfolio);
        const userName = selectedPortfolio.userId?.name || selectedPortfolio.username || 'Portfolio';

        try {
            switch (platform) {
                case 'native':
                    if (navigator.share) {
                        await navigator.share({
                            title: `${userName}'s Portfolio`,
                            text: text,
                            url: url
                        });
                        showToast('Shared successfully!', 'success');
                    }
                    break;

                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                    showToast('Opening LinkedIn...', 'info');
                    break;

                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                    showToast('Opening Twitter...', 'info');
                    break;

                case 'whatsapp':
                    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                    showToast('Opening WhatsApp...', 'info');
                    break;

                case 'email':
                    window.location.href = `mailto:?subject=${encodeURIComponent(`${userName}'s Portfolio`)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
                    showToast('Opening email client...', 'info');
                    break;

                case 'copy':
                    await navigator.clipboard.writeText(url);
                    showToast('Link copied to clipboard!', 'success');
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error('Share error:', error);
            showToast('Failed to share', 'error');
        }

        handleShareClose();
    };

    const showToast = (message, severity = 'success') => {
        setToast({ open: true, message, severity });
    };

    const handleToastClose = () => {
        setToast({ ...toast, open: false });
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (loading) {
        return (
            <Grid container spacing={4}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Skeleton
                            variant="rectangular"
                            height={320}
                            sx={{ borderRadius: '35px', bgcolor: 'rgba(255,255,255,0.05)' }}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (portfolios.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Code sx={{ fontSize: 80, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
                    No portfolios available yet
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.2)', mt: 1 }}>
                    Be the first to create your portfolio!
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {portfolios.map((portfolio, index) => {
                // Extract user name from multiple possible sources
                const userName = portfolio.userId?.name || portfolio.username || 'Unknown User';

                // Extract user photo - check multiple sources
                const userPhoto = portfolio.picture || portfolio.userId?.picture || null;

                // Get description/title for display
                const portfolioTitle = portfolio.title || portfolio.description || '';

                // Count skills - handle both array and comma-separated string
                const skillsCount = portfolio.skills
                    ? (Array.isArray(portfolio.skills)
                        ? portfolio.skills.length
                        : portfolio.skills.split(',').filter(s => s.trim()).length)
                    : 0;

                return (
                    <Grid item xs={12} sm={6} md={4} key={portfolio._id || index}>
                        <PortfolioCard onClick={() => handlePortfolioClick(portfolio)}>
                            <PortfolioHeader>
                                <ViewButton className="view-button">
                                    <Visibility />
                                </ViewButton>
                                <ShareButton
                                    className="share-button"
                                    onClick={(e) => handleShareClick(e, portfolio)}
                                >
                                    <Share />
                                </ShareButton>

                                <Stack alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                                    <StyledAvatar
                                        className="portfolio-avatar"
                                        src={userPhoto}
                                        alt={userName}
                                    >
                                        {!userPhoto && getInitials(userName)}
                                    </StyledAvatar>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'white',
                                                fontWeight: 900,
                                                letterSpacing: '-0.5px',
                                                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            {userName}
                                        </Typography>
                                        {(portfolio.userId?.username || portfolio.username) && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.7)',
                                                    fontWeight: 600
                                                }}
                                            >
                                                @{portfolio.userId?.username || portfolio.username}
                                            </Typography>
                                        )}
                                    </Box>
                                </Stack>
                            </PortfolioHeader>

                            <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                {portfolioTitle && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255,255,255,0.6)',
                                            mb: 3,
                                            fontStyle: 'italic',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        "{portfolioTitle}"
                                    </Typography>
                                )}

                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                    {skillsCount > 0 && (
                                        <InfoChip
                                            icon={<Code />}
                                            label={`${skillsCount} Skills`}
                                            size="small"
                                            $color="#6366f1"
                                        />
                                    )}
                                    {portfolio.categories && (
                                        <InfoChip
                                            icon={<Person />}
                                            label={portfolio.categories}
                                            size="small"
                                            $color="#10b981"
                                        />
                                    )}
                                </Stack>

                                {(skillsCount > 0 || portfolio.categories) && (
                                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                                                {portfolio.categories || 'Portfolio'} • Click to view
                                            </Typography>
                                        </Stack>
                                    </Box>
                                )}
                            </CardContent>
                        </PortfolioCard>
                    </Grid>
                );
            })}

            {/* Share Menu */}
            <Menu
                anchorEl={shareAnchor}
                open={Boolean(shareAnchor)}
                onClose={handleShareClose}
                PaperProps={{
                    sx: {
                        background: 'rgba(30, 41, 59, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        mt: 1,
                        minWidth: 220
                    }
                }}
            >
                {navigator.share && (
                    <MenuItem onClick={() => handleShare('native')} sx={{ color: 'white', py: 1.5 }}>
                        <ListItemIcon>
                            <Share sx={{ color: '#10b981' }} />
                        </ListItemIcon>
                        <ListItemText>Share...</ListItemText>
                    </MenuItem>
                )}
                <MenuItem onClick={() => handleShare('linkedin')} sx={{ color: 'white', py: 1.5 }}>
                    <ListItemIcon>
                        <LinkedIn sx={{ color: '#0077b5' }} />
                    </ListItemIcon>
                    <ListItemText>LinkedIn</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('twitter')} sx={{ color: 'white', py: 1.5 }}>
                    <ListItemIcon>
                        <Twitter sx={{ color: '#1DA1F2' }} />
                    </ListItemIcon>
                    <ListItemText>Twitter</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('whatsapp')} sx={{ color: 'white', py: 1.5 }}>
                    <ListItemIcon>
                        <WhatsApp sx={{ color: '#25D366' }} />
                    </ListItemIcon>
                    <ListItemText>WhatsApp</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('email')} sx={{ color: 'white', py: 1.5 }}>
                    <ListItemIcon>
                        <Email sx={{ color: '#ea4335' }} />
                    </ListItemIcon>
                    <ListItemText>Email</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('copy')} sx={{ color: 'white', py: 1.5 }}>
                    <ListItemIcon>
                        <ContentCopy sx={{ color: '#6366f1' }} />
                    </ListItemIcon>
                    <ListItemText>Copy Link</ListItemText>
                </MenuItem>
            </Menu>

            {/* Toast Notification */}
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={handleToastClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleToastClose}
                    severity={toast.severity}
                    sx={{
                        borderRadius: '12px',
                        fontWeight: 600
                    }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default PortfolioShowcase;
