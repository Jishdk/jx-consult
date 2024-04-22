import style from "./Member.module.css";

interface Props {
  photo: string;
  name: string;
  position: string;
  about: string;
}

export default function Member(props: Props) {
  return (
    <div>
      <div className="bg-[rgba(222_148_255_/_15%)] h-[200px] rounded-t-[25px]">
        <img
          src={props.photo}
          alt={`${props.name}`}
          className="object-contain h-full w-full"
        />
      </div>
      <div className={`p-[25px] pb-16 mt-[5px] ${style.details}`}>
        <h3 className="font-[700] text-[24px] mb-[11px]">{props.name}</h3>
        <h4 className="text-[#80BFFF] mb-[25px]">{props.position}</h4>
        <p>{props.about}</p>
      </div>
    </div>
  );
}
