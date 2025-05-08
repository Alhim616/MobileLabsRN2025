import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import * as FileSystem from "expo-file-system"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from "../../assets/styles/styles"

export default function ExplorerScreen() {
  useEffect(() => {
    setupAppDirectory()
  }, [])

  const setupAppDirectory = async () => {
    const appDir = FileSystem.documentDirectory + "AppData"
    const dirInfo = await FileSystem.getInfoAsync(appDir)

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(appDir, { intermediates: true })
      console.log("Created AppData directory")
    }
  }

  const openAppDirectory = () => {
    const encodedPath = encodeURIComponent(FileSystem.documentDirectory + "AppData")
    router.push(`/folder/${encodedPath}?name=AppData`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="folder-open" size={64} color="#2196F3" />
        <Text style={styles.title}>Файловий менеджер</Text>
        <Text style={styles.subtitle}>
          Переглядайте та керуйте файлами вашого додатку
        </Text>

        <TouchableOpacity style={styles.button} onPress={openAppDirectory}>
          <Ionicons name="folder" size={24} color="#fff" />
          <Text style={styles.buttonText}>Відкрити файловий менеджер</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
