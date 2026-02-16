import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, CircularProgress, Chip, Button, Stack, Dialog, DialogContent, DialogActions, Container, Tooltip } from '@mui/material';
import { Delete, Edit, GitHub, Launch, Person, CalendarMonth, Category, Share, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../DataProvider';
import { blogs } from '../Data/data';
import Comments from '../comments/Comments';

// Styled Components for Modern UI
// Styled Components for Modern UI
const PageWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    paddingTop: '120px',
    paddingBottom: '120px',
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent'
}));

const HeroImageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '600px',
    borderRadius: '40px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    marginBottom: '-120px',
    zIndex: 2,
    border: '4px solid rgba(255, 255, 255, 0.05)',
}));

const HeroImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    '&:hover': {
        transform: 'scale(1.02)'
    }
});

const ContentCard = styled(Box)(({ theme }) => ({
    background: 'rgba(26, 31, 46, 0.8)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '40px',
    padding: '160px 80px 80px',
    boxShadow: '0 20px 80px rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: 1,
    color: 'white',
}));

const ActionButton = styled(Box)(({ theme, $color }) => ({
    width: '50px',
    height: '50px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    '&:hover': {
        transform: 'translateY(-5px) scale(1.1)',
        background: $color || '#6366f1',
        color: 'white',
        borderColor: $color || '#6366f1',
        boxShadow: `0 15px 30px ${$color || '#6366f1'}40`,
    }
}));

const MetaItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: 600
});

const defaultImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80';

