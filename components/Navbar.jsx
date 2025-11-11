"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    if (isMenuOpen) {
      // أنيميشن فتح القائمة
      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });

      // أنيميشن عناصر القائمة
      gsap.fromTo(
        menuItemsRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    } else {
      // أنيميشن إغلاق القائمة
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // إغلاق القائمة في حالة الموبايل
    closeMenu();
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-me" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* الشعار */}
            <div className="text-white text-xl font-semibold">
              Noha Elbendary.
            </div>

            {/* قائمة التنقل للشاشات الكبيرة */}
            <ul className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-white/90 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* زر قائمة الموبايل */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white z-60 relative"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* قائمة الموبايل Full Screen */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-screen bg-black/95 backdrop-blur-lg z-55 md:hidden translate-x-full"
        style={{ transform: "translateX(100%)" }}
      >
        {/* زر الإغلاق */}
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-white z-60"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* عناصر القائمة */}
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-white text-4xl font-semibold hover:text-white/70 transition-colors duration-200 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* نص إضافي */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-white/50 text-sm">
            Let&apos;s create something amazing
          </p>
        </div>
      </div>
    </>
  );
}
