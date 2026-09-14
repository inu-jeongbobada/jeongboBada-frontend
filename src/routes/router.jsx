import { Routes, Route } from "react-router-dom";

import Main from "../pages/Home/Main";
import About from "../pages/Home/About";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import FindPw from "../pages/auth/FindPw";
import Lab from "../pages/Lab";
import Professor from "../pages/professor/ProfessorMain";
import ProfessorDetail from "../pages/professor/ProfessorDetail";
import Course from "../pages/Course";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/find-password" element={<FindPw />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/professor" element={<Professor />} />
      <Route path="/professor/:id" element={<ProfessorDetail />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
}

export default Router;
