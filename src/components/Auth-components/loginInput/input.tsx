import React, { ReactNode } from "react";

interface InputProps {
  icon: string;
  placeholder: string;
  name: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void; // To handle events like password visibility toggle
  customChildren?: ReactNode; // Allow additional custom children like the eye icon
}

export const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  name,
  type,
  id,
  value,
  onChange,
  onClick,
  customChildren,
}) => {
  return (
    <div className="flex w-full h-9 items-center gap-1 bg-[#FAFAFA] p-[13px] rounded mt-6">
      <img src={`../../../src/assets/icons/${icon}.svg`} alt={icon} />
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className="bg-transparent w-full h-9 outline-none"
      />
      {customChildren && <div>{customChildren}</div>}
    </div>
  );
};
