import { login } from "../../api/auth";

import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import styles from "./Login.module.css";
import logoImg from "../../assets/logo.png";

function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !password) {
      alert("학번과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await login({
        studentId,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);

      const message =
        error.response?.data?.message || "로그인에 실패하였습니다.";

      alert(message);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.loginMain}>
        <img src={logoImg} className={styles.profileImage} />
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <label>학번</label>
            <input
              id="studentId"
              type="text"
              maxLength={9}
              value={studentId}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                setStudentId(onlyNumbers);
              }}
              placeholder="ex. 202701234"
            />
          </div>

          <div className={styles.inputRow}>
            <label>비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문 숫자 각 1개 이상 포함"
            />
          </div>

          <div className={styles.loginActions}>
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>

            <div className={styles.helpActions}>
              <Link to="/find-password" className={styles.findPassword}>
                계정을 잃어버렸어요
              </Link>

              <Link to="/signup" className={styles.signupLink}>
                아직 계정이 없으신가요?
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
