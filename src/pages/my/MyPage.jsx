import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreditProgress from "../../components/CreditProgress";
import useLectureIds from "../../hooks/useLectureIds";
import { lectures } from "../../data/lectures";
import { gradeOptions, gradePoints, mockUser } from "../../data/user";
import styles from "./MyPage.module.css";

const sideMenus = [
  { id: "grade-info", label: "학점 정보" },
  { id: "cart-list", label: "나의 장바구니 내역" },
  { id: "my-reviews", label: "나의 강의평가" },
];

const initialRows = [
  { id: 1, name: "전공과목 1", credit: 3, grade: "A+", major: true, liberal: false },
  { id: 2, name: "전공과목 2", credit: 3, grade: "B+", major: true, liberal: false },
  { id: 3, name: "교양과목 1", credit: 2, grade: "A0", major: false, liberal: true },
];

function MyPage() {
  const navigate = useNavigate();
  const cart = useLectureIds("cart");
  const [rows, setRows] = useState(initialRows);
  const [avatarUrl, setAvatarUrl] = useState("");
  const nextRowId = useRef(initialRows.length + 1);
  const photoInputRef = useRef(null);

  const cartLectures = lectures.filter((lecture) =>
    cart.ids.includes(lecture.id),
  );

  const graded = rows.filter((row) => row.credit > 0);
  const gradedCredits = graded.reduce((sum, row) => sum + row.credit, 0);
  const gpa =
    gradedCredits === 0
      ? 0
      : graded.reduce((sum, row) => sum + row.credit * gradePoints[row.grade], 0) /
        gradedCredits;
  const sumCredits = (filter) =>
    rows.filter(filter).reduce((sum, row) => sum + row.credit, 0);
  const majorCredits = sumCredits((row) => row.major);
  const liberalCredits = sumCredits((row) => row.liberal);
  const earnedCredits = sumCredits((row) => row.grade !== "F");

  const updateRow = (id, patch) =>
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      {
        id: nextRowId.current++,
        name: "",
        credit: 0,
        grade: "A+",
        major: false,
        liberal: false,
      },
    ]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2>마이페이지</h2>
          <nav>
            {sideMenus.map((menu) => (
              <button
                type="button"
                key={menu.id}
                onClick={() => scrollTo(menu.id)}
              >
                {menu.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          <p className={styles.hello}>안녕하세요</p>
          <h1 className={styles.title}>{mockUser.name}님의 바다입니다</h1>

          <section className={styles.profileCard}>
            <div className={styles.avatarWrap}>
              <div
                className={styles.avatar}
                style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : {}}
              />
              <button
                type="button"
                className={styles.cameraButton}
                aria-label="프로필 사진 변경"
                onClick={() => photoInputRef.current?.click()}
              >
                <Camera size={22} strokeWidth={2} />
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </div>

            <div className={styles.profileInfo}>
              <strong>{mockUser.name}</strong>
              <p>
                <span>{mockUser.major}</span>
                <span>{mockUser.grade}</span>
                <span>{mockUser.studentId}</span>
                <span>{mockUser.minor}</span>
              </p>
              <button type="button" onClick={() => navigate("/grade")}>
                학점 정보 입력 바로가기
              </button>
            </div>

            <div className={styles.profileCredit}>
              <CreditProgress
                earned={mockUser.earnedCredits}
                required={mockUser.requiredCredits}
              />
              <dl>
                <div>
                  <dt>최근 학기 평균 학점</dt>
                  <dd>{mockUser.recentGpa.toFixed(1)}</dd>
                </div>
                <div>
                  <dt>전체 평균 학점</dt>
                  <dd>{mockUser.totalGpa.toFixed(1)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section id="cart-list" className={styles.section}>
            <h2>나의 장바구니 목록</h2>
            <button
              type="button"
              className={styles.linkText}
              onClick={() => navigate("/course/cart")}
            >
              장바구니 불러오기
            </button>

            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>학년</th>
                  <th>교수명</th>
                  <th>과목명</th>
                  <th>분류</th>
                  <th>시간</th>
                  <th>학점</th>
                </tr>
              </thead>
              <tbody>
                {cartLectures.map((lecture) => (
                  <tr key={lecture.id}>
                    <td>{lecture.grade}</td>
                    <td>{lecture.professor}</td>
                    <td>{lecture.name}</td>
                    <td>{lecture.category}</td>
                    <td>{lecture.schedule}</td>
                    <td>{lecture.credit}</td>
                  </tr>
                ))}
                {cartLectures.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyCell}>
                      장바구니가 비어 있습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <button
              type="button"
              className={styles.pillButton}
              onClick={() => navigate("/course/cart")}
            >
              장바구니 바로가기
            </button>
          </section>

          <section id="grade-info" className={styles.section}>
            <h2>나의 학점</h2>
            <p className={styles.gradeSummary}>
              <span>
                평점 <em>{gpa.toFixed(1)}</em>
              </span>
              <span>
                전공 <em>{majorCredits}</em>
              </span>
              <span>
                교양 <em>{liberalCredits}</em>
              </span>
              <span>
                취득 <em>{earnedCredits}</em>
              </span>
            </p>

            <div className={styles.gradeBox}>
              <table className={styles.gradeTable}>
                <thead>
                  <tr>
                    <th>전공 과목</th>
                    <th>학점</th>
                    <th>성적</th>
                    <th>전공</th>
                    <th>교양</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          value={row.name}
                          aria-label="과목명"
                          onChange={(e) =>
                            updateRow(row.id, { name: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={9}
                          value={row.credit}
                          aria-label="학점"
                          onChange={(e) =>
                            updateRow(row.id, {
                              credit: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={row.grade}
                          aria-label="성적"
                          onChange={(e) =>
                            updateRow(row.id, { grade: e.target.value })
                          }
                        >
                          {gradeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={row.major}
                          aria-label="전공"
                          onChange={(e) =>
                            updateRow(row.id, { major: e.target.checked })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={row.liberal}
                          aria-label="교양"
                          onChange={(e) =>
                            updateRow(row.id, { liberal: e.target.checked })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.gradeActions}>
                <button type="button" onClick={addRow}>
                  수업 추가하기
                </button>
                <button type="button" onClick={() => setRows([])}>
                  모두 삭제
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.pillButton} ${styles.gradeButton}`}
              onClick={() => navigate("/course/timetable")}
            >
              시간표 가져오기
            </button>
          </section>
        </main>
      </div>

      <section id="my-reviews" className={styles.reviewSection}>
        <div className={styles.reviewInner}>
          <h2>나의 강의평가</h2>
          <div className={styles.reviewCards}>
            <article>
              <div>
                <h3>내가 쓴 강의평가 확인하기</h3>
                <p>글을 삭제하거나 수정할 수 있습니다</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/my/reviews?type=lecture")}
              >
                강의평가 바로가기
              </button>
            </article>
            <article>
              <div>
                <h3>내가 쓴 교수평가 확인하기</h3>
                <p>글을 삭제하거나 수정할 수 있습니다</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/my/reviews?type=professor")}
              >
                교수평가 바로가기
              </button>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyPage;
