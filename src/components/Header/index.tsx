import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import LogoSvg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function Header(){
  const { user, signOut } = useAuth()
  
  return (
    <View style={styles.container}>
      <LogoSvg />
      
      <View style={styles.logoutButton}>
      {
        user && 
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      }

        <UserPhoto imageUri={user?.avatar_url} sizes="regular"/>
      </View>
      
     
      
    </View>
  );
}