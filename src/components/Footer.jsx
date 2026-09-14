import { Search, ChevronRight } from "lucide-react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerText}>
        <p>모두가 쓰는 정보바다</p>
        <strong>UNI 인천대학교 정보통신학과에 관한 정보는 여기에서!</strong>
      </div>

      <Search className={styles.footerSearchIcon} strokeWidth={2.5} />

      <button type="button" className={styles.footerArrow}>
        <ChevronRight size={28} strokeWidth={2.5} />
      </button>
    </footer>
  );
}

export default Footer;
