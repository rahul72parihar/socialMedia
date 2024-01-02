import Navigation from "../Components/Navigation";
import Login from "../Components/Login";
import { useLogin } from "../Hooks/useLogin";
import UserGallery from "../Components/UserGallery";
const Homepage = () => {
  const { profileUser } = useLogin();
  const isLoggedInLocal = localStorage.getItem("loggedIn") == "true";
  return (
    <>
      <Navigation></Navigation>
      {!isLoggedInLocal && <Login></Login>}
      {isLoggedInLocal && profileUser && profileUser.uid && (
        <UserGallery userId={profileUser.uid}></UserGallery>
      )}
    </>
  );
};

export default Homepage;
