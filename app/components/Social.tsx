import { Link } from "@remix-run/react";
import {
  RemixiconComponentType,
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";

type Name = "fb" | "x" | "instagram" | "linkedin" | "youtube";

export interface SocialData {
  name: Name;
  url: string;
}

export default function Social(props: SocialData) {
  const icons: Record<Name, RemixiconComponentType> = {
    fb: RiFacebookLine,
    x: RiTwitterXLine,
    instagram: RiInstagramLine,
    linkedin: RiLinkedinLine,
    youtube: RiYoutubeLine,
  };
  const Icon = icons[props.name];
  return (
    <Link to={props.url}>
      <div className="transition-all duration-300 h-[62px] w-[62px] bg-[rgba(255_255_255_/_12%)] rounded-[20px] rounded-br-none flex justify-center items-center hover:rounded-br-[20px] hover:rounded-tl-none hover:bg-[rgba(255_255_255_/_20%)]">
        <Icon className="text-[#80BFFF]" size={24} />
      </div>
    </Link>
  );
}
