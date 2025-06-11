import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Explore as ExploreIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  TrendingUp as TrendingIcon,
  Tag as TagIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open = true, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Mock data - será substituído por dados reais
  const currentUser = {
    username: 'joao_silva',
    profile_photo: null,
  };

  const menuItems = [
    {
      text: 'Início',
      icon: <HomeIcon />,
      path: '/',
      description: 'Timeline principal com postagens de todos',
    },
    {
      text: 'Meu Perfil',
      icon: <PersonIcon />,
      path: `/profile/${currentUser.username}`,
      description: 'Visualizar e editar seu perfil',
    },
    {
      text: 'Explorar',
      icon: <ExploreIcon />,
      path: '/explore',
      description: 'Descobrir novos usuários e conteúdo',
    },
    {
      text: 'Grupos',
      icon: <GroupIcon />,
      path: '/groups',
      description: 'Participar de comunidades temáticas',
    },
    {
      text: 'Mensagens',
      icon: <MessageIcon />,
      path: '/messages',
      description: 'Conversas privadas com outros usuários',
    },
  ];

  const discoverItems = [
    {
      text: 'Tendências',
      icon: <TrendingIcon />,
      path: '/explore?tab=trending',
      description: 'Postagens mais populares',
    },
    {
      text: 'Tags Populares',
      icon: <TagIcon />,
      path: '/explore?tab=tags',
      description: 'Tags mais utilizadas',
    },
    {
      text: 'Novos Usuários',
      icon: <PeopleIcon />,
      path: '/explore?tab=users',
      description: 'Usuários recém-cadastrados',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      {/* Espaçamento para a navbar */}
      <Box sx={{ height: 64 }} />
      
      {/* Navegação principal */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: 'primary.main',
            mb: 1,
          }}
        >
          Navegação
        </Typography>
        
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label={item.description}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive(item.path) ? 'inherit' : 'action.active',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mx: 2, my: 2 }} />

      {/* Seção de descoberta */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.secondary',
            mb: 1,
          }}
        >
          Descobrir
        </Typography>
        
        <List disablePadding>
          {discoverItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.light',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label={item.description}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive(item.path) ? 'inherit' : 'action.active',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '0.9rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mx: 2, my: 2 }} />

      {/* Informações da rede */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Rede Social Aberta
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            display: 'block',
            lineHeight: 1.4,
          }}
        >
          Uma plataforma transparente onde todos os perfis são públicos e as conexões são livres. 
          Compartilhe, conecte-se e descubra sem barreiras.
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Melhor performance no mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar; 