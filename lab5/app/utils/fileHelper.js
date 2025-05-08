export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return "0 Байт"

	const k = 1024
	const dm = Math.max(0, decimals)
	const sizes = ["Байт", "КБ", "МБ", "ГБ", "ТБ", "ПБ"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	const value = (bytes / Math.pow(k, i)).toFixed(dm)

	return `${parseFloat(value)} ${sizes[i]}`
}

export const getFileIcon = (fileName) => {
	const lower = fileName.toLowerCase()
	if (lower.endsWith(".txt")) return "document-text"
	if ([".jpg", ".jpeg", ".png"].some(ext => lower.endsWith(ext))) return "image"
	return "document"
}

export const getFileType = (fileName) => {
	const extension = fileName.split(".").pop().toLowerCase()
	const types = {
		txt: "Текстовий файл",
		jpg: "Зображення",
		jpeg: "Зображення",
		png: "Зображення",
		mp3: "Аудіо",
		mp4: "Відео",
		pdf: "PDF",
		doc: "Документ",
		docx: "Документ",
		zip: "Архів"
	}
	return types[extension] || "Файл"
}

export const formatDate = (timestamp) => {
	const date = new Date(timestamp)
	return date.toLocaleString("uk-UA", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}
