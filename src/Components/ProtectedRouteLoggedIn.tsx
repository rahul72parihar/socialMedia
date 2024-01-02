import { Navigate } from "react-router-dom";
const ProtectedRouteLoggedIn = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn == "true") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRouteLoggedIn;
