import { getProducts, getReviews } from "@/lib/data";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { notFound } from "next/navigation";
import ClientFloatingShape from "@/components/common/ClientFloatingShape";

export default async function ProductPage(
  props: {
    params: Promise<{ slug: string[] }>;
  }
) {
  const products = await getProducts();
  const params = await props.params;
  const productData = products.find(
    (product: any) => product.id === Number(params.slug[0])
  );
  
  const relatedProductData = products.filter((p: any) => p.category === "Related");

  if (!productData?.title) {
    notFound();
  }

  const reviewsData = await getReviews();

  return (
    <main className="relative">
      {/* Decorative 3D elements */}
      <div className="absolute top-8 right-4 xl:right-12 hidden lg:block pointer-events-auto z-0">
        <ClientFloatingShape shape="tag" size={100} />
      </div>
      <div className="absolute bottom-60 left-4 xl:left-12 hidden lg:block pointer-events-auto z-0">
        <ClientFloatingShape shape="torus" size={80} />
      </div>
      <div className="max-w-frame mx-auto px-4 xl:px-0 relative z-10">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs reviewsData={reviewsData} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
