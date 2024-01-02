import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

async function uploadPhotoToFirebase(userId: any, photoFile: any) {
  try {
    // Reference to the user's document in Firestore using the UID as the document name
    const userDocRef = doc(db, "photos", userId);

    // Fetch the current document data
    const userDocSnapshot = await getDoc(userDocRef);
    const currentPhotos = userDocSnapshot.exists() ? userDocSnapshot.data().photos || [] : [];

    // Reference to the user's document in Firebase Storage
    const storageRef = ref(storage, `photos/${userId}/${photoFile.name}`);

    // Upload the photo to Firebase Storage
    await uploadBytes(storageRef, photoFile);

    // Get the download URL of the uploaded photo
    const photoURL = await getDownloadURL(storageRef);
    const timestamp = Timestamp.fromDate(new Date());

    // Update the local array with the new photo
    const updatedPhotos = [...currentPhotos, { url: photoURL, timestamp: timestamp }];

    // Update the user's document in the "photos" collection with the updated array
    await setDoc(userDocRef, { photos: updatedPhotos });

    return "success";
  } catch (error: any) {
    console.error("Error uploading photo:", error);
    return error.toString();
  }
}

export default uploadPhotoToFirebase;
