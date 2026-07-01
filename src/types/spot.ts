/**
 * Spot: 무료 여가/문화 프로그램 1건.
 *
 * 서울시 공공서비스예약, 문화행사, 문화공간, 관광정보, 팝업/행사 데이터로
 * 교체될 때도 이 구조를 유지하도록 설계한다. `sourceType` + `sourceUrl`이
 * 실제 API 연동 시 원본 출처 구분/딥링크 역할을 하고, 나머지 필드는
 * 각 공공데이터 응답을 매핑하는 어댑터에서 채워 넣으면 된다.
 */

export const CATEGORIES = [
  "관광",
  "무료클래스",
  "팝업스토어",
  "상설전시",
  "콘서트/공연",
  "투어",
  "공공공간",
  "체험행사",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ACTIVE_TYPES = ["조용한", "활동적인", "문화생활", "사진명소", "산책"] as const;
export type ActiveType = (typeof ACTIVE_TYPES)[number];

export const SOURCE_TYPES = [
  "공공서비스예약",
  "문화행사",
  "문화공간",
  "관광정보",
  "브랜드/팝업공지",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

/** 탐색 화면의 조건 필터 목록. "무료" 필터는 서비스 전제이므로 포함하지 않는다. */
export const CONDITION_FILTERS = [
  "오늘가능",
  "이번주",
  "실내",
  "야외",
  "혼자가능",
  "예약",
  "조용한",
  "활동적인",
  "문화생활",
  "포토제닉",
] as const;

export type ConditionFilter = (typeof CONDITION_FILTERS)[number];

export interface Spot {
  id: string;
  title: string;
  category: Category;
  locationName: string;
  district: string;
  address: string;
  /** ISO date string (YYYY-MM-DD) */
  startDate: string;
  /** ISO date string (YYYY-MM-DD) */
  endDate: string;
  openHours: string;
  price: 0;
  isFree: true;
  reservationRequired: boolean;
  indoor: boolean;
  soloFriendly: boolean;
  friendFriendly: boolean;
  activeType: ActiveType;
  sourceType: SourceType;
  sourceUrl: string;
  imageUrl: string;
  /** 카드/배지/배경 glow에 쓰이는 대표 색상 (hex) */
  accentColor: string;
  lat: number;
  lng: number;
  tags: string[];
  description: string;
  recommendedReason: string;
}
