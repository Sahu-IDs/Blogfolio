import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardMedia, Box, Chip, Container, Stack, Paper, TextField, Avatar, IconButton, Tooltip, Divider } from "@mui/material";
import { styled, alpha, keyframes } from '@mui/material/styles';
import { Phone, Email, Send, LinkedIn, GitHub, School, Work, Code, EmojiEvents, Delete, Language, OpenInNew, Bolt, TrendingFlat } from '@mui/icons-material';
import { API } from '../../service/api';

// --- ELITE ANIMATIONS ---
const shine = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
  50% { box-shadow: 0 0 50px rgba(99, 102, 241, 0.5); }
  100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLED COMPONENTS (ELITE VERSION) ---
const EliteStyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
    backdropFilter: 'blur(50px) saturate(180%)',
    borderRadius: '40px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    height: '100%',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '40px',
        padding: '1px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0,
        transition: 'opacity 0.5s ease'
    },
    '&:hover': {
        transform: 'translateY(-20px) scale(1.02)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
        borderColor: 'rgba(99, 102, 241, 0.6)',
        boxShadow: '0 40px 80px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        '&::before': { opacity: 1 },
        '& .delete-btn': { opacity: 1, transform: 'scale(1)' },
        '& .media-zoom': { transform: 'scale(1.1)' }
    }
}));

const EliteDeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    opacity: 0,
    transform: 'scale(0.8)',
    transition: '0.3s',
    zIndex: 10,
    '&:hover': { backgroundColor: '#ef4444', color: 'white' }
}));

const EliteSectionTitle = ({ children, subtitle }) => (
    <Box sx={{ mb: 12, textAlign: 'center', position: 'relative' }}>
        <Typography variant="overline" sx={{
            letterSpacing: 10,
            color: '#6366f1',
            fontWeight: 900,
            fontSize: '0.9rem',
            display: 'block',
            mb: 2
        }}>
            PORTFOLIO
        </Typography>
        <Typography variant="h2" sx={{
            fontWeight: 950,
            fontSize: { xs: '3rem', md: '4.5rem' },
            letterSpacing: '-4px',
            mt: 1,
            mb: 3,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                borderRadius: 10,
                background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                boxShadow: '0 0 20px rgba(99,102,241,0.5)'
            }
        }}>
            {children}
        </Typography>
        {subtitle && (
            <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.5)',
                mt: 4,
                maxWidth: '700px',
                mx: 'auto',
                fontSize: '1.15rem',
                lineHeight: 1.8,
                fontWeight: 400
            }}>
                {subtitle}
            </Typography>
        )}
    </Box>
);

const EliteTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        color: 'white',
        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
        '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.3)' },
        '&.Mui-focused fieldset': { borderColor: '#6366f1' },
    },
    '& label': { color: 'rgba(255, 255, 255, 0.4)' },
    '& label.Mui-focused': { color: '#6366f1' },
});

const EliteMagicButton = styled(Button)({
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    color: 'white',
    borderRadius: '20px',
    padding: '16px 40px',
    fontWeight: 950,
    textTransform: 'none',
    letterSpacing: '1px',
    fontSize: '1.1rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
    transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 30px 60px rgba(99, 102, 241, 0.4)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: `${shine} 3s infinite`,
    }
});

const getIconUrl = (title) => {
    if (!title) return '';
    const raw = title.toLowerCase().trim();
    const map = {
        'c++': 'cpp', 'c#': 'cs', 'c': 'c', 'html': 'html', 'css': 'css', 'javascript': 'js', 'js': 'js', 'typescript': 'ts',
        'react': 'react', 'reactjs': 'react', 'node.js': 'nodejs', 'express': 'express', 'java': 'java', 'python': 'py',
        'sql': 'mysql', 'mongodb': 'mongodb', 'git': 'git', 'aws': 'aws', 'docker': 'docker', 'linux': 'linux', 'figma': 'figma',
        'next.js': 'nextjs', 'vite': 'vite', 'firebase': 'firebase', 'redux': 'redux'
    };
    const slug = map[raw] || raw.replace(/[ .]/g, '');
    return `https://skillicons.dev/icons?i=${slug}&theme=dark`;
};

// --- SECTIONS ---

