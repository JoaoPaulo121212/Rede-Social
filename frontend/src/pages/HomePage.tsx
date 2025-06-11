import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Fab,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Post } from '../types';

// Components que criaremos
import PostCard from '../components/Posts/PostCard';
import CreatePostDialog from '../components/Posts/CreatePostDialog';
import TrendingSidebar from '../components/Widgets/TrendingSidebar';
import WelcomeCard from '../components/Widgets/WelcomeCard';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  // Mock data - será substituído por chamadas à API
  useEffect(() => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Buscar posts da timeline
    // Endpoint sugerido: GET /api/posts/timeline?limit=10&offset=0
    const mockPosts: Post[] = [
      {
        post_id: 1, // TODO: BACKEND - ID real do post
        user_id: 1, // TODO: BACKEND - ID real do usuário
        content: 'Bem-vindos à nossa rede social aberta! 🌟 Aqui todos os perfis são públicos e as conexões são livres. Vamos construir uma comunidade incrível juntos!', // TODO: BACKEND - Conteúdo real do post
        post_type: 'texto', // TODO: BACKEND - Tipo real do post
        created_at: '2024-12-19T10:30:00Z', // TODO: BACKEND - Data real de criação
        updated_at: '2024-12-19T10:30:00Z', // TODO: BACKEND - Data real de atualização
        username: 'joao_silva', // TODO: BACKEND - Username real (vem do JOIN)
        profile_photo: null, // TODO: BACKEND - Foto real do usuário (vem do JOIN)
        like_count: 15, // TODO: BACKEND - Contagem real de likes
        dislike_count: 0, // TODO: BACKEND - Contagem real de dislikes
        comment_count: 8, // TODO: BACKEND - Contagem real de comentários
      },
      {
        post_id: 2, // TODO: BACKEND - ID real do post
        user_id: 2, // TODO: BACKEND - ID real do usuário
        content: 'Acabei de me juntar à rede! Estou animada para conhecer pessoas novas e compartilhar experiências. Quem mais é apaixonado por tecnologia? 💻', // TODO: BACKEND - Conteúdo real do post
        post_type: 'texto', // TODO: BACKEND - Tipo real do post
        created_at: '2024-12-19T09:15:00Z', // TODO: BACKEND - Data real de criação
        updated_at: '2024-12-19T09:15:00Z', // TODO: BACKEND - Data real de atualização
        username: 'maria_tech', // TODO: BACKEND - Username real (vem do JOIN)
        profile_photo: null, // TODO: BACKEND - Foto real do usuário (vem do JOIN)
        like_count: 12, // TODO: BACKEND - Contagem real de likes
        dislike_count: 1, // TODO: BACKEND - Contagem real de dislikes
        comment_count: 5, // TODO: BACKEND - Contagem real de comentários
      },
      {
        post_id: 3, // TODO: BACKEND - ID real do post
        user_id: 3, // TODO: BACKEND - ID real do usuário
        content: 'Que tal criarmos um grupo para discutir as últimas tendências em desenvolvimento web? React, Vue, Angular... vamos compartilhar conhecimento! 🚀', // TODO: BACKEND - Conteúdo real do post
        post_type: 'texto', // TODO: BACKEND - Tipo real do post
        created_at: '2024-12-19T08:45:00Z', // TODO: BACKEND - Data real de criação
        updated_at: '2024-12-19T08:45:00Z', // TODO: BACKEND - Data real de atualização
        username: 'dev_carlos', // TODO: BACKEND - Username real (vem do JOIN)
        profile_photo: null, // TODO: BACKEND - Foto real do usuário (vem do JOIN)
        like_count: 23, // TODO: BACKEND - Contagem real de likes
        dislike_count: 2, // TODO: BACKEND - Contagem real de dislikes
        comment_count: 12, // TODO: BACKEND - Contagem real de comentários
      },
    ];

    // TODO: REMOVER SIMULAÇÃO DE CARREGAMENTO - Substituir por loading real das chamadas API
    // Simular carregamento
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreatePost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setCreatePostOpen(false);
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.post_id === updatedPost.post_id ? updatedPost : post
      )
    );
  };

  const renderLoadingSkeleton = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box sx={{ flex: '1 1 66%' }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ mb: 3, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="25%" height={16} />
              </Box>
            </Box>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
              ))}
            </Box>
          </Card>
        ))}
      </Box>
      {!isMobile && (
        <Box sx={{ flex: '1 1 33%' }}>
          <Card sx={{ p: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} />
          </Card>
        </Box>
      )}
    </Box>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 1 }}>
        {renderLoadingSkeleton()}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {/* Coluna principal - Timeline */}
        <Box sx={{ flex: '1 1 66%', minWidth: 0 }}>
          {/* Card de boas-vindas */}
          <WelcomeCard sx={{ mb: 3 }} />

          {/* Lista de postagens */}
          <Box>
            {posts.length === 0 ? (
              <Card sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Nenhuma postagem ainda
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seja o primeiro a compartilhar algo interessante!
                </Typography>
              </Card>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  onUpdate={handlePostUpdate}
                />
              ))
            )}
          </Box>
        </Box>

        {/* Sidebar direita - Apenas em desktop */}
        {!isMobile && (
          <Box sx={{ flex: '1 1 33%', minWidth: 280 }}>
            <Box sx={{ position: 'sticky', top: 80 }}>
              <TrendingSidebar />
            </Box>
          </Box>
        )}
      </Box>

      {/* Botão flutuante para criar post */}
      <Fab
        color="primary"
        aria-label="criar post"
        onClick={() => setCreatePostOpen(true)}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1000,
          boxShadow: 3,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: 6,
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog para criar post */}
      <CreatePostDialog
        open={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        onSubmit={handleCreatePost}
      />
    </Container>
  );
};

export default HomePage; 