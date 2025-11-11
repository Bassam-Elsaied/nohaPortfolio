"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min"; // تقدر تغيّرها لأي تأثير آخر مثل NET أو HALO
import BlurText from "./BlurText";
import AnimatedBadge from "./AnimatedBadge";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          highlightColor: 0x5b6cff,
          midtoneColor: 0x1a1a2e,
          lowlightColor: 0x000000,
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

  // أنيميشن السهم
  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  // دالة التمرير للقسم التالي
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // إذا لم يكن هناك قسم محدد، نزل بمقدار ارتفاع الشاشة
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={vantaRef}
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white "
    >
      {/* طبقة فوق الخلفية لإضافة لمسة ضوء خفيف */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,108,255,0.15),transparent_70%)]" />

      {/* المحتوى */}
      <div className="relative z-10 max-w-3xl px-6">
        {/* Badge */}
        <div className="mb-6">
          <AnimatedBadge delay={0.2}>
            Crafting Unique Brand Identities
          </AnimatedBadge>
        </div>

        <BlurText
          text="with creative ideas, and a problem-solving."
          delay={150}
          animateBy="words"
          direction="top"
          className="text-6xl text-center font-semibold mb-8 capitalize"
        />
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Let’s work together and take your brand to the next level!
        </p>
        <div className="flex gap-4 justify-center items-center">
          <button className="group relative px-6 py-3 bg-gradient-to-r from-white/10 via-white/20 to-white/10 hover:from-white/20 hover:via-white/30 hover:to-white/20 backdrop-blur rounded-2xl border border-white/30 transition-all duration-300 cursor-pointer overflow-hidden">
            {/* Shiny effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            <a href="/Noha Elbendary .pdf" download className="relative z-10">
              Download CV
            </a>
          </button>
          <button className="px-6 py-3 bg-white hover:bg-white/70 font-semibold  text-black rounded-2xl border border-white/20 transition cursor-pointer">
            Contact Me
          </button>
        </div>
      </div>

      {/* سهم التمرير للأسفل */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <button
          ref={arrowRef}
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Scroll down</span>
          <div className="p-2 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300">
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </div>
    </section>
  );
}
