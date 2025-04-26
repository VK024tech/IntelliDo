import React, { useContext, useEffect } from "react";
import Sidebar from "./sidebar";
import Aiassist from "./Aiassist";
import MainScreen from "./MainScreen";


import { useSearchParams } from "react-router-dom";
import UserPrompt from "./Popups/UserPrompt";
import { TodoContext } from "../../contexts/TodoContext";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

    const { promptOpen, setPromptOpen } = useContext(TodoContext);

  //to save jwt and clean params after google auth
  useEffect(() => {
    const currentSession = searchParams.get("jwt");

    if (currentSession) {
      sessionStorage.setItem("currentSession", currentSession);
      setSearchParams({});
    }
  }, []);

  return (
    <div className="flex bg-white h-dvh ">
      {promptOpen && <UserPrompt/>}
      <Sidebar />
      <MainScreen />
      <Aiassist />
    </div>
  );
}

export default Dashboard;
