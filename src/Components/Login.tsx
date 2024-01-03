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
  const handleLoginWithDemo = async (e: any) => {
    e.preventDefault();
    setLoginState(() => ({ email: "test@gmail.com", password: "testtest" }));
    console.log(loginState);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const status = await loginWithEmailAndPasswordLocal(loginState.email, loginState.password);
    if (status === "success") {
      navigate("/");
    } else {
      setErrorMessage(status);
      setShowError(true);
    }
  };
  return (
    <div className="flex-1 flex-col gap-5 flex justify-center items-center text-black dark:text-white">
      <form className="flex flex-col gap-4 w-9/10 mx-5 md:w-2/3 bg-slate-50 p-5 rounded-lg dark:bg-slate-800">
        <input
          className="bg-slate-100 sm:text-3xl font-semi-bold dark:bg-slate-700 outline-none rounded-md px-4 py-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={loginState.email}
          required
        />
        <input
          className="sm:text-3xl bg-slate-100 dark:bg-slate-700 outline-none rounded-md px-4 py-2"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={loginState.password}
          required
        />
        {showError && <p className="font-semibold text-red-500">{errorMessage}</p>}
        <button
          className="rounded-lg flex items-center bg-slate-300 dark:bg-slate-600 font-bold px-3 py-2 sm:px-5 sm:py-2 sm:text-3xl gap-4 shadow-lg w-max mx-auto"
          onClick={handleLoginWithDemo}
        >
          <div className="sm:text-2xl">
            <MdEmail />
          </div>
          Use Demo Email
        </button>
        <button
          className="rounded-lg flex items-center bg-green-500 font-bold sm:px-5 sm:py-2 px-3 py-2 md:text-3xl gap-4 shadow-lg w-max mx-auto"
          onClick={handleLogin}
        >
          <div className="sm:text-5xl">
            <MdEmail />
          </div>
          Login With Email
        </button>
      </form>
      <button
        className="rounded-lg flex items-center bg-green-500 font-bold sm:px-5 sm:py-2 px-3 py-2 text-xl sm:text-3xl gap-4 shadow-lg"
        onClick={signInWithGoogle}
      >
        <div className="sm:text-5xl text-2xl">
          <FcGoogle />
        </div>
        Login With Google
      </button>
    </div>
  );
};

export default Login;
