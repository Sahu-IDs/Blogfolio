import { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box, Stack, CircularProgress } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import { API } from '../../service/api';
import BlogCard from './BlogCard';
import { styled, keyframes } from '@mui/material/styles';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.1; }
`;

const PageWrapper = styled(Box)({
  minHeight: "100vh",
  background: "#05070a", // Deep Black
  position: "relative",
  overflow: "hidden",
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
    top: '-200px',
    right: '-200px',
    filter: 'blur(100px)',
    animation: `${pulse} 10s ease-in-out infinite`,
  }
});

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await API.getAllBlogs({ category: category || '' });
        if (response.isSuccess) {
          // Check if data is nested in data.data
          const data = response.data.data || response.data || [];
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            console.error('Data format error: expected array', data);
            setPosts([]);
          }
        } else {
          console.error('Failed to fetch blogs:', response);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <PageWrapper sx={{ pt: 18, pb: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10 }}>
          <Typography variant="overline" sx={{ letterSpacing: 8, color: '#6366f1', display: 'block', fontWeight: 900, mb: 2 }}>
            THE ARCHIVE
          </Typography>
          <Typography variant="h2" fontWeight="950" sx={{ color: 'white', letterSpacing: '-3px', lineHeight: 1 }}>
            {category ? `${category} Missions` : 'Latest Transmissions'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', mt: 3, maxWidth: '600px', fontSize: '1.1rem' }}>
            A curated database of professional insights, technical tutorials, and creative stories forged by our community.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#6366f1' }} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={post._id}>
                  <BlogCard post={post} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{
                  textAlign: 'center', py: 10, bgcolor: 'rgba(255,255,255,0.02)',
                  borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>
                    No transmissions found in this sector.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
};

export default BlogPage;