"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isOpen: boolean;
}

const jobPostings: JobPosting[] = [
  {
    id: "senior-fullstack-dev",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Delhi, India / Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "We're looking for a Senior Full-Stack Developer to build cutting-edge web applications using Next.js, React, and Node.js. You'll work on high-impact projects for global clients.",
    responsibilities: [
      "Architect and develop scalable web applications",
      "Lead code reviews and mentor junior developers",
      "Collaborate with design and product teams",
      "Optimize application performance and SEO",
      "Implement CI/CD pipelines and DevOps best practices",
    ],
    requirements: [
      "4+ years experience with React/Next.js",
      "Strong TypeScript and Node.js skills",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Understanding of cloud services (AWS/GCP/Azure)",
      "Excellent problem-solving abilities",
    ],
    isOpen: true,
  },
  {
    id: "blockchain-developer",
    title: "Blockchain / Web3 Developer",
    department: "Engineering",
    location: "Delhi, India / Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Join our Web3 team to build decentralized applications, smart contracts, and blockchain infrastructure for enterprise clients.",
    responsibilities: [
      "Develop and audit smart contracts (Solidity/Rust)",
      "Build DeFi protocols and NFT marketplaces",
      "Integrate blockchain solutions with existing systems",
      "Research and implement new Web3 technologies",
      "Write comprehensive tests for smart contracts",
    ],
    requirements: [
      "2+ years experience in blockchain development",
      "Proficiency in Solidity, Hardhat, or Foundry",
      "Understanding of DeFi protocols and tokenomics",
      "Experience with ethers.js or web3.js",
      "Knowledge of EVM-compatible chains",
    ],
    isOpen: true,
  },
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    department: "AI & Innovation",
    location: "Delhi, India / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Help us build intelligent AI solutions, LLM integrations, and machine learning pipelines for our enterprise clients.",
    responsibilities: [
      "Design and implement ML models and AI pipelines",
      "Integrate LLMs (GPT, Claude, Llama) into products",
      "Build RAG systems and AI agents",
      "Optimize model performance and inference speed",
      "Collaborate with engineering teams on AI features",
    ],
    requirements: [
      "3+ years experience in ML/AI development",
      "Proficiency in Python, PyTorch or TensorFlow",
      "Experience with LLM APIs and prompt engineering",
      "Knowledge of vector databases (Pinecone, Weaviate)",
      "Strong mathematical and statistical foundation",
    ],
    isOpen: true,
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Delhi, India / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We need a talented UI/UX Designer to craft premium, brutalist-inspired digital experiences that push creative boundaries.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create wireframes, prototypes, and design systems",
      "Conduct user research and usability testing",
      "Collaborate with developers on implementation",
      "Maintain and evolve the KRAMATRIX design language",
    ],
    requirements: [
      "3+ years experience in UI/UX design",
      "Expert in Figma and design tools",
      "Strong portfolio showcasing web/app design",
      "Understanding of design systems and accessibility",
      "Experience with motion design is a plus",
    ],
    isOpen: true,
  },
];

