import { useState } from "react";
import { useGetPopularMoviesQuery } from "../services/movieSlice";
import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import Loader from "./Loader";

function FeaturedMovie() {
  const { data, isLoading, isError } = useGetPopularMoviesQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading movies</div>;
  }

  // Check if data exists before destructure
  if (!data || !data.results) {
    return <div>No movie data available</div>;
  }

  const PopMovies = data.results;

  function handleClick() {
    setIsExpanded(!isExpanded);
    console.log(isExpanded);
  }

  const notExpandedStyle = "flex gap-2";
  const expandedStyle = "grid grid-cols-2 gap-2 md:grid-cols-5 ";

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <SectionTitle value="Popular Movies" />
        <button
          onClick={() => handleClick()}
          className="hover:underline underline-offset-4 text-zinc-50 font-semibold transition-all duration-1000"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <motion.div className="overflow-x-scroll md:scrollbar-rounded-xl md:scrollbar-thumb-zinc-600 md:scrollbar-thin relative">
        <motion.div className={isExpanded ? expandedStyle : notExpandedStyle}>
          {PopMovies.map((PopMovie) => (
            <MovieCard
              isExpanded={isExpanded}
              key={PopMovie.id}
              movieId={PopMovie.id}
              poster={PopMovie.poster_path}
              title={PopMovie.title}
              releaseDate={PopMovie.release_date}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FeaturedMovie;
