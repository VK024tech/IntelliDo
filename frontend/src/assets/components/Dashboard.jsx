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

  ////forcing re render of main screen component beacuse the fetch task was not working on first render even after using useeffct, this is the solution i found out
  const [renderKey, setRenderkey] = useState("1");
  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderkey("2");
    }, 50);
    return () => clearTimeout(timer);
  });

  ///conditional rendering of components
  function middleScreen() {
    if (currentScreen == "main") {
      return <MainScreen key={renderKey} />;
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
