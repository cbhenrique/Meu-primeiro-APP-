import { API_CONFIG } from '../constants/config';

export class ApiService {
  static async getUsers() {
    try {
      const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.USERS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Falha ao carregar dados dos usuários');
    }
  }

  static async getUserById(userId) {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Falha ao carregar dados do usuário');
    }
  }

  // Método para simular outros endpoints
  static async getPosts() {
    try {
      const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.POSTS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw new Error('Falha ao carregar posts');
    }
  }
}