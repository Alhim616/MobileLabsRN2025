import { StyleSheet } from 'react-native';

const getTabsStyles = (colors) => StyleSheet.create({
    tabs: { flexDirection: 'row', marginBottom: 8 },
    tab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, marginRight: 8, backgroundColor: colors.card },
    tabActive: { backgroundColor: colors.primary },
    tabText: { color: colors.text + '99', fontSize: 15 },
    tabTextActive: { color: colors.background, fontWeight: 'bold', fontSize: 15 },
});

export default getTabsStyles;