"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Tech Stack Data ───────────────────────────────────────────────────────────

interface TechItem {
  name: string;
  description: string;
  category: string;
  icon: string; // emoji or unicode symbol
  proficiency: number; // 0-100
}

const categories = [
  {
    id: "languages",
    title: "LANGUAGES",
    subtitle: "Core Programming",
    color: "#FF3B30",
    items: [
      { name: "TypeScript", description: "Type-safe JavaScript at scale", icon: "TS", proficiency: 98 },
      { name: "Python", description: "AI/ML & backend automation", icon: "PY", proficiency: 95 },
      { name: "Rust", description: "Systems-level performance", icon: "RS", proficiency: 88 },
      { name: "Solidity", description: "Smart contract development", icon: "SOL", proficiency: 92 },
      { name: "Go", description: "Concurrent microservices", icon: "GO", proficiency: 85 },
      { name: "C++", description: "High-performance computing", icon: "C+", proficiency: 80 },
    ],
  },
  {
    id: "frontend",
    title: "FRONTEND",
    subtitle: "User Interfaces",
    color: "#007AFF",
    items: [
      { name: "React / Next.js", description: "Production-grade web apps", icon: "⚛", proficiency: 99 },
      { name: "Three.js / R3F", description: "3D web experiences", icon: "3D", proficiency: 95 },
      { name: "GSAP", description: "Premium animations", icon: "GS", proficiency: 96 },
      { name: "Tailwind CSS", description: "Utility-first styling", icon: "TW", proficiency: 98 },
      { name: "React Native", description: "Cross-platform mobile", icon: "RN", proficiency: 90 },
      { name: "WebGL / Shaders", description: "GPU-accelerated graphics", icon: "GL", proficiency: 88 },
    ],
  },
  {
    id: "backend",
    title: "BACKEND",
    subtitle: "Server & APIs",
    color: "#34C759",
    items: [
      { name: "Node.js", description: "Event-driven runtime", icon: "NJ", proficiency: 97 },
      { name: "FastAPI", description: "High-performance Python APIs", icon: "FA", proficiency: 93 },
      { name: "GraphQL", description: "Flexible data querying", icon: "GQ", proficiency: 91 },
      { name: "gRPC", description: "High-throughput RPC", icon: "gR", proficiency: 85 },
      { name: "Redis", description: "In-memory data store", icon: "RD", proficiency: 92 },
      { name: "Kafka", description: "Event streaming platform", icon: "KF", proficiency: 87 },
    ],
  },
  {
    id: "database",
    title: "DATABASE",
    subtitle: "Data Layer",
    color: "#FF9500",
    items: [
      { name: "PostgreSQL", description: "Relational powerhouse", icon: "PG", proficiency: 96 },
      { name: "MongoDB", description: "Document-oriented NoSQL", icon: "MG", proficiency: 93 },
      { name: "Supabase", description: "Open-source Firebase alt", icon: "SB", proficiency: 90 },
      { name: "Prisma", description: "Type-safe ORM", icon: "PR", proficiency: 94 },
      { name: "Neo4j", description: "Graph database", icon: "N4", proficiency: 78 },
      { name: "ClickHouse", description: "OLAP analytics engine", icon: "CH", proficiency: 82 },
    ],
  },
  {
    id: "web3",
    title: "WEB3 / BLOCKCHAIN",
    subtitle: "Decentralized Tech",
    color: "#AF52DE",
    items: [
      { name: "Ethereum / EVM", description: "Smart contract platform", icon: "Ξ", proficiency: 95 },
      { name: "Solana", description: "High-speed blockchain", icon: "◎", proficiency: 88 },
      { name: "Hardhat / Foundry", description: "Contract dev frameworks", icon: "HF", proficiency: 92 },
      { name: "IPFS / Arweave", description: "Decentralized storage", icon: "IP", proficiency: 86 },
      { name: "The Graph", description: "Blockchain indexing", icon: "TG", proficiency: 84 },
      { name: "Chainlink", description: "Oracle networks", icon: "CL", proficiency: 83 },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    subtitle: "Intelligence Layer",
    color: "#FF2D55",
    items: [
      { name: "OpenAI / GPT", description: "LLM integration & fine-tuning", icon: "AI", proficiency: 96 },
      { name: "LangChain", description: "LLM application framework", icon: "LC", proficiency: 93 },
      { name: "PyTorch", description: "Deep learning framework", icon: "PT", proficiency: 88 },
      { name: "Hugging Face", description: "Model hub & transformers", icon: "HF", proficiency: 90 },
      { name: "RAG Pipelines", description: "Retrieval-augmented generation", icon: "RG", proficiency: 91 },
      { name: "Vector DBs", description: "Pinecone, Weaviate, Chroma", icon: "VD", proficiency: 87 },
    ],
  },
  {
    id: "devops",
    title: "DEVOPS & CLOUD",
    subtitle: "Infrastructure",
    color: "#5AC8FA",
    items: [
      { name: "AWS", description: "Cloud infrastructure at scale", icon: "AW", proficiency: 95 },
      { name: "Docker", description: "Containerization", icon: "DK", proficiency: 97 },
      { name: "Kubernetes", description: "Container orchestration", icon: "K8", proficiency: 90 },
      { name: "Terraform", description: "Infrastructure as code", icon: "TF", proficiency: 88 },
      { name: "GitHub Actions", description: "CI/CD automation", icon: "GA", proficiency: 94 },
      { name: "Vercel / Cloudflare", description: "Edge deployment", icon: "VC", proficiency: 96 },
    ],
  },
];

// ─── Proficiency Bar Component ─────────────────────────────────────────────────

function ProficiencyBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const el = barRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.width = `${value}%`;
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: "0%", backgroundColor: color }}
      />
    </div>
  );
}

