import { useState } from "react";
/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeroCard({ title, overview, poster, movieId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w1280/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${poster}`;

  return (
    <Link to={`/${JSON.stringify(movieId)}`}>
      <div className="w-full">
        <div className="w-full rounded-2xl md:rounded-none overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
          <img src={imageUrl} className="w-full" />
          <div className="absolute z-10 bottom-0 px-4 py-3">
            <motion.h2
              layout="position"
              className="text-zinc-50 text-xl font-bold mb-1 md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.div
              layout="position"
              className={isExpanded ? "h-fit" : "md:h-8 h-5 overflow-hidden"}
            >
              <p className="text-zinc-50 text-xs md:text-xl">{overview}</p>
            </motion.div>
            <motion.button
              layout="position"
              className="text-zinc-50 text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See less" : "See More"}
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeroCard;
