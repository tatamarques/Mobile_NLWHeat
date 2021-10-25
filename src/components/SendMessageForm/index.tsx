import React, {useState} from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native';
import { COLORS } from '../../../assets/files/src/theme';
import { api } from '../../services/api';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  
  async function handleMessageSubmit() {
    const messageFormatted = message.trim();
   

    if (messageFormatted.length > 0) {
      setSendingMessage(true);

      await api.post ('/messages', {message: messageFormatted});

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
      Alert.alert('Sent message!');
    } 
    else {
      Alert.alert('Write your message.');
    }
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="What's your expectative about event"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}  
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button 
        title="Send Message"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />

    </View>

    
  );
}