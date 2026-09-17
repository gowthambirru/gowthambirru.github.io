import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import Hero from './components/Hero';
import BentoSkills from './components/BentoSkills';
import StaggeredGallery from './components/StaggeredGallery';
import ImpactFooter from './components/ImpactFooter';
import VideoPlayerModal from './components/VideoPlayerModal';
import Toast from './components/Toast';
import { PROJECTS } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [discordCopied, setDiscordCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Trigger toast with auto dismiss
  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 3500);
  };

  // Sparkle confetti effect
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.85 },
        colors: ['#FF6B50', '#EBEBEB', '#888888']
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Copy Discord handler
  const handleCopyDiscord = () => {
    const username = "gowtham.xd";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(username);
    }
    setDiscordCopied(true);
    fireConfetti();
    showToast("Discord Username Copied", "Added 'gowtham.xd' to clipboard.");
    setTimeout(() => setDiscordCopied(false), 3000);
  };

  // Copy Email handler
  const handleCopyEmail = () => {
    const email = "gowthamcrontech@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    setEmailCopied(true);
    fireConfetti();
    showToast("Email Address Copied", "Added 'gowthamcrontech@gmail.com' to clipboard.");
    setTimeout(() => setEmailCopied(false), 3000);
  };

  const handleScrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen relative text-[#EBEBEB] selection:bg-[#FF6B50] selection:text-white bg-[#050505] bg-fixed bg-cover bg-top"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.80), rgba(5, 5, 5, 0.90)), url('${import.meta.env.BASE_URL}images/oregairu_bg.jpg')`
      }}
    >
      
      {/* Fixed Top Navigation */}
      <Navbar onCopyDiscord={handleCopyDiscord} />

      {/* Main Single-Page Editorial Content */}
      <main>
        {/* Hero: 13vw /EDITS typography, social proof character stack, email link */}
        <Hero onCopyEmail={handleCopyEmail} />

        {/* Staggered Work Gallery: 2-column project grid with inline video playback */}
        <StaggeredGallery onOpenModal={(proj) => setSelectedProject(proj)} />

        {/* Benefits Bento Grid: 5 YEARS oversized typography */}
        <BentoSkills />

        {/* Impact Typographic Footer: 14vw CRAFT MORE, contact stack, 56px circular buttons */}
        <ImpactFooter
          onCopyDiscord={handleCopyDiscord}
          onCopyEmail={handleCopyEmail}
          discordCopied={discordCopied}
          emailCopied={emailCopied}
        />
      </main>

      {/* Floating Glassmorphic Bottom Dock */}
      <Dock
        onCopyDiscord={handleCopyDiscord}
        onCopyEmail={handleCopyEmail}
        onScrollToWork={handleScrollToWork}
      />

      {/* Cinematic In-Page Video Player Modal */}
      {selectedProject && (
        <VideoPlayerModal
          project={selectedProject}
          allProjects={PROJECTS}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onCopyNotification={showToast}
        />
      )}

      {/* Minimal Feedback Toast */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
