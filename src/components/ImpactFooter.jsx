import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowUp, Check, Copy } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { springTransition } from '../animation/sequence';

export default function ImpactFooter({ onCopyDiscord, onCopyEmail, discordCopied, emailCopied }) {
  const reduced = useReducedMotion();

  return (
    <footer id="contact" className="contact-section section-shell">
      <Reveal>
        <h2>START A<br /><span>PROJECT.</span><ArrowUpRight className="contact-arrow" weight="light" /></h2>
      </Reveal>

      <div className="contact-layout">
        <Reveal delay={0.08}>
          <p className="contact-lead">
            Have raw footage ready or planning your next series? Let's make it hit.
          </p>
        </Reveal>

        <Reveal delay={0.14} className="contact-links">
          <motion.div
            className="contact-row"
            whileHover={reduced ? {} : { backgroundColor: 'rgba(56,189,248,0.04)' }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <a href="mailto:gowthamcrontech@gmail.com">
                <span>gowthamcrontech@gmail.com</span> <ArrowUpRight size={20} />
              </a>
            </div>
            <motion.button
              type="button"
              onClick={onCopyEmail}
              aria-label={emailCopied ? 'Email copied' : 'Copy email'}
              whileHover={reduced ? {} : { scale: 1.08, borderColor: 'rgba(56,189,248,0.6)' }}
              whileTap={reduced ? {} : { scale: 0.92 }}
              transition={springTransition}
            >
              {emailCopied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </motion.div>

          <motion.div
            className="contact-row"
            whileHover={reduced ? {} : { backgroundColor: 'rgba(56,189,248,0.04)' }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <span className="discord-address">gowtham.xd</span>
            </div>
            <motion.button
              type="button"
              onClick={onCopyDiscord}
              aria-label={discordCopied ? 'Discord copied' : 'Copy Discord username'}
              whileHover={reduced ? {} : { scale: 1.08, borderColor: 'rgba(56,189,248,0.6)' }}
              whileTap={reduced ? {} : { scale: 0.92 }}
              transition={springTransition}
            >
              {discordCopied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </motion.div>
        </Reveal>
      </div>

      <motion.div
        className="footer-credit"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <span>&copy; {new Date().getFullYear()} GOWTHAM</span>
        <motion.a
          href="#hero"
          whileHover={reduced ? {} : { y: -2, color: '#38bdf8' }}
          whileTap={reduced ? {} : { scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          BACK TO TOP <ArrowUp size={15} />
        </motion.a>
      </motion.div>
    </footer>
  );
}
