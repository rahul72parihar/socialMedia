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
    console.log(user);
    if (!userDoc.exists()) {
      console.log("User dont exist");
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } else {
      console.log("User already exists in Firestore");
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
      console.log(user);
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log(user);
      if (!userDoc.exists()) {
        console.log("User dont exist");
        await setDoc(userDocRef, {
          displayName: displayName,
          email: email,
          photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });
      } else {
        console.log("User already exists in Firestore");
      }
    });
  } catch (error) {
    console.error(error);
    return error;
  }
  return "success";
};

export const loginWithEmailAndPasswordLocal = async (email: string, password: string) => {
  console.log("email", email);
  console.log("password", password);
  const status = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return "success";
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      return errorMessage;
    });
  return status;
};
