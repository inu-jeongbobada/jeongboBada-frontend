// TODO : API 연동 시 제거 (임시 목 데이터)
export const mockUser = {
  name: "OOO",
  major: "정보통신학과",
  grade: "3학년",
  studentId: "202301234",
  minor: "부전공 없음",
  earnedCredits: 84,
  requiredCredits: 140,
  recentGpa: 4.1,
  totalGpa: 3.9,
};

export const graduationRequirements = [
  { label: "전공필수", earned: 12, required: 24 },
  { label: "전공선택", earned: 30, required: 45 },
  { label: "기초교양", earned: 9, required: 12 },
  { label: "핵심교양", earned: 9, required: 12 },
  { label: "심화교양", earned: 3, required: 9 },
];

export const graduationChecks = [
  { label: "졸업논문(작품) 합격 여부", passed: false },
  { label: "영어졸업인증자격 취득 여부", passed: false },
];

export const semesterGpas = [
  { year: 2023, terms: [3.8, 4.3] },
  { year: 2024, terms: [3.2, 4.4] },
  { year: 2025, terms: [null, null] },
  { year: 2026, terms: [null, null] },
];

export const gradeOptions = ["A+", "A0", "B+", "B0", "C+", "C0", "D+", "D0", "F"];

export const gradePoints = {
  "A+": 4.5,
  A0: 4.0,
  "B+": 3.5,
  B0: 3.0,
  "C+": 2.5,
  C0: 2.0,
  "D+": 1.5,
  D0: 1.0,
  F: 0,
};
