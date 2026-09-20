import { useState } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarRating from "../../components/StarRating";
import { findLecture } from "../../data/lectures";
import { lectureReviews } from "../../data/reviews";
import styles from "./LectureReviews.module.css";

function LectureReviews() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const lecture = findLecture(lectureId);
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (reviewId) =>
    setLikedIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );

  if (!lecture) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>강의 평가 후기</h1>
          <p className={styles.notFound}>강의를 찾을 수 없습니다.</p>
          <Link to="/course/lectures">강의 정보로 돌아가기</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>강의 평가 후기</h1>
        <p className={styles.count}>후기 {lecture.reviewCount}개</p>

        <div className={styles.reviewList}>
          <div className={styles.reviewScroll}>
            {lectureReviews.map((review) => {
              const liked = likedIds.includes(review.id);

              return (
                <article className={styles.reviewItem} key={review.id}>
                  <div className={styles.reviewProfile} />
                  <div className={styles.reviewBody}>
                    <div className={styles.reviewMeta}>
                      <span className={styles.nickname}>{review.nickname}</span>
                      <StarRating value={review.rating} size={20} gap={6} />
                    </div>
                    <p>{review.content}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.heartButton}
                    aria-label="좋아요"
                    onClick={() => toggleLike(review.id)}
                  >
                    <Heart
                      size={22}
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

export default LectureReviews;
