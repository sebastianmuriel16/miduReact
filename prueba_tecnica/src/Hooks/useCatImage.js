import { useState, useEffect } from 'react'
function useCatImage({ fact }) {
  const [image, setImage] = useState()
  const BASE_URL = 'https://api.giphy.com/v1/gifs'
  const API_KEY = 'KyGmZaQhNOHulI1SU7dpExB0FF0AIT6j'

  // para recuperar la cita al cargar la pagina
  // para recuperar la imagen cada vez que cambia la cita
  useEffect(() => {
    if (!fact) return
    const firstword = `cat ${fact.split(' ').slice(0, 3).join(' ')}`

    fetch(`${BASE_URL}/search?api_key=${API_KEY}&q=${firstword}limit=1`)
      .then((res) => res.json())
      .then((data) => {
        const { data: gifsData } = data
        const { url } = gifsData[0].images.original
        setImage(url)
      })
  }, [fact])

  return { image }
}

export { useCatImage }
