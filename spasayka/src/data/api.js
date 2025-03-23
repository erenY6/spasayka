import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// 🔐 Автоматически добавляем токен из localStorage во все запросы
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

// API-запросы
export async function fetchAds() {
  const response = await api.get('/animal-ad')
  return response.data
}

export async function registerUser({ email, password, name }) {
  const response = await api.post('/auth/register', { email, password, name })
  return response.data
}

export async function loginUser({ email, password }) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function fetchCurrentUser() {
  const res = await api.get('/auth/me')
  return res.data
}
