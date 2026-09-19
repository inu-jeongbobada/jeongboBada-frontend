import styles from "./Timetable.module.css";

const DAYS = ["월", "화", "수", "목", "금"];
const START_HOUR = 9;
const END_HOUR = 18;
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, index) => START_HOUR + index,
);

function Timetable({ blocks = [] }) {
  const totalHours = END_HOUR - START_HOUR;

  return (
    <div className={styles.timetable}>
      <div className={styles.head}>
        <span />
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.times}>
          {HOURS.map((hour) => (
            <span key={hour}>{String(hour).padStart(2, "0")}</span>
          ))}
        </div>

        <div className={styles.grid}>
          {HOURS.map((hour) =>
            DAYS.map((day) => (
              <div key={`${hour}-${day}`} className={styles.cell} />
            )),
          )}

          {blocks.map((block) => (
            <div
              key={block.id}
              className={styles.block}
              style={{
                top: `${((block.start - START_HOUR) / totalHours) * 100}%`,
                height: `${((block.end - block.start) / totalHours) * 100}%`,
                left: `${block.day * 20}%`,
              }}
            >
              <strong>{block.title}</strong>
              <span>{block.room}</span>
              <span>{block.location}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timetable;
