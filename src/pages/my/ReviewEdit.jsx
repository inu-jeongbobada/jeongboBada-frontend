import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewForm from "../../components/ReviewForm";
import {
  lectureQuestions,
  myReviews,
  professorQuestions,
} from "../../data/reviews";
import styles from "./ReviewEdit.module.css";

const titles = {
  lecture: "강의 평가 수정",
  professor: "교수 평가 수정",
};

function ReviewEdit() {
  const { type, reviewId } = useParams();
  const navigate = useNavigate();
  const review = myReviews.find(
    (item) => item.type === type && item.id === Number(reviewId),
  );
  const isLecture = type === "lecture";

  const handleSubmit = (values) => {
    // TODO : 후기 수정 API 연결
    console.log(values);
    navigate(`/my/reviews?type=${type}`);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{titles[type] ?? "후기 수정"}</h1>

        {review ? (
          <>
            <div className={styles.target}>
              <strong>{review.target}</strong>
              <span>{review.professor}</span>
            </div>

            <ReviewForm
              questions={isLecture ? lectureQuestions : professorQuestions}
              initialValues={{
                overall: review.overall,
                ratings: review.ratings,
                anonymous: review.anonymous,
                content: review.content,
              }}
              maxLength={isLecture ? 1000 : 500}
              showOverall
              submitLabel="수정 완료"
              onSubmit={handleSubmit}
              onCancel={() => navigate(-1)}
            />
          </>
        ) : (
          <>
            <p className={styles.notFound}>후기를 찾을 수 없습니다.</p>
            <Link to="/my/reviews">나의 강의평가로 돌아가기</Link>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ReviewEdit;
