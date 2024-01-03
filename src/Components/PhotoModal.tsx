import { useState } from "react";
import { deletePhotoLocal } from "../API/AddPhoto";
const PhotoModal = ({ closeModal, photo, uid }: any) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleDelete = async () => {
    let status: any = await deletePhotoLocal(photo.url, uid);
    status = status.toString();
    if (status == "success") {
      closeModal();
    } else {
      setErrorMessage(status);
    }
  };
  return (
    <div className=" fixed inset-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 w-full h-full text-white">
      <div className="w-screen h-screen  flex flex-col justify-start mt-20 items-center">
        <img
          className="h-80 w-80 sm:w-auto sm:h-2/3 object-cover mx-auto"
          src={photo.url}
          alt="user uploaded photo"
        />
        {errorMessage && <p className="text-red-500 text-xl font-semibold">{errorMessage}</p>}
        <div className="flex my-10">
          <button
            className="sm:text-3xl bg-red-600 px-4 py-2 rounded-lg font-bold"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
        <button
          className="fixed top-2 right-5 sm:top-5 sm:right-10 sm:text-2xl bg-red-600 px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoModal;
