import { useState } from "react";
import Navigate from "./Navigate";
import partner1 from "~/images/partner-1.png";
import partner2 from "~/images/partner-2.png";
import partner3 from "~/images/partner-3.png";
import partner4 from "~/images/partner-4.png";
import partner5 from "~/images/partner-5.png";
import Animate from "./Animate/Animate";
import Promise from "bluebird";

interface Partner {
  id: number;
  image: string;
  width: number;
  height: number;
}

interface Batch {
  id: number;
  partners: Partner[];
}

const batches: Batch[] = [
  {
    id: 0,
    partners: [
      {
        id: 0,
        image: partner1,
        width: 157,
        height: 39,
      },
      {
        id: 1,
        image: partner2,
        width: 197,
        height: 22,
      },
      {
        id: 2,
        image: partner3,
        width: 85,
        height: 51,
      },
      {
        id: 3,
        image: partner4,
        width: 238,
        height: 38,
      },
      {
        id: 4,
        image: partner5,
        width: 158,
        height: 21,
      },
    ],
  },
  {
    id: 2,
    partners: [
      {
        id: 5,
        image: partner4,
        width: 238,
        height: 38,
      },
      {
        id: 9,
        image: partner5,
        width: 158,
        height: 21,
      },
      {
        id: 8,
        image: partner1,
        width: 157,
        height: 39,
      },
      {
        id: 7,
        image: partner3,
        width: 85,
        height: 51,
      },
      {
        id: 6,
        image: partner2,
        width: 197,
        height: 22,
      },
    ],
  },
];

export default function Partners() {
  const [activeBatch, setActiveBatch] = useState(batches[0]);
  const [isActiveVisible, setIsActiveVisible] = useState(true);
  const handleNavigate = async (batch: Batch) => {
    if (activeBatch.id === batch.id) return;
    setIsActiveVisible(false);
    await Promise.delay(300);
    setActiveBatch(batch);
    setIsActiveVisible(true);
  };
  return (
    <section id="partners" className="pt-[130px]">
      <div className="text-center mx-auto lg:w-4/6">
        <h2 className="mb-[1px] font-[900] text-[45px]">Our Partners</h2>
        <h3 className="text-[25px] font-[700]">
          Our esteemed partners that form the backbone of our collaborative
          network.
        </h3>
        <p className="mt-[25px] mb-[90px] text-[#80BFFF]">
          The esteemed organizations and institutions that fuel our
          collaborative network, enriching our capabilities and expanding our
          reach. Through strategic alliances and shared expertise, we forge
          mutually beneficial relationships to drive innovation and deliver
          exceptional results for our clients.
        </p>
      </div>
      <Animate in={isActiveVisible}>
        <div className="flex flex-col gap-[30px] lg:flex-row items-center justify-between">
          {activeBatch.partners.map((partner) => (
            <img
              key={partner.image}
              src={partner.image}
              width={partner.width}
              height={partner.height}
              alt="Partner"
              className="scale-75 xl:scale-100"
            />
          ))}
        </div>
      </Animate>
      <div className="flex justify-center">
        <Navigate
          items={batches}
          active={activeBatch}
          onNavigate={handleNavigate}
        />
      </div>
    </section>
  );
}
