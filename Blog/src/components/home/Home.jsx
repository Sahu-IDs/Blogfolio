import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Stack, Chip, styled } from '@mui/material';
import { Bolt, Person, TrendingFlat, Shield, VerifiedUser, Lock } from '@mui/icons-material';
import { AutoGraph, LibraryBooks, RocketLaunch } from '@mui/icons-material';
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';
import PortfolioShowcase from './PortfolioShowcase';
import { DataContext } from '../../DataProvider';

// --- STYLED COMPONENTS ---
const PageWrapper = styled(Box)({
    minHeight: '100vh',
    background: '#05070a',
});

const EliteSection = styled(Box)(({ $light }) => ({
    padding: '120px 0',
    position: 'relative',
    background: $light ? 'linear-gradient(180deg, #0a0e1a 0%, #05070a 100%)' : '#05070a',
    overflow: 'hidden',
}));

const GlobalTitle = styled(Typography)({
    fontSize: '4rem',
    fontWeight: 950,
    color: 'white',
    textAlign: 'center',
    letterSpacing: '-3px',
    marginBottom: '20px',
    '@media (max-width: 600px)': {
        fontSize: '2.5rem',
    }
});

const GlobalSubtitle = styled(Typography)({
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 60px',
    lineHeight: 1.8,
});

const EliteCard = styled(Box)(({ $accent }) => ({
    background: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(40px)',
    borderRadius: '35px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '50px 40px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-10px)',
        borderColor: $accent,
        boxShadow: `0 30px 60px ${$accent}40`,
        '& .icon-box': {
            transform: 'scale(1.1) rotate(5deg)',
            background: $accent,
        }
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${$accent}20 0%, transparent 70%)`,
        borderRadius: '50%',
    }
}));

const IconBox = styled(Box)(({ $accent }) => ({
    width: '80px',
    height: '80px',
    borderRadius: '25px',
    background: `${$accent}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
    '& svg': {
        fontSize: '40px',
        color: $accent,
    }
}));

const Home = () => {
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    const features = [
        {
            title: 'Build Portfolio',
            desc: 'Start building your professional identity instantly.',
            icon: <AutoGraph />,
            accent: '#6366f1',
            path: '/portfolio'
        },
        {
            title: 'Write Blogs',
            desc: 'Share your voice and insights with the world.',
            icon: <LibraryBooks />,
            accent: '#a855f7',
            path: '/create'
        },
        {
            title: 'Grow Network',
            desc: 'Connect with top creators and expand your circle.',
            icon: <RocketLaunch />,
            accent: '#ec4899',
            navId: 'portfolios'
        }
    ];

    const handleFeatureClick = (feature) => {
        if (feature.path) {
            navigate(feature.path);
        } else if (feature.navId) {
            const element = document.getElementById(feature.navId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <PageWrapper>
            {/* Banner Section */}
            <Banner />

            {/* Core Features */}
            <EliteSection $light>
                <Container maxWidth="lg">
                    <Typography variant="overline" sx={{ letterSpacing: 8, color: '#6366f1', display: 'block', textAlign: 'center', fontWeight: 900, mb: 2 }}>start now</Typography>
                    <GlobalTitle>Everything You Need <span style={{ color: '#6366f1' }}>To Grow</span></GlobalTitle>
                    <GlobalSubtitle>Functional tools to launch your career. Click any card to get started.</GlobalSubtitle>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <EliteCard
                                    $accent={feature.accent}
                                    onClick={() => handleFeatureClick(feature)}
                                >
                                    <IconBox className="icon-box" $accent={feature.accent}>
                                        {feature.icon}
                                    </IconBox>
                                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: 'white', letterSpacing: '-1px' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, mb: 2 }}>
                                        {feature.desc}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ color: feature.accent, fontWeight: 700 }}>
                                        <Typography variant="button">Get Started</Typography>
                                        <TrendingFlat />
                                    </Stack>
                                </EliteCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </EliteSection>

            {/* Featured Portfolios - NOW FIRST */}
            <EliteSection $light id="portfolios">
                <Container maxWidth="lg">
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 10 }}>
                        <Box>
                            <Typography variant="overline" sx={{ letterSpacing: 8, color: '#a855f7', fontWeight: 900 }}>COMMUNITY</Typography>
                            <Typography variant="h2" sx={{ fontWeight: 950, color: 'white', letterSpacing: '-3px', mt: 1 }}>Top Creators</Typography>
                        </Box>
                        <Chip icon={<Person />} label="FEATURED" sx={{ bgcolor: 'rgba(168,85,247,0.1)', color: '#a855f7', fontWeight: 800, py: 2.5, px: 2 }} />
                    </Stack>

                    <PortfolioShowcase />
                </Container>
            </EliteSection>

            {/* Categories Section */}
            <EliteSection>
                <Container maxWidth="lg">
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{ width: 40, height: 2, bgcolor: '#6366f1' }} />
                        <Typography variant="overline" sx={{ letterSpacing: 5, color: 'white', fontWeight: 900 }}>EXPLORE</Typography>
                        <Box sx={{ width: 40, height: 2, bgcolor: '#6366f1' }} />
                    </Stack>
                    <GlobalTitle sx={{ mb: 3 }}>Browse Categories</GlobalTitle>
                    <GlobalSubtitle sx={{ mb: 10 }}>Find portfolios by expertise - Web Dev, Design, AI/ML, and more.</GlobalSubtitle>
                    <Categories />
                </Container>
            </EliteSection>

            {/* Latest Blog Posts - NOW SECOND */}
            <EliteSection $light id="posts">
                <Container maxWidth="lg">
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 10 }}>
                        <Box>
                            <Typography variant="overline" sx={{ letterSpacing: 8, color: '#6366f1', fontWeight: 900 }}>LATEST CONTENT</Typography>
                            <Typography variant="h2" sx={{ fontWeight: 950, color: 'white', letterSpacing: '-3px', mt: 1 }}>Fresh Insights</Typography>
                        </Box>
                        <Chip icon={<Bolt />} label="NEW" sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 800, py: 2.5, px: 2 }} />
                    </Stack>

                    <Grid container spacing={4}>
                        <Posts />
                    </Grid>
                </Container>
            </EliteSection>

            {/* Trust & Security Section */}
            <Box sx={{ py: 6, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: '#020305', textAlign: 'center' }}>
                <Container maxWidth="lg">
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} justifyContent="center" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(16, 185, 129, 0.1)' }}>
                                <Shield sx={{ color: '#10b981' }} />
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 0.5 }}>End-to-End Encrypted</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(99, 102, 241, 0.1)' }}>
                                <VerifiedUser sx={{ color: '#6366f1' }} />
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 0.5 }}>Verified Profiles</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(244, 63, 94, 0.1)' }}>
                                <Lock sx={{ color: '#f43f5e' }} />
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: 0.5 }}>100% Secure Data</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ borderLeft: '1px solid rgba(255,255,255,0.1)', pl: 4 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 900, letterSpacing: 1 }}>SYSTEM ONLINE</Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </PageWrapper >
    );
};

export default Home;