function JobCard({ job }: { job: JobPosting }) {
  return (
    <div
      className={cn(
        "group border border-foreground/10 p-6 sm:p-8",
        "hover:border-foreground/40 transition-all duration-300",
        "bg-background"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight mb-2">
            {job.title}
          </h3>
          <p className="text-sm font-display uppercase tracking-wider text-foreground/50">
            {job.department}
          </p>
        </div>
        {job.isOpen ? (
          <span className="inline-flex items-center px-3 py-1 text-xs font-display uppercase tracking-wider bg-foreground text-background self-start">
            Open
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 text-xs font-display uppercase tracking-wider bg-foreground/20 text-foreground/50 self-start">
            Closed
          </span>
        )}
      </div>

      <p className="text-body-sm text-foreground/70 mb-6">{job.description}</p>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-foreground/60">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4" />
          {job.experience}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-display uppercase tracking-wider mb-3">
            Responsibilities
          </h4>
          <ul className="space-y-2">
            {job.responsibilities.map((item, i) => (
              <li
                key={i}
                className="text-body-sm text-foreground/70 flex items-start gap-2"
              >
                <span className="text-foreground/30 mt-1.5 flex-shrink-0">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-display uppercase tracking-wider mb-3">
            Requirements
          </h4>
          <ul className="space-y-2">
            {job.requirements.map((item, i) => (
              <li
                key={i}
                className="text-body-sm text-foreground/70 flex items-start gap-2"
              >
                <span className="text-foreground/30 mt-1.5 flex-shrink-0">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={`mailto:info@kramatrix.com,career@kramatrix.com?subject=Application: ${job.title}&body=Hi KRAMATRIX Team,%0D%0A%0D%0AI am interested in the ${job.title} position.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards`}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3",
          "bg-foreground text-background",
          "text-sm font-display uppercase tracking-wider",
          "hover:bg-foreground/90 transition-all duration-300",
          "group-hover:translate-x-0"
        )}
      >
        Apply Now
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

export default function CareersPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pageRef.current) return;

      gsap.fromTo(
        pageRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-display uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-sm font-display uppercase tracking-widest text-foreground/50">
            KRAMATRIX
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-in">
            <span className="inline-block px-4 py-1.5 border border-foreground/20 text-xs font-display uppercase tracking-widest mb-6">
              Join Our Team
            </span>
          </div>
          <h1 className="animate-in text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            BUILD THE
            <br />
            <span className="text-foreground/30">FUTURE WITH US.</span>
          </h1>
          <p className="animate-in text-lg sm:text-xl text-foreground/70 max-w-2xl mb-8">
            We&apos;re a team of engineers, designers, and innovators building
            cutting-edge solutions in Web3, AI, and enterprise software. Join us
            and work on projects that matter.
          </p>
          <div className="animate-in flex flex-wrap gap-6 text-sm text-foreground/50 font-display uppercase tracking-wider">
            <span>🌍 Remote-First</span>
            <span>💡 Innovation-Driven</span>
            <span>🚀 Fast-Growing</span>
            <span>📈 Career Growth</span>
          </div>
        </div>
      </section>

      {/* Why KRAMATRIX */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="animate-in text-2xl sm:text-3xl font-display font-bold tracking-tight mb-12">
            WHY KRAMATRIX?
          </h2>
          <div className="animate-in grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cutting-Edge Tech",
                desc: "Work with the latest in AI, Web3, blockchain, and cloud technologies. We don't follow trends — we set them.",
              },
              {
                title: "Global Impact",
                desc: "Our solutions serve clients worldwide. Your work will be used by thousands of users across industries.",
              },
              {
                title: "Growth & Learning",
                desc: "Continuous learning budget, conference sponsorships, and mentorship from industry veterans.",
              },
              {
                title: "Work-Life Balance",
                desc: "Flexible hours, remote-first culture, and a team that respects your time and well-being.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
              >
                <h3 className="text-lg font-display font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-body-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="animate-in text-2xl sm:text-3xl font-display font-bold tracking-tight mb-2">
                OPEN POSITIONS
              </h2>
              <p className="animate-in text-foreground/50">
                {jobPostings.filter((j) => j.isOpen).length} open roles
              </p>
            </div>
            <p className="animate-in text-sm text-foreground/50">
              Don&apos;t see your role?{" "}
              <a
                href="mailto:info@kramatrix.com,career@kramatrix.com?subject=General Application"
                className="text-foreground underline hover:no-underline"
              >
                Send us your resume
              </a>
            </p>
          </div>

          <div className="space-y-6">
            {jobPostings.map((job) => (
              <div key={job.id} className="animate-in">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-foreground/10 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="animate-in text-3xl sm:text-4xl font-display font-black tracking-tight mb-6">
            READY TO JOIN?
          </h2>
          <p className="animate-in text-lg text-background/70 mb-8 max-w-2xl mx-auto">
            Send your resume and portfolio to{" "}
            <a
              href="mailto:info@kramatrix.com,career@kramatrix.com"
              className="text-background underline hover:no-underline"
            >
              info@kramatrix.com
            </a>{" "}
            /{" "}
            <a
              href="mailto:career@kramatrix.com"
              className="text-background underline hover:no-underline"
            >
              career@kramatrix.com
            </a>{" "}
            or apply directly to any open position above.
          </p>
          <div className="animate-in flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@kramatrix.com,career@kramatrix.com?subject=Career Inquiry"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-3",
                "bg-background text-foreground",
                "text-sm font-display uppercase tracking-wider",
                "hover:bg-background/90 transition-all duration-300"
              )}
            >
              Send Your Resume
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-3",
                "border border-background/30 text-background",
                "text-sm font-display uppercase tracking-wider",
                "hover:border-background transition-all duration-300"
              )}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-foreground/50">
            © {new Date().getFullYear()} KRAMATRIX. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-caption text-foreground/50 hover:text-foreground transition-colors"
          >
            kramatrix.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
