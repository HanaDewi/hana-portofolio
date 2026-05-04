import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
  return <NotFound />;
}

  return (
    <div className="min-h-screen">
      <Navbar />
      
     {/* Hero Section with Overlapping Images */}
      <section className={`${project.hero.bgColor} text-primary px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden`}>
        {/* ↑ Responsive padding */}
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* ↑ Mobile 1 kolom, desktop 2 kolom */}
            
            {/* Left Side - Text Content */}
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              {/* ↑ Mobile center, desktop left, order untuk mobile */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                {/* ↑ Responsive font size */}
                {project.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-primary leading-relaxed">
                {/* ↑ Responsive font size */}
                {project.description}
              </p>
            </div>

            {/* Right Side - Overlapping Screenshots */}
            <div className="relative h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px] order-1 lg:order-2">
              {/* ↑ Responsive height, gambar di atas di mobile */}
              {project.heroScreenshots && project.heroScreenshots.length >= 3 && (
                <>
                  {/* Screenshot 3 - Back (Bottom Right) */}
                  <div className="absolute top-8 sm:top-10 md:top-12 right-0 w-[80%] sm:w-[85%] shadow-2xl transform rotate-2 sm:rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 sm:hover:scale-110 hover:z-50">
                    {/* ↑ Responsive positioning & scale */}
                    <img 
                      src={project.heroScreenshots[2]} 
                      alt={`${project.title} screenshot 3`}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20"
                    />
                  </div>

                  {/* Screenshot 2 - Middle */}
                  <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-6 md:right-8 w-[80%] sm:w-[85%] shadow-2xl transform -rotate-1 sm:-rotate-2 transition-all duration-300 z-10 hover:rotate-0 hover:scale-105 sm:hover:scale-110 hover:z-50">
                    <img 
                      src={project.heroScreenshots[1]} 
                      alt={`${project.title} screenshot 2`}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20"
                    />
                  </div>

                  {/* Screenshot 1 - Front (Top Left) */}
                  <div className="absolute top-0 left-0 w-[80%] sm:w-[85%] shadow-2xl transform rotate-1 sm:rotate-2 transition-all duration-300 z-20 hover:rotate-0 hover:scale-105 sm:hover:scale-110 hover:z-50">
                    <img 
                      src={project.heroScreenshots[0]} 
                      alt={`${project.title} screenshot 1`}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white/20"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What is this */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-background">
        {/* ↑ Responsive padding */}
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">What is this?</h2>
          {/* ↑ Responsive font size */}
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {/* ↑ Responsive font size */}
            {project.role.description}
          </p>
        </div>
      </section>
      
      {/* My Role */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">{project.role.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-center text-sm sm:text-base">
            {/* ↑ Responsive font size */}
            {project.role.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {/* ↑ Responsive gap */}
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full font-medium text-xs sm:text-sm"
              >
                {/* ↑ Responsive padding & font */}
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pages/Screenshots */}
      {project.pages && project.pages.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Pages</h2>
            
            <div className="space-y-12 sm:space-y-14 md:space-y-16">
              {/* ↑ Responsive spacing */}
              {project.pages.map((page, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center"
                >
                  {/* ↑ Mobile 1 kolom, tablet+ 2 kolom */}
                  <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                    <img 
                      src={page.image} 
                      alt={page.title}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    {/* ↑ Mobile center, desktop left */}
                    <h3 className="text-primary text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{page.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{page.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services/Layanan */}
      {project.services && project.services.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Layanan</h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">
              Berikut adalah layanan yang dapat Anda nikmati dengan mudah
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* ↑ Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
              {project.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="bg-card p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
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
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Jenis Sampah</h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">
              Lihat berbagai jenis sampah yang dapat Anda tukarkan beserta harganya
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {/* ↑ Responsive grid: 2 mobile, 3 tablet, 4 desktop */}
              {project.wasteTypes.map((waste, idx) => (
                <div 
                  key={idx}
                  className="bg-card p-4 sm:p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
                >
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
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* ↑ Mobile 1 kolom, tablet+ 2 kolom */}
              {project.stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-primary/10 p-6 sm:p-8 rounded-xl text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Links */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {/* ↑ Stack vertical di mobile, horizontal di tablet+ */}
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                {/* ↑ Responsive icon size */}
                View Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Back Button (Fixed di kiri bawah) */}
      <Link 
        to="/#projects"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 bg-primary text-primary-foreground p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      >
        {/* ↑ Responsive positioning & padding */}
        <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        {/* ↑ Responsive icon size */}
      </Link>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};