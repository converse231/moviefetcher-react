// import { useNavigate } from "react-router-dom";
import {
  useLazyGetMovieCreditsQuery,
  useLazyGetMovieDetailsQuery,
  useLazyGetMovieTrailerQuery,
} from "../services/movieSlice";

import AppLayout from "../components/AppLayout";
import { AiFillClockCircle } from "react-icons/ai";
import { LiaImdb } from "react-icons/lia";
import GenreTag from "../components/GenreTag";
import { BiArrowBack } from "react-icons/bi";
import { useMoveBack } from "../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";
// import Button from "../components/Button";
import Casts from "../components/Casts";
import YouTube from "react-youtube";
import SectionTitle from "../components/SectionTitle";
import TrailerModal from "../components/TrailerModal";
import Footer from "../components/Footer";

function MoviePage() {
  const moveBack = useMoveBack();
  const { movieId } = useParams();
  const movieDetailsId = JSON.parse(JSON.stringify(movieId));
  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [movieTrailer, setMovieTrailer] = useState();
  const [trailerKey, setTrailerKey] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [getMovieDetails, { isLoading, isError }] =
    useLazyGetMovieDetailsQuery();
  const [getMovieCredits, { isLoading: isFetching, isError: error }] =
    useLazyGetMovieCreditsQuery();
  const [getMovieTrailer, { isLoading: TrailerLoading, error: TrailerError }] =
    useLazyGetMovieTrailerQuery();

  useEffect(() => {
    async function fetchMovieDetails() {
      const { data: movieData } = await getMovieDetails({
        movieId: movieDetailsId,
      });
      setMovieDetails(movieData);
    }
    async function fetchMovieCredits() {
      const { data: credits } = await getMovieCredits({
        movieId: movieDetailsId,
      });
      setMovieCredits(credits.cast);
    }
    async function fetchMovieTrailer() {
      const { data: trailer } = await getMovieTrailer({
        movieId: movieDetailsId,
      });
      setMovieTrailer(trailer.results);
    }
    fetchMovieCredits();
    fetchMovieTrailer();
    fetchMovieDetails();
  }, [
    getMovieDetails,
    movieDetailsId,
    getMovieCredits,
    setMovieTrailer,
    getMovieTrailer,
  ]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError || error) {
    return <div>Error loading movies</div>;
  }

  // Check if data exists before destructure
  if (!movieDetails || !movieCredits) {
    return <div>No movie data available</div>;
  }

  const genres = movieDetails.genres;

  const casts = movieCredits > 10 ? movieCredits.slice(0, 10) : movieCredits;
  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/original/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${movieDetails.poster_path}`;
  const backdropUrl = `${posterBaseUrl}${imageWidth}${movieDetails.backdrop_path}`;

  // console.log(movieTrailer);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function renderTrailer() {
    const OfficialTrailer = movieTrailer.find(
      (vid) => vid.name === "Official Trailer"
    );
    const MainTrailer = movieTrailer.find((vid) => vid.name === "Main Trailer");

    let trailerKey;

    if (OfficialTrailer) {
      trailerKey = OfficialTrailer.key;
    } else if (MainTrailer) {
      trailerKey = MainTrailer.key;
    } else if (movieTrailer[0]) {
      trailerKey = movieTrailer[0].key;
    } else {
      // Handle the case where none of the conditions are met
      setTrailerKey(false); // Or some other default value
    }

    return (
      <YouTube
        opts={opts}
        videoId={trailerKey}
        className="h-full w-full"
      ></YouTube>
    );
  }

  return (
    <div className="relative">
      <TrailerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trailerUrl="https://www.youtube.com/embed/VIDEO_ID_HERE"
      >
        {!movieTrailer || TrailerError || !trailerKey ? (
          <p className="text-zinc-300 text-center">
            No trailer for this movie 😔
          </p>
        ) : TrailerLoading ? (
          <Loader />
        ) : (
          renderTrailer()
        )}
      </TrailerModal>
      <div className="relative">
        <img className="lg:hidden" src={imageUrl} />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
          <div
            className="hidden lg:block bg-cover h-fit 2xl:h-screen"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="max-w-xl mx-auto">
              <div className="z-30 w-full flex justify-center items-center lg:py-16 xl:py-32">
                <div className="lg:flex gap-5 z-30 items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="title"
                    className="rounded-xl w-[16rem] xl:w-[22rem] 2xl:w-[28rem] mx-auto shadow-md"
                  />

                  <div>
                    <div className="w-fit flex flex-col">
                      <h1 className="2xl:text-7xl lg:text-4xl  text-zinc-50 font-bold mb-2">
                        {movieDetails.title}
                      </h1>
                      <div className="flex gap-3">
                        <div className="flex  items-center gap-2 text-zinc-50 text-2xl">
                          <AiFillClockCircle />
                          <p>{movieDetails.runtime} minutes</p>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-50 text-2xl">
                          <LiaImdb className="text-4xl lg:text-6xl text-yellow-300" />
                          <p>
                            {movieDetails.vote_average === 0
                              ? "No Ratings"
                              : movieDetails.vote_average}{" "}
                          </p>
                        </div>
                      </div>
                      {/* <Button
                        value="Watch Trailer"
                        onClick={openModal}
                      ></Button> */}
                      <button
                        className="px-2 py-1 border text-sm text-zinc-50 border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 duration-300 my-1 rounded-md md:text-xl m w-fit"
                        onClick={openModal}
                      >
                        Watch Trailer
                      </button>
                      <h3 className="text-zinc-50 text-xl font-bold ">
                        Overview
                      </h3>
                      <p className="xl:text-2xl lg:text-sm text-zinc-50">
                        {movieDetails.overview
                          ? movieDetails.overview
                          : "There is no overview for this movie yet"}
                      </p>

                      <Casts casts={casts} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={moveBack}
          className="absolute z-50 top-8 left-4 bg-slate-50 p-2 rounded-full bg-opacity-50 lg:text-4xl"
        >
          <BiArrowBack />
        </button>
      </div>
      {/* <AppLayout>
        <div>
          <SectionTitle value="Similar Movies" />
        </div>
      </AppLayout> */}
      <AppLayout>
        <div className="py-3 lg:hidden">
          <h1 className="text-center text-3xl font-bold text-zinc-50 ">
            {movieDetails.title}
          </h1>
          <div className="flex justify-center gap-3 text-zinc-400 my-2">
            <div className="flex items-center gap-1 ">
              <AiFillClockCircle />
              <p>{movieDetails.runtime} minutes</p>
            </div>
            <div className="flex items-center gap-1 ">
              <LiaImdb className="text-4xl lg:text-6xl text-yellow-300" />
              <p>{movieDetails.vote_average}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-zinc-50 px-2">
            {genres.map((genre) => (
              <GenreTag key={genre.id} value={genre.name} />
            ))}
          </div>
          <h4 className="text-center text-sm text-zinc-400 py-3">
            {movieDetails.overview}
          </h4>

          <SectionTitle value="Watch Trailer" />
          {!movieTrailer || TrailerError || !trailerKey ? (
            <p className="text-zinc-300 text-center">
              No trailer for this movie 😔
            </p>
          ) : TrailerLoading ? (
            <Loader />
          ) : (
            renderTrailer()
          )}

          <div className="flex w-full justify-center pb-8 "></div>
          <Casts casts={casts} />
        </div>
      </AppLayout>
      <Footer />
    </div>
  );
}

export default MoviePage;
