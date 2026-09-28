import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sequenceEase } from '../animation/sequence';

const revealVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const revealTransition = {
  duration: 0.65,
  ease: sequenceEase,
};

export default function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const reduced = useReducedMotion();

  const initialState = reduced
    ? false
    : {
        opacity: 0,
        y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
        x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
        filter: 'blur(4px)',
      };

  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
