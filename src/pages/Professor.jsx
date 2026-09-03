import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Header from "../components/Header";
import styles from "./Professor.module.css";
import logoImg from "../assets/logo.png";

function Professor() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 임시 데이터
  // 추후 백엔드 API 데이터로 변경
  const professors = [
    {
      id: 1,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 2,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 3,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 4,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },

    {
      id: 5,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 6,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 7,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 8,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },

    {
      id: 9,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 10,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 11,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 12,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },

    {
      id: 13,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 14,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 15,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
    {
      id: 16,
      name: "교수명",
      department: "학과명",
      subject1: "담당 과목",
      subject2: "담당 과목",
      location: "연구실 위치",
      phone: "전화번호",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.title}>교수님 정보</h1>

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

        <div className={styles.professorArea}>
          <div className={styles.filterList}>
            <button
              type="button"
              className={
                filter === "all"
                  ? `${styles.filterButton} ${styles.activeFilter}`
                  : styles.filterButton
              }
              onClick={() => setFilter("all")}
            >
              전체
            </button>

            <button
              type="button"
              className={
                filter === "department"
                  ? `${styles.filterButton} ${styles.activeFilter}`
                  : styles.filterButton
              }
              onClick={() => setFilter("department")}
            >
              학과별
            </button>

            <button
              type="button"
              className={
                filter === "subject"
                  ? `${styles.filterButton} ${styles.activeFilter}`
                  : styles.filterButton
              }
              onClick={() => setFilter("subject")}
            >
              담당과목별
            </button>
          </div>

          <div className={styles.professorGrid}>
            {professors.map((professor) => (
              <button
                type="button"
                key={professor.id}
                className={styles.professorCard}
                onClick={() => navigate(`/professor/${professor.id}`)}
              >
                <div className={styles.professorImage} />
                <h2>{professor.name}</h2>
                <p className={styles.department}>{professor.department}</p>
                <div className={styles.subjectList}>
                  <span>{professor.subject1}</span>
                  <span>{professor.subject2}</span>
                </div>
                <div className={styles.cardBottom}>
                  <span>{professor.location}</span>
                  <span>{professor.phone}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <footer className={styles.footer}>
          <img src={logoImg} className={styles.footerLogo} />

          <p>
            본 페이지의 교수진 정보는 학교에서 제공한 자료를 기반으로
            작성되었습니다.
            <br />
            소속 및 연락처는 변경될 수 있으며, 최신 정보는 학교 공식 홈페이지를
            통해
            <br />
            확인하시기 바랍니다.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Professor;
