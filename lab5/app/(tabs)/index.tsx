import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">Hello world</ThemedText>
			<ThemedText style={styles.subtitle}>hello world</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	subtitle: {
		marginTop: 10,
		opacity: 0.7,
	},
});
