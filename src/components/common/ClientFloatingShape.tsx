"use client";

import dynamic from "next/dynamic";

const FloatingShape = dynamic(() => import("@/components/3d/FloatingShape"), { 
  ssr: false,
  loading: () => <div className="w-full h-full" />
});

export default function ClientFloatingShape(props: any) {
  return <FloatingShape {...props} />;
}
