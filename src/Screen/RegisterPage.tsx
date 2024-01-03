import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPasswordLocal } from "../API/Authentication";
import Navigation from "../Components/Navigation";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [registerState, setRegisterState] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    setRegisterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /[A-Za-z]/;
    if (emailRegex.test(registerState.email) == false) {
      setErrorMessage("Email format incorrect");
      setShowError(true);
      return;
    }
    if (registerState.firstName == "") {
      setErrorMessage("First Name is Empty");
      setShowError(true);
      return;
    }
    if (registerState.secondName == "") {
      setErrorMessage("Second Name is Empty");
      setShowError(true);
      return;
    }
    if (nameRegex.test(registerState.firstName) == false) {
      setErrorMessage("First Name is not in correct format");
      setShowError(true);
      return;
    }
    if (nameRegex.test(registerState.secondName) == false) {
      setErrorMessage("Second Name is not in correct format");
      setShowError(true);
      return;
    }
    if (registerState.password != registerState.confirmPassword) {
      setErrorMessage("Passwords does not match");
      setShowError(true);
      return;
    }
    if (registerState.password == "") {
      setErrorMessage("Password cannot be empty.");
      setShowError(true);
      return;
    }
    if (registerState.password.length < 6) {
      setErrorMessage("Password Must be 6 character or longer");
      setShowError(true);
      return;
    }
    setShowError(false);
    const status: any = await signInWithEmailAndPasswordLocal(
      registerState.firstName + " " + registerState.secondName,
      registerState.email,
      registerState.password
    );
    if (status === "success") {
      navigate("/login");
    } else {
      setErrorMessage(status.toString());
      setShowError(true);
    }
  };
  return (
    <>
      <Navigation></Navigation>
      <div className="flex flex-1  justify-center items-center">
        <form className=" p-4 sm:p-12 flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800 dark:text-white rounded-lg gap-4 sm:w-1/2">
          <input
            type="text"
            name="firstName"
            className="md:text-2xl w-2/3 rounded-md py-2 px-4 bg-slate-200 dark:bg-slate-700  outline-none"
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="secondName"
            className="md:text-2xl w-2/3 rounded-md py-2 px-4 bg-slate-200 dark:bg-slate-700  outline-none"
            onChange={handleChange}
            placeholder="Second Name"
          />
          <input
            type="email"
            name="email"
            className="md:text-2xl w-2/3 rounded-md py-2 px-4 bg-slate-200 dark:bg-slate-700  outline-none"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="md:text-2xl w-2/3 rounded-md py-2 px-4 bg-slate-200 outline-none dark:bg-slate-700"
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            className="md:text-2xl w-2/3 rounded-md py-2 px-4 bg-slate-200 dark:bg-slate-700 outline-none "
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {showError && <p className=" text-red-500 font-semibold"> {errorMessage}</p>}
          <p className="font-semibold">Note: password must be 6 character or longer</p>
          <button
            className="rounded-lg sm:py-3 sm:px-6 py-2 px-3 text-xl sm:text-3xl font-bold bg-green-500 shadow-md"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
