import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import * as FileSystem from "expo-file-system"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../assets/styles/styles"

export default function FileViewScreen() {
  const { filePath, fileName } = useLocalSearchParams()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFileContent()
  }, [filePath])

  const loadFileContent = async () => {
    try {
      setLoading(true)
      const fileContent = await FileSystem.readAsStringAsync(filePath)
      setContent(fileContent)
    } catch (error) {
      console.error("Error reading file:", error)
      Alert.alert("Помилка", "Не вдалося прочитати файл")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    router.push({
      pathname: "/file/edit",
      params: {
        filePath,
        fileName,
      },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fileName}>{fileName}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="create-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Завантаження...</Text>
        ) : (
          <Text style={styles.content}>{content}</Text>
        )}
      </ScrollView>
    </View>
  )
}
