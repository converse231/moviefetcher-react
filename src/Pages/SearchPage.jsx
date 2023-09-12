import {
  useGetDisoverMoviesQuery,
  useLazyGetSearchMoviesQuery,
} from "../services/movieSlice";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import Loader from "../components/Loader";
import AppLayout from "../components/AppLayout";

function SearchPage() {
  const { data, isLoading, isError } = useGetDisoverMoviesQuery();
  const [getSearchMovies, { isLoading: isFetching, isError: ResultError }] =
    useLazyGetSearchMoviesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOutput, setSearchOutput] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || ResultError) {
    return <div>Error loading movies</div>;
  }

  // Check if data exists before destructure
  if (!data || !data.results) {
    return <div>No movie data available</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data: movieResults } = await getSearchMovies({
      searchInput: searchQuery,
    });
    setSearchOutput(movieResults.results);
  }

  const discoverMovies = !searchOutput ? data.results : searchOutput;

  return (
    <>
      <Header />
      <AppLayout>
        <div className="py-[4rem]">
          <form
            className="flex items-center bg-zinc-100 py-2 px-4 rounded-full mt-3 mb-4"
            onSubmit={handleSubmit}
          >
            <input
              className="placeholder:italic placeholder:text-slate-400 block  w-full bg-transparent rounded-xl  sm:text-lg outline-none"
              placeholder="Search movie..."
              type="text"
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="text-2xl text-zinc-900" />
          </form>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
            {isLoading || isFetching ? (
              <div className="w-full h-screen flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              discoverMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                />
              ))
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default SearchPage;
