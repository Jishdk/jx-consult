import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default forwardRef(function Input(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return (
    <input
      type="text"
      value={props.value}
      name={props.name}
      onChange={handleChange}
      placeholder={props.placeholder}
      ref={ref}
      className="transition duration-300 py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white text-[#80BFFF] focus:text-white"
    />
  );
});
