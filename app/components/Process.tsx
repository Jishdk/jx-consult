export interface ProcessData {
  step: number;
  title: string;
  subtitle: string;
  content: string;
  position: "left" | "center" | "right";
}

interface LineProps {
  position: "left" | "right";
}

export default function Process(props: ProcessData) {
  const styles = {
    wrapper: {
      left: "rounded-[25px] lg:rounded-[0] lg:rounded-l-[25px]",
      center: "rounded-[25px] lg:rounded-[0]",
      right: "rounded-[25px] lg:rounded-[0] lg:rounded-r-[25px]",
    },
    step: {
      left: "rounded-[20px] rounded-br-[0]",
      center: "rounded-[20px]",
      right: "rounded-[20px] rounded-bl-[0]",
    },
  };
  const Line = (lineProps: LineProps) => {
    const styles = {
      left: {
        left: "invisible",
        center: "invisible lg:visible",
        right: "invisible lg:visible",
      },
      right: {
        left: "invisible lg:visible",
        center: "invisible lg:visible",
        right: "invisible",
      },
    };
    const style = styles[lineProps.position][props.position];
    return (
      <div
        className={`w-[calc((100%-65px)/2)] h-[4px] bg-[#1C86FF] ${style}`}
      ></div>
    );
  };
  return (
    <div
      className={`text-center py-[45px] bg-[rgb(222_148_255_/_12%)] ${
        styles.wrapper[props.position]
      }`}
    >
      <h4 className="uppercase font-[600] mb-[19px]">Step</h4>
      <div className="flex justify-between items-center">
        <Line position="left" />
        <div
          className={`w-[65px] h-[65px] bg-[#1C86FF] flex justify-center items-center ${
            styles.step[props.position]
          }`}
        >
          <div className="text-[19px] leading-none">{`0${props.step}`}</div>
        </div>
        <Line position="right" />
      </div>
      <div className="px-[30px]">
        <h3 className="text-[25px] font-[700] mt-[42px] mb-[18px]">
          {props.title}
        </h3>
        <p className="text-[#80BFFF] mb-[31px]">{props.subtitle}</p>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
