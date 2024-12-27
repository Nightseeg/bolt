import { HTMLMotionProps } from 'framer-motion';

export const defaultTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: defaultTransition
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export type MotionVariants = HTMLMotionProps<any>['variants'];