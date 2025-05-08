import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import styles from '../../styles/storeStyles';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 140;

export default function BannerSlider({ games, styles }) {
  const discountedGames = games.filter(game => game.discount && game.discount >= 50);

  return (
    <FlatList
      data={discountedGames}
      horizontal
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 20 }}
      contentContainerStyle={{ paddingLeft: 0, paddingRight: 16 }}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={BANNER_WIDTH + 12}
      renderItem={({ item }) => (
        <View style={[styles.banner, { width: BANNER_WIDTH, height: BANNER_HEIGHT }]}>
          <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.platform}</Text>
            <View style={styles.bannerPriceRow}>
              <Text style={styles.bannerDiscount}>-{item.discount}%</Text>
              <Text style={styles.bannerOldPrice}>${item.oldPrice}</Text>
              <Text style={styles.bannerPrice}>${item.price}</Text>
            </View>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
    />
  );
}