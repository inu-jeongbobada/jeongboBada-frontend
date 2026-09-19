import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import StarRating from "../../components/StarRating";
import { myReviews } from "../../data/reviews";
import styles from "./MyReviews.module.css";

const tabs = [
  { type: "lecture", label: "강의평가" },
  { type: "professor", label: "교수평가" },
];

function MyReviews() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") === "professor" ? "professor" : "lecture";
  const [reviews, setReviews] = useState(myReviews);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const visibleReviews = reviews.filter((review) => review.type === type);

  const handleDelete = () => {
    // TODO : 후기 삭제 API 연결
    setReviews((prev) => prev.filter((review) => review.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>나의 강의평가</h1>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.type}
              className={type === tab.type ? styles.activeTab : ""}
              onClick={() => setSearchParams({ type: tab.type })}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {visibleReviews.length === 0 ? (
          <p className={styles.empty}>작성한 후기가 없습니다.</p>
        ) : (
          <ul className={styles.list}>
            {visibleReviews.map((review) => (
              <li className={styles.item} key={review.id}>
                <div className={styles.itemHeader}>
                  <div className={styles.target}>
                    <strong>{review.target}</strong>
                    <span>{review.professor}</span>
                  </div>
                  <span className={styles.date}>{review.date}</span>
                </div>

                <StarRating value={review.overall} size={22} gap={6} />
                <p className={styles.content}>{review.content}</p>

                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/my/reviews/${review.type}/${review.id}/edit`)
                    }
                  >
                    수정
                  </button>
                  <button type="button" onClick={() => setDeleteTarget(review)}>
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />

      {deleteTarget && (
        <Modal
          title="후기를 삭제할까요?"
          onClose={() => setDeleteTarget(null)}
          actions={
            <>
              <button type="button" onClick={() => setDeleteTarget(null)}>
                취소
              </button>
              <button type="button" onClick={handleDelete}>
                삭제
              </button>
            </>
          }
        >
          삭제한 후기는 복구할 수 없습니다.
        </Modal>
      )}
    </div>
  );
}

export default MyReviews;
