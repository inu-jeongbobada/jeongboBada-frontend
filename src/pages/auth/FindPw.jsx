import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./FindPw.module.css";

function FindPw() {
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 비밀번호 찾기 API 연결
    setError(true);
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.findPwMain}>
        <div className={styles.findPwContent}>
          <p className={styles.guideText}>
            학번과 이메일을 입력한 후 <strong>비밀번호 찾기</strong> 버튼을
            클릭하세요
          </p>

          <form className={styles.findPwForm} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="이메일을 적어 주세요"
              />
            </div>

            <div className={styles.inputRow}>
              <label htmlFor="studentId">학번</label>
              <input
                id="studentId"
                type="text"
                inputMode="numeric"
                maxLength={9}
                value={studentId}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setStudentId(onlyNumbers);
                  setError(false);
                }}
                placeholder="학번을 적어주세요"
              />
            </div>

            <div className={styles.formBottom}>
              <div className={styles.messageArea}>
                {error && (
                  <p className={styles.errorMessage}>잘못 입력된 정보입니다</p>
                )}
              </div>

              <button type="submit" className={styles.findButton}>
                비밀번호 찾기
              </button>
            </div>
          </form>

          <Link to="/login" className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default FindPw;
