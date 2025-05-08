import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function GalleryScreen() {
    return (
        <Text style={styles.footer}>Янушевич Дмитро Петрович, група ІПЗ-21-5</Text>
    );
}

const styles = StyleSheet.create({
    footer: { textAlign: 'center', fontStyle: 'italic', margin: 8, color: 'gray' },
});