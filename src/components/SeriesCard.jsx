/* eslint react/prop-types: 0 */

function MovieCard({ poster, name, releaseDate, isExpanded }) {
  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w500/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${poster}`;

  return (
    <div className="pb-5">
      <div className={!isExpanded ? "w-32" : ""}>
        <img src={imageUrl} alt={name} className="rounded-2xl" />
        <div>
          <h2 className="text-xl text-zinc-50 truncate font-medium">{name}</h2>
          <p className="text-zinc-500 text-sm">{releaseDate}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
