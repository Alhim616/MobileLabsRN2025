import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { formatBytes, formatDate } from "../utils/fileHelper"
import styles from "../../assets/styles/styles"

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
