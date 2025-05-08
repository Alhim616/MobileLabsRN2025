import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styles from '../../assets/styles/styles';
const ClickableObject = ({children, imageUrl, text = "Interact with me!"}) => {
  return (
    <Animated.View style={styles.clickableObject}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        {children ? children : <Text style={styles.clickText}>{text}</Text>}
      </View>
    </Animated.View>
  );
};

export default ClickableObject;
