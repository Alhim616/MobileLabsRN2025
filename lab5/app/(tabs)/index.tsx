import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { formatBytes, formatDate } from '../utils/fileHelper';

export default function HomeScreen() {
	const [storageInfo, setStorageInfo] = useState({
		totalSpace: 0,
		freeSpace: 0,
		usedSpace: 0,
	});

	useEffect(() => {
		fetchStorageInfo();
	}, []);

	const fetchStorageInfo = async () => {
		try {
			const freeSpace = await FileSystem.getFreeDiskStorageAsync();
			const totalSpace = 64 * 1024 * 1024 * 1024;
			const usedSpace = totalSpace - freeSpace;

			setStorageInfo({
				totalSpace,
				freeSpace,
				usedSpace,
			});
		} catch (error) {
			console.error('Error fetching storage info:', error);
		}
	};

	return (
		<ScrollView style={styles.scrollView}>
			<ThemedView style={styles.container}>
				<ThemedText type="title">Лабораторна робота 5</ThemedText>
				<ThemedText style={styles.subtitle}>React Native з Expo</ThemedText>

				<ThemedView style={styles.infoContainer}>
					<ThemedText type="subtitle">Інформація про сховище</ThemedText>
					
					<ThemedView style={styles.infoRow}>
						<ThemedText>Загальний обсяг:</ThemedText>
						<ThemedText style={styles.infoValue}>{formatBytes(storageInfo.totalSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.infoRow}>
						<ThemedText>Вільний простір:</ThemedText>
						<ThemedText style={styles.infoValue}>{formatBytes(storageInfo.freeSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.infoRow}>
						<ThemedText>Зайнятий простір:</ThemedText>
						<ThemedText style={styles.infoValue}>{formatBytes(storageInfo.usedSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.progressBarContainer}>
						<ThemedView 
							style={[
								styles.progressBar,
								{ width: `${(storageInfo.usedSpace / storageInfo.totalSpace) * 100}%` }
							]} 
						/>
					</ThemedView>

					<ThemedText style={styles.lastUpdated}>
						Останнє оновлення: {formatDate(new Date())}
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	subtitle: {
		marginTop: 10,
		opacity: 0.7,
	},
	infoContainer: {
		marginTop: 30,
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	infoValue: {
		fontWeight: '500',
	},
	progressBarContainer: {
		height: 20,
		backgroundColor: '#eee',
		borderRadius: 10,
		marginTop: 20,
		overflow: 'hidden',
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#2196F3',
	},
	lastUpdated: {
		marginTop: 15,
		fontSize: 12,
		opacity: 0.5,
		textAlign: 'center',
	},
});
