import { useState } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarRating from "../../components/StarRating";
import { findLecture } from "../../data/lectures";
import { lectureReviews } from "../../data/reviews";
import styles from "./LectureDetail.module.css";

function LectureDetail() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const lecture = findLecture(lectureId);
  const [sort, setSort] = useState("popular");
  const [likedIds, setLikedIds] = useState([]);

  if (!lecture) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>강의 평가</h1>
          <p className={styles.notFound}>강의를 찾을 수 없습니다.</p>
          <Link to="/course/lectures" className={styles.backLink}>
            강의 정보로 돌아가기
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const reviews = [...lectureReviews].sort((a, b) =>
    sort === "popular"
      ? b.likes - a.likes
      : b.date.localeCompare(a.date),
  );

  const toggleLike = (reviewId) =>
    setLikedIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>강의 평가</h1>

        <section className={styles.summary}>
          <div className={styles.lectureInfo}>
            <div className={styles.profileImage} />
            <div className={styles.lectureText}>
              <strong>{lecture.name}</strong>
              <span>{lecture.professor}</span>
              <div className={styles.tags}>
                <span>{lecture.category}</span>
                <span>{lecture.credit}학점</span>
                <span>{lecture.evaluation}</span>
                <span>{lecture.method}</span>
              </div>
            </div>
          </div>

          <div className={styles.scoreArea}>
            <div className={styles.score}>
              <strong>{lecture.rating.toFixed(1)}</strong>
              <span>/ 5.0</span>
            </div>
            <StarRating value={lecture.rating} size={40} gap={12} />
          </div>

          <div className={styles.metricList}>
            <Metric label="과제" value={lecture.stats.assignment} />
            <Metric label="학점" value={lecture.stats.grading} />
            <Metric label="팀플" value={lecture.stats.teamwork} />
            <div className={styles.exam}>
              <span className={styles.metricLabel}>시험</span>
              <strong>{lecture.stats.exam}회</strong>
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
            <Link
              to={`/course/lectures/${lecture.id}/reviews`}
              className={styles.moreLink}
            >
              후기 {lecture.reviewCount}개 더보기 &gt;
            </Link>
          </div>

          <div className={styles.reviewList}>
            <div className={styles.reviewScroll}>
              {reviews.map((review) => {
                const liked = likedIds.includes(review.id);

                return (
                  <article className={styles.reviewItem} key={review.id}>
                    <div className={styles.reviewProfile} />
                    <span className={styles.nickname}>{review.nickname}</span>
                    <p>{review.content}</p>
                    <button
                      type="button"
                      className={styles.heartButton}
                      aria-label="좋아요"
                      onClick={() => toggleLike(review.id)}
                    >
                      <Heart
                        size={20}
                        strokeWidth={1.5}
                        className={liked ? styles.likedHeart : ""}
                        fill={liked ? "currentColor" : "none"}
                      />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <button
          type="button"
          className={styles.writeButton}
          onClick={() => navigate(`/course/lectures/${lecture.id}/write`)}
        >
          강의평 업로드하기
        </button>
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

export default LectureDetail;
