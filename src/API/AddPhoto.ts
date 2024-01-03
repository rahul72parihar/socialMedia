import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
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

export async function deletePhotoLocal(photoUrl: any, uid: any) {
  const photoRef = ref(storage, photoUrl);
  // Delete the photo from Firebase Storage
  console.log(photoRef);
  const metadata = await getMetadata(photoRef).catch(() => console.log("file was deleted"));
  if (metadata) {
    // Delete the photo from Firebase Storage
    await deleteObject(photoRef);
    console.log("Photo deleted successfully");
  } else {
    console.log("File does not exist. Skipping deletion.");
  }
  try {
    // Create a reference to the photo in Firebase Storage
    const userDocRef = doc(db, "photos", uid);
    // Fetch the current document data
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Get the current photos array
      const currentPhotos = userDocSnapshot.data().photos || [];

      // Find the index of the photo to delete in the array
      const photoIndex = currentPhotos.findIndex((photo: any) => photo.url === photoUrl);

      if (photoIndex !== -1) {
        // Create a new array without the deleted photo
        const updatedPhotos = [
          ...currentPhotos.slice(0, photoIndex),
          ...currentPhotos.slice(photoIndex + 1),
        ];

        // Update the user's document in Firestore with the updated array
        await updateDoc(userDocRef, { photos: updatedPhotos });

        console.log("Photo reference deleted from Firestore");
      } else {
        console.error("Photo not found in the user's photo array");
      }
    } else {
      console.error("User document not found in Firestore");
    }

    return "success";
  } catch (error) {
    console.error("Error deleting photo:", error);
    return error; // You can choose to handle the error in a different way if needed
  }
}

export default uploadPhotoToFirebase;
