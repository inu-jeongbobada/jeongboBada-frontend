import styles from "./StarRating.module.css";

function StarRating({ value = 0, size = 28, gap = 8, onChange }) {
  return (
    <div className={styles.stars} style={{ gap }}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, value - index)) * 100;
        const star = (
          <span
            className={styles.star}
            style={{
              width: size,
              height: size,
              background: `linear-gradient(90deg, #4564fa ${fill}%, #dedede ${fill}%)`,
            }}
          />
        );

        return onChange ? (
          <button
            type="button"
            key={index}
            className={styles.starButton}
            aria-label={`${index + 1}점`}
            onClick={() => onChange(index + 1)}
          >
            {star}
          </button>
        ) : (
          <span key={index}>{star}</span>
        );
      })}
    </div>
  );
}

export default StarRating;
