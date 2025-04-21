import React from "react";

import { FcGoogle } from "react-icons/fc";

function UserLogin() {
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
        <div className="mb-2">
          <div className="border-2 rounded-md border-gray-500 overflow-hidden">
            <div className="flex flex-row">
              <input
                className="w-full py-2 pl-4 outline-none"
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
    <div className="bg-gradient-to-r from-teal-100 to-teal-50 w-screen h-screen p-12">
      <div className="bg-white w-auto flex flex-row justify-center rounded-2xl shadow-lg shadow-teal-200  items-center h-full py-8 pl-8 [@media(width<1240px)]:mx-20 md:mx-50">
        <img
          className="w-md max-w-95 md:max-w-110  h-auto max-h-full rounded-2xl  "
          src="../assets/image_fx2.jpg"
          alt="image"
        />

        <div className="w-full max-w-sm mx-auto px-6 flex flex-col gap-2">
          <div className="text-3xl text-gray-800 text-center font-bold mb-4">
            SignIn
          </div>

          {componentUserEmail()}
          {componentUserPassword()}
            
          <div
            onClick={() => {
              signupButton();
            }}
            className="bg-teal-300 hover:bg-teal-400 text-white p-2 text-center rounded-md py-3 mb-4 cursor-pointer"
          >
            Sign In
          </div>
          <div className="inline-flex text-sm  items-center justify-center w-full  mb-4">
            <hr className="max-w-24 w-full h-px  bg-gray-500 border-0"></hr>
            <span className="px-2  text-gray-500 font-medium">
              Or Continue With
            </span>
            <hr className="max-w-24 w-full h-px  bg-gray-500 border-0"></hr>
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
