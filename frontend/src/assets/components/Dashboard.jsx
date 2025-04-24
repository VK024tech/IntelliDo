import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Aiassist from "./Aiassist";
import MainScreen from "./MainScreen";
import NewTask from "./NewTask";

import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

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
      <Sidebar />
      <NewTask />
      {/* <MainScreen/> */}
      <Aiassist />
    </div>
  );
}

export default Dashboard;
