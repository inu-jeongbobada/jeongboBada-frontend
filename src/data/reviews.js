// TODO : API 연동 시 제거 (임시 목 데이터)
export const lectureQuestions = [
  { id: "assignment", title: "과제가 많은가요?", left: "적다", right: "많다" },
  { id: "teamwork", title: "조모임이 많은가요?", left: "적다", right: "많다" },
  {
    id: "grading",
    title: "학점은 어떻게 주시나요?",
    left: "너그럽다",
    right: "깐깐하다",
  },
  { id: "exam", title: "시험은 몇 번 보나요?", left: "없음", right: "4번 이상" },
];

export const professorQuestions = [
  {
    id: "passion",
    title: "교수님께서 수업에 열정적이신가요?",
    left: "아니다",
    right: "그렇다",
  },
  {
    id: "plan",
    title: "강의계획서와 동일하게 진행되나요?",
    left: "아니다",
    right: "그렇다",
  },
  {
    id: "feedback",
    title: "학생에게 피드백을 제공하시나요?",
    left: "없음",
    right: "4회 이상",
  },
];

export const lectureReviews = [
  {
    id: 1,
    nickname: "오주여예수맨",
    rating: 3,
    likes: 24,
    date: "2026-09-12",
    content:
      "어 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아 개별로임 듣지마셈 도망가 발표 너무 많아",
  },
  {
    id: 2,
    nickname: "익명",
    rating: 3.5,
    likes: 12,
    date: "2026-09-10",
    content: "매주 이거듣는날 노캔끼고 무단횡단함 죽고싶어서",
  },
  {
    id: 3,
    nickname: "익명",
    rating: 3.5,
    likes: 8,
    date: "2026-09-08",
    content: "아 이거 수강료 날리는 과목임 절대 비추 내 말의 동의한다면 개추",
  },
  {
    id: 4,
    nickname: "익명",
    rating: 3.5,
    likes: 5,
    date: "2026-09-05",
    content: "나는 이 수업을 들으러 갈 때 자전거를 손 놓고 탄다",
  },
  {
    id: 5,
    nickname: "익명",
    rating: 4,
    likes: 3,
    date: "2026-09-02",
    content: "어 개별로임 듣지마셈 도망가 발표 너무 많아",
  },
  {
    id: 6,
    nickname: "익명",
    rating: 2,
    likes: 1,
    date: "2026-08-30",
    content: "어 개별로임 듣지마셈 도망가 발표 너무 많아",
  },
];

export const myReviews = [
  {
    id: 1,
    type: "lecture",
    target: "전공과목 1",
    professor: "교수명",
    date: "2026.09.12",
    overall: 3.5,
    ratings: { assignment: 4, teamwork: 3, grading: 3, exam: 2 },
    anonymous: true,
    content: "어 개별로임 듣지마셈 도망가 발표 너무 많아",
  },
  {
    id: 2,
    type: "lecture",
    target: "전공과목 3",
    professor: "교수명",
    date: "2026.06.20",
    overall: 4.5,
    ratings: { assignment: 2, teamwork: 2, grading: 2, exam: 3 },
    anonymous: false,
    content: "과제는 조금 있지만 배우는 게 많은 수업이었습니다.",
  },
  {
    id: 3,
    type: "professor",
    target: "교수명",
    professor: "정보통신학과",
    date: "2026.06.18",
    overall: 4,
    ratings: { passion: 5, plan: 4, feedback: 3 },
    anonymous: true,
    content: "수업 열정이 넘치시고 질문에 친절하게 답해 주십니다.",
  },
];
