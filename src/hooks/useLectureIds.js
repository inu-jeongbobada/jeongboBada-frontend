import { useCallback, useEffect, useState } from "react";

const readIds = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

// TODO : API 연동 전까지 장바구니/시간표를 localStorage에 임시 저장
function useLectureIds(key) {
  const [ids, setIds] = useState(() => readIds(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 메모리 상태만 유지
    }
  }, [key, ids]);

  const add = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [],
  );

  const remove = useCallback(
    (id) => setIds((prev) => prev.filter((item) => item !== id)),
    [],
  );

  return { ids, add, remove, set: setIds };
}

export default useLectureIds;
