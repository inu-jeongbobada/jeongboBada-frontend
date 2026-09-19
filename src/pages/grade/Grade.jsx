import { useState } from "react";
import { Info } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import CreditProgress from "../../components/CreditProgress";
import {
  graduationChecks,
  graduationRequirements,
  mockUser,
  semesterGpas,
} from "../../data/user";
import styles from "./Grade.module.css";

const MAX_GPA = 4.5;
const MAX_BAR_HEIGHT = 200;

const average = (values) => {
  const filled = values.filter((value) => value !== null);
  if (filled.length === 0) return null;
  return filled.reduce((sum, value) => sum + value, 0) / filled.length;
};

const formatGpa = (value) => (value === null ? "N.N" : value.toFixed(1));

function Grade() {
  const [showInfo, setShowInfo] = useState(false);

  const studiedYears = semesterGpas.filter(({ terms }) =>
    terms.some((gpa) => gpa !== null),
  ).length;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.top}>
          <section className={styles.profileCard}>
            <p>안녕하세요</p>
            <h2>{mockUser.name}님</h2>
            <div className={styles.profileMeta}>
              <span>{mockUser.grade}</span>
              <span>{mockUser.studentId}</span>
              <span>{mockUser.minor}</span>
            </div>

            <CreditProgress
              earned={mockUser.earnedCredits}
              required={mockUser.requiredCredits}
            />

            <dl className={styles.gpaList}>
              <div>
                <dt>최근 학기 평점</dt>
                <dd>{mockUser.recentGpa.toFixed(1)}</dd>
              </div>
              <div>
                <dt>전체 평점</dt>
                <dd>{mockUser.totalGpa.toFixed(1)}</dd>
              </div>
            </dl>
          </section>

          <section className={styles.requirementCard}>
            <div className={styles.requirementTitle}>
              <h2>나의 졸업 요건 현황</h2>
              <button
                type="button"
                aria-label="졸업 요건 안내"
                onClick={() => setShowInfo(true)}
              >
                <Info size={28} strokeWidth={2.5} />
              </button>
            </div>

            <div className={styles.requirementBody}>
              <dl className={styles.requirementList}>
                {graduationRequirements.map(({ label, earned, required }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>
                      {earned} / {required}
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className={styles.requirementList}>
                {graduationChecks.map(({ label, passed }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{passed ? "Y" : "N"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        <h2 className={styles.chartTitle}>
          {studiedYears}년차, 열심히 달리는 중
        </h2>

        <section className={styles.chart}>
          {semesterGpas.map(({ year, terms }) => (
            <div className={styles.group} key={year}>
              <div className={styles.groupHeader}>
                <strong>전체 평점</strong>
                <span>{formatGpa(average(terms))}</span>
              </div>

              <div className={styles.bars}>
                {terms.map((gpa, index) => (
                  <div className={styles.barItem} key={index}>
                    <span className={styles.barTerm}>{index + 1}학기</span>
                    <span className={styles.barValue}>{formatGpa(gpa)}</span>
                    <div
                      className={`${styles.bar} ${
                        gpa === null ? styles.emptyBar : ""
                      }`}
                      style={{
                        height:
                          gpa === null
                            ? 24
                            : Math.max(24, (gpa / MAX_GPA) * MAX_BAR_HEIGHT),
                      }}
                    />
                    <span className={styles.barLabel}>
                      {year} {index + 1}학기
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.group}>
            <div className={styles.groupHeader}>
              <strong>기타 학기</strong>
              <span>N.N</span>
            </div>

            <div className={styles.bars}>
              {["여름", "겨울"].map((term) => (
                <div className={styles.barItem} key={term}>
                  <span className={styles.barTerm}>{term}</span>
                  <span className={styles.barValue}>N.N</span>
                  <div className={`${styles.bar} ${styles.emptyBar}`} />
                  <span className={styles.barLabel}>{term} 계절학기</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showInfo && (
        <Modal
          title="졸업 요건 안내"
          onClose={() => setShowInfo(false)}
          actions={<button onClick={() => setShowInfo(false)}>확인</button>}
        >
          <ul className={styles.infoList}>
            <li>졸업 요건은 입학 연도의 교육과정에 따라 달라질 수 있습니다.</li>
            <li>
              현황은 직접 입력한 학점 정보를 기준으로 계산되며, 학교 공식 학사
              정보와 다를 수 있습니다.
            </li>
            <li>
              정확한 졸업 요건은 학과 사무실 및 학교 공식 채널에서 확인해
              주세요.
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default Grade;
