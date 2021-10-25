import React, {createContext, useContext, useState, useEffect } from 'react';
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const user_storage = '@mobile_heat:user';
const token_storage = '@mobile_heat:token';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;

};

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider ({ children }: AuthProviderProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  async function signIn(){
    try{
      setIsSignIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=e58ef5588dc2a7df018b`;
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', {code: authSessionResponse.params.code});

        const { user, token } = authResponse.data as AuthResponse

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(user_storage, JSON.stringify(user));
        await AsyncStorage.setItem(token_storage, token);

        setUser(user)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignIn(false);
    }
    
  };
  async function signOut(){
    setUser(null);
    await AsyncStorage.removeItem(user_storage);
    await AsyncStorage.removeItem(token_storage);
  };

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(user_storage);
      const tokenStorage = await AsyncStorage.getItem(token_storage);
      
      if (userStorage && tokenStorage){
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage))
      }
      setIsSignIn(false);
    
    }
    loadUserStorageData();
  }, [])
  
  return (
    <AuthContext.Provider
      value ={{
        signIn,
        signOut,
        user,
        isSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }

