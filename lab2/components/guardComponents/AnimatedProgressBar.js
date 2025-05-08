import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const AnimatedProgressBar = ({ progress, styles }) => {
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarBg}>
      <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
    </View>
  );
};

export default AnimatedProgressBar;
