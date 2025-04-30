import { Routes, Route } from "react-router-dom";
import UserSign from "./assets/components/UserSignup";
import Dashboard from "./assets/components/Dashboard";
import UserLogin from "./assets/components/UserLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserSign />} />
        <Route path="/signup" element={<UserSign />} />
        <Route path="/signin" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