const DetailView = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id && id.startsWith('mock-')) {
                    const mockIndex = parseInt(id.split('-')[1]);
                    const mockPost = blogs[mockIndex];
                    if (mockPost) {
                        setPost({
                            ...mockPost,
                            _id: id,
                            username: "BlogFolio",
                            userId: "default_user",
                            category: mockPost.category,
                            createDate: new Date(),
                            picture: mockPost.image
                        });
                    }
                } else {
                    let response = await API.getBlogById(id);
                    if (response.isSuccess) {
                        // Handle different API response structures
                        const postData = response.data?.data || response.data;
                        console.log("Fetched post data:", postData);
                        setPost(postData);
                    } else {
                        console.error("Failed to fetch post:", response);
                        setPost(null);
                    }
                }
            } catch (error) {
                console.error("Error in DetailView:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                console.log('🗑️ Attempting to delete blog:', post._id);

                let response;

                // Check if it's a legacy post
                if (post.isLegacy) {
                    console.log('⚠️ Deleting legacy post...');
                    response = await API.deletePost(post._id);
                } else {
                    console.log('🆕 Deleting new blog...');
                    response = await API.deleteBlog(post._id);
                }

                console.log('📥 Delete response:', response);

                if (response && (response.isSuccess || response.success || response.status === 200)) {
                    alert('Blog deleted successfully!');
                    navigate('/blog');
                } else {
                    console.error('❌ Delete failed:', response);
                    alert('Failed to delete blog. Please try again.');
                }
            } catch (error) {
                console.error('❌ Delete error:', error);
                alert(`Error deleting blog: ${error.message || 'Unknown error'}`);
            }
        }
    }

    const sharePost = async () => {
        const shareData = {
            title: post.title,
            text: post.description,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#05070a' }}>
                <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
        )
    }

    if (!post) {
        return (
            <Dialog open={true} PaperProps={{ sx: { borderRadius: 4, textAlign: "center", p: 2 } }}>
                <DialogContent>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Page Not Found</Typography>
                    <Typography variant="body1" color="text.secondary">The post you are looking for does not exist or has been deleted.</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button variant="contained" onClick={() => navigate('/')} sx={{ borderRadius: '50px', px: 4, py: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>Back to Home</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const url = post.picture || defaultImage;
    let mediaType = post.mediaType;
    if ((!mediaType || mediaType === 'Image') && url) {
        if (url.match(/\.(mp4|webm|ogg|mov|mkv|avi|3gp|flv|wmv)(?:\?|$)/i)) mediaType = 'Video';
        else if (url.match(/\.(mp3|wav|mpeg|m4a|aac)(?:\?|$)/i)) mediaType = 'Audio';
    }

    return (
        <PageWrapper>
            <Container maxWidth="lg">
                <HeroImageContainer>
                    {mediaType === 'Video' ? (
                        <video src={url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <HeroImage src={url} alt={post.title} onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }} />
                    )}

                    {/* Floating Admin Actions */}
                    {(account.username === post.username || account.role === 'admin') && (
                        <Box sx={{ position: 'absolute', top: 30, right: 30, display: 'flex', gap: 2, zIndex: 10 }}>
                            <Link to={`/update/${post._id}`}>
                                <ActionButton $color="#667eea">
                                    <Edit fontSize="small" />
                                </ActionButton>
                            </Link>
                            <ActionButton $color="#ff4757" onClick={deleteBlog}>
                                <Delete fontSize="small" />
                            </ActionButton>
                        </Box>
                    )}
                </HeroImageContainer>

                <ContentCard>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip
                                    icon={<Category sx={{ fontSize: '14px !important' }} />}
                                    label={post.category || post.categories || 'Technology'}
                                    sx={{
                                        borderRadius: '8px',
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                                        color: '#667eea',
                                        border: '1px solid #667eea20'
                                    }}
                                />
                            </Box>
                            <Typography variant="h2" sx={{
                                fontWeight: 950,
                                fontSize: { xs: '32px', md: '56px' },
                                color: 'white',
                                mb: 3,
                                letterSpacing: '-3px',
                                lineHeight: 1
                            }}>
                                {post.title}
                            </Typography>

                            <Stack direction="row" spacing={4} sx={{ mt: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Link to={`/portfolio/${post.userId}`} style={{ textDecoration: 'none' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        p: '12px 20px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            borderColor: '#6366f1',
                                        }
                                    }}>
                                        <Person sx={{ fontSize: 20, color: '#6366f1' }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1, mb: 0.5 }}>AUTHOR</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 900, color: 'white', lineHeight: 1 }}>@{post.username}</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                                <MetaItem sx={{ background: 'rgba(255, 255, 255, 0.03)', p: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                    <CalendarMonth sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.3)' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.3)', lineHeight: 1, mb: 0.5 }}>DEPLOYED ON</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 900, color: 'white', lineHeight: 1 }}>{new Date(post.createdAt || post.createDate).toDateString().toUpperCase()}</Typography>
                                    </Box>
                                </MetaItem>
                            </Stack>
                        </Box>

                        <Stack direction="row" spacing={2}>
                            <ActionButton onClick={() => setLiked(!liked)} $color={liked ? '#ff4757' : '#333'}>
                                {liked ? <Favorite /> : <FavoriteBorder />}
                            </ActionButton>
                            <Tooltip title="Share Post">
                                <ActionButton $color="#667eea" onClick={sharePost}>
                                    <Share />
                                </ActionButton>
                            </Tooltip>
                        </Stack>
                    </Box>

                    <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', pt: 6, mb: 6 }}>
                        <Typography variant="h5" sx={{ fontWeight: 950, mb: 3, color: 'white', letterSpacing: '-1px' }}>Intelligence Report</Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '19px',
                            lineHeight: 1.8,
                            color: 'rgba(255, 255, 255, 0.6)',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {post.description}
                        </Typography>
                        {post.story && (
                            <Box sx={{ mt: 8 }}>
                                <Typography variant="h5" sx={{ fontWeight: 950, mb: 3, color: 'white', letterSpacing: '-1px' }}>Full Narrative</Typography>
                                <Typography variant="body1" sx={{
                                    fontSize: '20px',
                                    lineHeight: 1.9,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: '"Outfit", sans-serif',
                                    fontWeight: 300
                                }}>
                                    {post.story}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Resources & Links Section */}
                    {(post.liveLink || post.githubLink || post.techStack) && (
                        <Box sx={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '30px',
                            p: 5,
                            mb: 8,
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.1)'
                        }}>
                            <Typography variant="h5" sx={{
                                fontWeight: 900,
                                mb: 4,
                                color: 'white',
                                letterSpacing: '-1px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}>
                                <Launch sx={{ color: '#6366f1' }} />
                                Resources & Links
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
                                {post.liveLink && (
                                    <Button
                                        variant="contained"
                                        href={post.liveLink}
                                        target="_blank"
                                        startIcon={<Launch />}
                                        sx={{
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            px: 3,
                                            py: 1.5,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                                            border: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                                            }
                                        }}
                                    >
                                        View Live Demo
                                    </Button>
                                )}
                                {post.githubLink && (
                                    <Button
                                        variant="outlined"
                                        href={post.githubLink}
                                        target="_blank"
                                        startIcon={<GitHub />}
                                        sx={{
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            px: 3,
                                            py: 1.5,
                                            color: 'white',
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            '&:hover': {
                                                borderColor: '#6366f1',
                                                background: 'rgba(99, 102, 241, 0.1)',
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)',
                                            }
                                        }}
                                    >
                                        View Source Code
                                    </Button>
                                )}
                            </Stack>
                            {post.techStack && (
                                <Box>
                                    <Typography variant="subtitle2" sx={{
                                        fontWeight: 800,
                                        mb: 2,
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        fontSize: '12px'
                                    }}>
                                        Tech Stack
                                    </Typography>
                                    <Typography variant="body1" sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        lineHeight: 1.8
                                    }}>
                                        {post.techStack}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Box sx={{ mt: 10 }}>
                        <Comments post={post} />
                    </Box>
                </ContentCard>
            </Container>
        </PageWrapper >
    )
}

export default DetailView;
