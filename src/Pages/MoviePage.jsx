// import { useNavigate } from "react-router-dom";
import { useLazyGetMovieDetailsQuery } from "../services/movieSlice";
import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import { AiFillClockCircle, AiFillStar } from "react-icons/ai";
import GenreTag from "../components/GenreTag";
import { BiArrowBack } from "react-icons/bi";
import { useMoveBack } from "../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function MoviePage() {
  const { movieId } = useParams();
  const movieDetailsId = JSON.parse(JSON.stringify(movieId));

  const [movieDetails, setMovieDetails] = useState();
  const [getMovieDetails, { isLoading, isError }] =
    useLazyGetMovieDetailsQuery();
  const moveBack = useMoveBack();

  useEffect(() => {
    async function fetchMovieDetails() {
      const { data: movieData } = await getMovieDetails({
        movieId: movieDetailsId,
      });
      setMovieDetails(movieData);
    }

    fetchMovieDetails();
  }, [getMovieDetails, movieDetailsId]);

  console.log(movieDetails);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading movies</div>;
  }

  // Check if data exists before destructure
  if (!movieDetails) {
    return <div>No movie data available</div>;
  }

  const genres = movieDetails.genres;

  const posterBaseUrl = "https://image.tmdb.org/t/p";
  const imageWidth = "/w1280/";

  const imageUrl = `${posterBaseUrl}${imageWidth}${movieDetails.poster_path}`;

  return (
    <>
      <AppLayout>
        <Header />
      </AppLayout>
      <div className="relative">
        <img src={imageUrl} />
        <button
          onClick={moveBack}
          className="absolute top-4 left-4 bg-slate-50 p-2 rounded-full bg-opacity-50"
        >
          <BiArrowBack />
        </button>
      </div>
      <AppLayout>
        <div className="py-3">
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
        </div>
      </AppLayout>
    </>
  );
}

export default MoviePage;
