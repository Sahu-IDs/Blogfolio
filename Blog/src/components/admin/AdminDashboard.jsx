import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, IconButton, Tooltip, Container } from '@mui/material';
import { DataContext } from '../../DataProvider';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { People, Article, VerifiedUser, AdminPanelSettings, Delete, Visibility } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const DashboardContainer = styled(Box)({
    minHeight: '100vh',
    background: 'radial-gradient(circle at 10% 20%, rgb(5, 7, 10) 0%, rgb(12, 16, 28) 90.2%)',
    paddingTop: '100px',
    paddingBottom: '50px',
    color: 'white'
});

const StatCard = styled(Paper)(({ theme, color }) => ({
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${color}`,
    borderRadius: '20px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 10px 30px ${color}40`
    }
}));

const StyledTableContainer = styled(TableContainer)({
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '30px',
    overflow: 'hidden'
});

const StyledTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        cursor: 'pointer'
    },
    '&:last-child td, &:last-child th': {
        border: 0
    }
});

const AdminDashboard = () => {
    const { account } = useContext(DataContext);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalAdmins: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await API.getAllUsers();
                if (response.isSuccess) {
                    setUsers(response.data);

                    // Calculate Stats
                    const admins = response.data.filter(user => user.role === 'admin').length;
                    setStats({
                        totalUsers: response.data.length,
                        totalAdmins: admins
                    });
                }
            } catch (error) {
                console.log('Error fetching users', error);
            }
        };

        if (account && account.role === 'admin') {
            fetchUsers();
        } else {
            console.log("Access Denied: Admin only area");
            // Optionally redirect, but standard allows viewing if logic handles it
            // For security, redirecting is better
            // navigate('/'); 
        }
    }, [account, navigate]);

    if (!account || account.role !== 'admin') {
        return (
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#05070a', color: 'white' }}>
                <Typography variant="h4" color="error">Access Denied: Admins Only</Typography>
            </Box>
        );
    }

    return (
        <DashboardContainer>
            <Container maxWidth="xl">
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AdminPanelSettings sx={{ fontSize: 50, color: '#f59e0b' }} />
                    <Box>
                        <Typography variant="h3" fontWeight={800} sx={{ background: 'linear-gradient(to right, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Admin Dashboard
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
                            Manage users, monitor platform stats, and oversee content.
                        </Typography>
                    </Box>
                </Box>

                {/* STATS GRID */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard color="#3b82f6">
                            <Box>
                                <Typography variant="h6" sx={{ color: '#93c5fd', fontWeight: 700 }}>Total Users</Typography>
                                <Typography variant="h2" sx={{ fontWeight: 800 }}>{stats.totalUsers}</Typography>
                            </Box>
                            <People sx={{ fontSize: 60, color: '#3b82f6', opacity: 0.8 }} />
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard color="#f59e0b">
                            <Box>
                                <Typography variant="h6" sx={{ color: '#fcd34d', fontWeight: 700 }}>Administrators</Typography>
                                <Typography variant="h2" sx={{ fontWeight: 800 }}>{stats.totalAdmins}</Typography>
                            </Box>
                            <VerifiedUser sx={{ fontSize: 60, color: '#f59e0b', opacity: 0.8 }} />
                        </StatCard>
                    </Grid>
                    {/* Placeholder for Posts Count if API available */}
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard color="#10b981">
                            <Box>
                                <Typography variant="h6" sx={{ color: '#6ee7b7', fontWeight: 700 }}>System Status</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981' }}>Active</Typography>
                            </Box>
                            <Article sx={{ fontSize: 60, color: '#10b981', opacity: 0.8 }} />
                        </StatCard>
                    </Grid>
                </Grid>

                {/* USERS TABLE */}
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, borderLeft: '4px solid #6366f1', pl: 2 }}>
                    User Management
                </Typography>

                <StyledTableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#c7d2fe', fontWeight: 800 }}>User Profile</TableCell>
                                <TableCell sx={{ color: '#c7d2fe', fontWeight: 800 }}>Username</TableCell>
                                <TableCell sx={{ color: '#c7d2fe', fontWeight: 800 }}>Role</TableCell>
                                <TableCell sx={{ color: '#c7d2fe', fontWeight: 800 }}>Joined Date</TableCell>
                                <TableCell sx={{ color: '#c7d2fe', fontWeight: 800, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user._id}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                                alt={user.name}
                                                sx={{ border: '2px solid rgba(255,255,255,0.2)' }}
                                            />
                                            <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#cbd5e1' }}>@{user.username}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role || 'user'}
                                            size="small"
                                            sx={{
                                                bgcolor: user.role === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                                color: user.role === 'admin' ? '#fbbf24' : '#60a5fa',
                                                fontWeight: 800,
                                                border: `1px solid ${user.role === 'admin' ? '#f59e0b' : '#3b82f6'}40`
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: '#94a3b8' }}>
                                        {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Portfolio">
                                            <IconButton
                                                onClick={() => navigate(`/portfolio/${user._id}`)}
                                                sx={{ color: '#3b82f6', '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)' } }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        {account.username !== user.username && (
                                            <Tooltip title="Delete User (Coming Soon)">
                                                <IconButton
                                                    disabled
                                                    sx={{ color: 'rgba(239, 68, 68, 0.5)', cursor: 'not-allowed' }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Container>
        </DashboardContainer>
    );
}

export default AdminDashboard;
