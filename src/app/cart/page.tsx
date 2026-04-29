"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientCartScene from "@/components/common/ClientCartScene";
import ClientFloatingShape from "@/components/common/ClientFloatingShape";

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  return (
    <main className="pb-20 relative">
      {/* Decorative 3D elements */}
      <div className="absolute top-16 right-4 xl:right-16 hidden lg:block pointer-events-auto z-0">
        <ClientCartScene className="w-[140px] h-[140px]" />
      </div>
      <div className="absolute bottom-20 left-4 xl:left-16 hidden lg:block pointer-events-auto z-0">
        <ClientFloatingShape shape="diamond" size={80} />
      </div>
      <div className="max-w-frame mx-auto px-4 xl:px-0 relative z-10">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <motion.h2
              className={cn([
                integralCF.className,
                "font-black text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6 tracking-tighter flex",
              ])}
            >
              {"YOUR CART".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
                  className="inline-block mr-3 md:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-none border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-[3px] border-black" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-none border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <h6 className="text-xl md:text-3xl font-black text-black uppercase tracking-wider">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="md:text-xl text-black/60 uppercase">Subtotal</span>
                    <span className="md:text-xl text-black">₹{totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="md:text-xl text-black/60 uppercase">
                      Discount (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )}
                      %)
                    </span>
                    <span className="md:text-xl text-red-600">
                      -₹{Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="md:text-xl text-black/60 uppercase">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl text-black">Free</span>
                  </div>
                  <hr className="border-t-[3px] border-black" />
                  <div className="flex items-center justify-between font-black">
                    <span className="md:text-xl text-black uppercase">Total</span>
                    <span className="text-2xl md:text-3xl">
                      ₹{Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="flex bg-white border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:translate-y-[4px] focus-within:shadow-none transition-all">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/60 font-bold outline-none"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black text-white font-black uppercase tracking-wider rounded-none w-full max-w-[119px] h-[48px] border-[2px] border-transparent hover:border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:shadow-none"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-xl font-black bg-black text-white rounded-none w-full py-4 h-[54px] md:h-[60px] group uppercase tracking-widest border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[6px] hover:shadow-none transition-all flex justify-center items-center"
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-2xl ml-3 group-hover:translate-x-2 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-black mt-32 p-10 border-[4px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto">
            <TbBasketExclamation strokeWidth={2} className="text-[100px] mb-6" />
            <span className="block mb-8 font-black text-2xl uppercase tracking-widest text-center">Your shopping cart is empty</span>
            <Button className="rounded-none w-full max-w-[200px] h-14 bg-black text-white font-black text-xl uppercase tracking-widest border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[6px] hover:shadow-none transition-all" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
