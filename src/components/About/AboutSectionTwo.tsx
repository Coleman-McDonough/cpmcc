import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section id="about" className="">
      <div className="container">
        <SectionTitle title="About" paragraph="" center width="665px" />
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about_cpmcd.png"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about_cpmcd.png"
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  About
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {`C.P. McDonough Construction is a leader in the construction industry. We provide the most efficient and professional services in New England. We are experts in general contracting, materials, and logistics. Our years of development experience on both commercial and residential scales allow us to customize beautifully crafted buildings, roadways and homes. We leverage our vast fleet of commercial equipment to provide the most competitive rates to ensure our clients are getting the best service in both transportation, materials, and construction. Our philosophy is that of excellence as we know the only way to achieve greatness is to ensure our client's experience the best services available in the industry. Reach out to us to today to find out what we have available for commercial and light industrial space!`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
