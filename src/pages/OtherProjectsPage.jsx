import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; 
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer"; 

const OtherProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground/80 animate-pulse">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar /> 

      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 w-14 h-14 bg-[#1e293b] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-white/10"
        aria-label="Kembali ke halaman sebelumnya"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
      </button>

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
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OtherProjectsPage;