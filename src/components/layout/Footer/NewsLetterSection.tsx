import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-white border-[4px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <p
        className={cn([
          integralCF.className,
          "font-black text-[32px] md:text-[40px] text-black mb-9 md:mb-0 uppercase tracking-tighter leading-tight",
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex items-center">
        <div className="flex flex-col w-full max-w-[349px] mx-auto">
          <InputGroup className="flex bg-white mb-[14px] border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:translate-y-[4px] focus-within:shadow-none transition-all">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="bg-transparent placeholder:text-black/60 placeholder:text-sm sm:placeholder:text-base font-bold outline-none"
            />
          </InputGroup>
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-black bg-black text-white hover:bg-black/80 hover:translate-y-[2px] h-12 rounded-none px-4 py-3 border-2 border-transparent transition-all uppercase tracking-wide"
            aria-label="Subscribe to Newsletter"
            type="button"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
