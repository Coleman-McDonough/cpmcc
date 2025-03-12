"use client";
import SectionTitle from "../Common/SectionTitle";
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";
import HCaptcha from "react-hcaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // State for form submission status
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Check if hCaptcha is completed

    if (!captchaToken) {
      setStatus("");

      setErrorMessage("Please complete the CAPTCHA.");

      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus(""); // Clear status
        setSuccessMessage(
          "Your message has been sent successfully! We'll get back to you ASAP.",
        );
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form fields
      } else {
        setStatus(""); // Clear status
        setErrorMessage(
          result.details || "An error occurred while sending the email.",
        ); // Set error message if available
      }
    } catch (error) {
      setStatus(""); // Clear status
      setErrorMessage(error.message || "An unknown error occurred.");
    }
  };
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title="Contact" paragraph="" center width="665px" />
        {/*
        <div className="mb-5 border border-black md:mx-32">
          <iframe
            className="h-64 w-full lg:h-96"
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.434875859596!2d-71.06141208779094!3d42.84254990436194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2fdad1d3accb7%3A0x94fc08e12926628e!2s8%20Puzzle%20Ln%2C%20Newton%2C%20NH%2003858!5e0!3m2!1sen!2sus!4v1722975706977!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>
         */}
        <div className="flex flex-wrap lg:mx-24">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 shadow-three sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <div className="mb-7">
                <h2 className="dark:text-white mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                  Inquiries
                </h2>
                <p className="dark:text-white mb-3 block text-lg font-medium text-dark">
                  For any inquiries on available space for commercial and light
                  industrial, questions or commendations, please call:
                  978-375-7001 or fill out the following form. We have new
                  construction in which would be an excellent fit for both small
                  and sizable square footage needs.
                </p>
              </div>
              <h2 className="dark:text-white mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="dark:text-white mb-3 block text-sm font-medium text-dark"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="border-stroke dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="dark:text-white mb-3 block text-sm font-medium text-dark"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border-stroke dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-8 w-full px-4">
                    <label
                      htmlFor="phone"
                      className="dark:text-white mb-3 block text-sm font-medium text-dark"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="border-stroke dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                    />
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="dark:text-white mb-3 block text-sm font-medium text-dark"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="How can we help?"
                        className="border-stroke dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  {/* hCaptcha Field */}
                  <div className="mt-6 flex justify-center">
                    <HCaptcha
                      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                      onVerify={(token) => setCaptchaToken(token)}
                    />
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90"
                      disabled={status === "Sending..."} // Disable button while sending
                    >
                      {status === "Sending..." ? "Sending..." : "Submit"}{" "}
                      {/* Change button text based on status */}
                    </button>
                  </div>
                </div>
              </form>

              {status && <p className="mt-4 text-sm font-medium">{status}</p>}
              {successMessage && (
                <p className="mt-4 text-sm font-medium text-green-600">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 shadow-three sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <div className="mb-7">
                <h2 className="dark:text-white mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                  Head Office
                </h2>
                <p className=" dark:text-white block text-lg font-medium text-dark">
                  8 Puzzle Lane
                </p>
                <p className="dark:text-white mb-3 block text-lg font-medium text-dark">
                  Newton, NH 03858
                </p>
                <p className=" dark:text-white block text-lg font-medium text-dark">
                  {/* link to email */}
                  <a
                    href="mailto:colemanpmcdonough@gmail.com"
                    className="hover:underline"
                  >
                    colemanpmcdonough@gmail.com
                  </a>
                </p>
                <p className=" dark:text-white block text-lg font-medium text-dark">
                  {`Phone: `}
                  <a href="tel:978-375-7001" className="hover:underline">
                    978-375-7001
                  </a>
                </p>
                <p className="dark:text-white mb-3 block text-lg font-medium text-dark">
                  {`Office: `}
                  <a href="tel:978-375-7001" className="hover:underline">
                    603-399-5029
                  </a>
                </p>
              </div>
              <h2 className="dark:text-white mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Employment
              </h2>
              <p className=" dark:text-white block text-lg font-medium text-dark">
                To apply for a job with C.P. McDonough Construction, please send
                a cover letter together with your C.V. to:
              </p>
              <p className="dark:text-white mb-3 block text-lg font-medium text-dark">
                <a
                  href="mailto:colemanpmcdonough@gmail.com"
                  className="hover:underline"
                >
                  colemanpmcdonough@gmail.com
                </a>
              </p>
              <p className=" dark:text-white block text-lg font-medium text-dark">
                {/* link to email */}
                <a
                  href="https://www.cpmcdonoughconstructioncorp.com"
                  className="hover:underline"
                >
                  www.cpmcdonoughconstructioncorp.com
                </a>
              </p>

              <div className="m-12 h-1 w-3/4 bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent"></div>
              <div className="md:flex">
                <h2 className="dark:text-white mb-3 text-2xl font-bold text-black sm:text-3xl md:mr-2 lg:text-2xl xl:text-3xl">
                  {`Get a quote: `}
                </h2>

                <a
                  href="tel:978-375-7001"
                  className="dark:text-white mb-3 text-2xl font-bold text-black hover:underline sm:text-3xl lg:text-2xl xl:text-3xl"
                >
                  978-375-7001
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
