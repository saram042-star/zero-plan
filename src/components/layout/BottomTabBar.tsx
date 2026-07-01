import clsx from "clsx";
import { motion } from "framer-motion";
import { TABS } from "../../constants";
import { useAppStore } from "../../store/useAppStore";
import { CompassIcon, RouteIcon, SparkleIcon } from "../icons";

const TAB_ICONS = {
  today: SparkleIcon,
  explore: CompassIcon,
  plan: RouteIcon,
};

export function BottomTabBar() {
  const selectedTab = useAppStore((s) => s.selectedTab);
  const setSelectedTab = useAppStore((s) => s.setSelectedTab);
  const savedCount = useAppStore((s) => s.savedPlans.length);

  return (
    <nav className="shrink-0 safe-bottom border-t border-zp-line bg-zp-bg/95 backdrop-blur-xl">
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab.key];
          const active = selectedTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className="relative flex-1 flex flex-col items-center gap-1 py-2.5"
            >
              <span className="relative">
                <Icon size={22} className={clsx(active ? "text-zp-text" : "text-zp-sub")} />
                {tab.key === "plan" && savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </span>
              <span
                className={clsx(
                  "text-[11px] font-medium",
                  active ? "text-zp-text" : "text-zp-sub",
                )}
              >
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute top-0 inset-x-6 h-0.5 rounded-full bg-zp-text"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
