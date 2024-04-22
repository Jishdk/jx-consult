import { Link } from "@remix-run/react";
import { RiMapPin2Line, RiPhoneLine, RiSendPlane2Line } from "@remixicon/react";

export interface ReachData {
  icon: keyof typeof icons;
  title: string;
  value: string;
  url: string;
}

const icons = {
  email: RiSendPlane2Line,
  phone: RiPhoneLine,
  address: RiMapPin2Line,
};

export default function Reach(props: ReachData) {
  const Icon = icons[props.icon];
  return (
    <div className="group flex gap-[23px] items-center w-fit">
      <div className="transition-all duration-300 flex justify-center items-center w-[62px] h-[62px] bg-[rgba(255_255_255_/_12%)] rounded-[20px] rounded-br-none group-hover:rounded-br-[20px] group-hover:bg-[rgba(255_255_255_/_20%)]">
        <Icon size={27} className="text-[#80BFFF]" />
      </div>
      <div>
        <h5 className="uppercase text-[14px] font-[600] mb-[5px] text-[#80BFFF]">
          {props.title}
        </h5>
        <Link to={props.url}>{props.value}</Link>
      </div>
    </div>
  );
}
