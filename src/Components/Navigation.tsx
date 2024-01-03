import { Link } from "react-router-dom";
import useTheme from "../Hooks/useTheme";

function Navigation() {
  const { toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem("loggedIn") == "true";

  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <div className="dark:bg-slate-800 bg-slate-300 flex justify-between items-center dark:text-white md:py-3 md:px-6 py-2 px-4 md:text-3xl font-bold">
      <Link to="/">
        <button>RP GALLERY</button>
      </Link>
      {!isLoggedIn && (
        <div className="flex md:gap-8 gap-2 items-center">
          <button onClick={handleToggle} className="md:px-4 md:py-2 px-2 py-1 border rounded-lg">
            Toggle
          </button>
          <Link to="/login">
            <button className="dark:bg-slate-600 md:px-4 md:py-2 px-2 py-1 rounded-lg border">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="dark:bg-slate-600 bg-slate-950 text-white md:px-4 md:py-2 px-2 py-1 rounded-lg">
              Register
            </button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex md:gap-8 gap-2 items-center">
          <button onClick={handleToggle} className="md:px-4 md:py-2 px-2 py-1 border rounded-lg">
            Toggle
          </button>
          <Link to="/add">
            <button className="dark:bg-slate-600 bg-slate-950 text-white md:px-4 md:py-2 rounded-lg px-2 py-1">
              Add
            </button>
          </Link>
          <Link to="/profile">
            <button className="dark:bg-slate-600 bg-slate-950 text-white md:px-4 md:py-2 rounded-lg px-2 py-1">
              Profile
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
