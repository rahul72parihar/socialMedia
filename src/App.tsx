import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Screen/HomePage";
import PageNotFound from "./Screen/PageNotFound";
import LoginPage from "./Screen/LoginPage";
import RegisterPage from "./Screen/RegisterPage";
import ProfilePage from "./Screen/ProfilePage";
import ProtectedRouteLoggedOut from "./Components/ProtectedRouteLoggedOut";
import ProtectedRouteLoggedIn from "./Components/ProtectedRouteLoggedIn";
import AddPage from "./Screen/AddPage";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Homepage />} /> */}
            <Route index element={<Homepage />} />
            <Route
              path="login"
              element={
                <ProtectedRouteLoggedIn>
                  <LoginPage />
                </ProtectedRouteLoggedIn>
              }
            />
            <Route
              path="register"
              element={
                <ProtectedRouteLoggedIn>
                  <RegisterPage />
                </ProtectedRouteLoggedIn>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRouteLoggedOut>
                  <ProfilePage />
                </ProtectedRouteLoggedOut>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedRouteLoggedOut>
                  <AddPage />
                </ProtectedRouteLoggedOut>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
