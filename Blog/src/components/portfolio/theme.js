import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B35', // Orange accent
    },
    background: {
      default: '#0F0F0F', // Deep black
      paper: '#1A1A1A',   // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#FF6B35',
    },
  },
});

export const backgroundStyle = {
    backgroundColor: '#0F0F0F',
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 40%)
    `,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  };

export default theme;
