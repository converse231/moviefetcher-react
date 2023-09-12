/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";

function Casts({ casts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w154/";
  const imageUrl = `${posterBaseUrl}${imageWidth}`;

  const castsMembers = casts.slice(0, 8);

  const notExpandedStyle = "flex gap-2 w-full overflow-x-scroll";
  const expandedStyle = "grid grid-cols-2 gap-2";

  function handleClick() {
    setIsExpanded(!isExpanded);
    console.log(isExpanded);
  }

  return (
    <>
      <div className="flex justify-between">
        <SectionTitle value="Casts" />
        <button
          onClick={() => handleClick()}
          className="hover:underline underline-offset-4 text-zinc-50 font-semibold transition-all duration-1000"
        >
          {isExpanded ? "Collapse" : "See More"}
        </button>
      </div>
      <div className={isExpanded ? expandedStyle : notExpandedStyle}>
        {castsMembers.map((cast) => (
          <motion.div layout="position" key={cast.id}>
            <div className="text-zinc-50 relative w-40 h-auto flex flex-col justify-end rounded-lg overflow-hidden">
              <img
                src={`${imageUrl}${cast.profile_path}`}
                className=" h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
              <div className="z-50 absolute p-2">
                <p className="font-bold text-xl">{cast.name}</p>
                <p className="text-zinc-300">as {cast.character}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Casts;
