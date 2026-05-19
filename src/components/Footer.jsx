import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-border mt-12 bg-background w-full">
      {/* Paddingnya kita perkecil jadi px-4 atau px-8 biar mentok ke tepi layar */}
      <div className="w-full px-4 sm:px-8 py-6 flex justify-between items-center">
        
        <p className="text-sm text-muted-foreground font-medium">
          &copy; {new Date().getFullYear()} hanadewi.
        </p>
        
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary text-primary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};