import { useState } from "react";
/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";

function HeroCard({ title, overview, poster }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w200/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${poster}`;

  return (
    <div className="w-fit cursor-pointer">
      <div className="w-64 rounded-2xl overflow-hidden relative ">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
        <img src={imageUrl} className="w-full" />
        <div className="absolute z-10 bottom-0 px-4 py-3">
          <motion.h2 className="text-zinc-50 text-xl font-bold mb-1">
            {title}
          </motion.h2>
          <motion.div className={isExpanded ? "h-fit" : "h-5 overflow-hidden"}>
            <p className="text-zinc-50 text-xs">{overview}</p>
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
  );
}

export default HeroCard;
