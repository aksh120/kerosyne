"use client";

import {
  Color,
  setColorSelection,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const colorsData: Color[] = [
  {
    name: "Brown",
    code: "bg-[#4F4631]",
  },
  {
    name: "Green",
    code: "bg-[#314F4A]",
  },
  {
    name: "Blue",
    code: "bg-[#31344F]",
  },
];

const ColorSelection = () => {
  const { colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4 font-bold uppercase tracking-widest">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {colorsData.map((color, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              color.code,
              "rounded-none w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border-[2px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all",
              colorSelection.name === color.name && "shadow-none translate-y-[4px]"
            ])}
            onClick={() => dispatch(setColorSelection(color))}
          >
            {colorSelection.name === color.name && (
              <IoMdCheckmark className="text-base text-white mix-blend-difference" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
