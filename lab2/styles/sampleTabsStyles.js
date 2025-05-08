import { StyleSheet } from 'react-native';

const getSampleTabsStyles = (colors) => StyleSheet.create({
    tabs: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, margin: 16, marginBottom: 8, overflow: 'hidden' },
tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 12 },
tabActive: { backgroundColor: colors.background },
tabText: { color: colors.text + '99', fontSize: 16 },
tabTextActive: { color: colors.text, fontSize: 16, fontWeight: 'bold' },

});

export default getSampleTabsStyles;