import { signup, checkNickname } from "../../api/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Info } from "lucide-react";

import Header from "../../components/Header";
import logoImg from "../../assets/logo.png";
import styles from "./Signup.module.css";
import studentIcon from "../../assets/student.png";

function Signup() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [showFileGuide, setShowFileGuide] = useState(false);

  // null: 중복 확인 전, "available": 사용 가능, "duplicate": 중복
  const [nicknameStatus, setNicknameStatus] = useState(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameStatus(null); // 닉네임 수정 -> 다시 중복 확인
  };

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await checkNickname(nickname.trim());

      if (response.data.available) {
        setNicknameStatus("available");
      } else {
        setNicknameStatus("duplicate");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);

      const message =
        error.response?.data?.message ||
        "닉네임 중복 확인 중 오류가 발생했습니다.";

      alert(message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nicknameStatus !== "available") {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (!nickname || !email || !studentId || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const data = await signup({
        studentId,
        password,
        nickname,
        email,
      });

      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);

      const message =
        error.response?.data?.message || "회원가입 중 오류가 발생하였습니다.";

      alert(message);
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.signupMain}>
        <img src={logoImg} className={styles.profileImage} />

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <label>닉네임</label>
            <div className={styles.nicknameWrapper}>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="ex. 물먹은 다람쥐"
              />

              <button
                type="button"
                className={styles.checkButton}
                onClick={handleNicknameCheck}
              >
                중복 확인
              </button>
            </div>

            {nicknameStatus === "available" && (
              <div className={styles.availableResult}>
                <Check size={28} strokeWidth={2} />
              </div>
            )}

            {nicknameStatus === "duplicate" && (
              <div className={styles.duplicateResult}>
                <X size={28} strokeWidth={2} />
                <span>다른 이용자가 사용 중 입니다</span>
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <label>이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex. abc123@inu.ac.kr"
            />
          </div>

          <div className={styles.inputRow}>
            <label>학번</label>
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
              placeholder="ex. 202701234"
            />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문 숫자 각 1개 이상 포함"
            />
          </div>

          <div className={styles.inputRow}>
            <label>파일 업로드</label>
            <label htmlFor="verificationFile" className={styles.fileInput}>
              {file ? file.name : "pdf, jpg 파일"}
            </label>
            <input
              id="verificationFile"
              type="file"
              accept=".pdf,.jpg,.jpeg"
              className={styles.hiddenFileInput}
              onChange={handleFileChange}
            />

            <div
              className={styles.infoIconWrapper}
              onMouseEnter={() => setShowFileGuide(true)}
              onMouseLeave={() => setShowFileGuide(false)}
            >
              {!showFileGuide && (
                <Info
                  className={styles.infoIcon}
                  size={28}
                  strokeWidth={2}
                  fill="#4564FA"
                />
              )}
            </div>

            {showFileGuide && (
              <div className={styles.guideOverlay}>
                <div className={styles.fileGuideModal}>
                  <div className={styles.guideText}>
                    <h3>신분 확인 서류 중 하나를 첨부해주세요.</h3>

                    <div className={styles.guideList}>
                      <p>재학 증명서</p>
                      <p>학생증</p>
                      <p>성적 증명서</p>
                      <p>등록금 납부 증명서</p>
                      <p>졸업 예정 증명서</p>
                    </div>
                  </div>

                  <img src={studentIcon} className={styles.studentIcon} />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className={styles.signupButton}>
            회원 가입
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;
