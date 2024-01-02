import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileUser, setProfileUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        setProfileUser(user);
      } else {
        localStorage.setItem("loggedIn", "false");
        setIsLoggedIn(false);
        setProfileUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { isLoggedIn, profileUser };
};
