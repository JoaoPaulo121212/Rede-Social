import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Badge,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { Message, Conversation } from '../types';

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Buscar conversas do usuário
    // Endpoint sugerido: GET /api/users/:userId/conversations
    const mockConversations: Conversation[] = [
      {
        user1_id: 1, // TODO: BACKEND - ID real do usuário atual
        user2_id: 2, // TODO: BACKEND - ID real do outro usuário
        last_message_at: '2024-12-19T15:30:00Z', // TODO: BACKEND - Timestamp real da última mensagem
        message_count: 15, // TODO: BACKEND - Contagem real de mensagens
        read_count: 12, // TODO: BACKEND - Contagem real de mensagens lidas
        unread_count: 3, // TODO: BACKEND - Contagem real de mensagens não lidas
        other_user_id: 2, // TODO: BACKEND - ID do outro usuário (calculado)
        other_username: 'maria_tech', // TODO: BACKEND - Username do outro usuário (vem do JOIN)
        other_photo: null, // TODO: BACKEND - Foto do outro usuário (vem do JOIN)
        last_message_content: 'Ótima ideia! Vamos implementar isso no próximo sprint.', // TODO: BACKEND - Conteúdo da última mensagem
      },
      {
        user1_id: 1, // TODO: BACKEND - ID real do usuário atual
        user2_id: 3, // TODO: BACKEND - ID real do outro usuário
        last_message_at: '2024-12-19T14:15:00Z', // TODO: BACKEND - Timestamp real da última mensagem
        message_count: 8, // TODO: BACKEND - Contagem real de mensagens
        read_count: 8, // TODO: BACKEND - Contagem real de mensagens lidas
        unread_count: 0, // TODO: BACKEND - Contagem real de mensagens não lidas
        other_user_id: 3, // TODO: BACKEND - ID do outro usuário (calculado)
        other_username: 'dev_carlos', // TODO: BACKEND - Username do outro usuário (vem do JOIN)
        other_photo: null, // TODO: BACKEND - Foto do outro usuário (vem do JOIN)
        last_message_content: 'Perfeito! Obrigado pela ajuda com o código.', // TODO: BACKEND - Conteúdo da última mensagem
      },
    ];

    // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Buscar mensagens da conversa selecionada
    // Endpoint sugerido: GET /api/conversations/:conversationId/messages?limit=50
    const mockMessages: Message[] = [
      {
        message_id: 1, // TODO: BACKEND - ID real da mensagem
        sender_id: 2, // TODO: BACKEND - ID real do remetente
        receiver_id: 1, // TODO: BACKEND - ID real do destinatário
        content: 'Oi! Vi seu post sobre React. Muito interessante!', // TODO: BACKEND - Conteúdo real da mensagem
        status: 'read', // TODO: BACKEND - Status real da mensagem
        sent_at: '2024-12-19T14:00:00Z', // TODO: BACKEND - Timestamp real de envio
        sender_username: 'maria_tech', // TODO: BACKEND - Username do remetente (vem do JOIN)
      },
      {
        message_id: 2, // TODO: BACKEND - ID real da mensagem
        sender_id: 1, // TODO: BACKEND - ID real do remetente
        receiver_id: 2, // TODO: BACKEND - ID real do destinatário
        content: 'Obrigado! Fico feliz que tenha gostado.', // TODO: BACKEND - Conteúdo real da mensagem
        status: 'read', // TODO: BACKEND - Status real da mensagem
        sent_at: '2024-12-19T14:10:00Z', // TODO: BACKEND - Timestamp real de envio
        sender_username: 'joao_silva', // TODO: BACKEND - Username do remetente (vem do JOIN)
      },
    ];

    // TODO: REMOVER SIMULAÇÃO DE CARREGAMENTO - Substituir por loading real das chamadas API
    setTimeout(() => {
      setConversations(mockConversations);
      setMessages(mockMessages);
      setSelectedConversation(mockConversations[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // TODO: SUBSTITUIR POR CHAMADA AO BACKEND - Enviar nova mensagem
      // Endpoint sugerido: POST /api/messages
      // Body: { receiver_id: number, content: string }
      const message: Message = {
        message_id: Date.now(), // TODO: BACKEND - ID será gerado pelo backend
        sender_id: 1, // TODO: BACKEND - ID do usuário atual (vem da autenticação)
        receiver_id: selectedConversation.other_user_id!, // TODO: BACKEND - ID do destinatário
        content: newMessage, // TODO: BACKEND - Conteúdo da mensagem
        status: 'sent', // TODO: BACKEND - Status inicial será 'sent'
        sent_at: new Date().toISOString(), // TODO: BACKEND - Timestamp será gerado pelo backend
        sender_username: 'joao_silva', // TODO: BACKEND - Username do remetente (vem da autenticação)
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, height: 600 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ height: '100%', backgroundColor: 'grey.200', borderRadius: 1 }} />
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 500px' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ height: '100%', backgroundColor: 'grey.200', borderRadius: 1 }} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          💬 Mensagens
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Conecte-se diretamente com outros membros da nossa comunidade aberta
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, height: 600 }}>
        {/* Lista de conversas */}
        <Box sx={{ flex: '1 1 350px', minWidth: 300 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                💬 Conversas
              </Typography>
              
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <List sx={{ p: 0 }}>
                {conversations.map((conversation) => (
                  <ListItemButton
                    key={conversation.other_user_id}
                    selected={selectedConversation?.other_user_id === conversation.other_user_id}
                    onClick={() => setSelectedConversation(conversation)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemAvatar>
                      <Badge
                        badgeContent={conversation.unread_count}
                        color="primary"
                        invisible={conversation.unread_count === 0}
                      >
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`@${conversation.other_username}`}
                      secondary={conversation.last_message_content}
                    />
                  </ListItemButton>
                ))}
              </List>

              <Button variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ mt: 2 }}>
                Nova Conversa
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Área de chat */}
        <Box sx={{ flex: '1 1 500px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                {/* Header da conversa */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          @{selectedConversation.other_username}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CircleIcon sx={{ fontSize: 8, color: 'success.main', mr: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            Online
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Mensagens */}
                <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                  {messages.map((message) => (
                    <Box
                      key={message.message_id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender_id === 1 ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 1.5,
                          maxWidth: '70%',
                          backgroundColor: message.sender_id === 1 ? 'primary.main' : 'grey.100',
                          color: message.sender_id === 1 ? 'white' : 'text.primary',
                        }}
                      >
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                          {formatTime(message.sent_at)}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* Campo de nova mensagem */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <IconButton color="primary" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Selecione uma conversa
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Escolha uma conversa da lista para começar a trocar mensagens
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default MessagesPage; 