export const HeroSection = ({ personalInfo, handleDelete, isAuth, isOwnerPortfolioView }) => {
    return (
        <Box sx={{ mb: 15, position: 'relative' }}>
            <Paper elevation={0} sx={{
                p: { xs: 6, md: 12 },
                borderRadius: '70px',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
                backdropFilter: 'blur(60px) saturate(180%)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '70px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.4))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: `${pulse} 3s ease-in-out infinite`
                }
            }}>
                <Box sx={{ position: 'absolute', top: '-10%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(80px)', animation: `${pulse} 8s ease-in-out infinite` }} />
                <Box sx={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', filter: 'blur(80px)', animation: `${pulse} 10s ease-in-out infinite reverse` }} />

                <Grid container spacing={10} alignItems="center">
                    <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Box sx={{
                                position: 'absolute',
                                inset: -30,
                                borderRadius: '50%',
                                border: '3px dashed rgba(99,102,241,0.4)',
                                animation: `${rotate} 30s linear infinite`
                            }} />
                            <Box sx={{
                                position: 'absolute',
                                inset: -15,
                                borderRadius: '50%',
                                background: 'conic-gradient(from 0deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(99,102,241,0.3))',
                                filter: 'blur(20px)',
                                animation: `${rotate} 20s linear infinite reverse`
                            }} />
                            <Avatar
                                src={personalInfo.picture}
                                sx={{
                                    width: { xs: 280, md: 400 },
                                    height: { xs: 280, md: 400 },
                                    border: '12px solid rgba(30, 41, 59, 0.8)',
                                    boxShadow: '0 50px 100px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.3)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                            <Bolt sx={{ color: '#6366f1', fontSize: 32 }} />
                            <Typography variant="overline" sx={{ letterSpacing: 6, color: '#6366f1', fontWeight: 900, fontSize: '0.95rem' }}>SOFTWARE DEVELOPER</Typography>
                            {isOwnerPortfolioView && (
                                <Chip
                                    label="👑 PRINCIPAL OWNER"
                                    size="small"
                                    sx={{
                                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                        color: '#000',
                                        fontWeight: 900,
                                        letterSpacing: 1,
                                        border: '1px solid #FFD700',
                                        boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                                    }}
                                />
                            )}
                        </Stack>
                        <Typography variant="h1" sx={{
                            color: 'white',
                            fontWeight: 950,
                            fontSize: { xs: '3.5rem', md: '6rem' },
                            letterSpacing: '-5px',
                            lineHeight: 0.95,
                            mb: 4,
                            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
                        }}>
                            {personalInfo.title}
                        </Typography>
                        <Typography variant="h5" sx={{
                            background: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 500,
                            mb: 6,
                            lineHeight: 1.8,
                            maxWidth: '650px',
                            letterSpacing: '0.5px'
                        }}>
                            {personalInfo.techStack || "Forging complex digital ecosystems with high-performance code and elite aesthetics."}
                        </Typography>
                        <Stack direction="row" spacing={3} flexWrap="wrap" gap={3}>
                            <EliteMagicButton href="#projects" endIcon={<TrendingFlat />}>View Projects</EliteMagicButton>
                            <Button
                                variant="outlined"
                                href={personalInfo.githubLink || "#"}
                                sx={{
                                    borderRadius: '20px',
                                    px: 6,
                                    py: 2,
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.15)',
                                    fontWeight: 900,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    backdropFilter: 'blur(10px)',
                                    background: 'rgba(255,255,255,0.02)',
                                    '&:hover': {
                                        borderColor: '#6366f1',
                                        bgcolor: 'rgba(99,102,241,0.1)',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 10px 30px rgba(99,102,241,0.3)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                GitHub Profile
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {isAuth && (
                    <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(personalInfo._id)}>
                        <Delete />
                    </EliteDeleteButton>
                )}
            </Paper>
        </Box>
    );
};

export const SkillsSection = ({ skills, handleDelete, isAuth }) => (
    <Box sx={{ mb: 15 }}>
        <EliteSectionTitle subtitle="Technical proficiency across the full stack ecosystem.">Technical Expertise</EliteSectionTitle>
        <Grid container spacing={3}>
            {skills.map((item, index) => (
                <Grid item xs={6} sm={4} md={2} key={item._id}>
                    <EliteStyledCard sx={{
                        p: 4,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: 0,
                        animation: `${fadeInUp} 0.6s ease-out forwards`,
                        animationDelay: `${index * 0.1}s`
                    }}>
                        <Box sx={{ width: 80, height: 80, mb: 3, transition: '0.4s', '&:hover': { transform: 'scale(1.1) rotate(5deg)' } }}>
                            <img src={item.picture || getIconUrl(item.title)} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>
                        <Typography variant="h6" fontWeight="900" sx={{ color: 'white' }}>{item.title}</Typography>
                        {isAuth && <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(item._id)}><Delete /></EliteDeleteButton>}
                    </EliteStyledCard>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export const ExperienceSection = ({ experience, handleDelete, isAuth }) => (
    <Box sx={{ mb: 15 }}>
        <EliteSectionTitle subtitle="A timeline of professional deployments and key technical roles.">Professional Experience</EliteSectionTitle>
        <Stack spacing={4}>
            {experience.map((item, index) => (
                <EliteStyledCard key={item._id} sx={{
                    p: 5,
                    opacity: 0,
                    animation: `${fadeInUp} 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.15}s`
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                            <Box sx={{ width: 60, height: 60, borderRadius: '20px', bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Work sx={{ fontSize: 30 }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={11}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={2}>
                                <Box>
                                    <Typography variant="h4" fontWeight="950" sx={{ color: 'white', letterSpacing: '-1px' }}>{item.title}</Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#6366f1', fontWeight: 800 }}>{item.liveLink}</Typography>
                                </Box>
                                <Chip label={item.techStack} sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 800, borderRadius: '10px' }} />
                            </Stack>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{item.description}</Typography>
                        </Grid>
                    </Grid>
                    {isAuth && <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(item._id)}><Delete /></EliteDeleteButton>}
                </EliteStyledCard>
            ))}
        </Stack>
    </Box>
);

export const ProjectsSection = ({ projects, handleDelete, isAuth }) => (
    <Box sx={{ mb: 15 }}>
        <EliteSectionTitle subtitle="High-performance digital products engineered for efficiency and scale.">Featured Projects</EliteSectionTitle>
        <Grid container spacing={4}>
            {projects.map((item, index) => (
                <Grid item xs={12} md={6} lg={4} key={item._id} sx={{ display: 'flex' }}>
                    <EliteStyledCard sx={{
                        width: '100%',
                        opacity: 0,
                        animation: `${fadeInUp} 0.6s ease-out forwards`,
                        animationDelay: `${index * 0.2}s`
                    }}>
                        <Box sx={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                            <CardMedia component={item.mediaType === 'Video' ? 'video' : 'img'} src={item.picture} image={item.picture} autoPlay muted loop sx={{ height: '100%', objectFit: 'cover', transition: '0.8s' }} className="media-zoom" />
                            <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                                <Chip label={item.techStack?.split(',')[0]} sx={{ bgcolor: 'rgba(5, 7, 10, 0.8)', color: 'white', fontWeight: 900, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }} />
                            </Box>
                        </Box>
                        <CardContent sx={{ p: 4, flexGrow: 1 }}>
                            <Typography variant="h4" fontWeight="950" sx={{ color: 'white', mb: 2, letterSpacing: '-1px' }}>{item.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4, lineHeight: 1.6 }}>{item.description}</Typography>
                            <Stack direction="row" spacing={2}>
                                <EliteMagicButton fullWidth href={item.liveLink || "#"} target="_blank" endIcon={<OpenInNew />}>Live Demo</EliteMagicButton>
                                <IconButton href={item.githubLink || "#"} target="_blank" sx={{ border: '2px solid rgba(255,255,255,0.05)', borderRadius: '15px', color: 'white', '&:hover': { bgcolor: '#6366f1' } }}>
                                    <GitHub />
                                </IconButton>
                            </Stack>
                        </CardContent>
                        {isAuth && <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(item._id)}><Delete /></EliteDeleteButton>}
                    </EliteStyledCard>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export const EducationSection = ({ education, handleDelete, isAuth }) => (
    <Box sx={{ mb: 15 }}>
        <EliteSectionTitle subtitle="Core academic foundations and theoretical computer science training.">Education</EliteSectionTitle>
        <Grid container spacing={4}>
            {education.map((item, index) => (
                <Grid item xs={12} md={6} key={item._id}>
                    <EliteStyledCard sx={{
                        p: 5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        opacity: 0,
                        animation: `${fadeInUp} 0.6s ease-out forwards`,
                        animationDelay: `${index * 0.15}s`
                    }}>
                        <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <School sx={{ fontSize: 40 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="950" sx={{ color: 'white', letterSpacing: '-1px' }}>{item.title}</Typography>
                            <Typography variant="h6" sx={{ color: '#a855f7', fontWeight: 800 }}>{item.liveLink}</Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{item.techStack}</Typography>
                        </Box>
                        {isAuth && <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(item._id)}><Delete /></EliteDeleteButton>}
                    </EliteStyledCard>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export const CertificatesSection = ({ certificates, handleDelete, isAuth }) => (
    <Box sx={{ mb: 15 }}>
        <EliteSectionTitle subtitle="Verified certifications and professional technical accolades.">Certifications</EliteSectionTitle>
        <Grid container spacing={3}>
            {certificates.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={item._id}>
                    <EliteStyledCard sx={{
                        p: 4,
                        textAlign: 'center',
                        opacity: 0,
                        animation: `${fadeInUp} 0.6s ease-out forwards`,
                        animationDelay: `${index * 0.1}s`
                    }}>
                        <EmojiEvents sx={{ fontSize: 50, color: '#fbbf24', mb: 3 }} />
                        <Typography variant="h5" fontWeight="950" sx={{ color: 'white', mb: 1 }}>{item.title}</Typography>
                        <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 800, mb: 3 }}>{item.liveLink}</Typography>
                        <Button variant="contained" href={item.picture} target="_blank" sx={{ bgcolor: 'rgba(255,255,255,0.03)', color: 'white', borderRadius: '15px', fontWeight: 900, textTransform: 'none', border: '1px solid rgba(255,255,255,0.08)', '&:hover': { bgcolor: '#6366f1' } }}>View Credentials</Button>
                        {isAuth && <EliteDeleteButton className="delete-btn" onClick={() => handleDelete(item._id)}><Delete /></EliteDeleteButton>}
                    </EliteStyledCard>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export const ContactSection = ({ contactInfo, handleDelete, isAuth, userId }) => {
    const [msg, setMsg] = useState({ senderName: '', senderEmail: '', message: '' });
    const [sending, setSending] = useState(false);

    const presetMessages = ["Hire for Collaboration", "Project Consultation", "Web Development Inquiry", "General Professional Question"];

    const sendMessage = async () => {
        if (!msg.senderName || !msg.senderEmail || !msg.message) return alert("Fill all fields.");
        setSending(true);
        try {
            const receiverId = userId || contactInfo?.userId || contactInfo?._id;
            // Force fallback if no email found
            const ownerEmail = contactInfo?.email || contactInfo?.contact || 'vaibhav12679@gmail.com';

            console.log('📧 Sending message to:', ownerEmail);

            const response = await API.newMessage({
                ...msg,
                receiverId,
                ownerEmail
            });

            if (response.isSuccess) {
                alert("Message Sent Successfully! I will get back to you soon.");
                setMsg({ senderName: '', senderEmail: '', message: '' });
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

    // OWNER ID (Sandeep/Admin)
    const OWNER_ID = '697b9fcebc927aa3691a0231';

    // Fix: If userId is undefined/null, it means we are on Main Page (Owner's Page)
    const isOwnerPortfolio = !userId || userId === OWNER_ID;

    // Determine Display Values
    const displayPhone = isOwnerPortfolio
        ? (contactInfo?.phoneNumber || contactInfo?.phone || '+91 6394-767-773')
        : (contactInfo?.phoneNumber || contactInfo?.phone || 'Contact not listed');

    const displayEmail = isOwnerPortfolio
        ? (contactInfo?.email || contactInfo?.contact || 'vaibhav12679@gmail.com')
        : (contactInfo?.email || contactInfo?.contact || 'Contact not listed');

    return (
        <Box sx={{ mt: 10 }}>
            <Paper elevation={0} sx={{ p: { xs: 6, md: 10 }, borderRadius: '60px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h2" fontWeight="950" sx={{ color: 'white', mb: 3, letterSpacing: '-3px' }}>Reach <br /> <span style={{ color: '#6366f1' }}>Out.</span></Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', mb: 6, lineHeight: 1.8 }}>
                            Ready to collaborate on something great? Send a message and I'll get back to you shortly.
                        </Typography>
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3, borderRadius: '25px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Phone sx={{ color: '#6366f1' }} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 900 }}>PHONE</Typography>
                                    <Typography variant="h6" fontWeight="900" color="white">
                                        {displayPhone}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3, borderRadius: '25px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Email sx={{ color: '#6366f1' }} />
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 900 }}>EMAIL</Typography>
                                    <Typography variant="h6" fontWeight="900" color="white">
                                        {displayEmail}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack spacing={4}>
                            <Typography variant="h5" fontWeight="950" sx={{ color: 'white' }}>Quick Options</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={2}>
                                {presetMessages.map((m, i) => (
                                    <Chip key={i} label={m} onClick={() => setMsg({ ...msg, message: m })} sx={{ bgcolor: msg.message === m ? '#6366f1' : 'rgba(255,255,255,0.03)', color: 'white', fontWeight: 800, py: 3, px: 1, borderRadius: '15px', '&:hover': { bgcolor: '#6366f1' } }} />
                                ))}
                            </Stack>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}><EliteTextField fullWidth label="Full Name" value={msg.senderName} onChange={(e) => setMsg({ ...msg, senderName: e.target.value })} /></Grid>
                                <Grid item xs={12} sm={6}><EliteTextField fullWidth label="Email Address" value={msg.senderEmail} onChange={(e) => setMsg({ ...msg, senderEmail: e.target.value })} /></Grid>
                                <Grid item xs={12}><EliteTextField fullWidth multiline rows={4} label="Message" value={msg.message} onChange={(e) => setMsg({ ...msg, message: e.target.value })} /></Grid>
                            </Grid>
                            <EliteMagicButton onClick={sendMessage} disabled={sending}>{sending ? "Sending..." : "Send Message"}</EliteMagicButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
