import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components para busca
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');

  // TODO: SUBSTITUIR POR DADOS REAIS DO BACKEND - Informações do usuário logado
  // Endpoint sugerido: GET /api/auth/me (dados do usuário autenticado)
  const currentUser = {
    username: 'joao_silva', // TODO: BACKEND - Username real do usuário logado
    profile_photo: null, // TODO: BACKEND - Foto real do usuário logado
  };

  // TODO: SUBSTITUIR POR DADOS REAIS DO BACKEND - Contadores de notificações
  // Endpoints sugeridos:
  // - GET /api/notifications/unread/count (notificações não lidas)
  // - GET /api/messages/unread/count (mensagens não lidas)
  const notificationCount = 3; // TODO: BACKEND - Contagem real de notificações não lidas
  const messageCount = 2; // TODO: BACKEND - Contagem real de mensagens não lidas

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Navegar para a página de notificações
    navigate('/notifications');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchValue.trim()) {
      // Navegar para página de resultados de busca
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue(''); // Limpar o campo após a busca
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.username}`);
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleMenuClose();
  };

  const handleLogout = () => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Fazer logout
    // Endpoint sugerido: POST /api/auth/logout
    // Limpar tokens de autenticação e redirecionar para login
    console.log('Fazer logout');
    handleMenuClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main',
      }}
    >
      <Toolbar>
        {/* Menu hamburger para mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo e título */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Rede Social
        </Typography>

        {/* Busca */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <form onSubmit={handleSearch}>
            <StyledInputBase
              placeholder="Buscar usuários, posts, grupos..."
              value={searchValue}
              onChange={handleSearchChange}
              inputProps={{ 
                'aria-label': 'buscar',
              }}
            />
          </form>
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Ações do usuário */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Mensagens */}
          <IconButton
            size="large"
            aria-label={`${messageCount} mensagens não lidas`}
            color="inherit"
            onClick={() => navigate('/messages')}
          >
            <Badge badgeContent={messageCount} color="secondary">
              <MessageIcon />
            </Badge>
          </IconButton>

          {/* Notificações */}
          <IconButton
            size="large"
            aria-label={`${notificationCount} notificações não lidas`}
            color="inherit"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar do usuário */}
          <IconButton
            size="large"
            edge="end"
            aria-label="menu do usuário"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {currentUser.profile_photo ? (
              <Avatar 
                src={currentUser.profile_photo} 
                alt={currentUser.username}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>

        {/* Menu do perfil */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>
            <AccountCircle sx={{ mr: 2 }} />
            Meu Perfil
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <Settings sx={{ mr: 2 }} />
            Configurações
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            Sair
          </MenuItem>
        </Menu>

        {/* Menu de notificações */}
        <Menu
          id="notifications-menu"
          anchorEl={notificationsAnchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(notificationsAnchor)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 }
          }}
        >
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                João curtiu sua postagem
              </Typography>
              <Typography variant="caption" color="text.secondary">
                há 2 minutos
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Maria comentou em sua postagem
              </Typography>
              <Typography variant="caption" color="text.secondary">
                há 5 minutos
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Novo membro no grupo "Tecnologia"
              </Typography>
              <Typography variant="caption" color="text.secondary">
                há 10 minutos
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 