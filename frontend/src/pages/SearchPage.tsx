import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Article as ArticleIcon,
  Tag as TagIcon,
  PersonAdd as PersonAddIcon,
  GroupAdd as GroupAddIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { Post, User, Group } from '../types';

interface SearchResults {
  users: User[];
  posts: Post[];
  groups: Group[];
  tags: string[];
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [tabValue, setTabValue] = useState(0);
  const [results, setResults] = useState<SearchResults>({
    users: [],
    posts: [],
    groups: [],
    tags: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Busca real
    // Endpoint sugerido: GET /api/search?q={query}&type=all
    try {
      // Mock data - será substituído por chamadas reais
      const mockResults: SearchResults = {
        users: [
          {
            user_id: 1,
            username: 'joao_silva',
            email: 'joao@exemplo.com',
            birth_date: '1990-05-15',
            profile_photo: null,
            bio: 'Desenvolvedor apaixonado por tecnologia',
            location: 'São Paulo, Brasil',
            website: 'https://joaosilva.dev',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-12-19T10:00:00Z',
            is_verified: true,
          },
          {
            user_id: 2,
            username: 'maria_tech',
            email: 'maria@exemplo.com',
            birth_date: '1992-08-20',
            profile_photo: null,
            bio: 'UX Designer e desenvolvedora frontend',
            location: 'Rio de Janeiro, Brasil',
            website: undefined,
            created_at: '2024-02-01T10:00:00Z',
            updated_at: '2024-12-19T10:00:00Z',
            is_verified: false,
          },
        ],
        posts: [
          {
            post_id: 1,
            user_id: 1,
            content: 'Acabei de lançar meu novo projeto React! 🚀',
            post_type: 'texto',
            created_at: '2024-12-19T10:30:00Z',
            updated_at: '2024-12-19T10:30:00Z',
            username: 'joao_silva',
            profile_photo: null,
            like_count: 25,
            dislike_count: 1,
            comment_count: 12,
    
          },
        ],
        groups: [
          {
            group_id: 1,
            group_name: 'Desenvolvedores React',
            description: 'Comunidade para discussões sobre React e desenvolvimento frontend',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-12-19T10:00:00Z',
            member_count: 1247,
            admin_count: 5,
          },
        ],
        tags: ['ReactJS', 'JavaScript', 'WebDev', 'Frontend'],
      };

      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erro na busca:', error);
      setLoading(false);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFollowUser = (userId: number) => {
    // TODO: IMPLEMENTAR SEGUIR USUÁRIO
    // Endpoint sugerido: POST /api/users/:userId/follow
    console.log('Seguir usuário:', userId);
  };

  const handleJoinGroup = (groupId: number) => {
    // TODO: IMPLEMENTAR ENTRAR NO GRUPO
    // Endpoint sugerido: POST /api/groups/:groupId/join
    console.log('Entrar no grupo:', groupId);
  };

  const renderUsers = () => (
    <List>
      {results.users.map((user) => (
        <React.Fragment key={user.user_id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={user.profile_photo || undefined} sx={{ width: 56, height: 56 }}>
                {!user.profile_photo && <PersonIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="span">
                    @{user.username}
                  </Typography>
                  {user.is_verified && (
                    <Chip label="Verificado" size="small" color="primary" />
                  )}
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {user.bio}
                  </Typography>
                  {user.location && (
                    <Typography variant="caption" color="text.secondary">
                      📍 {user.location}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={() => handleFollowUser(user.user_id)}
                sx={{ minWidth: 100 }}
              >
                Seguir
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );

  const renderPosts = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {results.posts.map((post) => (
        <Card key={post.post_id}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={post.profile_photo || undefined} sx={{ mr: 2 }}>
                {!post.profile_photo && <PersonIcon />}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  @{post.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.created_at).toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {post.content}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label={`${post.like_count} curtidas`} size="small" />
              <Chip label={`${post.comment_count} comentários`} size="small" />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderGroups = () => (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        sm: 'repeat(2, 1fr)', 
        md: 'repeat(3, 1fr)' 
      }, 
      gap: 3 
    }}>
      {results.groups.map((group) => (
        <Card key={group.group_id}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                <GroupIcon />
              </Avatar>
              <Typography variant="h6" component="h3">
                {group.group_name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {group.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {group.member_count} membros
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<GroupAddIcon />}
                onClick={() => handleJoinGroup(group.group_id)}
              >
                Entrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderTags = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {results.tags.map((tag) => (
        <Chip
          key={tag}
          label={`#${tag}`}
          icon={<TagIcon />}
          variant="outlined"
          clickable
          onClick={() => {
            setSearchQuery(`#${tag}`);
            setSearchParams({ q: `#${tag}` });
          }}
          sx={{ fontSize: '0.875rem', height: 40 }}
        />
      ))}
    </Box>
  );

  const getTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <Box>
            {results.users.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon /> Usuários
                </Typography>
                {renderUsers()}
              </Box>
            )}
            {results.posts.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ArticleIcon /> Posts
                </Typography>
                {renderPosts()}
              </Box>
            )}
            {results.groups.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupIcon /> Grupos
                </Typography>
                {renderGroups()}
              </Box>
            )}
            {results.tags.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TagIcon /> Tags
                </Typography>
                {renderTags()}
              </Box>
            )}
          </Box>
        );
      case 1:
        return renderUsers();
      case 2:
        return renderPosts();
      case 3:
        return renderGroups();
      case 4:
        return renderTags();
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Buscar
        </Typography>
        
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar usuários, posts, grupos ou tags..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600 }}
          />
        </Box>

        {searchQuery && (
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Todos" />
            <Tab label={`Usuários (${results.users.length})`} />
            <Tab label={`Posts (${results.posts.length})`} />
            <Tab label={`Grupos (${results.groups.length})`} />
            <Tab label={`Tags (${results.tags.length})`} />
          </Tabs>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : searchQuery ? (
        getTabContent()
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Digite algo para começar a buscar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Você pode buscar por usuários, posts, grupos ou tags
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SearchPage; 