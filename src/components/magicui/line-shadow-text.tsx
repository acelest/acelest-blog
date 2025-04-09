import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  as?: React.ElementType;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <MotionComponent
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        // Première ombre plus légère et plus proche
        "after:absolute after:left-[0.01em] after:top-[0.01em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_55%)]",
        "after:-z-10 after:bg-[length:0.03em_0.03em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow-subtle",
        // Seconde ombre avec effet de flou plus subtil et plus proche
        "before:absolute before:left-[0.02em] before:top-[0.02em] before:content-[attr(data-text)]",
        "before:-z-20 before:text-transparent before:opacity-20 before:blur-[0.5px]",
        "before:bg-[var(--shadow-color)] before:bg-clip-text",
        "before:animate-line-shadow-glow",
        // Animation du texte principal
        "animate-text-shimmer",
        className
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
