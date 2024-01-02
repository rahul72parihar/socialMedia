import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";

const UserGallery = ({ userId }: any) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const userDocRef = doc(db, "photos", userId);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const userPhotos = snapshot.data().photos || [];
        setPhotos(userPhotos.reverse());
      }
    });
    return () => unsubscribe();
  }, [userId]);
  if (photos.length === 0) return <Loading></Loading>;
  return (
    <div className=" bg-slate-100 dark:bg-slate-800 flex flex-col items-center p-8 rounded-lg gap-8 dark:text-white">
      <h1 className=" text-5xl font-bold">YOUR POSTS</h1>
      <div className=" w-full flex flex-wrap  gap-3 justify-center">
        {photos.map((photo: any, index) => (
          <div className="overflow-hidden p-3 bg-slate-200 rounded-lg" key={index}>
            <img
              className="w-60 h-60 object-cover rounded-lg border-2 border-slate-200 shadow-sm "
              src={photo.url}
              alt={`Photo ${index}`}
            />
            <p className=" text-xl font-semibold mt-2">
              {new Date(photo.timestamp?.seconds * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGallery;
