import { Card, CardMedia, CardContent, Typography, Button, Box, styled, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { TrendingFlat, PlayCircleOutline, MusicNote } from '@mui/icons-material';

const EliteBlogCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.4)',
  backdropFilter: 'blur(30px)',
  borderRadius: '35px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-12px)',
    background: 'rgba(30, 41, 59, 0.6)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    '& .media-layer': { transform: 'scale(1.08)' }
  }
}));

const MediaWrapper = styled(Box)({
  height: '220px',
  overflow: 'hidden',
  position: 'relative',
  background: '#0a0a0a',
});

const BlogCard = ({ post }) => {
  const url = post.picture || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070';

  let type = post.mediaType;
  if ((!type || type === 'Image') && url) {
    if (url.match(/\.(mp4|webm|ogg|mov|mkv|avi|3gp|flv|wmv)(?:\?|$)/i)) type = 'Video';
    else if (url.match(/\.(mp3|wav|mpeg|m4a|aac)(?:\?|$)/i)) type = 'Audio';
    else type = 'Image';
  }

  return (
    <EliteBlogCard elevation={0}>
      <MediaWrapper>
        {type === 'Video' ? (
          <>
            <CardMedia component="video" height="220" src={url} controls className="media-layer" sx={{ objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'rgba(0,0,0,0.6)', borderRadius: '50%', p: 0.5 }}>
              <PlayCircleOutline sx={{ color: 'white' }} />
            </Box>
          </>
        ) : type === 'Audio' ? (
          <Box sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(99,102,241,0.05)' }}>
            <audio controls src={url} style={{ width: '85%' }} />
            <MusicNote sx={{ position: 'absolute', top: 15, right: 15, color: '#6366f1' }} />
          </Box>
        ) : (
          <CardMedia
            component="img"
            height="220"
            image={url}
            alt={post.title}
            className="media-layer"
            sx={{ transition: '0.6s' }}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070' }}
          />
        )}
      </MediaWrapper>

      <CardContent sx={{ p: 4, flexGrow: 1 }}>
        <Typography variant="h5" fontWeight="950" sx={{ color: 'white', mb: 2, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{
          color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        }}>
          {post.description}
        </Typography>
      </CardContent>

      <Box sx={{ p: 4, pt: 0 }}>
        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            fullWidth
            endIcon={<TrendingFlat />}
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              color: 'white',
              borderRadius: '15px',
              py: 1.5,
              fontWeight: 900,
              border: '1px solid rgba(255,255,255,0.08)',
              textTransform: 'none',
              '&:hover': { bgcolor: '#6366f1', borderColor: '#6366f1' }
            }}
          >
            Access Brief
          </Button>
        </Link>
      </Box>
    </EliteBlogCard>
  );
};

export default BlogCard;