"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonogramSVG } from "@/components/ui/MonogramSVG";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "/portfolios", label: "Work" },
  { href: "/profile", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Initial animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Hide/show on scroll
      let lastScrollY = 0;

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const scrollY = self.scroll();
          const direction = scrollY > lastScrollY ? "down" : "up";

          if (scrollY > 200) {
            if (direction === "down") {
              gsap.to(headerRef.current, {
                y: -100,
                duration: 0.3,
                ease: "power2.out",
              });
            } else {
              gsap.to(headerRef.current, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }

          lastScrollY = scrollY;
        },
      });
    },
    { scope: headerRef }
  );

  // Mobile menu animation
  useGSAP(
    () => {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          ".mobile-nav-link",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    },
    { dependencies: [isMobileMenuOpen] }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-header",
          "transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-foreground/10"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-gutter">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3"
              data-cursor="hover"
            >
              <MonogramSVG size={36} animated />
              <span className="hidden sm:block font-display text-lg tracking-wider uppercase">
                KRAMATRIX
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "relative text-sm font-display uppercase tracking-wider",
                      "text-foreground hover:text-accent",
                      "transition-colors duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5",
                      "after:bg-accent after:transition-all after:duration-300",
                      "hover:after:w-full"
                    )}
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className={cn(
                  "px-6 py-2.5 bg-primary text-primary-foreground",
                  "text-sm font-display uppercase tracking-wider",
                  "border-2 border-primary",
                  "transition-all duration-300 ease-brutalist",
                  "hover:bg-transparent hover:text-primary"
                )}
                data-cursor="hover"
              >
                Free Consultation
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-cursor="hover"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-modal bg-background",
          "flex flex-col items-center justify-center",
          "transition-all duration-500 ease-brutalist",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.href}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mobile-nav-link text-display-sm font-display uppercase tracking-tight text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                data-cursor="hover"
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className={cn(
              "mobile-nav-link mt-8 px-8 py-4 bg-primary text-primary-foreground",
              "text-sm font-display uppercase tracking-wider",
              "border-2 border-primary",
              "transition-all duration-300 ease-brutalist",
              "hover:bg-transparent hover:text-primary"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
            data-cursor="hover"
          >
            Free Consultation
          </a>
        </nav>
      </div>
    </>
  );
}
