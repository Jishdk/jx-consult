import { ChangeEventHandler } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default function Textarea(props: Props) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return (
    <textarea
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      rows={5}
      className="transition duration-300 py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white text-[#80BFFF] focus:text-white"
      onChange={handleChange}
    />
  );
}
