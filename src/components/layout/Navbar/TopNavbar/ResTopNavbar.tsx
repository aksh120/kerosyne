import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto w-full sm:max-w-xs p-0 border-none">
        <SheetHeader className="p-6 border-b">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className="flex items-center">
                <span className={cn([integralCF.className, "text-2xl uppercase font-black"])}>KEROSYNE</span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] px-6 py-8 bg-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
            <span className={cn([integralCF.className, "text-[120px] font-black"])}>KRSN</span>
          </div>

          <div className="flex flex-col items-start w-full">
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <SheetClose asChild>
                    <Link 
                      href={item.url ?? "/"} 
                      className="mb-6 text-2xl font-black uppercase tracking-tighter hover:translate-x-2 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                )}
                {item.type === "MenuList" && (
                  <div className="mb-6 w-full">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={item.label} className="border-none">
                        <AccordionTrigger className="text-left p-0 py-0.5 text-2xl font-black uppercase tracking-tighter hover:no-underline">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pb-0 border-l-4 border-black flex flex-col ml-1">
                          {item.children.map((itemChild, idx) => (
                            <SheetClose
                              key={itemChild.id}
                              asChild
                              className="w-fit py-2 text-xl font-bold hover:translate-x-2 transition-all"
                            >
                              <Link href={itemChild.url ?? "/"}>
                                {itemChild.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t-2 border-black/5">
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Follow the aesthetic</p>
            <div className="flex items-center space-x-6">
              <Link href="https://instagram.com" target="_blank" className="hover:scale-110 transition-transform">
                <Image src="/icons/instagram.svg" width={24} height={24} alt="instagram" />
              </Link>
            </div>
            <p className="mt-8 text-[10px] font-medium text-black/30">© 2026 KEROSYNE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
