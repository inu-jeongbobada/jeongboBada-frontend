import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Search,
  ExternalLink,
  Bell,
  UserRound,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Header from "../components/Header";
import styles from "./Home.module.css";
import logoImg from "../assets/logo.png";
import bookImg from "../assets/book-single.png";
import fileImg from "../assets/filetext.png";
import searchImg from "../assets/search.png";

function Home() {
  const navigate = useNavigate();

  const [noticePage, setNoticePage] = useState(0);

  const notices = [
    {
      id: 1,
      title: "문의는 이메일로 남겨주세요",
      description:
        "사이트에 없는 궁금한 정보나 정보 오류가 있다면 이메일로 문의 남겨주세요!",
      email: "정보바다 전용 이메일",
      icon: Mail,
    },
    {
      id: 2,
      title: "정보바다 1차 배포",
      description:
        "안녕하세요! 드디어 정보바다의 1차 배포입니다. 대학생활에 필요한 다양한 정보를 한곳에서 편리하게 만나보세요.",
      icon: Bell,
    },
    {
      id: 3,
      title: "추가 인원 상시 모집",
      description:
        "별도의 지원금은 제공되지 않으며, 활동에 따른 비용이 발생할 수 있습니다. 참여 및 비용 부담 가능 여부를 확인 후 지원해 주시기 바랍니다.",
      icon: UserRound,
    },
    {
      id: 4,
      title: "새로운 서비스 준비 중",
      description:
        "학생들에게 필요한 새로운 기능과 서비스를 준비하고 있습니다.",
      icon: Bell,
    },
    {
      id: 5,
      title: "문의는 이메일로 남겨주세요",
      description: "서비스 이용 중 궁금한 사항이 있다면 이메일로 문의해주세요.",
      icon: Mail,
    },
    {
      id: 6,
      title: "정보바다 업데이트",
      description:
        "더 편리한 정보 제공을 위해 정보바다 서비스를 개선하고 있습니다.",
      icon: Bell,
    },
  ];

  const visibleNotices = notices.slice(noticePage * 3, noticePage * 3 + 3);
  const totalNoticePages = Math.ceil(notices.length / 3);

  const handlePreviousNotice = () => {
    setNoticePage((current) =>
      current === 0 ? totalNoticePages - 1 : current - 1,
    );
  };

  const handleNextNotice = () => {
    setNoticePage((current) =>
      current === totalNoticePages - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>DIVE INTO INFORMATION</h1>
          <p className={styles.heroSubTitle}>Discover, Connect, Explore</p>
          <p className={styles.heroDescription}>
            Endless information, countless possibilities.
            <br />
            Take a deeper look and find something new.
          </p>

          <button
            type="button"
            className={styles.diveButton}
            onClick={() => navigate("/community")}
          >
            DIVE
          </button>
        </div>
      </section>

      <section id="shortcut" className={styles.shortcutSection}>
        <div className={styles.container}>
          <div className={styles.shortcutTitle}>
            <h2>정보바다에 처음 오셨나요?</h2>
            <p>학생들이 자주 찾는 서비스예요.</p>
          </div>

          <div className={styles.shortcutList}>
            <button
              type="button"
              className={styles.shortcutCard}
              onClick={() => navigate("/lab")}
            >
              <ExternalLink
                className={styles.externalIcon}
                size={48}
                strokeWidth={2}
              />

              <img
                src={bookImg}
                className={`${styles.cardIcon} ${styles.labIcon}`}
              />

              <div className={styles.shortcutText}>
                <span>
                  연구실 정보 <br />
                  바로가기
                </span>
              </div>
            </button>

            <button
              type="button"
              className={styles.shortcutCard}
              onClick={() => navigate("/professor")}
            >
              <ExternalLink
                className={styles.externalIcon}
                size={48}
                strokeWidth={2}
              />

              <img
                src={fileImg}
                className={`${styles.cardIcon} ${styles.professorIcon}`}
              />

              <div className={styles.shortcutText}>
                <span>
                  교수 정보 <br />
                  바로가기
                </span>
              </div>
            </button>

            <button
              type="button"
              className={styles.shortcutCard}
              onClick={() => navigate("/grade")}
            >
              <ExternalLink
                className={styles.externalIcon}
                size={48}
                strokeWidth={2}
              />

              <div className={styles.gradeIcon}>
                <span className={styles.gradeFour}>4.0</span>
                <span className={styles.gradeThree}>3.5</span>
              </div>

              <div className={styles.shortcutText}>
                <span>
                  내 학점 <br />
                  바로가기
                </span>
              </div>
            </button>

            <button
              type="button"
              className={styles.shortcutCard}
              onClick={() => navigate("/course")}
            >
              <ExternalLink
                className={styles.externalIcon}
                size={48}
                strokeWidth={2}
              />

              <img
                src={searchImg}
                className={`${styles.cardIcon} ${styles.lectureIcon}`}
              />

              <div className={styles.shortcutText}>
                <span>
                  강의 정보 <br />
                  바로가기
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className={styles.noticeContainer}>
          <div className={styles.noticeTitle}>
            <h2>
              <span>새로운 공지</span>를 확인하세요
            </h2>
            <p>정보바다의 새로운 소식과 주요 안내사항을 한눈에 확인하세요</p>
          </div>

          <div className={styles.slider}>
            <button
              type="button"
              className={styles.sliderButton}
              onClick={handlePreviousNotice}
            >
              <ChevronLeft size={56} strokeWidth={2.3} />
            </button>

            <div className={styles.noticeList}>
              {visibleNotices.map((notice) => {
                const Icon = notice.icon;
                return (
                  <article key={notice.id} className={styles.noticeCard}>
                    <div className={styles.noticeText}>
                      <h3>{notice.title}</h3>
                      <p>{notice.description}</p>
                      <span>{notice.email}</span>
                    </div>
                    <Icon
                      className={styles.noticeIcon}
                      size={64}
                      strokeWidth={1.8}
                    />
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.sliderButton}
              onClick={handleNextNotice}
            >
              <ChevronRight size={56} strokeWidth={2.3} />
            </button>
          </div>

          <div className={styles.pagination}>
            {Array.from({ length: totalNoticePages }).map((_, index) => (
              <button
                type="button"
                key={index}
                className={
                  noticePage === index
                    ? `${styles.dot} ${styles.activeDot}`
                    : styles.dot
                }
                onClick={() => setNoticePage(index)}
              />
            ))}
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

export default Home;
