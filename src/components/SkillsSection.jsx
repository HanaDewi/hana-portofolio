import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase"; 

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills") 
          .select("*")
          .eq("is_visible", true)
          .order("id", { ascending: true }); 

        if (error) {
          console.error("Gagal mengambil data skills:", error);
        } else {
          setSkillsData(data);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

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

        {/* Loading Indicator*/}
        {loading ? (
          <div className="text-center text-primary animate-pulse">Loading skills...</div>
        ) : (
          /* Skill Cards */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 text-center"
                data-aos="zoom-in"
                data-aos-delay={(idx % 4) * 80} 
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
        )}
      </div>
    </section>
  );
};