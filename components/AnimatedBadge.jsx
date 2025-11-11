"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AnimatedBadge({
  children,
  className,
  showPulse = true,
  delay = 0,
}) {
  const badgeRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (badgeRef.current) {
      // أنيميشن الظهور من الأعلى
      gsap.fromTo(
        badgeRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
        }
      );
    }

    if (pulseRef.current) {
      // أنيميشن النبض المستمر
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      });
    }
  }, [delay]);

  return (
    <div ref={badgeRef} className="flex justify-center">
      <Badge
        variant="outline"
        className={cn(
          "px-4 py-2 bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 text-white/90 gap-2 text-xl",
          className
        )}
      >
        {showPulse && (
          <span className="relative flex h-3 w-3">
            <span
              ref={pulseRef}
              className="absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"
            />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600" />
          </span>
        )}
        {children}
      </Badge>
    </div>
  );
}
