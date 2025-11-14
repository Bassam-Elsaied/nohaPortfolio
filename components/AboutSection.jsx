"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [aboutData, setAboutData] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillsRef = useRef([]);
  const experienceRef = useRef([]);
  const imageRef = useRef(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const query = `*[_type == "aboutMe"][0]{
          title,
          description,
          image,
          skills,
          experiences
        }`;
        const data = await client.fetch(query);
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    if (!aboutData) return;
    const ctx = gsap.context(() => {
      // أنيميشن العنوان
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // أنيميشن الوصف
      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // أنيميشن المهارات
      gsap.from(skillsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current[0],
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // أنيميشن الخبرات
      gsap.from(experienceRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: experienceRef.current[0],
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // أنيميشن الصورة
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [aboutData]);

  // Show loading or fallback while data is being fetched
  if (!aboutData) {
    return (
      <section
        id="about-me"
        className="min-h-screen bg-black text-white py-20 px-6 flex items-center justify-center"
      >
        <div className="text-2xl">Loading...</div>
      </section>
    );
  }

  const { title, description, image, skills, experiences } = aboutData;

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* النص والمحتوى */}
          <div>
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              {title}
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {description}
            </p>

            {/* المهارات */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <TooltipProvider delayDuration={100}>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div ref={(el) => (skillsRef.current[index] = el)}>
                          <Badge
                            variant="outline"
                            className="px-4 py-2 text-white text-sm bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer pointer-events-auto"
                          >
                            {skill.name}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        sideOffset={5}
                        className="bg-black/90 backdrop-blur-md border-white/20 text-white z-100 max-w-xs"
                      >
                        <p className="text-sm">{skill.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    ref={(el) => (experienceRef.current[index] = el)}
                    className="border-l-2 border-white/20 pl-6 py-2 hover:border-white/40 transition-colors duration-300"
                  >
                    <h4 className="text-xl font-semibold">{exp.role}</h4>
                    <p className="text-gray-400">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الصورة */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <Image
              src={image ? urlFor(image).url() : "/myPhoto2.jpg"}
              alt={title}
              width={700}
              height={500}
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
