// import { useNavigate } from "react-router-dom";
import {
  useLazyGetMovieCreditsQuery,
  useLazyGetMovieDetailsQuery,
} from "../services/movieSlice";
import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import { AiFillClockCircle, AiFillStar } from "react-icons/ai";
import GenreTag from "../components/GenreTag";
import { BiArrowBack } from "react-icons/bi";
import { useMoveBack } from "../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Casts from "../components/Casts";

function MoviePage() {
  const { movieId } = useParams();
  const movieDetailsId = JSON.parse(JSON.stringify(movieId));

  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [getMovieDetails, { isLoading, isError }] =
    useLazyGetMovieDetailsQuery();
  const [getMovieCredits, { isLoading: isFetching, isError: error }] =
    useLazyGetMovieCreditsQuery();
  const moveBack = useMoveBack();

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
    fetchMovieCredits();
    fetchMovieDetails();
  }, [getMovieDetails, movieDetailsId, getMovieCredits]);

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

  return (
    <>
      <Header />
      <div className="relative">
        <img className="lg:hidden" src={imageUrl} />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50"></div>
          <div
            className="hidden lg:block bg-cover h-screen"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <AppLayout>
              <div className="z-30 w-full flex justify-center items-center pt-36">
                <div className="lg:flex gap-5 z-30 items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="title"
                    className="rounded-xl max-w-[32rem] mx-auto shadow-md"
                  />

                  <div>
                    <div className="w-fit flex flex-col">
                      <h1 className="text-7xl  text-zinc-50 font-bold mb-2">
                        {movieDetails.title}
                      </h1>
                      <div className="flex gap-3">
                        <div className="flex  items-center gap-2 text-zinc-50 text-2xl">
                          <AiFillClockCircle />
                          <p>{movieDetails.runtime} minutes</p>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-50 text-2xl">
                          <AiFillStar />
                          <p>{movieDetails.vote_average} (imdb)</p>
                        </div>
                      </div>
                      <Button value="Watch Trailer"></Button>
                      <h3 className="text-zinc-50 text-xl font-bold ">
                        Overview
                      </h3>
                      <p className="text-2xl text-zinc-50">
                        {movieDetails.overview
                          ? movieDetails.overview
                          : "There is no overview for this movie yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AppLayout>
          </div>
        </div>
        <button
          onClick={moveBack}
          className="absolute z-50 top-16 left-4 bg-slate-50 p-2 rounded-full bg-opacity-50"
        >
          <BiArrowBack />
        </button>
      </div>
      <AppLayout>
        <div className="py-3 lg:hidden">
          <h1 className="text-center text-3xl font-bold text-zinc-50 ">
            {movieDetails.title}
          </h1>
          <div className="flex justify-center gap-5 text-zinc-400 my-2">
            <div className="flex items-center gap-1 ">
              <AiFillClockCircle />
              <p>{movieDetails.runtime} minutes</p>
            </div>
            <div className="flex items-center gap-1 ">
              <AiFillStar />
              <p>{movieDetails.vote_average} (imdb)</p>
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
          <Casts casts={casts} />
        </div>
      </AppLayout>
    </>
  );
}

export default MoviePage;
