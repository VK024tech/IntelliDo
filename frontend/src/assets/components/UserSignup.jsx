import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdOutlineMailOutline } from "react-icons/md";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { UserContext } from "../../contexts/UserContext";

export default function UserSign() {
  const navigate = useNavigate();

  const { userEmail, setUserEmail } = useContext(UserContext);
  const { userName, setUserName } = useContext(UserContext);

  ///password
  const { userPassword, setuserPassword } = useContext(UserContext);
  const { confirmUserPassword, setConfirmUserPassword } =
    useContext(UserContext);
  const { type, setType } = useContext(UserContext);
  const { eye, setEye } = useContext(UserContext);

  const { activeName, setActiveName } = useContext(UserContext);
  const { activeEmail, setActiveEmail } = useContext(UserContext);
  const { activePassword, setActivePassword } = useContext(UserContext);

  const nameColor = { fill: activeName ? "#6a7282" : "#00D5BE" };
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

  // password toggle to show and hide password
  function visiblityToggle() {
    if (!eye) {
      setType("password");
      setEye(true);
    } else {
      setType("text");
      setEye(false);
    }
  }

  const { passwordError, setPasswordError } = useContext(UserContext);
  const { emailError, setEmailError } = useContext(UserContext);
  const { userNameError, setUserNameError } = useContext(UserContext);

  // sign up button function
  async function signupButton() {
    ////form validation check
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (userEmail.length === 0) {
      setEmailError("Email is required!");
    } else if (!userEmail.includes("@")) {
      setEmailError("Enter a valid Email!");
    }
    if (userName.length < 1) {
      setUserNameError("Username is required!");
    }

    if (!userPassword.length < 1) {
      if (regex.test(userPassword)) {
        if (userPassword == confirmUserPassword) {
          setPasswordError("");
        } else {
          return setPasswordError("Password does not match!");
        }
      } else {
        return setPasswordError("Weak password");
      }
    } else {
      return setPasswordError("Password is required!");
    }

    ////send api call only if all error are empty
    if (passwordError == "" && userNameError == "" && emailError == "") {
      try {
        const response = await SignUpUser();
        if (response.data.msg == "signedUp") {
          return navigate("/signin");
        }
      } catch (error) {
        console.log(error.response.data);
        setEmailError(error.response.data);
      }
    }
  }

  // api call to backend to create new account
  async function SignUpUser() {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/signup`, {
      name: userName,
      username: userName.split(" ")[0],
      email: userEmail,
      password: userPassword,
    });

    return response;
  }

  // sign up route for google oauth
  async function signUpWithGoogle() {
    // const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/google`);
    window.location.href = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/google`;
    // console.log(response)
    // return response;
  }

  //user name component
  function componentUserName() {
    return (
      <div className="mb-2">
        <div className="pb-1 text-gray-800 font-bold flex flex-row justify-between">
          Username
          <span className=" text-xs mt-auto max-w-50  text-red-400 font-bold">
            {userNameError}
          </span>
        </div>
        <div className="border-2 rounded-md border-gray-500 overflow-hidden">
          <div className="flex flex-row">
            <div className="mx-4 my-auto">
              <AiOutlineUser style={nameColor} size={24} />
            </div>
            <span className="bg-gray-500 w-0.5 h-8 my-auto "></span>
            <input
            autoComplete="on"
              className="w-full py-2 pl-2 outline-none"
              type="text"
              
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
                setUserNameError("");
                if (e.target.value.length > 0) {
                  setActiveName(false);
                } else {
                  setActiveName(true);
                }
              }}
            />
          </div>
        </div>
      </div>
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
              autoComplete="on"
               name="useremail"
              type="email"
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

  //user password component
  function componentUserPassword() {
    return (
      <>
        <div className="mb-2">
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
                name="userpassword"
                
                type={type}
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
        <div className="mb-1">
          <div className="border-2 rounded-md border-gray-500 overflow-hidden">
            <div className="flex flex-row">
              <input
                className="w-full py-2 pl-4 outline-none"
                autoComplete="off"
                name="password"
                type={type}
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmUserPassword(e.target.value);
                  setPasswordError("");
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gradient-to-r  from-teal-100 to-teal-50 w-screen h-screen  md:p-12">
      
      <div className="bg-white w-auto  flex flex-row justify-center  rounded-2xl shadow-lg shadow-teal-200 px-2  items-center h-full py-2 md:py-8 md:pl-8  [@media(width<426px)]:mx-0 [@media(width>425px)]:mx-0    [@media(width>768px)]:mx-20">
        
        <img
          className="w-md max-w-95 md:max-w-100  hidden md:block  h-auto max-h-full rounded-2xl  "
          src="./images/image_fx2.jpg"
          alt="image"
        />
  
        <div  className="w-full max-w-sm mx-auto mb-auto md:my-auto py-2 px-2 md:px-6 flex flex-col gap-1">
          
          <div className=" text-center py-2 pb-8 [@media(width>766px)]:pb-2 text-4xl font-bold text-gray-900">
            Intelli<span className="text-teal-500">Do</span>
            <div className="text-xs    ">
              <span >The Smarter way to do!</span>
            </div>
          </div>
          <div className="text-2xl text-gray-800  font-bold mb-4">
            SignUp
          </div>
          {componentUserName()}
          {componentUserEmail()}
          {componentUserPassword()}

          <div
            onClick={() => {
              signupButton();
            }}
            className="bg-teal-300 hover:bg-teal-400 text-white p-2 text-center  rounded-md py-3 mb-4 md:mb-2 cursor-pointer"
          >
            Sign Up
          </div>
          <div className="inline-flex text-sm  items-center justify-center w-full  mb-4">
            <hr className="max-w-20 md:max-w-24 w-full h-[0.5px]  bg-gray-500 border-0"></hr>
            <span className="px-2 text-xs md:text-md text-gray-500 font-medium">
              Or Continue With
            </span>
            <hr className="max-w-20 md:max-w-24 w-full h-[0.5px]  bg-gray-500 border-0"></hr>
          </div>
          <div
            onClick={() => {
              signUpWithGoogle();
            }}
            className="mx-auto border-2 p-2 rounded-full border-gray-200 mb-4 cursor-pointer"
          >
            <FcGoogle size={32} />
          </div>
          <div className="inline-flex text-sm items-center justify-center w-full text-gray-800 font-bold">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-gray-500 font-medium pl-1 underline cursor-pointer"
            >
              SignIn here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
