import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import BannerSlider from '../components/storeComponents/BannerSlider';
import GameItem from '../components/storeComponents/GameItem';
import getStoreStyles from '../styles/storeStyles';
import getTabsStyles from '../styles/tabsStyles';
import { GAMES } from '../data/mockGames';
import { TABS } from '../data/storeTabs';
import { useTheme } from '@react-navigation/native';
import Tabs from '../components/Tabs';

const StoreScreen = () => {
  const { colors } = useTheme();
  const styles = getStoreStyles(colors);
  const tabsStyles = getTabsStyles(colors);
  const [games, setGames] = useState(GAMES);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const fetchMoreGames = () => {
    return GAMES.map(game => ({
      ...game,
      id: game.id + '-p' + (page + 1),
    }));
  };

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const moreGames = fetchMoreGames();
      setGames(prev => [...prev, ...moreGames]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  }, [loading, page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={({ item }) => <GameItem item={item} styles={styles} />}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        ListHeaderComponent={
          <View>
            <BannerSlider games={games} styles={styles} />
            <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} styles={tabsStyles} />
          </View>
        }
      />
    </View>
  );
};

export default StoreScreen;
