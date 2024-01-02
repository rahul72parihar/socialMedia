import Navigation from "../Components/Navigation";
import Login from "../Components/Login";
import { useLogin } from "../Hooks/useLogin";
const Homepage = () => {
  const { isLoggedIn } = useLogin();
  return (
    <>
      <Navigation></Navigation>
      {!isLoggedIn && <Login></Login>}
    </>
  );
};

export default Homepage;
