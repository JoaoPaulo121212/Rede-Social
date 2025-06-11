import { Comment, CreateCommentForm } from '../types';

// Dados mockados para simulação
let mockComments: Comment[] = [
  {
    comment_id: 1,
    user_id: 2,
    post_id: 1,
    content: 'Parabéns pelo projeto! Python é realmente uma linguagem incrível.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    username: 'maria_santos',
    profile_photo: null,
  },
  {
    comment_id: 2,
    user_id: 3,
    post_id: 1,
    content: 'Qual biblioteca você usou? Estou sempre procurando novas ferramentas.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    username: 'pedro_costa',
    profile_photo: null,
  },
  {
    comment_id: 3,
    user_id: 1,
    post_id: 1,
    parent_comment_id: 2,
    content: 'Usei Django REST Framework. Super recomendo!',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    username: 'joao_silva',
    profile_photo: null,
  },
  {
    comment_id: 4,
    user_id: 4,
    post_id: 2,
    content: 'Adoro museus! Qual foi a obra que mais te impressionou?',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    username: 'ana_oliveira',
    profile_photo: null,
  },
  {
    comment_id: 5,
    user_id: 5,
    post_id: 3,
    content: 'Boa sorte no campeonato! Torço por vocês.',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    username: 'carlos_souza',
    profile_photo: null,
  },
  {
    comment_id: 6,
    user_id: 6,
    post_id: 3,
    content: 'Futebol é vida! Qual posição você joga?',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    username: 'lucas_lima',
    profile_photo: null,
  },
];

let nextCommentId = 7;

export const commentService = {
  // Buscar comentários de uma postagem
  async getPostComments(postId: number): Promise<Comment[]> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const postComments = mockComments.filter(comment => comment.post_id === postId);
    
    // Organizar comentários hierarquicamente
    const commentsMap = new Map<number, Comment>();
    const rootComments: Comment[] = [];
    
    // Primeiro, mapear todos os comentários
    postComments.forEach(comment => {
      commentsMap.set(comment.comment_id, { ...comment, replies: [] });
    });
    
    // Em seguida, organizar hierarquia
    postComments.forEach(comment => {
      const commentWithReplies = commentsMap.get(comment.comment_id);
      if (!commentWithReplies) return;
      
      if (comment.parent_comment_id) {
        const parentComment = commentsMap.get(comment.parent_comment_id);
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });
    
    return rootComments.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  },

  // Criar novo comentário
  async createComment(commentData: CreateCommentForm): Promise<Comment> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simula usuário logado (em um app real, isso viria do contexto de autenticação)
    const currentUser = {
      user_id: 1,
      username: 'joao_silva',
      profile_photo: null,
    };
    
    const newComment: Comment = {
      comment_id: nextCommentId++,
      user_id: currentUser.user_id,
      post_id: commentData.post_id,
      parent_comment_id: commentData.parent_comment_id,
      content: commentData.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      username: currentUser.username,
      profile_photo: currentUser.profile_photo,
    };
    
    mockComments.push(newComment);
    
    return newComment;
  },

  // Contar comentários de uma postagem
  async getCommentCount(postId: number): Promise<number> {
    const postComments = mockComments.filter(comment => comment.post_id === postId);
    return postComments.length;
  },

  // Deletar comentário (para funcionalidade futura)
  async deleteComment(commentId: number): Promise<void> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove o comentário e suas respostas
    const removeCommentAndReplies = (id: number) => {
      const replies = mockComments.filter(c => c.parent_comment_id === id);
      replies.forEach(reply => removeCommentAndReplies(reply.comment_id));
      mockComments = mockComments.filter(c => c.comment_id !== id);
    };
    
    removeCommentAndReplies(commentId);
  },
};

// TODO: Implementar integração com API real
// Endpoints esperados:
// GET /api/posts/:postId/comments - Buscar comentários de uma postagem
// POST /api/comments - Criar novo comentário
// DELETE /api/comments/:commentId - Deletar comentário
// PUT /api/comments/:commentId - Editar comentário 