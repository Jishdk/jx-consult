import { RiArrowDownSLine } from "@remixicon/react";
import { ChangeEventHandler } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

export default function Select(props: Props) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return (
    <div className="relative">
      <select
        name={props.name}
        value={props.value}
        onChange={handleChange}
        className="transition duration-300 peer py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white appearance-none text-[#80BFFF] focus:text-white"
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <RiArrowDownSLine
        size={28}
        className={`sibling absolute right-[20px] top-[23px] text-[#80BFFF] peer-focus:text-white`}
      />
    </div>
  );
}
