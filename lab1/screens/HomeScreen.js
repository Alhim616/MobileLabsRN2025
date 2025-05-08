import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import NewsItem from '../components/NewsItem';
import Footer from "../components/Footer"

const news = Array(7).fill({
  title: 'Заголовок новини',
  date: 'Дата новини',
  text: 'Короткий текст новини',
});

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={news}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <NewsItem {...item} />}
      />
      <Footer/>
      </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 28, textAlign: 'center', marginVertical: 10 },
});