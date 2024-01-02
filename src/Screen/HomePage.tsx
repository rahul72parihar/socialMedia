import Navigation from "../Components/Navigation";
import Login from "../Components/Login";
import { useLogin } from "../Hooks/useLogin";
import UserGallery from "../Components/UserGallery";
const Homepage = () => {
  const { isLoggedIn, profileUser } = useLogin();
  return (
    <>
      <Navigation></Navigation>
      {!isLoggedIn && <Login></Login>}
      {isLoggedIn && <UserGallery userId={profileUser.uid}></UserGallery>}
    </>
  );
};

export default Homepage;
