import { StyleSheet } from 'react-native';
const getProfileStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', paddingTop: 40 },
    avatarContainer: {
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.card,
    },
    statusDot: {
      position: 'absolute',
      right: 10,
      bottom: 10,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#2ecc40',
      borderWidth: 3,
      borderColor: colors.background,
    },
    name: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 8,
    },
    group: {
      color: colors.text + '99',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
    },
    menu: {
      width: '90%',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingVertical: 8,
      marginTop: 20,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
    },
    menuText: {
      color: colors.text,
      fontSize: 16,
    },
    arrow: {
      color: colors.text + '99',
      fontSize: 18,
    },
  });
  
export default getProfileStyles;
