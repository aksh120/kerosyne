import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BreadcrumbShop = () => {
  return (
    <Breadcrumb className="mb-8 sm:mb-12 mt-4 sm:mt-6">
      <BreadcrumbList className="font-black uppercase tracking-widest text-black/60 text-xs sm:text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-black/40" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-black font-black">SHOP</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbShop;
