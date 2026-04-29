import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

import { getProducts, getReviews } from "@/lib/data";

import ClientFloatingShape from "@/components/common/ClientFloatingShape";

export default async function Home() {
  const productsData = await getProducts();
  const reviewsData = await getReviews();

  const newArrivalsData = productsData.filter((p: any) => p.category === "New Arrivals");
  const topSellingData = productsData.filter((p: any) => p.category === "Top Selling");

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <div className="relative">
          <ProductListSec
            title="NEW ARRIVALS"
            data={newArrivalsData}
            viewAllLink="/shop#new-arrivals"
          />
          {/* Floating 3D hanger — top right of New Arrivals */}
          <div className="absolute -top-4 right-4 xl:right-20 hidden lg:block pointer-events-auto">
            <ClientFloatingShape shape="hanger" size={120} />
          </div>
        </div>
        <div className="max-w-frame mx-auto px-4 xl:px-0 flex items-center justify-center">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16 flex-1" />
          <div className="mx-4">
            <ClientFloatingShape shape="diamond" size={80} />
          </div>
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16 flex-1" />
        </div>
        <div className="mb-[50px] sm:mb-20 relative">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
          {/* Floating 3D tag — top left of Top Selling */}
          <div className="absolute -top-4 left-4 xl:left-20 hidden lg:block pointer-events-auto">
            <ClientFloatingShape shape="tag" size={100} />
          </div>
        </div>
        <div className="mb-[50px] sm:mb-20 relative">
          <DressStyle />
          {/* Floating 3D torus — top right of Dress Style */}
          <div className="absolute top-0 right-8 xl:right-24 hidden lg:block pointer-events-auto">
            <ClientFloatingShape shape="torus" size={100} />
          </div>
        </div>
        <div className="relative">
          <Reviews data={reviewsData} />
          {/* Floating 3D octahedron — bottom right of Reviews */}
          <div className="absolute bottom-4 right-8 xl:right-24 hidden lg:block pointer-events-auto">
            <ClientFloatingShape shape="octahedron" size={90} />
          </div>
        </div>
      </main>
    </>
  );
}
