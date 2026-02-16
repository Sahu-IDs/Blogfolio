import { useState } from 'react';
import { Box, TextField, Stack, InputAdornment, styled, Typography } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const SearchBar = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        color: 'white',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        paddingRight: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '& fieldset': { border: 'none' },
        '&:hover': {
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
            border: '1px solid #6366f1'
        }
    },
    '& input': {
        padding: '15px 20px',
        fontSize: '1rem',
        fontWeight: 500
    }
});

const ScrollableStack = styled(Stack)({
    overflowX: 'auto',
    paddingBottom: '20px',
    '&::-webkit-scrollbar': { height: '0px' }, // Hide scrollbar for clean look
});

const CategoryCard = styled(Box)(({ $image, $active }) => ({
    minWidth: '120px',
    height: '60px',
    borderRadius: '16px',
    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${$image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: $active ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: $active ? '-5px' : '0',
    boxShadow: $active ? '0 10px 20px rgba(168, 85, 247, 0.4)' : 'none',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        '& .cat-text': { transform: 'scale(1.1)' }
    }
}));

const categoryImages = {
    'All': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
    'Tech': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    'Music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
    'Video': 'https://images.unsplash.com/photo-1579187702555-811120569682?w=500&q=80',
    'Movies': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80',
    'Story': 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=500&q=80',
    'Tutorial': 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&q=80'
};

const Categories = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category');
    const searchQuery = searchParams.get('q') || '';

    const handleCategoryClick = (cat) => {
        const newParams = new URLSearchParams(searchParams);
        if (cat === null) {
            newParams.delete('category');
            newParams.delete('q');
        } else if (activeCategory === cat) {
            newParams.delete('category');
        } else {
            newParams.set('category', cat);
        }
        setSearchParams(newParams);

        const postsSection = document.getElementById('posts');
        if (postsSection) postsSection.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (val) newParams.set('q', val);
        else newParams.delete('q');
        setSearchParams(newParams);
    };

    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
            {/* Search Input */}
            <Box sx={{ mb: 4, position: 'relative' }}>
                <SearchBar
                    fullWidth
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: '#6366f1', fontSize: 26, ml: 1 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <FilterList sx={{ color: 'rgba(255,255,255,0.3)' }} />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {/* Picturable Category Cards */}
            <ScrollableStack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'center' }}>
                <CategoryCard
                    $image={categoryImages['All']}
                    $active={!activeCategory}
                    onClick={() => handleCategoryClick(null)}
                >
                    <Typography className="cat-text" sx={{ color: 'white', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.8)', transition: '0.3s' }}>
                        ALL
                    </Typography>
                </CategoryCard>

                {categories.map(cat => (
                    <CategoryCard
                        key={cat.id}
                        $image={categoryImages[cat.type] || categoryImages['All']}
                        $active={activeCategory === cat.type}
                        onClick={() => handleCategoryClick(cat.type)}
                    >
                        <Stack alignItems="center">
                            <Typography className="cat-text" sx={{ color: 'white', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontSize: '0.9rem', transition: '0.3s' }}>
                                {cat.type}
                            </Typography>
                        </Stack>
                    </CategoryCard>
                ))}
            </ScrollableStack>
        </Box>
    );
};

export default Categories;