import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import image from '../../images/image_fx2.jpg'

import axios from "axios";

function UserLogin() {
  const navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(UserContext);

  const { passwordError, setPasswordError } = useContext(UserContext);
  const { emailError, setEmailError } = useContext(UserContext);
  const { userNameError, setUserNameError } = useContext(UserContext);

  const { userPassword, setuserPassword } = useContext(UserContext);

  const { type, setType } = useContext(UserContext);
  const { eye, setEye } = useContext(UserContext);

  const { activeEmail, setActiveEmail } = useContext(UserContext);
  const { activePassword, setActivePassword } = useContext(UserContext);

  const emailColor = { fill: activeEmail ? "#6a7282" : "#00D5BE" };
  const passwordColor = { fill: activePassword ? "#6a7282" : "#00D5BE" };

    ///password eye icon toggle on off
  function passwordIcon() {
    if (!eye) {
      return <LiaEyeSolid style={passwordColor} size={24} />;
    } else {
      return <LiaEyeSlashSolid style={passwordColor} size={24} />;
    }
  }

   // sign up route for google oauth
  async function signInWithGoogle() {
    window.location.href = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/google`;
  }

  //api call to sign in user
  async function SignInUser() {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/signin`, {
      email: userEmail,
      password: userPassword,
    });

    return response;
  }


  //signin button function
  async function signInButton() {
    ////form validation check

    if (userEmail.length === 0) {
      setEmailError("Email is required!");
    } else if (!userEmail.includes("@")) {
      setEmailError("Enter a valid Email!");
    } else {
      setEmailError("");
    }

    if (userPassword.length === 0) {
      return setPasswordError("Password is required!");
    } else {
      setPasswordError("");
    }

    ////send api call only if all error are empty
    if (passwordError == "" && emailError == "") {
      try {
        const response = await SignInUser();

        if (response.data.message == "signedin") {
          const token = response.data.token;

          sessionStorage.setItem("currentSession", token);

          return navigate("/dashboard", {replace: true});
        }
      } catch (error) {
        console.log(error)
        setEmailError(error.response.data.message);
      }
    }
  }

  //password hide and unhide toggele
  function visiblityToggle() {
    if (!eye) {
      setType("password");
      setEye(true);
    } else {
      setType("text");
      setEye(false);
    }
  }

  // user password component
  function componentUserPassword() {
    return (
      <>
        <div className="mb-4">
          <div className="pb-1 text-gray-800 font-bold flex flex-row justify-between">
            Password{" "}
            <span className=" text-xs mt-auto max-w-50  text-red-400 font-bold">
              {passwordError}
            </span>
          </div>

          <div className="border-2 rounded-md border-gray-500  overflow-hidden">
            <div className="flex flex-row">
              <div
                onClick={() => {
                  visiblityToggle();
                }}
                className="mx-4 my-auto cursor-pointer"
              >
                {passwordIcon()}
              </div>
              <span className="bg-gray-500 w-0.5 h-8 my-auto "></span>
              <input
                className="w-full py-2 pl-2 outline-none "
                type={type}
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setuserPassword(e.target.value);
                  setPasswordError("");
                  if (e.target.value.length > 0) {
                    setActivePassword(false);
                  } else {
                    setActivePassword(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  //user email component
  function componentUserEmail() {
    return (
      <div className="mb-2">
        <div className="pb-1 text-gray-800 font-bold flex flex-row justify-between">
          Email
          <span className=" text-xs mt-auto max-w-60  text-red-400 font-bold">
            {emailError}
          </span>
        </div>
        <div className="border-2 rounded-md border-gray-500 overflow-hidden">
          <div className="flex flex-row">
            <div className="mx-4 my-auto">
              <MdOutlineMailOutline style={emailColor} size={24} />
            </div>
            <span className="bg-gray-500 w-0.5 h-8 my-auto "></span>
            <input
              className="w-full py-2 pl-2 outline-none"
              type="email"
              autoComplete="on"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setUserEmail(e.target.value);
                setEmailError("");
                if (e.target.value.length > 0) {
                  setActiveEmail(false);
                } else {
                  setActiveEmail(true);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="bg-gradient-to-r  from-teal-100 to-teal-50 w-screen h-screen  md:p-12">
      <div className="bg-white w-auto  flex flex-row justify-center   rounded-2xl shadow-lg shadow-teal-200 px-2  items-center h-full py-2 md:py-8 md:pl-8  [@media(width<426px)]:mx-0 [@media(width>425px)]:mx-0    [@media(width>768px)]:mx-20">
        <img
          className="w-md max-w-95 md:max-w-100  hidden md:block  h-auto max-h-full rounded-2xl  "
          src={image}
          alt="image"
        />

        <div className="w-full max-w-sm mx-auto mb-auto md:my-auto py-2 px-2 md:px-6 flex flex-col gap-2 md:gap-1">
        <div className=" text-center py-2 pb-8 [@media(width>766px)]:pb-24 text-4xl font-bold text-gray-900">
            Intelli<span className="text-teal-500">Do</span>
            <div className="text-xs    ">
              <span >The Smarter way to do!</span>
            </div>
          </div>
          <div className="text-3xl text-gray-800     font-bold mb-4">
            SignIn
          </div>

          {componentUserEmail()}
          {componentUserPassword()}

          <div
            onClick={() => {
              signInButton();
            }}
            className="bg-teal-300 hover:bg-teal-400 text-white p-2 text-center rounded-md py-3 mb-4 cursor-pointer"
          >
            Sign In
          </div>
          <div className="inline-flex text-sm  items-center justify-center w-full pt-4 md:pt-0 mb-4">
            <hr className="max-w-20 md:max-w-24 w-full h-[0.5px]  bg-gray-500 border-0"></hr>
            <span className="px-2 text-xs md:text-md text-gray-500 font-medium">
              Or Continue With
            </span>
            <hr className="max-w-20 md:max-w-24 w-full h-[0.5px]  bg-gray-500 border-0"></hr>
          </div>
          <div
            onClick={() => {
              signInWithGoogle();
            }}
            className="mx-auto border-2 p-2  rounded-full border-gray-200 mb-4 cursor-pointer"
          >
            <FcGoogle size={32} />
          </div>
          <div className="inline-flex text-sm items-center  justify-center w-full text-gray-800 font-bold">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-gray-500 font-medium pl-1 underline cursor-pointer"
            >
              SignUp here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
