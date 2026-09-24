import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import Hero from './components/Hero';
import BentoSkills from './components/BentoSkills';
import StaggeredGallery from './components/StaggeredGallery';
import ImpactFooter from './components/ImpactFooter';
import VideoPlayerModal from './components/VideoPlayerModal';
import SceneBackdrop from './components/SceneBackdrop';
import { MediaSuspendedContext } from './components/PreviewMedia';
import { PROJECTS } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(null);
  const toastTimer = useRef(0);
  const openProject = useCallback((project, element) => { setOrigin(element); setSelectedProject(project); }, []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);
  const copy = async (value, kind) => {
    clearTimeout(toastTimer.current);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setToast(`${kind === 'email' ? 'Email' : 'Discord username'} copied. Talk soon!`);
    } catch {
      setCopied(null);
      setToast(`Couldn't copy. You can select it here: ${value}`);
    }
    toastTimer.current = setTimeout(() => { setToast(null); setCopied(null); }, 4000);
  };

  return <MotionConfig reducedMotion="user"><MediaSuspendedContext.Provider value={!!selectedProject}>
    <div className="site-root">
      <a href="#work" className="skip-link">Skip to the work</a>
      <SceneBackdrop />
      <Navbar suspended={!!selectedProject} />
      <main>
        <Hero onOpenModal={openProject} />
        <StaggeredGallery onOpenModal={openProject} />
        <BentoSkills />
        <ImpactFooter onCopyDiscord={() => copy('gowtham.xd', 'discord')} onCopyEmail={() => copy('gowthamcrontech@gmail.com', 'email')} discordCopied={copied === 'discord'} emailCopied={copied === 'email'} />
      </main>
      <Dock />
      {selectedProject && <VideoPlayerModal project={selectedProject} allProjects={PROJECTS} origin={origin} onClose={closeProject} onSelectProject={setSelectedProject} />}
      <div className={`toast-message ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  </MediaSuspendedContext.Provider></MotionConfig>;
}
