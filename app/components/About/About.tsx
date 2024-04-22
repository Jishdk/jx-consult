import Member from "../Member/Member";
import member1 from "~/images/member-1.png";
import member2 from "~/images/member-2.png";
import member3 from "~/images/member-3.png";
import member4 from "~/images/member-4.png";
import member5 from "~/images/member-5.png";
import member6 from "~/images/member-6.png";
import teamVideo from "~/videos/team.mp4";
import playImage from "~/images/play.png";
import pauseImage from "~/images/pause.png";
import { useRef, useState } from "react";
import style from "./About.module.css";

const members = [
  {
    photo: member1,
    name: "Ryan Davis",
    position: "Chief Technology Officer",
    about:
      "Ryan Davis, our Chief Technology Officer, leads our team with a visionary approach to AI innovation, driving forward our cutting-edge technology initiatives. With a wealth of experience and a strategic mindset, Emily ensures that our solutions remain at the forefront of the ever-evolving AI landscape.",
  },
  {
    photo: member2,
    name: "David Patel",
    position: "Lead AI Engineer",
    about:
      "As our Lead AI Engineer, David Patel spearheads the development of advanced AI models and algorithms, pushing the boundaries of what's possible in artificial intelligence. With a meticulous attention to detail and a passion for innovation, David ensures that our AI solutions are both robust and groundbreaking.",
  },
  {
    photo: member3,
    name: "Sarah Johnson",
    position: "Senior Data Scientist",
    about:
      "Sarah Johnson, our Senior Data Scientist, leads our team in leveraging data-driven insights to drive strategic decision-making and innovation. With a blend of statistical expertise and domain knowledge, Sarah crafts sophisticated analytical solutions that empower our clients to thrive in the digital age.",
  },
  {
    photo: member4,
    name: "Alex Thompson",
    position: "Business Development Manager",
    about:
      "As our Business Development Manager, Alex Thompson spearheads our efforts to forge strategic partnerships and expand our client base. With a keen understanding of market trends and a knack for building relationships, Alex drives our growth initiatives forward, ensuring that we remain at the forefront.",
  },
  {
    photo: member5,
    name: "Jennifer Garcia",
    position: "Project Manager",
    about:
      "Jennifer Garcia, our Project Manager, orchestrates seamless project execution from inception to delivery, ensuring timelines and milestones are met with precision. With her strong organisational skills and effective communication, Jennifer ensures that client expectations are not only met but exceeded, driving success.",
  },
  {
    photo: member6,
    name: "Daniel Kim",
    position: "Research Scientist",
    about:
      "Daniel Kim, our Research Scientist, pioneers cutting-edge advancements in AI, pushing the boundaries of innovation. With a rigorous approach to experimentation and a commitment to excellence, Daniel's work drives the evolution of our AI solutions, ensuring they remain at the forefront of the industry.",
  },
];

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoButtons = [
    {
      name: "play",
      width: 43,
      height: 59,
      image: pauseImage,
      visible: isVideoPlaying,
    },
    {
      name: "pause",
      width: 54,
      height: 66,
      image: playImage,
      visible: !isVideoPlaying,
    },
  ];
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.paused ? video.play() : video.pause();
    setIsVideoPlaying(!video.paused);
  };
  return (
    <section id="about" className="pt-[130px]">
      <div className="text-center mx-auto lg:w-4/6">
        <h2 className="mb-[1px] font-[900] text-[45px]">About us</h2>
        <h3 className="text-[25px] font-[700]">
          Discover our journey, expertise, and passion for pioneering AI
          solutions.
        </h3>
        <p className="mt-[25px] mb-[60px] text-[#80BFFF]">
          At JX, we pride ourselves on our deep expertise in GPT usage and
          bespoke AI solutions. Our dedicated team is committed to delivering
          cutting-edge technology and personalized service to meet the unique
          needs of our clients.
        </p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[20px] gap-y-[60px] mb-[95px]">
        {members.map((member) => (
          <Member
            key={member.name}
            photo={member.photo}
            name={member.name}
            position={member.position}
            about={member.about}
          />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-[30px] items-center">
        <div>
          <h3 className="font-[900] text-[29px] mb-[23px]">
            A Personal Messages from Our Team
          </h3>
          <p className="mb-7">
            Through these personal messages, we invite you to connect with the
            individuals who power our company, revealing the passion and
            dedication behind our AI solutions. Each team member brings a wealth
            of experience and a unique perspective.
          </p>
          <p>
            From our developers to our data scientists, we are more than just a
            team – we are collaborators, innovators, and partners in your
            journey towards AI-driven success. Join us as we share our stories
            and insights, demonstrating our unwavering dedication to helping you
            achieve your goals with cutting-edge technology.
          </p>
        </div>
        <div
          className={`mt-[15px] lg:mt-0 relative cursor-pointer ${style.videoWrapper}`}
          onClick={handleVideoClick}
          role="presentation"
        >
          <video
            ref={videoRef}
            width="1280"
            height="720"
            controls={false}
            muted
            className="rounded-[24px]"
          >
            <source src={teamVideo} type="video/mp4" />
          </video>
          {videoButtons.map((videoButton) => (
            <img
              key={videoButton.name}
              src={videoButton.image}
              alt="Video play and pause"
              width={videoButton.width}
              height={videoButton.height}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                style.play
              } ${videoButton.visible ? "block" : "hidden"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
