import { View, Text, TouchableOpacity, Image } from 'react-native';

const NewsCard = ({ item, styles }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.author}>{item.author}</Text>
        <View style={styles.newsTag}>
          <Text style={styles.newsTagText}>{item.tag}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <Text style={styles.moreText}>•••</Text>
        </TouchableOpacity>
      </View>
  
      <Image source={{ uri: item.image }} style={styles.imageBanner} />
  
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
  
      <View style={styles.cardFooter}>
        <View style={styles.footerAction}>
          <Text style={styles.likeIcon}>👍</Text>
          <Text style={styles.footerText}>{item.likes}</Text>
        </View>
        <View style={styles.footerAction}>
          <Text style={styles.commentIcon}>💬</Text>
          <Text style={styles.footerText}>{item.comments}</Text>
        </View>
      </View>
    </View>
  );
  
export default NewsCard;
