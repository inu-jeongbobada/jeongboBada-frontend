import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, ShoppingBasket } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LectureBrowser from "../../components/LectureBrowser";
import useLectureIds from "../../hooks/useLectureIds";
import { lectures } from "../../data/lectures";
import styles from "./CourseCart.module.css";

const MIN_ROWS = 5;

function CourseCart() {
  const navigate = useNavigate();
  const cart = useLectureIds("cart");
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);

  const cartLectures = lectures.filter((lecture) =>
    cart.ids.includes(lecture.id),
  );
  const emptyRows = Math.max(0, MIN_ROWS - cartLectures.length);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.left}>
          <section className={styles.cartPanel}>
            <div className={styles.cartHeader}>
              <h2>나의 장바구니</h2>
              <p>
                과목 강의 정보와 일정을 확인하며
                <br />
                나에게 맞는 수강 과목을 계획할 수 있습니다.
              </p>
              <ShoppingBasket
                className={styles.cartIcon}
                size={130}
                strokeWidth={2}
              />
            </div>

            <ul className={styles.cartList}>
              {cartLectures.map((lecture) => {
                const selected = lecture.id === selectedCartId;

                return (
                  <li
                    key={lecture.id}
                    className={`${styles.cartItem} ${
                      selected ? styles.selected : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.itemBody}
                      onClick={() => setSelectedCartId(lecture.id)}
                    >
                      <span className={styles.itemTop}>
                        <strong>{lecture.name}</strong>
                        <span>{lecture.code}</span>
                      </span>
                      <span className={styles.professor}>
                        {lecture.professor}
                      </span>
                      <span className={styles.meta}>
                        {`${lecture.credit}학점 ${lecture.grade}학년 ${lecture.category} ${lecture.schedule}`}
                      </span>
                    </button>

                    {selected && (
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => {
                          cart.remove(lecture.id);
                          setSelectedCartId(null);
                        }}
                      >
                        장바구니에서 제거
                      </button>
                    )}
                  </li>
                );
              })}

              {Array.from({ length: emptyRows }).map((_, index) => (
                <li key={`empty-${index}`} className={styles.emptyItem} />
              ))}
            </ul>
          </section>

          <div className={styles.footerRow}>
            <button
              type="button"
              className={styles.timetableButton}
              onClick={() => navigate("/course/timetable")}
            >
              예비 시간표 보기
            </button>
            <p className={styles.notice}>
              <Info size={26} strokeWidth={2.5} />
              본 장바구니는 공식 수강신청과 연동되지 않습니다.
            </p>
          </div>
        </div>

        <section className={styles.searchPanel}>
          <LectureBrowser
            lectures={lectures}
            selectedId={selectedLectureId}
            onSelect={setSelectedLectureId}
            renderActions={(lecture) =>
              cart.ids.includes(lecture.id) ? (
                <button type="button" disabled>
                  담긴 강의
                </button>
              ) : (
                <button type="button" onClick={() => cart.add(lecture.id)}>
                  장바구니에 추가
                </button>
              )
            }
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CourseCart;
