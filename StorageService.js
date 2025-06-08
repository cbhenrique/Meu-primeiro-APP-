import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

export class StorageService {
  // Gerenciamento de Favoritos
  static async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }
  }

  static async saveFavorites(favorites) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      return false;
    }
  }

  static async clearFavorites() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITES);
      return true;
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error);
      return false;
    }
  }

  // Gerenciamento de Cache de Usuários
  static async cacheUsers(users) {
    try {
      const cacheData = {
        data: users,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.USERS_CACHE, JSON.stringify(cacheData));
      return true;
    } catch (error) {
      console.error('Erro ao fazer cache dos usuários:', error);
      return false;
    }
  }

  static async getCachedUsers(maxAge = 5 * 60 * 1000) { // 5 minutos por padrão
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEYS.USERS_CACHE);
      
      if (!cached) {
        return null;
      }

      const cacheData = JSON.parse(cached);
      const now = Date.now();
      
      // Verifica se o cache ainda é válido
      if (now - cacheData.timestamp > maxAge) {
        await AsyncStorage.removeItem(STORAGE_KEYS.USERS_CACHE);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Erro ao buscar cache dos usuários:', error);
      return null;
    }
  }

  // Gerenciamento de Configurações do App
  static async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  }

  static async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      return {};
    }
  }

  // Utilitários gerais
  static async clearAllData() {
    try {
      await AsyncStorage.clear();
      console.log('Todos os dados foram limpos');
      return true;
    } catch (error) {
      console.error('Erro ao limpar todos os dados:', error);
      return false;
    }
  }

  static async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Erro ao buscar todas as chaves:', error);
      return [];
    }
  }

  static async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Erro ao calcular tamanho do storage:', error);
      return 0;
    }
  }
}