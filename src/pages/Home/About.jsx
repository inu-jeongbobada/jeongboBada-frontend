import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./About.module.css";
import featureIcon1 from "../../assets/featureIcon1.png";
import featureIcon2 from "../../assets/featureIcon2.png";
import featureIcon3 from "../../assets/featureIcon3.png";

function About() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <h1>
              학과 생활에 필요한 모든 정보,
              <br />
              한곳에서 더 쉽고 편리하게
            </h1>
            <p>
              선후배의 경험과 신뢰할 수 있는 정보를 바탕으로 학업부터 진로까지,
              학과 생활의 모든 순간을 함께합니다.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <h2>주요 기능 및 범위</h2>
          <button type="button" className={styles.feedbackButton}>
            의견 보내기
          </button>
        </div>

        <div className={styles.featureList}>
          <article className={styles.featureItem}>
            <div className={styles.featureCard}>
              <h3>교수님 정보</h3>
              <ul>
                <li>담당 과목 · 연구 분야 · 연락처 정보 제공</li>
                <li>수강 후기와 학생들의 의견을 통한 교수 정보 공유</li>
              </ul>
            </div>
            <div className={styles.featureIcon}>
              <img src={featureIcon1} />
            </div>
          </article>

          <article className={styles.featureItem}>
            <div className={styles.featureCard}>
              <h3>전공 수업 정보</h3>
              <ul>
                <li>과목별 수업 정보 및 시간표 제공</li>
                <li>학생들의 강의 평가 및 후기 확인</li>
                <li>학점 관리와 개인별 강의 정보 제공</li>
              </ul>
            </div>
            <div className={styles.featureIcon}>
              <img src={featureIcon2} />
            </div>
          </article>

          <article className={styles.featureItem}>
            <div className={styles.featureCard}>
              <h3>앞으로 추가 기능</h3>

              <ul>
                <li>학과 커뮤니티 · 공지사항</li>
                <li>학과 활동 · 동아리 안내</li>
                <li>취업 정보 · 진로 후기</li>
                <li>학생 · 졸업생간 네트워크 기능</li>
              </ul>
            </div>
            <div className={styles.featureIcon}>
              <img src={featureIcon3} />
            </div>
          </article>
        </div>

        <section className={styles.teamBox}>
          <span className={styles.teamBadge}>제작자</span>
          <div className={styles.teamList}>
            <div className={styles.teamItem}>
              <h3>Front-end</h3>
              <p>
                • <span className={styles.member}>조서윤</span>
              </p>
            </div>
            <div className={styles.teamItem}>
              <h3>Back-end</h3>
              <p>
                • <span className={styles.member}>유기현</span>
              </p>
              <p>
                • <span className={styles.member}>박강혁</span>
              </p>
              <p>
                • <span className={styles.member}>홍현택</span>
              </p>
            </div>
            <div className={styles.teamItem}>
              <h3>Design</h3>
              <p>
                • <span className={styles.member}>이하나</span>
              </p>
              <p>
                • <span className={styles.member}>강서연</span>
              </p>
            </div>
          </div>
        </section>
      </section>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default About;
