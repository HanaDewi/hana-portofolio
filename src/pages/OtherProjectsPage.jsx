import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; 
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer"; 

const OtherProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', false)
        .eq('is_visible', true)
        .order('id', { ascending: true });

      if (error) {
        console.error("Error:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchAllProjects();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-xl text-primary font-bold animate-pulse">Loading projects...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar /> 
      <section className="pt-32 pb-4 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Other <span className="text-primary">Projects</span>
          </h2>
          
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A collection of various design projects, posters, presentations, and other creative commissions I have worked on.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-hover"
              >
                <div className="h-48 overflow-hidden relative">
                  {/* MODIFIKASI: Menambahkan object-top di sini */}
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags && project.tags.split(',').map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <Link 
                      to={`/projects/${project.slug}`} 
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No extra projects found in database.</p>
            </div>
          )}
          <div className="text-center mt-16">
              <Link to="/#projects" className="cosmic-button w-fit flex items-center mx-auto gap-2">← Back to Home
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OtherProjectsPage;