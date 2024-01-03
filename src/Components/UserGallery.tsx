import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";
import PhotoModal from "./PhotoModal";

const UserGallery = ({ userId }: any) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto]: any = useState("");
  useEffect(() => {
    if (!userId) return;
    const userDocRef = doc(db, "photos", userId);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const userPhotos = snapshot.data().photos || [];
        setPhotos(userPhotos.reverse());
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  //MODAL

  const handleOpenModal = (photo: any) => {
    setModalPhoto(photo);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //UI

  if (isLoading) return <Loading></Loading>;
  if (photos.length === 0)
    return (
      <div className="flex dark:text-white justify-center font-bold items-center flex-1 text-5xl">
        NO POSTS
      </div>
    );
  return (
    <div className=" bg-slate-100 dark:bg-slate-800 flex flex-1 flex-col items-center p-8 rounded-lg gap-8 dark:text-white w-full">
      <h1 className="text-2xl md:text-5xl font-bold">YOUR POSTS</h1>
      <div className=" w-full flex flex-wrap  gap-3 justify-center">
        {photos.map((photo: any, index) => (
          <div
            className="overflow-hidden p-3 bg-slate-200 dark:bg-slate-950 rounded-lg"
            key={index}
            onClick={() => handleOpenModal(photo)}
          >
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
      {showModal && <PhotoModal closeModal={handleCloseModal} photo={modalPhoto} uid={userId} />}
    </div>
  );
};

export default UserGallery;
