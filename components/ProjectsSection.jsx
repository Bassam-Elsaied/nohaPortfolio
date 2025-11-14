"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Fetch featured projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && isFeatured == true] | order(order asc) {
          title,
          category,
          description,
          image,
          link
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    
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
  }, [projects]);

  if (projects.length === 0) {
    return (
      <section className="relative h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading projects...</div>
      </section>
    );
  }

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
                src={project.image ? urlFor(project.image).width(1200).height(800).url() : "/placeholder.jpg"}
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
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <Link href={project.link}>{project.title}</Link>
                </h3>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
