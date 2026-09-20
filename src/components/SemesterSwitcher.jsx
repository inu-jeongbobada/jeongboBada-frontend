import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SemesterSwitcher.module.css";

const shiftSemester = ({ year, term }, step) => {
  const index = year * 2 + (term - 1) + step;
  return { year: Math.floor(index / 2), term: (index % 2) + 1 };
};

function SemesterSwitcher({ value, onChange }) {
  return (
    <div className={styles.switcher}>
      <button
        type="button"
        aria-label="이전 학기"
        onClick={() => onChange(shiftSemester(value, -1))}
      >
        <ChevronLeft size={28} strokeWidth={3} />
      </button>
      <h1>
        {value.year}년 {value.term}학기
      </h1>
      <button
        type="button"
        aria-label="다음 학기"
        onClick={() => onChange(shiftSemester(value, 1))}
      >
        <ChevronRight size={28} strokeWidth={3} />
      </button>
    </div>
  );
}

export default SemesterSwitcher;
