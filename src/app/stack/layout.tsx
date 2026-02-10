import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Stack — 42+ Technologies | AI, Web3, Blockchain, Full-Stack Delhi",
  description:
    "Explore KRAMATRIX's comprehensive technology stack — 42+ battle-tested technologies across AI/ML, Web3, blockchain, frontend, backend, database, and DevOps. TypeScript, Python, Rust, Solidity, React, Next.js, PyTorch, LangChain, and more. Delhi-based tech agency serving India.",
  keywords: [
    "KRAMATRIX technology stack", "tech stack India",
    "AI technologies Delhi", "Web3 technologies India",
    "blockchain development tools", "full-stack technologies",
    "React Next.js development India", "Python AI development Delhi",
    "Solidity smart contract tools", "DevOps technologies India",
    "42 technologies software company Delhi",
  ],
  alternates: { canonical: "https://kramatrix.com/stack" },
  openGraph: {
    title: "Technology Stack — 42+ Technologies | KRAMATRIX Delhi, India",
    description: "42+ battle-tested technologies: AI/ML, Web3, blockchain, full-stack. Delhi-based agency serving India.",
    url: "https://kramatrix.com/stack",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX Technology Stack" }],
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
