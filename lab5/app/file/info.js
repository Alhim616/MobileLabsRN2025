import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { formatBytes, formatDate } from "../utils/fileHelper"

export default function FileInfoScreen() {
  const { fileName, fileSize, fileModified, isDirectory } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Назва:</Text>
          <Text style={styles.value}>{fileName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Тип:</Text>
          <Text style={styles.value}>{isDirectory === "1" ? "Папка" : "Файл"}</Text>
        </View>

        {isDirectory !== "1" && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Розмір:</Text>
            <Text style={styles.value}>{formatBytes(parseInt(fileSize))}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Остання зміна:</Text>
          <Text style={styles.value}>{formatDate(parseInt(fileModified))}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
}) 