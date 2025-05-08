import { StyleSheet } from "react-native"

const colors = {
  primary: "#2196F3",
  secondary: "#FFA000",
  success: "#4CAF50",
  background: "#f5f5f5",
  white: "#fff",
  text: {
    primary: "#333",
    secondary: "#666",
    light: "#777",
    white: "#fff"
  },
  border: "#eee",
  shadow: {
    color: "#000",
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4
  }
}

const spacing = {
  xs: 5,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 30
}

const typography = {
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary
  },
  body: {
    fontSize: 16,
    lineHeight: 24
  },
  caption: {
    fontSize: 12,
    color: colors.text.light
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: spacing.xl,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 2
  },

  // Typography
  title: {
    ...typography.title,
    marginTop: spacing.xl,
    marginBottom: spacing.sm
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: "center",
    marginBottom: spacing.xxl
  },
  body: typography.body,
  caption: typography.caption,

  // Buttons
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 2
  },
  buttonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: spacing.sm
  },

  // File Explorer
  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 2
  },
  upButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
    padding: spacing.sm
  },
  upButtonText: {
    marginLeft: spacing.xs,
    color: colors.primary,
    fontWeight: "500"
  },
  pathText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary
  },
  list: {
    padding: spacing.md
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: spacing.sm,
    padding: spacing.md,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 2
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: spacing.xs,
    color: colors.text.primary
  },
  itemInfo: {
    fontSize: 14,
    color: colors.text.secondary
  },
  moreButton: {
    padding: spacing.sm
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    fontSize: 16
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: 8,
    marginHorizontal: spacing.xs
  },
  folderButton: {
    backgroundColor: colors.secondary
  },
  fileButton: {
    backgroundColor: colors.primary
  },
  actionButtonText: {
    color: colors.text.white,
    fontWeight: "500",
    marginLeft: spacing.sm,
    fontSize: 16
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: spacing.xl,
    width: "90%",
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: spacing.xl,
    textAlign: "center",
    color: colors.text.primary
  },
  inputLabel: {
    marginBottom: spacing.sm,
    fontSize: 16,
    color: colors.text.primary
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.xl,
    fontSize: 16
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: spacing.sm
  },
  modalButtonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "500"
  },
  modalCancelButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  modalCancelText: {
    color: colors.text.secondary,
    fontSize: 16
  },

  // File View/Edit
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  fileName: {
    fontSize: 18,
    fontWeight: "500"
  },
  contentContainer: {
    flex: 1,
    padding: spacing.lg
  },
  loadingText: {
    textAlign: "center",
    color: colors.text.light,
    marginTop: spacing.xl
  },

  // Storage Info
  infoContainer: {
    marginTop: spacing.xxl,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: spacing.xl,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 2
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: colors.border,
    borderRadius: 10,
    marginTop: spacing.xl,
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary
  },
  lastUpdated: {
    marginTop: spacing.lg,
    fontSize: 12,
    opacity: 0.5,
    textAlign: "center"
  }
})

export default styles