import type { MetaFunction } from "@remix-run/node";
import Landing from "~/components/Landing/Landing";

export const meta: MetaFunction = () => {
  return [
    { title: "JX - Unlocking the Power of AI" },
    {
      name: "description",
      content:
        "Discover JX, your premier destination for GPT expertise and bespoke AI solutions. We empower businesses to harness the power of artificial intelligence.",
    },
  ];
};

export default function Index() {
  return <Landing />;
}
