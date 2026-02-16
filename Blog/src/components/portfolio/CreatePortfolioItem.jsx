import React, { useState, useContext, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../DataProvider';

const initialItem = {
    title: '',
    description: '',
    picture: '',
    categories: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    linkedIn: '',
    phoneNumber: '',
    email: '',
    contact: '',
    skills: ''
};

const CreatePortfolioItem = () => {
    const [item, setItem] = useState(initialItem);
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Set category from URL parameter if available
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setItem(prev => ({ ...prev, categories: categoryParam.toLowerCase() }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const savePortfolioItem = async () => {
        if (!item.categories) {
            alert("Please select a category");
            return;
        }

        if (!item.title && item.categories !== 'contact') {
            alert("Please enter a Title (or Name/Skill Name)");
            return;
        }

        const itemToSave = {
            ...item,
            username: account.username,
            userId: account._id
        };

        console.log("Saving portfolio item:", itemToSave); // Debug log

        try {
            let response = await API.createPortfolioItem(itemToSave);
            if (response.isSuccess) {
                navigate('/portfolio');
            } else {
                alert("Something went wrong! Please try again.");
            }
        } catch (error) {
            console.log(error);
            alert("Error saving item. Please check your connection.");
        }
    }

    // Helper function to determine which fields to show based on category
    const shouldShowField = (fieldName) => {
        const category = item.categories;

        // Fields shown for all categories
        const commonFields = ['categories', 'title', 'description', 'picture'];

        // Category-specific fields
        const categoryFields = {
            'name': ['linkedIn', 'phoneNumber', 'contact'],
            'skill': ['skills'],
            'project': ['techStack', 'liveLink', 'githubLink'],
            'work': ['techStack'],
            'education': [],
            'certificate': ['liveLink'],
            'contact': ['linkedIn', 'phoneNumber', 'contact', 'githubLink']
        };

        if (commonFields.includes(fieldName)) return true;
        if (!category) return false;

        return categoryFields[category]?.includes(fieldName) || false;
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#333' },
            '&:hover fieldset': { borderColor: '#FF6B35' },
            '&.Mui-focused fieldset': { borderColor: '#FF6B35' }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 12, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: '#0a0a0a', color: '#fff', border: '1px solid #333', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', fontWeight: 'bold', mb: 3 }}>
                    Add Portfolio Item
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Category Selection */}
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#888', '&.Mui-focused': { color: '#FF6B35' } }}>Category *</InputLabel>
                        <Select
                            name="categories"
                            value={item.categories}
                            label="Category *"
                            onChange={handleChange}
                            sx={{
                                color: '#fff',
                                '.MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF6B35' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF6B35' },
                                '.MuiSvgIcon-root': { color: '#fff' }
                            }}
                        >
                            <MenuItem value="name">Hero / Personal Info</MenuItem>
                            <MenuItem value="skill">Skill</MenuItem>
                            <MenuItem value="project">Project</MenuItem>
                            <MenuItem value="work">Experience / Work</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="certificate">Certificate</MenuItem>
                            <MenuItem value="contact">Contact Info</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Title */}
                    {shouldShowField('title') && (
                        <TextField
                            label={item.categories === 'name' ? 'Your Name' : item.categories === 'skill' ? 'Skill Name' : 'Title'}
                            name="title"
                            value={item.title}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#333' } }}
                            sx={textFieldStyle}
                            helperText={item.categories === 'skill' ? 'e.g., React, Node.js, Python' : ''}
                        />
                    )}

                    {/* Description */}
                    {shouldShowField('description') && (
                        <TextField
                            label={item.categories === 'name' ? 'Bio / About You' : 'Description'}
                            name="description"
                            value={item.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                        />
                    )}

                    {/* Picture */}
                    {shouldShowField('picture') && (
                        <TextField
                            label={item.categories === 'name' ? 'Profile Picture URL' : 'Image URL'}
                            name="picture"
                            value={item.picture}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                            helperText="Enter a direct image URL"
                        />
                    )}

                    {/* Tech Stack */}
                    {shouldShowField('techStack') && (
                        <TextField
                            label="Tech Stack / Technologies Used"
                            name="techStack"
                            value={item.techStack}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                            helperText="e.g., React, Node.js, MongoDB"
                        />
                    )}

                    {/* Skills (for skill category) */}
                    {shouldShowField('skills') && (
                        <TextField
                            label="Skill Details"
                            name="skills"
                            value={item.skills}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                            helperText="Additional details about this skill"
                        />
                    )}

                    {/* Live Link */}
                    {shouldShowField('liveLink') && (
                        <TextField
                            label={item.categories === 'certificate' ? 'Certificate URL' : 'Live Demo / Website Link'}
                            name="liveLink"
                            value={item.liveLink}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                        />
                    )}

                    {/* GitHub Link */}
                    {shouldShowField('githubLink') && (
                        <TextField
                            label={item.categories === 'contact' ? 'GitHub Profile' : 'GitHub / Source Code'}
                            name="githubLink"
                            value={item.githubLink}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                        />
                    )}

                    {/* LinkedIn */}
                    {shouldShowField('linkedIn') && (
                        <TextField
                            label="LinkedIn Profile"
                            name="linkedIn"
                            value={item.linkedIn}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                            helperText="Your LinkedIn profile URL"
                        />
                    )}

                    {/* Phone Number */}
                    {shouldShowField('phoneNumber') && (
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={item.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                        />
                    )}

                    {/* Contact Email */}
                    {shouldShowField('contact') && (
                        <TextField
                            label="Email Address"
                            name="contact"
                            value={item.contact}
                            onChange={handleChange}
                            fullWidth
                            type="email"
                            InputLabelProps={{ style: { color: '#888' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={textFieldStyle}
                        />
                    )}

                    <Button
                        variant="contained"
                        onClick={savePortfolioItem}
                        sx={{
                            bgcolor: '#FF6B35',
                            fontWeight: 'bold',
                            py: 1.5,
                            '&:hover': { bgcolor: '#e55a2b' }
                        }}
                    >
                        Save Item
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreatePortfolioItem;