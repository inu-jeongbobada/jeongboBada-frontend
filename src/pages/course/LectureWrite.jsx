import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewForm from "../../components/ReviewForm";
import { findLecture } from "../../data/lectures";
import { lectureQuestions } from "../../data/reviews";
import styles from "./LectureWrite.module.css";

function LectureWrite() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const lecture = findLecture(lectureId);

  const handleSubmit = (values) => {
    // TODO : 강의평 등록 API 연결
    console.log(values);
    navigate(`/course/lectures/${lectureId}`);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>강의 평가</h1>

        {lecture ? (
          <>
            <div className={styles.lectureLine}>
              <strong>{lecture.name}</strong>
              <span>{lecture.professor}</span>
              <span className={styles.tag}>{lecture.category}</span>
            </div>

            <ReviewForm
              questions={lectureQuestions}
              maxLength={1000}
              showOverall
              showSemester
              showFile
              submitLabel="강의평 업로드하기"
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <>
            <p className={styles.notFound}>강의를 찾을 수 없습니다.</p>
            <Link to="/course/lectures">강의 정보로 돌아가기</Link>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default LectureWrite;
