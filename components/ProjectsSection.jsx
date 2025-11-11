"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    // المشروع الأول يكون ظاهر بحجم كامل، الباقي مخفي تحت
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          zIndex: 1,
        });
      } else {
        gsap.set(card, {
          opacity: 1,
          yPercent: 100, // يبدأ من تحت الشاشة
          scale: 0.8,
          zIndex: i + 1,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=" + cards.length * 1000,
        scrub: 1.5,
        pin: true,
      },
    });

    cards.forEach((card, i) => {
      if (i === 0) {
        // المشروع الأول - وقفة ثم تصغير
        tl.to(card, {
          duration: 0.5,
        });

        // التصغير التدريجي
        tl.to(card, {
          scale: 0.7,
          yPercent: -30,
          opacity: 0.3,
          duration: 2.5,
          ease: "power2.inOut",
        });
      } else {
        const prevCard = cards[i - 1];

        // المشروع الجديد يطلع من تحت والقديم يصغر في نفس الوقت
        tl.to(
          card,
          {
            yPercent: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=1.5" // يبدأ مع تصغير المشروع القديم
        );

        // وقفة قصيرة لعرض المشروع
        tl.to(card, {
          duration: 0.5,
        });

        // تصغير المشروع (إلا آخر واحد)
        if (i !== cards.length - 1) {
          tl.to(card, {
            scale: 0.7,
            yPercent: -30,
            opacity: 0.3,
            duration: 2.5,
            ease: "power2.inOut",
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      badge: "Travel Company",
      title: "The Eagle Tour & Travel Agency",
      link: "https://www.facebook.com/theeagletravelagency",
      desc: "I managed and created social media content for The Eagle Travel Agency, crafting engaging posts and visuals that reflected the brand’s identity and boosted audience interaction.”",
      img: "/work-1.jpg",
    },
    {
      badge: "Marketing Agency",
      title: "العطاء المستمر",
      link: "https://www.facebook.com/profile.php?id=61567672930650",
      desc: "Managed and created social-media posts for this profile, delivering engaging content and boosting audience interaction.",
      img: "/work-2.jpg",
    },
    {
      badge: "Health/Beauty",
      title: "مركز الثقة لطب وتجميل الأسنان",
      link: "https://www.facebook.com/profile.php?id=61570402612848",
      desc: "Crafted stories and visuals that brought the brand’s voice to life and kept followers coming back for more.",
      img: "/work-3.jpg",
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-screen bg-black text-white overflow-hidden"
    >
      <div className="  text-center z-20">
        <h2 className="text-4xl md:text-5xl font-bold">Featured Works</h2>
        <p className="text-gray-400 mt-2 ">
          These selected projects reflect my passion for blending strategy with
          creativity — solving real problems through thoughtful ideas and
          impactful storytelling
        </p>
      </div>

      {/* الكروت */}
      <div className="relative w-full h-full flex items-center justify-center">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ zIndex: i + 1 }}
            className="absolute w-[90%] md:w-[80%] h-[75%] rounded-3xl overflow-hidden shadow-2xl bg-zinc-900"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
              {/* Badge */}
              <div className="flex justify-start">
                <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white">
                  {project.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <Link href={project.link}>{project.title}</Link>
                </h3>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
