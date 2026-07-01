import { useEffect, useRef, useState } from "react";

/**
 * accentColor가 바뀔 때마다 두 레이어를 번갈아 opacity로 크로스페이드한다.
 * (AnimatePresence 마운트/언마운트 대신 CSS transition만 사용 — 두 레이어 모두
 * 항상 마운트되어 있어 상위 탭 전환 AnimatePresence와 충돌하지 않는다.)
 */
export function AccentGlowBackground({ color }: { color: string }) {
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const layerColors = useRef<[string, string]>([color, color]);

  useEffect(() => {
    if (layerColors.current[activeLayer] === color) return;
    const nextLayer = activeLayer === 0 ? 1 : 0;
    layerColors.current[nextLayer] = color;
    setActiveLayer(nextLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <div className="absolute inset-0 -z-10">
      {[0, 1].map((layer) => (
        <div
          key={layer}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{
            opacity: activeLayer === layer ? 1 : 0,
            background: `radial-gradient(120% 55% at 50% 0%, ${layerColors.current[layer]}4D 0%, transparent 62%), #0E0E0E`,
          }}
        />
      ))}
    </div>
  );
}
