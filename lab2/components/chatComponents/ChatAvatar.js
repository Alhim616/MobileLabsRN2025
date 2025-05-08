import React from 'react';
import { View, Image, Text } from 'react-native';

const ChatAvatar = ({ avatar, online, diamond, styles }) => (
  <View style={styles.avatarWrap}>
    {diamond ? (
      <Image source={{ uri: avatar }} style={styles.avatarDiamond} />
    ) : avatar ? (
      <Image source={{ uri: avatar }} style={styles.avatar} />
    ) : (
      <View style={styles.avatarPlaceholder}>
        <Text style={{ color: styles.chatMsg.color, fontSize: 28 }}>?</Text>
      </View>
    )}
    {online && <View style={styles.statusDot} />}
  </View>
);

export default ChatAvatar;
