"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import {
  CubeGrid,
  NeuralNetwork,
  FloatingShape,
} from "@/components/three/GeometricShapes";
import { SplitText, RevealText } from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";
import { padNumber } from "@/lib/utils";
import {
  Blocks,
  Globe,
  Code2,
  Smartphone,
  Brain,
  ArrowRight,
} from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  scene: "web3" | "website" | "software" | "app" | "ai";
}

const services: Service[] = [
  {
    id: "web3",
    number: "01",
    title: "Web3 & Blockchain Development",
    description:
      "Smart contracts, DeFi protocols, NFT platforms, and decentralized applications built on cutting-edge blockchain technology.",
    icon: <Blocks className="w-8 h-8" />,
    scene: "web3",
  },
  {
    id: "website",
    number: "02",
    title: "Website Design & Development",
    description:
      "Stunning, high-performance websites with immersive experiences, brutalist aesthetics, and seamless user journeys.",
    icon: <Globe className="w-8 h-8" />,
    scene: "website",
  },
  {
    id: "software",
    number: "03",
    title: "Software Development",
    description:
      "Enterprise-grade software solutions, APIs, microservices, and scalable architectures for complex business needs.",
    icon: <Code2 className="w-8 h-8" />,
    scene: "software",
  },
  {
    id: "app",
    number: "04",
    title: "Application Design & Development",
    description:
      "Native and cross-platform mobile applications with intuitive interfaces and powerful functionality.",
    icon: <Smartphone className="w-8 h-8" />,
    scene: "app",
  },
  {
    id: "ai",
    number: "05",
    title: "AI Agents & Custom LLM Solutions",
    description:
      "Intelligent automation, custom AI agents, fine-tuned language models, and machine learning solutions.",
    icon: <Brain className="w-8 h-8" />,
    scene: "ai",
  },
];

function ServiceScene({ type }: { type: Service["scene"] }) {
  switch (type) {
    case "web3":
      return (
        <>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <CubeGrid count={4} spacing={1.5} />
        </>
      );
    case "website":
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingShape shape="box" scale={2} wireframe distort speed={0.5} />
          <FloatingShape
            position={[-2, 1, -2]}
            shape="octahedron"
            scale={0.8}
            wireframe
          />
          <FloatingShape
            position={[2, -1, -1]}
            shape="torus"
            scale={0.6}
            wireframe
          />
        </>
      );
    case "software":
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingShape shape="cylinder" scale={1.5} wireframe speed={0.3} />
          <FloatingShape
            position={[-2, 2, -2]}
            shape="box"
            scale={0.5}
            wireframe
          />
          <FloatingShape
            position={[2, -2, -1]}
            shape="box"
            scale={0.5}
            wireframe
          />
          <FloatingShape
            position={[0, -2, -2]}
            shape="box"
            scale={0.5}
            wireframe
          />
        </>
      );
    case "app":
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingShape shape="box" scale={1} wireframe speed={0.4} />
          <FloatingShape
            position={[-2, 0, -2]}
            shape="sphere"
            scale={0.5}
            wireframe
          />
          <FloatingShape
            position={[2, 1, -1]}
            shape="cone"
            scale={0.6}
            wireframe
          />
        </>
      );
    case "ai":
      return (
        <>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#FF0000" />
          <NeuralNetwork layers={[3, 5, 5, 3]} accentColor="#FF0000" />
        </>
      );
    default:
      return null;
  }
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // Pin the section
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      // Animate content on scroll
      const content = cardRef.current.querySelector(".service-content");
      const scene = cardRef.current.querySelector(".service-scene");

      gsap.fromTo(
        content,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        scene,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      id={service.id}
      className="relative min-h-screen flex items-center"
    >
      <div className="container mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={cn(
              "service-content",
              index % 2 === 1 && "lg:order-2"
            )}
          >
            {/* Service number */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-mono text-body-lg">
                {service.number}
              </span>
              <div className="h-px flex-1 bg-foreground/20" />
            </div>

            {/* Icon */}
            <div className="mb-6 text-foreground">{service.icon}</div>

            {/* Title */}
            <h2 className="text-brutalist text-display-md mb-6">
              <SplitText type="words" animation="slide" stagger={0.05}>
                {service.title}
              </SplitText>
            </h2>

            {/* Description */}
            <RevealText>
              <p className="text-body-lg text-foreground-muted mb-8 max-w-lg">
                {service.description}
              </p>
            </RevealText>

            {/* CTA */}
            <a
              href={`#${service.id}-details`}
              className={cn(
                "inline-flex items-center gap-2",
                "text-sm font-display uppercase tracking-wider",
                "text-primary hover:text-accent",
                "transition-colors duration-300"
              )}
              data-cursor="hover"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3D Scene */}
          <div
            className={cn(
              "service-scene relative aspect-square",
              index % 2 === 1 && "lg:order-1"
            )}
          >
            <Scene camera={{ position: [0, 0, 8], fov: 50 }}>
              <ServiceScene type={service.scene} />
            </Scene>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="services" className="relative">
      {/* Section header */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-gutter text-center">
          <span className="text-accent font-mono text-body-sm uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="text-brutalist text-display-lg mb-8">
            <SplitText type="chars" animation="slide" stagger={0.02}>
              OUR SERVICES
            </SplitText>
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
            We engineer the future through cutting-edge technology solutions
            that push boundaries and deliver exceptional results.
          </p>
        </div>
      </div>

      {/* Service cards */}
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </section>
  );
}
