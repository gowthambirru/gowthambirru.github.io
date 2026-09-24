import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceTransition } from '../animation/sequence';

export default function Reveal({ children, className = '' }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 38, clipPath: 'inset(0 0 20% 0)' }}
    whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: 0.12 }}
    transition={sequenceTransition}>{children}</motion.div>;
}
