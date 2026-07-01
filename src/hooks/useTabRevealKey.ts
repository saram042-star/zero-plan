import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import type { TabKey } from "../constants";

/**
 * 해당 탭이 활성화될 때마다 값이 바뀌는 key를 반환한다.
 * 화면 최상단 요소에 이 key를 걸어두면 탭을 다시 열 때마다
 * 진입 모션(순차 등장 등)이 재생된다.
 */
export function useTabRevealKey(tab: TabKey): number {
  const selectedTab = useAppStore((s) => s.selectedTab);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (selectedTab === tab) setKey((k) => k + 1);
  }, [selectedTab, tab]);

  return key;
}
