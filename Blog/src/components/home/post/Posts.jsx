import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';

import { API } from '../../../service/api';
import { blogs } from '../../Data/data';

// Components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('q');

    useEffect(() => {
        const fetchData = async () => {
            let dbPosts = [];
            try {
                // Fetch actual posts from the database
                let response = await API.getAllBlogs({ category: category || '' });
                if (response.isSuccess) {
                    const rawPosts = (response.data.data || response.data) || [];
                    dbPosts = rawPosts.map(post => ({
                        ...post,
                        categories: post.category || post.categories
                    }));
                }
            } catch (error) {
                // Silent error
            }

            // Create mock posts from local data
            let mockPosts = blogs.map((blog, index) => ({
                _id: `mock-${index}`,
                title: blog.title,
                description: blog.description,
                picture: blog.image,
                username: "BlogFolio User",
                categories: blog.category,
                createDate: new Date()
            }));

            // Filter by Category
            if (category) {
                mockPosts = mockPosts.filter(post =>
                    post.categories.toLowerCase() === category.toLowerCase()
                );
            }

            // Filter by Search Query
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                dbPosts = dbPosts.filter(post =>
                    post.title.toLowerCase().includes(q) ||
                    post.description.toLowerCase().includes(q)
                );
                mockPosts = mockPosts.filter(post =>
                    post.title.toLowerCase().includes(q) ||
                    post.description.toLowerCase().includes(q)
                );
            }

            // Show DB posts first, then Mock posts
            if (dbPosts.length > 0) {
                setPosts(dbPosts);
            } else {
                setPosts(mockPosts);
            }
        }
        fetchData();
    }, [category, searchQuery]);

    return (
        <>
            {
                posts?.length > 0 ? posts.map(post => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                <Post post={post} />
                            </Link>
                        </Grid>
                    );
                }) : (
                    <Grid item xs={12}>
                        <Box sx={{
                            textAlign: 'center',
                            py: 10,
                            px: 3
                        }}>
                            <Typography variant="h5" sx={{
                                color: '#666',
                                mb: 2,
                                fontWeight: 600
                            }}>
                                No posts found
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#999' }}>
                                {searchQuery
                                    ? `No results for "${searchQuery}"`
                                    : category
                                        ? `No posts in ${category}`
                                        : 'No posts available yet.'}
                            </Typography>
                        </Box>
                    </Grid>
                )
            }
        </>
    );
};

export default Posts;