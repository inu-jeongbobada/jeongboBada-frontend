import { Routes, Route } from "react-router-dom";

import Home from "../pages/dashboard/Home";
import About from "../pages/dashboard/About";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import FindPw from "../pages/auth/FindPw";
import LabList from "../pages/lab/LabList";
import LabDetail from "../pages/lab/LabDetail";
import ProfessorList from "../pages/professor/ProfessorList";
import ProfessorDetail from "../pages/professor/ProfessorDetail";
import ProfessorReview from "../pages/professor/ProfessorReview";
import CourseMain from "../pages/course/CourseMain";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/find-password" element={<FindPw />} />
      <Route path="/lab/list" element={<LabList />} />
      <Route path="/lab/:LabId" element={<LabDetail />} />
      <Route path="/professor/list" element={<ProfessorList />} />
      <Route path="/professor/:professorId" element={<ProfessorDetail />} />
      <Route
        path="/professor/:professorId/review"
        element={<ProfessorReview />}
      />
      <Route path="/course" element={<CourseMain />} />
    </Routes>
  );
}

export default Router;
