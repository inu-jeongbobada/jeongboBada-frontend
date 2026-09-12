import Header from "../../components/Header";
import styles from "./ProfessorDetail.module.css";

import { Phone, Mail, MapPin, Clock3, Sparkle } from "lucide-react";

function ProfessorDetail() {
  const courses = [
    {
      id: 1,
      name: "담당과목",
      type: "전공심화",
    },
    {
      id: 2,
      name: "담당과목",
      type: "전공필수",
    },
    {
      id: 3,
      name: "담당과목",
      type: "전공필수",
    },
    {
      id: 4,
      name: "담당과목",
      type: "전공필수",
    },
  ];

  const researchList = [
    {
      id: 1,
      title: "· 논문 1",
      year: "연도",
    },
    {
      id: 2,
      title: "· 논문 2",
      year: "연도",
    },
    {
      id: 3,
      title: "· 논문 3",
      year: "연도",
    },
    {
      id: 4,
      title: "· 논문 4",
      year: "연도",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero} />
      <main className={styles.mainContent}>
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileImage}></div>
        </div>

        <section className={styles.professorSection}>
          <div className={styles.professorInfo}>
            <div className={styles.infoField}>
              <div className={styles.professorField}>
                <div className={styles.nameRow}>
                  <h1>교수명</h1>
                  <span className={styles.positionBadge}>부교수</span>
                </div>

                <h2 className={styles.department}>학부명</h2>
              </div>
              <div className={styles.researchField}>
                <div className={styles.researchTitleRow}>
                  <h2>연구분야</h2>
                  <div className={styles.researchBadges}>
                    <span>연구 분야</span>
                    <span>연구 분야</span>
                  </div>
                </div>
                <p>
                  교수소개 본문
                  <br />
                  교수소개 본문
                </p>
              </div>
            </div>

            <div className={styles.divider} />
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <Phone size={26} strokeWidth={1.8} />
                <span>000 0000 0000</span>
              </div>

              <div className={styles.contactItem}>
                <MapPin size={26} strokeWidth={1.8} />
                <span>7호관 2NN</span>
              </div>

              <div className={styles.contactItem}>
                <Mail size={26} strokeWidth={1.8} />
                <span>이메일 주소</span>
              </div>

              <div className={styles.contactItem}>
                <Clock3 size={26} strokeWidth={1.8} />
                <span>방문 가능 시간</span>
              </div>
            </div>
          </div>

          <div className={styles.courseBox}>
            <h2>담당과목</h2>
            <div className={styles.courseList}>
              {courses.map((course) => (
                <div className={styles.courseItem} key={course.id}>
                  <span>{course.name}</span>
                  <span>{course.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <div className={styles.researchResultBox}>
            <h2>연구 실적</h2>
            <div className={styles.resultList}>
              {researchList.map((research) => (
                <div className={styles.resultItem} key={research.id}>
                  <span>{research.title}</span>
                  <span>{research.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reviewBox}>
            <div className={styles.reviewHeader}>
              <h2>수강생 후기</h2>
              <button type="button">더보기 &gt;</button>
            </div>
            <div className={styles.reviewSummary}>
              <div className={styles.score}>
                <Sparkle size={27} strokeWidth={1.8} fill="currentColor" />
                <strong>2.4 / 5.0</strong>
              </div>
              <span>전체 20개 평가</span>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.stars}>
                <span className={styles.activeStar}>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
              <span className={styles.anonymous}>익명</span>
              <p>매주 이거듣는날 노캔끼고 무단횡단함</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfessorDetail;
