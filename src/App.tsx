import { motion } from "framer-motion";
import { useAppStore } from "./store/useAppStore";
import type { TabKey } from "./constants";
import { TodayScreen } from "./components/today/TodayScreen";
import { ExploreScreen } from "./components/explore/ExploreScreen";
import { PlanScreen } from "./components/plan/PlanScreen";
import { BottomTabBar } from "./components/layout/BottomTabBar";
import { SpotDetailSheet } from "./components/detail/SpotDetailSheet";
import { Toast } from "./components/common/Toast";

const SCREENS: { key: TabKey; render: () => JSX.Element }[] = [
  { key: "today", render: () => <TodayScreen /> },
  { key: "explore", render: () => <ExploreScreen /> },
  { key: "plan", render: () => <PlanScreen /> },
];

function App() {
  const selectedTab = useAppStore((s) => s.selectedTab);

  return (
    <div className="app-frame flex flex-col">
      <div className="relative flex-1 min-h-0">
        {SCREENS.map(({ key, render }) => {
          const active = selectedTab === key;
          return (
            <motion.div
              key={key}
              initial={false}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0"
              style={{ pointerEvents: active ? "auto" : "none", zIndex: active ? 1 : 0 }}
              aria-hidden={!active}
            >
              {render()}
            </motion.div>
          );
        })}
      </div>

      <BottomTabBar />
      <SpotDetailSheet />
      <Toast />
    </div>
  );
}

export default App;
