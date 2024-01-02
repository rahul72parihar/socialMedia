import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, provider } from "../firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

export const signInWithEmailAndPasswordLocal = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          displayName: displayName,
          email: email,
          photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });
      } else {
      }
    });
  } catch (error) {
    return error;
  }
  return "success";
};

export const loginWithEmailAndPasswordLocal = async (email: string, password: string) => {
  const status = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return "success";
      console.log(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
  return status;
};
