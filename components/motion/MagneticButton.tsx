"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  Ref,
} from "react";
import { useRef } from "react";

const MAX_PULL = 14;

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    type?: never;
  };

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type MagneticButtonProps = LinkProps | ButtonProps;

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-sm font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";
const variants = {
  primary: "bg-brand text-paper hover:bg-[#1c1560]",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
};

export default function MagneticButton(props: MagneticButtonProps) {
  const { children, className = "", variant = "primary", ...rest } = props;
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handlePointerMove(e: ReactPointerEvent) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / (rect.width / 2)) * MAX_PULL);
    y.set((relY / (rect.height / 2)) * MAX_PULL);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = `${base} ${variants[variant]} ${className}`;
  const motionStyle = shouldReduceMotion ? undefined : { x: springX, y: springY };

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <motion.span
        style={motionStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="inline-block"
      >
        <Link
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorRest}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span
      style={motionStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block"
    >
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    </motion.span>
  );
}
