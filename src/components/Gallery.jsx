import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import favouritesReducer from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

function loadFavourites() {
  try {
    const savedFavourites = localStorage.getItem('favourites')
    const parsedFavourites = JSON.parse(savedFavourites || '[]')

    return Array.isArray(parsedFavourites) ? parsedFavourites : []
  } catch {
    return []
  }
}

function Gallery() {
  // useFetchPhotos loads the photo list and reports loading or errors.
  const { photos, loading, error } = useFetchPhotos()
  // useState stores the text currently typed into the search box.
  const [search, setSearch] = useState('')
  // useReducer manages the list of favourite photo IDs.
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavourites,
  )

  // useCallback keeps the search change handler stable between renders.
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  // useMemo filters the fetched photos when the photos or search text changes.
  const filteredPhotos = useMemo(() => {
    const searchText = search.toLowerCase()

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchText),
    )
  }, [photos, search])

  // useEffect saves favourites whenever their list changes.
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  function toggleFavourite(photoId) {
    dispatch({ type: 'TOGGLE_FAVOURITE', photoId })
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div
          role="status"
          aria-label="Loading photos"
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        />
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p role="alert" className="text-center text-red-700">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Photo Gallery</h1>

        <label htmlFor="author-search" className="sr-only">
          Search photos by author
        </label>
        <input
          id="author-search"
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by author name"
          className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {filteredPhotos.length === 0 ? (
          <p className="text-gray-600">No photos found</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Gallery
