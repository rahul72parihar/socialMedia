import Navigation from "../Components/Navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import ProfileData from "../Components/ProfileData";
const ProfilePage = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navigation></Navigation>
      <div className="flex-1 flex flex-col my-20 items-center">
        <div className="bg-slate-100 dark:bg-slate-800 w-4/6  flex flex-col rounded-lg p-10">
          <ProfileData />
          <div className="flex justify-center w-1/2 mx-auto ">
            <Link to="/">
              <button
                onClick={handleSignOut}
                className="text-white  my-2 py-2 px-4 shadow-2xl font-bold text-4xl rounded-lg bg-green-500"
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
