export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp > currentTime
  } catch {
    return false
  }
}

// INDEX DB CONFIGURATION AND HELPERS
// src/db/conversationDB.ts
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('appDB', 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('conversations')) {
        db.createObjectStore('conversations', { keyPath: 'sessionId' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Save all conversations
export const saveConversations = async (conversations: Array<any>) => {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('conversations', 'readwrite')
    const store = tx.objectStore('conversations')
    conversations.forEach((conv) => store.put(conv))
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// Load all conversations
export const loadConversations = async (): Promise<Array<any>> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('conversations', 'readonly')
    const store = tx.objectStore('conversations')
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Clear the DB (optional)
export const clearAllConversations = async () => {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('conversations', 'readwrite')
    tx.objectStore('conversations').clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
