import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { categories } from "../data/lectures";
import styles from "./LectureBrowser.module.css";

const sortTabs = [
  { id: "grade", label: "학년별" },
  { id: "professor", label: "교수명" },
  { id: "department", label: "학과" },
];

const sorters = {
  grade: (a, b) => a.grade - b.grade,
  professor: (a, b) => a.professor.localeCompare(b.professor, "ko"),
  department: (a, b) => a.department.localeCompare(b.department, "ko"),
};

function LectureBrowser({
  lectures,
  selectedId,
  onSelect,
  renderActions,
  showArrows = false,
}) {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState(null);
  const tabRef = useRef(null);

  const query = keyword.trim();
  const visibleLectures = lectures
    .filter((lecture) => {
      if (categories.includes(activeTab) && lecture.category !== activeTab) {
        return false;
      }
      return [
        lecture.name,
        lecture.professor,
        lecture.code,
        lecture.category,
      ].some((text) => text.includes(query));
    })
    .sort(sorters[activeTab] ?? (() => 0));

  const handleTabClick = (tabId) => {
    setActiveTab((current) => (current === tabId ? null : tabId));
  };

  const scrollTabs = (direction) => {
    tabRef.current?.scrollBy({ left: direction * 160, behavior: "smooth" });
  };

  return (
    <div className={styles.browser}>
      <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="교과명, 교수명, 과목코드, 과목분류 검색"
        />
        <button type="submit" aria-label="검색">
          <Search size={20} strokeWidth={2.5} />
        </button>
      </form>

      <div className={styles.tabs}>
        {showArrows && (
          <button
            type="button"
            aria-label="이전 분류"
            onClick={() => scrollTabs(-1)}
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
        )}

        <div className={styles.tabList} ref={tabRef}>
          {[...sortTabs, ...categories.map((id) => ({ id, label: id }))].map(
            (tab) => (
              <button
                type="button"
                key={tab.id}
                className={activeTab === tab.id ? styles.activeTab : ""}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ),
          )}
        </div>

        {showArrows && (
          <button
            type="button"
            aria-label="다음 분류"
            onClick={() => scrollTabs(1)}
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>
        )}
      </div>

      <div className={styles.listWrap}>
        <ul className={styles.list}>
          {visibleLectures.map((lecture) => {
            const selected = lecture.id === selectedId;

            return (
              <li
                key={lecture.id}
                className={`${styles.item} ${selected ? styles.selected : ""}`}
              >
                <button
                  type="button"
                  className={styles.itemBody}
                  onClick={() => onSelect?.(lecture.id)}
                >
                  <span className={styles.itemTop}>
                    <strong>{lecture.name}</strong>
                    <span>{lecture.code}</span>
                  </span>
                  <span className={styles.professor}>{lecture.professor}</span>
                  <span className={styles.meta}>
                    {`${lecture.credit}학점 ${lecture.grade}학년 ${lecture.category} ${lecture.schedule}`}
                  </span>
                </button>

                {selected && renderActions && (
                  <div className={styles.actions}>{renderActions(lecture)}</div>
                )}
              </li>
            );
          })}

          {visibleLectures.length === 0 && (
            <li className={styles.empty}>검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default LectureBrowser;
