import { useState } from "react";
import Header from "../components/Header";
import styles from "./Course.module.css";
import logoImg from "../assets/logo.png";

function Course() {
  const [selectedTab, setSelectedTab] = useState("course");

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            쉽고 빠르게 <span>전공 강의평</span>
            <br />
            알아보기
          </h1>
          <p className={styles.heroDescription}>
            정보 바다에서 나의 정보를 만나보세요
          </p>
        </div>
      </section>

      <section className={styles.lectureSection}>
        <div className={styles.lectureContent}>
          <div className={styles.tabList}>
            <button
              type="button"
              className={
                selectedTab === "course"
                  ? `${styles.tabButton} ${styles.activeTab}`
                  : styles.tabButton
              }
              onClick={() => setSelectedTab("course")}
            >
              강의 정보
            </button>

            <button
              type="button"
              className={
                selectedTab === "grade"
                  ? `${styles.tabButton} ${styles.activeTab}`
                  : styles.tabButton
              }
              onClick={() => setSelectedTab("grade")}
            >
              나의 학점 정보
            </button>
          </div>

          {selectedTab === "course" && (
            <div className={styles.infoCardList}>
              <article className={styles.infoCard}>
                <div>
                  <h2>강의 정보 및 시간표</h2>
                  <p>
                    강의의 주요 내용과 수업 관련 정보를
                    <br />
                    한눈에 확인할 수 있습니다.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  알아보기
                </button>
              </article>

              <article className={styles.infoCard}>
                <div>
                  <h2>강의 평가 알아보기</h2>
                  <p>
                    실제 수강생들의 강의 평가와 후기를 통해
                    <br />
                    과목의 특징을 미리 확인해 보세요.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  알아보기
                </button>
              </article>

              <article className={styles.infoCard}>
                <div>
                  <h2>보류 어떤 내용?</h2>
                  <p>
                    추후 제공할 기능에 대한 내용을
                    <br />이 영역에 작성할 수 있습니다.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  알아보기
                </button>
              </article>
            </div>
          )}

          {selectedTab === "grade" && (
            <div className={styles.infoCardList}>
              <article className={styles.infoCard}>
                <div>
                  <h2>나의 시험 성적 차트 확인하기</h2>

                  <p>
                    시험 성적을 차트로 한눈에 확인하고 과목
                    <br />별 성취도를 비교해 보세요.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  확인하기
                </button>
              </article>

              <article className={styles.infoCard}>
                <div>
                  <h2>나의 강의 정보 및 시간표</h2>

                  <p>
                    과목별 강의 일정과 수업 시간을 확인하고
                    <br />
                    학업 일정을 관리할 수 있습니다.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  확인하기
                </button>
              </article>

              <article className={styles.infoCard}>
                <div>
                  <h2>나의 장바구니</h2>

                  <p>
                    관심 강의 정보를 저장해 확인하며 나에게
                    <br />
                    맞는 수강 과목을 계획할 수 있습니다.
                  </p>
                </div>

                <button type="button" className={styles.moreButton}>
                  확인하기
                </button>
              </article>
            </div>
          )}
        </div>
      </section>

      <section className={styles.introductionSection}>
        <div className={styles.introductionBox}>
          <div className={styles.introductionText}>
            <span>정보바다</span>
            <h2>
              정보바다는 학생들에게 필요한 정보를 한곳에 담아,
              <br />더 편리한 대학생활을 만들어갑니다.
            </h2>
            <button type="button">정보바다 소개 바로가기</button>
          </div>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className={styles.noticeContent}>
          <div className={styles.noticeTitle}>
            <h2>
              <span>새로운 공지</span>를 확인하세요
            </h2>
            <p>정보바다의 새로운 소식과 주요 안내사항을 한눈에 확인하세요</p>
          </div>

          <div className={styles.noticeList}>
            <article className={styles.noticeCard}>
              <h3>정보바다 1차 배포</h3>
              <p>
                안녕하세요! 드디어 정보바다의 1차 배포입니다.
                <br />
                대학생활에 필요한 다양한 정보를 한곳에서
                <br />
                편리하게 만나보세요!
              </p>
            </article>

            <article className={styles.noticeCard}>
              <h3>문의는 이메일로 남겨주세요</h3>
              <p>
                안녕하세요! 정보바다를 이용하면서 궁금한 점이나
                <br />
                정보 오류가 있다면 이메일로 문의 남겨주세요!
              </p>
            </article>

            <article className={styles.noticeCard}>
              <h3>문의는 이메일로 남겨주세요</h3>
              <p>
                사이트에 없는 궁금한 정보나 정보 오류가
                <br />
                있다면 이메일로 문의 남겨주세요!
              </p>
              <span className={styles.noticeEmail}>
                정보바다 전용 이메일 적어주세요
              </span>
            </article>

            <article className={styles.noticeCard}>
              <h3>문의는 이메일로 남겨주세요</h3>
              <p>
                사이트에 없는 궁금한 정보나 정보 오류가
                <br />
                있다면 이메일로 문의 남겨주세요!
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src={logoImg} className={styles.footerLogo} />
        <p>
          본 사이트는 인천대학교 학생들이 제작한 비공식 학과 정보 서비스입니다.
          <br />
          사이트에 제공되는 학사·행정 정보는 학교 및 학과 공식 채널과
          동일합니다.
        </p>
      </footer>
    </div>
  );
}

export default Course;
