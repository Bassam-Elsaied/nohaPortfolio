"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function MoreProjects() {
  const [moreProjects, setMoreProjects] = useState([]);

  // Fetch non-featured projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && isFeatured == false] | order(order asc) {
          _id,
          title,
          category,
          description,
          image,
          link
        }`;
        const data = await client.fetch(query);
        setMoreProjects(data);
      } catch (error) {
        console.error("Error fetching more projects:", error);
      }
    };

    fetchProjects();
  }, []);

  if (moreProjects.length === 0) {
    return null; // Don't show the section if no projects
  }

  return (
    <section className="relative bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            More Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore additional projects showcasing diverse skills and creative
            solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moreProjects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={
                    project.image
                      ? urlFor(project.image).width(600).height(400).url()
                      : "/placeholder.jpg"
                  }
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="bg-white text-black px-4 py-2 rounded-full block w-full text-center mt-4 font-semibold"
                >
                  Content plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
