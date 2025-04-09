export const loadYandexMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        resolve(window.ymaps)
      })
      return
    }

    const script = document.createElement('script')
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=9e51ad8e-2c5f-4a2a-a1be-dc7370d57c4b&lang=ru_RU'
    script.type = 'text/javascript'
    script.onload = () => {
      window.ymaps.ready(() => {
        resolve(window.ymaps)
      })
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}
