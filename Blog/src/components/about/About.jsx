import { Box, Typography, Container, Grid, Paper, Chip, Avatar, Stack, IconButton, Button } from "@mui/material";
import { Public, Groups, RocketLaunch, AutoStories, LinkedIn, GitHub, Explore, AutoGraph, Bolt, Shield, Lock, VerifiedUser } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// --- ANIMATIONS ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// --- STYLED COMPONENTS ---
const PageWrapper = styled(Box)(({ theme }) => ({
  background: "#05070a", // Elite Deep Black
  minHeight: "100vh",
  color: "white",
  position: "relative",
  overflow: "hidden",
  paddingBottom: theme.spacing(10),
}));

const HeroVisual = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "1200px",
  height: "1200px",
  background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
  top: "-400px",
  left: "50%",
  transform: "translateX(-50%)",
  filter: "blur(120px)",
  zIndex: 0,
}));

const EliteCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(40px)',
  borderRadius: '40px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  padding: theme.spacing(6),
  transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-15px)',
    background: 'rgba(30, 41, 59, 0.5)',
    borderColor: 'rgba(99, 102, 241, 0.3)',
  }
}));

const GradientText = styled('span')({
  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: "Multi-User Platform",
      desc: "Unlimited users can create accounts, publish blogs, and build portfolios. Each user has complete control over their content with role-based access control (User & Admin roles).",
      accent: "#6366f1"
    },
    {
      icon: <Shield sx={{ fontSize: 40 }} />,
      title: "Enterprise Security",
      desc: "7-layer security implementation with JWT authentication, BCrypt password hashing, XSS protection, NoSQL injection prevention, and rate limiting for maximum data safety.",
      accent: "#10b981"
    },
    {
      icon: <AutoGraph sx={{ fontSize: 40 }} />,
      title: "MVC Architecture",
      desc: "Clean, scalable codebase following Model-View-Controller pattern. Modular design with 15+ React components, 20+ API endpoints, and 7 MongoDB models for maintainability.",
      accent: "#a855f7"
    }
  ];

  const values = [
    "Blog Management", "Portfolio Builder", "Admin Dashboard", "File Uploads", "Comment System", "Responsive Design"
  ];

  return (
    <PageWrapper>
      <HeroVisual />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10, position: "relative", zIndex: 1, textAlign: "center" }}>
        <Chip label="ABOUT THE PROJECT" sx={{ bgcolor: 'rgba(99,102,241,0.2)', color: '#a5b4fc', fontWeight: 900, mb: 3, letterSpacing: 3, border: '1px solid #6366f1' }} />
        <Typography variant="h1" fontWeight="950" sx={{ mt: 2, mb: 3, letterSpacing: '-4px', lineHeight: 1, color: 'white' }}>
          BlogFolio: Where <br /> <GradientText>Creativity Meets Technology.</GradientText>
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: "900px", mx: "auto", color: '#e2e8f0', fontWeight: 500, lineHeight: 1.8, mb: 4 }}>
          A full-stack MERN application that revolutionizes how developers, designers, and creators showcase their work. Built with cutting-edge technologies, BlogFolio combines the power of blogging with professional portfolio management in one unified platform.
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" sx={{ gap: 2 }}>
          <Chip label="React 19" sx={{ bgcolor: 'rgba(99,102,241,0.15)', color: '#a5b4fc', fontWeight: 700, fontSize: '0.9rem', px: 2, py: 2.5 }} />
          <Chip label="Node.js + Express" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#6ee7b7', fontWeight: 700, fontSize: '0.9rem', px: 2, py: 2.5 }} />
          <Chip label="MongoDB Atlas" sx={{ bgcolor: 'rgba(34,197,94,0.15)', color: '#86efac', fontWeight: 700, fontSize: '0.9rem', px: 2, py: 2.5 }} />
          <Chip label="Material-UI" sx={{ bgcolor: 'rgba(59,130,246,0.15)', color: '#93c5fd', fontWeight: 700, fontSize: '0.9rem', px: 2, py: 2.5 }} />
          <Chip label="JWT Auth" sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#fcd34d', fontWeight: 700, fontSize: '0.9rem', px: 2, py: 2.5 }} />
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Core Pillars */}
        <Grid container spacing={4} sx={{ mb: 12 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <EliteCard elevation={0} sx={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{
                  width: 70, height: 70,
                  borderRadius: '20px',
                  bgcolor: `${feature.accent}25`,
                  color: feature.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4,
                  boxShadow: `0 0 20px ${feature.accent}40`
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h4" fontWeight="900" gutterBottom sx={{ letterSpacing: '-1px', color: 'white' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {feature.desc}
                </Typography>
              </EliteCard>
            </Grid>
          ))}
        </Grid>

        {/* Core Values Section */}
        <Box sx={{ mb: 15 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={2} mb={6}>
            <Box sx={{ width: 60, height: 2, bgcolor: '#6366f1' }} />
            <Typography variant="overline" sx={{ letterSpacing: 4, color: '#a5b4fc', fontWeight: 900, fontSize: '1.2rem' }}>PLATFORM CAPABILITIES</Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#6366f1' }} />
          </Stack>

          <Typography variant="h2" textAlign="center" fontWeight="950" sx={{ mb: 8, letterSpacing: '-2px', color: 'white' }}>
            Key <GradientText>Features</GradientText>
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {values.map((val, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    transition: '0.4s all',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderColor: '#6366f1',
                      boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h6" fontWeight="800" sx={{ color: 'white', letterSpacing: '0.5px' }}>
                    {val}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Security Info Section - NEW ENTERPRISE GRADE */}
        <Box sx={{ mb: 15, position: 'relative' }}>
          {/* Background Glow */}
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

          <Stack direction="row" alignItems="center" justifyContent="center" gap={2} mb={6} position="relative" zIndex={1}>
            <Box sx={{ width: 60, height: 2, bgcolor: '#10b981' }} />
            <Typography variant="overline" sx={{ letterSpacing: 4, color: '#6ee7b7', fontWeight: 900, fontSize: '1.2rem' }}>ENTERPRISE GRADE</Typography>
            <Box sx={{ width: 60, height: 2, bgcolor: '#10b981' }} />
          </Stack>

          <Typography variant="h2" textAlign="center" fontWeight="950" sx={{ mb: 8, letterSpacing: '-2px', color: 'white', position: 'relative', zIndex: 1 }}>
            Uncompromising <span style={{ color: '#10b981' }}>Security</span>
          </Typography>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={4}>
              <EliteCard elevation={0} sx={{ height: '100%', textAlign: 'center', borderColor: 'rgba(16, 185, 129, 0.2)', '&:hover': { borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.05)' } }}>
                <Shield sx={{ fontSize: 60, color: '#10b981', mb: 3 }} />
                <Typography variant="h5" fontWeight="900" sx={{ color: 'white', mb: 2 }}>End-to-End Encryption</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  Your data is encrypted in transit and at rest using industry-standard AES-256 protocols. We prioritize your privacy above all.
                </Typography>
              </EliteCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <EliteCard elevation={0} sx={{ height: '100%', textAlign: 'center', borderColor: 'rgba(59, 130, 246, 0.2)', '&:hover': { borderColor: '#3b82f6', background: 'rgba(59, 130, 246, 0.05)' } }}>
                <VerifiedUser sx={{ fontSize: 60, color: '#3b82f6', mb: 3 }} />
                <Typography variant="h5" fontWeight="900" sx={{ color: 'white', mb: 2 }}>Identity Verification</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  Every profile is authenticated using secure JWT tokens. We ensure that only the rightful owner can modify their digital identity.
                </Typography>
              </EliteCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <EliteCard elevation={0} sx={{ height: '100%', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.2)', '&:hover': { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' } }}>
                <Lock sx={{ fontSize: 60, color: '#ef4444', mb: 3 }} />
                <Typography variant="h5" fontWeight="900" sx={{ color: 'white', mb: 2 }}>DDoS Protection</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  Our infrastructure is shielded by advanced Rate Limiting and Traffic Analysis to ensure 99.9% uptime and zero interruptions.
                </Typography>
              </EliteCard>
            </Grid>
          </Grid>
        </Box>

        {/* Mission Final Action */}
        <Paper elevation={0} sx={{
          p: { xs: 6, md: 10 },
          borderRadius: '60px',
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
        }}>
          <RocketLaunch sx={{
            position: "absolute",
            top: -40,
            right: -40,
            fontSize: 250,
            color: '#6366f1',
            opacity: 0.1,
            animation: `${float} 12s ease-in-out infinite`
          }} />
          <Typography variant="overline" sx={{ letterSpacing: 10, color: '#6366f1', fontWeight: 900 }}>PROJECT MISSION</Typography>
          <Typography variant="h2" fontWeight="950" sx={{ mt: 3, mb: 4, letterSpacing: '-3px' }}>
            Empowering Digital Creators.
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: "850px", mx: "auto", lineHeight: 1.8, mb: 6 }}>
            "BlogFolio is more than just a platform—it's a complete ecosystem for developers, designers, and content creators to showcase their skills, share knowledge, and build their personal brand. With cutting-edge MERN stack technology and enterprise-grade security, we provide the tools you need to succeed in the digital world."
          </Typography>

          <Stack direction="column" spacing={4} alignItems="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/portfolio')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: 'white',
                px: 6, py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                fontWeight: 800,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 30px 60px rgba(99, 102, 241, 0.5)',
                }
              }}
            >
              Explore Portfolios
            </Button>

            <Stack direction="row" spacing={3} justifyContent="center">
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white', p: 2, '&:hover': { bgcolor: '#0077b5' } }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white', p: 2, '&:hover': { bgcolor: '#333' } }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                onClick={() => navigate('/contact')}
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white', p: 2, '&:hover': { bgcolor: '#ec4899' } }}
              >
                <Bolt />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>

      </Container>
    </PageWrapper>
  );
};

export default About;