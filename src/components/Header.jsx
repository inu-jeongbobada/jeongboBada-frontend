import { Search, UserRound, Menu } from "lucide-react";
import styles from "./Header.module.css";
import logoImg from "../assets/logo.png";

function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImg} className={styles.logo} />

      <nav className={styles.nav}>
        <a href="/lab">연구실</a>
        <a href="#">교수님 정보</a>
        <a href="#">전공 강의평</a>
        <a href="#">소통바다</a>
      </nav>

      <div className={styles.rightMenu}>
        <span className={styles.my}>MY</span>
        <button type="button" className={styles.iconButton}>
          <Search size={24} />
        </button>
        <button type="button" className={styles.iconButton}>
          <UserRound size={24} />
        </button>
        <button type="button" className={styles.iconButton}>
          <Menu size={27} />
        </button>
      </div>
    </header>
  );
}

export default Header;
