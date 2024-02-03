import React, { ButtonHTMLAttributes } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  round?: boolean;
};

export default function Button({ children, round, ...props }: IProps) {
  // const dark_colorClass = VariantAndColorClass[`dark_${color}`];
  const size = round ? "rounded-full w-[46px]" : "px-14 rounded-3xl ";
  return (
    <button
      {...props}
      className={`${size} bg-highlight p-3 h-[46px] uppercase font-bold active:brightness-95 shadow-lg relative active:top-[0.05rem] active:shadow-sm`}
    >
      {children}
    </button>
  );
}
