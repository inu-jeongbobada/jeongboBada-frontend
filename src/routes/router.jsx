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
import CourseLecture from "../pages/course/CourseLecture";
import LectureDetail from "../pages/course/LectureDetail";
import LectureReviews from "../pages/course/LectureReviews";
import LectureWrite from "../pages/course/LectureWrite";
import CourseTimetable from "../pages/course/CourseTimetable";
import CourseCart from "../pages/course/CourseCart";
import Grade from "../pages/grade/Grade";
import MyPage from "../pages/my/MyPage";
import MyReviews from "../pages/my/MyReviews";
import ReviewEdit from "../pages/my/ReviewEdit";

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
      <Route path="/course/lectures" element={<CourseLecture />} />
      <Route path="/course/lectures/:lectureId" element={<LectureDetail />} />
      <Route
        path="/course/lectures/:lectureId/reviews"
        element={<LectureReviews />}
      />
      <Route
        path="/course/lectures/:lectureId/write"
        element={<LectureWrite />}
      />
      <Route path="/course/timetable" element={<CourseTimetable />} />
      <Route path="/course/cart" element={<CourseCart />} />
      <Route path="/grade" element={<Grade />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/my/reviews" element={<MyReviews />} />
      <Route
        path="/my/reviews/:type/:reviewId/edit"
        element={<ReviewEdit />}
      />
    </Routes>
  );
}

export default Router;
