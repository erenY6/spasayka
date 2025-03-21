const API_URL = 'http://localhost:3000'

export async function fetchAds() {
  const res = await fetch(`${API_URL}/`, {
    method: 'GET',
  })
  return res.json()
}
