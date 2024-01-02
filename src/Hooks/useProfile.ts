import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useLogin } from "./useLogin";

const useProfile = () => {
  const { isLoggedIn, profileUser } = useLogin();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    const profileDocRef = doc(db, "users", profileUser.uid);

    const unsubscribe = onSnapshot(profileDocRef, (docSnapshot) => {
      console.log("Snapshot received");
      if (docSnapshot.exists()) {
        setProfileData(docSnapshot.data());
      } else {
        setProfileData(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [profileUser]);

  return profileData;
};

export default useProfile;
