import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography, Avatar, Divider, Stack } from '@mui/material';
import { Send, Forum } from '@mui/icons-material';
import { DataContext } from '../../DataProvider';
import { API } from '../../service/api';

// components
import Comment from './Comment';

const Header = styled(Box)`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
`;

const InputSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    padding: '30px',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '40px'
}));

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-bottom: 15px;
    padding: 18px;
    borderRadius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-family: inherit;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    transition: all 0.3s ease;
    resize: none;
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
    
    &:focus-visible {
        outline: none;
        border-color: #667eea;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    }
`;

const PostButton = styled(Button)`
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-weight: 700;
    text-transform: none;
    padding: 12px 32px;
    border-radius: 50px;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    
    &:hover {
        background: linear-gradient(135deg, #764ba2, #667eea);
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
    }
    
    &:disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
    }
`;

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState({ name: '', postId: '', comments: '', date: new Date() });
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [post, toggle]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async (e) => {
        setLoading(true);
        try {
            let response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment({ ...comment, comments: '' });
                setToggle(prev => !prev);
            } else {
                alert("Could not post comment. Please try again.");
            }
        } catch (error) {
            console.log('Error adding comment:', error);
            alert("Something went wrong while posting your comment.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ mt: 8, maxWidth: '900px', mx: 'auto' }}>
            <Header>
                <Avatar sx={{ bgcolor: 'rgba(102, 126, 234, 0.2)', color: '#667eea', width: 48, height: 48 }}>
                    <Forum />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>
                    Discussion <Typography component="span" variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600, ml: 1 }}>({comments.length})</Typography>
                </Typography>
            </Header>

            <InputSection>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar sx={{ width: 48, height: 48, background: 'linear-gradient(135deg, #667eea, #764ba2)', fontWeight: 800 }}>
                        {account.username ? account.username[0].toUpperCase() : 'U'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <StyledTextArea
                            minRows={4}
                            placeholder="Share your thoughts on this story..."
                            value={comment.comments}
                            onChange={(e) => handleChange(e)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <PostButton
                                variant="contained"
                                disableElevation
                                endIcon={<Send sx={{ fontSize: '18px !important' }} />}
                                onClick={addComment}
                                disabled={loading || !comment.comments.trim()}
                            >
                                {loading ? 'Posting...' : 'Post Comment'}
                            </PostButton>
                        </Box>
                    </Box>
                </Stack>
            </InputSection>

            <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <Box sx={{ pb: 5 }}>
                {
                    comments && comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment comment={comment} setToggle={setToggle} key={comment._id} />
                        ))
                    ) : (
                        <Box sx={{
                            textAlign: 'center',
                            py: 8,
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '24px',
                            border: '1px dashed rgba(255, 255, 255, 0.1)'
                        }}>
                            <Forum sx={{ fontSize: 60, color: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: '16px' }}>
                                No comments yet. Be the first to start the conversation!
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default Comments;
