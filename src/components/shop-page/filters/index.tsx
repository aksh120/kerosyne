import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";

const Filters = () => {
  return (
    <>
      <hr className="border-t-[2px] border-black" />
      <CategoriesSection />
      <hr className="border-t-[2px] border-black" />
      <PriceSection />
      <hr className="border-t-[2px] border-black" />
      <ColorsSection />
      <hr className="border-t-[2px] border-black" />
      <SizeSection />
      <hr className="border-t-[2px] border-black" />
      <DressStyleSection />
      <Button
        type="button"
        className="bg-black text-white w-full rounded-none text-sm font-black uppercase tracking-wider py-4 h-12 border-[2px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:shadow-none hover:bg-black transition-all"
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
