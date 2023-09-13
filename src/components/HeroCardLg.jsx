import { useState } from "react";
/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button";
import { LiaImdb } from "react-icons/lia";

function HeroCard({ title, overview, poster, movieId, rating }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/original/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${poster}`;

  return (
    <div className="w-full">
      <div className=" 2xl:max-h-[80vh] h-90% w-full md:rounded-none overflow-hidden relative flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>

        <img src={imageUrl} className="w-full h-full" />
        <div className="absolute z-10 bottom-0 px-4 py-3 max-w-screen-2xl md:grid grid-cols-2 xl:mb-20">
          <div>
            <motion.h2
              layout="position"
              className="text-zinc-50 lg:text-4xl font-bold md:text-4xl py-2"
            >
              {title}
            </motion.h2>
            <div className="flex items-center gap-2">
              <LiaImdb className="text-4xl lg:text-6xl text-yellow-300" />
              <p className="text-zinc-50 lg:text-xl">{rating} / 10</p>
            </div>
            <Link to={`/${JSON.stringify(movieId)}`}>
              <Button
                layout="position"
                value="See Details"
                variant="secondary"
              />
            </Link>
            <motion.div
              layout="position"
              className={
                isExpanded ? "h-fit" : "md:h-14 lg:h-fit h-5 overflow-hidden"
              }
            >
              <p className="text-zinc-50 text-md md:text-sm lg:text-xl py-3">
                {overview}
              </p>
            </motion.div>
            <motion.button
              layout="position"
              className="text-zinc-50 text-sm xl:hidden"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See less" : "See More"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
