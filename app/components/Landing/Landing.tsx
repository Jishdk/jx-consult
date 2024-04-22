import About from "../About/About";
import Alert from "../Aert";
import Contact from "../Contact";
import Footer from "../Footer";
import Home from "../Home/Home";
import Partners from "../Partners";
import Services from "../Services";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <main>
      <div className="absolute left-0 right-0 z-10">
        <div className="container mx-auto px-5">
          <Home />
          <About />
          <Services />
          <Partners />
          <Contact />
        </div>
        <Footer />
        <Alert />
      </div>
      <div
        className={`bg-[#001C39] fixed w-screen h-screen left-0 right-0 z-0 ${style.landing}`}
      ></div>
    </main>
  );
}
