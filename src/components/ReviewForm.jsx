import { useRef, useState } from "react";
import StarRating from "./StarRating";
import styles from "./ReviewForm.module.css";

const semesterOptions = [
  "2026년 2학기",
  "2026년 1학기",
  "2025년 2학기",
  "2025년 1학기",
  "2024년 2학기",
  "2024년 1학기",
];

function ReviewForm({
  questions,
  initialValues,
  maxLength = 1000,
  showOverall = false,
  showSemester = false,
  showFile = false,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState({
    semester: "",
    overall: 0,
    ratings: {},
    anonymous: false,
    content: "",
    fileName: "",
    ...initialValues,
  });
  const fileInputRef = useRef(null);

  const update = (patch) => setValues((prev) => ({ ...prev, ...patch }));

  const handleRating = (questionId, score) =>
    update({ ratings: { ...values.ratings, [questionId]: score } });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {showOverall && (
        <div className={styles.overall}>
          <StarRating
            value={values.overall}
            size={54}
            gap={22}
            onChange={(overall) => update({ overall })}
          />
          <span>{values.overall.toFixed(1)} / 5.0</span>
        </div>
      )}

      {showSemester && (
        <section className={styles.section}>
          <h3>수강 학기 선택</h3>
          <select
            className={styles.select}
            value={values.semester}
            onChange={(e) => update({ semester: e.target.value })}
          >
            <option value="">학기 선택</option>
            {semesterOptions.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </section>
      )}

      <div className={styles.questions}>
        {questions.map((question) => (
          <div className={styles.question} key={question.id}>
            <h3>{question.title}</h3>
            <div className={styles.ratingControl}>
              <div className={styles.ratingDots}>
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    type="button"
                    key={score}
                    aria-label={`${score}점`}
                    className={`${styles.ratingDot} ${
                      (values.ratings[question.id] ?? 0) >= score
                        ? styles.selectedDot
                        : ""
                    }`}
                    style={{
                      width: `${8 + score * 2}px`,
                      height: `${8 + score * 2}px`,
                    }}
                    onClick={() => handleRating(question.id, score)}
                  />
                ))}
              </div>
              <div className={styles.ratingLabels}>
                <span>{question.left}</span>
                <span>{question.right}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showFile && (
        <section className={styles.section}>
          <h3>강의 자료를 첨부해 주세요</h3>
          <div className={styles.fileRow}>
            <button
              type="button"
              className={styles.fileButton}
              onClick={() => fileInputRef.current?.click()}
            >
              파일 첨부
            </button>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) =>
                update({ fileName: e.target.files?.[0]?.name ?? "" })
              }
            />
            <span className={styles.fileName}>{values.fileName}</span>
          </div>
        </section>
      )}

      <label className={styles.anonymous}>
        <input
          type="checkbox"
          checked={values.anonymous}
          onChange={(e) => update({ anonymous: e.target.checked })}
        />
        <span className={styles.checkbox}>{values.anonymous && "✓"}</span>
        <span>익명</span>
      </label>

      <div className={styles.textareaBox}>
        <textarea
          value={values.content}
          maxLength={maxLength}
          onChange={(e) => update({ content: e.target.value })}
          placeholder="객관적인 의견을 작성해 주세요. 욕설·비방·개인정보가 포함된 내용은 삭제될 수 있습니다"
        />
        <span className={styles.count}>
          {values.content.length} / {maxLength}
        </span>
      </div>

      <div className={styles.buttons}>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            취소
          </button>
        )}
        <button type="submit" className={styles.submitButton}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
