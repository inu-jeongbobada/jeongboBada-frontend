import { useState } from "react";
import { Clock } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SemesterSwitcher from "../../components/SemesterSwitcher";
import CreditProgress from "../../components/CreditProgress";
import Timetable from "../../components/Timetable";
import useLectureIds from "../../hooks/useLectureIds";
import { lectures, lectureToBlocks } from "../../data/lectures";
import { mockUser } from "../../data/user";
import styles from "./CourseTimetable.module.css";

function CourseTimetable() {
  const [semester, setSemester] = useState({ year: 2026, term: 2 });
  const [shownIds, setShownIds] = useState([]);
  const timetable = useLectureIds("timetable");
  const cart = useLectureIds("cart");

  const shownLectures = lectures.filter((lecture) =>
    shownIds.includes(lecture.id),
  );
  const blocks = shownLectures.flatMap(lectureToBlocks);
  const currentCredits = shownLectures.reduce(
    (sum, lecture) => sum + lecture.credit,
    0,
  );

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.side}>
          <section className={styles.profileCard}>
            <h2>{mockUser.name}님</h2>
            <p className={styles.profileMeta}>
              <span>{mockUser.major}</span>
              <span>{mockUser.grade}</span>
              <span>{mockUser.studentId}</span>
              <span>{mockUser.minor}</span>
            </p>

            <CreditProgress
              earned={mockUser.earnedCredits}
              required={mockUser.requiredCredits}
            />

            <button
              type="button"
              className={styles.loadButton}
              onClick={() => setShownIds(timetable.ids)}
            >
              시간표 가져오기
            </button>
          </section>

          <dl className={styles.stats}>
            <div>
              <dt>최근 학기 평균 학점</dt>
              <dd>{mockUser.recentGpa.toFixed(1)}</dd>
            </div>
            <div>
              <dt>전체 평균 학점</dt>
              <dd>{mockUser.totalGpa.toFixed(1)}</dd>
            </div>
            <div>
              <dt>현재 학기 학점</dt>
              <dd>
                {currentCredits}
                <small>학점</small>
              </dd>
            </div>
          </dl>

          <button
            type="button"
            className={styles.cartCard}
            onClick={() => setShownIds(cart.ids)}
          >
            <h3>나의 예비 시간표 불러오기</h3>
            <p>
              과목 강의 정보와 일정을 확인하며
              <br />
              지정한 수강 과목을 불러 올 수 있습니다.
            </p>
            <Clock className={styles.cartIcon} size={150} strokeWidth={2} />
          </button>
        </div>

        <section className={styles.timetableCard}>
          <SemesterSwitcher value={semester} onChange={setSemester} />
          <Timetable blocks={blocks} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CourseTimetable;
