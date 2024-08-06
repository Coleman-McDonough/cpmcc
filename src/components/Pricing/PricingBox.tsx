import Image from "next/image";

const PricingBox = (props: {
  price: string;
  duration: string;
  packageName: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const { price, duration, packageName, subtitle, children } = props;

  return (
    <div className="w-full">
      <div className="relative z-10 rounded-sm bg-gray-dark/50 px-8 py-10 shadow-three hover:shadow-one dark:bg-gray-dark dark:shadow-two dark:hover:shadow-gray-dark">
        {/* Insert image using next/image */}
        <Image
          src={`/images/pricing/${price}.png`}
          alt={`${subtitle}`}
          width={500}
          height={300}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-[32px] font-bold text-black dark:text-white">
            <span className="time text-lg font-medium text-white">
              {packageName}
            </span>
          </h3>
        </div>
        <p className="mb-4 text-base text-white">{subtitle}</p>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
