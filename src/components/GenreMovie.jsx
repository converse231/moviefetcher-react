import { useEffect, useState } from "react";
import { useLazyGetMoviesByGenreQuery } from "../services/movieSlice";
import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import Loader from "./Loader";

/* eslint react/prop-types: 0 */
function GenreMovie({ genre, genreName }) {
  const [getMoviesByGenre, { isLoading, isError }] =
    useLazyGetMoviesByGenreQuery();
  const [movieResults, setMovieResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function getMovies() {
      const { data } = await getMoviesByGenre({
        genre: genre,
      });
      setMovieResults(data.results);
    }
    getMovies();
  }, [genre, getMoviesByGenre]);

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

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  const notExpandedStyle = "flex gap-2";
  const expandedStyle = "grid grid-cols-2 gap-2 md:grid-cols-5 ";

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <SectionTitle value={genreName} />
        <button
          onClick={() => handleClick()}
          className="hover:underline underline-offset-4 text-zinc-50 font-semibold transition-all duration-1000"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <motion.div className="overflow-x-scroll md:scrollbar-rounded-xl md:scrollbar-thumb-zinc-600 md:scrollbar-thin relative">
        <motion.div className={isExpanded ? expandedStyle : notExpandedStyle}>
          {movieResults.map((PopMovie) => (
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

export default GenreMovie;
