import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Lab from "../pages/Lab";
import Professor from "../pages/Professor";
import ProfessorDetail from "../pages/ProfessorDetail";
import Course from "../pages/Course";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/professor" element={<Professor />} />
      <Route path="/professor/:id" element={<ProfessorDetail />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
}

export default Router;
