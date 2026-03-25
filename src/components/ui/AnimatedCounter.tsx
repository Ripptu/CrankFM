import React, { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

export function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString('de-DE') + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
}
