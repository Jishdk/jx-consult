import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useNavigate } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import Joi from "joi";
import nodemailer from "nodemailer";
import { useRef, useState, forwardRef, useEffect } from "react";
import { RiCloseLine, RiArrowDownSLine, RiSendPlane2Line, RiPhoneLine, RiMapPin2Line, RiFacebookLine, RiTwitterXLine, RiInstagramLine, RiLinkedinLine, RiYoutubeLine, RiMenuFill } from "@remixicon/react";
import { create } from "zustand";
import { produce } from "immer";
import { nanoid } from "nanoid";
import axios, { AxiosError } from "axios";
import { CSSTransition } from "react-transition-group";
import Promise$1 from "bluebird";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const style$6 = "/assets/index-BMDu8V27.css";
const links = () => [{ rel: "stylesheet", href: style$6 }];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const mailService = {
  transporter: null,
  create() {
    if (this.transporter)
      return this.transporter;
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    return this.transporter;
  },
  async send(mail) {
    const transporter = this.create();
    await transporter.sendMail({
      from: `"${mail.name}" <${mail.email}>`,
      to: process.env.MAIL_EMAIL,
      subject: mail.subject,
      text: mail.message,
      replyTo: mail.email
    });
  }
};
const action = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, { status: 405 });
  }
  const data = await request.json();
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).required(),
    message: Joi.string().min(3).required()
  });
  const { error } = schema.validate(data);
  if (error) {
    return json({ message: error.details[0].message }, { status: 422 });
  }
  try {
    await mailService.send(data);
  } catch (error2) {
    console.error({ error: error2 });
    return json({ message: "Failed to send your message" }, { status: 500 });
  }
  return json({ sent: true });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const details = "_details_ahnts_1";
