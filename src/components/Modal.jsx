import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

function Modal({ title, children, actions, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="닫기"
          onClick={onClose}
        >
          <X size={22} strokeWidth={2} />
        </button>

        {title && <h3>{title}</h3>}
        <div className={styles.body}>{children}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}

export default Modal;
