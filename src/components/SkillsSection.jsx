import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML5", icon: "/skills/html5.png", category: "frontend" },
  { name: "CSS3", icon: "/skills/CSS3.png", category: "frontend" },
  { name: "JavaScript", icon: "/skills/javascript.png", category: "frontend" },
  { name: "React", icon: "/skills/Reac.png", category: "frontend" },
  { name: "Tailwind", icon: "/skills/Tailwind.png", category: "frontend" },

  // Backend & Framework
  { name: "MySQL", icon: "/skills/mysql.png", category: "backend" },
  { name: "PHP", icon: "/skills/php.png", category: "backend" },
  { name: "Laravel", icon: "/skills/laravel.png", category: "backend" },

  // Tools & Design
  { name: "GitHub", icon: "/skills/github.png", category: "tools" },
  { name: "Figma", icon: "/skills/figma.png", category: "tools" },
  { name: "VS Code", icon: "/skills/vscode.png", category: "tools" },
  { name: "Adobe Illustrator", icon: "/skills/AdobeIllustrator.png", category: "tools" },
  { name: "Canva", icon: "/skills/canva.png", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-1 px-4 relative bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 text-center"
              data-aos="zoom-in"
              data-aos-delay={idx * 80} 
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-20 h-20 mx-auto mb-4 object-contain"
              />
              <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
