import dynamic from "next/dynamic";

const LogoScene = dynamic(
  () => import("@/components/three/LogoScene"),
  { ssr: false }
);

export default function Logo3DPage() {
  return (
    <main className="bg-neutral-100">
      <LogoScene />
    </main>
  );
}
