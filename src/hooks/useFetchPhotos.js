import { useEffect, useState } from 'react'

// This custom hook keeps photo loading separate from the gallery display.
function useFetchPhotos() {
  // useState stores the photos returned by the API.
  const [photos, setPhotos] = useState([])
  // useState tracks whether the API request is still running.
  const [loading, setLoading] = useState(true)
  // useState stores a message when the API request fails.
  const [error, setError] = useState('')

  // useEffect loads the photos once when the hook is first used.
  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30')

        if (!response.ok) {
          throw new Error('Could not load photos. Please try again.')
        }

        const photoList = await response.json()
        setPhotos(photoList)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadPhotos()
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
