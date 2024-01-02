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
    <div className=" fixed inset-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 w-full p-20 h-full text-white">
      <div className="w-2/3 h-full mx-auto flex flex-col justify-center items-center">
        <img className="h-2/3 mx-auto" src={photo.url} alt="user uploaded photo" />
        {errorMessage && <p className="text-red-500 text-xl font-semibold">{errorMessage}</p>}
        <div className="flex my-10">
          <button
            className="text-3xl bg-red-600 px-4 py-2 rounded-lg font-bold"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
        <button
          className="fixed top-10 right-20 text-2xl bg-red-600 px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoModal;
