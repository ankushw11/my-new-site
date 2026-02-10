import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Blockchain & Web3 Development Company India — Smart Contracts, DeFi, NFT Delhi",
  description:
    "KRAMATRIX is India's top blockchain & Web3 development company based in Delhi. Smart contracts, DeFi protocols, NFT marketplaces, dApps, cross-chain solutions. 600+ projects. Free consultation.",
  keywords: [
    "blockchain development company India", "blockchain development company Delhi",
    "Web3 development agency India", "Web3 development agency Delhi",
    "smart contract development India", "DeFi development company Delhi",
    "NFT marketplace development India", "dApp development Delhi",
    "blockchain development North India", "Solidity developer India",
    "Ethereum development Delhi", "Solana development India",
    "cross-chain development", "Web3 agency Delhi NCR",
  ],
  alternates: { canonical: "https://kramatrix.com/services/blockchain-web3-development-india" },
  openGraph: {
    title: "Blockchain & Web3 Development Company India | KRAMATRIX Delhi",
    description: "India's leading blockchain & Web3 agency. Smart contracts, DeFi, NFT, dApps. Based in Delhi. Free consultation.",
    url: "https://kramatrix.com/services/blockchain-web3-development-india",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX Blockchain Development India" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "Blockchain & Web3 Development", item: "https://kramatrix.com/services/blockchain-web3-development-india" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "Blockchain & Web3 Development Company in India",
    description: "End-to-end blockchain and Web3 development — smart contracts, DeFi, NFT marketplaces, dApps from Delhi, India.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "Blockchain Development", url: "https://kramatrix.com/services/blockchain-web3-development-india" },
];

export default function BlockchainServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="Web3 & Blockchain"
        title="Blockchain & Web3 Development Company India"
        subtitle="Smart Contracts, DeFi Protocols, NFT Marketplaces & Decentralized Applications"
        description="KRAMATRIX is India's leading blockchain and Web3 development company, headquartered in Delhi. We architect decentralized solutions — from smart contracts on Ethereum and Solana to full-scale DeFi protocols, NFT marketplaces, and cross-chain dApps. Our blockchain engineers have delivered 600+ projects with battle-tested expertise in Solidity, Rust, Hardhat, Foundry, IPFS, and The Graph."
        features={[
          { title: "Smart Contract Development", description: "Secure, audited smart contracts on Ethereum, Solana, Polygon, BSC, and other EVM/non-EVM chains. Solidity and Rust expertise." },
          { title: "DeFi Protocol Architecture", description: "Custom DeFi protocols — DEXs, lending platforms, yield farming, staking, liquidity pools, and automated market makers." },
          { title: "NFT Marketplace Development", description: "Full-featured NFT marketplaces with minting, trading, auctions, royalties, and multi-chain support for digital assets." },
          { title: "dApp Development", description: "Decentralized applications with seamless Web3 wallet integration, on-chain data, and intuitive user experiences." },
          { title: "Cross-chain Integration", description: "Bridge solutions and cross-chain interoperability — connect multiple blockchains for unified decentralized ecosystems." },
          { title: "Blockchain Consulting", description: "Expert blockchain strategy consulting from our Delhi team — tokenomics design, architecture planning, and Web3 transformation roadmaps." },
        ]}
        technologies={[
          "Solidity", "Rust", "Ethereum", "Solana", "Polygon", "Hardhat", "Foundry",
          "IPFS", "Arweave", "The Graph", "Chainlink", "OpenZeppelin",
          "Web3.js", "Ethers.js", "Wagmi", "RainbowKit", "Next.js",
        ]}
        faqs={[
          { question: "Which is the top blockchain development company in India?", answer: "KRAMATRIX is one of India's top blockchain development companies, based in Delhi. We specialize in smart contracts, DeFi, NFT marketplaces, and dApps with 600+ projects delivered across Ethereum, Solana, and other major blockchains." },
          { question: "How much does blockchain development cost in Delhi?", answer: "Blockchain development costs vary: smart contracts start from ₹3-5 lakhs, DeFi protocols from ₹15-50 lakhs, and full NFT marketplaces from ₹10-30 lakhs. Contact KRAMATRIX for a free consultation and detailed estimate." },
          { question: "What blockchains does KRAMATRIX work with?", answer: "We work with all major blockchains including Ethereum, Solana, Polygon, BSC, Avalanche, Arbitrum, and Optimism. Our team has expertise in both EVM and non-EVM chains." },
        ]}
        relatedServices={[
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "Custom Software", href: "/services/custom-software-development-delhi" },
          { title: "Web Development", href: "/services/web-development-company-india" },
          { title: "LLM & AI Agents", href: "/services/llm-ai-agent-development-india" },
        ]}
      />
    </>
  );
}
