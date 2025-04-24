import React from 'react'
import Sidebar from './sidebar'
import Aiassist from './Aiassist'
import NewTask from './NewTask'

function NewTaskDashboard() {
  return (
    <div className="flex bg-white h-dvh ">
      <Sidebar />
      <NewTask/>
      <Aiassist />
    </div>
  )
}

export default NewTaskDashboard