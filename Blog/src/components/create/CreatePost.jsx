import { useState, useEffect, useContext } from 'react';
import {
    Box, styled, FormControl, Button, TextField, Select, MenuItem,
    InputLabel, Grid, Typography, Card, Chip, Divider,
    CircularProgress, Container, Stack, Fade,
    InputAdornment, IconButton, Avatar, Tooltip
} from '@mui/material';
import {
    AddPhotoAlternate, Description, Create,
    Code, Work, School, Call, ArrowBack,
    Publish, PhotoCamera, AutoAwesome,
    GitHub, Language, LinkedIn, Phone,
    Email, Home, WorkspacePremium, Person,
    RestartAlt, Delete, Videocam
} from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../DataProvider';
import { API } from '../../service/api';
import { keyframes } from '@mui/material/styles';

// --- ELITE ANIMATIONS ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { left: -100% }
  100% { left: 100% }
`;

// --- STYLED COMPONENTS ---

const PageWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    padding: '100px 20px',
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent'
}));

const MainCard = styled(Card)(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    borderRadius: '50px',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(50px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 40px 120px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 10,
    color: '#1e293b',
    '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: '#0f172a'
    }
}));

const Sidebar = styled(Box)(({ theme }) => ({
    background: 'rgba(248, 250, 252, 0.8)',
    color: '#1e293b',
    height: '100%',
    padding: '50px 30px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
}));

const CategoryBtn = styled(Box)(({ theme, $active }) => ({
    padding: '14px 20px',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '10px',
    background: $active ? 'white' : 'transparent',
    color: $active ? '#6366f1' : '#64748b',
    border: $active ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
    boxShadow: $active ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
    '&:hover': {
        background: 'white',
        transform: 'translateX(5px)',
        color: '#6366f1',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }
}));

const StyledInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#1e293b',
        '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
        '&:hover fieldset': { borderColor: '#6366f1' },
        '&.Mui-focused fieldset': { borderColor: '#6366f1' },
    },
    '& .MuiInputLabel-root': { color: '#64748b' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    '& .MuiInputBase-input::placeholder': { color: '#94a3b8' },
});

const HeroDropzone = styled(Box)(({ theme, $url }) => ({
    width: '100%',
    height: '400px',
    borderRadius: '30px',
    border: '2px dashed rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative', // Constrain absolute overlay
    overflow: 'hidden', // Ensure overlay stays inside
    transition: 'all 0.3s ease',
    background: $url ? `url(${$url}) center/cover no-repeat` : 'rgba(255,255,255,0.5)',
    '&:hover': {
        borderColor: '#6366f1',
        background: $url ? `url(${$url}) center/cover no-repeat` : 'rgba(255,255,255,0.8)'
    }
}));

const ActionButton = styled(Button)(({ theme, $primary }) => ({
    borderRadius: '20px',
    padding: '14px 35px',
    fontWeight: 950,
    textTransform: 'none',
    fontSize: '15px',
    letterSpacing: '0.5px',
    transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    background: $primary ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'white',
    color: $primary ? 'white' : '#64748b',
    border: $primary ? 'none' : '1px solid rgba(0,0,0,0.05)',
    boxShadow: $primary ? '0 15px 30px rgba(99, 102, 241, 0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: $primary ? '0 20px 40px rgba(99, 102, 241, 0.4)' : '0 8px 20px rgba(0,0,0,0.08)',
        background: $primary ? 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)' : '#f8fafc',
    }
}));

const TripleLine = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '12px',
    '& div': {
        height: '3px',
        borderRadius: '10px',
        background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
    },
    '& div:nth-child(1)': { width: '45px' },
    '& div:nth-child(2)': { width: '25px', opacity: 0.6 },
    '& div:nth-child(3)': { width: '15px', opacity: 0.3 },
});

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: 'Blog',
    createDate: new Date(),
    techStack: '',
    skills: '',
    project: '',
    blog: '',
    portfolio: '',
    contact: '',
    linkedIn: '',
    phoneNumber: '',
    githubLink: '',
    liveLink: '',
    mediaType: 'Image',
    story: '',
    userId: ''
};

const CreatePost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const { id } = useParams();

    const isEdit = !!id;

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [userSkills, setUserSkills] = useState([]);

    const popularSkills = [
        { name: 'Java', icon: 'java' },
        { name: 'Python', icon: 'py' },
        { name: 'React', icon: 'react' },
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'HTML', icon: 'html' },
        { name: 'CSS', icon: 'css' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'C++', icon: 'cpp' },
        { name: 'Tailwind', icon: 'tailwind' },
        { name: 'Git', icon: 'git' }
    ];

    const getIconName = (title) => {
        const raw = (title || '').toLowerCase().trim();
        const map = { 'js': 'js', 'javascript': 'js', 'react': 'react', 'node': 'nodejs', 'node.js': 'nodejs', 'express': 'express', 'mongodb': 'mongodb', 'html': 'html', 'css': 'css', 'python': 'py', 'java': 'java', 'cpp': 'cpp', 'c++': 'cpp', 'tailwind': 'tailwind', 'nextjs': 'nextjs', 'sass': 'sass', 'vite': 'vite', 'figma': 'figma', 'git': 'git', 'mysql': 'mysql' };
        return map[raw] || raw.replace(/[ .]/g, '');
    };

    const fetchUserSkills = async () => {
        if (account && (account._id || account.id)) {
            try {
                const response = await API.getPortfolioByUserId({ userId: account._id || account.id });
                if (response.isSuccess) {
                    const skills = response.data.filter(item => item.categories === 'Skill');
                    setUserSkills(skills);
                }
            } catch (error) {
                console.error("Fetch Skills Error:", error);
            }
        }
    };

    const handleQuickAdd = async (skillName) => {
        if (!account) return;
        const quickPost = {
            ...initialPost,
            title: skillName,
            categories: 'Skill',
            username: account.username,
            userId: account._id || account.id,
            skills: 'Technology',
            liveLink: 'Advanced'
        };

        try {
            setLoading(true);
            const response = await API.createPortfolioItem(quickPost);
            if (response.isSuccess) {
                await fetchUserSkills();
                alert(`${skillName} added to your portfolio!`);
            }
        } catch (error) {
            console.error("Quick Add Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (post.categories === 'Skill') {
            fetchUserSkills();
        }
    }, [post.categories, account]);

    // Read category from URL parameter and auto-scroll to form
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam && !id) {
            setPost(prev => ({
                ...prev,
                categories: categoryParam
            }));

            // Auto-scroll to form section after a short delay
            setTimeout(() => {
                const formSection = document.getElementById('create-form-section');
                if (formSection) {
                    formSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        }
    }, [location.search, id]);

    // Load Post for Editing or Set Defaults
    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                try {
                    // Try fetching as Blog first (New MVC)
                    let response = await API.getBlogById(id);
                    if (response.isSuccess) {
                        const blogData = response.data.data || response.data;
                        setPost({
                            ...blogData,
                            categories: blogData.category || 'Blog' // Map category back to categories
                        });
                    } else {
                        // Fallback to legacy/Portfolio
                        response = await API.getPostById(id);
                        if (response.isSuccess) {
                            setPost(response.data);
                        }
                    }
                } catch (error) {
                    console.error("Load Error:", error);
                }
            } else {
                // Check for Draft in LocalStorage
                const savedDraft = localStorage.getItem('studio_draft');
                const searchParams = new URLSearchParams(location.search);
                const queryCat = searchParams.get('category') || 'Blog';

                if (savedDraft) {
                    const draftData = JSON.parse(savedDraft);
                    setPost({
                        ...draftData,
                        username: account.username,
                        userId: account._id || account.id
                    });
                } else {
                    setPost(prev => ({
                        ...prev,
                        categories: queryCat,
                        username: account.username,
                        userId: account._id || account.id
                    }));
                }
            }
            setPageLoading(false);
        };
        loadPost();
    }, [id, location.search, account]);

    // Save Draft to LocalStorage on Change
    useEffect(() => {
        if (!id && !pageLoading) {
            localStorage.setItem('studio_draft', JSON.stringify(post));
        }
    }, [post, id, pageLoading]);

    // File Upload Handler
    useEffect(() => {
        const uploadFile = async () => {
            if (file) {
                console.log('📤 Starting file upload:', file.name, file.type, file.size);
                setLoading(true);
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                try {
                    console.log('🌐 Calling upload API...');
                    const response = await API.uploadFile(data);
                    console.log('📥 Upload response:', response);

                    if (response.isSuccess || response.data) {
                        let type = 'Image';
                        if (file.type.startsWith('video')) type = 'Video';

                        const imageUrl = response.data || response;
                        console.log('✅ Upload successful! URL:', imageUrl);

                        setPost(prev => ({ ...prev, picture: imageUrl, mediaType: type }));
                        alert(`${type} uploaded successfully!`);
                    } else {
                        console.error('❌ Upload failed - Invalid response:', response);
                        alert('Upload failed: Invalid server response. Please try again.');
                    }
                } catch (error) {
                    console.error("❌ Upload error:", error);
                    alert(`Upload failed: ${error.message || 'Unknown error'}. Please check your connection and try again.`);
                } finally {
                    setLoading(false);
                }
            }
        };
        uploadFile();
    }, [file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSave = async (addAnother = false, targetCategory = null) => {
        if (!post.title && post.categories !== 'Contact') {
            alert("Title is required!");
            return;
        }

        try {
            let response;
            const payload = {
                ...post,
                userId: account._id || account.id,
                category: post.categories // Map categories to new 'category' field
            };
            const isBlogType = post.categories === 'Blog' || post.categories === 'Story';

            if (isEdit) {
                if (isBlogType) {
                    response = await API.updateBlog(payload);
                } else {
                    response = await API.updatePortfolioItem(payload);
                }
            } else {
                if (isBlogType) {
                    response = await API.createBlog(payload);
                } else {
                    response = await API.createPortfolioItem(payload);
                }
            }

            if (response.isSuccess) {
                const nextCat = targetCategory || (addAnother ? post.categories : null);

                if (post.categories === 'Skill') {
                    await fetchUserSkills();
                }

                if (nextCat) {
                    alert(`${post.categories} added! ${targetCategory ? `Moving to ${targetCategory}...` : 'You can now add the next one.'}`);
                    localStorage.removeItem('studio_draft');

                    setPost({
                        ...initialPost,
                        categories: nextCat,
                        username: account.username,
                        userId: account._id || account.id
                    });
                    setFile('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert(isEdit ? "Updated Successfully!" : "Published Successfully!");
                    localStorage.removeItem('studio_draft');
                    navigate(isBlogType ? '/blog' : `/portfolio/${account._id || account.id}`); // Redirect to /blog for blogs
                }
            }
        } catch (error) {
            console.error("Save Error:", error);
        }
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to clear all fields? This cannot be undone.")) {
            localStorage.removeItem('studio_draft');
            setPost({
                ...initialPost,
                categories: post.categories,
                username: account.username,
                userId: account._id || account.id
            });
            setFile('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to permanently delete this item?")) {
            try {
                const isBlogType = post.categories === 'Blog' || post.categories === 'Story';
                let response;

                if (isBlogType) {
                    response = await API.deleteBlog(post._id);
                } else {
                    response = await API.deletePortfolioItem({ id: post._id });
                }

                if (response.isSuccess) {
                    alert("Deleted Successfully!");
                    navigate(isBlogType ? '/blog' : `/portfolio/${account._id || account.id}`);
                }
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Error deleting item. Please try again.");
            }
        }
    };

    const categories = [
        { name: 'Blog', icon: <Description /> },
        { name: 'Story', icon: <AutoAwesome /> },
        { name: 'Complete Profile', icon: <Person />, internal: 'Name' },
        { name: 'Skill', icon: <Code /> },
        { name: 'Project', icon: <Language /> },
        { name: 'Education', icon: <School /> },
        { name: 'Work', icon: <Work /> },
        { name: 'Certificate', icon: <WorkspacePremium /> },
        { name: 'Contact', icon: <Call /> },
    ];

    const getNextFlowCategory = (current) => {
        const flow = {
            'Name': 'Skill',
            'Skill': 'Project',
            'Project': 'Work',
            'Work': 'Education',
            'Education': 'Certificate',
            'Certificate': 'Contact'
        };
        return flow[current] || null;
    };

    if (pageLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#05070a' }}>
                <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
        );
    }

    return (
        <PageWrapper>
            {/* Cinematic Background Elements */}
            <Box sx={{ position: 'absolute', top: '10%', left: '5%', animation: `${float} 7s infinite`, zIndex: 1 }}>
                <WorkspacePremium sx={{ fontSize: 180, color: '#6366f1', opacity: 0.1 }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '15%', right: '5%', animation: `${float} 9s infinite reverse`, zIndex: 1 }}>
                <Code sx={{ fontSize: 150, color: '#a855f7', opacity: 0.1 }} />
            </Box>

            <Fade in={true} timeout={800}>
                <MainCard>
                    <Grid container>
                        {/* Left Sidebar */}
                        <Grid item xs={12} md={3.5}>
                            <Sidebar>
                                <Box sx={{ mb: 6 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Create sx={{ fontSize: 42, color: '#6366f1' }} />
                                        <Typography variant="h3" fontWeight={950} sx={{ letterSpacing: '-2px' }}>Studio</Typography>
                                    </Box>
                                    <TripleLine>
                                        <div /><div /><div />
                                    </TripleLine>
                                </Box>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="overline" sx={{ opacity: 0.4, fontWeight: 800, mb: 1, display: 'block', letterSpacing: 2 }}>Categories</Typography>
                                    <TripleLine sx={{ mb: 3 }}>
                                        <div /><div /><div />
                                    </TripleLine>
                                    {categories.map((cat) => (
                                        <CategoryBtn
                                            key={cat.name}
                                            $active={post.categories === (cat.internal || cat.name)}
                                            onClick={() => setPost(prev => ({ ...prev, categories: cat.internal || cat.name }))}
                                        >
                                            {cat.icon}
                                            <Typography fontWeight={700}>{cat.name}</Typography>
                                        </CategoryBtn>
                                    ))}
                                </Box>

                                <Box sx={{ mt: 4, p: 3, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Typography variant="caption" sx={{ color: '#667eea', fontWeight: 900, textTransform: 'uppercase', display: 'block', mb: 1 }}>Pro Tip</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8, fontStyle: 'italic', lineHeight: 1.6 }}>
                                        {post.categories === 'Name' && "Fill in all your social links to let recruiters find you easily!"}
                                        {post.categories === 'Skill' && "Add your proficiency level like 'Expert' or 'Intermediate'."}
                                        {post.categories === 'Project' && "A video demo of your project usually gets 2x more views!"}
                                        {post.categories === 'Blog' && "Use a catchy headline to grab attention."}
                                        {post.categories === 'Education' && "Mention your GPA if it's high!"}
                                        {(!['Name', 'Skill', 'Project', 'Blog', 'Education'].includes(post.categories)) && "Keep your descriptions concise and professional."}
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Typography variant="caption" sx={{ opacity: 0.4 }}>Signed in as</Typography>
                                    <Typography variant="body2" fontWeight={700}>{account.username}</Typography>
                                </Box>
                            </Sidebar>
                        </Grid>

                        {/* Form Area */}
                        <Grid item xs={12} md={8.5} id="create-form-section">
                            <Box sx={{ p: { xs: 3, md: 6 } }}>
                                <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: '-2px' }}>
                                            {isEdit ? 'Edit Module' : 'Forge Content'}
                                        </Typography>
                                        <TripleLine>
                                            <div /><div /><div />
                                        </TripleLine>
                                    </Box>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        {/* Smart Guidance 3-Line Status */}
                                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
                                            <Chip
                                                label="1. Type"
                                                size="small"
                                                variant={post.categories ? 'filled' : 'outlined'}
                                                sx={{ fontSize: 10, bgcolor: post.categories ? '#e8f5e9' : 'transparent', color: post.categories ? '#2e7d32' : 'inherit', border: 'none' }}
                                            />
                                            <Chip
                                                label="2. Content"
                                                size="small"
                                                variant={post.title ? 'filled' : 'outlined'}
                                                sx={{ fontSize: 10, bgcolor: post.title ? '#e8f5e9' : 'transparent', color: post.title ? '#2e7d32' : 'inherit', border: 'none' }}
                                            />
                                            <Chip
                                                label="3. Ready"
                                                size="small"
                                                variant={post.title && (post.story || post.description) ? 'filled' : 'outlined'}
                                                sx={{ fontSize: 10, bgcolor: post.title && (post.story || post.description) ? '#e8f5e9' : 'transparent', color: post.title && (post.story || post.description) ? '#2e7d32' : 'inherit', border: 'none' }}
                                            />
                                        </Box>
                                        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', lg: 'block' }, mx: 1 }} />
                                        {localStorage.getItem('studio_draft') && !isEdit && <Chip label="Draft Saved" size="small" variant="outlined" color="success" sx={{ height: 20, fontSize: 10 }} />}
                                        <Chip label={post.categories} color="primary" sx={{ fontWeight: 800, borderRadius: '10px' }} />
                                    </Stack>
                                </Box>

                                <Stack spacing={4}>
                                    {/* Conditional Image Dropzone */}
                                    {['Blog', 'Story', 'Name', 'Project', 'Certificate'].includes(post.categories) && (
                                        <label htmlFor="file-upload">
                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*,video/*"
                                                style={{ display: 'none' }}
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                            <HeroDropzone $url={post.mediaType === 'Image' ? post.picture : null}>
                                                {/* Video Preview */}
                                                {post.picture && post.mediaType === 'Video' && (
                                                    <video
                                                        src={post.picture}
                                                        controls
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            borderRadius: '30px'
                                                        }}
                                                    />
                                                )}

                                                <Box className="overlay" sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: 0, transition: '0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 10 }}>
                                                    <PhotoCamera sx={{ fontSize: 50, mb: 2 }} />
                                                    <Typography variant="h6" fontWeight={800}>Change Cover</Typography>
                                                </Box>
                                                {!post.picture && !loading && (
                                                    <Stack alignItems="center" spacing={1} sx={{ opacity: 0.3 }}>
                                                        <AddPhotoAlternate sx={{ fontSize: 60 }} />
                                                        <Typography variant="h6" fontWeight={800}>Upload {post.categories === 'Name' ? 'Profile Picture' : post.categories === 'Certificate' ? 'Certificate' : 'Cover Media'}</Typography>
                                                        <Typography variant="caption" sx={{ opacity: 0.6 }}>Supports Images & Videos</Typography>
                                                    </Stack>
                                                )}
                                                {loading && <CircularProgress color="primary" />}
                                            </HeroDropzone>
                                            {/* Media Type Indicator */}
                                            {post.picture && (
                                                <Chip
                                                    icon={post.mediaType === 'Video' ? <Videocam /> : <AddPhotoAlternate />}
                                                    label={`${post.mediaType} Uploaded`}
                                                    color="success"
                                                    size="small"
                                                    sx={{
                                                        mt: 1,
                                                        fontWeight: 700,
                                                        borderRadius: '12px',
                                                        bgcolor: 'rgba(46, 125, 50, 0.1)',
                                                        color: '#2e7d32',
                                                        border: '1px solid rgba(46, 125, 50, 0.3)'
                                                    }}
                                                />
                                            )}
                                        </label>
                                    )}

                                    {/* Common Title/Abstract */}
                                    <StyledInput
                                        fullWidth
                                        label={
                                            <Box sx={{ display: 'flex' }}>
                                                {post.categories === 'Contact' ? 'Contact Name' : post.categories === 'Name' ? 'Identity Identifier' : 'Transmission Headline'}
                                                {post.categories !== 'Contact' && <Typography color="error" sx={{ ml: 0.5 }}>*</Typography>}
                                            </Box>
                                        }
                                        name="title"
                                        value={post.title}
                                        onChange={handleChange}
                                        placeholder={post.categories === 'Name' ? "e.g. AGENT VANGUARD - SENIOR ARCHITECT" : "Identify this transmission..."}
                                    />

                                    {/* Category Specific Fields */}
                                    {post.categories === 'Name' && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Professional Headline" name="techStack" value={post.techStack} onChange={handleChange} placeholder="e.g. Full Stack Developer | UI/UX Designer" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Email Address" name="contact" value={post.contact} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Phone Number" name="phoneNumber" value={post.phoneNumber} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Phone color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <StyledInput fullWidth label="LinkedIn URL" name="linkedIn" value={post.linkedIn} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LinkedIn color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <StyledInput fullWidth label="GitHub URL" name="githubLink" value={post.githubLink} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><GitHub /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <StyledInput fullWidth label="Resume / Portfolio (Live Link)" name="liveLink" value={post.liveLink} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Language color="primary" /></InputAdornment> }} />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {post.categories === 'Contact' && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="LinkedIn" name="linkedIn" value={post.linkedIn} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LinkedIn color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Phone" name="phoneNumber" value={post.phoneNumber} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Phone color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Email Address" name="contact" value={post.contact} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment> }} />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {post.categories === 'Project' && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="GitHub URL" name="githubLink" value={post.githubLink} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><GitHub /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Live Demo URL" name="liveLink" value={post.liveLink} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Language color="primary" /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Tech Stack (Comma separated)" name="techStack" value={post.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB..." />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {post.categories === 'Skill' && (
                                        <Stack spacing={4}>
                                            {/* Quick Add Section */}
                                            <Box>
                                                <Typography variant="overline" sx={{ opacity: 0.6, fontWeight: 900, mb: 1, display: 'block' }}>Quick Add Popular Skills (1-Click)</Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                                    {popularSkills.map(s => (
                                                        <Chip
                                                            key={s.name}
                                                            avatar={<Avatar src={`https://skillicons.dev/icons?i=${s.icon}`} sx={{ width: 24, height: 24 }} />}
                                                            label={s.name}
                                                            onClick={() => handleQuickAdd(s.name)}
                                                            clickable
                                                            sx={{
                                                                borderRadius: '12px',
                                                                bgcolor: 'white',
                                                                border: '1px solid rgba(0,0,0,0.1)',
                                                                transition: '0.3s',
                                                                '&:hover': {
                                                                    bgcolor: '#667eea',
                                                                    color: 'white',
                                                                    transform: 'translateY(-2px)'
                                                                }
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>

                                            <Divider>OR MANUALLY ADD</Divider>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <Box sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                                    {post.title ? (
                                                        <img
                                                            src={`https://skillicons.dev/icons?i=${getIconName(post.title)}&theme=light`}
                                                            alt="Preview"
                                                            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                                            onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/2103/2103930.png'; }}
                                                        />
                                                    ) : (
                                                        <Code color="disabled" sx={{ fontSize: 40 }} />
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" fontWeight={800}>Live Preview</Typography>
                                                    <Typography variant="body2" color="text.secondary">Skill: <b>{post.title || 'None'}</b></Typography>
                                                </Box>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <StyledInput fullWidth label="Skill Category" name="skills" value={post.skills} onChange={handleChange} placeholder="e.g. Frontend / Backend" />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <StyledInput fullWidth label="Proficiency Level" name="liveLink" value={post.liveLink} onChange={handleChange} placeholder="Expert / Intermediate" />
                                                </Grid>
                                            </Grid>

                                            {/* Skills Gallery */}
                                            {userSkills.length > 0 && (
                                                <Box sx={{ mt: 2, p: 3, bgcolor: 'rgba(102, 126, 234, 0.05)', borderRadius: '24px' }}>
                                                    <Typography variant="overline" sx={{ opacity: 0.6, fontWeight: 900, mb: 1, display: 'block' }}>Already Added ({userSkills.length})</Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                                        {userSkills.map((skill, idx) => (
                                                            <Tooltip key={idx} title={`${skill.title} (${skill.liveLink || 'N/A'})`}>
                                                                <Box
                                                                    sx={{
                                                                        p: 1,
                                                                        bgcolor: 'white',
                                                                        borderRadius: '10px',
                                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                                        transition: '0.2s',
                                                                        '&:hover': { transform: 'scale(1.1)' }
                                                                    }}
                                                                >
                                                                    <img src={`https://skillicons.dev/icons?i=${getIconName(skill.title)}`} style={{ width: 35, display: 'block' }} />
                                                                </Box>
                                                            </Tooltip>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}
                                        </Stack>
                                    )}

                                    {post.categories === 'Education' && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Degree / Course" name="title" value={post.title} onChange={handleChange} placeholder="e.g. 10th / 12th / B.Tech Computer Science" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Institution / School" name="techStack" value={post.techStack} onChange={handleChange} placeholder="e.g. MIT / Delhi Public School" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Percentage / CGPA" name="githubLink" value={post.githubLink} onChange={handleChange} placeholder="e.g. 85% / 9.2 CGPA" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Year of Completion" name="liveLink" value={post.liveLink} onChange={handleChange} placeholder="e.g. 2021" />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {post.categories === 'Work' && (
                                        <StyledInput fullWidth label="Organization / Institution" name="techStack" value={post.techStack} onChange={handleChange} placeholder="e.g. Google / Freelance" />
                                    )}

                                    {post.categories === 'Certificate' && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <StyledInput fullWidth label="Certificate Name" name="title" value={post.title} onChange={handleChange} placeholder="e.g. AWS Certified Developer" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Issuing Organization" name="liveLink" value={post.liveLink} onChange={handleChange} placeholder="e.g. Amazon / Coursera" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <StyledInput fullWidth label="Issue Date / Year" name="techStack" value={post.techStack} onChange={handleChange} placeholder="e.g. Jan 2023" />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Common Description with Character Count */}
                                    <Box>
                                        <StyledInput
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label={post.categories === 'Education' || post.categories === 'Certificate' ? 'Additional Details' : 'Narrative / Description'}
                                            name="description"
                                            value={post.description}
                                            onChange={handleChange}
                                            placeholder="Add more details here..."
                                        />
                                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1, opacity: 0.6 }}>
                                            {(post.description || '').length} characters
                                        </Typography>
                                    </Box>

                                    {/* Blog/Story Content */}
                                    {(post.categories === 'Blog' || post.categories === 'Story') && (
                                        <Box>
                                            <StyledInput
                                                fullWidth
                                                multiline
                                                rows={10}
                                                label="Content / Story Body"
                                                name="story"
                                                value={post.story}
                                                onChange={handleChange}
                                                placeholder="Write your beautiful story here..."
                                            />
                                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1, opacity: 0.6 }}>
                                                {(post.story || '').length} characters
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Footer Actions */}
                                    <Box sx={{ pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <ActionButton onClick={() => navigate(-1)}>Cancel</ActionButton>
                                            {!isEdit && (
                                                <ActionButton
                                                    onClick={handleReset}
                                                    sx={{ color: '#ff4757', '&:hover': { background: 'rgba(255, 71, 87, 0.05)' } }}
                                                    startIcon={<RestartAlt />}
                                                >
                                                    Reset Form
                                                </ActionButton>
                                            )}
                                            {isEdit && (
                                                <ActionButton
                                                    onClick={handleDelete}
                                                    sx={{ color: '#d32f2f', '&:hover': { background: 'rgba(211, 47, 47, 0.05)' } }}
                                                    startIcon={<Delete />}
                                                >
                                                    Delete Item
                                                </ActionButton>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                            {!isEdit && (
                                                <>
                                                    <ActionButton
                                                        sx={{ border: '1px solid #667eea', color: '#667eea' }}
                                                        onClick={() => handleSave(true)}
                                                    >
                                                        Publish & Add Another {post.categories === 'Name' ? 'Profile' : post.categories}
                                                    </ActionButton>
                                                    {getNextFlowCategory(post.categories) && (
                                                        <ActionButton
                                                            sx={{ border: '1px solid #764ba2', color: '#764ba2', bgcolor: 'rgba(118, 75, 162, 0.05)' }}
                                                            onClick={() => handleSave(false, getNextFlowCategory(post.categories))}
                                                        >
                                                            Publish & Start {getNextFlowCategory(post.categories)}s
                                                        </ActionButton>
                                                    )}
                                                </>
                                            )}
                                            <ActionButton $primary onClick={() => handleSave(false)}>
                                                {isEdit ? 'Save Changes' : 'Publish Item'}
                                            </ActionButton>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </MainCard>
            </Fade>
        </PageWrapper>
    );
};

export default CreatePost;