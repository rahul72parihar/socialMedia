import { Navigate } from "react-router-dom";
const ProtectedRouteLoggedOut = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  console.log("islogged in ", isLoggedIn);
  if (isLoggedIn == "false") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRouteLoggedOut;
