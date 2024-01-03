import { useState } from "react";
import useProfile from "../Hooks/useProfile";

const ProfileData = () => {
  const data = useProfile();
  const [canEdit, setCanEdit] = useState(false);
  const handeEdit = () => {
    setCanEdit(true);
  };
  const handleSave = () => {
    setCanEdit(false);
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex justify-between sm:gap-8 gap-2 mb-4">
        <div className="flex flex-col w-4/5 gap-4 text-sm sm:text-2xl">
          <input
            readOnly
            value={data?.displayName}
            className="border-2 dark:bg-slate-900 dark:text-white rounded-lg focus:outline-none border-white dark:border-black font-bold py-2 px-4 w-full"
          ></input>
          <input
            readOnly
            value={data?.email}
            className="dark:border-black dark:bg-slate-900 dark:text-white border-2 rounded-lg focus:outline-none border-white font-bold py-2 px-4 w-full"
          ></input>
          <input
            readOnly={!canEdit}
            placeholder="UserName"
            value={data?.userName}
            className="dark:border-black dark:bg-slate-900 dark:text-white border-2 rounded-lg focus:outline-none border-white font-bold py-2 px-4 w-full"
          ></input>
          <input
            readOnly={!canEdit}
            placeholder="Phone No."
            value={data?.phoneNumber}
            className="dark:border-black dark:bg-slate-900 dark:text-white border-2 rounded-lg focus:outline-none border-white font-bold py-2 px-4 w-full"
          ></input>
          <textarea
            readOnly={!canEdit}
            placeholder="Address"
            value={data?.address}
            className="dark:border-black dark:bg-slate-900 dark:text-white border-2 rounded-lg focus:outline-none border-white font-bold py-2 px-4 w-full resize-none"
          ></textarea>
        </div>
        <div className="sm:w-40 w-20">
          <img
            className="rounded-full dark:border-black border-white border-2 w-40 "
            src={
              data && data.photoURL
                ? data.photoURL
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile picture of user"
          />
        </div>
      </div>
      {!canEdit && (
        <button
          className="sm:py-3 sm:px-6 py-2 px-3 bg-green-500 sm:text-3xl text-2xl font-bold text-white rounded-lg w-min mx-auto"
          onClick={handeEdit}
        >
          Edit
        </button>
      )}
      {canEdit && (
        <button
          className="sm:py-3 sm:px-6 py-2 px-3 bg-green-500 sm:text-3xl text-2xl font-bold text-white rounded-lg w-min mx-auto"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default ProfileData;
