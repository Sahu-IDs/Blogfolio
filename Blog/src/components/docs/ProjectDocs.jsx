
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Paper, Chip, Stack, Divider, Button, Collapse, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Storage, Cloud, Code, Security, Devices, Loop, AccountTree, Psychology, Speed, Api, DataObject, Lock, ExpandMore, GitHub, LinkedIn, Email, Download, Visibility } from '@mui/icons-material';

// --- ADVANCED ANIMATIONS ---
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(168, 85, 247, 0.4); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- STYLED COMPONENTS ---
const PageWrapper = styled(Box)({
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #05070a 0%, #0a0e1a 50%, #05070a 100%)',
    paddingTop: '100px',
    paddingBottom: '100px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: `${float} 8s ease-in-out infinite`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: `${float} 10s ease-in-out infinite reverse`,
    }
});

const ArchitectureBox = styled(Box)({
    background: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '40px',
    padding: '60px 40px',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '80px',
    animation: `${glow} 3s ease-in-out infinite`,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)',
    }
});

const LayerCard = styled(Paper)(({ $color, $active }) => ({
    background: $active
        ? `linear-gradient(135deg, ${$color}20 0%, rgba(15, 23, 42, 0.9) 100%)`
        : `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)`,
    backdropFilter: 'blur(20px)',
    border: $active ? `2px solid ${$color}` : `2px solid ${$color}40`,
    borderRadius: '30px',
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${$color}20, transparent)`,
        transition: '0.5s',
    },
    '&:hover': {
        transform: 'translateY(-10px) scale(1.02)',
        borderColor: $color,
        boxShadow: `0 20px 60px ${$color}40`,
        '&::before': {
            left: '100%',
        }
    }
}));

const TechBadge = styled(Chip)(({ $color }) => ({
    background: `${$color}20`,
    color: $color,
    fontWeight: 800,
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
    border: `1px solid ${$color}60`,
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
        background: `${$color}30`,
        transform: 'scale(1.05)',
    }
}));

const ConnectionLine = styled(Box)(({ $color }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '3px',
        background: `linear-gradient(90deg, ${$color}00, ${$color}, ${$color}00)`,
        animation: `${pulse} 2s ease-in-out infinite`,
    }
}));

const FeatureCard = styled(Box)(({ $accent }) => ({
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${$accent}30`,
    borderRadius: '25px',
    padding: '35px',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: `radial-gradient(circle, ${$accent}20 0%, transparent 70%)`,
        borderRadius: '50%',
        transition: '0.4s',
    },
    '&:hover': {
        transform: 'translateY(-8px)',
        borderColor: $accent,
        background: `${$accent}08`,
        boxShadow: `0 15px 40px ${$accent}30`,
        '&::after': {
            width: '200px',
            height: '200px',
        }
    }
}));

