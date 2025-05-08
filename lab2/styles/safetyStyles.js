import { StyleSheet } from 'react-native';

const getSafetyStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 40, paddingHorizontal: 16 },
    tabs: { flexDirection: 'row', marginBottom: 18 },
    tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
    tabActive: { backgroundColor: colors.card },
    tabText: { color: colors.text + '99', fontSize: 16 },
    tabTextActive: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
    loggedIn: { color: colors.text + '99', fontSize: 15, textAlign: 'center', marginTop: 10 },
    code: { color: colors.text, fontSize: 40, fontWeight: 'bold', textAlign: 'center', letterSpacing: 4, marginVertical: 8 },
    progressBarBg: { height: 8, backgroundColor: colors.card, borderRadius: 4, marginHorizontal: 30, marginBottom: 8, overflow: 'hidden' },
    progressBarFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
    timerText: { color: colors.primary, fontSize: 14, textAlign: 'center', marginBottom: 10 },
    infoText: { color: colors.text, fontSize: 14, textAlign: 'center', marginTop: 10, marginBottom: 6 },
    tipText: { color: colors.primary, fontSize: 13, textAlign: 'center', marginBottom: 18, paddingHorizontal: 8 },
    menu: { backgroundColor: colors.card, borderRadius: 12, marginTop: 10 },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.background },
    menuText: { color: colors.text, fontSize: 16 },
    arrow: { color: colors.text + '99', fontSize: 18 },
  });

export default getSafetyStyles;
