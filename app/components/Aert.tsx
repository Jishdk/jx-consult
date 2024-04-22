import { RiCloseLine } from "@remixicon/react";
import useAlertStore from "~/stores/alertStore";

export default function Alert() {
  const { message, close } = useAlertStore((state) => {
    const { message, close } = state;
    return {
      message,
      close,
    };
  });
  return (
    message && (
      <div className="fixed inset-x-0 bottom-0 flex justify-between items-center px-[25px] py-[19px] bg-[#A7D3FF] text-[#001C39] lg:w-1/2 xl:w-1/3 rounded-[10px] mb-14 mx-[30px] lg:mx-auto">
        <span className="text-[17px]">{message}</span>
        <RiCloseLine className="cursor-pointer" onClick={close} />
      </div>
    )
  );
}
