import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../../../assets/files/src/theme';
import { useAuth } from '../../hooks/auth';
import { Button } from '../Button';

import { styles } from './styles';

export function SigninBox(){
  const { signIn, isSignIn } = useAuth();
  
  return (
    <View style={styles.container}>
      <Button 
        title="Sign In with GitHub"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSignIn}
      />
    </View>
  );
}