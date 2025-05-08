import React, { useState, useEffect } from "react"
import {
	FlatList,
	TouchableOpacity,
	Alert,
	Modal,
	TextInput,
} from "react-native"
import * as FileSystem from "expo-file-system"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, router } from "expo-router"
import { formatBytes, getFileIcon, getFileType } from "../utils/fileHelper"
import { ThemedText } from "../../components/ThemedText"
import { ThemedView } from "../../components/ThemedView"
import styles from "../../assets/styles/styles"

export default function FolderScreen() {
	const { path: encodedPath, name } = useLocalSearchParams()
	const path = decodeURIComponent(encodedPath)

	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)
	const [itemName, setItemName] = useState("")
	const [itemType, setItemType] = useState("")
	const [fileContent, setFileContent] = useState("")

	useEffect(() => {
		loadDirectory()
	}, [path])

	const loadDirectory = async () => {
		try {
			setLoading(true)
			const content = await FileSystem.readDirectoryAsync(path)
			const detailedItems = await Promise.all(
				content.map(async (item) => {
					const itemPath = `${path}/${item}`
					const info = await FileSystem.getInfoAsync(itemPath)
					return {
						name: item,
						path: itemPath,
						isDirectory: info.isDirectory,
						size: info.size || 0,
						modificationTime: info.modificationTime || Date.now(),
						uri: info.uri,
					}
				})
			)

			detailedItems.sort((a, b) => {
				if (a.isDirectory !== b.isDirectory) {
					return a.isDirectory ? -1 : 1
				}
				return a.name.localeCompare(b.name)
			})

			setItems(detailedItems)
		} catch (err) {
			Alert.alert("Помилка", "Не вдалося завантажити вміст папки")
		} finally {
			setLoading(false)
		}
	}

	const handlePress = (item) => {
		if (item.isDirectory) {
			router.push(`/folder/${encodeURIComponent(item.path)}?name=${item.name}`)
		} else if (item.name.endsWith(".txt")) {
			router.push({
				pathname: "/file/view",
				params: {
					filePath: item.path,
					fileName: item.name,
				},
			})
		} else {
			Alert.alert("Файл не підтримується", "Перегляд лише .txt файлів")
		}
	}

	const showOptions = (item) => {
		Alert.alert(item.name, "Оберіть дію", [
			{
				text: "Інформація",
				onPress: () =>
					router.push({
						pathname: "/file/info",
						params: {
							filePath: item.path,
							fileName: item.name,
							fileSize: item.size,
							fileModified: item.modificationTime,
							isDirectory: item.isDirectory ? "1" : "0",
						},
					}),
			},
			{
				text: item.isDirectory ? "Відкрити" : "Переглянути",
				onPress: () => handlePress(item),
			},
			!item.isDirectory && item.name.endsWith(".txt")
				? {
						text: "Редагувати",
						onPress: () =>
							router.push({
								pathname: "/file/edit",
								params: {
									filePath: item.path,
									fileName: item.name,
								},
							}),
				  }
				: null,
			{
				text: "Видалити",
				onPress: () => confirmDelete(item),
				style: "destructive",
			},
			{
				text: "Скасувати",
				style: "cancel",
			},
		].filter(Boolean))
	}

	const confirmDelete = (item) => {
		Alert.alert(
			"Підтвердження",
			`Ви впевнені, що хочете видалити "${item.name}"?`,
			[
				{ text: "Скасувати", style: "cancel" },
				{ text: "Видалити", onPress: () => deleteItem(item), style: "destructive" },
			]
		)
	}

	const deleteItem = async (item) => {
		try {
			await FileSystem.deleteAsync(item.path, { idempotent: true })
			loadDirectory()
		} catch {
			Alert.alert("Помилка", "Не вдалося видалити елемент")
		}
	}

	const openModal = (type) => {
		setItemType(type)
		setItemName("")
		setFileContent("")
		setModalVisible(true)
	}

	const createItem = async () => {
		if (!itemName.trim()) {
			Alert.alert("Помилка", "Введіть назву")
			return
		}

		try {
			const newPath = `${path}/${itemName}${itemType === "file" ? ".txt" : ""}`
			const exists = (await FileSystem.getInfoAsync(newPath)).exists

			if (exists) {
				Alert.alert("Помилка", "Елемент вже існує")
				return
			}

			if (itemType === "folder") {
				await FileSystem.makeDirectoryAsync(newPath)
			} else {
				await FileSystem.writeAsStringAsync(newPath, fileContent)
			}

			setModalVisible(false)
			loadDirectory()
		} catch {
			Alert.alert("Помилка", "Не вдалося створити елемент")
		}
	}

	const goUp = () => {
		if (path === FileSystem.documentDirectory + "AppData") {
			router.back()
			return
		}
		const parent = path.substring(0, path.lastIndexOf("/"))
		const parentName = parent.substring(parent.lastIndexOf("/") + 1)
		router.push(`/folder/${encodeURIComponent(parent)}?name=${parentName}`)
	}

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.item}
			onPress={() => handlePress(item)}
			onLongPress={() => showOptions(item)}
		>
			<ThemedView style={styles.iconContainer}>
				<Ionicons
					name={item.isDirectory ? "folder" : getFileIcon(item.name)}
					size={24}
					color={item.isDirectory ? "#FFD700" : "#2196F3"}
				/>
			</ThemedView>
			<ThemedView style={styles.itemDetails}>
				<ThemedText type="body" style={styles.itemName}>{item.name}</ThemedText>
				<ThemedText type="body" style={styles.itemInfo}>
					{item.isDirectory ? "Папка" : getFileType(item.name)} • {formatBytes(item.size)}
				</ThemedText>
			</ThemedView>
			<TouchableOpacity style={styles.moreButton} onPress={() => showOptions(item)}>
				<Ionicons name="ellipsis-vertical" size={20} color="#777" />
			</TouchableOpacity>
		</TouchableOpacity>
	)

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.pathContainer}>
				<TouchableOpacity style={styles.upButton} onPress={goUp}>
					<Ionicons name="arrow-up" size={20} color="#2196F3" />
					<ThemedText type="body" style={styles.upButtonText}>Вгору</ThemedText>
				</TouchableOpacity>
				<ThemedText type="body" style={styles.pathText} numberOfLines={1} ellipsizeMode="middle">
					{path.replace(FileSystem.documentDirectory, "")}
				</ThemedText>
			</ThemedView>

			{items.length === 0 && !loading ? (
				<ThemedView style={styles.emptyContainer}>
					<Ionicons name="folder-open" size={64} color="#ccc" />
					<ThemedText type="body" style={styles.emptyText}>Ця папка порожня</ThemedText>
				</ThemedView>
			) : (
				<FlatList
					data={items}
					renderItem={renderItem}
					keyExtractor={(item) => item.path}
					contentContainerStyle={styles.list}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<ThemedView style={styles.actionButtonsContainer}>
				<TouchableOpacity style={[styles.actionButton, styles.folderButton]} onPress={() => openModal("folder")}>
					<Ionicons name="folder-outline" size={24} color="#fff" />
					<ThemedText type="body" style={styles.actionButtonText}>Нова папка</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.actionButton, styles.fileButton]} onPress={() => openModal("file")}>
					<Ionicons name="document-outline" size={24} color="#fff" />
					<ThemedText type="body" style={styles.actionButtonText}>Новий файл</ThemedText>
				</TouchableOpacity>
			</ThemedView>

			<Modal
				animationType="slide"
				transparent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<ThemedView style={styles.modalOverlay}>
					<ThemedView style={styles.modalContent}>
						<ThemedText type="title" style={styles.modalTitle}>
							{itemType === "folder" ? "Створити папку" : "Створити файл"}
						</ThemedText>

						<ThemedText type="body" style={styles.inputLabel}>
							{itemType === "folder" ? "Назва папки:" : "Назва файлу:"}
						</ThemedText>
						<TextInput
							style={styles.textInput}
							value={itemName}
							onChangeText={setItemName}
							placeholder="Введіть назву"
						/>
						{itemType === "file" && (
							<>
								<ThemedText type="body" style={styles.inputLabel}>Вміст файлу:</ThemedText>
								<TextInput
									style={[styles.textInput, { height: 100 }]}
									value={fileContent}
									onChangeText={setFileContent}
									multiline
								/>
							</>
						)}

						<TouchableOpacity style={styles.modalButton} onPress={createItem}>
							<ThemedText type="body" style={styles.modalButtonText}>Створити</ThemedText>
						</TouchableOpacity>

						<TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
							<ThemedText type="body" style={styles.modalCancelText}>Скасувати</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				</ThemedView>
			</Modal>
		</ThemedView>
	)
}
