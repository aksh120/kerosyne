import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import { getProducts } from "@/lib/data";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ClientFloatingShape from "@/components/common/ClientFloatingShape";

export default async function ShopPage() {
  const productsData = await getProducts();

  // Flatten and filter for display
  const displayProducts = Array.isArray(productsData) ? productsData : [];

  return (
    <main className="pb-20 relative bg-[#FAFAFA]">
      {/* Decorative 3D elements */}
      <div className="absolute top-40 right-10 hidden xl:block pointer-events-none z-0">
        <ClientFloatingShape shape="hanger" size={150} />
      </div>
      <div className="absolute bottom-80 left-10 hidden xl:block pointer-events-none z-0">
        <ClientFloatingShape shape="cube" size={100} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 xl:px-6 relative z-10 pt-10">
        <BreadcrumbShop />

        <div className="flex flex-col md:flex-row md:space-x-8 items-start mt-10">
          {/* Sidebar */}
          <aside className="hidden md:block min-w-[280px] max-w-[280px] border-[4px] border-black rounded-none p-6 space-y-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white sticky top-24 ml-0">
            <div className="flex items-center justify-between border-b-[4px] border-black pb-4">
              <span className="font-black text-black text-xl uppercase italic">Filters</span>
              <FiSliders className="text-xl text-black" />
            </div>
            <Filters />
          </aside>

          {/* Main Content */}
          <div className="flex flex-col w-full space-y-10">
            {/* Dynamic Header Area */}
            <div className="relative border-[4px] border-black bg-black text-white p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -translate-y-16 translate-x-16 rotate-45" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                    The Shop
                  </h1>
                  <p className="font-bold uppercase tracking-[0.3em] text-white/40 mt-4 text-xs md:text-sm">
                    Curated Hardware / Seasonal Drop 01
                  </p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="flex items-center bg-white text-black px-4 py-2 border-[2px] border-white font-black uppercase text-xs mb-4">
                    Sort by:{" "}
                    <Select defaultValue="most-popular">
                      <SelectTrigger className="font-black text-xs w-fit bg-transparent border-none p-0 ml-2 focus:ring-0 focus:outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-[3px] border-black rounded-none font-bold uppercase text-xs">
                        <SelectItem value="most-popular">Most Popular</SelectItem>
                        <SelectItem value="low-price">Low Price</SelectItem>
                        <SelectItem value="high-price">High Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Showing 1-{displayProducts.length} of {displayProducts.length} Products
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:hidden">
              <h2 className="font-black text-3xl uppercase italic">Casual</h2>
              <MobileFilters />
            </div>

            {/* Product Grid - Adjusted gap and sizing */}
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard data={product} />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {product.category}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-t-[4px] border-black" />

            {/* Enhanced Pagination */}
            <Pagination className="justify-between">
              <PaginationPrevious
                href="#"
                className="border-[3px] border-black rounded-none px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all font-black uppercase text-xs"
              />
              <PaginationContent className="hidden sm:flex space-x-3">
                {[1, 2, 3, "...", 10].map((page, i) => (
                  <PaginationItem key={i}>
                    {page === "..." ? (
                      <PaginationEllipsis className="text-black font-black" />
                    ) : (
                      <PaginationLink
                        href="#"
                        className={`font-black text-sm border-[3px] border-black rounded-none w-12 h-12 flex items-center justify-center transition-all ${page === 1 ? "bg-black text-white shadow-none" : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none"
                          }`}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
              </PaginationContent>
              <PaginationNext
                href="#"
                className="border-[3px] border-black rounded-none px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all font-black uppercase text-xs"
              />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
