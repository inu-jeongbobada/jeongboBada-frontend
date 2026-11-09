import { useState } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./AdminMembers.module.css";
import {
  MEMBER_STATUS,
  MEMBER_STATUS_LABEL,
  SUSPEND_PERIODS,
  mockMembers,
} from "./mock/members";

const EMPTY_FILTER = { keyword: "", status: "ALL", report: "ALL" };

const REPORT_FILTERS = [
  { value: "ALL", label: "전체" },
  { value: "HAS", label: "있음" },
  { value: "NONE", label: "없음" },
];

// 정지를 걸 수 없는 상태 (이미 정지됐거나 정상 가입 회원이 아님)
const UNSUSPENDABLE = [
  MEMBER_STATUS.SUSPENDED,
  MEMBER_STATUS.PENDING,
  MEMBER_STATUS.REJECTED,
  MEMBER_STATUS.WITHDRAWN,
];

function matchesFilter(member, filter) {
  const keyword = filter.keyword.trim().toLowerCase();
  if (
    keyword &&
    ![member.nickname, member.studentId, member.email].some((value) =>
      value.toLowerCase().includes(keyword),
    )
  ) {
    return false;
  }
  if (filter.status !== "ALL" && member.status !== filter.status) return false;
  if (filter.report === "HAS" && member.reportCount === 0) return false;
  if (filter.report === "NONE" && member.reportCount > 0) return false;
  return true;
}

function todayString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
}

function StatusBadge({ status }) {
  return <span className={styles.badge}>{MEMBER_STATUS_LABEL[status]}</span>;
}

function Select({ id, value, onChange, children }) {
  return (
    <div className={styles.selectWrap}>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
      <ChevronDown size={16} className={styles.selectIcon} aria-hidden />
    </div>
  );
}