const ProjectDocs = () => {
    const navigate = useNavigate();
    const [activeLayer, setActiveLayer] = useState(null);
    const [expandedTech, setExpandedTech] = useState({});

    const handleLayerClick = (layer) => {
        setActiveLayer(activeLayer === layer ? null : layer);
    };

    const handleTechExpand = (tech) => {
        setExpandedTech(prev => ({ ...prev, [tech]: !prev[tech] }));
    };

    const handleDownloadDocs = () => {
        // Simulate documentation download
        alert('📄 Project Documentation will be downloaded!\n\nIncludes:\n✓ System Architecture\n✓ API Documentation\n✓ Database Schema\n✓ Setup Guide');
    };

    const layerDetails = {
        client: {
            title: "Client Layer Details",
            description: "Handles all user interactions and UI rendering. Built with React for component-based architecture.",
            features: ["Component-based UI", "State Management", "Routing", "API Integration"]
        },
        server: {
            title: "Server Layer Details",
            description: "Processes business logic, handles authentication, and manages API routes using Express.js.",
            features: ["RESTful APIs", "JWT Authentication", "Middleware", "Error Handling"]
        },
        database: {
            title: "Database Layer Details",
            description: "Stores and manages all application data using MongoDB with Mongoose for schema validation.",
            features: ["NoSQL Database", "Schema Validation", "Data Relationships", "Cloud Hosting"]
        }
    };

    return (
        <PageWrapper>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* HERO SECTION */}
                <Box sx={{ textAlign: 'center', mb: 12 }}>
                    <Box sx={{ display: 'inline-block', mb: 3 }}>
                        <Chip
                            label="🎓 B.TECH FINAL YEAR PROJECT"
                            sx={{
                                bgcolor: 'rgba(99,102,241,0.15)',
                                color: '#a5b4fc',
                                fontWeight: 900,
                                letterSpacing: 3,
                                fontSize: '0.7rem',
                                border: '1px solid rgba(99,102,241,0.3)',
                                animation: `${slideIn} 0.6s ease-out`
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 950,
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            background: 'linear-gradient(135deg, #fff 0%, #6366f1 50%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-2px',
                            animation: `${slideIn} 0.8s ease-out 0.2s both`
                        }}
                    >
                        BlogFolio Architecture
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#94a3b8',
                            maxWidth: '800px',
                            mx: 'auto',
                            fontWeight: 500,
                            lineHeight: 1.8,
                            animation: `${slideIn} 1s ease-out 0.4s both`,
                            mb: 4
                        }}
                    >
                        A scalable <strong>Public Platform</strong> for developers to share Blogs & Portfolios.
                        Featuring <strong style={{ color: '#6366f1' }}>RBAC Security</strong>, Real-time Interaction, and a premium Glassmorphism UI.
                    </Typography>

                    {/* ACTION BUTTONS */}
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            onClick={handleDownloadDocs}
                            sx={{
                                bgcolor: '#6366f1',
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                fontWeight: 800,
                                '&:hover': { bgcolor: '#4f46e5', transform: 'translateY(-2px)' }
                            }}
                        >
                            Download Docs
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Visibility />}
                            onClick={() => navigate('/')}
                            sx={{
                                borderColor: '#a855f7',
                                color: '#a855f7',
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                fontWeight: 800,
                                '&:hover': { borderColor: '#9333ea', bgcolor: 'rgba(168,85,247,0.1)' }
                            }}
                        >
                            View Live Demo
                        </Button>
                    </Stack>
                </Box>

                {/* ARCHITECTURE DIAGRAM */}
                <ArchitectureBox>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountTree sx={{ fontSize: 35, color: '#6366f1', mr: 2 }} />
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff' }}>
                            MVC Data Flow Architecture
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 6, fontWeight: 600 }}>
                        Click on any layer to view detailed information
                    </Typography>

                    <Grid container spacing={3} alignItems="center" justifyContent="center">
                        {/* CLIENT LAYER */}
                        <Grid item xs={12} md={3}>
                            <LayerCard
                                $color="#6366f1"
                                $active={activeLayer === 'client'}
                                elevation={0}
                                sx={{ animation: `${float} 6s ease-in-out infinite` }}
                                onClick={() => handleLayerClick('client')}
                            >
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
                                }}>
                                    <Devices sx={{ fontSize: 40, color: '#fff' }} />
                                </Box>
                                <Typography variant="h5" fontWeight="900" sx={{ color: '#fff', mb: 1 }}>
                                    VIEW
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#c7d2fe', fontWeight: 700, mb: 3 }}>
                                    Client Layer
                                </Typography>
                                <Divider sx={{ borderColor: 'rgba(99,102,241,0.2)', mb: 2 }} />
                                <Stack spacing={1}>
                                    <TechBadge label="React.js" size="small" $color="#61dafb" onClick={(e) => { e.stopPropagation(); handleTechExpand('react'); }} />
                                    <TechBadge label="Material-UI" size="small" $color="#6366f1" onClick={(e) => { e.stopPropagation(); handleTechExpand('mui'); }} />
                                    <TechBadge label="Axios" size="small" $color="#5a67d8" onClick={(e) => { e.stopPropagation(); handleTechExpand('axios'); }} />
                                </Stack>
                            </LayerCard>
                        </Grid>

                        {/* ARROW 1 */}
                        <Grid item xs={12} md={1}>
                            <ConnectionLine $color="#6366f1">
                                <Api sx={{ fontSize: 35, color: '#6366f1', animation: `${rotate} 4s linear infinite` }} />
                            </ConnectionLine>
                        </Grid>

                        {/* SERVER LAYER */}
                        <Grid item xs={12} md={4}>
                            <LayerCard
                                $color="#a855f7"
                                $active={activeLayer === 'server'}
                                elevation={0}
                                sx={{ animation: `${float} 7s ease-in-out infinite 0.5s` }}
                                onClick={() => handleLayerClick('server')}
                            >
                                <Box sx={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 10px 30px rgba(168,85,247,0.4)',
                                    transform: 'rotate(5deg)'
                                }}>
                                    <AccountTree sx={{ fontSize: 45, color: '#fff' }} />
                                </Box>
                                <Typography variant="h5" fontWeight="900" sx={{ color: '#fff', mb: 1 }}>
                                    CONTROLLER
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#e9d5ff', fontWeight: 700, mb: 3 }}>
                                    Server Layer
                                </Typography>
                                <Divider sx={{ borderColor: 'rgba(168,85,247,0.2)', mb: 2 }} />
                                <Stack spacing={1.5}>
                                    <TechBadge label="🔐 JWT Authentication" size="small" $color="#f59e0b" />
                                    <TechBadge label="🛣️ Express Routes" size="small" $color="#a855f7" />
                                    <TechBadge label="⚡ Business Logic" size="small" $color="#ec4899" />
                                    <TechBadge label="🔄 Middleware" size="small" $color="#8b5cf6" />
                                </Stack>
                            </LayerCard>
                        </Grid>

                        {/* ARROW 2 */}
                        <Grid item xs={12} md={1}>
                            <ConnectionLine $color="#10b981">
                                <DataObject sx={{ fontSize: 35, color: '#10b981', animation: `${pulse} 2s ease-in-out infinite` }} />
                            </ConnectionLine>
                        </Grid>

                        {/* DATABASE LAYER */}
                        <Grid item xs={12} md={3}>
                            <LayerCard
                                $color="#10b981"
                                $active={activeLayer === 'database'}
                                elevation={0}
                                sx={{ animation: `${float} 6s ease-in-out infinite 1s` }}
                                onClick={() => handleLayerClick('database')}
                            >
                                <Box sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '15px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    boxShadow: '0 10px 30px rgba(16,185,129,0.4)'
                                }}>
                                    <Storage sx={{ fontSize: 40, color: '#fff' }} />
                                </Box>
                                <Typography variant="h5" fontWeight="900" sx={{ color: '#fff', mb: 1 }}>
                                    MODEL
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#a7f3d0', fontWeight: 700, mb: 3 }}>
                                    Database Layer
                                </Typography>
                                <Divider sx={{ borderColor: 'rgba(16,185,129,0.2)', mb: 2 }} />
                                <Stack spacing={1}>
                                    <TechBadge label="MongoDB Atlas" size="small" $color="#10b981" />
                                    <TechBadge label="Mongoose ODM" size="small" $color="#059669" />
                                    <TechBadge label="Schemas" size="small" $color="#047857" />
                                </Stack>
                            </LayerCard>
                        </Grid>
                    </Grid>

                    {/* LAYER DETAILS (Expandable) */}
                    {activeLayer && (
                        <Collapse in={Boolean(activeLayer)}>
                            <Box sx={{ mt: 4, p: 4, background: 'rgba(99,102,241,0.1)', borderRadius: '25px', border: '1px solid rgba(99,102,241,0.3)' }}>
                                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
                                    {layerDetails[activeLayer].title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3, lineHeight: 1.8 }}>
                                    {layerDetails[activeLayer].description}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 800, mb: 2 }}>
                                    KEY FEATURES:
                                </Typography>
                                <Grid container spacing={2}>
                                    {layerDetails[activeLayer].features.map((feature, idx) => (
                                        <Grid item xs={6} md={3} key={idx}>
                                            <Chip
                                                label={feature}
                                                sx={{
                                                    bgcolor: 'rgba(99,102,241,0.2)',
                                                    color: '#c7d2fe',
                                                    fontWeight: 700,
                                                    width: '100%'
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Collapse>
                    )}

                    {/* DATA FLOW DESCRIPTION */}
                    <Box sx={{ mt: 6, p: 4, background: 'rgba(99,102,241,0.05)', borderRadius: '25px', border: '1px dashed rgba(99,102,241,0.3)' }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Speed sx={{ mr: 1, color: '#6366f1' }} /> Request-Response Flow
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8, fontWeight: 500 }}>
                            <strong style={{ color: '#6366f1' }}>1. User Interaction</strong> → Client sends HTTP request via Axios<br />
                            <strong style={{ color: '#a855f7' }}>2. Server Processing</strong> → Express routes handle request, JWT validates auth<br />
                            <strong style={{ color: '#10b981' }}>3. Database Query</strong> → Mongoose fetches/updates data from MongoDB<br />
                            <strong style={{ color: '#f59e0b' }}>4. Response</strong> → JSON data flows back through Controller to View
                        </Typography>
                    </Box>
                </ArchitectureBox>

                {/* TECH STACK GRID */}
                <Box sx={{ mb: 10 }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textAlign: 'center', color: '#fff' }}>
                        Technology Stack
                    </Typography>
                    <Grid container spacing={3}>
                        {[
                            { icon: <Code />, title: "Frontend", tech: "React.js, Material-UI, React Router", color: "#61dafb", path: "/" },
                            { icon: <Cloud />, title: "Backend", tech: "Node.js, Express.js (MVC)", color: "#68a063", path: null },
                            { icon: <Storage />, title: "Database", tech: "MongoDB Atlas, Mongoose ODM", color: "#10b981", path: null },
                            { icon: <Lock />, title: "Security", tech: "JWT, Bcrypt, CORS Protection", color: "#f43f5e", path: "/login" }
                        ].map((item, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <FeatureCard
                                    $accent={item.color}
                                    onClick={() => item.path && navigate(item.path)}
                                >
                                    <Box sx={{ fontSize: 50, color: item.color, mb: 2 }}>{item.icon}</Box>
                                    <Typography variant="h6" fontWeight="900" sx={{ color: '#fff', mb: 1 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, lineHeight: 1.6 }}>
                                        {item.tech}
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* FUTURE ROADMAP */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: '#fff' }}>
                        Future Roadmap
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8', mb: 6, maxWidth: '700px', mx: 'auto' }}>
                        Planned enhancements to scale the platform and improve user experience.
                    </Typography>
                    <Grid container spacing={3}>
                        {[
                            { icon: <Psychology />, title: "AI Integration", desc: "Resume parsing & intelligent chatbot", color: "#f59e0b" },
                            { icon: <Cloud />, title: "Cloud Deployment", desc: "Docker + AWS/Azure CI/CD", color: "#3b82f6" },
                            { icon: <Security />, title: "Advanced Auth", desc: "2FA & OAuth (Google/GitHub)", color: "#ef4444" }
                        ].map((item, idx) => (
                            <Grid item xs={12} md={4} key={idx}>
                                <FeatureCard $accent={item.color}>
                                    <Box sx={{ fontSize: 45, color: item.color, mb: 2 }}>{item.icon}</Box>
                                    <Typography variant="h6" fontWeight="800" sx={{ color: '#fff', mb: 1 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                        {item.desc}
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CONTACT FOOTER */}
                <Box sx={{ mt: 10, p: 4, background: 'rgba(30,41,59,0.4)', borderRadius: '30px', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 3 }}>
                        Connect With Developer
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <IconButton
                            sx={{ bgcolor: 'rgba(99,102,241,0.2)', color: '#6366f1', '&:hover': { bgcolor: 'rgba(99,102,241,0.3)' } }}
                            onClick={() => window.open('https://github.com', '_blank')}
                        >
                            <GitHub />
                        </IconButton>
                        <IconButton
                            sx={{ bgcolor: 'rgba(14,165,233,0.2)', color: '#0ea5e9', '&:hover': { bgcolor: 'rgba(14,165,233,0.3)' } }}
                            onClick={() => window.open('https://linkedin.com', '_blank')}
                        >
                            <LinkedIn />
                        </IconButton>
                        <IconButton
                            sx={{ bgcolor: 'rgba(239,68,68,0.2)', color: '#ef4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.3)' } }}
                            onClick={() => window.location.href = 'mailto:sandeepsahu12176@gmail.com'}
                        >
                            <Email />
                        </IconButton>
                    </Stack>
                </Box>

            </Container>
        </PageWrapper>
    );
};

export default ProjectDocs;
