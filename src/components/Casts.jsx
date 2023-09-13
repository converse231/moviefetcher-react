/* eslint react/prop-types: 0 */
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";

function Casts({ casts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w154/";
  const imageUrl = `${posterBaseUrl}${imageWidth}`;

  const castsMembers = casts.slice(0, 6);

  const notExpandedStyle =
    "flex gap-2 w-full overflow-x-scroll lg:scrollbar-thumb-zinc-600 lg:scrollbar-thin relative";
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
          className="hover:underline underline-offset-4 text-zinc-50 font-semibold transition-all duration-1000 lg:hidden"
        >
          {isExpanded ? "Collapse" : "See More"}
        </button>
      </div>
      <div className={isExpanded ? expandedStyle : notExpandedStyle}>
        {castsMembers.map((cast) => (
          <motion.div layout="position" key={cast.id}>
            <div className="text-zinc-50 relative w-40 lg:w-20 xl:w-36 2xl:w-40 h-auto flex flex-col justify-end rounded-lg overflow-hidden">
              <img
                src={
                  cast.profile_path
                    ? `${imageUrl}${cast.profile_path}`
                    : "https://images.bhaskarassets.com/web2images/521/2023/06/23/no-photo.jpg"
                }
                className="h-full shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
              <div className="z-50 absolute p-2">
                <p className="font-bold text-lg  lg:text-sm">{cast.name}</p>
                <p className="text-zinc-300 lg:text-sm">as {cast.character}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Casts;
