import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Aiassist from "./Aiassist";
import MainScreen from "./MainScreen";
import UpdateTask from "./UpdateTask";
import NewTask from "./NewTask";

import { useSearchParams } from "react-router-dom";
import UserPrompt from "./Popups/UserPrompt";
import { TodoContext } from "../../contexts/TodoContext";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { promptOpen, setPromptOpen } = useContext(TodoContext);

  const { currentScreen, setCurrentScreen } = useContext(TodoContext);

  //to save jwt and clean params after google auth
  useEffect(() => {
    const currentSession = searchParams.get("jwt");

    if (currentSession) {
      sessionStorage.setItem("currentSession", currentSession);
      setSearchParams({});
    }
  }, []);

  function middleScreen() {
    if (currentScreen == "main") {
      return <MainScreen />;
    } else if (currentScreen == "updateTask") {
      return <UpdateTask />;
    } else if (currentScreen == "newTask") {
      return <NewTask />;
    }

    return <MainScreen />;
  }

  return (
    <div className="flex bg-white h-dvh ">
      {promptOpen && <UserPrompt />}
      <Sidebar />
      {middleScreen()}
      <Aiassist />
    </div>
  );
}

export default Dashboard;
