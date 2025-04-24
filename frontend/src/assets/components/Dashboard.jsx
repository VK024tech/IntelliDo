import React from "react";
import Sidebar from "./sidebar";
import Aiassist from "./Aiassist";
import MainScreen from "./MainScreen";
import NewTask from "./NewTask";

import DateTime from "./DateTimeComponents/StartDateTime";

function Dashboard() {
  return (
    <div className="flex bg-white h-dvh ">
      {/* <DateTime/> */}

      <Sidebar />
      <NewTask />
      {/* <MainScreen/> */}
      <Aiassist />
    </div>
  );
}

export default Dashboard;
