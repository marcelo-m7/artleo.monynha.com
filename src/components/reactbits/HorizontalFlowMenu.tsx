import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import React from "react";
import { cn } from "@/lib/utils";

// Make HorizontalFlowMenuItem generic over the value type
interface HorizontalFlowMenuItem<T extends string> {
  value: T;
  label: string;
  accent?: string;
}

// Make HorizontalFlowMenuProps generic to accept readonly items and a specific value type
interface HorizontalFlowMenuProps<T extends string> {
  items: readonly HorizontalFlowMenuItem<T>[]; // Accept readonly array
  selectedValue: T;
  onValueChange: (value: T) => void;
  className?: string;
  itemRole?: React.AriaRole;
}

const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

const findClosestEdge = (
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
): "left" | "right" => {
  const leftEdgeDist = Math.pow(mouseX, 2) + Math.pow(mouseY - height / 2, 2);
  const rightEdgeDist = Math.pow(mouseX - width, 2) + Math.pow(mouseY - height / 2, 2);
  return leftEdgeDist < rightEdgeDist ? "left" : "right";
};

// Make MenuItemProps generic
interface MenuItemProps<T extends string> extends HorizontalFlowMenuItem<T> {
  isActive: boolean;
  reduceMotion: boolean;
  onClick: (value: T) => void;
  role?: React.AriaRole;
}

const defaultAccent = "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)";

// Update MenuItem to be generic
const MenuItem = <T extends string>({ value, label, accent, isActive, reduceMotion, onClick, role }: MenuItemProps<T>) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const handleEnter = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { x: edge === "left" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { x: edge === "left" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { x: "0%" });
  };

  const handleLeave = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { x: edge === "left" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { x: edge === "left" ? "101%" : "-101%" }); // Fixed: changed 'y' to 'x'
  };

  const accentStyle = React.useMemo(() => {
    if (!accent) {
      return { background: defaultAccent };
    }

    if (accent.startsWith("url(")) {
      return { backgroundImage: accent };
    }

    if (accent.startsWith("linear") || accent.startsWith("radial") || accent.startsWith("conic")) {
      return { background: accent };
    }

    return { background: accent };
  }, [accent]);

  const repeatedMarqueeContent = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={`${label}-${idx}`}>
          <span className="text-[color:var(--flowing-menu-text)] uppercase font-medium text-[2.5vh] leading-[1.2] px-[0.5vw]">{label}</span>
          <div
            className="min-w-[60px] h-[3vh] my-[0.75vh] mx-[0.5vw] rounded-[999px] bg-cover bg-center"
            style={accentStyle}
          />
        </React.Fragment>
      )),
    [accentStyle, label],
  );

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative flex-shrink-0 overflow-hidden bg-surface-0 text-center shadow-inset transition-colors",
        isActive
          ? "bg-surface-2 shadow-[0_-8px_24px_rgba(99,102,241,0.35)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),transparent)] before:content-['']"
          : undefined,
      )}
    >
      <button
        type="button"
        className={cn(
          "flex h-full min-h-[48px] w-full items-center justify-center px-4 py-2 text-sm font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground",
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => onClick(value)}
        aria-current={isActive ? "page" : undefined}
        role={role}
        data-menu-item
      >
        {label}
      </button>
      <div
        ref={marqueeRef}
        className="pointer-events-none absolute inset-0 translate-x-[101%] bg-white text-foreground transition-transform duration-500 ease-out"
      >
        <div ref={marqueeInnerRef} className="flex h-full w-[200%]">
          <div className="flex h-full w-[200%] items-center animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

// Update FlowingMenu to be generic and cast for better type inference
export const HorizontalFlowMenu = React.forwardRef(
  <T extends string,>(
    { items, selectedValue, onValueChange, className, itemRole = "menuitem" }: HorizontalFlowMenuProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("w-full overflow-hidden", className)}>
      <nav
        className="flex overflow-x-auto rounded-full border border-border/60 bg-surface-1/95 backdrop-blur-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        aria-label="Category navigation"
        role="menu"
        aria-orientation="horizontal"
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            {...item}
            isActive={selectedValue === item.value}
            reduceMotion={reduceMotion}
            onClick={onValueChange}
            role={itemRole}
          />
        ))}
      </nav>
    </div>
  );
  },
) as <T extends string>(props: HorizontalFlowMenuProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement;

HorizontalFlowMenu.displayName = "HorizontalFlowMenu";