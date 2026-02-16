import { Box, Typography, styled, Chip, Stack } from '@mui/material';
import { addElipsis } from '../../../utils/common-utils';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EliteContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(30px)',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    height: '520px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'relative',
    cursor: 'pointer',

    '&:hover': {
        transform: 'translateY(-12px)',
        background: 'rgba(30, 41, 59, 0.6)',
        borderColor: 'rgba(99, 102, 241, 0.4)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        '& .post-image': {
            transform: 'scale(1.1) rotate(2deg)',
        },
        '& .read-more-btn': {
            opacity: 1,
            transform: 'translateX(0)',
            color: '#6366f1',
        }
    }
}));

const ImageBox = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    background: '#0f172a',
});

const PostImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
});

const EliteChip = styled(Chip)({
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(99, 102, 241, 0.9)',
    color: 'white',
    fontWeight: 800,
    fontSize: '10px',
    letterSpacing: '1px',
    height: '26px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
});

const PostContent = styled(Box)({
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
});

const PostHeading = styled(Typography)({
    fontSize: '22px',
    fontWeight: 900,
    color: 'white',
    marginBottom: '15px',
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'color 0.3s',
});

const PostDescription = styled(Typography)({
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 1.6,
    marginBottom: '25px',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
});

const PostFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    marginTop: 'auto',
});

const AuthorInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '13px',
    fontWeight: 700,
});

const ReadMoreAction = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#6366f1',
    fontSize: '13px',
    fontWeight: 800,
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all 0.4s ease',
});

const Post = ({ post }) => {
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070';

    // Detect if it's a video
    const isVideo = post.mediaType === 'Video' ||
        url.match(/\.(mp4|webm|ogg|mov|mkv|avi)(?:\?|$)/i);

    return (
        <EliteContainer>
            <ImageBox>
                {isVideo ? (
                    <video
                        src={url}
                        className="post-image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease'
                        }}
                        muted
                        loop
                        autoPlay
                        playsInline
                    />
                ) : (
                    <PostImage src={url} alt={post.title} className="post-image" />
                )}
                <EliteChip label={post.categories?.toUpperCase() || post.category?.toUpperCase() || 'GENERAL'} />
            </ImageBox>

            <PostContent>
                <PostHeading className="post-title">{addElipsis(post.title, 55)}</PostHeading>
                <PostDescription>{addElipsis(post.description, 120)}</PostDescription>

                <PostFooter>
                    <AuthorInfo>
                        <Box sx={{
                            width: 28, height: 28,
                            borderRadius: '50%',
                            bgcolor: 'rgba(99, 102, 241, 0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <PersonIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                        </Box>
                        <span>{post.username}</span>
                    </AuthorInfo>

                    <ReadMoreAction className="read-more-btn">
                        VIEW BRIEF <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </ReadMoreAction>
                </PostFooter>
            </PostContent>
        </EliteContainer>
    );
};

export default Post;