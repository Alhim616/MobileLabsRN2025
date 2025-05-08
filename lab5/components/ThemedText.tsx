import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'body' | 'link';
}

export function ThemedText({ type = 'body', style, ...props }: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.base,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
}); 