import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ChatAvatar from './ChatAvatar';

const ChatItem = ({ item, styles }) => (
  <TouchableOpacity style={styles.chatItem}>
    <ChatAvatar avatar={item.avatar} online={item.online} diamond={item.diamond} styles={styles} />
    <View style={{ flex: 1 }}>
      <Text style={styles.chatName}>{item.name}</Text>
      <Text style={styles.chatMsg}>
        {item.you && <Text style={styles.you}>You: </Text>}
        {item.message} <Text style={styles.chatDate}>• {item.date}</Text>
      </Text>
    </View>
    {item.unread ? (
      <View style={styles.unreadDot}><Text style={styles.unreadText}>1</Text></View>
    ) : (
      <View style={styles.readDot} />
    )}
  </TouchableOpacity>
);

export default ChatItem;
