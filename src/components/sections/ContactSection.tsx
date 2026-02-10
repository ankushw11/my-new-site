"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const contactChannels = [
  {
    icon: "📧",
    label: "Email",
    value: "info@kramatrix.com",
    href: "mailto:info@kramatrix.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 72910 56360",
    href: "tel:+917291056360",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "Chat with us at +91 72910 56360",
    href: "https://wa.me/917291056360",
  },
  {
    icon: "📨",
    label: "Telegram",
    value: "Message us at +91 72910 56360",
    href: "https://t.me/+917291056360",
  },
  {
    icon: "🕐",
    label: "Business Hours",
    value: "Mon-Fri: 8:00 AM - 6:30 PM IST",
    href: null,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".contact-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ fullName: "", email: "", company: "", projectDetails: "" });

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-24 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-gutter">
        {/* Heading */}
        <div className="contact-animate text-center mb-10 sm:mb-16">
          <span className="text-accent font-mono text-xs sm:text-body-sm uppercase tracking-widest mb-3 sm:mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-brutalist text-3xl sm:text-4xl lg:text-display-lg mb-3 sm:mb-4">
            LET&apos;S BUILD
          </h2>
          <p className="text-sm sm:text-base lg:text-body-lg text-primary-foreground/70 max-w-2xl mx-auto px-4 sm:px-0">
            Ready to engineer the future together? Let&apos;s discuss your next
            project and create something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 max-w-6xl mx-auto">
          {/* Contact Channels */}
          <div className="contact-animate">
            <h3 className="font-display text-xl uppercase tracking-wider mb-8">
              Reach Us Directly
            </h3>

            <div className="space-y-6">
              {contactChannels.map((channel, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{channel.icon}</span>
                  <div>
                    <p className="text-sm font-display uppercase tracking-wider text-primary-foreground/50 mb-1">
                      {channel.label}
                    </p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-body-md text-primary-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                        data-cursor="hover"
                      >
                        {channel.value}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="text-body-md text-primary-foreground">
                        {channel.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-animate">
            <h3 className="font-display text-xl uppercase tracking-wider mb-2">
              Send us a Message
            </h3>
            <p className="text-body-sm text-primary-foreground/50 mb-8">
              We&apos;ll get back to you within 24 hours
            </p>

            {submitted ? (
              <div className="p-8 border-2 border-accent text-center">
                <span className="text-4xl block mb-4">🚀</span>
                <h4 className="font-display text-lg uppercase tracking-wider mb-2">
                  Message Sent!
                </h4>
                <p className="text-body-sm text-primary-foreground/70">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-display uppercase tracking-wider text-primary-foreground/50 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3 bg-transparent",
                      "border-2 border-primary-foreground/30",
                      "text-primary-foreground placeholder:text-primary-foreground/30",
                      "focus:border-accent focus:outline-none",
                      "transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-display uppercase tracking-wider text-primary-foreground/50 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3 bg-transparent",
                      "border-2 border-primary-foreground/30",
                      "text-primary-foreground placeholder:text-primary-foreground/30",
                      "focus:border-accent focus:outline-none",
                      "transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-display uppercase tracking-wider text-primary-foreground/50 mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3 bg-transparent",
                      "border-2 border-primary-foreground/30",
                      "text-primary-foreground placeholder:text-primary-foreground/30",
                      "focus:border-accent focus:outline-none",
                      "transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="block text-sm font-display uppercase tracking-wider text-primary-foreground/50 mb-2"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="projectDetails"
                    required
                    rows={4}
                    placeholder="Tell us about your project requirements..."
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectDetails: e.target.value,
                      })
                    }
                    className={cn(
                      "w-full px-4 py-3 bg-transparent resize-none",
                      "border-2 border-primary-foreground/30",
                      "text-primary-foreground placeholder:text-primary-foreground/30",
                      "focus:border-accent focus:outline-none",
                      "transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-8 py-4",
                    "bg-primary-foreground text-primary",
                    "font-display text-sm uppercase tracking-wider",
                    "border-2 border-primary-foreground",
                    "transition-all duration-300 ease-brutalist",
                    "hover:bg-transparent hover:text-primary-foreground",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  data-cursor="hover"
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Get Free Consultation 🚀"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
