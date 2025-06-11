import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  Divider,
  Button,
  SxProps,
  Theme,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onUpdate?: (post: Post) => void;
  sx?: SxProps<Theme>;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate, sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [dislikeCount, setDislikeCount] = useState(post.dislike_count || 0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Curtir/descurtir post
    // Endpoint sugerido: POST /api/posts/:postId/like ou DELETE /api/posts/:postId/like
    if (userReaction === 'like') {
      setUserReaction(null);
      setLikeCount(prev => prev - 1);
    } else {
      if (userReaction === 'dislike') {
        setDislikeCount(prev => prev - 1);
      }
      setUserReaction('like');
      setLikeCount(prev => prev + 1);
    }
  };

  const handleDislike = () => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Dar dislike/remover dislike do post
    // Endpoint sugerido: POST /api/posts/:postId/dislike ou DELETE /api/posts/:postId/dislike
    if (userReaction === 'dislike') {
      setUserReaction(null);
      setDislikeCount(prev => prev - 1);
    } else {
      if (userReaction === 'like') {
        setLikeCount(prev => prev - 1);
      }
      setUserReaction('dislike');
      setDislikeCount(prev => prev + 1);
    }
  };

  const handleComment = () => {
    // TODO: IMPLEMENTAR NAVEGAÇÃO PARA PÁGINA DE COMENTÁRIOS
    // Ou abrir modal de comentários
    console.log('Comentar no post:', post.post_id);
  };

  const handleShare = () => {
    // TODO: IMPLEMENTAR FUNCIONALIDADE DE COMPARTILHAMENTO
    // Pode ser compartilhamento interno (repost) ou externo (redes sociais)
    console.log('Compartilhar post:', post.post_id);
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return 'há alguns momentos';
    }
  };

  return (
    <Card 
      sx={{ 
        ...sx,
        mb: 3,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 3,
        },
      }}
    >
      {/* Header do post */}
      <CardContent sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            src={post.profile_photo || undefined}
            sx={{ 
              width: 48, 
              height: 48, 
              mr: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            aria-label={`Perfil de ${post.username}`}
          >
            {!post.profile_photo && <PersonIcon />}
          </Avatar>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                @{post.username}
              </Typography>
              {post.post_type === 'imagem' && (
                <Chip 
                  label="Imagem" 
                  size="small" 
                  sx={{ height: 20, fontSize: '0.75rem' }}
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {formatDate(post.created_at)}
            </Typography>
          </Box>

          <IconButton
            aria-label="mais opções"
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Conteúdo do post */}
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '1rem',
            color: 'text.primary',
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      {/* Estatísticas */}
      <Box sx={{ px: 3, py: 1.5, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>{likeCount}</strong> curtidas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{dislikeCount}</strong> descurtidas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{post.comment_count || 0}</strong> comentários
          </Typography>
          <Box sx={{ flex: 1 }} />
          {post.net_score !== undefined && (
            <Typography 
              variant="body2" 
              color={post.net_score > 0 ? 'success.main' : post.net_score < 0 ? 'error.main' : 'text.secondary'}
              fontWeight={600}
            >
              Score: {post.net_score > 0 ? '+' : ''}{post.net_score}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Ações */}
      <CardActions sx={{ px: 3, py: 1.5, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<ThumbUpIcon />}
            onClick={handleLike}
            variant={userReaction === 'like' ? 'contained' : 'text'}
            color="primary"
            size="small"
            sx={{ 
              minWidth: 'auto',
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Curtir
          </Button>
          
          <Button
            startIcon={<ThumbDownIcon />}
            onClick={handleDislike}
            variant={userReaction === 'dislike' ? 'contained' : 'text'}
            color="error"
            size="small"
            sx={{ 
              minWidth: 'auto',
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Descurtir
          </Button>
          
          <Button
            startIcon={<CommentIcon />}
            onClick={handleComment}
            variant="text"
            color="inherit"
            size="small"
            sx={{ 
              minWidth: 'auto',
              px: 2,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Comentar
          </Button>
        </Box>
        
        <Button
          startIcon={<ShareIcon />}
          onClick={handleShare}
          variant="text"
          color="inherit"
          size="small"
          sx={{ 
            minWidth: 'auto',
            px: 2,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Compartilhar
        </Button>
      </CardActions>

      {/* Menu de opções */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          Salvar post
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Copiar link
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Reportar
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default PostCard; 