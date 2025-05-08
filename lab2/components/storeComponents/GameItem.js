import React from 'react';
import { View, Text, Image } from 'react-native';

export default function GameItem({ item, styles }) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.platform}>{item.platform}</Text>
      </View>
      <View style={styles.priceBlock}>
        {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
        <Text style={styles.price}>${item.price}</Text>
        {item.discount && <Text style={styles.discount}>-{item.discount}%</Text>}
      </View>
    </View>
  );
}