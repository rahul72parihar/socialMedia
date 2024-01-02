import { Link } from "react-router-dom";
import useTheme from "../Hooks/useTheme";

function Navigation() {
  const { toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem("loggedIn") == "true";

  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <div className="dark:bg-slate-800 bg-slate-300 flex justify-between items-center dark:text-white py-3 px-6 text-3xl font-bold">
      <Link to="/">
        <button>RP GALLERY</button>
      </Link>
      {!isLoggedIn && (
        <div className="flex gap-8 items-center">
          <button onClick={handleToggle} className="px-4 py-2 border rounded-lg">
            Toggle
          </button>
          <Link to="/login">
            <button className="dark:bg-slate-600 px-4 py-2 rounded-lg">Login</button>
          </Link>
          <Link to="/register">
            <button className="dark:bg-slate-600 bg-slate-950 text-white px-4 py-2 rounded-lg">
              Register
            </button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex gap-8 items-center">
          <button onClick={handleToggle} className="px-4 py-2 border rounded-lg">
            Toggle
          </button>
          <Link to="/add">
            <button className="dark:bg-slate-600 bg-slate-950 text-white px-4 py-2 rounded-lg">
              Add
            </button>
          </Link>
          <Link to="/profile">
            <button className="dark:bg-slate-600 bg-slate-950 text-white px-4 py-2 rounded-lg">
              Profile
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
