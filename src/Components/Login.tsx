import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loginWithEmailAndPasswordLocal, signInWithGoogle } from "../API/Authentication";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const handleChange = (e: any) => {
    setLoginState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const status = await loginWithEmailAndPasswordLocal(loginState.email, loginState.password);
    if (status === "success") {
      navigate("/profile");
    } else {
      setErrorMessage(status);
      setShowError(true);
    }
  };
  return (
    <div className="flex-1 flex-col gap-5 flex justify-center items-center text-black dark:text-white">
      <form className="flex flex-col gap-4 w-1/3 bg-slate-50 p-5 rounded-lg dark:bg-slate-800">
        <input
          className="bg-slate-100 text-3xl font-semi-bold dark:bg-slate-700 outline-none rounded-md px-4 py-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="text-3xl bg-slate-100 dark:bg-slate-700 outline-none rounded-md px-4 py-2"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        {showError && <p className="font-semibold text-red-500">{errorMessage}</p>}
        <button
          className="rounded-lg flex items-center bg-green-500 font-bold px-5 py-2 text-3xl gap-4 shadow-lg w-max mx-auto"
          onClick={handleLogin}
        >
          <div className="text-5xl">
            <MdEmail />
          </div>
          Login With Email
        </button>
      </form>
      <button
        className="rounded-lg flex items-center bg-green-500 font-bold px-5 py-2 text-3xl gap-4 shadow-lg"
        onClick={signInWithGoogle}
      >
        <div className="text-5xl">
          <FcGoogle />
        </div>
        Login With Google
      </button>
    </div>
  );
};

export default Login;
