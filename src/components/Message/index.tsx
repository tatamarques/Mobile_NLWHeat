import React from 'react';
import { View, Text} from 'react-native';
import { MotiView } from 'moti'

import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export type MessageProps = {
  id: string;
  test: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

type Props = {
  data: MessageProps
}

export function Message({ data } : Props){
  return (
    <MotiView 
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0}}
      transition={{ type: 'timing', duration: 700}}
      style={styles.container}>
      <Text style={styles.message}>
        {data.test}
      </Text>

      <View style={styles.footer}>
        <UserPhoto 
          imageUri={data.user.avatar_url}
          sizes="small"
        />

        <Text style={styles.username}>
          {data.user.name}
        </Text>
      </View>
    </MotiView>
  );
}