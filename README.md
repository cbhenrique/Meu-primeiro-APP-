# React Native App com API e Armazenamento Local

Aplicativo React Native desenvolvido com Expo demonstra:
- Consumo de dados de uma API REST
- Armazenamento local usando AsyncStorage
- Navegação entre telas
- Interface responsiva e moderna

## Funcionalidades

- **Lista de Usuários**: Carrega usuários da API JSONPlaceholder
- **Sistema de Favoritos**: Permite favoritar/desfavoritar usuários
- **Armazenamento Local**: Persiste favoritos no dispositivo
- **Navegação por Abas**: Interface intuitiva com duas abas principais
- **Pull to Refresh**: Atualização manual dos dados
- **Cache Inteligente**: Sistema de cache para melhor performance

## Telas

1. **Usuários**: Lista todos os usuários da API com opção de favoritar
2. **Favoritos**: Mostra apenas os usuários favoritados localmente

## Tecnologias Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **AsyncStorage**: Armazenamento local
- **React Navigation**: Navegação entre telas
- **JSONPlaceholder API**: API pública para dados de teste

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── UserCard.js     # Card de usuário
├── screens/            # Telas da aplicação
│   ├── UsersScreen.js  # Tela principal de usuários
│   └── FavoritesScreen.js # Tela de favoritos
├── services/           # Serviços de API e storage
│   ├── ApiService.js   # Serviço para chamadas da API
│   └── StorageService.js # Serviço para AsyncStorage
└── constants/          # Constantes da aplicação
    ├── config.js       # Configuração da API
    └── storage.js      # Chaves do AsyncStorage
```

## Configuração da API

O app usa a API JSONPlaceholder por padrão, mas você pode alterar em `src/constants/config.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://sua-api.com',
  ENDPOINTS: {
    USERS: '/usuarios',
    // outros endpoints...
  },
};
```

## Funcionalidades do Armazenamento Local

### Dados Persistidos:
- **Favoritos**: IDs dos usuários favoritados
- **Cache**: Cache temporário dos dados da API
- **Configurações**: Preferências do usuário

### Métodos Disponíveis:
- `getFavorites()`: Busca favoritos salvos
- `saveFavorites(favorites)`: Salva lista de favoritos
- `cacheUsers(users)`: Faz cache dos usuários
- `getCachedUsers()`: Recupera cache de usuários
- `clearAllData()`: Limpa todos os dados salvos

## Personalização

### Cores do Tema:
- Azul principal: `#007AFF`
- Vermelho para favoritos: `#FF3B30`
- Fundo: `#f5f5f5`

### Ícones:
O app usa `@expo/vector-icons` com ícones do Ionicons.

## Recursos do App

- **Navegação intuitiva** com abas na parte inferior
- **Pull to refresh** para atualizar dados
- **Indicadores de loading** durante carregamento
- **Tratamento de erros** com mensagens amigáveis
- **Interface responsiva** que se adapta a diferentes tamanhos de tela
- **Avatares gerados** automaticamente para cada usuário

## Estados da Aplicação

- **Loading**: Mostra indicador enquanto carrega dados
- **Success**: Exibe dados normalmente
- **Error**: Mostra mensagem de erro amigável
- **Empty**: Indica quando não há dados para mostrar


