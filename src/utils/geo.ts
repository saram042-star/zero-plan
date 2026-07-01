/**
 * 지도 API 없이 mock lat/lng만으로 동선을 계산하기 위한 유틸.
 * 하버사인 공식으로 두 좌표 간 직선거리를 구하고, nearest-neighbor로
 * 저장 리스트를 "가까운 순"으로 정렬한다.
 */

interface LatLng {
  lat: number;
  lng: number;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineDistanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** 첫 번째 항목을 출발점으로 삼아 가장 가까운 다음 지점을 계속 선택하는 nearest-neighbor 정렬 */
export function sortByNearestNeighbor<T extends LatLng & { id: string }>(items: T[]): T[] {
  if (items.length <= 2) return [...items];

  const remaining = [...items];
  const ordered: T[] = [remaining.shift()!];

  while (remaining.length > 0) {
    const current = ordered[ordered.length - 1];
    let nearestIdx = 0;
    let nearestDist = Infinity;
    remaining.forEach((item, idx) => {
      const dist = haversineDistanceKm(current, item);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = idx;
      }
    });
    ordered.push(remaining.splice(nearestIdx, 1)[0]);
  }

  return ordered;
}
