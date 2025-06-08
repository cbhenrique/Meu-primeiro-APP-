import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import UserCard from '../components/UserCard';
import { ApiService } from '../services/ApiService';
import { StorageService } from '../services/StorageService';

export default function FavoritesScreen() {
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recarrega os favoritos sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      setLoading(true);
      
      // Busca IDs dos favoritos no armazenamento local
      const favoriteIds = await StorageService.getFavorites();
      
      if (favoriteIds.length === 0) {
        setFavoriteUsers([]);
        return;
      }
      
      // Busca dados completos dos usuários favoritos da API
      const allUsers = await ApiService.getUsers();
      const favorites = allUsers.filter(user => favoriteIds.includes(user.id));
      
      setFavoriteUsers(favorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (userId) => {
    try {
      const favoriteIds = await StorageService.getFavorites();
      const updatedFavorites = favoriteIds.filter(id => id !== userId);
      
      await StorageService.saveFavorites(updatedFavorites);
      setFavoriteUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const renderUser = ({ item }) => (
    <UserCard
      user={item}
      isFavorite={true}
      onToggleFavorite={() => removeFavorite(item.id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </View>
    );
  }

  if (favoriteUsers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Nenhum usuário favoritado</Text>
        <Text style={styles.emptySubText}>
          Vá para a aba Usuários e favorite alguns usuários!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
});