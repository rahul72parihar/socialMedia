import { useState, useRef } from "react";
import Navigation from "../Components/Navigation";
import { useLogin } from "../Hooks/useLogin";
import uploadPhotoToFirebase from "../API/AddPhoto";
import UserGallery from "../Components/UserGallery";

const AddPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage]: any = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { profileUser } = useLogin();
  const [uploaded, setUploaded] = useState(false);

  const inputFile: any = useRef(null);

  const handlePost = async () => {
    setUploaded(false);
    if (!profileUser.uid) {
      setErrorMessage("User Not Found");
      return;
    }
    if (selectedImage === "") {
      setErrorMessage("Please Upload Image");
      return;
    }
    const status = await uploadPhotoToFirebase(profileUser.uid, selectedImage);
    if (status != "success") {
      setErrorMessage(status);
    } else {
      setErrorMessage("");
      setSelectedImage("");
      setUploaded(true);
      setImageUrl("");
      if (inputFile && inputFile.current) {
        inputFile.current.value = "";
      }
    }
  };

  const handleUpload = async (event: any) => {
    setUploaded(false);
    await setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
    }
  };

  return (
    <>
      <Navigation></Navigation>
      <div className="flex flex-1 flex-col w-4/5 items-center mx-auto my-6 gap-6">
        {imageUrl && <img className="w-96 h-96 object-cover" src={imageUrl} alt="Preview" />}
        <input
          className=" file:text-black dark:file:text-white file:bg-green-500 file:mx-2 font-semibold dark:text-white py-3 px-4 text-2xl bg-slate-100 dark:bg-slate-800 rounded-lg"
          type="file"
          name="myImage"
          accept="image/*"
          ref={inputFile}
          onChange={handleUpload}
        />
        {errorMessage && <p className="text-2xl text-red-500">{errorMessage}</p>}
        {uploaded && <p className="text-2xl text-green-500">Image Uploaded Successfully.</p>}
        <button
          className="mx-auto w-max bg-green-500 text-5xl font-semibold px-6 py-3 rounded-lg text-white"
          onClick={handlePost}
        >
          Post Photo
        </button>
        {profileUser?.uid && <UserGallery userId={profileUser.uid} />}
      </div>
    </>
  );
};

export default AddPage;
