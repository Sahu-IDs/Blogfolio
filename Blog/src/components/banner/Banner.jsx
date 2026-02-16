import { Box, Typography, styled, Button, Stack, Grid, Chip, Tooltip } from '@mui/material';
import { Code, TrendingUp, Rocket, TrendingFlat, TouchApp, Star, MonetizationOn, SupportAgent } from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

// --- STYLED COMPONENTS ---
const BannerContainer = styled(Box)(({ theme }) => ({
    background: 'radial-gradient(circle at 50% 50%, #1a1d2e 0%, #05070a 100%)',
    width: '100%',
    minHeight: '90vh', // Slightly taller for grandeur
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 20px',
}));

const Orb = styled(Box)(({ size, color, top, left, delay }) => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    top: top,
    left: left,
    filter: 'blur(60px)',
    opacity: 0.6,
    animation: `${float} 10s ease-in-out infinite`,
    animationDelay: delay,
    zIndex: 1
}));

const ContentBox = styled(Box)({
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const EliteHeading = styled(Typography)(({ theme }) => ({
    fontSize: '5.5rem',
    fontWeight: 800,
    color: 'white',
    lineHeight: 1.1,
    letterSpacing: '-2px',
    marginBottom: '20px',
    fontFamily: '"Inter", sans-serif',
    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
    '@media (max-width: 900px)': { fontSize: '3.5rem' },
    '@media (max-width: 600px)': { fontSize: '2.5rem' },
}));

const GradientText = styled('span')({
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    display: 'inline-block',
});

const SubTitle = styled(Typography)({
    fontSize: '1.3rem',
    color: '#94a3b8',
    marginBottom: '50px',
    maxWidth: '650px',
    lineHeight: 1.6,
    fontWeight: 400,
    '@media (max-width: 600px)': { fontSize: '1rem', padding: '0 20px' },
});

const EliteButton = styled(Button)({
    background: 'white',
    color: 'black',
    fontSize: '18px',
    fontWeight: 800,
    padding: '16px 40px',
    borderRadius: '50px',
    textTransform: 'none',
    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
        background: '#f8fafc',
    }
});

const StatCard = styled(Box)({
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '20px 30px',
    minWidth: '160px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-5px)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        transition: 'left 0.5s ease',
    },
    '&:hover::after': {
        left: '100%',
    }
});

const Banner = () => {
    const navigate = useNavigate();

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <BannerContainer>
            {/* Background Effects */}
            <Orb size="500px" color="#4f46e5" top="-20%" left="-10%" delay="0s" />
            <Orb size="400px" color="#9333ea" top="50%" left="80%" delay="2s" />
            <Orb size="300px" color="#ec4899" top="80%" left="20%" delay="4s" />

            <ContentBox>
                <Chip
                    icon={<Star sx={{ fontSize: '16px !important', color: '#fbbf24' }} />}
                    label="THE #1 PLATFORM FOR CREATORS"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#fbbf24',
                        fontWeight: 800,
                        letterSpacing: 2,
                        px: 2,
                        mb: 4,
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}
                />

                <EliteHeading>
                    Where Ideas Find <br />
                    A <GradientText>Home.</GradientText>
                </EliteHeading>

                <SubTitle>
                    The fastest way to host your portfolio and publish your thoughts.
                    Join a community of innovators building the future.
                </SubTitle>

                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 12, flexWrap: 'wrap', gap: 2 }}>
                    <EliteButton onClick={() => navigate('/create')} endIcon={<TrendingFlat />}>
                        Start Creating
                    </EliteButton>
                    <Button
                        startIcon={<Rocket />}
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '18px',
                            textTransform: 'none',
                            px: 4,
                            '&:hover': { background: 'rgba(255,255,255,0.05)' }
                        }}
                        onClick={() => scrollTo('portfolios')}
                    >
                        Explore Work
                    </Button>
                </Stack>

                {/* FUNCTIONAL STATS */}
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Tooltip title="View our top creators" arrow>
                            <StatCard onClick={() => scrollTo('portfolios')}>
                                <TouchApp sx={{ color: '#6366f1', fontSize: 30, mb: 1 }} />
                                <Typography variant="h4" fontWeight="950" sx={{ color: 'white', mb: 0.5 }}>1000+</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', letterSpacing: 2, fontWeight: 700 }}>CREATORS</Typography>
                            </StatCard>
                        </Tooltip>
                    </Grid>

                    <Grid item>
                        <Tooltip title="No hidden fees. Free forever." arrow>
                            <StatCard onClick={() => navigate('/about')}>
                                <MonetizationOn sx={{ color: '#10b981', fontSize: 30, mb: 1 }} />
                                <Typography variant="h4" fontWeight="950" sx={{ color: 'white', mb: 0.5 }}>FREE</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', letterSpacing: 2, fontWeight: 700 }}>FOREVER</Typography>
                            </StatCard>
                        </Tooltip>
                    </Grid>

                    <Grid item>
                        <Tooltip title="We are here to help 24/7" arrow>
                            <StatCard onClick={() => navigate('/contact')}>
                                <SupportAgent sx={{ color: '#f43f5e', fontSize: 30, mb: 1 }} />
                                <Typography variant="h4" fontWeight="950" sx={{ color: 'white', mb: 0.5 }}>24/7</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', letterSpacing: 2, fontWeight: 700 }}>SUPPORT</Typography>
                            </StatCard>
                        </Tooltip>
                    </Grid>
                </Grid>
            </ContentBox>
        </BannerContainer>
    );
};

export default Banner;