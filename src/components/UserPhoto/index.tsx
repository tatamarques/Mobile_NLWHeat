import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import { COLORS } from '../../../assets/files/src/theme';

import avatarImg from '../../assets/avatar.png';

import { styles } from './styles';

const size = {
  small: {
    containerSize: 32,
    avatarSize: 28,
  },
  regular: {
    containerSize: 48,
    avatarSize: 42,
  },
}

type Props = {
  imageUri: string | undefined;
  sizes?: 'small' | 'regular'
}

const avatar_default = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({imageUri, sizes='regular'} : Props){
  const { containerSize, avatarSize } = size[sizes];

  
  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        }
      ]}
    >
      <Image  
      source={{uri: imageUri || avatar_default}}
      style={[
        styles.avatar,
      {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
      }
      ]}
    />
    </LinearGradient>
  );
}