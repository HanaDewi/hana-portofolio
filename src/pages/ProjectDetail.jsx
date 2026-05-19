import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Workflow, PenTool, MonitorPlay } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import NotFound from "./NotFound";
import { supabase } from "@/lib/supabase";

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjectDetail = async () => {
      try {
        const { data, error } = await supabase.from("projects").select("*").eq("slug", projectId).single();

        if (error) {
          console.error("Gagal ambil detail project:", error);
          setProject(null);
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-primary font-bold animate-pulse">Loading Project...</div>
      </div>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className={`${project.hero?.bgColor || "bg-primary/10"} text-primary px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-20 overflow-hidden`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">{project.title}</h1>
              <p className="text-base sm:text-lg md:text-xl text-primary leading-relaxed">{project.description}</p>
            </div>

            <div className="relative order-1 lg:order-2 w-full flex items-center justify-center py-8 lg:py-12">
              {project.hero_screenshots && project.hero_screenshots.length >= 3 && (
                <div className="relative w-[85%] sm:w-[90%] aspect-video">
                  {/* Image 3 */}
                  <div className="absolute inset-0 shadow-2xl transform rotate-3 translate-x-4 sm:translate-x-6 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-50 bg-white rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20 overflow-hidden">
                    <img src={project.hero_screenshots[2]} alt={`${project.title} screenshot 3`} className="w-full h-full object-cover object-top" />
                  </div>
                  {/* Image 2 */}
                  <div className="absolute inset-0 shadow-2xl transform -rotate-1 -translate-x-1 transition-all duration-300 z-10 hover:rotate-0 hover:scale-105 hover:z-50 bg-white rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20 overflow-hidden">
                    <img src={project.hero_screenshots[1]} alt={`${project.title} screenshot 2`} className="w-full h-full object-cover object-top" />
                  </div>
                  {/* Image 1 */}
                  <div className="absolute inset-0 shadow-2xl transform rotate-1 -translate-x-6 sm:-translate-x-8 transition-all duration-300 z-20 hover:rotate-0 hover:scale-105 hover:z-50 bg-white rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20 overflow-hidden">
                    <img src={project.hero_screenshots[0]} alt={`${project.title} screenshot 1`} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* My Role & Development Process Section */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative">
        <div className="container mx-auto max-w-5xl">
          
          {/* Bagian My Role */}
          {project.role_description && (
            <div className="mb-12 sm:mb-16">
              <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">My Role in This Project</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-center text-sm sm:text-base max-w-4xl mx-auto">{project.role_description}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {project.technologies &&
                  project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full font-medium text-xs sm:text-sm">
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          )}
          
          {/* --- DEVELOPMENT PROCESS SECTION --- */}
          {(Array.isArray(project.bpmn_gallery) && project.bpmn_gallery.length > 0 || Array.isArray(project.uiux_gallery) && project.uiux_gallery.length > 0 || Array.isArray(project.gallery) && project.gallery.length > 0) && (
            <div className="w-full pt-16 mt-8 border-t border-primary/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-12">Development Process</h3>

              {/* BPMN */}
              {Array.isArray(project.bpmn_gallery) && project.bpmn_gallery.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-6 text-left">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0"><Workflow size={24} /></div>
                    <div>
                      <h4 className="text-xl font-bold text-primary">Business Process & Flow</h4>
                      {/* <p className="text-sm text-muted-foreground mt-1">Merancang alur logika dan proses bisnis (BPMN).</p> */}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
                    {project.bpmn_gallery.map((imgUrl, idx) => (
                      <a 
                        key={`bpmn-${idx}`} 
                        href={project.bpmn_link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative bg-white rounded-xl shadow-md border border-primary/10 aspect-video flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden"
                      >
                        <img src={imgUrl} alt={`BPMN ${idx + 1}`} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                          <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* FASE: UI/UX Design */}
              {Array.isArray(project.uiux_gallery) && project.uiux_gallery.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-6 text-left">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0"><PenTool size={24} /></div>
                    <div>
                      <h4 className="text-xl font-bold text-primary">UI/UX Design</h4>
                      {/* <p className="text-sm text-muted-foreground mt-1">Menerjemahkan alur menjadi antarmuka (Figma).</p> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
                    {project.uiux_gallery.map((imgUrl, idx) => {
                      // Jika ada uiux_gallery_link di Supabase, render sebagai link h-ref eksternal
                      if (project.uiux_gallery_link) {
                        return (
                          <a 
                            key={`uiux-${idx}`}
                            href={project.uiux_gallery_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white rounded-xl shadow-md border border-primary/10 aspect-video flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden"
                          >
                            <img src={imgUrl} alt={`UIUX ${idx + 1}`} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </a>
                        );
                      }
                        return (
                        <div 
                          key={`uiux-${idx}`} 
                          className="group relative bg-white rounded-xl shadow-md border border-primary/10 aspect-video flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden" 
                          onClick={() => document.getElementById(`modal-uiux-${idx}`).showModal()}
                        >
                          <img src={imgUrl} alt={`UIUX ${idx + 1}`} className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                            <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <dialog id={`modal-uiux-${idx}`} className="modal p-0 bg-black/90 backdrop:bg-black/80 w-screen h-screen max-w-none max-h-none overflow-hidden cursor-zoom-out" onClick={(e) => { if (e.target.tagName === "DIALOG") e.target.close(); }}>
                            <div className="w-full h-full flex items-center justify-center p-4 md:p-10 relative">
                              <form method="dialog"><button className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 bg-black/30 rounded-full"><ArrowLeft size={24} /></button></form>
                              <img src={imgUrl} alt="UIUX Fullscreen" className="max-w-full max-h-full object-contain shadow-2xl" />
                            </div>
                          </dialog>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FASE: Final Implementation */}
              {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6 text-left">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0"><MonitorPlay size={24} /></div>
                    <div>
                      <h4 className="text-xl font-bold text-primary">Final Implementation</h4>
                      {/* <p className="text-sm text-muted-foreground mt-1">Hasil pengembangan web aplikasi aktual.</p> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
                    {project.gallery.map((imgUrl, idx) => (
                      <div key={`gallery-${idx}`} className="group relative bg-white rounded-xl shadow-md border border-primary/10 aspect-video flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden" onClick={() => document.getElementById(`modal-gallery-${idx}`).showModal()}>
                        <img src={imgUrl} alt={`Final ${idx + 1}`} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                          <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <dialog id={`modal-gallery-${idx}`} className="modal p-0 bg-black/90 backdrop:bg-black/80 w-screen h-screen max-w-none max-h-none overflow-hidden cursor-zoom-out" onClick={(e) => { if (e.target.tagName === "DIALOG") e.target.close(); }}>
                          <div className="w-full h-full flex items-center justify-center p-4 md:p-10 relative">
                            <form method="dialog"><button className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 bg-black/30 rounded-full"><ArrowLeft size={24} /></button></form>
                            <img src={imgUrl} alt="Final Fullscreen" className="max-w-full max-h-full object-contain shadow-2xl" />
                          </div>
                        </dialog>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <span className="text-sm text-muted-foreground italic tracking-wide">
                      and more..
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* --- END OF DEVELOPMENT PROCESS --- */}
        </div>
      </section>

      {/* Services/Layanan */}
      {project.services && project.services.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Layanan</h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">Berikut adalah layanan yang dapat Anda nikmati dengan mudah</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.services.map((service, idx) => (
                <div key={idx} className="bg-card p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-primary/5">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Waste Types / Jenis Sampah */}
      {project.wasteTypes && project.wasteTypes.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Jenis Sampah</h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">Lihat berbagai jenis sampah yang dapat Anda tukarkan beserta harganya</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {project.wasteTypes.map((waste, idx) => (
                <div key={idx} className="bg-card p-4 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow border border-primary/5">
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{waste.icon}</div>
                  <h3 className="font-bold mb-1 text-sm sm:text-base">{waste.name}</h3>
                  <p className="text-primary font-semibold text-xs sm:text-sm">{waste.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="bg-primary/10 p-6 sm:p-8 rounded-xl text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Links */}
      <section className="pb-16 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base">
                <ExternalLink size={18} className="sm:w-5 sm:h-5" /> View Demo
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base">
                <Github size={18} className="sm:w-5 sm:h-5" /> View Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <Link to="/#projects" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 bg-primary text-primary-foreground p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
        <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
      </Link>

      <Footer />
    </div>
  );
};