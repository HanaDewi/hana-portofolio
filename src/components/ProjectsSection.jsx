import { useEffect, useState } from "react"; // Tambahkan ini
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase';

export const ProjectsSection = () => {
  // 1. Siapkan state untuk menampung data dari Supabase
  const [projectList, setProjectList] = useState([]);

  // 2. Fungsi untuk mengambil data
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects') 
        .select('*').eq('is_featured', true);
      
      if (error) {
        console.error("Gagal ambil data:", error);
      } else {
        console.log("Data Featured:", data);
        setProjectList(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A showcase of projects developed through organizational activities, academic projects, internships, and independent initiatives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3. Gunakan projectList hasil fetch dari database */}
          {projectList.map((project, key) => (
            <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-lg card-hover">
              <Link to={`/projects/${project.id}`} className="block h-48 overflow-hidden">
                <img 
                  src={project.image_url} // Pastikan namanya image_url sesuai kolom Supabase
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </Link>

              <div className="p-6">
                {/* Bagian tags ini opsional, kalau di Supabase belum ada kolom tags bisa dikomentari dulu */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags && project.tags.split(',').map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-xl font-semibold mb-1 hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex justify-start items-center">
                  <Link 
                    to={`/projects/${project.id}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link className="cosmic-button w-fit flex items-center mx-auto gap-2" to="/other-projects">
            Other Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};