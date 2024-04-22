import { Link } from "@remix-run/react";
import logo from "~/images/logo-colored.png";
import Social, { SocialData } from "./Social";
import curveImage from "~/images/curve.svg";

const socials: SocialData[] = [
  {
    name: "fb",
    url: "#",
  },
  {
    name: "x",
    url: "#",
  },
  {
    name: "instagram",
    url: "#",
  },
  {
    name: "linkedin",
    url: "#",
  },
  {
    name: "youtube",
    url: "#",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <img src={curveImage} alt="Curve" className="w-full" />
      <footer className="pb-[80px] pt-[115px] bg-[rgba(222_148_255_/_12%)]">
        <div className="container mx-auto px-5">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-[30px] ">
            <div className="order-2 sm:order-1">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  width={98}
                  height={76}
                  className="mb-[35px]"
                />
              </Link>
              <p className="text-[17px] mt-[20px] mb-[33px]">
                JX is a leading provider of innovative AI solutions,
                specializing in GPT expertise and bespoke AI services tailored
                to meet the unique needs of businesses worldwide.
              </p>
              <p className="text-[17px]">
                &copy; {year} JX. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col sm:items-center mb-[25px] sm:mb-0 order-1 sm:order-2">
              <div>
                <h5 className="text-[20px] font-[600] mb-[15px]">
                  Quick Links
                </h5>
                <ul className="leading-[38px] text-[17px]">
                  <li>
                    <Link to="#home">Home</Link>
                  </li>
                  <li>
                    <Link to="#about">About</Link>
                  </li>
                  <li>
                    <Link to="#services">Services</Link>
                  </li>
                  <li>
                    <Link to="#partners">Partners</Link>
                  </li>
                  <li>
                    <Link to="#contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-3">
              <h5 className="text-[20px] font-[600] mb-[15px]">Quick Links</h5>
              <p className="text-[17px] text-[#80BFFF] mb-[27px]">
                Stay updated with our latest news and insights by following us
                on social media!
              </p>
              <div className="flex gap-[15px]">
                {socials.map((social) => (
                  <Social
                    key={social.name}
                    name={social.name}
                    url={social.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
