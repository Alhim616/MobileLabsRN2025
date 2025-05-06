import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Профіль користувача</Text>
      <Text style={styles.footer}>Янушевич Дмитро Петрович, група ІПЗ-21-5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22 },
  footer: { textAlign: 'center', fontStyle: 'italic', margin: 8, color: 'gray' },
});
