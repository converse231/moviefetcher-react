/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MovieCard({ poster, title, releaseDate, isExpanded = true, movieId }) {
  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w500/";
  const imageUrl = `${posterBaseUrl}${imageWidth}${poster}`;

  return (
    <Link to={`/${JSON.stringify(movieId)}`}>
      <motion.div
        layout="position"
        className=" cursor-pointer hover:scale-[.98] duration-300"
      >
        <div className={!isExpanded ? "w-44 md:w-64" : ""}>
          <img
            src={
              imageUrl.endsWith("null")
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnor4mGGSTOdZvmPKEuGUj45YH6M1w4pVMnFLfCqJeYL6kcQKHwOgcmvczYuDsQ7sBo0&usqp=CAU"
                : imageUrl
            }
            alt={title}
            className="rounded-2xl "
          />
          <div className="py-1">
            <h2 className="text-lg text-zinc-50 truncate font-medium md:text-3xl py-2">
              {title}
            </h2>
            <p className="text-zinc-500 text-sm md:text-xl">{releaseDate}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;
