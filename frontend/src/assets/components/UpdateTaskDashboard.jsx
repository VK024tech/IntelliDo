import React from "react";
import Sidebar from "./sidebar";
import Aiassist from "./Aiassist";
import UpdateTask from "./UpdateTask";

function UpdateTaskDashboard() {
  return (
    <div className="flex bg-white h-dvh ">
      <Sidebar />
      <UpdateTask />
      <Aiassist />
    </div>
  );
}

export default UpdateTaskDashboard;
