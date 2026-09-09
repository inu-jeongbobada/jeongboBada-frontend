import { NavLink, useNavigate } from "react-router-dom";
import { Search, UserRound, Lock } from "lucide-react";
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
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          홈
        </NavLink>
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
      </nav>

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton}>
          <Search size={24} strokeWidth={1.8} />
        </button>
        <NavLink to="/my" className={styles.iconButton}>
          <UserRound size={24} strokeWidth={1.8} />
        </NavLink>
        <NavLink to="/login" className={styles.iconButton}>
          <Lock size={24} strokeWidth={1.8} />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
