import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const prev = localStorage.getItem("theme");
    if (prev) return prev;
    else return "light";
  });
  const toggleTheme = () => {
    if (theme == "light") setTheme("dark");
    else setTheme("light");
  };
  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem("theme", theme);
    if (theme == "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);
  return { theme, toggleTheme } as const;
};

export default useTheme;
