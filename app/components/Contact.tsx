import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import Button from "./Button/Button";
import Reach, { ReachData } from "./Reach";
import useContactStore from "~/stores/contactStore";
import axios, { AxiosError } from "axios";
import useAlertStore from "~/stores/alertStore";

const reaches: ReachData[] = [
  {
    icon: "email",
    title: "Email",
    value: "info@example.com",
    url: "mailto:info@example.com",
  },
  {
    icon: "phone",
    title: "Phone",
    value: "+1 (123) 456-7890",
    url: "tel:+11234567890",
  },
  {
    icon: "address",
    title: "Address",
    value: "213 Main Street, Reno, Nevada",
    url: "https://maps.app.goo.gl/Vaf9xf9UHR3CYZo6A",
  },
];

export default function Contact() {
  const isRequestingQuote = useContactStore((state) => state.isRequestingQuote);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const setAlert = useAlertStore((state) => state.setMessage);
  const handleInputChange = (name: string, value: string) => {
    switch (name) {
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
    try {
      const data = {
        name,
        email,
        subject,
        message,
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
        return setAlert(error.response?.data.message);
      }
      setAlert("Unable to send your message");
    }
  };
  useEffect(() => {
    if (!isRequestingQuote || !nameRef.current) return;
    nameRef.current.focus();
    setSubject("Get a free quote");
  }, [isRequestingQuote]);
  return (
    <section id="contact" className="pt-[130px] pb-[120px]">
      <div className="grid lg:grid-cols-2 gap-[50px] items-center">
        <div className="bg-[rgba(222_148_255_/_12%)] rounded-[25px] px-[55px] py-[50px] order-2 lg:order-1">
          <h3 className="font-[700] text-[25px] mb-[18px]">
            Get in Touch with Us
          </h3>
          <p className="text-[#80BFFF] mb-[32px]">
            Send us a message and let&apos;s start collaborating on your next AI
            project!
          </p>
          <div className="flex flex-col gap-5">
            <Input
              name="name"
              value={name}
              placeholder="Your full name"
              ref={nameRef}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              value={email}
              placeholder="Email address"
              onChange={handleInputChange}
            />
            <Select
              name="subject"
              value={subject}
              placeholder="Choose subject"
              options={["General enquiry", "Get a free quote"]}
              onChange={handleInputChange}
            />
            <Textarea
              name="message"
              value={message}
              placeholder="Write your message here"
              onChange={handleInputChange}
            />
            <Button
              color="blue"
              size="xlarge"
              onClick={handleSubmit}
              className="mt-[18px]"
            >
              Send Message
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="mb-[1px] font-[900] text-[45px]">Contact Us</h2>
          <h3 className="text-[25px] font-[700]">
            Start your journey towards AI-driven success.
          </h3>
          <p className="mt-[25px] mb-[65px] text-[#80BFFF]">
            Reach out to us directly for personalized assistance, expert advice,
            and inquiries about our AI solutions. Our dedicated team is here to
            address your questions and support your business needs every step of
            the way.
          </p>
          <div className="flex flex-col gap-[20px]">
            {reaches.map((reach) => (
              <Reach
                key={reach.title}
                icon={reach.icon}
                title={reach.title}
                value={reach.value}
                url={reach.url}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
