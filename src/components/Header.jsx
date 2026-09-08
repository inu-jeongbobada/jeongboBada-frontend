import { NavLink, useNavigate } from "react-router-dom";
import { Search, UserRound, Menu } from "lucide-react";
import styles from "./Header.module.css";
import logoImg from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img
        src={logoImg}
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      <nav className={styles.nav}>
        <NavLink
          to="/lab"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          연구실
        </NavLink>
        <NavLink
          to="/professor"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          교수님 정보
        </NavLink>
        <NavLink
          to="/course"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          전공 강의평
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          소통바다
        </NavLink>
      </nav>

      <div className={styles.rightMenu}>
        <span className={styles.my}>MY</span>
        <button type="button" className={styles.iconButton}>
          <Search size={24} strokeWidth={1.5} />
        </button>
        <button type="button" className={styles.iconButton}>
          <UserRound size={24} strokeWidth={1.5} />
        </button>
        <button type="button" className={styles.iconButton}>
          <Menu size={27} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}

export default Header;
