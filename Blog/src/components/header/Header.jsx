import { AppBar, Toolbar, Box, Typography, IconButton, Button, Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DataContext } from '../../DataProvider';
import { Person, Article, Home, Info, Email, Logout, Menu, AddCircleOutline, AdminPanelSettings } from '@mui/icons-material';
import logo from '../../assets/logo.png';

const Component = styled(AppBar)({
    background: 'rgba(5, 7, 10, 0.8)',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
});

const Container = styled(Toolbar)({
    justifyContent: 'space-between',
    padding: '0 30px',
    minHeight: '64px !important'
});

const Logo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
});

const NavLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    }
}));

const NavButton = styled(Button)({
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 700,
    fontSize: '14px',
    padding: '8px 18px',
    borderRadius: '12px',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#6366f1',
    },
});

const CreateButton = styled(Button)({
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    color: 'white',
    fontWeight: 800,
    padding: '8px 24px',
    borderRadius: '14px',
    textTransform: 'none',
    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #F7931E 0%, #FF6B35 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
    },
});

const Header = () => {
    const { account, setAccount } = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        sessionStorage.clear();
        localStorage.clear();
        setAccount('');
        navigate('/login');
    }

    const toggleDrawer = (status) => () => {
        setOpen(status);
    };

    const navItems = [
        { label: 'Home', icon: <Home />, path: '/' },
        {
            label: 'Blogs', icon: <Article />, action: () => {
                navigate('/');
                setTimeout(() => {
                    document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        },
        { label: 'Portfolios', icon: <Person />, path: '/portfolio/all' },
        { label: 'Project Docs', icon: <Article />, path: '/project-docs' },
        { label: 'About', icon: <Info />, path: '/about' },
        { label: 'Contact', icon: <Email />, path: '/contact' },
    ];

    return (
        <Component position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 1100 }}>
            <Container>
                {/* Monogram Logo Style - Matches Portfolio */}
                <Logo onClick={() => navigate('/')}>
                    <Box sx={{
                        width: 48,
                        height: 48,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        '&:hover': { transform: 'scale(1.1) rotate(5deg)' }
                    }}>
                        <img src={logo} alt="BlogFolio Logo" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))' }} />
                    </Box>
                    <Typography sx={{
                        fontSize: '24px',
                        fontWeight: 950,
                        background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.7) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1.5px',
                        textTransform: 'uppercase'
                    }}>
                        BlogFolio
                    </Typography>
                </Logo>

                {/* Main Navigation - Integrated Style */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <NavLinks>
                        {navItems.map((item) => (
                            <NavButton
                                key={item.label}
                                onClick={item.action || (() => navigate(item.path))}
                            >
                                {item.label}
                            </NavButton>
                        ))}
                    </NavLinks>

                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: 2 }}>
                        {account ? (
                            <>
                                <CreateButton
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    startIcon={<AddCircleOutline />}
                                    onClick={() => navigate('/create')}
                                >
                                    Create
                                </CreateButton>
                                <Avatar
                                    alt={account.name}
                                    src={account.picture || `https://ui-avatars.com/api/?name=${account.name}&background=667eea&color=fff`}
                                    onClick={() => navigate(`/portfolio/${account._id}`)}
                                    sx={{
                                        width: 40, height: 40, cursor: 'pointer', border: '2px solid #667eea',
                                        transition: '0.3s', '&:hover': { transform: 'scale(1.1)' }
                                    }}
                                />
                                <IconButton onClick={logout} sx={{ color: '#d32f2f', '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.05)' } }}>
                                    <Logout />
                                </IconButton>
                                {account.role === 'admin' && (
                                    <Tooltip title="Admin Dashboard">
                                        <IconButton
                                            onClick={() => navigate('/admin')}
                                            sx={{
                                                color: '#f59e0b',
                                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                                bgcolor: 'rgba(245, 158, 11, 0.05)',
                                                '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)' }
                                            }}
                                        >
                                            <AdminPanelSettings />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        ) : (
                            <CreateButton onClick={() => navigate('/login')}>Login</CreateButton>
                        )}

                        {/* Universal Menu Button - Same as Portfolio */}
                        <IconButton
                            onClick={toggleDrawer(true)}
                            sx={{
                                color: '#667eea',
                                bgcolor: 'rgba(102, 126, 234, 0.05)',
                                borderRadius: '12px',
                                p: 1.2,
                                border: '1px solid rgba(102, 126, 234, 0.1)',
                                '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.15)' }
                            }}
                        >
                            <Menu />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Professional Drawer Sidebar */}
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: 320,
                            background: 'rgba(5, 7, 10, 0.95)',
                            backdropFilter: 'blur(50px)',
                            color: 'white',
                            p: 3,
                            borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
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
                            <img src={logo} alt="Logo" style={{ width: '35px', height: '35px' }} />
                        </Box>
                        <Typography variant="h6" fontWeight={900} letterSpacing="-1px">BLOGFOLIO</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.4, letterSpacing: 2 }}>ELITE SYSTEM</Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => { item.action ? item.action() : navigate(item.path); setOpen(false); }}
                                    sx={{ borderRadius: '12px', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ mt: 'auto', mb: 2 }}>
                        {!account && (
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => { navigate('/login'); setOpen(false); }}
                                sx={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    color: 'white',
                                    fontWeight: 800,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
                                }}
                            >
                                Get Started
                            </Button>
                        )}
                    </Box>
                </Drawer>
            </Container>
        </Component >
    );
};

export default Header;