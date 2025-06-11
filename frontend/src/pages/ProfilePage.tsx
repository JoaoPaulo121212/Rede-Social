import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon,
  Edit as EditIcon,
  Message as MessageIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { Post, User } from '../types';
import PostCard from '../components/Posts/PostCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - será substituído por chamadas à API
  useEffect(() => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Buscar dados do usuário
    // Endpoint sugerido: GET /api/users/:userId/profile
    const mockUser: User = {
      user_id: 1,
      username: 'joao_silva',
      email: 'joao@exemplo.com',
      birth_date: '1990-05-15', // TODO: BACKEND - Data de nascimento real do usuário
      profile_photo: null, // TODO: BACKEND - URL da foto de perfil do usuário
      bio: 'Desenvolvedor apaixonado por tecnologia e inovação. Sempre aberto para novas conexões e colaborações! 🚀', // TODO: BACKEND - Bio real do usuário
      location: 'São Paulo, Brasil', // TODO: BACKEND - Localização real do usuário
      website: 'https://joaosilva.dev', // TODO: BACKEND - Website real do usuário
      created_at: '2024-01-15T10:00:00Z', // TODO: BACKEND - Data real de criação da conta
      updated_at: '2024-12-19T10:00:00Z', // TODO: BACKEND - Data real da última atualização
      is_verified: true, // TODO: BACKEND - Status real de verificação do usuário
    };

    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Buscar posts do usuário
    // Endpoint sugerido: GET /api/users/:userId/posts?limit=10&offset=0
    const mockPosts: Post[] = [
      {
        post_id: 1, // TODO: BACKEND - ID real do post
        user_id: 1, // TODO: BACKEND - ID real do usuário
        content: 'Acabei de lançar meu novo projeto! Uma aplicação React com Material UI que demonstra os princípios de uma rede social aberta e transparente. 🎉', // TODO: BACKEND - Conteúdo real do post
        post_type: 'texto', // TODO: BACKEND - Tipo real do post
        created_at: '2024-12-19T10:30:00Z', // TODO: BACKEND - Data real de criação
        updated_at: '2024-12-19T10:30:00Z', // TODO: BACKEND - Data real de atualização
        username: 'joao_silva', // TODO: BACKEND - Username real (vem do JOIN)
        profile_photo: null, // TODO: BACKEND - Foto real do usuário (vem do JOIN)
        like_count: 25, // TODO: BACKEND - Contagem real de likes
        dislike_count: 1, // TODO: BACKEND - Contagem real de dislikes
        comment_count: 12, // TODO: BACKEND - Contagem real de comentários
        net_score: 24, // TODO: BACKEND - Score real calculado
      },
      {
        post_id: 2, // TODO: BACKEND - ID real do post
        user_id: 1, // TODO: BACKEND - ID real do usuário
        content: 'Reflexão do dia: A transparência nas redes sociais pode revolucionar como nos conectamos. Quando todos os perfis são públicos, criamos um ambiente mais autêntico e inclusivo.', // TODO: BACKEND - Conteúdo real do post
        post_type: 'texto', // TODO: BACKEND - Tipo real do post
        created_at: '2024-12-18T15:20:00Z', // TODO: BACKEND - Data real de criação
        updated_at: '2024-12-18T15:20:00Z', // TODO: BACKEND - Data real de atualização
        username: 'joao_silva', // TODO: BACKEND - Username real (vem do JOIN)
        profile_photo: null, // TODO: BACKEND - Foto real do usuário (vem do JOIN)
        like_count: 18, // TODO: BACKEND - Contagem real de likes
        dislike_count: 3, // TODO: BACKEND - Contagem real de dislikes
        comment_count: 8, // TODO: BACKEND - Contagem real de comentários
        net_score: 15, // TODO: BACKEND - Score real calculado
      },
    ];

    // TODO: REMOVER SIMULAÇÃO DE CARREGAMENTO - Substituir por loading real das chamadas API
    // Simular carregamento
    setTimeout(() => {
      setUser(mockUser);
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.post_id === updatedPost.post_id ? updatedPost : post
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    });
  };

  if (loading || !user) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Card sx={{ mb: 3 }}>
          <Box sx={{ height: 200, backgroundColor: 'grey.200' }} />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'grey.300',
                  mt: -8,
                  mr: 3,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ height: 24, backgroundColor: 'grey.300', borderRadius: 1, mb: 1, width: '40%' }} />
                <Box sx={{ height: 16, backgroundColor: 'grey.200', borderRadius: 1, width: '60%' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header do perfil */}
      <Card sx={{ mb: 3, overflow: 'visible' }}>
        {/* Cover photo placeholder */}
        <Box
          sx={{
            height: 200,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            position: 'relative',
          }}
        />
        
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start' }}>
            {/* Avatar */}
            <Avatar
              src={user.profile_photo || undefined}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                mt: -8,
                mr: isMobile ? 0 : 3,
                mb: isMobile ? 2 : 0,
              }}
            >
              {!user.profile_photo && <PersonIcon sx={{ fontSize: 60 }} />}
            </Avatar>

            {/* Informações do usuário */}
            <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', mb: 1 }}>
                <Typography variant="h4" fontWeight={600} sx={{ mr: 1 }}>
                  @{user.username}
                </Typography>
                {user.is_verified && (
                  <VerifiedIcon color="primary" sx={{ fontSize: 28 }} />
                )}
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 600 }}>
                {user.bio}
              </Typography>

              {/* Informações adicionais */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {user.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.location}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Membro desde {formatDate(user.created_at)}
                  </Typography>
                </Box>

                {user.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinkIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography 
                      variant="body2" 
                      color="primary" 
                      component="a" 
                      href={user.website}
                      target="_blank"
                      sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {user.website.replace('https://', '')}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Estatísticas */}
              <Box sx={{ display: 'flex', gap: 3, mb: 2, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {posts.length} {/* TODO: BACKEND - Contagem real de posts do usuário */}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posts
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    1.2K {/* TODO: BACKEND - Contagem real de seguidores do usuário */}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Seguidores
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    856 {/* TODO: BACKEND - Contagem real de usuários que este usuário segue */}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Seguindo
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {posts.reduce((sum, post) => sum + (post.net_score || 0), 0)} {/* TODO: BACKEND - Score total real calculado */}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Score Total
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Botões de ação */}
            <Box sx={{ display: 'flex', gap: 1, mt: isMobile ? 2 : 0 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
              >
                Editar Perfil
              </Button>
              <Button
                variant="contained"
                startIcon={<MessageIcon />}
                size="small"
              >
                Mensagem
              </Button>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs de conteúdo */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant={isMobile ? 'fullWidth' : 'standard'}
            aria-label="tabs do perfil"
          >
            <Tab label={`Posts (${posts.length})`} />
            <Tab label="Curtidas" />
            <Tab label="Grupos" />
            <Tab label="Atividade" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {/* Posts do usuário */}
          <Box>
            {posts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Nenhum post ainda
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este usuário ainda não compartilhou nenhum conteúdo.
                </Typography>
              </Box>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  onUpdate={handlePostUpdate}
                  sx={{ mb: 2 }}
                />
              ))
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Posts Curtidos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aqui aparecerão os posts que este usuário curtiu.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Grupos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Grupos dos quais este usuário participa.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Atividade Recente
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Histórico de atividades do usuário na rede.
            </Typography>
          </Box>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default ProfilePage; 