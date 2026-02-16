import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Card, CardContent, Typography, Grid, CssBaseline, Button, Avatar, Stack, Container } from "@mui/material";
import { ThemeProvider, styled, keyframes } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { API } from '../../service/api';
import { DataContext } from '../../DataProvider';
import { HeroSection, SkillsSection, ExperienceSection, ProjectsSection, EducationSection, CertificatesSection, ContactSection } from './PortfolioSections';
import PortfolioNavigation from './PortfolioNavigation';
import theme from './theme';

// --- HOME PAGE STYLES ADAPTED ---
const EliteSection = styled(Box)(({ theme }) => ({
  padding: '120px 0',
  position: 'relative',
  background: '#05070a',
  overflow: 'hidden',
}));

const GlobalTitle = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 950,
  color: 'white',
  textAlign: 'center',
  letterSpacing: '-3px',
  marginBottom: '20px',
  textShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
  '@media (max-width: 600px)': {
    fontSize: '2.5rem',
  }
});

// --- ELITE ANIMATIONS ---
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.1); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.2; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// --- STYLED COMPONENTS ---
const EliteWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#05070a",
  position: "relative",
  overflow: "hidden",
}));

const EliteProfileCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(40px)',
  borderRadius: '35px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  height: '380px', // Fixed height for uniformity
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-15px)',
    background: 'rgba(30, 41, 59, 0.5)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    '& .profile-header': { backgroundColor: '#6366f1' }
  }
}));

