"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
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
            packageName="Building"
            price="concrete"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="We put up buildings start to finish, handling every aspect of the construction process."
          >
            <div className="dark:border-white dark:border-opacity-10 border-opacity-10">
              <Link href="/projects">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Learn More
                </button>
              </Link>
            </div>
          </PricingBox>
          <PricingBox
            packageName="Hauling"
            price="loam"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="We offer hauling services with a triaxle and a tractor trailer available for hire."
          >
            <div className="dark:border-white dark:border-opacity-10 border-opacity-10">
              <Link href="/coming-soon">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Learn More
                </button>
              </Link>
            </div>
          </PricingBox>
          <PricingBox
            packageName="Materials"
            price="river"
            duration={isMonthly ? "mo" : "yr"}
            subtitle="We sell landscape materials like loam, sand, and crushed concrete."
          >
            <div className="dark:border-white dark:border-opacity-10 border-opacity-10">
              <Link href="/materials">
                <button className="flex w-full items-center justify-center rounded-sm bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                  Learn More
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
