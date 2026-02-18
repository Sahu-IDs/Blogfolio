import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  ContactMail as ContactMailIcon,
  Menu as MenuIcon,
  Email as EmailIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { API } from '../../service/api';

const PortfolioNavigation = ({ userName, isAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ senderName: '', senderEmail: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleContactDialogOpen = () => {
    setContactDialogOpen(true);
    setMobileOpen(false);
  };

  const handleContactDialogClose = () => {
    setContactDialogOpen(false);
    setContactForm({ senderName: '', senderEmail: '', message: '' });
  };

  const handleContactFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const sendMessageToOwner = async () => {
    if (!contactForm.senderName || !contactForm.senderEmail || !contactForm.message) {
      alert("Please fill all fields");
      return;
    }

    setSending(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_BASE}/message/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          receiverId: 'site-owner',
          ownerEmail: 'sandeepsahu12176@gmail.com'
        })
      });

      if (res.ok) {
        alert("Message sent successfully to site owner!");
        handleContactDialogClose();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home', icon: <HomeIcon /> },
    { name: 'About', id: 'about', icon: <PersonIcon /> },
    { name: 'Skills', id: 'skills', icon: <CodeIcon /> },
    { name: 'Projects', id: 'projects', icon: <CodeIcon /> },
    { name: 'Education', id: 'education', icon: <SchoolIcon /> },
    { name: 'Experience', id: 'experience', icon: <WorkIcon /> },
    { name: 'Certificates', id: 'certificates', icon: <EmojiEventsIcon /> },
    { name: 'Contact', id: 'contact', icon: <ContactMailIcon /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Standard header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* 🚀 Mobile Menu Button (Visible on Mobile Only) */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1301, display: { md: 'none' } }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            bgcolor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            '&:hover': { bgcolor: '#6366f1' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* 🚀 Elite Floating Side Dock (Desktop) */}
      <Box
        sx={{
          position: 'fixed',
          right: { xs: '15px', lg: '30px' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on tablet+
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{
          background: 'rgba(5, 7, 10, 0.4)',
          backdropFilter: 'blur(30px)',
          borderRadius: '50px',
          p: 1.5,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            background: 'rgba(5, 7, 10, 0.8)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            transform: 'scale(1.05)'
          }
        }}>
          {navItems.map((item) => (
            <Tooltip key={item.name} title={item.name} placement="left" arrow>
              <IconButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  transition: '0.3s',
                  '&:hover': {
                    color: '#6366f1',
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                  }
                }}
              >
                {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
              </IconButton>
            </Tooltip>
          ))}

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 1 }} />

          <Tooltip title="Mobile View / Menu" placement="left" arrow>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Modern Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 320,
            background: 'rgba(5, 7, 10, 0.95)',
            backdropFilter: 'blur(50px)',
            color: 'white',
            p: 3,
            borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)'
          }
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 950, color: 'white' }}>
              {(userName || 'P').charAt(0).toUpperCase()}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight={900} letterSpacing="-1px">
            {userName || "PORTFOLIO"}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.4, letterSpacing: 2, textTransform: 'uppercase' }}>Section Guide</Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 700 }} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={handleContactDialogOpen}
              sx={{
                borderRadius: '12px',
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' }
              }}
            >
              <ListItemIcon sx={{ color: '#6366f1', minWidth: 40 }}><EmailIcon /></ListItemIcon>
              <ListItemText
                primary="Contact Site Owner"
                secondary="Send message to Sandeep"
                primaryTypographyProps={{ fontWeight: 800 }}
                secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' } }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                borderRadius: '12px',
                bgcolor: 'rgba(255,255,255,0.05)'
              }}
            >
              <ListItemIcon sx={{ color: '#6366f1', minWidth: 40 }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="Main Dashboard" primaryTypographyProps={{ fontWeight: 800 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Contact Owner Dialog */}
      <Dialog
        open={contactDialogOpen}
        onClose={handleContactDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(50px)',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Box sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'rgba(99, 102, 241, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            border: '2px solid rgba(99, 102, 241, 0.3)'
          }}>
            <EmailIcon sx={{ fontSize: 30, color: '#6366f1' }} />
          </Box>
          <Typography variant="h5" fontWeight="950" letterSpacing="-1px">
            Contact Site Owner
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 1 }}>
            Send a message to Sandeep (sandeepsahu12176@gmail.com)
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              name="senderName"
              label="Your Name"
              value={contactForm.senderName}
              onChange={handleContactFormChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.6)' } }}
              InputProps={{
                style: { color: 'white' },
                sx: {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
            />

            <TextField
              name="senderEmail"
              label="Your Email"
              type="email"
              value={contactForm.senderEmail}
              onChange={handleContactFormChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.6)' } }}
              InputProps={{
                style: { color: 'white' },
                sx: {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
            />

            <TextField
              name="message"
              label="Message"
              value={contactForm.message}
              onChange={handleContactFormChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.6)' } }}
              InputProps={{
                style: { color: 'white' },
                sx: {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleContactDialogClose}
            sx={{
              color: 'rgba(255,255,255,0.6)',
              borderRadius: '15px',
              px: 3,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={sendMessageToOwner}
            disabled={sending}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              borderRadius: '15px',
              px: 4,
              fontWeight: 900,
              '&:hover': {
                background: 'linear-gradient(135deg, #5558e3 0%, #9333ea 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PortfolioNavigation;