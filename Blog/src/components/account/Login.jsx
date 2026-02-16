import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography, Paper, InputAdornment, IconButton, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Visibility, VisibilityOff, Code, Person, Lock, Email, Bolt } from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';
import { API } from '../../service/api';
import { DataContext } from '../../DataProvider.jsx';

// --- ELITE ANIMATIONS ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.1; }
`;

// --- STYLED COMPONENTS ---
const MainWrapper = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#05070a', // Deep Elite Black
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '1000px',
        height: '1000px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        top: '-200px',
        left: '-200px',
        filter: 'blur(100px)',
        animation: `${pulse} 10s ease-in-out infinite`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        bottom: '-100px',
        right: '-100px',
        filter: 'blur(120px)',
        animation: `${pulse} 12s ease-in-out infinite reverse`,
    }
});

const EliteLoginCard = styled(Paper)({
    width: '100%',
    maxWidth: '480px',
    padding: '60px 45px',
    borderRadius: '45px',
    background: 'rgba(30, 41, 59, 0.3)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
    position: 'relative',
});

const EliteLogo = styled(Box)({
    width: '85px',
    height: '85px',
    borderRadius: '25px',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '35px',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
    color: 'white',
    animation: 'float 6s ease-in-out infinite',
    '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' }
    }
});

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

const EliteActionButton = styled(Button)({
    height: '65px',
    borderRadius: '22px',
    fontSize: '18px',
    fontWeight: 950,
    textTransform: 'none',
    letterSpacing: '1px',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    color: 'white',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
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

const Login = ({ isUserAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAccount } = useContext(DataContext);

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState({ name: '', username: '', password: '' });
    const [login, setLogin] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onInputChange = (e) => setSignup({ ...signup, [e.target.name]: e.target.value });
    const onValueChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) return setError('Identity required.');
        try {
            console.log('🚀 Attempting signup...', { username: signup.username });
            let response = await API.userSignup(signup);
            console.log('📥 Signup response:', response);
            if (response.isSuccess) {
                setError('');
                toggleAccount('login');
            } else {
                setError(response.msg || 'Signup failed');
            }
        } catch (error) {
            console.error('❌ Signup error:', error);
            setError(error.msg || error.message || 'Network Failure.');
        }
    };

    const loginUser = async () => {
        console.log('🔍 Login state:', login); // Debug: Check full login state
        if (!login.username || !login.password) {
            console.log('❌ Missing credentials:', { username: !!login.username, password: !!login.password });
            return setError('Credentials required.');
        }
        try {
            console.log('🚀 Attempting login...', { username: login.username, hasPassword: !!login.password });
            let response = await API.userLogin(login);
            console.log('📥 Login response:', response);
            if (response.isSuccess) {
                const userId = response.data._id || response.data.id;
                const userRole = response.data.role || 'user';

                sessionStorage.setItem('accessToken', response.data.accessToken);
                sessionStorage.setItem('name', response.data.name);
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('role', userRole);

                if (userId) {
                    sessionStorage.setItem('_id', String(userId));
                    localStorage.setItem('_id', String(userId));
                }
                setAccount({ username: response.data.username, name: response.data.name, role: userRole, _id: String(userId) });
                if (isUserAuthenticated) isUserAuthenticated(true);
                navigate(location.state?.from || '/');
            } else {
                setError(response.msg || 'Access Denied.');
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            setError(error.msg || error.message || 'Network Failure.');
        }
    };

    return (
        <MainWrapper>
            {/* Ambient Elements - Matches Home Banner */}
            <Box sx={{ position: 'absolute', top: '10%', left: '5%', animation: `${float} 6s infinite`, zIndex: 1 }}>
                <Code sx={{ fontSize: 120, color: '#6366f1', opacity: 0.1 }} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', animation: `${float} 8s infinite reverse`, zIndex: 1 }}>
                <Bolt sx={{ fontSize: 150, color: '#a855f7', opacity: 0.1 }} />
            </Box>

            <EliteLoginCard elevation={0}>
                <EliteLogo>
                    <Code sx={{ fontSize: 50 }} />
                </EliteLogo>

                <Typography variant="overline" sx={{ letterSpacing: 10, color: '#6366f1', fontWeight: 900, mb: 1.5 }}>
                    {account === 'login' ? 'SECURE ACCESS' : 'JOIN THE PLATFORM'}
                </Typography>

                <Typography variant="h3" sx={{
                    color: 'white',
                    fontWeight: 950,
                    letterSpacing: '-3px',
                    mb: 5,
                    textAlign: 'center',
                    lineHeight: 1
                }}>
                    {account === 'login' ? <>Welcome <br /> Back.</> : <>Create <br /> Identity.</>}
                </Typography>

                <Stack spacing={3} sx={{ width: '100%', mb: 5 }}>
                    {account === 'signup' && (
                        <EliteTextField
                            name="name"
                            label="Full Identity"
                            fullWidth
                            onChange={onInputChange}
                            InputProps={{ startAdornment: <InputAdornment position="start"><Bolt sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> }}
                        />
                    )}
                    <EliteTextField
                        name="username"
                        label="Username"
                        fullWidth
                        value={account === 'login' ? login.username : signup.username}
                        onChange={account === 'login' ? onValueChange : onInputChange}
                        InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> }}
                    />
                    <EliteTextField
                        name="password"
                        label="Security Key"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={account === 'login' ? login.password : signup.password}
                        onChange={account === 'login' ? onValueChange : onInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.2)' }}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>

                {error && <Typography sx={{ color: '#ff4757', bgcolor: 'rgba(255,71,87,0.1)', p: 2, borderRadius: '15px', width: '100%', mb: 3, textAlign: 'center', fontWeight: 700 }}>{error}</Typography>}

                <EliteActionButton fullWidth onClick={account === 'login' ? loginUser : signupUser}>
                    {account === 'login' ? 'Login Now' : 'Create Account'}
                </EliteActionButton>

                <Button
                    onClick={() => {
                        setError('');
                        setLogin({ username: '', password: '' });
                        setSignup({ name: '', username: '', password: '' });
                        toggleAccount(account === 'login' ? 'signup' : 'login');
                    }}
                    sx={{ color: 'rgba(255,255,255,0.4)', mt: 4, textTransform: 'none', fontWeight: 800, '&:hover': { color: '#6366f1', background: 'transparent' } }}
                >
                    {account === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </Button>
            </EliteLoginCard>
        </MainWrapper>
    );
};

export default Login;