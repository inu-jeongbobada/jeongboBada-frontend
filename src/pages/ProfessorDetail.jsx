import Header from "../components/Header";
import BackButton from "../components/BackButton";
import styles from "./ProfessorDetail.module.css";

function ProfessorDetail() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <section className={styles.profile}>
          <div className={styles.profileImage}>
            <div className={styles.backButtonPosition}>
              <BackButton />
            </div>
          </div>

          <div className={styles.profileInfo}>
            <h1>교수명</h1>
            <h3>학부명</h3>
            <div className={styles.paper}>
              <p>교수소개 본문</p>
              <p>교수소개 본문</p>
              <p>교수소개 본문</p>
            </div>
          </div>
        </section>

        <section className={styles.detail}>
          <div className={styles.column}>
            <div className={styles.infoBox}>
              <h2>전화번호</h2>
              <h4>000 0000 0000</h4>
            </div>

            <div className={styles.infoBox}>
              <h2>이메일</h2>
              <h4>000 0000 0000</h4>
            </div>

            <div className={styles.infoBox}>
              <h2>담당과목</h2>
              <h4>· 담당과목 1</h4>
              <h4>· 담당과목 2</h4>
              <h4>· 담당과목 3</h4>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.infoBox}>
              <h2>연구실적</h2>
              <h4>· 논문 1</h4>
              <h4>· 논문 2</h4>
              <h4>· 논문 3</h4>
              <h4>· 논문 4</h4>
            </div>

            <div className={styles.infoBox}>
              <h2>댓글</h2>
              <h4>AI 요약</h4>
              <h4>추천 수 많은 댓글은 위로</h4>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfessorDetail;
