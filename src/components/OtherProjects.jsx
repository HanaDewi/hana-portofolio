import { ArrowRight, ExternalLink, Github } from "lucide-react";


const projects = [
  {
    id: 1,
    title: "Feed Instagram",
    description: "Design project for organization",
    image: "/projects/other/other1.png",
    tags: ["Adobe Illustrator"],
    demoUrl: "https://www.canva.com/design/DAGz54YWcCU/LiASNjeMkHVIkfF8qIkSxQ/view?utm_content=DAGz54YWcCU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2665b9d6ed",
  },
  {
    id: 2,
    title: "Poster",
    description: "Poster for organization and commission",
    image: "/projects/other/other2.png",
    tags: ["Adobe Illustrator", "Canva"],
    demoUrl: "https://www.canva.com/design/DAGz54YWcCU/LiASNjeMkHVIkfF8qIkSxQ/view?utm_content=DAGz54YWcCU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2665b9d6ed",
  },
  {
    id: 3,
    title: "Presentation",
    description: "Presentation slides for orders.",
    image: "/projects/other/other3.png",
    tags: ["Canva"],
    demoUrl: "https://www.canva.com/design/DAGz54YWcCU/LiASNjeMkHVIkfF8qIkSxQ/view?utm_content=DAGz54YWcCU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2665b9d6ed",
  },
  {
    id: 4,
    title: "REVERSE",
    description: "A platform for easy vehicle maintenance and rental, designed to support busy users' driving needs.",
    image: "/projects/project2.png",
    tags: ["Figma"],
    demoUrl: "https://hanadewi.my.canva.site/reverse",
  },
];

export const OtherProjects = () => {
  return (
    <section id="projects" className="py-16 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {" "}
          Other <span className="text-primary"> Projects </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a href={project.demoUrl} target="_blank" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
