import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { HashLink } from "react-router-hash-link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Certificates", href: "/#certificates" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        <a className="text-xl font-bold text-primary flex items-center z-50" href="/">
          <span className="relative z-10">
            <span className="text-glow text-foreground"> Hana </span> Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 min-h-[40px]">
          {navItems.map((item, key) => (
            <HashLink
              key={key}
              smooth
              to={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </HashLink>
          ))}
          {/* <ThemeToggle /> */}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground focus:outline-none z-50 transition-transform active:scale-95"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl text-center">
            {navItems.map((item, key) => (
              <HashLink
                key={key}
                smooth
                to={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </HashLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};