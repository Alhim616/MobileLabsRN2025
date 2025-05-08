import { ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { formatBytes, formatDate } from '../utils/fileHelper';
import styles from "../../assets/styles/styles"

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
		<ScrollView style={styles.container}>
			<ThemedView style={styles.content}>
				<ThemedText type="title">Лабораторна робота 5</ThemedText>
				<ThemedText type="subtitle">React Native з Expo</ThemedText>

				<ThemedView style={styles.infoContainer}>
					<ThemedText type="title">Інформація про сховище</ThemedText>
					
					<ThemedView style={styles.infoRow}>
						<ThemedText type="body">Загальний обсяг:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.totalSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.infoRow}>
						<ThemedText type="body">Вільний простір:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.freeSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.infoRow}>
						<ThemedText type="body">Зайнятий простір:</ThemedText>
						<ThemedText type="body" style={{ fontWeight: '500' }}>{formatBytes(storageInfo.usedSpace)}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.progressBarContainer}>
						<ThemedView 
							style={[
								styles.progressBar,
								{ width: `${(storageInfo.usedSpace / storageInfo.totalSpace) * 100}%` }
							]} 
						/>
					</ThemedView>

					<ThemedText type="body" style={{ fontSize: 12, opacity: 0.5, textAlign: 'center', marginTop: 15 }}>
						Останнє оновлення: {formatDate(new Date())}
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	);
}
