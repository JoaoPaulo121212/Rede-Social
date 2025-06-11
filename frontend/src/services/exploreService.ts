import { User, Post, Tag, Group } from '../types';

interface ExploreData {
  trendingPosts: Post[];
  suggestedUsers: User[];
  popularTags: Tag[];
  activeGroups: Group[];
}

interface SearchResults {
  users: User[];
  posts: Post[];
  tags: Tag[];
  groups: Group[];
  total: number;
}

class ExploreService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  async getTrendingPosts(limit = 10): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/trending?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar posts em alta');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar posts em alta:', error);
      return this.getMockTrendingPosts();
    }
  }

  async getSuggestedUsers(limit = 6): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users/suggested?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários sugeridos');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuários sugeridos:', error);
      return this.getMockSuggestedUsers();
    }
  }

  async getPopularTags(limit = 6): Promise<Tag[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tags/popular?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar tags populares');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar tags populares:', error);
      return this.getMockPopularTags();
    }
  }

  async getActiveGroups(limit = 6): Promise<Group[]> {
    try {
      const response = await fetch(`${this.baseUrl}/groups/active?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar grupos ativos');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar grupos ativos:', error);
      return this.getMockActiveGroups();
    }
  }

  async followUser(userId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao seguir usuário');
      }
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async unfollowUser(userId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deixar de seguir usuário');
      }
    } catch (error) {
      console.error('Erro ao deixar de seguir usuário:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async followTag(tagId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tags/${tagId}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao seguir tag');
      }
    } catch (error) {
      console.error('Erro ao seguir tag:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async unfollowTag(tagId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tags/${tagId}/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deixar de seguir tag');
      }
    } catch (error) {
      console.error('Erro ao deixar de seguir tag:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async joinGroup(groupId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/groups/${groupId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao participar do grupo');
      }
    } catch (error) {
      console.error('Erro ao participar do grupo:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async leaveGroup(groupId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/groups/${groupId}/leave`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao sair do grupo');
      }
    } catch (error) {
      console.error('Erro ao sair do grupo:', error);
      // Em desenvolvimento, simula sucesso
    }
  }

  async search(query: string, type?: 'users' | 'posts' | 'tags' | 'groups'): Promise<SearchResults> {
    try {
      const params = new URLSearchParams({ q: query });
      if (type) params.append('type', type);

      const response = await fetch(`${this.baseUrl}/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar busca');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao realizar busca:', error);
      return this.getMockSearchResults(query);
    }
  }

  // Mock data methods
  private getMockTrendingPosts(): Post[] {
    return [
      {
        post_id: 10,
        user_id: 5,
        content: '🚀 Acabei de descobrir uma técnica incrível para otimizar React apps! Quem mais está interessado em performance? #ReactJS #Performance',
        post_type: 'texto',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        username: 'dev_ana',
        profile_photo: null,
        like_count: 45,
        dislike_count: 2,
        comment_count: 18,
      },
      {
        post_id: 11,
        user_id: 6,
        content: 'Reflexão: As redes sociais abertas podem ser o futuro da comunicação digital. Transparência gera confiança! 🌟',
        post_type: 'texto',
        created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        username: 'filosofo_tech',
        profile_photo: null,
        like_count: 38,
        dislike_count: 5,
        comment_count: 22,
      },
    ];
  }

  private getMockSuggestedUsers(): User[] {
    return [
      {
        user_id: 5,
        username: 'dev_ana',
        email: 'ana@exemplo.com',
        birth_date: '1995-03-15',
        profile_photo: null,
        bio: 'Frontend Developer | React Enthusiast | UI/UX Lover',
        location: 'Rio de Janeiro, Brasil',
        is_verified: true,
        created_at: '2024-02-10T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
      },
      {
        user_id: 6,
        username: 'filosofo_tech',
        email: 'filosofo@exemplo.com',
        birth_date: '1988-07-22',
        profile_photo: null,
        bio: 'Pensador digital | Tecnologia e sociedade | Futuro aberto',
        location: 'Belo Horizonte, Brasil',
        is_verified: false,
        created_at: '2024-01-20T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
      },
      {
        user_id: 7,
        username: 'designer_criativo',
        email: 'designer@exemplo.com',
        birth_date: '1992-11-08',
        profile_photo: null,
        bio: 'UI/UX Designer | Criatividade em pixels | Design thinking',
        location: 'São Paulo, Brasil',
        is_verified: true,
        created_at: '2024-03-05T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
      },
    ];
  }

  private getMockPopularTags(): Tag[] {
    return [
      { tag_id: 1, tag_name: 'ReactJS', created_at: '2024-01-01T00:00:00Z', user_count: 245 },
      { tag_id: 2, tag_name: 'JavaScript', created_at: '2024-01-01T00:00:00Z', user_count: 189 },
      { tag_id: 3, tag_name: 'Design', created_at: '2024-01-01T00:00:00Z', user_count: 156 },
      { tag_id: 4, tag_name: 'TechTalk', created_at: '2024-01-01T00:00:00Z', user_count: 134 },
      { tag_id: 5, tag_name: 'OpenSource', created_at: '2024-01-01T00:00:00Z', user_count: 98 },
      { tag_id: 6, tag_name: 'Innovation', created_at: '2024-01-01T00:00:00Z', user_count: 87 },
    ];
  }

  private getMockActiveGroups(): Group[] {
    return [
      {
        group_id: 1,
        group_name: 'Desenvolvedores React',
        description: 'Comunidade para discussões sobre React, hooks, performance e boas práticas.',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
        member_count: 1247,
        admin_count: 5,
      },
      {
        group_id: 2,
        group_name: 'Design & UX',
        description: 'Espaço para designers compartilharem ideias, tendências e feedback.',
        created_at: '2024-02-01T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
        member_count: 892,
        admin_count: 3,
      },
      {
        group_id: 3,
        group_name: 'Tecnologia & Sociedade',
        description: 'Discussões sobre o impacto da tecnologia na sociedade moderna.',
        created_at: '2024-01-20T10:00:00Z',
        updated_at: '2024-12-19T10:00:00Z',
        member_count: 654,
        admin_count: 4,
      },
    ];
  }

  private getMockSearchResults(query: string): SearchResults {
    return {
      users: this.getMockSuggestedUsers().filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.bio?.toLowerCase().includes(query.toLowerCase())
      ),
      posts: this.getMockTrendingPosts().filter(post => 
        post.content.toLowerCase().includes(query.toLowerCase())
      ),
      tags: this.getMockPopularTags().filter(tag => 
        tag.tag_name.toLowerCase().includes(query.toLowerCase())
      ),
      groups: this.getMockActiveGroups().filter(group => 
        group.group_name.toLowerCase().includes(query.toLowerCase()) ||
        group.description.toLowerCase().includes(query.toLowerCase())
      ),
      total: 0,
    };
  }
}

const exploreServiceInstance = new ExploreService();

export default exploreServiceInstance;
export type { ExploreData, SearchResults }; 