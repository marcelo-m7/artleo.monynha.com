import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollFloatProps {
  className?: string;
}

export const ScrollFloat = ({ className }: ScrollFloatProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null; // Hide scroll indicator if motion is reduced
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-border/50 p-2">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-primary"
        />
      </div>
    </motion.div>
  );
};

ScrollFloat.displayName = "ScrollFloat";