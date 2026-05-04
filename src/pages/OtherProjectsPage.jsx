import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; 
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const OtherProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      // Mengambil data yang is_featured-nya FALSE
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Data Other Projects:", data);
        setProjects(data);
      }
      setLoading(false);
    };

    fetchAllProjects();
  }, []);

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading projects...</div>;

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Other <span className="text-primary">Projects</span>
        </h1>
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Home
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-hover"
          >
            {/* Image Section dengan Zoom Effect */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.split(',').map((tag, i) => (
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
                  to={`/projects/${project.id}`} 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Details →
                </Link>

                {/* Ikon Link External jika ada link demo */}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No extra projects found in database.</p>
        </div>
      )}
    </div>
  );
};

export default OtherProjectsPage;