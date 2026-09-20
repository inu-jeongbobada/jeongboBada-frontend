import styles from "./CreditProgress.module.css";

function CreditProgress({ earned = 0, required = 140 }) {
  const percent = Math.min(100, (earned / required) * 100);

  return (
    <div className={styles.box}>
      <div className={styles.labels}>
        <span>
          <strong>학점</strong>
          <em>{earned}</em>
        </span>
        <span>
          <strong>졸업 학점</strong>
          <em>{required}</em>
        </span>
      </div>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
        <span className={styles.thumb} style={{ left: `${percent}%` }} />
      </div>
    </div>
  );
}

export default CreditProgress;