function AdminMembers() {
  // 가짜 데이터를 상태로 들고 있어서 잠금 해제·정지 결과가 화면에 바로 반영된다.
  const [members, setMembers] = useState(mockMembers);
  const [draftFilter, setDraftFilter] = useState(EMPTY_FILTER);
  const [filter, setFilter] = useState(EMPTY_FILTER);
  const [selectedId, setSelectedId] = useState(mockMembers[0]?.id ?? null);
  const [suspendPeriod, setSuspendPeriod] = useState(SUSPEND_PERIODS[0].value);
  const [suspendReason, setSuspendReason] = useState("");

  const visibleMembers = members.filter((m) => matchesFilter(m, filter));
  const selected = members.find((m) => m.id === selectedId) ?? null;

  const updateDraft = (key) => (value) =>
    setDraftFilter((prev) => ({ ...prev, [key]: value }));

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(draftFilter);
  };

  const handleReset = () => {
    setDraftFilter(EMPTY_FILTER);
    setFilter(EMPTY_FILTER);
  };

  const selectMember = (id) => {
    setSelectedId(id);
    setSuspendPeriod(SUSPEND_PERIODS[0].value);
    setSuspendReason("");
  };

  const updateMember = (id, patch) =>
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch(m) } : m)),
    );

  const handleUnlock = () => {
    if (!window.confirm(`${selected.nickname} 님의 로그인 잠금을 해제할까요?`))
      return;
    updateMember(selected.id, () => ({ status: MEMBER_STATUS.ACTIVE }));
  };

  const handleSuspend = (e) => {
    e.preventDefault();
    const reason = suspendReason.trim();
    const periodLabel = SUSPEND_PERIODS.find(
      (p) => p.value === suspendPeriod,
    ).label;
    if (
      !window.confirm(
        `${selected.nickname} 님을 ${periodLabel} 이용 정지할까요?\n사유: ${reason}`,
      )
    )
      return;
    updateMember(selected.id, (m) => ({
      status: MEMBER_STATUS.SUSPENDED,
      sanctions: [
        ...m.sanctions,
        { date: todayString(), type: `정지 ${periodLabel}`, reason },
      ],
    }));
    setSuspendReason("");
  };

  const canSuspend = selected && !UNSUSPENDABLE.includes(selected.status);

  return (
    <div className={styles.page}>
      <p className={styles.code}>C-1</p>
      <h1 className={styles.title}>회원 관리</h1>

      <form className={styles.filters} onSubmit={handleSearch}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>검색</span>
          <input
            type="search"
            className={`${styles.input} ${styles.searchInput}`}
            placeholder="학번, 닉네임, 이메일"
            value={draftFilter.keyword}
            onChange={(e) => updateDraft("keyword")(e.target.value)}
          />
        </label>

        <div className={styles.field}>
          <label htmlFor="admin-member-status" className={styles.fieldLabel}>
            상태
          </label>
          <Select
            id="admin-member-status"
            value={draftFilter.status}
            onChange={updateDraft("status")}
          >
            <option value="ALL">전체</option>
            {Object.values(MEMBER_STATUS).map((status) => (
              <option key={status} value={status}>
                {MEMBER_STATUS_LABEL[status]}
              </option>
            ))}
          </Select>
        </div>

        <div className={styles.field}>
          <label htmlFor="admin-member-report" className={styles.fieldLabel}>
            받은 신고
          </label>
          <Select
            id="admin-member-report"
            value={draftFilter.report}
            onChange={updateDraft("report")}
          >
            {REPORT_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <button type="submit" className={styles.primaryButton}>
          조회
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleReset}
        >
          초기화
        </button>
      </form>

      <div className={styles.content}>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>닉네임</th>
                <th>학번</th>
                <th>상태</th>
                <th>가입일</th>
                <th>최근 로그인</th>
                <th>후기</th>
                <th>자료</th>
                <th>받은 신고</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((member) => (
                <tr
                  key={member.id}
                  className={member.id === selectedId ? styles.selectedRow : ""}
                  onClick={() => selectMember(member.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectMember(member.id);
                    }
                  }}
                  tabIndex={0}
                  aria-selected={member.id === selectedId}
                >
                  <td>{member.nickname}</td>
                  <td>{member.studentId}</td>
                  <td>
                    <StatusBadge status={member.status} />
                  </td>
                  <td>{member.joinedAt ?? "-"}</td>
                  <td>{member.lastLoginAt ?? "-"}</td>
                  <td>{member.reviewCount}</td>
                  <td>{member.materialCount}</td>
                  <td>{member.reportCount}</td>
                </tr>
              ))}
              {visibleMembers.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    조건에 맞는 회원이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <section className={styles.panel} aria-label="회원 상세">
          {!selected ? (
            <p className={styles.panelEmpty}>
              목록에서 회원을 선택하면 상세 정보가 표시됩니다.
            </p>
          ) : (
            <>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>{selected.nickname}</h2>
                <StatusBadge status={selected.status} />
              </div>

              <dl className={styles.info}>
                <dt>학번</dt>
                <dd>{selected.studentId}</dd>
                <dt>이메일</dt>
                <dd>{selected.email}</dd>
                <dt>가입일</dt>
                <dd>{selected.joinedAt ?? "-"}</dd>
                <dt>최근 로그인</dt>
                <dd>{selected.lastLoginAt ?? "-"}</dd>
                <dt>활동</dt>
                <dd>
                  후기 {selected.reviewCount} · 자료 {selected.materialCount} ·
                  받은 신고 {selected.reportCount}
                </dd>
                <dt>제재 이력</dt>
                <dd>
                  {selected.sanctions.length === 0
                    ? "없음"
                    : selected.sanctions.map((s) => (
                        <span key={`${s.date}-${s.type}`} className={styles.sanction}>
                          {s.date} {s.type} ({s.reason})
                        </span>
                      ))}
                </dd>
              </dl>

              <hr className={styles.divider} />

              <h3 className={styles.sectionTitle}>계정 조치</h3>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.outlineButton}
                  onClick={handleUnlock}
                  disabled={selected.status !== MEMBER_STATUS.LOCKED}
                >
                  로그인 잠금 해제
                </button>
                <button
                  type="button"
                  className={styles.outlineButton}
                  disabled
                  title="작성 글 조회 API 준비 후 제공됩니다"
                >
                  작성 글 보기
                </button>
              </div>

              <form className={styles.suspend} onSubmit={handleSuspend}>
                <fieldset className={styles.suspendFieldset} disabled={!canSuspend}>
                  <legend className={styles.suspendLegend}>이용 정지</legend>

                  <div
                    className={styles.periods}
                    role="radiogroup"
                    aria-label="정지 기간"
                  >
                    {SUSPEND_PERIODS.map((period) => (
                      <button
                        key={period.value}
                        type="button"
                        role="radio"
                        aria-checked={suspendPeriod === period.value}
                        className={
                          suspendPeriod === period.value
                            ? styles.periodActive
                            : styles.period
                        }
                        onClick={() => setSuspendPeriod(period.value)}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>

                  <label className={styles.reasonField}>
                    <span className={styles.fieldLabel}>
                      정지 사유 (사용자 안내 메일에 포함)
                    </span>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="예: 반복적인 비방성 후기 작성"
                      value={suspendReason}
                      onChange={(e) => setSuspendReason(e.target.value)}
                      maxLength={200}
                    />
                  </label>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!suspendReason.trim()}
                  >
                    정지 적용
                  </button>

                  {!canSuspend && (
                    <p className={styles.hint}>
                      {MEMBER_STATUS_LABEL[selected.status]} 상태의 회원은 이용
                      정지를 적용할 수 없습니다.
                    </p>
                  )}
                </fieldset>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminMembers;
