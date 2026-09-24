import React from 'react';
import AmbientAudio from './AmbientAudio';

export default function Navbar({ suspended }) {
  return <header className="site-header">
    <a className="brand" href="#hero" aria-label="Gowtham — back to top">
      <img src={`${import.meta.env.BASE_URL}favicon.jpg`} alt="" width="34" height="34" />
      <span>GOWTHAM<span className="brand-sub">VIDEO EDITOR</span></span>
    </a>
    <nav className="header-nav" aria-label="Main navigation">
      <a href="#work">WORK <span>01</span></a>
      <a href="#skills">SKILLS <span>02</span></a>
      <a href="#contact">CONTACT <span>03</span></a>
    </nav>
    <AmbientAudio suspended={suspended} />
  </header>;
}
