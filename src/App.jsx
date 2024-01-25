import RegistrationForm from "./pages/RegistrationForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisteredUsers from "./pages/registeredUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registered-users" element={<RegisteredUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
