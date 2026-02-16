import { Box, FormControl, TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';

export const CategoryInputs = ({ post, handleChange, inputSx, getPlaceholder }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
            {/* Contact Category */}
            {/* Contact Category */}
            {post.categories === 'Contact' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField label="LinkedIn Profile" name="linkedIn" value={post.linkedIn || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="https://linkedin.com/in/..." variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                        <TextField label="Phone Number" name="phoneNumber" value={post.phoneNumber || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="+91 9876543210" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                        <TextField label="Email *" name="contact" value={post.contact || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="your@email.com" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                    </Box>
                    <TextField label="Address" name="description" value={post.description || ''} onChange={(e) => handleChange(e)} fullWidth size="small" multiline rows={2} InputLabelProps={{ shrink: true }} placeholder="Your Address" variant="standard" sx={inputSx} />
                </Box>
            ) : post.categories === 'Skill' ? (
                <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                    <TextField label="Documentation URL" name="liveLink" value={post.liveLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="https://..." variant="standard" sx={inputSx} />
                </Box>
            ) : post.categories === 'Project' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField label="Live Project URL" name="liveLink" value={post.liveLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="https://..." variant="standard" sx={inputSx} />
                        <TextField label="GitHub Link" name="githubLink" value={post.githubLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="https://github.com/..." variant="standard" sx={inputSx} />
                    </Box>
                </Box>
            ) : post.categories === 'Certificate' ? (
                <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                    <TextField label="Issuing Organization *" name="liveLink" value={post.liveLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Issuing Organization" variant="standard" sx={inputSx} />
                    <TextField label="Issue Date" name="techStack" value={post.techStack || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Issue Date" variant="standard" sx={inputSx} />
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'center' }}>
                        <TextField label="Certificate Photo URL" name="picture" value={post.picture || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Paste URL or Upload" variant="standard" sx={inputSx} />
                        <label htmlFor="fileInput">
                            <Button component="span" variant="contained" size="small" sx={{ whiteSpace: 'nowrap' }}>Upload</Button>
                        </label>
                    </Box>
                </Box>
            ) : post.categories === 'Name' ? (
                <Box sx={{ display: 'flex', gap: 2, my: 2, flexWrap: 'wrap', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
                        <TextField label="Resume URL" name="githubLink" value={post.githubLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Resume URL" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                        <TextField label="LinkedIn Profile" name="linkedIn" value={post.linkedIn || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="LinkedIn URL" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                        <TextField label="Phone Number" name="phoneNumber" value={post.phoneNumber || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Phone Number" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '32%' } }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
                        <TextField label="Email Address" name="contact" value={post.contact || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Email Address" variant="standard" sx={{ ...inputSx, width: { xs: '100%', sm: '48%' } }} />
                        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: '48%' }, alignItems: 'center' }}>
                            <TextField label="Photo URL" name="picture" value={post.picture || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Paste URL or Upload" variant="standard" sx={inputSx} />
                            <label htmlFor="fileInput">
                                <Button component="span" variant="contained" size="small" sx={{ whiteSpace: 'nowrap' }}>Upload</Button>
                            </label>
                        </Box>
                    </Box>
                    <TextField label="About Yourself" name="description" value={post.description || ''} onChange={(e) => handleChange(e)} fullWidth multiline rows={4} InputLabelProps={{ shrink: true }} placeholder="Tell us about yourself..." variant="standard" sx={inputSx} />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                    {post.categories === 'Blog' && (
                        <>
                            <FormControl fullWidth>
                                <InputLabel>Media Type</InputLabel>
                                <Select
                                    name="mediaType"
                                    value={post.mediaType || 'Image'}
                                    onChange={(e) => handleChange(e)}
                                    variant="standard"
                                    sx={inputSx}
                                >
                                    <MenuItem value="Image">Image</MenuItem>
                                    <MenuItem value="Video">Video</MenuItem>
                                    <MenuItem value="Audio">Audio</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="Media URL (Image/Video/Audio)" name="picture" value={post.picture || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder="Paste URL or Upload via +" variant="standard" sx={inputSx} />
                        </>
                    )}

                    {post.categories === 'Story' && (
                        <TextField
                            fullWidth
                            multiline
                            minRows={10}
                            variant="standard"
                            placeholder="Write your story here..."
                            onChange={(e) => handleChange(e)}
                            name="story"
                            value={post.story || ''}
                            sx={{ ...inputSx, mt: 4 }}
                        />
                    )}

                    {post.categories !== 'Blog' && post.categories !== 'Story' && (
                        <>
                            <TextField label={getPlaceholder('techStack') || "Tags"} name="techStack" value={post.techStack || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder={getPlaceholder('techStack')} variant="standard" sx={inputSx} />
                            <TextField label={getPlaceholder('liveLink') || "Reference Link"} name="liveLink" value={post.liveLink || ''} onChange={(e) => handleChange(e)} fullWidth size="small" InputLabelProps={{ shrink: true }} placeholder={getPlaceholder('liveLink')} variant="standard" sx={inputSx} />
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};
