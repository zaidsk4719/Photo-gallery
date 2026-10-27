function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        className="h-56 w-full object-cover"
      />
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-medium text-gray-800">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="shrink-0 rounded-full p-2 text-red-500 hover:bg-red-50 focus:outline-2 focus:outline-offset-2 focus:outline-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default PhotoCard
