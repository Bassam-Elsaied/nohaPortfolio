"use client";

import { useState, useEffect } from "react";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSectio";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import MoreProjects from "@/components/MoreProjects";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { LoadingScreen } from "./loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // هنا تقدر تغير عدد الثواني (3000 = 3 ثوان)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3 ثوانٍ

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about-me">
        <AboutSection />
      </div>
      <hr className="my-10 border-gray-700" />
      <div id="projects">
        <ProjectsSection />
        <MoreProjects />
        <Testimonials />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <hr className=" border-gray-700" />
      <Footer />
    </main>
  );
}
