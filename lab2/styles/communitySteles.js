import { StyleSheet } from 'react-native';

const getCommunityStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 20, paddingHorizontal: 0 },
    subHeader: { color: colors.text + '99', fontSize: 13, marginLeft: 16, marginBottom: 10 },
    searchRow: { marginHorizontal: 12, marginBottom: 8 },
    searchInput: {
      backgroundColor: colors.card,
      borderRadius: 10,
      color: colors.text,
      paddingHorizontal: 14,
      paddingVertical: 8,
      fontSize: 16,
      marginBottom: 8,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      marginHorizontal: 12,
      marginVertical: 8,
      padding: 12,
      paddingBottom: 16,
      overflow: 'hidden',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarPlaceholder: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary,
      marginRight: 8,
    },
    author: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 15,
      marginRight: 6,
    },
    newsTag: {
      backgroundColor: colors.primary,
      borderRadius: 6,
      paddingHorizontal: 6,
      marginRight: 6,
      paddingVertical: 2,
    },
    newsTagText: {
      color: colors.background,
      fontWeight: 'bold',
      fontSize: 11,
    },
    time: {
      color: colors.text + '99',
      fontSize: 12,
    },
    moreBtn: {
      marginLeft: 'auto',
      paddingHorizontal: 8,
    },
    moreText: {
      color: colors.text + '99',
      fontSize: 18,
    },
    imageBanner: {
      width: '100%',
      height: 180,
      borderRadius: 12,
      marginBottom: 10,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    subtitle: {
      color: colors.text + '99',
      fontSize: 13,
      marginBottom: 10,
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    footerAction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 18,
    },
    likeIcon: {
      color: '#4ee44e',
      fontSize: 18,
      marginRight: 4,
    },
    commentIcon: {
      color: colors.text + '99',
      fontSize: 18,
      marginRight: 4,
    },
    footerText: {
      color: colors.text + '99',
      fontSize: 14,
    },
  });

export default getCommunityStyles;
  