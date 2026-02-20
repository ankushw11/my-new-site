"use client";

import { useEffect } from 'react';

export default function ProfilePage() {
  useEffect(() => {
    // Inject styles
    const styleId = 'profile-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        #profile-iframe {
          width: 100%;
          height: 100vh;
          border: none;
          display: block;
        }
      `;
      document.head.appendChild(style);
    }

    // Load external scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load GSAP and Three.js
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
    ]).then(() => {
      // Load profile script after dependencies
      loadScript('/profile/script-profile.js');
    });

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <>
      <iframe
        id="profile-iframe"
        src="/profile/company-profile.html"
        title="KRAMatrix Company Profile"
        allowFullScreen
        suppressHydrationWarning
      />
    </>
  );
}
