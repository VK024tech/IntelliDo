import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [activeName, setActiveName] = useState(true);
  const [activeEmail, setActiveEmail] = useState(true);
  const [activePassword, setActivePassword] = useState(true);

  const [userPassword, setuserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [type, setType] = useState("password");
  const [eye, setEye] = useState(true);

  const contextValue = {
    emailError,
    setEmailError,
    userNameError,
    setUserNameError,
    passwordError,
    setPasswordError,
    activeName,
    setActiveName,
    activeEmail,
    setActiveEmail,
    activePassword,
    setActivePassword,
    userPassword,
    setuserPassword,
    confirmUserPassword,
    setConfirmUserPassword,
    type,
    setType,
    eye,
    setEye,
    userEmail,
    setUserEmail,
    userName,
    setUserName,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
