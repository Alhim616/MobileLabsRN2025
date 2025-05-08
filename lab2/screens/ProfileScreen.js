import React from 'react';
  import { View, Text, Image, TouchableOpacity } from 'react-native';
  import getProfileStyles from '../styles/profileStyles';
import { useThemeContext } from '../ThemeContext';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const { colors } = useTheme();
  const styles = getProfileStyles(colors);


  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
          style={styles.avatar}
        />
        <View style={styles.statusDot} />
      </View>
      <Text style={styles.name}>Янушевич Дмитро</Text>
      <Text style={styles.group}>ІПЗ-21-5</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
          <Text style={styles.menuText}>Change Theme ({isDark ? 'Dark' : 'Light'})</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Logout</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
