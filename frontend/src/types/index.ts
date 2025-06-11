// Tipos baseados no modelo de dados da rede social

export interface User {
  user_id: number;
  username: string;
  email: string;
  birth_date: string;
  profile_photo?: string | null;
  bio?: string;
  location?: string;
  website?: string;
  is_verified?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  post_id: number;
  user_id: number;
  content: string;
  post_type: 'texto' | 'imagem';
  created_at: string;
  updated_at: string;
  // Dados do usuário (join)
  username?: string;
  profile_photo?: string | null;
  // Estatísticas (cache)
  like_count?: number;
  dislike_count?: number;
  comment_count?: number;
  net_score?: number;
}

export interface Comment {
  comment_id: number;
  user_id: number;
  post_id?: number;
  parent_comment_id?: number;
  content: string;
  created_at: string;
  updated_at: string;
  // Dados do usuário (join)
  username?: string;
  profile_photo?: string | null;
  // Respostas aninhadas
  replies?: Comment[];
}

export interface Rating {
  rating_id: number;
  user_id: number;
  post_id?: number;
  comment_id?: number;
  rating_type: 'like' | 'dislike';
  created_at: string;
}

export interface Group {
  group_id: number;
  group_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  // Estatísticas
  member_count?: number;
  admin_count?: number;
  user_role?: 'admin' | 'member';
}

export interface GroupMember {
  membership_id: number;
  user_id: number;
  group_id: number;
  role: 'admin' | 'member';
  joined_at: string;
  // Dados do usuário (join)
  username?: string;
  profile_photo?: string | null;
}

export interface Message {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  status: 'sent' | 'received' | 'read';
  sent_at: string;
  received_at?: string;
  read_at?: string;
  // Dados do usuário (join)
  sender_username?: string;
  receiver_username?: string;
  sender_photo?: string | null;
  receiver_photo?: string | null;
}

export interface Tag {
  tag_id: number;
  tag_name: string;
  created_at: string;
  // Estatísticas
  user_count?: number;
}

export interface UserTag {
  user_tag_id: number;
  user_id: number;
  tag_id: number;
  created_at: string;
  // Dados da tag (join)
  tag_name?: string;
}

export interface Connection {
  connection_id: number;
  user_id: number;
  connected_user_id: number;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  updated_at: string;
  // Dados do usuário conectado (join)
  connected_username?: string;
  connected_photo?: string | null;
}

// Tipos para views e estatísticas
export interface PostStats {
  post_id: number;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  net_score: number;
  last_updated: string;
}

export interface UserProfile {
  user_id: number;
  username: string;
  email: string;
  birth_date: string;
  profile_photo?: string | null;
  created_at: string;
  tags?: string;
  tag_count: number;
  post_count: number;
  comment_count: number;
  rating_count: number;
}

export interface Conversation {
  user1_id: number;
  user2_id: number;
  last_message_at: string;
  message_count: number;
  read_count: number;
  unread_count: number;
  // Dados dos usuários (join)
  other_user_id?: number;
  other_username?: string;
  other_photo?: string | null;
  last_message_content?: string;
}

export interface DashboardMetrics {
  total_users: number;
  total_posts: number;
  total_comments: number;
  total_groups: number;
  total_messages: number;
  total_connections: number;
  posts_today: number;
  new_users_week: number;
  avg_comments_per_post: number;
  avg_likes_per_post: number;
}

// Tipos para formulários e UI
export interface CreatePostForm {
  content: string;
  post_type: 'texto' | 'imagem';
  image_file?: File;
}

export interface CreateCommentForm {
  content: string;
  post_id?: number;
  parent_comment_id?: number;
}

export interface CreateGroupForm {
  group_name: string;
  description: string;
}

export interface SendMessageForm {
  receiver_id: number;
  content: string;
}

export interface UpdateProfileForm {
  username?: string;
  email?: string;
  birth_date?: string;
  profile_photo?: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

// Tipos para contextos e hooks
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterForm) => Promise<boolean>;
  updateProfile: (data: UpdateProfileForm) => Promise<boolean>;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  birth_date: string;
}

// Tipos para notificações e feedback
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Tipos para filtros e busca
export interface PostFilters {
  user_id?: number;
  post_type?: 'texto' | 'imagem';
  date_from?: string;
  date_to?: string;
  search?: string;
  sort_by?: 'created_at' | 'like_count' | 'comment_count';
  sort_order?: 'asc' | 'desc';
}

export interface UserFilters {
  search?: string;
  has_tags?: string[];
  joined_after?: string;
  sort_by?: 'username' | 'created_at' | 'post_count';
  sort_order?: 'asc' | 'desc';
}

export interface GroupFilters {
  search?: string;
  member_count_min?: number;
  created_after?: string;
  sort_by?: 'group_name' | 'created_at' | 'member_count';
  sort_order?: 'asc' | 'desc';
} 