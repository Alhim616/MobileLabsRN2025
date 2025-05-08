import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Tabs from '../components/Tabs';
import ChatItem from '../components/chatComponents/ChatItem';
import { CHATS } from '../data/mockChats';
import { TABS } from '../data/chatTabs';
import { useTheme } from '@react-navigation/native';
import getChatStyles from '../styles/chatStyles';
import sampleTabsStyles from '../styles/sampleTabsStyles';

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const { colors } = useTheme();
  const styles = getChatStyles(colors);
  const mainStyles = sampleTabsStyles(colors);

  return (
    <View style={styles.container}>
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={mainStyles} />
      <FlatList
        data={CHATS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatItem item={item} styles={styles} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ChatScreen;
