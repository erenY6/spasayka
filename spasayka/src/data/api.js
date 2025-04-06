import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Автоматически добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Запрос на получение объявлений
export async function fetchAds() {
  const response = await api.get('/animal-ad')
  return response.data
}

// Получение объявлений по автору
export async function fetchAdsByAuthor(authorId) {
  const response = await api.get(`/animal-ad/by-author/${authorId}`)
  return response.data
}

// Регистрация пользователя
export async function registerUser({ name, surname, email, phone, password }) {
  const response = await api.post('/auth/register', {
    name,
    surname,
    email,
    phone,
    password,
  })
  return response.data
}

// Авторизация
export async function loginUser({ emailOrPhone, password }) {
  const response = await api.post('/auth/login', {
    emailOrPhone,
    password,
  })
  return response.data
}

// Получение текущего пользователя
export async function fetchCurrentUser() {
  const response = await api.get('/auth/me')
  return response.data
}

//  Новый метод обновления пользователя
export async function updateUserProfile(formData) {
  const response = await api.put('/auth/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function fetchMessagesForDialogue(dialogueId) {
  const res = await api.get(`/dialogues/${dialogueId}/messages`)
  return res.data
}

export async function sendMessageToDialogue(dialogueId, content) {
  const res = await api.post(`/dialogues/${dialogueId}/messages`, { content })
  return res.data
}

export async function startDialogueWithUser(user1Id, user2Id) {
  const res = await api.post('/dialogue/create', { user1Id, user2Id })
  return res.data
}

export async function uploadAnimalAd(formData) {
  const response = await api.post('/animal-ad/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function deleteAdById(adsId) {
  const res = await api.delete(`/animal-ad/${adsId}`)
  return res.data
}

export async function fetchAdById(adsId) {
  const res = await api.get(`/animal-ad/${adsId}`)
  return res.data
}

export async function updateAnimalAd(adId, formData) {
  const response = await api.put(`/animal-ad/${adId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export default api
