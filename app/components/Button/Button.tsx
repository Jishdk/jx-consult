import { MouseEventHandler, ReactNode } from "react";
import style from "./Button.module.css";

type Color = "blue" | "purple";
type Size = "small" | "large" | "xlarge";

interface Props {
  color: Color;
  size: Size;
  className?: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: Props) {
  const colors: Record<Color, string> = {
    blue: `bg-[#228DF8] ${style.shadowBlue}`,
    purple: `bg-[#C387FF] ${style.shadowPurple}`,
  };
  const hoverColors: Record<Color, string> = {
    blue: "hover:bg-[#1083f6]",
    purple: "hover:bg-[#b977fc]",
  };
  const sizes: Record<Size, string> = {
    small: "py-[15px] px-[27px] text-[16px] rounded-[10px]",
    large: "py-[18px] px-[33px] text-[18px] rounded-[13px]",
    xlarge: "text-[18px] py-[25px] rounded-[21px]",
  };
  const color = colors[props.color];
  const hoverColor = hoverColors[props.color];
  const size = sizes[props.size];
  const className = `transition duration-300 font-[600] leading-none ${color} ${hoverColor} ${size} ${props.className}`;
  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
