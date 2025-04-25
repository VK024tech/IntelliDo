import { Routes, Route } from "react-router-dom";
import UserSign from "./assets/components/UserSignup";
import Dashboard from "./assets/components/dashboard";
import UserLogin from "./assets/components/UserLogin";
import NewTaskDashboard from "./assets/components/NewTaskDashboard";
import UpdateTaskDashboard from "./assets/components/UpdateTaskDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserSign />} />
        <Route path="/signup" element={<UserSign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<UserLogin />} />
        <Route path="/dashboard/newtask" element={<NewTaskDashboard />} />
        <Route path="/dashboard/edittask" element={<UpdateTaskDashboard />} />
      </Routes>
    </>
  );
}

export default App;
