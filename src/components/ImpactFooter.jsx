import React from 'react';
import { ArrowUpRight, ArrowUp, Check, Copy } from '@phosphor-icons/react';
import Reveal from './Reveal';

export default function ImpactFooter({ onCopyDiscord, onCopyEmail, discordCopied, emailCopied }) {
  return <footer id="contact" className="contact-section section-shell">
    <Reveal><span className="eyebrow section-index">03 / YOUR NEXT VIDEO</span><h2>LET'S MAKE<br />THE <span>CUT.</span><ArrowUpRight className="contact-arrow" weight="light" /></h2></Reveal>
    <div className="contact-layout"><p>Got footage? An idea? A deadline?<br />Send it over. I'll take care of the edit.<span>For creators and agencies. One video or ongoing work.</span></p>
      <div className="contact-links">
        <div className="contact-row"><div><span className="eyebrow">DROP ME A LINE</span><a href="mailto:gowthamcrontech@gmail.com"><span>gowthamcrontech@gmail.com</span> <ArrowUpRight size={22} /></a></div>
          <button type="button" onClick={onCopyEmail} aria-label={emailCopied ? 'Email copied' : 'Copy email'}>{emailCopied ? <Check size={20} /> : <Copy size={20} />}</button></div>
        <div className="contact-row"><div><span className="eyebrow">OR FIND ME ON DISCORD</span><span className="discord-address">gowtham.xd</span></div>
          <button type="button" onClick={onCopyDiscord} aria-label={discordCopied ? 'Discord copied' : 'Copy Discord username'}>{discordCopied ? <Check size={20} /> : <Copy size={20} />}</button></div>
      </div>
    </div>
    <div className="footer-credit"><span>© {new Date().getFullYear()} GOWTHAM</span><span>EDITED WITH INTENT.</span><a href="#hero">BACK TO TOP <ArrowUp size={16} /></a></div>
  </footer>;
}
