import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const movieData = [
  { id: 1, title: "Movie 1", imageUrl: "url1.jpg" },
  { id: 2, title: "Movie 2", imageUrl: "url2.jpg" },
  { id: 3, title: "Movie 3", imageUrl: "url3.jpg" },
  // Add more movie data here
];

const MovieCard = ({ title, imageUrl }) => {
  return (
    <div className="w-64 h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-2/3 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {/* Add additional movie information here */}
      </div>
    </div>
  );
};

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movieData.length - 1 : prevIndex - 1
    );
  };

  const nextMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movieData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={prevMovie}
        className="absolute left-0 z-10 p-4 text-3xl text-white opacity-50 hover:opacity-100 focus:outline-none"
      >
        &lt;
      </button>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <MovieCard
            title={movieData[currentIndex].title}
            imageUrl={movieData[currentIndex].imageUrl}
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={nextMovie}
        className="absolute right-0 z-10 p-4 text-3xl text-white opacity-50 hover:opacity-100 focus:outline-none"
      >
        &gt;
      </button>
    </div>
  );
};

export default MovieCarousel;
