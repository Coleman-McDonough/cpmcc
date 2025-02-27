import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Slideshow from "@/components/Slideshow";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import VisitorTracker from "@/components/VisitorTracker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "C.P. McDonough Construction Corp",
  description:
    "C.P. McDonough Construction Corp is a leader in the construction industry. We provide the most efficient and professional services in New England. We are experts in general contracting, materials, and logistics.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <VisitorTracker />
      <ScrollUp />
      <Hero />
      <Pricing />
      <AboutSectionTwo />
      <Brands />
      <Slideshow />
      <Contact />
      {/**
      <Features />
      <Video />
      <AboutSectionOne />
      <Testimonials />
      <Blog />
       */}
    </>
  );
}
