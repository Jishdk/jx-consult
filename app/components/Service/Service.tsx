import style from "./Service.module.css";

interface Props {
  title: string;
  image: string;
  reverse: boolean;
  content: string[];
}

export default function Service(props: Props) {
  const order = {
    first: props.reverse ? "lg:order-2" : "lg:order-1",
    second: props.reverse ? "lg:order-1" : "lg:order-2",
  };
  const bgOrder = props.reverse ? style.contentRight : style.contentLeft;
  return (
    <div className="grid lg:grid-cols-2 items-center">
      <div className={`relative mb-[-25px] lg:mb-0 ${order.first}`}>
        <div
          className={`px-[50px] pt-[43px] pb-[45px] lg:pb-[18px] rounded-[25px] ${style.content} ${bgOrder}`}
        >
          <h3 className="text-[25px] font-[700] mb-[25px]">{props.title}</h3>
          {props.content.map((paragraph) => (
            <p key={paragraph} className="mb-[25px]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div
        className={`relative z-10 w-11/12 mx-auto lg:w-full ${order.second}`}
      >
        <img className="rounded-[25px]" src={props.image} alt={props.title} />
      </div>
    </div>
  );
}
