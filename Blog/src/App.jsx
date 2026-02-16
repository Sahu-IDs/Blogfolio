import { useState, useContext, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Login from './components/account/Login'
import Home from './components/home/Home';
import Header from './components/header/Header';
import Portfolio from './components/portfolio/portfolio';
import CreatePost from './components/create/CreatePost';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import BlogPage from './components/blog/BlogPage';
import DetailView from './components/details/DetailView';
import CreatePortfolioItem from './components/portfolio/CreatePortfolioItem';
import ProjectDocs from './components/docs/ProjectDocs';
import AdminDashboard from './components/admin/AdminDashboard';
import { DataContext } from './DataProvider';



const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ?
    <>
      <Header />
      <div style={{ marginTop: '64px' }}>
        <Outlet />
      </div>
    </>
    : <Navigate replace to='/login' />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(!!sessionStorage.getItem('accessToken'));
  const { account, themeMode } = useContext(DataContext);

  useEffect(() => {
    console.log("Account state updated:", account);
  }, [account]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: '#05070a', minHeight: '100vh' }}>
        <Routes>
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

          {/* Public Routes (Accessible without Login) */}
          <Route element={<><Header /><div style={{ marginTop: '64px' }}><Outlet /></div></>}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/portfolio/:userId' element={<Portfolio />} />
            <Route path='/details/:id' element={<DetailView />} />
            <Route path='/project-docs' element={<ProjectDocs />} />
            <Route path='/admin' element={<AdminDashboard />} />
          </Route>

          {/* Private Routes (Requires Login - Create/Edit/Delete) */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/create' element={<CreatePost />} />
            <Route path='/create-portfolio' element={<CreatePortfolioItem />} />
            <Route path='/update/:id' element={<CreatePost />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
