import { StyleSheet } from 'react-native';

const getStoreStyles = (colors) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingTop: 40, paddingHorizontal: 10 },
    banner: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors.card,
        position: 'relative',
      },
      bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
      },
      bannerContent: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        right: 16,
      },
      bannerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
      },
      bannerSubtitle: {
        color: "white",
        fontSize: 13,
        marginBottom: 8,
      },
      bannerPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      bannerDiscount: {
        backgroundColor: '#4ee44e',
        color: '#222',
        fontWeight: 'bold',
        borderRadius: 4,
        paddingHorizontal: 6,
        marginRight: 8,
        fontSize: 13,
      },
      bannerOldPrice: {
        color: colors.text + '99',
        textDecorationLine: 'line-through',
        marginRight: 8,
        fontSize: 13,
      },
      bannerPrice: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 15,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
      },
      image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
      title: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
      platform: { color: colors.text + '99', fontSize: 12 },
      priceBlock: { alignItems: 'flex-end' },
      oldPrice: { color: colors.text + '99', textDecorationLine: 'line-through', fontSize: 12 },
      price: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
      discount: { color: '#4ee44e', fontSize: 12, fontWeight: 'bold' },    
  
});

export default getStoreStyles;
