import { NavLink, Outlet } from "react-router-dom";

import styles from "./AdminLayout.module.css";
import logoImg from "../../assets/logo.png";

// path가 없는 메뉴는 아직 구현 전이라 비활성(클릭 불가)으로 둔다.
const MENUS = [
  { label: "대시보드" },
  { label: "가입 승인" },
  { label: "회원 관리", path: "/admin/members" },
  { label: "강의·교수 관리" },
  { label: "후기 관리" },
  { label: "신고 관리" },
  { label: "학습자료 관리" },
  { label: "운영 설정" },
  { label: "관리자·감사 로그" },
];

function AdminLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src={logoImg} alt="" className={styles.logo} />
          <div>
            <p className={styles.brandName}>정보바다</p>
            <p className={styles.brandSub}>관리자</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="관리자 메뉴">
          {MENUS.map((menu) =>
            menu.path ? (
              <NavLink
                key={menu.label}
                to={menu.path}
                className={({ isActive }) =>
                  `${styles.menu} ${isActive ? styles.active : ""}`
                }
              >
                {menu.label}
              </NavLink>
            ) : (
              <span
                key={menu.label}
                className={`${styles.menu} ${styles.disabled}`}
                aria-disabled="true"
                title="준비 중인 메뉴입니다"
              >
                {menu.label}
              </span>
            ),
          )}
        </nav>

        <div className={styles.footer}>
          <span>관리자</span>
          <NavLink to="/" className={styles.footerLink}>
            사이트로 이동
          </NavLink>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
