import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./FindPw.module.css";
import lockKey from "../../assets/lock.png";

function FindPw() {
  const navigate = useNavigate();

  const [modalStep, setModalStep] = useState(null);

  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !studentId) {
      alert("이메일과 학번을 입력해주세요.");
      return;
    }

    // TODO: 인증번호 전송 API 연동

    setModalStep("verify");
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    // TODO: 인증번호 확인 API 연동

    setModalStep("password");
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 비밀번호 재설정 API 연동

    alert("비밀번호가 재설정되었습니다.");
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.findPwMain}>
        <div className={styles.findPwContent}>
          <p className={styles.guideText}>
            학번과 이메일을 입력한 후 <strong>인증코드 받기</strong> 버튼을
            클릭하세요
          </p>

          <form className={styles.findPwForm} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <label htmlFor="email">이메일</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                }}
                placeholder="학번을 적어주세요"
              />
            </div>

            <div className={styles.formBottom}>
              <div className={styles.messageArea} />

              <button type="submit" className={styles.findButton}>
                인증코드 받기
              </button>
            </div>
          </form>

          <Link to="/login" className={styles.loginLink}>
            로그인
          </Link>

          <div className={styles.infoState}>
            <p className={styles.infoMessage}>
              이메일이 전송되지 않았다면 입력한 이메일 주소를 다시 확인하거나
              스팸함을 확인해주세요.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>

      {modalStep === "verify" && (
        <div className={styles.modalOverlay}>
          <div className={styles.verifyModal}>
            <h2 className={styles.verifyTitle}>
              <span>인증번호</span>를 입력해주세요
            </h2>

            <div className={styles.verifyDescription}>
              <p>이메일로 전송된 인증번호를 입력해주세요.</p>
              <p>메일이 보이지 않는 경우 스팸함을 확인해주세요.</p>
            </div>

            <div className={styles.verifyInputRow}>
              <img src={lockKey} className={styles.lockIcon} />

              <input
                type="text"
                inputMode="numeric"
                value={verificationCode}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

                  setVerificationCode(onlyNumbers);
                }}
                className={styles.verifyInput}
              />

              <button
                type="button"
                className={styles.resetButton}
                onClick={handleVerifyCode}
              >
                비밀번호 재설정하기
              </button>
            </div>
          </div>
        </div>
      )}

      {modalStep === "password" && (
        <div className={styles.modalOverlay}>
          <div className={styles.passwordModal}>
            <div className={styles.passwordModalHeader}>
              <h2>
                비밀번호 <span>재설정</span>
              </h2>
              <p>보안을 위한 8자 새로운 비밀번호를 입력하세요</p>
            </div>

            <div className={styles.passwordForm}>
              <div className={styles.passwordRow}>
                <label htmlFor="newPassword">비밀번호</label>

                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="영문·숫자 포함 8자 이상"
                />
              </div>

              <div className={styles.passwordRow}>
                <label htmlFor="confirmPassword">비밀번호 확인</label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="영문·숫자 포함 8자 이상"
                />
              </div>

              <button
                type="button"
                className={styles.loginButton}
                onClick={handleResetPassword}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindPw;
