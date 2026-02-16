import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  Stack,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  Send,
  AccountCircle,
  Email,
  Message,
  Phone,
  LinkedIn,
  GitHub,
  CheckCircle,
  ErrorOutline,
  KeyboardArrowRight,
  TrendingFlat
} from "@mui/icons-material";
import { styled, keyframes } from '@mui/material/styles';
import { API } from '../../service/api';

// --- ANIMATIONS ---
const shine = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -20px); }
  100% { transform: translate(0, 0); }
`;

// --- STYLED COMPONENTS (ELITE UI) ---
const MainWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#05070a", // Deep Space Black
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(4, 0),
  '&::before': {
    content: '""',
    position: "absolute",
    width: "800px",
    height: "800px",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "-200px",
    right: "-200px",
    filter: "blur(80px)",
    animation: `${pulse} 8s ease-in-out infinite`,
  },
  '&::after': {
    content: '""',
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    bottom: "-100px",
    left: "-100px",
    filter: "blur(60px)",
    animation: `${pulse} 12s ease-in-out infinite reverse`,
  }
}));

const EliteCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.4)',
  backdropFilter: 'blur(40px)',
  borderRadius: '60px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 50px 150px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',
  display: 'flex',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    borderRadius: '40px',
  }
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  width: '42%',
  padding: '80px 60px',
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)',
  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '50px 40px',
    borderRight: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  }
}));

const RightPanel = styled(Box)(({ theme }) => ({
  width: '58%',
  padding: '80px 80px',
  background: 'rgba(255, 255, 255, 0.01)',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '50px 40px',
  }
}));

const StyledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
    fontSize: '18px',
    fontWeight: 500,
    '&::before': { borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
    '&:hover:not(.Mui-disabled):before': { borderBottom: '1px solid rgba(99, 102, 241, 0.5)' },
    '&.Mui-focused::after': { borderBottom: '2px solid #6366f1' },
  },
  '& label': { color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600, letterSpacing: '1px' },
  '& label.Mui-focused': { color: '#6366f1' },
  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.1)', opacity: 1 },
});

const MagicButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  color: 'white',
  padding: '18px 45px',
  borderRadius: '20px',
  fontSize: '18px',
  fontWeight: 900,
  textTransform: 'none',
  letterSpacing: '1px',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 30px 60px rgba(99, 102, 241, 0.5)',
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
}));

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ open: false, type: 'success', text: '' });

  const presetMessages = [
    { label: "Hire Me", text: "I am interested in hiring you for a project." },
    { label: "Collab", text: "I have a proposal for a collaboration." },
    { label: "Support", text: "I have a question about the platform." },
    { label: "Feedback", text: "Your work is impressive! Wanted to share some feedback." }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePreset = (text) => setFormData({ ...formData, message: text });
  const handleClose = () => setStatus({ ...status, open: false });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ open: true, type: 'error', text: 'All fields are strictly required.' });
      return;
    }
    setLoading(true);
    try {
      const response = await API.newMessage({
        senderName: formData.name,
        senderEmail: formData.email,
        message: formData.message,
        receiverId: "GLOBAL_ELITE_CONTACT",
        ownerEmail: "vaibhav12679@gmail.com"
      });
      if (response.isSuccess) {
        setStatus({ open: true, type: 'success', text: 'Transmission Successful! Request Received.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ open: true, type: 'error', text: 'System Error. Delivery failed.' });
      }
    } catch (error) {
      setStatus({ open: true, type: 'error', text: 'Connectivity Error. Retry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWrapper>
      <Container maxWidth="lg">
        <EliteCard elevation={0}>
          <LeftPanel>
            <Box>
              <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 900, letterSpacing: 5 }}>ELITE CONTACT</Typography>
              <Typography variant="h2" fontWeight="950" sx={{ mt: 2, color: 'white', letterSpacing: '-3px', lineHeight: 0.9 }}>
                Connect & <br /> <span style={{ color: '#6366f1' }}>Collaborate.</span>
              </Typography>
              <Typography variant="body1" sx={{ mt: 4, color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Join forces with a developer who values premium design and complex logic. Available for world-class projects.
              </Typography>
            </Box>

            <Stack spacing={5}>
              <Box>
                <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 800, letterSpacing: 2 }}>OFFICIAL EMAIL</Typography>
                <Typography variant="h6" fontWeight="800" sx={{ color: 'white', mt: 0.5 }}>vaibhav12679@gmail.com</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 800, letterSpacing: 2 }}>DIRECT LINE</Typography>
                <Typography variant="h6" fontWeight="800" sx={{ color: 'white', mt: 0.5 }}>+91 6394-767-773</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              {[<LinkedIn />, <GitHub />].map((icon, i) => (
                <IconButton key={i} sx={{
                  bgcolor: 'rgba(255,255,255,0.03)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.08)',
                  p: 2,
                  transition: '0.4s',
                  '&:hover': { bgcolor: '#6366f1', transform: 'scale(1.1) rotate(5deg)' }
                }}>
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </LeftPanel>

          <RightPanel>
            <Typography variant="h4" fontWeight="950" sx={{ color: 'white', letterSpacing: '-1px', mb: 1 }}>Inquiry Details</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 6 }}>Select a quick option or describe your requirements below.</Typography>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={2} sx={{ mb: 6 }}>
              {presetMessages.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item.label}
                  onClick={() => handlePreset(item.text)}
                  sx={{
                    borderRadius: '12px',
                    fontWeight: 800,
                    px: 2, py: 3,
                    bgcolor: formData.message === item.text ? '#6366f1' : 'rgba(255,255,255,0.03)',
                    color: formData.message === item.text ? 'white' : 'white',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: '0.3s',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', borderColor: '#6366f1' }
                  }}
                />
              ))}
            </Stack>

            <Stack spacing={6}>
              <StyledInput
                fullWidth
                variant="standard"
                label="FULL NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: John Doe"
                InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircle sx={{ color: '#6366f1', mr: 1 }} /></InputAdornment> }}
              />

              <StyledInput
                fullWidth
                variant="standard"
                label="CONTACT EMAIL"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Where should I reply?"
                InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6366f1', mr: 1 }} /></InputAdornment> }}
              />

              <StyledInput
                fullWidth
                variant="standard"
                label="PROJECT DETAILS"
                name="message"
                multiline
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your requirements..."
                InputProps={{ startAdornment: <InputAdornment position="start" sx={{ mt: 1 }}><Message sx={{ color: '#6366f1', mr: 1 }} /></InputAdornment> }}
              />

              <Box sx={{ pt: 2 }}>
                <MagicButton
                  variant="contained"
                  disabled={loading}
                  onClick={handleSubmit}
                  endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <TrendingFlat />}
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </MagicButton>
              </Box>
            </Stack>
          </RightPanel>
        </EliteCard>
      </Container>

      <Snackbar open={status.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleClose}
          severity={status.type}
          variant="filled"
          sx={{ borderRadius: '24px', fontWeight: 900, px: 5, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #6366f1', color: 'white' }}
        >
          {status.text}
        </Alert>
      </Snackbar>
    </MainWrapper>
  );
};

export default Contact;