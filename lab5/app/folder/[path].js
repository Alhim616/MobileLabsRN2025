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
	const [createModalVisible, setCreateModalVisible] = useState(false)
	const [newItemName, setNewItemName] = useState("")
	const [createItemType, setCreateItemType] = useState("")
	const [newFileContent, setNewFileContent] = useState("")

	useEffect(() => {
		loadDirectoryContent()
	}, [path])

	const loadDirectoryContent = async () => {
		try {
			setLoading(true)
			const dirContent = await FileSystem.readDirectoryAsync(path)

			const itemsWithInfo = await Promise.all(
				dirContent.map(async (item) => {
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

			itemsWithInfo.sort((a, b) => {
				if (a.isDirectory !== b.isDirectory) {
					return a.isDirectory ? -1 : 1
				}
				return a.name.localeCompare(b.name)
			})

			setItems(itemsWithInfo)
		} catch (error) {
			console.error("Error loading directory:", error)
			Alert.alert("Помилка", "Не вдалося завантажити вміст директорії")
		} finally {
			setLoading(false)
		}
	}

	const handleItemPress = (item) => {
		if (item.isDirectory) {
			const encodedItemPath = encodeURIComponent(item.path)
			router.push(`/folder/${encodedItemPath}?name=${item.name}`)
		} else {
			if (item.name.endsWith(".txt")) {
				router.push({
					pathname: "/file/view",
					params: {
						filePath: item.path,
						fileName: item.name,
					},
				})
			} else {
				Alert.alert(
					"Файл не підтримується",
					"Додаток підтримує перегляд лише текстових файлів (.txt)"
				)
			}
		}
	}

	const showItemOptions = (item) => {
		Alert.alert(
			item.name,
			"Оберіть дію",
			[
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
					onPress: () => handleItemPress(item),
				},
				{
					text:
						!item.isDirectory && item.name.endsWith(".txt")
							? "Редагувати"
							: null,
					onPress: () =>
						router.push({
							pathname: "/file/edit",
							params: {
								filePath: item.path,
								fileName: item.name,
							},
						}),
				},
				{
					text: "Видалити",
					onPress: () => confirmDelete(item),
					style: "destructive",
				},
				{
					text: "Скасувати",
					style: "cancel",
				},
			].filter((item) => item.text !== null)
		)
	}

	const confirmDelete = (item) => {
		Alert.alert(
			"Підтвердження видалення",
			`Ви впевнені, що хочете видалити ${
				item.isDirectory ? "папку" : "файл"
			} "${item.name}"?`,
			[
				{
					text: "Скасувати",
					style: "cancel",
				},
				{
					text: "Видалити",
					onPress: () => deleteItem(item),
					style: "destructive",
				},
			]
		)
	}

	const deleteItem = async (item) => {
		try {
			if (item.isDirectory) {
				await FileSystem.deleteAsync(item.path, { idempotent: true })
			} else {
				await FileSystem.deleteAsync(item.path)
			}

			loadDirectoryContent()
		} catch (error) {
			console.error("Error deleting item:", error)
			Alert.alert("Помилка", "Не вдалося видалити елемент")
		}
	}

	const openCreateModal = (type) => {
		setCreateItemType(type)
		setNewItemName("")
		setNewFileContent("")
		setCreateModalVisible(true)
	}

	const createNewItem = async () => {
		if (!newItemName.trim()) {
			Alert.alert("Помилка", "Введіть назву")
			return
		}

		try {
			const newPath = `${path}/${newItemName}${
				createItemType === "file" ? ".txt" : ""
			}`

			const itemInfo = await FileSystem.getInfoAsync(newPath)
			if (itemInfo.exists) {
				Alert.alert("Помилка", "Елемент з такою назвою вже існує")
				return
			}

			if (createItemType === "folder") {
				await FileSystem.makeDirectoryAsync(newPath)
			} else if (createItemType === "file") {
				await FileSystem.writeAsStringAsync(newPath, newFileContent)
			}

			setCreateModalVisible(false)
			loadDirectoryContent()
		} catch (error) {
			console.error("Error creating item:", error)
			Alert.alert("Помилка", "Не вдалося створити елемент")
		}
	}

	const navigateUp = () => {
		if (path === FileSystem.documentDirectory + "AppData") {
			router.back()
			return
		}

		const parentPath = path.substring(0, path.lastIndexOf("/"))
		const parentName = parentPath.substring(parentPath.lastIndexOf("/") + 1)

		const encodedParentPath = encodeURIComponent(parentPath)
		router.push(`/folder/${encodedParentPath}?name=${parentName}`)
	}

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.item}
			onPress={() => handleItemPress(item)}
			onLongPress={() => showItemOptions(item)}
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
					{item.isDirectory ? "Папка" : getFileType(item.name)} •{" "}
					{formatBytes(item.size)}
				</ThemedText>
			</ThemedView>
			<TouchableOpacity
				style={styles.moreButton}
				onPress={() => showItemOptions(item)}
			>
				<Ionicons
					name="ellipsis-vertical"
					size={20}
					color="#777"
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	)

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.pathContainer}>
				<TouchableOpacity
					style={styles.upButton}
					onPress={navigateUp}
				>
					<Ionicons
						name="arrow-up"
						size={20}
						color="#2196F3"
					/>
					<ThemedText type="body" style={styles.upButtonText}>Вгору</ThemedText>
				</TouchableOpacity>
				<ThemedText
					type="body"
					style={styles.pathText}
					numberOfLines={1}
					ellipsizeMode="middle"
				>
					{path.replace(FileSystem.documentDirectory, "")}
				</ThemedText>
			</ThemedView>

			{items.length === 0 && !loading ? (
				<ThemedView style={styles.emptyContainer}>
					<Ionicons
						name="folder-open"
						size={64}
						color="#ccc"
					/>
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
				<TouchableOpacity
					style={[styles.actionButton, styles.folderButton]}
					onPress={() => openCreateModal("folder")}
				>
					<Ionicons
						name="folder-outline"
						size={24}
						color="#fff"
					/>
					<ThemedText type="body" style={styles.actionButtonText}>Нова папка</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.actionButton, styles.fileButton]}
					onPress={() => openCreateModal("file")}
				>
					<Ionicons
						name="document-outline"
						size={24}
						color="#fff"
					/>
					<ThemedText type="body" style={styles.actionButtonText}>Новий файл</ThemedText>
				</TouchableOpacity>
			</ThemedView>

			<Modal
				animationType="slide"
				transparent={true}
				visible={createModalVisible}
				onRequestClose={() => setCreateModalVisible(false)}
			>
				<ThemedView style={styles.modalOverlay}>
					<ThemedView style={styles.modalContent}>
						<ThemedText type="title" style={styles.modalTitle}>
							{createItemType === "folder"
								? "Створити нову папку"
								: "Створити новий файл"}
						</ThemedText>

						<ThemedText type="body" style={styles.inputLabel}>
							{createItemType === "folder" ? "Назва папки:" : "Назва файлу:"}
						</ThemedText>
						<TextInput
							style={styles.textInput}
							value={newItemName}
							onChangeText={setNewItemName}
							placeholder={
								createItemType === "folder"
									? "Введіть назву папки"
									: "Введіть назву файлу (без розширення)"
							}
						/>

						{createItemType === "file" && (
							<>
								<ThemedText type="body" style={styles.inputLabel}>Початковий вміст:</ThemedText>
								<TextInput
									style={[styles.textInput, styles.contentInput]}
									value={newFileContent}
									onChangeText={setNewFileContent}
									placeholder="Введіть текст файлу"
									multiline
								/>
							</>
						)}

						<ThemedView style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalButton, styles.cancelButton]}
								onPress={() => setCreateModalVisible(false)}
							>
								<ThemedText type="body" style={styles.cancelButtonText}>Скасувати</ThemedText>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.modalButton, styles.createButton]}
								onPress={createNewItem}
							>
								<ThemedText type="body" style={styles.createButtonText}>Створити</ThemedText>
							</TouchableOpacity>
						</ThemedView>
					</ThemedView>
				</ThemedView>
			</Modal>
		</ThemedView>
	)
}