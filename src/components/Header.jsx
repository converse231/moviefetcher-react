import { useState } from "react";
import { HiX, HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="absolute z-50 w-full">
      <header className="max-w-screen-2xl bg-transparent mx-auto z-50 py-3 px-4 md:px-0 w-full">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-4xl font-bold text-slate-50 shadow-lg">
              MovSavvy
            </h1>
          </Link>
          <div className="flex justify-center items-center gap-3">
            <Link to="/search">
              <FiSearch className="text-2xl text-zinc-50" />
            </Link>
            {navOpen ? (
              <HiX
                className="text-slate-50 text-2xl md:hidden"
                onClick={() => setNavOpen(!navOpen)}
              />
            ) : (
              <HiMenu
                className="text-slate-50 text-2xl md:hidden"
                onClick={() => setNavOpen(!navOpen)}
              />
            )}
          </div>
        </div>

        {navOpen ? (
          <div className="flex flex-row mt-5 justify-center h-screen">
            <ul className="text-center text-slate-50 font- flex flex-col gap-4 text-[2rem]">
              <li>Home</li>
              <li>Series</li>
              <li>Movies</li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default Header;
