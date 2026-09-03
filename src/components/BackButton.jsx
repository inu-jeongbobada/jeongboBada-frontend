import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./BackButton.module.css";

function BackButton({ onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  return (
    <button type="button" className={styles.backButton} onClick={handleClick}>
      <ArrowLeft size={44} strokeWidth={2} />
    </button>
  );
}

export default BackButton;
