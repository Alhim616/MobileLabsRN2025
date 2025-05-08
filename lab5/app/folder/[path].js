import React, { useState, useEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
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
			<View style={styles.iconContainer}>
				<Ionicons
					name={item.isDirectory ? "folder" : getFileIcon(item.name)}
					size={24}
					color={item.isDirectory ? "#FFD700" : "#2196F3"}
				/>
			</View>
			<View style={styles.itemDetails}>
				<Text style={styles.itemName}>{item.name}</Text>
				<Text style={styles.itemInfo}>
					{item.isDirectory ? "Папка" : getFileType(item.name)} •{" "}
					{formatBytes(item.size)}
				</Text>
			</View>
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
		<View style={styles.container}>
			<View style={styles.pathContainer}>
				<TouchableOpacity
					style={styles.upButton}
					onPress={navigateUp}
				>
					<Ionicons
						name="arrow-up"
						size={20}
						color="#2196F3"
					/>
					<Text style={styles.upButtonText}>Вгору</Text>
				</TouchableOpacity>
				<Text
					style={styles.pathText}
					numberOfLines={1}
					ellipsizeMode="middle"
				>
					{path.replace(FileSystem.documentDirectory, "")}
				</Text>
			</View>

			{items.length === 0 && !loading ? (
				<View style={styles.emptyContainer}>
					<Ionicons
						name="folder-open"
						size={64}
						color="#ccc"
					/>
					<Text style={styles.emptyText}>Ця папка порожня</Text>
				</View>
			) : (
				<FlatList
					data={items}
					renderItem={renderItem}
					keyExtractor={(item) => item.path}
					contentContainerStyle={styles.list}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<View style={styles.actionButtonsContainer}>
				<TouchableOpacity
					style={[styles.actionButton, styles.folderButton]}
					onPress={() => openCreateModal("folder")}
				>
					<Ionicons
						name="folder-outline"
						size={24}
						color="#fff"
					/>
					<Text style={styles.actionButtonText}>Нова папка</Text>
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
					<Text style={styles.actionButtonText}>Новий файл</Text>
				</TouchableOpacity>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={createModalVisible}
				onRequestClose={() => setCreateModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							{createItemType === "folder"
								? "Створити нову папку"
								: "Створити новий файл"}
						</Text>

						<Text style={styles.inputLabel}>
							{createItemType === "folder" ? "Назва папки:" : "Назва файлу:"}
						</Text>
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
								<Text style={styles.inputLabel}>Початковий вміст:</Text>
								<TextInput
									style={[styles.textInput, styles.contentInput]}
									value={newFileContent}
									onChangeText={setNewFileContent}
									placeholder="Введіть текст файлу"
									multiline
								/>
							</>
						)}

						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalButton, styles.cancelButton]}
								onPress={() => setCreateModalVisible(false)}
							>
								<Text style={styles.cancelButtonText}>Скасувати</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.modalButton, styles.createButton]}
								onPress={createNewItem}
							>
								<Text style={styles.createButtonText}>Створити</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	pathContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	upButton: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},
	upButtonText: {
		marginLeft: 5,
		color: "#2196F3",
	},
	pathText: {
		flex: 1,
		fontSize: 14,
		color: "#555",
	},
	list: {
		padding: 10,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 8,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
	},
	iconContainer: {
		marginRight: 12,
	},
	itemDetails: {
		flex: 1,
	},
	itemName: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	itemInfo: {
		fontSize: 12,
		color: "#777",
	},
	moreButton: {
		padding: 5,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		marginTop: 10,
		fontSize: 16,
		color: "#777",
	},
	actionButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		margin: 4,
		padding: 12,
		borderRadius: 8,
	},
	folderButton: {
		backgroundColor: "#FFA000",
	},
	fileButton: {
		backgroundColor: "#2196F3",
	},
	actionButtonText: {
		color: "#fff",
		marginLeft: 8,
		fontWeight: "500",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		width: "90%",
		maxWidth: 400,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	inputLabel: {
		fontSize: 14,
		marginBottom: 5,
		color: "#555",
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
	},
	contentInput: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	modalButton: {
		flex: 1,
		padding: 12,
		borderRadius: 5,
		alignItems: "center",
		margin: 5,
	},
	cancelButton: {
		backgroundColor: "#f5f5f5",
	},
	cancelButtonText: {
		color: "#333",
	},
	createButton: {
		backgroundColor: "#4CAF50",
	},
	createButtonText: {
		color: "#fff",
		fontWeight: "500",
	},
})
