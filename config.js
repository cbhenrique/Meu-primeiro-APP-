export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  ENDPOINTS: {
    USERS: '/users',
    POSTS: '/posts',
    COMMENTS: '/comments',
    ALBUMS: '/albums',
    PHOTOS: '/photos',
    TODOS: '/todos',
  },
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
};

export const APP_CONFIG = {
  APP_NAME: 'UserFav App',
  VERSION: '1.0.0',
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
  MAX_FAVORITES: 50,
};