const style$5 = {
  details
};
function Member(props) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-[rgba(222_148_255_/_15%)] h-[200px] rounded-t-[25px]", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: props.photo,
        alt: `${props.name}`,
        className: "object-contain h-full w-full"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: `p-[25px] pb-16 mt-[5px] ${style$5.details}`, children: [
      /* @__PURE__ */ jsx("h3", { className: "font-[700] text-[24px] mb-[11px]", children: props.name }),
      /* @__PURE__ */ jsx("h4", { className: "text-[#80BFFF] mb-[25px]", children: props.position }),
      /* @__PURE__ */ jsx("p", { children: props.about })
    ] })
  ] });
}
const member1 = "/assets/member-1-Cs64hAjC.png";
const member2 = "/assets/member-2-DxFctCy3.png";
const member3 = "/assets/member-3-DqZqRk-l.png";
const member4 = "/assets/member-4-D7DGgRYQ.png";
const member5 = "/assets/member-5-BjwemtHx.png";
const member6 = "/assets/member-6-DcVLl0Bl.png";
const teamVideo = "/assets/team-2i2L9FyU.mp4";
const playImage = "/assets/play-BNpUhnnh.png";
const pauseImage = "/assets/pause-DF6Nba9a.png";
const play = "_play_1wim9_1";
const videoWrapper = "_videoWrapper_1wim9_6";
const style$4 = {
  play,
  videoWrapper
};
const members = [
  {
    photo: member1,
    name: "Ryan Davis",
    position: "Chief Technology Officer",
    about: "Ryan Davis, our Chief Technology Officer, leads our team with a visionary approach to AI innovation, driving forward our cutting-edge technology initiatives. With a wealth of experience and a strategic mindset, Emily ensures that our solutions remain at the forefront of the ever-evolving AI landscape."
  },
  {
    photo: member2,
    name: "David Patel",
    position: "Lead AI Engineer",
    about: "As our Lead AI Engineer, David Patel spearheads the development of advanced AI models and algorithms, pushing the boundaries of what's possible in artificial intelligence. With a meticulous attention to detail and a passion for innovation, David ensures that our AI solutions are both robust and groundbreaking."
  },
  {
    photo: member3,
    name: "Sarah Johnson",
    position: "Senior Data Scientist",
    about: "Sarah Johnson, our Senior Data Scientist, leads our team in leveraging data-driven insights to drive strategic decision-making and innovation. With a blend of statistical expertise and domain knowledge, Sarah crafts sophisticated analytical solutions that empower our clients to thrive in the digital age."
  },
  {
    photo: member4,
    name: "Alex Thompson",
    position: "Business Development Manager",
    about: "As our Business Development Manager, Alex Thompson spearheads our efforts to forge strategic partnerships and expand our client base. With a keen understanding of market trends and a knack for building relationships, Alex drives our growth initiatives forward, ensuring that we remain at the forefront."
  },
  {
    photo: member5,
    name: "Jennifer Garcia",
    position: "Project Manager",
    about: "Jennifer Garcia, our Project Manager, orchestrates seamless project execution from inception to delivery, ensuring timelines and milestones are met with precision. With her strong organisational skills and effective communication, Jennifer ensures that client expectations are not only met but exceeded, driving success."
  },
  {
    photo: member6,
    name: "Daniel Kim",
    position: "Research Scientist",
    about: "Daniel Kim, our Research Scientist, pioneers cutting-edge advancements in AI, pushing the boundaries of innovation. With a rigorous approach to experimentation and a commitment to excellence, Daniel's work drives the evolution of our AI solutions, ensuring they remain at the forefront of the industry."
  }
];
function About() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoButtons = [
    {
      name: "play",
      width: 43,
      height: 59,
      image: pauseImage,
      visible: isVideoPlaying
    },
    {
      name: "pause",
      width: 54,
      height: 66,
      image: playImage,
      visible: !isVideoPlaying
    }
  ];
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video)
      return;
    video.muted = false;
    video.paused ? video.play() : video.pause();
    setIsVideoPlaying(!video.paused);
  };
  return /* @__PURE__ */ jsxs("section", { id: "about", className: "pt-[130px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mx-auto lg:w-4/6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-[1px] font-[900] text-[45px]", children: "About us" }),
      /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700]", children: "Discover our journey, expertise, and passion for pioneering AI solutions." }),
      /* @__PURE__ */ jsx("p", { className: "mt-[25px] mb-[60px] text-[#80BFFF]", children: "At JX, we pride ourselves on our deep expertise in GPT usage and bespoke AI solutions. Our dedicated team is committed to delivering cutting-edge technology and personalized service to meet the unique needs of our clients." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-[20px] gap-y-[60px] mb-[95px]", children: members.map((member) => /* @__PURE__ */ jsx(
      Member,
      {
        photo: member.photo,
        name: member.name,
        position: member.position,
        about: member.about
      },
      member.name
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-[30px] items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-[900] text-[29px] mb-[23px]", children: "A Personal Messages from Our Team" }),
        /* @__PURE__ */ jsx("p", { className: "mb-7", children: "Through these personal messages, we invite you to connect with the individuals who power our company, revealing the passion and dedication behind our AI solutions. Each team member brings a wealth of experience and a unique perspective." }),
        /* @__PURE__ */ jsx("p", { children: "From our developers to our data scientists, we are more than just a team – we are collaborators, innovators, and partners in your journey towards AI-driven success. Join us as we share our stories and insights, demonstrating our unwavering dedication to helping you achieve your goals with cutting-edge technology." })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `mt-[15px] lg:mt-0 relative cursor-pointer ${style$4.videoWrapper}`,
          onClick: handleVideoClick,
          role: "presentation",
          children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                ref: videoRef,
                width: "1280",
                height: "720",
                controls: false,
                muted: true,
                className: "rounded-[24px]",
                children: /* @__PURE__ */ jsx("source", { src: teamVideo, type: "video/mp4" })
              }
            ),
            videoButtons.map((videoButton) => /* @__PURE__ */ jsx(
              "img",
              {
                src: videoButton.image,
                alt: "Video play and pause",
                width: videoButton.width,
                height: videoButton.height,
                className: `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${style$4.play} ${videoButton.visible ? "block" : "hidden"}`
              },
              videoButton.name
            ))
          ]
        }
      )
    ] })
  ] });
}
const useAlertStore = create()((set) => ({
  message: "",
  setMessage(message) {
    set((state) => {
      return produce(state, (draft) => {
        draft.message = message;
      });
    });
  },
  close() {
    set((state) => {
      return produce(state, (draft) => {
        draft.message = "";
      });
    });
  }
}));
const useAlertStore$1 = useAlertStore;
function Alert() {
  const { message, close } = useAlertStore$1((state) => {
    const { message: message2, close: close2 } = state;
    return {
      message: message2,
      close: close2
    };
  });
  return message && /* @__PURE__ */ jsxs("div", { className: "fixed inset-x-0 bottom-0 flex justify-between items-center px-[25px] py-[19px] bg-[#A7D3FF] text-[#001C39] lg:w-1/2 xl:w-1/3 rounded-[10px] mb-14 mx-[30px] lg:mx-auto", children: [
    /* @__PURE__ */ jsx("span", { className: "text-[17px]", children: message }),
    /* @__PURE__ */ jsx(RiCloseLine, { className: "cursor-pointer", onClick: close })
  ] });
}
const Input = forwardRef(function Input2(props, ref) {
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      value: props.value,
      name: props.name,
      onChange: handleChange,
      placeholder: props.placeholder,
      ref,
      className: "transition duration-300 py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white text-[#80BFFF] focus:text-white"
    }
  );
});
function Select(props) {
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        name: props.name,
        value: props.value,
        onChange: handleChange,
        className: "transition duration-300 peer py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white appearance-none text-[#80BFFF] focus:text-white",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: props.placeholder }),
          props.options.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      RiArrowDownSLine,
      {
        size: 28,
        className: `sibling absolute right-[20px] top-[23px] text-[#80BFFF] peer-focus:text-white`
      }
    )
  ] });
}
function Textarea(props) {
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      value: props.value,
      name: props.name,
      placeholder: props.placeholder,
      rows: 5,
      className: "transition duration-300 py-[22px] px-[27px] bg-[transparent] border-2 border-[#80BFFF] rounded-[21px] placeholder:text-[#80BFFF] inline-block w-full focus:outline-none focus:placeholder:text-white focus:border-white text-[#80BFFF] focus:text-white",
      onChange: handleChange
    }
  );
}
const shadowPurple = "_shadowPurple_dbx3f_1";
const shadowBlue = "_shadowBlue_dbx3f_5";
const style$3 = {
  shadowPurple,
  shadowBlue
};
function Button(props) {
  const colors = {
    blue: `bg-[#228DF8] ${style$3.shadowBlue}`,
    purple: `bg-[#C387FF] ${style$3.shadowPurple}`
  };
  const hoverColors = {
    blue: "hover:bg-[#1083f6]",
    purple: "hover:bg-[#b977fc]"
  };
  const sizes = {
    small: "py-[15px] px-[27px] text-[16px] rounded-[10px]",
    large: "py-[18px] px-[33px] text-[18px] rounded-[13px]",
    xlarge: "text-[18px] py-[25px] rounded-[21px]"
  };
  const color = colors[props.color];
  const hoverColor = hoverColors[props.color];
  const size = sizes[props.size];
  const className = `transition duration-300 font-[600] leading-none ${color} ${hoverColor} ${size} ${props.className}`;
  return /* @__PURE__ */ jsx("button", { className, onClick: props.onClick, children: props.children });
}
const icons = {
  email: RiSendPlane2Line,
  phone: RiPhoneLine,
  address: RiMapPin2Line
};
function Reach(props) {
  const Icon = icons[props.icon];
  return /* @__PURE__ */ jsxs("div", { className: "group flex gap-[23px] items-center w-fit", children: [
    /* @__PURE__ */ jsx("div", { className: "transition-all duration-300 flex justify-center items-center w-[62px] h-[62px] bg-[rgba(255_255_255_/_12%)] rounded-[20px] rounded-br-none group-hover:rounded-br-[20px] group-hover:bg-[rgba(255_255_255_/_20%)]", children: /* @__PURE__ */ jsx(Icon, { size: 27, className: "text-[#80BFFF]" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "uppercase text-[14px] font-[600] mb-[5px] text-[#80BFFF]", children: props.title }),
      /* @__PURE__ */ jsx(Link, { to: props.url, children: props.value })
    ] })
  ] });
}
const useContactStore = create()((set) => ({
  isRequestingQuote: null,
  setIsRequestingQuote() {
    set((state) => {
      return produce(state, (draft) => {
        draft.isRequestingQuote = nanoid();
      });
    });
  }
}));
const reaches = [
  {
    icon: "email",
    title: "Email",
    value: "info@example.com",
    url: "mailto:info@example.com"
  },
  {
    icon: "phone",
    title: "Phone",
    value: "+1 (123) 456-7890",
    url: "tel:+11234567890"
  },
  {
    icon: "address",
    title: "Address",
    value: "213 Main Street, Reno, Nevada",
    url: "https://maps.app.goo.gl/Vaf9xf9UHR3CYZo6A"
  }
];
function Contact() {
  const isRequestingQuote = useContactStore((state) => state.isRequestingQuote);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const setAlert = useAlertStore$1((state) => state.setMessage);
  const handleInputChange = (name2, value) => {
    switch (name2) {
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "subject":
        return setSubject(value);
      case "message":
        return setMessage(value);
    }
  };
  const handleSubmit = async () => {
    var _a;
    try {
      const data = {
        name,
        email,
        subject,
        message
      };
      await axios.post("/contact", data);
      setAlert("Thank you! We have received your message.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error({ error });
      if (error instanceof AxiosError) {
        return setAlert((_a = error.response) == null ? void 0 : _a.data.message);
      }
      setAlert("Unable to send your message");
    }
  };
  useEffect(() => {
    if (!isRequestingQuote || !nameRef.current)
      return;
    nameRef.current.focus();
    setSubject("Get a free quote");
  }, [isRequestingQuote]);
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "pt-[130px] pb-[120px]", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-[50px] items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[rgba(222_148_255_/_12%)] rounded-[25px] px-[55px] py-[50px] order-2 lg:order-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-[700] text-[25px] mb-[18px]", children: "Get in Touch with Us" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#80BFFF] mb-[32px]", children: "Send us a message and let's start collaborating on your next AI project!" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            name: "name",
            value: name,
            placeholder: "Your full name",
            ref: nameRef,
            onChange: handleInputChange
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            name: "email",
            value: email,
            placeholder: "Email address",
            onChange: handleInputChange
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            name: "subject",
            value: subject,
            placeholder: "Choose subject",
            options: ["General enquiry", "Get a free quote"],
            onChange: handleInputChange
          }
        ),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            name: "message",
            value: message,
            placeholder: "Write your message here",
            onChange: handleInputChange
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            color: "blue",
            size: "xlarge",
            onClick: handleSubmit,
            className: "mt-[18px]",
            children: "Send Message"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "order-1 lg:order-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-[1px] font-[900] text-[45px]", children: "Contact Us" }),
      /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700]", children: "Start your journey towards AI-driven success." }),
      /* @__PURE__ */ jsx("p", { className: "mt-[25px] mb-[65px] text-[#80BFFF]", children: "Reach out to us directly for personalized assistance, expert advice, and inquiries about our AI solutions. Our dedicated team is here to address your questions and support your business needs every step of the way." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[20px]", children: reaches.map((reach) => /* @__PURE__ */ jsx(
        Reach,
        {
          icon: reach.icon,
          title: reach.title,
          value: reach.value,
          url: reach.url
        },
        reach.title
      )) })
    ] })
  ] }) });
}
const logo$1 = "data:image/png;base64,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";
function Social(props) {
  const icons2 = {
    fb: RiFacebookLine,
    x: RiTwitterXLine,
    instagram: RiInstagramLine,
    linkedin: RiLinkedinLine,
    youtube: RiYoutubeLine
  };
  const Icon = icons2[props.name];
  return /* @__PURE__ */ jsx(Link, { to: props.url, children: /* @__PURE__ */ jsx("div", { className: "transition-all duration-300 h-[62px] w-[62px] bg-[rgba(255_255_255_/_12%)] rounded-[20px] rounded-br-none flex justify-center items-center hover:rounded-br-[20px] hover:rounded-tl-none hover:bg-[rgba(255_255_255_/_20%)]", children: /* @__PURE__ */ jsx(Icon, { className: "text-[#80BFFF]", size: 24 }) }) });
}
const curveImage = "data:image/svg+xml,%3csvg%20width='1280'%20height='48'%20viewBox='0%200%201280%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_1235_3'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='1280'%20height='48'%3e%3crect%20width='1280'%20height='48'%20fill='%23D9D9D9'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1235_3)'%3e%3cpath%20d='M0%200C531.266%2040.6348%20812.66%2039.4065%201280%200V449H0V0Z'%20fill='%23DE94FF'%20fill-opacity='0.12'/%3e%3c/g%3e%3c/svg%3e";
const socials = [
  {
    name: "fb",
    url: "#"
  },
  {
    name: "x",
    url: "#"
  },
  {
    name: "instagram",
    url: "#"
  },
  {
    name: "linkedin",
    url: "#"
  },
  {
    name: "youtube",
    url: "#"
  }
];
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("img", { src: curveImage, alt: "Curve", className: "w-full" }),
    /* @__PURE__ */ jsx("footer", { className: "pb-[80px] pt-[115px] bg-[rgba(222_148_255_/_12%)]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-5", children: /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-[30px] ", children: [
      /* @__PURE__ */ jsxs("div", { className: "order-2 sm:order-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: logo$1,
            alt: "Logo",
            width: 98,
            height: 76,
            className: "mb-[35px]"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-[17px] mt-[20px] mb-[33px]", children: "JX is a leading provider of innovative AI solutions, specializing in GPT expertise and bespoke AI services tailored to meet the unique needs of businesses worldwide." }),
        /* @__PURE__ */ jsxs("p", { className: "text-[17px]", children: [
          "© ",
          year,
          " JX. All rights reserved."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:items-center mb-[25px] sm:mb-0 order-1 sm:order-2", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "text-[20px] font-[600] mb-[15px]", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "leading-[38px] text-[17px]", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#home", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#about", children: "About" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#services", children: "Services" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#partners", children: "Partners" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#contact", children: "Contact" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: "Privacy Policy" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "order-3", children: [
        /* @__PURE__ */ jsx("h5", { className: "text-[20px] font-[600] mb-[15px]", children: "Quick Links" }),
        /* @__PURE__ */ jsx("p", { className: "text-[17px] text-[#80BFFF] mb-[27px]", children: "Stay updated with our latest news and insights by following us on social media!" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-[15px]", children: socials.map((social) => /* @__PURE__ */ jsx(
          Social,
          {
            name: social.name,
            url: social.url
          },
          social.name
        )) })
      ] })
    ] }) }) })
  ] });
}
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAqCAMAAAAAoWzMAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAEnRSTlMA34AgYBDvz6Awv19wkECvT4+DCLWhAAABU0lEQVRIx63X226EIBgE4B8RF1lP9f0ftl2LmehUCJnOjQbjp4lxAKsl+E/M90c2q2Tsf2PVdPtPnFncj0Qrxrv9SANsCXLVnawBDi/IFbezFhiy5DIMudNchiFrLsMWcLPkAqbbNRcwA5oLmAnFBVxG8FEFmGS4sykwy/hxVBiVUHL9J6EJhvwulBO1XAmGPJxyJFeCbcxyygfTYcjIK+gwy3B1GDK7OmxfGV5Mg/lKzjDKMLuQdRjjkL0Gs+vOo/8nGF4PWYfhXs5FmCyS22F2C7KrrLVW6pg3nJKcuJz4wXPRhcxjywObP/pG7gDjQV6oR3iqcOyOZjU5QTZ2b9PDBvdBhrPkkYXdfri9xjjAJZk6dD5rtesvmc++fd8b+OLCITntxXRwyxuMeJfDqrksUwdyhslyPNyqjBEf/2ZjaNtoYZUBekruqrp1Cs0L1XTK32+YQkAPD1hFAAAAAElFTkSuQmCC";
const homeImage = "/assets/home-BnxCk7Jj.png";
const intro = "_intro_1tmts_1";
const highlighter = "_highlighter_1tmts_7";
const style$2 = {
  intro,
  highlighter
};
const slideEnter = "_slideEnter_1mhts_1";
const slideEnterActive = "_slideEnterActive_1mhts_6";
const slideEnterDone = "_slideEnterDone_1mhts_12";
const slideExit = "_slideExit_1mhts_17";
const slideExitActive = "_slideExitActive_1mhts_22";
const slideExitDone = "_slideExitDone_1mhts_28";
const styles = {
  slideEnter,
  slideEnterActive,
  slideEnterDone,
  slideExit,
  slideExitActive,
  slideExitDone
};
function Animate(props) {
  return /* @__PURE__ */ jsx(
    CSSTransition,
    {
      in: props.in,
      timeout: 300,
      classNames: {
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        enterDone: styles.slideEnterDone,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
        exitDone: styles.slideExitDone
      },
      children: props.children
    }
  );
}
function Navigate(props) {
  const itemClass = (id) => {
    return props.active.id === id ? "bg-[#228DF8]" : "bg-[rgba(222_148_255_/_20%)]";
  };
  const handleItemClick = (item) => {
    props.onNavigate(item);
  };
  return /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-[12px] mt-[61px]", children: props.items.map((item) => {
    return /* @__PURE__ */ jsx(
      "li",
      {
        className: `h-[17px] w-[17px] rounded-[5px] cursor-pointer ${itemClass(
          item.id
        )}`,
        onClick: () => handleItemClick(item),
        role: "presentation"
      },
      item.id
    );
  }) });
}
function Home() {
  const navigate = useNavigate();
  const setIsRequestingQuote = useContactStore(
    (state) => state.setIsRequestingQuote
  );
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const sliders = [
    {
      id: 0,
      title: ["Unlocking the ", "Power", " of AI"],
      subtitle: "Expertise in GPT Usage and Bespoke Solutions",
      description: "At JX, we specialize in harnessing the potential of cutting-edge AI technologies, including GPT, to empower businesses and drive innovation. Our team of experts offers tailored solutions and unparalleled expertise to help clients leverage AI effectively and achieve their goals."
    },
    {
      id: 1,
      title: ["Gateway to AI", " Excellence"],
      subtitle: "Tailored AI solutions by industry leaders at JX",
      description: "Step into the realm of AI innovation with JX, where we offer unrivaled expertise in leveraging GPT capabilities and crafting bespoke solutions tailored to your unique needs. Elevate your business to new heights as we pave the future-proof way for AI excellence together."
    },
    {
      id: 2,
      title: ["Unleash ", "Possibilities"],
      subtitle: "Experience GPT Mastery and Custom AI Solutions",
      description: "JX opens doors to a realm where artificial intelligence meets creativity and precision. Explore our suite of curated services designed to elevate your business, from harnessing the power of GPT to crafting bespoke AI solutions, tailored to bring your boldest ideas to life."
    }
  ];
  const [activeSlider, setActiveSlider] = useState(sliders[0]);
  const [isActiveSliderVisible, setIsActiveSliderVisible] = useState(true);
  const handleMobileMenuClick = () => {
    setMobileMenuActive(false);
  };
  const menuItems = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#home", onClick: handleMobileMenuClick, children: "Home" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#about", onClick: handleMobileMenuClick, children: "About" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#services", onClick: handleMobileMenuClick, children: "Services" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#partners", onClick: handleMobileMenuClick, children: "Partners" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#contact", onClick: handleMobileMenuClick, children: "Contact" }) })
  ] });
  const handleGetQuoteClick = () => {
    navigate({ hash: "#contact" });
    setIsRequestingQuote();
  };
  const handleMenuIconClick = () => {
    setMobileMenuActive(!isMobileMenuActive);
  };
  const handleExploreServicesClick = () => {
    navigate({ hash: "#services" });
  };
  const handleSliderNavigateClick = async (slider) => {
    setIsActiveSliderVisible(false);
    await Promise$1.delay(300);
    setActiveSlider(slider);
    setIsActiveSliderVisible(true);
  };
  return /* @__PURE__ */ jsxs("section", { id: "home", className: `bg-no-repeat ${style$2.intro}`, children: [
    /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center gap-2 lg:gap-5 pt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "JX Logo", width: 43, height: 20 }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center gap-5 lg:gap-10", children: [
        /* @__PURE__ */ jsx("nav", { className: "text-[17px] font-[500] hidden md:block", children: /* @__PURE__ */ jsx("ul", { className: "flex space-x-11", children: menuItems }) }),
        /* @__PURE__ */ jsx(Animate, { in: isMobileMenuActive, children: /* @__PURE__ */ jsx(Fragment, { children: isMobileMenuActive && /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 h-screen w-screen p-5 bg-[#001C39] z-10 flex items-center justify-center gap-10", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "block mt-[17px]", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "JX Logo", width: 43, height: 20 }) }),
          /* @__PURE__ */ jsx("nav", { className: "text-[17px] font-[500] mt-6", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col leading-10", children: menuItems }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(RiMenuFill, { className: "md:hidden", onClick: handleMenuIconClick }),
        /* @__PURE__ */ jsx(Button, { color: "blue", size: "small", onClick: handleGetQuoteClick, children: "Get a Free Quote" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-12 mt-[130px] items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Animate, { in: isActiveSliderVisible, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[40px] 2xl:text-[54px] font-[900] mb-[15px] 2xl:mb-[5px] leading-tight", children: activeSlider.title.map((part, index) => {
            return /* @__PURE__ */ jsx(
              "span",
              {
                className: index == 1 ? style$2.highlighter : "",
                children: part
              },
              part
            );
          }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-[25px] 2xl:text-[29px] mb-[29px] font-[700]", children: activeSlider.subtitle }),
          /* @__PURE__ */ jsx("p", { className: "mb-[51px]", children: activeSlider.description }),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "purple",
              size: "large",
              onClick: handleExploreServicesClick,
              children: "Explore Our Services"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          Navigate,
          {
            items: sliders,
            active: activeSlider,
            onNavigate: handleSliderNavigateClick
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: homeImage, alt: "AI head", width: 445, height: 506 }) })
    ] })
  ] });
}
const partner1 = "/assets/partner-1-DipM-Gys.png";
const partner2 = "/assets/partner-2-4UV56_n8.png";
const partner3 = "/assets/partner-3-BZYp-Cvk.png";
const partner4 = "/assets/partner-4-Cua62_zc.png";
const partner5 = "/assets/partner-5-CDUJOGB7.png";
const batches = [
  {
    id: 0,
    partners: [
      {
        id: 0,
        image: partner1,
        width: 157,
        height: 39
      },
      {
        id: 1,
        image: partner2,
        width: 197,
        height: 22
      },
      {
        id: 2,
        image: partner3,
        width: 85,
        height: 51
      },
      {
        id: 3,
        image: partner4,
        width: 238,
        height: 38
      },
      {
        id: 4,
        image: partner5,
        width: 158,
        height: 21
      }
    ]
  },
  {
    id: 2,
    partners: [
      {
        id: 5,
        image: partner4,
        width: 238,
        height: 38
      },
      {
        id: 9,
        image: partner5,
        width: 158,
        height: 21
      },
      {
        id: 8,
        image: partner1,
        width: 157,
        height: 39
      },
      {
        id: 7,
        image: partner3,
        width: 85,
        height: 51
      },
      {
        id: 6,
        image: partner2,
        width: 197,
        height: 22
      }
    ]
  }
];
function Partners() {
  const [activeBatch, setActiveBatch] = useState(batches[0]);
  const [isActiveVisible, setIsActiveVisible] = useState(true);
  const handleNavigate = async (batch) => {
    if (activeBatch.id === batch.id)
      return;
    setIsActiveVisible(false);
    await Promise$1.delay(300);
    setActiveBatch(batch);
    setIsActiveVisible(true);
  };
  return /* @__PURE__ */ jsxs("section", { id: "partners", className: "pt-[130px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mx-auto lg:w-4/6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-[1px] font-[900] text-[45px]", children: "Our Partners" }),
      /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700]", children: "Our esteemed partners that form the backbone of our collaborative network." }),
      /* @__PURE__ */ jsx("p", { className: "mt-[25px] mb-[90px] text-[#80BFFF]", children: "The esteemed organizations and institutions that fuel our collaborative network, enriching our capabilities and expanding our reach. Through strategic alliances and shared expertise, we forge mutually beneficial relationships to drive innovation and deliver exceptional results for our clients." })
    ] }),
    /* @__PURE__ */ jsx(Animate, { in: isActiveVisible, children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[30px] lg:flex-row items-center justify-between", children: activeBatch.partners.map((partner) => /* @__PURE__ */ jsx(
      "img",
      {
        src: partner.image,
        width: partner.width,
        height: partner.height,
        alt: "Partner",
        className: "scale-75 xl:scale-100"
      },
      partner.image
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
      Navigate,
      {
        items: batches,
        active: activeBatch,
        onNavigate: handleNavigate
      }
    ) })
  ] });
}
const content = "_content_eu27n_1";
const contentLeft = "_contentLeft_eu27n_14";
const contentRight = "_contentRight_eu27n_18";
const style$1 = {
  content,
  contentLeft,
  contentRight
};
function Service(props) {
  const order = {
    first: props.reverse ? "lg:order-2" : "lg:order-1",
    second: props.reverse ? "lg:order-1" : "lg:order-2"
  };
  const bgOrder = props.reverse ? style$1.contentRight : style$1.contentLeft;
  return /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: `relative mb-[-25px] lg:mb-0 ${order.first}`, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: `px-[50px] pt-[43px] pb-[45px] lg:pb-[18px] rounded-[25px] ${style$1.content} ${bgOrder}`,
        children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700] mb-[25px]", children: props.title }),
          props.content.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "mb-[25px]", children: paragraph }, paragraph))
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative z-10 w-11/12 mx-auto lg:w-full ${order.second}`,
        children: /* @__PURE__ */ jsx("img", { className: "rounded-[25px]", src: props.image, alt: props.title })
      }
    )
  ] });
}
const service1Image = "/assets/service-1-C5UthkJ9.jpeg";
const service2Image = "/assets/service-2-DIelBeEU.jpeg";
const service3Image = "/assets/service-3-BIaQjo8v.jpeg";
const service4Image = "/assets/service-4-BFIewv_3.jpeg";
function Process(props) {
  const styles2 = {
    wrapper: {
      left: "rounded-[25px] lg:rounded-[0] lg:rounded-l-[25px]",
      center: "rounded-[25px] lg:rounded-[0]",
      right: "rounded-[25px] lg:rounded-[0] lg:rounded-r-[25px]"
    },
    step: {
      left: "rounded-[20px] rounded-br-[0]",
      center: "rounded-[20px]",
      right: "rounded-[20px] rounded-bl-[0]"
    }
  };
  const Line = (lineProps) => {
    const styles22 = {
      left: {
        left: "invisible",
        center: "invisible lg:visible",
        right: "invisible lg:visible"
      },
      right: {
        left: "invisible lg:visible",
        center: "invisible lg:visible",
        right: "invisible"
      }
    };
    const style2 = styles22[lineProps.position][props.position];
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-[calc((100%-65px)/2)] h-[4px] bg-[#1C86FF] ${style2}`
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `text-center py-[45px] bg-[rgb(222_148_255_/_12%)] ${styles2.wrapper[props.position]}`,
      children: [
        /* @__PURE__ */ jsx("h4", { className: "uppercase font-[600] mb-[19px]", children: "Step" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(Line, { position: "left" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-[65px] h-[65px] bg-[#1C86FF] flex justify-center items-center ${styles2.step[props.position]}`,
              children: /* @__PURE__ */ jsx("div", { className: "text-[19px] leading-none", children: `0${props.step}` })
            }
          ),
          /* @__PURE__ */ jsx(Line, { position: "right" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-[30px]", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700] mt-[42px] mb-[18px]", children: props.title }),
          /* @__PURE__ */ jsx("p", { className: "text-[#80BFFF] mb-[31px]", children: props.subtitle }),
          /* @__PURE__ */ jsx("p", { children: props.content })
        ] })
      ]
    }
  );
}
const services = [
  {
    title: "GPT Integration",
    image: service1Image,
    reverse: false,
    content: [
      "Our GPT Integration Services specialize in seamlessly embedding GPT models into your existing infrastructure, revolutionizing your applications with advanced natural language processing capabilities.",
      "Whether you are looking to automate customer support, enhance content generation, or improve search functionality, our team will tailor the integration to your specific needs, ensuring optimal performance and user engagement. With our expertise, you can harness the power of GPT to elevate your digital presence and drive innovation in your organization."
    ]
  },
  {
    title: "AI Consulting",
    image: service2Image,
    reverse: true,
    content: [
      "Our AI Consulting services provide specialized guidance and strategic foresight to assist companies in navigating the intricacies of artificial intelligence. From pinpointing opportunities for AI integration to crafting holistic AI strategies, our team works hand in hand with clients to unleash the complete potential of AI within their organization.",
      "Leveraging our extensive domain expertise and technical proficiency, we enable businesses to make well-informed choices and achieve concrete outcomes through innovative AI initiatives."
    ]
  },
  {
    title: "Model Development and Training",
    image: service3Image,
    reverse: false,
    content: [
      "Our Model Development and Training service is committed to creating bespoke AI models designed specifically for your distinct business requirements.",
      "Utilizing state-of-the-art methodologies and profound expertise, we guarantee that your AI models undergo rigorous training to achieve peak performance and precision in tackling intricate challenges Whether it&apos;s image recognition or predictive analytics, our team collaborates closely with you to devise AI solutions that foster innovation and unveil fresh prospects for your organization."
    ]
  },
  {
    title: "Bespoke AI Solutions",
    image: service4Image,
    reverse: true,
    content: [
      "Our Custom AI Solutions service is crafted to deliver personalized artificial intelligence solutions that tackle your precise business hurdles. We engage in close collaboration with your team to grasp your distinctive needs and craft bespoke AI solutions that resonate with your aims and aspirations.",
      "Whether you seek expertise in natural language processing, computer vision, or predictive analytics, our team merges technical prowess with inventive problem-solving to furnish cutting-edge AI solutions that yield tangible business outcomes."
    ]
  }
];
const processes = [
  {
    step: 1,
    title: "Discovery",
    subtitle: "Gain a clear understanding of your business needs and objectives.",
    content: "Collaborate with our experts to define your AI strategy and roadmap, ensuring alignment with your goals and industry best practices.",
    position: "left"
  },
  {
    step: 2,
    title: "Implementation",
    subtitle: "Receive tailored AI solutions designed to address your specific challenges.",
    content: "Our team of developers will bring your AI strategy to life, crafting custom solutions that leverage the latest technologies and methodologies.",
    position: "center"
  },
  {
    step: 3,
    title: "Support",
    subtitle: "Maximize value of your AI investments with ongoing optimization.",
    content: "We provide continuous monitoring, refinement, and support to ensure your AI solutions remain effective and aligned with your evolving needs.",
    position: "right"
  }
];
function Services() {
  return /* @__PURE__ */ jsxs("section", { id: "services", className: "pt-[130px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mx-auto lg:w-4/6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-[1px] font-[900] text-[45px]", children: "Our Services" }),
      /* @__PURE__ */ jsx("h3", { className: "text-[25px] font-[700]", children: "Explore our AI solutions tailored to your business needs." }),
      /* @__PURE__ */ jsx("p", { className: "mt-[25px] mb-[70px] text-[#80BFFF]", children: "Our commitment to providing cutting-edge AI solutions that drive innovation and efficiency in your business operations. From GPT expertise to bespoke AI development, we offer a comprehensive suite of services designed to meet your unique needs and propel your organisation into the future." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-y-[50px]", children: services.map((service) => /* @__PURE__ */ jsx(
      Service,
      {
        title: service.title,
        image: service.image,
        reverse: service.reverse,
        content: service.content
      },
      service.title
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mx-auto lg:w-4/6 mt-[95px]", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[29px] font-[900] mb-[24px]", children: "Our Step-by-Step Service Approach" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#80BFFF] mb-[70px]", children: "Experience a seamless journey towards AI integration with our step-by-step service approach, designed to empower and benefit our users every step of the way. From strategic planning to ongoing support, we are committed to guiding you through each stage of your AI transformation with clarity, expertise, and tangible results." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-[30px] lg:grid-cols-3 lg:gap-0", children: processes.map((process2) => /* @__PURE__ */ jsx(
      Process,
      {
        step: process2.step,
        title: process2.title,
        subtitle: process2.subtitle,
        content: process2.content,
        position: process2.position
      },
      process2.step
    )) })
  ] });
}
const landing = "_landing_1xgug_1";
const style = {
  landing
};
function Landing() {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute left-0 right-0 z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-5", children: [
        /* @__PURE__ */ jsx(Home, {}),
        /* @__PURE__ */ jsx(About, {}),
        /* @__PURE__ */ jsx(Services, {}),
        /* @__PURE__ */ jsx(Partners, {}),
        /* @__PURE__ */ jsx(Contact, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(Alert, {})
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `bg-[#001C39] fixed w-screen h-screen left-0 right-0 z-0 ${style.landing}`
      }
    )
  ] });
}
const meta = () => {
  return [
    { title: "JX - Unlocking the Power of AI" },
    {
      name: "description",
      content: "Discover JX, your premier destination for GPT expertise and bespoke AI solutions. We empower businesses to harness the power of artificial intelligence."
    }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(Landing, {});
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B1Wo0AXZ.js", "imports": ["/assets/components-CaO5HL_p.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D7NEwLIL.js", "imports": ["/assets/components-CaO5HL_p.js"], "css": [] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BKOaPTX4.js", "imports": ["/assets/components-CaO5HL_p.js"], "css": ["/assets/_index-D58VuAb_.css"] } }, "url": "/assets/manifest-f495c02f.js", "version": "f495c02f" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