// ─── Tech Card Component ───────────────────────────────────────────────────────

function TechCard({
  item,
  color,
  index,
}: {
  item: (typeof categories)[0]["items"][0];
  color: string;
  index: number;
}) {
  return (
    <div className="group relative">
      <div
        className={cn(
          "relative p-4 border border-foreground/10",
          "bg-background/50 backdrop-blur-sm",
          "hover:border-foreground/30 hover:bg-foreground/5",
          "transition-all duration-300",
          "tech-card"
        )}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 flex items-center justify-center text-xs font-mono font-bold mb-3 border"
          style={{ borderColor: color, color: color }}
        >
          {item.icon}
        </div>

        {/* Name */}
        <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-1">
          {item.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Proficiency */}
        <div className="flex items-center gap-2">
          <ProficiencyBar value={item.proficiency} color={color} delay={index * 100} />
          <span className="text-[10px] font-mono text-foreground/40 min-w-[28px] text-right">
            {item.proficiency}%
          </span>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Category Section Component ────────────────────────────────────────────────

function CategorySection({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".tech-card");

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="mb-16 last:mb-0">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-1 h-12"
          style={{ backgroundColor: category.color }}
        />
        <div>
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-mono px-2 py-0.5 border"
              style={{ borderColor: category.color, color: category.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-display font-black uppercase tracking-wider">
              {category.title}
            </h3>
          </div>
          <p className="text-xs text-foreground/40 font-mono uppercase tracking-widest mt-1">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {category.items.map((item, i) => (
          <TechCard key={item.name} item={item} color={category.color} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: "Technologies", value: "42+" },
    { label: "Years Combined Exp.", value: "15+" },
    { label: "Projects Delivered", value: "600+" },
    { label: "Uptime SLA", value: "99.9%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-foreground/10 p-4 text-center bg-foreground/[0.02]"
        >
          <div className="text-2xl font-display font-black">{stat.value}</div>
          <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Architecture Diagram ──────────────────────────────────────────────────────

function ArchitectureDiagram() {
  const layers = [
    {
      label: "CLIENT LAYER",
      color: "#007AFF",
      techs: ["React", "Next.js", "React Native", "Three.js"],
    },
    {
      label: "API GATEWAY",
      color: "#34C759",
      techs: ["GraphQL", "REST", "gRPC", "WebSocket"],
    },
    {
      label: "SERVICE MESH",
      color: "#FF9500",
      techs: ["Node.js", "Python", "Go", "Rust"],
    },
    {
      label: "DATA LAYER",
      color: "#FF3B30",
      techs: ["PostgreSQL", "Redis", "MongoDB", "Kafka"],
    },
    {
      label: "INFRASTRUCTURE",
      color: "#5AC8FA",
      techs: ["AWS", "Docker", "K8s", "Terraform"],
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-lg font-display font-black uppercase tracking-wider mb-6">
        <span className="text-foreground/30 mr-2">//</span>
        Architecture Blueprint
      </h3>
      <div className="border border-foreground/10 p-6 bg-foreground/[0.02]">
        <div className="space-y-2">
          {layers.map((layer, i) => (
            <div key={layer.label} className="flex items-stretch gap-3">
              {/* Layer label */}
              <div
                className="w-36 shrink-0 flex items-center justify-center text-[10px] font-mono font-bold uppercase tracking-wider border-l-2 px-3 py-3"
                style={{ borderColor: layer.color, color: layer.color }}
              >
                {layer.label}
              </div>
              {/* Tech blocks */}
              <div className="flex-1 grid grid-cols-4 gap-1">
                {layer.techs.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center justify-center py-3 text-xs font-mono text-foreground/60 border border-foreground/10 hover:border-foreground/30 hover:text-foreground transition-all duration-200 bg-background/50"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              {/* Connection arrow */}
              {i < layers.length - 1 && (
                <div className="w-4 flex items-end justify-center text-foreground/20">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function StackPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-line",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    tl.fromTo(
      ".hero-desc",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, [mounted]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-display uppercase tracking-wider hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KRAMATRIX"
              width={28}
              height={28}
              className="invert dark:invert-0"
            />
            <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest">
              Tech Stack
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <span className="hero-line inline-block text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] border border-foreground/10 px-3 py-1">
              Engineering Excellence
            </span>
          </div>
          <h1 className="overflow-hidden">
            <span className="hero-line block text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase leading-[0.9] tracking-tight">
              Our
            </span>
            <span className="hero-line block text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase leading-[0.9] tracking-tight">
              Technology
            </span>
            <span className="hero-line block text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase leading-[0.9] tracking-tight text-accent">
              Stack
            </span>
          </h1>
          <p className="hero-desc mt-8 max-w-2xl text-foreground/50 text-sm md:text-base leading-relaxed font-mono">
            We don&apos;t just follow trends — we engineer with precision. Every technology
            in our arsenal is battle-tested across 600+ projects. Here&apos;s the infrastructure
            that powers the future.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-wider">
              <span className="text-foreground/30 mr-2">//</span>
              Full Stack Breakdown
            </h2>
            <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mt-2">
              7 categories · 42 technologies · Battle-tested in production
            </p>
          </div>

          {categories.map((category, i) => (
            <CategorySection key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-wider mb-4">
            Ready to Build?
          </h2>
          <p className="text-sm text-foreground/50 font-mono mb-8 max-w-lg mx-auto">
            Let&apos;s discuss how our technology stack can power your next project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3",
                "bg-foreground text-background",
                "text-sm font-display font-bold uppercase tracking-wider",
                "hover:bg-accent transition-colors duration-300"
              )}
            >
              Get Your 1st Free Consultation
            </Link>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3",
                "border border-foreground/20",
                "text-sm font-display uppercase tracking-wider",
                "hover:border-foreground/50 transition-colors duration-300"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KRAMATRIX"
              width={24}
              height={24}
              className="invert dark:invert-0"
            />
            <span className="text-xs font-mono text-foreground/30">
              © {new Date().getFullYear()} KRAMATRIX
            </span>
          </div>
          <a
            href="mailto:info@kramatrix.com"
            className="text-xs font-mono text-foreground/30 hover:text-accent transition-colors"
          >
            info@kramatrix.com
          </a>
        </div>
      </footer>
    </main>
  );
}
