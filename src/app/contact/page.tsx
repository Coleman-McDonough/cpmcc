import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "C.P. McDonough Construction Corp",
  description:
    "C.P. McDonough Construction Corp is a leader in the construction industry. We provide the most efficient and professional services in New England. We are experts in general contracting, materials, and logistics.",
  // other metadata
};

export default function About() {
  return (
    <>
      <div className="mt-16">
        <ScrollUp />
        <Contact />
      </div>
    </>
  );
}
