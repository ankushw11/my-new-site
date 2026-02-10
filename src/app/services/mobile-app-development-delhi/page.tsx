import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Mobile App Development Company Delhi — React Native, iOS, Android India",
  description:
    "KRAMATRIX is Delhi's top mobile app development company. React Native, iOS, Android apps. Cross-platform, native performance. 600+ projects, apps with millions of downloads. Free consultation.",
  keywords: [
    "mobile app development company Delhi", "mobile app development India",
    "React Native development India", "iOS app development Delhi",
    "Android app development Delhi", "cross-platform app development India",
    "app developer Delhi NCR", "mobile application development company India",
    "hire mobile app developers Delhi", "best app development company India",
  ],
  alternates: { canonical: "https://kramatrix.com/services/mobile-app-development-delhi" },
  openGraph: {
    title: "Mobile App Development Company Delhi — React Native | KRAMATRIX",
    description: "Delhi's top mobile app company. React Native, iOS, Android. 600+ projects. Free consultation.",
    url: "https://kramatrix.com/services/mobile-app-development-delhi",
    type: "website", locale: "en_IN",
    images: [{ url: "https://kramatrix.com/logo.png", width: 1200, height: 630, alt: "KRAMATRIX Mobile App Development Delhi" }],
  },
};

const schemas = [
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kramatrix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://kramatrix.com/services" },
    { "@type": "ListItem", position: 3, name: "Mobile App Development Delhi", item: "https://kramatrix.com/services/mobile-app-development-delhi" },
  ]},
  { "@context": "https://schema.org", "@type": "Service", name: "Mobile App Development Company in Delhi, India",
    description: "Cross-platform and native mobile app development with React Native, iOS, and Android from Delhi's leading app agency.",
    provider: { "@type": "Organization", name: "KRAMATRIX" }, areaServed: ["Delhi", "India"],
    serviceType: "Mobile App Development", url: "https://kramatrix.com/services/mobile-app-development-delhi" },
];

export default function MobileAppServicePage() {
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <ServicePageTemplate
        badge="Mobile Development"
        title="Mobile App Development Company Delhi"
        subtitle="React Native, iOS & Android Apps for Indian Businesses"
        description="KRAMATRIX is Delhi's leading mobile app development company, building cross-platform and native mobile applications that users love. Our React Native expertise delivers native performance on both iOS and Android from a single codebase. From consumer apps with millions of downloads to enterprise mobile solutions — we engineer mobile experiences that drive engagement and revenue."
        features={[
          { title: "React Native Development", description: "Cross-platform mobile apps with native performance — single codebase for iOS and Android, reducing development time and cost by 40%." },
          { title: "Native iOS Development", description: "Swift and SwiftUI apps optimized for the Apple ecosystem — iPhone, iPad, Apple Watch, with App Store optimization." },
          { title: "Native Android Development", description: "Kotlin and Jetpack Compose apps for the Android ecosystem — optimized for diverse devices and Google Play Store." },
          { title: "App UI/UX Design", description: "Mobile-first design with intuitive navigation, smooth animations, and platform-specific design patterns for exceptional user experience." },
          { title: "Backend & API Integration", description: "Robust backend systems with real-time sync, push notifications, payment gateways, and third-party API integrations." },
          { title: "App Store Optimization", description: "ASO strategies for Google Play and App Store — keyword optimization, A/B testing, and conversion rate optimization for maximum downloads." },
        ]}
        technologies={[
          "React Native", "Swift", "Kotlin", "Expo", "TypeScript",
          "Firebase", "Node.js", "GraphQL", "Redux", "MobX",
          "Stripe", "Razorpay", "AWS Amplify", "Fastlane", "CodePush",
        ]}
        faqs={[
          { question: "What is the best mobile app development company in Delhi?", answer: "KRAMATRIX is recognized as Delhi's top mobile app development company with 600+ projects delivered. We specialize in React Native cross-platform development, native iOS/Android apps, and have built apps with millions of downloads on Google Play and App Store." },
          { question: "How much does mobile app development cost in India?", answer: "Mobile app development costs in India: basic apps ₹3-8 lakhs, mid-complexity apps ₹10-25 lakhs, enterprise apps ₹30-80+ lakhs. React Native cross-platform development can reduce costs by 40% compared to separate native builds. Contact KRAMATRIX for a free estimate." },
          { question: "Should I choose React Native or native development?", answer: "React Native is ideal for most business apps — it delivers 95% native performance with 40% cost savings. Native development (Swift/Kotlin) is recommended for hardware-intensive apps, AR/VR, or when platform-specific features are critical. Our Delhi team can advise on the best approach for your project." },
        ]}
        relatedServices={[
          { title: "Web Development", href: "/services/web-development-company-india" },
          { title: "Custom Software", href: "/services/custom-software-development-delhi" },
          { title: "AI Development", href: "/services/ai-development-agency-delhi" },
          { title: "CRM & ERP Solutions", href: "/services/custom-crm-erp-solutions-india" },
        ]}
      />
    </>
  );
}
