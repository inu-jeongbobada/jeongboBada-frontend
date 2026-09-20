import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Header from "../../components/Header";
import styles from "./LabList.module.css";
import logoImg from "../../assets/logo.png";

function LabList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 임시 데이터
  // 추후 백엔드 API 데이터로 변경
  const labs = [
    {
      id: 1,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 2,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 3,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 4,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },

    {
      id: 5,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 6,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 7,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 8,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },

    {
      id: 9,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 10,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 11,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 12,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },

    {
      id: 13,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 14,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 15,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
    {
      id: 16,
      name: "연구실 이름",
      professor: "담당 교수",
      location: "연구실 위치",
      email: "이메일",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.title}>연구실 정보</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="button" className={styles.searchButton}>
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className={styles.labArea}>
          <div className={styles.labGrid}>
            {labs.map((lab) => (
              <button
                type="button"
                key={lab.id}
                className={styles.labCard}
                onClick={() => navigate(`/lab/${lab.id}`)}
              >
                <div className={styles.labImage} />
                <h2>{lab.name}</h2>
                <p className={styles.professor}>{lab.professor}</p>
                <div className={styles.cardBottom}>
                  <span>{lab.location}</span>
                  <span>{lab.email}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <footer className={styles.footer}>
          <img src={logoImg} className={styles.footerLogo} />

          <p>
            본 페이지의 연구실 정보는 학교에서 제공한 자료를 기반으로
            작성되었습니다.
            <br />
            위치 및 이메일은 변경될 수 있으며, 최신 정보는 학교 공식 홈페이지를
            통해 확인하시기 바랍니다.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default LabList;
