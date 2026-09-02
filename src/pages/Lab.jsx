import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Lab.module.css";
import Header from "../components/Header";

function Lab() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(null); // 기본 화면 (null)

  const handleBack = () => {
    if (menu) setMenu(null);
    else navigate(-1);
  };

  const cards = [
    {
      id: "research",
      title: "연구 분야",
      description: "간단 설명",
    },
    {
      id: "project",
      title: "주요 연구 / 프로젝트",
      description: "간단 설명",
    },
    {
      id: "recruit",
      title: "모집 정보",
      description: "간단 설명",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <section
        className={menu ? `${styles.hero} ${styles.heroSelected}` : styles.hero}
      >
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          ←
        </button>

        <div className={styles.labInfo}>
          <h1 className={styles.labName}>연구실 이름</h1>
          <div className={styles.labDescription}>
            <p>연구실 설명</p>
            <p>연구실 URL</p>
          </div>
        </div>

        <div className={styles.professor}>
          <div className={styles.professorImage} />
          <h2>교수명</h2>
          <p>학과명</p>
          <p>전화번호</p>
        </div>
      </section>

      {/* 카드 선택하지 않은 경우 */}
      {!menu && (
        <main className={styles.mainContent}>
          <div className={styles.cardList}>
            {cards.map((card) => (
              <button
                type="button"
                key={card.id}
                className={styles.card}
                onClick={() => setMenu(card.id)}
              >
                <div className={styles.cardImage} />
                <div className={styles.cardText}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </button>
            ))}
          </div>

          <p className={styles.guideText}>
            자세한 설명을 보기를 원하시면
            <br />
            이미지를 클릭해주세요
          </p>
        </main>
      )}

      {/* 카드 선택한 경우 */}
      {menu && (
        <main className={styles.detailContent}>
          {/* 선택된 카드의 상세정보 */}
          <DetailSection type={menu} />

          {/* 선택되지 않은 나머지 카드 */}
          <div className={styles.smallCardList}>
            {cards
              .filter((card) => card.id !== menu)
              .map((card) => (
                <button
                  type="button"
                  key={card.id}
                  className={styles.smallCard}
                  onClick={() => setMenu(card.id)}
                >
                  <div className={styles.smallCardImage} />
                  <div className={styles.cardText}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </button>
              ))}
          </div>
        </main>
      )}
    </div>
  );
}

function DetailSection({ type }) {
  const detailData = {
    research: {
      title: "연구 분야",
      content: "연구 분야에 대한 자세한 설명",
    },

    project: {
      title: "주요 연구 / 프로젝트",
      content: "주요 연구 및 프로젝트에 대한 자세한 설명",
    },

    recruit: {
      title: "모집 정보",
      content: "연구실 모집 정보에 대한 자세한 설명",
    },
  };

  const data = detailData[type];

  return (
    <section className={styles.detailBox}>
      <div className={styles.detailHeader}>
        <span>{data.title}</span>
      </div>

      <div className={styles.detailBody}>
        <strong>자세한 설명</strong>
        <p>{data.content}</p>
      </div>
    </section>
  );
}

export default Lab;
