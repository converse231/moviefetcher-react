import { useGetNowPlayingMoviesQuery } from "../services/movieSlice";
import { motion } from "framer-motion";

import HeroCardLg from "./HeroCardLg";
import "@coreui/coreui/dist/css/coreui.min.css";

import { CCarousel, CCarouselItem } from "@coreui/react";
import Loader from "./Loader";

function MovieCarousel() {
  const { data, isLoading, isError } = useGetNowPlayingMoviesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading movies</div>;
  }

  if (!data || !data.results) {
    return <div>No movie data available</div>;
  }

  const NowPlayingMovies = data.results.slice(0, 20);

  return (
    <div className="relative">
      <div className="md:block overflow-hidden hidden">
        <CCarousel controls>
          {NowPlayingMovies.map((NowPlayingMovie) => (
            <CCarouselItem key={NowPlayingMovie.id}>
              <HeroCardLg
                title={NowPlayingMovie.title}
                poster={NowPlayingMovie.backdrop_path}
                overview={NowPlayingMovie.overview}
                rating={NowPlayingMovie.vote_average}
                movieId={NowPlayingMovie.id}
              />
            </CCarouselItem>
          ))}
        </CCarousel>
      </div>

      <motion.div className="flex overflow-hidden md:hidden">
        <CCarousel controls>
          {NowPlayingMovies.map((NowPlayingMovie) => (
            <CCarouselItem key={NowPlayingMovie.id}>
              <HeroCardLg
                movieId={NowPlayingMovie.id}
                title={NowPlayingMovie.title}
                poster={NowPlayingMovie.poster_path}
                overview={NowPlayingMovie.overview}
                rating={NowPlayingMovie.vote_average}
              />
            </CCarouselItem>
          ))}
        </CCarousel>
      </motion.div>
    </div>
  );
}

export default MovieCarousel;
