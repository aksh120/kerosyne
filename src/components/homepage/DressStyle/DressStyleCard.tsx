import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
};

const DressStyleCard = ({ title, url, className }: DressStyleCardProps) => {
  return (
    <Link
      href={url}
      className="group relative w-full h-full rounded-[20px] overflow-hidden bg-white flex"
    >
      <div
        className={cn([
          "absolute inset-0 bg-no-repeat bg-cover bg-top transition-transform duration-700 group-hover:scale-105",
          className,
        ])}
      />
      <span className="relative z-10 text-2xl md:text-4xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9">
        {title}
      </span>
    </Link>
  );
};

export default DressStyleCard;
