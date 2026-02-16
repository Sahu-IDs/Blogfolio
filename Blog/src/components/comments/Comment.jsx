import { useContext } from "react";
import { Typography, Box, styled, Avatar, IconButton, Tooltip } from "@mui/material";
import { DeleteOutline, EventNote } from '@mui/icons-material';
import { DataContext } from "../../DataProvider";
import { API } from '../../service/api';

const CommentWrapper = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    '&:hover': {
        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.15)',
        transform: 'translateY(-3px)',
        borderColor: 'rgba(102, 126, 234, 0.3)',
        background: 'rgba(255, 255, 255, 0.08)'
    }
}));

const Header = styled(Box)`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
`;

const AuthorName = styled(Typography)`
    font-weight: 800;
    font-size: 15px;
    color: white;
    letter-spacing: -0.3px;
`;

const MetaBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    font-weight: 600;
`;

const CommentBody = styled(Typography)`
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    line-height: 1.7;
    margin-left: 52px;
    word-break: break-word;
    white-space: pre-wrap;
    [theme.breakpoints.down('sm')]: {
        margin-left: 0;
        margin-top: 10px;
    }
`;

const DeleteBtn = styled(IconButton)`
    position: absolute;
    top: 15px;
    right: 15px;
    color: #ff4757;
    background: rgba(255, 71, 87, 0.1);
    &:hover {
        background: rgba(255, 71, 87, 0.2);
        transform: scale(1.1);
    }
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        if (window.confirm("Delete this comment?")) {
            try {
                // Standard delete API call
                let response = await API.deleteComment(comment._id);
                if (response.isSuccess) {
                    setToggle(prev => !prev);
                } else {
                    alert('Could not delete comment. Please try again.');
                }
            } catch (error) {
                console.log('Error deleting comment:', error);
            }
        }
    }

    const firstLetter = comment.name ? comment.name[0].toUpperCase() : 'U';

    return (
        <CommentWrapper>
            <Header>
                <Avatar sx={{
                    width: 44,
                    height: 44,
                    fontSize: '16px',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {firstLetter}
                </Avatar>
                <Box>
                    <AuthorName>{comment.name}</AuthorName>
                    <MetaBox>
                        <EventNote sx={{ fontSize: 14 }} />
                        {new Date(comment.date).toDateString()}
                    </MetaBox>
                </Box>
            </Header>
            <CommentBody>
                {comment.comments}
            </CommentBody>
            {account.username === comment.name && (
                <Tooltip title="Delete Comment">
                    <DeleteBtn onClick={removeComment} size="small">
                        <DeleteOutline sx={{ fontSize: 20 }} />
                    </DeleteBtn>
                </Tooltip>
            )}
        </CommentWrapper>
    )
}

export default Comment;
