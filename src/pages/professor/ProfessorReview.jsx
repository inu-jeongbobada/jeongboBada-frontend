import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./ProfessorReview.module.css";

const reviews = [
  {
    id: 1,
    content: "어 개별로임 듣지마셈 도망가 발표 너무 많아",
  },
  {
    id: 2,
    content: "매주 이거듣는날 노캔끼고 무단횡단함 죽고싶어서",
  },
  {
    id: 3,
    content: "아 이거 수강료 날리는 과목임 절대 비추 내 말의 동의한다면 개추아",
  },
  {
    id: 4,
    content:
      "나는 이 수업을 들으러 갈 때 자전거를 손 놓고 탄다 그냥 오다가 뒤질라고",
  },
  {
    id: 5,
    content:
      "나는 이 수업을 들으러 갈 때 자전거를 손 놓고 탄다 그냥 오다가 뒤질라고",
  },
  {
    id: 6,
    content:
      "나는 이 수업을 들으러 갈 때 자전거를 손 놓고 탄다 그냥 오다가 뒤질라고",
  },
];

const ratingQuestions = [
  {
    id: "passion",
    title: "교수님께서 수업에 열정적이신가요?",
    left: "아니다",
    right: "그렇다",
  },
  {
    id: "plan",
    title: "강의계획서와 동일하게 진행되나요?",
    left: "아니다",
    right: "그렇다",
  },
  {
    id: "feedback",
    title: "학생에게 피드백을 제공하시나요?",
    left: "없음",
    right: "4회 이상",
  },
];

function ProfessorReview() {
  const [sort, setSort] = useState("latest");
  const [likedReviews, setLikedReviews] = useState([]);

  const handleLike = (reviewId) => {
    setLikedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const { professorId } = useParams();
  const [ratings, setRatings] = useState({
    passion: 0,
    plan: 0,
    feedback: 0,
  });
  const [anonymous, setAnonymous] = useState(false);
  const [review, setReview] = useState("");

  const handleRating = (category, score) => {
    setRatings((prev) => ({
      ...prev,
      [category]: score,
    }));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value.slice(0, 500));
  };

  const handleSubmit = () => {
    console.log({
      ratings,
      anonymous,
      review,
    });
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>교수님 후기</h1>
        <section className={styles.professorSection}>
          <div className={styles.professorInfo}>
            <div className={styles.profileImage} />
            <div className={styles.profileText}>
              <strong>교수명</strong>
              <span>학과명</span>
            </div>
          </div>

          <div className={styles.metricList}>
            <Metric label="열정" value={3} />
            <Metric label="실행력" value={3} />
            <Metric label="피드백" value={3} />
          </div>

          <div className={styles.scoreArea}>
            <div className={styles.score}>
              <strong>2.5</strong>
              <span>/ 5.0</span>
            </div>

            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={
                    star <= 2 ? styles.activeStar : styles.inactiveStar
                  }
                />
              ))}

              <span className={styles.scoreCount}>0 / 5</span>
            </div>
          </div>
        </section>

        <section className={styles.reviewSection}>
          <div className={styles.reviewHeader}>
            <div className={styles.sortButtons}>
              <button
                type="button"
                className={sort === "latest" ? styles.activeSort : ""}
                onClick={() => setSort("latest")}
              >
                최신순
              </button>
              <button
                type="button"
                className={sort === "popular" ? styles.activeSort : ""}
                onClick={() => setSort("popular")}
              >
                인기순
              </button>
            </div>
            <span className={styles.reviewCount}>후기 128개</span>
          </div>

          <div className={styles.reviewList}>
            <div className={styles.reviewScroll}>
              {reviews.map((item) => {
                const isLiked = likedReviews.includes(item.id);

                return (
                  <article className={styles.reviewItem} key={item.id}>
                    <div className={styles.reviewProfile} />
                    <span className={styles.anonymous}>익명</span>
                    <p>{item.content}</p>
                    <button
                      type="button"
                      className={styles.heartButton}
                      onClick={() => handleLike(item.id)}
                    >
                      <Heart
                        size={20}
                        strokeWidth={1.5}
                        className={isLiked ? styles.likedHeart : styles.heart}
                        fill={isLiked ? "currentColor" : "none"}
                      />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.writeSection}>
          <div className={styles.ratingQuestions}>
            {ratingQuestions.map((question) => (
              <div className={styles.ratingQuestion} key={question.id}>
                <h3>{question.title}</h3>
                <div className={styles.ratingControl}>
                  <div className={styles.ratingDots}>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        type="button"
                        key={score}
                        className={`${styles.ratingDot} ${
                          ratings[question.id] >= score
                            ? styles.selectedDot
                            : ""
                        }`}
                        style={{
                          width: `${8 + score * 2}px`,
                          height: `${8 + score * 2}px`,
                        }}
                        onClick={() => handleRating(question.id, score)}
                      />
                    ))}
                  </div>

                  <div className={styles.ratingLabels}>
                    <span>{question.left}</span>
                    <span>{question.right}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.anonymousCheck}>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <span
              className={`${styles.customCheckbox} ${
                anonymous ? styles.checked : ""
              }`}
              onClick={() => setAnonymous((prev) => !prev)}
            >
              {anonymous && "✓"}
            </span>
            <span>익명</span>
          </div>

          <div className={styles.textareaBox}>
            <textarea
              value={review}
              maxLength={500}
              onChange={handleReviewChange}
              placeholder="객관적인 평가를 작성해 주세요. 욕설·비방·허위 사실 및 개인정보가 포함된 내용은 삭제될 수 있습니다"
            />
            <span className={styles.characterCount}>{review.length} / 500</span>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            강의평 업로드하기
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricLabel}>{label}</span>
      <div className={styles.metricLine}>
        <div
          className={styles.metricValue}
          style={{ width: `${value * 20}%` }}
        />
        <span
          className={styles.metricMarker}
          style={{ left: `${value * 20}%` }}
        />
      </div>
    </div>
  );
}

export default ProfessorReview;
