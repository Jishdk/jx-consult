import logo from "~/images/logo-white.png";
import Button from "../Button/Button";
import { Link, useNavigate } from "@remix-run/react";
import { RiMenuFill } from "@remixicon/react";
import { useState } from "react";
import homeImage from "~/images/home.png";
import style from "./Home.module.css";
import Animate from "../Animate/Animate";
import Navigate from "../Navigate";
import Promise from "bluebird";
import useContactStore from "~/stores/contactStore";

interface Slider {
  id: number;
  title: string[];
  subtitle: string;
  description: string;
}

export default function Home() {
  const navigate = useNavigate();
  const setIsRequestingQuote = useContactStore(
    (state) => state.setIsRequestingQuote
  );
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const sliders: Slider[] = [
    {
      id: 0,
      title: ["Unlocking the ", "Power", " of AI"],
      subtitle: "Expertise in GPT Usage and Bespoke Solutions",
      description:
        "At JX, we specialize in harnessing the potential of cutting-edge AI technologies, including GPT, to empower businesses and drive innovation. Our team of experts offers tailored solutions and unparalleled expertise to help clients leverage AI effectively and achieve their goals.",
    },
    {
      id: 1,
      title: ["Gateway to AI", " Excellence"],
      subtitle: "Tailored AI solutions by industry leaders at JX",
      description:
        "Step into the realm of AI innovation with JX, where we offer unrivaled expertise in leveraging GPT capabilities and crafting bespoke solutions tailored to your unique needs. Elevate your business to new heights as we pave the future-proof way for AI excellence together.",
    },
    {
      id: 2,
      title: ["Unleash ", "Possibilities"],
      subtitle: "Experience GPT Mastery and Custom AI Solutions",
      description:
        "JX opens doors to a realm where artificial intelligence meets creativity and precision. Explore our suite of curated services designed to elevate your business, from harnessing the power of GPT to crafting bespoke AI solutions, tailored to bring your boldest ideas to life.",
    },
  ];
  const [activeSlider, setActiveSlider] = useState(sliders[0]);
  const [isActiveSliderVisible, setIsActiveSliderVisible] = useState(true);
  const handleMobileMenuClick = () => {
    setMobileMenuActive(false);
  };
  const menuItems = (
    <>
      <li>
        <Link to="#home" onClick={handleMobileMenuClick}>
          Home
        </Link>
      </li>
      <li>
        <Link to="#about" onClick={handleMobileMenuClick}>
          About
        </Link>
      </li>
      <li>
        <Link to="#services" onClick={handleMobileMenuClick}>
          Services
        </Link>
      </li>
      <li>
        <Link to="#partners" onClick={handleMobileMenuClick}>
          Partners
        </Link>
      </li>
      <li>
        <Link to="#contact" onClick={handleMobileMenuClick}>
          Contact
        </Link>
      </li>
    </>
  );
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
  const handleSliderNavigateClick = async (slider: Slider) => {
    setIsActiveSliderVisible(false);
    await Promise.delay(300);
    setActiveSlider(slider);
    setIsActiveSliderVisible(true);
  };
  return (
    <section id="home" className={`bg-no-repeat ${style.intro}`}>
      <header className="flex justify-between items-center gap-2 lg:gap-5 pt-6">
        <div className="">
          <Link to="/">
            <img src={logo} alt="JX Logo" width={43} height={20} />
          </Link>
        </div>
        <div className="flex justify-end items-center gap-5 lg:gap-10">
          <nav className="text-[17px] font-[500] hidden md:block">
            <ul className="flex space-x-11">{menuItems}</ul>
          </nav>
          <Animate in={isMobileMenuActive}>
            <>
              {isMobileMenuActive && (
                <div className="fixed top-0 left-0 h-screen w-screen p-5 bg-[#001C39] z-10 flex items-center justify-center gap-10">
                  <Link to="/" className="block mt-[17px]">
                    <img src={logo} alt="JX Logo" width={43} height={20} />
                  </Link>
                  <nav className="text-[17px] font-[500] mt-6">
                    <ul className="flex flex-col leading-10">{menuItems}</ul>
                  </nav>
                </div>
              )}
            </>
          </Animate>
          <RiMenuFill className="md:hidden" onClick={handleMenuIconClick} />
          <Button color="blue" size="small" onClick={handleGetQuoteClick}>
            Get a Free Quote
          </Button>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 gap-12 mt-[130px] items-center">
        <div>
          <Animate in={isActiveSliderVisible}>
            <div>
              <h1 className="text-[40px] 2xl:text-[54px] font-[900] mb-[15px] 2xl:mb-[5px] leading-tight">
                {activeSlider.title.map((part, index) => {
                  return (
                    <span
                      key={part}
                      className={index == 1 ? style.highlighter : ""}
                    >
                      {part}
                    </span>
                  );
                })}
              </h1>
              <h2 className="text-[25px] 2xl:text-[29px] mb-[29px] font-[700]">
                {activeSlider.subtitle}
              </h2>
              <p className="mb-[51px]">{activeSlider.description}</p>
              <Button
                color="purple"
                size="large"
                onClick={handleExploreServicesClick}
              >
                Explore Our Services
              </Button>
            </div>
          </Animate>
          <Navigate
            items={sliders}
            active={activeSlider}
            onNavigate={handleSliderNavigateClick}
          />
        </div>
        <div>
          <img src={homeImage} alt="AI head" width={445} height={506} />
        </div>
      </div>
    </section>
  );
}
