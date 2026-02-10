"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo, LogoText } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";

const footerLinks = {
  services: [
    { label: "Web3 & Blockchain", href: "#web3" },
    { label: "Website Development", href: "#website" },
    { label: "Software Development", href: "#software" },
    { label: "App Development", href: "#app" },
    { label: "AI Solutions", href: "#ai" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      gsap.fromTo(
        footerRef.current.querySelectorAll(".footer-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-foreground text-background py-12 sm:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        {/* Footer Grid */}
        <div className="footer-animate grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo size="md" color="white" />
              <LogoText color="white" />
            </div>
            <p className="text-body-sm text-background/70 mb-4">
              Elite IT services agency engineering the future through
              cutting-edge technology solutions.
            </p>
            <p className="text-body-sm text-background/70 mb-1">
              📧 info@kramatrix.com
            </p>
            <p className="text-body-sm text-background/70 mb-1">
              📞 +91 72910 56360
            </p>
            <p className="text-caption text-background/50 uppercase tracking-widest mt-4">
              The Future, Engineered.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-display uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/70 hover:text-background transition-colors"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-display uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/70 hover:text-background transition-colors"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-display uppercase tracking-wider mb-6">
              Connect
            </h3>
            <div className="flex gap-4 mb-6">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 flex items-center justify-center",
                    "border border-background/30",
                    "text-background/70 hover:text-background",
                    "hover:border-background",
                    "transition-all duration-300"
                  )}
                  aria-label={link.label}
                  data-cursor="hover"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className={cn(
                "inline-block px-6 py-2.5",
                "bg-background text-foreground",
                "text-sm font-display uppercase tracking-wider",
                "border-2 border-background",
                "transition-all duration-300 ease-brutalist",
                "hover:bg-transparent hover:text-background"
              )}
              data-cursor="hover"
            >
              Free Consultation
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-caption text-background/50">
              © {new Date().getFullYear()} KRAMATRIX. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="text-caption text-background/50 hover:text-background transition-colors"
                data-cursor="hover"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-caption text-background/50 hover:text-background transition-colors"
                data-cursor="hover"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
