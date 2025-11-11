"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Amira Ibrahim",
      image: "/female.jpg",
      rating: 5.0,
      review: "تحفة جدأ",
    },
    {
      id: 2,
      name: "Radwa Marketing",
      image: "/female.jpg",
      rating: 5.0,
      review: "نهي أهم كونتنت كريتور ❤️",
    },
    {
      id: 3,
      name: "Omnia Farag",
      image: "/female.jpg",
      rating: 5.0,
      review:
        "ده بسبب الكونتنت العظيم اللي بتكتبيه والرفرينس بيساعدني كتير تسلم ايدك ❤️❤️",
    },
    {
      id: 4,
      name: "Ahmed Kamel",
      image: "/male.jpg",
      rating: 5.0,
      review: "شغل كويس جدا اللي عملاه دا",
    },
  ];

  // مضاعفة الـ testimonials للحصول على infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2; // نصف العرض لأننا ضاعفنا المحتوى

    // إنشاء الأنيميشن
    animationRef.current = gsap.to(slider, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 0.3, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(91,108,255,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(91,108,255,0.08),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          {/* Image on Left */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/testimonial.jpg"
                alt="Client Reviews"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-20 h-20 border-2 border-white/30 rounded-full" />
              <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-white/20 rounded-full" />
            </div>
          </div>

          {/* Content on Right */}
          <div className="w-full md:w-1/2 text-center ">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
              Reviews
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Client Reviews
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Real feedback from clients who trusted my expertise to elevate
              their brands successfully.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center items-center">
              <Link
                href="#projects"
                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                My Works
              </Link>
              <Link
                href="#about-me"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-medium transition-all duration-300"
              >
                See Services
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonial Slider - Horizontal Auto-Scroll */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[90vw] md:w-[500px] bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
              >
                {/* Client Image & Info */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 min-h-[30px]">
                  &quot;{testimonial.review}&quot;
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold ml-2">
                    {testimonial.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
