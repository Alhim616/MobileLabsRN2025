import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Tabs = ({ tabs, activeTab, onTabChange, styles }) => (
  <View style={styles.tabs}>
    {tabs.map(tab => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tab, activeTab === tab.key && styles.tabActive]}
        onPress={() => onTabChange(tab.key)}
        activeOpacity={0.7}
      >
        <Text style={activeTab === tab.key ? styles.tabTextActive : styles.tabText}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default Tabs;
