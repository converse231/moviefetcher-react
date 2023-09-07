import { useState } from "react";
import { useGetPopularSeriesQuery } from "../services/seriesSlice";
import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function FeaturedSeries() {
  const { data, isLoading, isError } = useGetPopularSeriesQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading movies</div>;
  }

  // Check if data exists before destructure
  if (!data || !data.results) {
    return <div>No movie data available</div>;
  }

  const PopSeries = data.results;

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  const notExpandedStyle = "flex gap-2";
  const expandedStyle = "grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-9 ";

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <SectionTitle value="Popular Series" />
        <button
          onClick={() => handleClick()}
          className="hover:underline underline-offset-4 text-zinc-50 font-semibold transition-all duration-1000"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
      <div className="overflow-x-scroll md:scrollbar-thumb-zinc-600 md:scrollbar-thin">
        <motion.div className={isExpanded ? expandedStyle : notExpandedStyle}>
          {PopSeries.map((PopSeries) => (
            <MovieCard
              isExpanded={isExpanded}
              key={PopSeries.id}
              poster={PopSeries.poster_path}
              title={PopSeries.name}
              releaseDate={PopSeries.first_air_date}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default FeaturedSeries;
