import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-8 py-16 gap-4"
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-white/5 border border-zp-line flex items-center justify-center text-zp-sub">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <p className="text-lg font-bold text-zp-text">{title}</p>
        {description && <p className="text-sm text-zp-sub leading-relaxed">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
