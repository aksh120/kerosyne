"use client";

import dynamic from "next/dynamic";

const CartScene = dynamic(() => import("@/components/3d/CartScene"), { 
  ssr: false,
  loading: () => <div className="w-full h-full" />
});

export default function ClientCartScene(props: any) {
  return <CartScene {...props} />;
}
