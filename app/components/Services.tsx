import Service from "./Service/Service";
import service1Image from "~/images/service-1.jpeg";
import service2Image from "~/images/service-2.jpeg";
import service3Image from "~/images/service-3.jpeg";
import service4Image from "~/images/service-4.jpeg";
import Process, { type ProcessData } from "./Process";

const services = [
  {
    title: "GPT Integration",
    image: service1Image,
    reverse: false,
    content: [
      "Our GPT Integration Services specialize in seamlessly embedding GPT models into your existing infrastructure, revolutionizing your applications with advanced natural language processing capabilities.",
      "Whether you are looking to automate customer support, enhance content generation, or improve search functionality, our team will tailor the integration to your specific needs, ensuring optimal performance and user engagement. With our expertise, you can harness the power of GPT to elevate your digital presence and drive innovation in your organization.",
    ],
  },
  {
    title: "AI Consulting",
    image: service2Image,
    reverse: true,
    content: [
      "Our AI Consulting services provide specialized guidance and strategic foresight to assist companies in navigating the intricacies of artificial intelligence. From pinpointing opportunities for AI integration to crafting holistic AI strategies, our team works hand in hand with clients to unleash the complete potential of AI within their organization.",
      "Leveraging our extensive domain expertise and technical proficiency, we enable businesses to make well-informed choices and achieve concrete outcomes through innovative AI initiatives.",
    ],
  },
  {
    title: "Model Development and Training",
    image: service3Image,
    reverse: false,
    content: [
      "Our Model Development and Training service is committed to creating bespoke AI models designed specifically for your distinct business requirements.",
      "Utilizing state-of-the-art methodologies and profound expertise, we guarantee that your AI models undergo rigorous training to achieve peak performance and precision in tackling intricate challenges Whether it&apos;s image recognition or predictive analytics, our team collaborates closely with you to devise AI solutions that foster innovation and unveil fresh prospects for your organization.",
    ],
  },
  {
    title: "Bespoke AI Solutions",
    image: service4Image,
    reverse: true,
    content: [
      "Our Custom AI Solutions service is crafted to deliver personalized artificial intelligence solutions that tackle your precise business hurdles. We engage in close collaboration with your team to grasp your distinctive needs and craft bespoke AI solutions that resonate with your aims and aspirations.",
      "Whether you seek expertise in natural language processing, computer vision, or predictive analytics, our team merges technical prowess with inventive problem-solving to furnish cutting-edge AI solutions that yield tangible business outcomes.",
    ],
  },
];

const processes: ProcessData[] = [
  {
    step: 1,
    title: "Discovery",
    subtitle:
      "Gain a clear understanding of your business needs and objectives.",
    content:
      "Collaborate with our experts to define your AI strategy and roadmap, ensuring alignment with your goals and industry best practices.",
    position: "left",
  },
  {
    step: 2,
    title: "Implementation",
    subtitle:
      "Receive tailored AI solutions designed to address your specific challenges.",
    content:
      "Our team of developers will bring your AI strategy to life, crafting custom solutions that leverage the latest technologies and methodologies.",
    position: "center",
  },
  {
    step: 3,
    title: "Support",
    subtitle:
      "Maximize value of your AI investments with ongoing optimization.",
    content:
      "We provide continuous monitoring, refinement, and support to ensure your AI solutions remain effective and aligned with your evolving needs.",
    position: "right",
  },
];

export default function Services() {
  return (
    <section id="services" className="pt-[130px]">
      <div className="text-center mx-auto lg:w-4/6">
        <h2 className="mb-[1px] font-[900] text-[45px]">Our Services</h2>
        <h3 className="text-[25px] font-[700]">
          Explore our AI solutions tailored to your business needs.
        </h3>
        <p className="mt-[25px] mb-[70px] text-[#80BFFF]">
          Our commitment to providing cutting-edge AI solutions that drive
          innovation and efficiency in your business operations. From GPT
          expertise to bespoke AI development, we offer a comprehensive suite of
          services designed to meet your unique needs and propel your
          organisation into the future.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-[50px]">
        {services.map((service) => (
          <Service
            key={service.title}
            title={service.title}
            image={service.image}
            reverse={service.reverse}
            content={service.content}
          />
        ))}
      </div>
      <div className="text-center mx-auto lg:w-4/6 mt-[95px]">
        <h3 className="text-[29px] font-[900] mb-[24px]">
          Our Step-by-Step Service Approach
        </h3>
        <p className="text-[#80BFFF] mb-[70px]">
          Experience a seamless journey towards AI integration with our
          step-by-step service approach, designed to empower and benefit our
          users every step of the way. From strategic planning to ongoing
          support, we are committed to guiding you through each stage of your AI
          transformation with clarity, expertise, and tangible results.
        </p>
      </div>
      <div className="grid gap-[30px] lg:grid-cols-3 lg:gap-0">
        {processes.map((process) => (
          <Process
            key={process.step}
            step={process.step}
            title={process.title}
            subtitle={process.subtitle}
            content={process.content}
            position={process.position}
          />
        ))}
      </div>
    </section>
  );
}
