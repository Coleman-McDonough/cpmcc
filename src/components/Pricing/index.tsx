"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Link from "next/link";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section
      id="pricing"
      className="bg-gray-cpm relative z-10 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle title="Services" paragraph="" center width="665px" />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Our Vision"
            price="concrete"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="We provide expedient services to remove any unwanted concrete on both residential and commercial scales. Our state of the art machines provide cutting edge technology in which allows us to crush any form of concrete waste."
          >
            <div className="border-opacity-10 dark:border-white dark:border-opacity-10">
              <Link href="tel:978-375-7001">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Get a Quote!
                </button>
              </Link>
            </div>
          </PricingBox>
          <PricingBox
            packageName="Screened Loam"
            price="loam"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Our screened loam is sourced organically from the earth and run through our comprehensive machines to insure excellent quality. We offer the most competitive rates as our sourcing and screening is done all in house, our prices cant be beat."
          >
            <div className="border-opacity-10 dark:border-white dark:border-opacity-10">
              <Link href="tel:978-375-7001">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Get a Quote!
                </button>
              </Link>
            </div>
          </PricingBox>
          <PricingBox
            packageName="River Rock"
            price="river"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="When it comes to river rock, our materials are crushed to perfection and shaped accordingly. This material provides an affordable solution to any landscaping endeavor. Contact us to today to learn about the benefits of working with C.P. Mcdonough Construction!"
          >
            <div className="border-opacity-10 dark:border-white dark:border-opacity-10">
              <Link href="tel:978-375-7001">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Get a Quote!
                </button>
              </Link>
            </div>
          </PricingBox>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
