function favouritesReducer(favourites, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (favourites.includes(action.photoId)) {
        return favourites.filter((photoId) => photoId !== action.photoId)
      }

      return [...favourites, action.photoId]

    default:
      return favourites
  }
}

export default favouritesReducer
