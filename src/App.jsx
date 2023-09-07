import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/SearchPage";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <div className="bg-zinc-900">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path=":movieId" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
