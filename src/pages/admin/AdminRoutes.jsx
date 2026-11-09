import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import AdminMembers from "./AdminMembers";

// /admin/* 하위 라우트. 권한 가드(AdminRoute)는 로그인 토큰 처리가 들어온 뒤 2단계에서 감싼다.
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="members" replace />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="*" element={<Navigate to="members" replace />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
