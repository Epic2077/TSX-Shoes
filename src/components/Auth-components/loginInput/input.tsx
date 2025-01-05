import React, { ReactNode } from "react";
import Cn from "../../../utils/cn";

interface InputProps extends React.ComponentProps<"input"> {
  icon: string;
  parentClassName?: string;
  customChildren?: ReactNode; // Allow additional custom children like the eye icon
}

export const Input: React.FC<InputProps> = ({
  icon,
  customChildren,
  className,
  parentClassName,
  ...inputProps
}) => {
  return (
    <div
      className={Cn(
        "flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded mt-6",
        "focus-within:border focus-within:border-black",
        parentClassName
      )}
    >
      <img src={`../../../src/assets/icons/${icon}.svg`} alt={icon} />
      <input
        {...inputProps}
        className={Cn("bg-transparent w-full h-9 outline-none", className)}
      />
      {customChildren && <div>{customChildren}</div>}
    </div>
  );
};
