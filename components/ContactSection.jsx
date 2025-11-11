"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import AnimatedBadge from "./AnimatedBadge";
import BlurText from "./BlurText";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          highlightColor: 0x000000,
          midtoneColor: 0x1a1a2e,
          lowlightColor: 0x5b6cff,
          baseColor: 0x050508,
          blurFactor: 0.8,
          speed: 1.5,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section
      id="contact"
      ref={vantaRef}
      className="relative flex flex-col items-center justify-center h-[70vh] text-center text-white overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,108,255,0.15),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        {/* Badge */}
        <div className="mb-6">
          <AnimatedBadge delay={0.2}>Let&apos;s Connect</AnimatedBadge>
        </div>

        {/* Title */}
        <BlurText
          text="Ready to bring your ideas to life?"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-5xl md:text-6xl text-center font-semibold mb-6 capitalize"
        />

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          I&apos;m always excited to collaborate on new projects and creative
          challenges. Let&apos;s connect and create something amazing together!
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6">
          {/* Gmail */}
          <a
            href="mailto:nohaelbendary00@gmail.com"
            className="group flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Gmail"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/noha-elbendary"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Canva */}
          <a
            href="https://www.canva.com/design/DAGy85gOGlU/7BMHR5qU0OQWteDjjGlquQ/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Canva"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.264 11.732c.206.18.42.348.644.498-.04.704-.095 1.391-.168 2.054-.588-.41-1.125-.91-1.588-1.5-.45-.578-.828-1.222-1.122-1.918-.162-.388-.3-.786-.418-1.19-.33-1.13-.488-2.31-.466-3.492.012-.66.072-1.32.18-1.97C5.51 3.376 6.03 2.6 6.67 1.94c.64-.662 1.4-1.21 2.24-1.612C10.086-.126 11.446-.23 12.748.18c1.302.41 2.46 1.218 3.294 2.296.834 1.078 1.31 2.39 1.35 3.746.022.764-.052 1.527-.22 2.27-.165.734-.422 1.446-.765 2.118-.342.672-.77 1.302-1.272 1.874-.502.572-1.074 1.082-1.702 1.518-.628.436-1.308.794-2.024 1.062-.716.27-1.466.448-2.23.528.176-.652.315-1.32.414-1.99.634-.126 1.246-.33 1.824-.608.578-.278 1.116-.63 1.598-1.048.482-.418.912-.896 1.276-1.422.364-.526.658-1.096.87-1.694.212-.598.342-1.222.386-1.854.022-.316.022-.634 0-.95-.044-.632-.186-1.25-.42-1.836-.234-.586-.556-1.134-.954-1.626-.398-.492-.87-.922-1.396-1.274C13.01 1.51 12.404 1.254 11.774 1.1c-.63-.154-1.282-.21-1.93-.166-.648.044-1.286.184-1.896.416-.61.232-1.186.554-1.71.952-.524.398-.986.876-1.37 1.414-.384.538-.686 1.13-.896 1.754-.21.624-.328 1.278-.35 1.936-.044 1.316.15 2.628.568 3.862.1.3.216.594.346.88.26.572.584 1.11.966 1.6.382.49.82.936 1.302 1.326.482.39 1.004.72 1.556.98.276.13.558.246.846.346-.05.714-.12 1.41-.204 2.086-.66-.166-1.298-.4-1.908-.698-.61-.298-1.188-.662-1.724-1.086-.536-.424-1.026-.906-1.458-1.438-.432-.532-.802-1.11-1.1-1.724-.298-.614-.526-1.26-.678-1.924-.152-.664-.228-1.344-.226-2.026.004-1.364.252-2.71.732-3.98.48-1.27 1.186-2.45 2.078-3.478C6.422 2.29 7.512 1.47 8.73.908c1.218-.562 2.548-.872 3.896-.906 1.348-.034 2.702.208 3.958.71 1.256.502 2.392 1.258 3.326 2.208.934.95 1.65 2.076 2.096 3.304.446 1.228.614 2.536.49 3.83-.062.648-.2 1.286-.412 1.902-.212.616-.498 1.206-.852 1.756-.354.55-.774 1.058-1.25 1.512-.476.454-1.004.85-1.57 1.176-.566.326-1.168.582-1.792.76-.624.178-1.268.278-1.916.298.03-.68.042-1.36.034-2.04.548-.018 1.088-.106 1.606-.26.518-.154 1.01-.374 1.464-.652.454-.278.87-.61 1.238-.986.368-.376.682-.794.934-1.246.252-.452.442-.934.564-1.434.122-.5.176-1.014.16-1.526-.032-1.024-.33-2.02-.856-2.88-.526-.86-1.262-1.56-2.132-2.028-.87-.468-1.852-.69-2.84-.644-.988.046-1.958.356-2.806.896-.848.54-1.55 1.296-2.032 2.188-.482.892-.73 1.898-.718 2.916.006.51.062 1.018.168 1.516.106.498.262.984.466 1.45.204.466.456.912.75 1.328.294.416.63.8 1 1.144z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