const CardHeader = styled(Box)({
  height: '100px',
  background: 'rgba(255,255,255,0.02)',
  transition: '0.4s',
  position: 'relative'
});

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account } = useContext(DataContext);
  const params = useParams();
  const userId = params.userId || params.id;
  const navigate = useNavigate();

  // OWNER ID (Sandeep) - Restored to Original
  const OWNER_ID = '697b9fcebc927aa3691a0231';

  const storedId = sessionStorage.getItem('userId');
  const loggedInUserId = account?._id || account?.id || storedId;
  const isOwner = loggedInUserId === OWNER_ID;

  // Strict Auth Check: Only true if viewing OWN portfolio (or if Owner is viewing their own)
  const isAuth = Boolean(loggedInUserId && (userId === loggedInUserId));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userId === 'all') {
          const response = await API.getAllPortfolios();
          if (response.isSuccess && Array.isArray(response.data)) {
            const uniqueProfiles = Array.from(new Map(
              response.data
                .filter(p => p && p.userId)
                .map(item => [item.userId, item])
            ).values());
            setAllProfiles(uniqueProfiles);
          }
        } else {
          // LOGIC: Show URL User OR Logged In User OR Default Owner
          const idToFetch = userId || loggedInUserId || OWNER_ID;

          if (idToFetch) {
            console.log("Fetching Portfolio for ID:", idToFetch);
            const response = await API.getPortfolioByUserId({ userId: idToFetch });
            if (response.isSuccess && Array.isArray(response.data)) {
              setPortfolios(response.data);
            }
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, loggedInUserId]);

  const handleDelete = async (id) => {
    const response = await API.deletePortfolioItem({ id });
    if (response.isSuccess) setPortfolios(prev => prev.filter(p => p._id !== id));
  };

  if (userId === 'all') {
    // Separate Owner profile from others
    const ownerProfile = allProfiles.find(p => p.userId === OWNER_ID);
    const otherProfiles = allProfiles.filter(p => p.userId !== OWNER_ID);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PortfolioNavigation userName="Community" isAuth={false} />

        <EliteWrapper>
          <EliteSection>
            <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center', mb: 12 }}>
                <Typography variant="overline" sx={{ letterSpacing: 8, color: '#6366f1', display: 'block', fontWeight: 900, mb: 2 }}>ELITE DEVELOPER NETWORK</Typography>
                <GlobalTitle>
                  Community <span style={{ color: '#6366f1' }}>Forge.</span>
                </GlobalTitle>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: '700px', mx: 'auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
                  Explore the digital identities of our verified creators. Join the elite circle.
                </Typography>

                <Stack direction="row" spacing={6} justifyContent="center" sx={{ mt: 8 }}>
                  <Box>
                    <Typography variant="h3" fontWeight="950" sx={{ color: 'white' }}>{allProfiles.length}+</Typography>
                    <Typography variant="caption" sx={{ color: '#6366f1', letterSpacing: 2, fontWeight: 800 }}>AGENTS</Typography>
                  </Box>
                  <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,0.1)' }} />
                  <Box>
                    <Typography variant="h3" fontWeight="950" sx={{ color: 'white' }}>100%</Typography>
                    <Typography variant="caption" sx={{ color: '#6366f1', letterSpacing: 2, fontWeight: 800 }}>VERIFIED</Typography>
                  </Box>
                </Stack>
              </Box>

              {/* --- COMPACT OWNER CARD --- */}
              {ownerProfile && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h6" fontWeight="900" sx={{ color: 'white', mb: 3, pl: 2, borderLeft: '4px solid #FFD700' }}>
                    Project Owner
                  </Typography>
                  <EliteProfileCard
                    elevation={0}
                    sx={{
                      border: '2px solid #6366f1',
                      background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                      boxShadow: '0 0 30px rgba(99,102,241,0.3)',
                      p: 3,
                      maxWidth: '500px',
                      mx: 'auto'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar
                          src={ownerProfile.picture}
                          sx={{
                            width: 80,
                            height: 80,
                            border: '3px solid #6366f1',
                            boxShadow: '0 4px 12px rgba(99,102,241,0.4)'
                          }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          bottom: -5,
                          right: -5,
                          background: '#FFD700',
                          color: 'black',
                          fontWeight: 900,
                          px: 1,
                          py: 0.3,
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          border: '2px solid #05070a'
                        }}>
                          👑
                        </Box>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ color: '#FFD700', fontWeight: 800, letterSpacing: 1, display: 'block' }}>
                          ADMIN
                        </Typography>
                        <Typography variant="h6" fontWeight="900" sx={{ color: 'white', lineHeight: 1.2 }}>
                          {ownerProfile.title || 'Project Owner'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          @{ownerProfile.username || 'owner'}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{
                      color: 'rgba(255,255,255,0.7)',
                      mb: 2,
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}>
                      {ownerProfile.description?.substring(0, 100) || "The mastermind behind this platform."}...
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/portfolio/${ownerProfile.userId}`)}
                      startIcon={<RocketLaunchIcon />}
                      sx={{
                        bgcolor: '#6366f1',
                        color: 'white',
                        borderRadius: '12px',
                        py: 1,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                        '&:hover': { bgcolor: '#4f46e5', transform: 'translateY(-2px)' }
                      }}
                    >
                      View Profile
                    </Button>
                  </EliteProfileCard>
                </Box>
              )}

              {/* --- MEMBER GRID --- */}
              <Typography variant="h5" fontWeight="900" sx={{ color: 'white', mb: 6, pl: 2, borderLeft: '4px solid #6366f1' }}>
                Verified Members <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', marginLeft: '10px' }}>{otherProfiles.length} Agents</span>
              </Typography>

              <Grid container spacing={4}>
                {otherProfiles.map(profile => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={profile._id}>
                    <EliteProfileCard elevation={0}>
                      <CardHeader className="profile-header">
                        <Avatar
                          src={profile.picture}
                          sx={{
                            width: 100, height: 100,
                            position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)',
                            border: '4px solid #05070a',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                          }}
                        />
                      </CardHeader>
                      <CardContent sx={{ textAlign: 'center', pt: 8, pb: 4, px: 3, flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="950" sx={{ color: 'white', mb: 0.5 }}>{profile.title}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, mb: 2, display: 'block' }}>
                          @{profile.username || 'member'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4, lineHeight: 1.6, height: '3.2em', overflow: 'hidden', fontSize: '0.85rem' }}>
                          {profile.description || "Portfolio Member"}
                        </Typography>

                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => navigate(`/portfolio/${profile.userId}`)}
                          sx={{
                            color: 'white',
                            borderRadius: '15px',
                            py: 1,
                            fontWeight: 700,
                            borderColor: 'rgba(255,255,255,0.1)',
                            textTransform: 'none',
                            '&:hover': { borderColor: '#6366f1', color: '#6366f1', bgcolor: 'rgba(99,102,241,0.05)' }
                          }}
                        >
                          View Profile
                        </Button>
                      </CardContent>
                    </EliteProfileCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </EliteSection>
        </EliteWrapper>
      </ThemeProvider>
    );
  }

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#05070a' }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>;

  // --- INDIVIDUAL PORTFOLIO VIEW (WILL LOAD SECTIONS) ---
  // Get the first portfolio item to extract user info (name, photo, etc.)
  const firstPortfolio = portfolios.length > 0 ? portfolios[0] : null;


  // Extract user information - Priority: userInfo (from User collection) > portfolio data > defaults
  const userName = firstPortfolio?.userInfo?.name ||
    firstPortfolio?.username ||
    firstPortfolio?.title ||
    'User';

  const userPhoto = firstPortfolio?.userInfo?.picture ||
    firstPortfolio?.picture ||
    'https://via.placeholder.com/400?text=No+Photo';

  // Create personal info object from actual data
  const personalInfo = {
    title: userName,
    description: firstPortfolio?.description ||
      firstPortfolio?.title ||
      `${userName}'s Portfolio`,
    picture: userPhoto,
    username: firstPortfolio?.username || firstPortfolio?.userInfo?.username || 'user',
    ...firstPortfolio
  };

  const skills = portfolios.filter(p => p.categories === 'Skill' || p.categories === 'skill');
  const projects = portfolios.filter(p => p.categories === 'Project' || p.categories === 'project');
  const education = portfolios.filter(p => p.categories === 'Education' || p.categories === 'education');
  const certificates = portfolios.filter(p => p.categories === 'Certificate' || p.categories === 'certificate');
  const experience = portfolios.filter(p => p.categories === 'Work' || p.categories === 'work');
  const contact = portfolios.find(p => p.categories === 'Contact' || p.categories === 'contact') || personalInfo;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PortfolioNavigation userName={personalInfo.title} isAuth={isAuth} />
      <Box sx={{ background: "#05070a", minHeight: '100vh' }}>
        <Box sx={{ pt: 18, pb: 10, maxWidth: '1200px', margin: '0 auto', px: { xs: 2, md: 5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 10, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/portfolio/all')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(99,102,241,0.6)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              👥 View All Portfolios
            </Button>

            {/* IF LOGGED IN & NOT VIEWING OWN: Show "My Portfolio" */}
            {loggedInUserId && loggedInUserId !== userId && loggedInUserId !== OWNER_ID && (
              <Button
                variant="contained"
                onClick={() => navigate(`/portfolio/${loggedInUserId}`)}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  borderRadius: '50px',
                  px: 4,
                  fontWeight: 800,
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                }}
              >
                🚀 My Portfolio
              </Button>
            )}

            {/* IF VIEWING OWN (But not Owner) - Option to see Owner's */}
            {userId && userId !== OWNER_ID && (
              <Button
                variant="text"
                onClick={() => navigate('/portfolio')}
                sx={{ color: 'rgba(255,255,255,0.6)', borderRadius: '50px', px: 3, fontWeight: 700, '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                ← Back to Main
              </Button>
            )}
          </Box>

          <Box id="home">
            <HeroSection
              personalInfo={personalInfo}
              handleDelete={handleDelete} isAuth={isAuth}
              isOwnerPortfolioView={!userId || userId === OWNER_ID}
            />
          </Box>

          <Stack spacing={10} sx={{ mt: 10 }}>
            {skills.length > 0 && <Box id="skills"><SkillsSection skills={skills} handleDelete={handleDelete} isAuth={isAuth} /></Box>}
            {projects.length > 0 && <Box id="projects"><ProjectsSection projects={projects} handleDelete={handleDelete} isAuth={isAuth} /></Box>}
            {experience.length > 0 && <Box id="experience"><ExperienceSection experience={experience} handleDelete={handleDelete} isAuth={isAuth} /></Box>}
            {education.length > 0 && <Box id="education"><EducationSection education={education} handleDelete={handleDelete} isAuth={isAuth} /></Box>}
            {certificates.length > 0 && <Box id="certificates"><CertificatesSection certificates={certificates} handleDelete={handleDelete} isAuth={isAuth} /></Box>}
            <Box id="contact"><ContactSection contactInfo={contact} handleDelete={handleDelete} isAuth={isAuth} userId={userId || loggedInUserId} /></Box>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Portfolio;
