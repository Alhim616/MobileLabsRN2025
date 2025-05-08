import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { TABS } from '../data/communityTabs';
import { useTheme } from '@react-navigation/native';
import getCommunityStyles from '../styles/communitySteles';
import NEWS from '../data/mockNews';
import NewsCard from '../components/communityComponents/NewsCard';
import Tabs from '../components/Tabs';
import getTabsStyles from '../styles/tabsStyles';
const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const { colors } = useTheme();
  const styles = getCommunityStyles(colors);
  const tabsStyles = getTabsStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Спільнота і офіційний контент для всіх ігор і програмного забезпечення</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          placeholderTextColor="#b0b8d1"
          value={search}
          onChangeText={setSearch}
        />
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={tabsStyles} />
      </View>
      <FlatList
        data={NEWS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NewsCard item={item} styles={styles} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};


export default CommunityScreen;
