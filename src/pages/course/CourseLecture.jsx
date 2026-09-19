import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SemesterSwitcher from "../../components/SemesterSwitcher";
import LectureBrowser from "../../components/LectureBrowser";
import Timetable from "../../components/Timetable";
import useLectureIds from "../../hooks/useLectureIds";
import { lectures, lectureToBlocks } from "../../data/lectures";
import styles from "./CourseLecture.module.css";

function CourseLecture() {
  const navigate = useNavigate();
  const [semester, setSemester] = useState({ year: 2026, term: 2 });
  const [selectedId, setSelectedId] = useState(null);
  const timetable = useLectureIds("timetable");
  const cart = useLectureIds("cart");

  const blocks = lectures
    .filter((lecture) => timetable.ids.includes(lecture.id))
    .flatMap(lectureToBlocks);

  const handleLoadCart = () => {
    timetable.set((prev) => [...new Set([...prev, ...cart.ids])]);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <SemesterSwitcher value={semester} onChange={setSemester} />

        <div className={styles.toolbar}>
          <button type="button" onClick={handleLoadCart}>
            장바구니 불러오기
          </button>
        </div>

        <div className={styles.panels}>
          <section className={styles.panel}>
            <LectureBrowser
              lectures={lectures}
              selectedId={selectedId}
              onSelect={setSelectedId}
              showArrows
              renderActions={(lecture) => {
                const added = timetable.ids.includes(lecture.id);

                return (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/course/lectures/${lecture.id}`)
                      }
                    >
                      강의 평가 보기
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        added
                          ? timetable.remove(lecture.id)
                          : timetable.add(lecture.id)
                      }
                    >
                      {added ? "시간표 제거" : "시간표 추가"}
                    </button>
                  </>
                );
              }}
            />
          </section>

          <section className={styles.panel}>
            <Timetable blocks={blocks} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default CourseLecture;
