import { StyleSheet } from 'react-native';

const getChatStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, marginHorizontal: 12, marginVertical: 4, padding: 10 },
  avatarWrap: { marginRight: 12, position: 'relative' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#444' },
  avatarDiamond: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#222', borderWidth: 2, borderColor: colors.primary },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  statusDot: { position: 'absolute', right: 2, bottom: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#2ecc40', borderWidth: 2, borderColor: colors.background },
  chatName: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  chatMsg: { color: colors.text + '99', fontSize: 14, marginTop: 2 },
  you: { color: colors.primary, fontWeight: 'bold' },
  chatDate: { color: colors.text + '99', fontSize: 12 },
  unreadDot: { backgroundColor: colors.primary, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  unreadText: { color: colors.text, fontWeight: 'bold', fontSize: 13 },
  readDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.text, opacity: 0.5, marginLeft: 8 },
});

export default getChatStyles;
