import { Routes, Route } from "react-router-dom";
import UserSign from "./assets/components/UserSignup";
import Dashboard from "./assets/components/dashboard";
import UserLogin from "./assets/components/UserLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<UserSign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
