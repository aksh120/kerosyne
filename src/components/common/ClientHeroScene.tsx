"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { 
  ssr: false,
  loading: () => <div className="w-full h-full" />
});

export default function ClientHeroScene(props: any) {
  return <HeroScene {...props} />;
}
