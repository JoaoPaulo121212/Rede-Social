import { User, UpdateProfileForm, Message, SendMessageForm } from '../types';

// Dados mockados para simulação
let mockUsers: User[] = [
  {
    user_id: 1,
    username: 'joao_silva',
    email: 'joao@exemplo.com',
    birth_date: '1990-05-15',
    profile_photo: null,
    bio: 'Desenvolvedor apaixonado por tecnologia e inovação. Sempre aberto para novas conexões e colaborações! 🚀',
    location: 'São Paulo, Brasil',
    website: 'https://joaosilva.dev',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-19T10:00:00Z',
    is_verified: true,
  },
  {
    user_id: 2,
    username: 'maria_santos',
    email: 'maria@exemplo.com',
    birth_date: '1988-03-22',
    profile_photo: null,
    bio: 'UX Designer com paixão por criar experiências incríveis. Amo café e bons livros.',
    location: 'Rio de Janeiro, Brasil',
    website: 'https://mariasantos.design',
    created_at: '2024-02-10T14:30:00Z',
    updated_at: '2024-12-18T09:15:00Z',
    is_verified: false,
  },
];

// Mock de dados de seguidores/seguindo
let mockFollowingData = new Map<number, { followers: number[], following: number[] }>();
mockFollowingData.set(1, { followers: [2, 3, 4], following: [2, 5] });
mockFollowingData.set(2, { followers: [1], following: [1, 3] });

let mockMessages: Message[] = [];
let nextMessageId = 1;

export const userService = {
  // Buscar perfil de usuário
  async getUserProfile(userId: number): Promise<User | null> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockUsers.find(u => u.user_id === userId);
    return user || null;
  },

  // Atualizar perfil do usuário
  async updateProfile(userId: number, profileData: UpdateProfileForm): Promise<User> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = mockUsers.findIndex(u => u.user_id === userId);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...profileData,
      updated_at: new Date().toISOString(),
    };

    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  // Seguir usuário
  async followUser(currentUserId: number, targetUserId: number): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (currentUserId === targetUserId) {
      throw new Error('Você não pode seguir a si mesmo');
    }

    const currentUserData = mockFollowingData.get(currentUserId) || { followers: [], following: [] };
    const targetUserData = mockFollowingData.get(targetUserId) || { followers: [], following: [] };

    // Verificar se já está seguindo
    if (currentUserData.following.includes(targetUserId)) {
      return false; // Já está seguindo
    }

    // Adicionar aos seguindo do usuário atual
    currentUserData.following.push(targetUserId);
    mockFollowingData.set(currentUserId, currentUserData);

    // Adicionar aos seguidores do usuário alvo
    targetUserData.followers.push(currentUserId);
    mockFollowingData.set(targetUserId, targetUserData);

    return true;
  },

  // Parar de seguir usuário
  async unfollowUser(currentUserId: number, targetUserId: number): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const currentUserData = mockFollowingData.get(currentUserId) || { followers: [], following: [] };
    const targetUserData = mockFollowingData.get(targetUserId) || { followers: [], following: [] };

    // Verificar se está seguindo
    if (!currentUserData.following.includes(targetUserId)) {
      return false; // Não está seguindo
    }

    // Remover dos seguindo do usuário atual
    currentUserData.following = currentUserData.following.filter(id => id !== targetUserId);
    mockFollowingData.set(currentUserId, currentUserData);

    // Remover dos seguidores do usuário alvo
    targetUserData.followers = targetUserData.followers.filter(id => id !== currentUserId);
    mockFollowingData.set(targetUserId, targetUserData);

    return true;
  },

  // Verificar se está seguindo usuário
  async isFollowing(currentUserId: number, targetUserId: number): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const currentUserData = mockFollowingData.get(currentUserId) || { followers: [], following: [] };
    return currentUserData.following.includes(targetUserId);
  },

  // Obter estatísticas de seguidor/seguindo
  async getFollowStats(userId: number): Promise<{ followers: number; following: number }> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const userData = mockFollowingData.get(userId) || { followers: [], following: [] };
    return {
      followers: userData.followers.length,
      following: userData.following.length,
    };
  },

  // Enviar mensagem para usuário
  async sendMessage(messageData: SendMessageForm): Promise<Message> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Buscar dados dos usuários
    const sender = mockUsers.find(u => u.user_id === 1); // Simula usuário logado
    const receiver = mockUsers.find(u => u.user_id === messageData.receiver_id);
    
    if (!sender || !receiver) {
      throw new Error('Usuário não encontrado');
    }

    const newMessage: Message = {
      message_id: nextMessageId++,
      sender_id: sender.user_id,
      receiver_id: messageData.receiver_id,
      content: messageData.content,
      status: 'sent',
      sent_at: new Date().toISOString(),
      sender_username: sender.username,
      receiver_username: receiver.username,
      sender_photo: sender.profile_photo,
      receiver_photo: receiver.profile_photo,
    };

    mockMessages.push(newMessage);
    return newMessage;
  },

  // Compartilhar perfil (gerar link)
  async shareProfile(userId: number): Promise<string> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockUsers.find(u => u.user_id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Simular URL de compartilhamento
    const shareUrl = `${window.location.origin}/profile/${user.username}`;
    
    // Copiar para clipboard se disponível
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (err) {
        console.warn('Não foi possível copiar para o clipboard:', err);
      }
    }

    return shareUrl;
  },

  // Buscar usuários por termo de pesquisa
  async searchUsers(searchTerm: string): Promise<User[]> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!searchTerm.trim()) {
      return [];
    }

    const filtered = mockUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.slice(0, 10); // Limitar resultados
  },
};

// TODO: Implementar integração com API real
// Endpoints esperados:
// GET /api/users/:userId/profile - Buscar perfil do usuário
// PUT /api/users/:userId/profile - Atualizar perfil do usuário
// POST /api/users/:userId/follow - Seguir usuário
// DELETE /api/users/:userId/follow - Parar de seguir usuário
// GET /api/users/:userId/following-status - Verificar se está seguindo
// GET /api/users/:userId/follow-stats - Obter estatísticas de seguidores
// POST /api/messages - Enviar mensagem
// GET /api/users/search?q=:searchTerm - Buscar usuários 