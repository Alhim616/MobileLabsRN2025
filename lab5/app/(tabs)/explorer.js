import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import * as FileSystem from "expo-file-system"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
}) 