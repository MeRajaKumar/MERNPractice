"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get reCAPTCHA token
    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          data.message ||
            "Message sent successfully! I'll get back to you soon.",
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        "Something went wrong. Please try again or contact me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-black px-4 py-16 text-white md:px-8 lg:px-10"
    >
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--toast-bg, #333)",
            color: "var(--toast-color, #fff)",
            border: "1px solid var(--toast-border, #555)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="font-head my-4 text-4xl font-bold text-white md:my-8 md:text-7xl lg:my-10 lg:text-9xl">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:gap-12 xl:grid-cols-2 xl:gap-16">
          {/* Left: Contact Form */}
          <div className="order-2 xl:order-1">
            <div className="sticky top-8 h-fit rounded-xl border border-gray-700 bg-zinc-900 p-6 shadow-md md:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="name"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 transition-all focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-sm font-semibold"
                      htmlFor="email"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 transition-all focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 transition-all focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    htmlFor="message"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    required
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-vertical w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 transition-all focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us a bit about your project or inquiry"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    theme="dark" // Change to "light" if you prefer
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send message"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-4 text-lg font-bold text-black transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Image + Info */}
          <div className="order-1 space-y-6 md:space-y-8 xl:order-2">
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-gray-700 shadow-lg md:h-72 lg:h-80 xl:h-96">
              <Image
                src="/setup.webp"
                alt="Contact"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                className="rounded-xl object-cover"
              />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-4 transition-shadow duration-300 hover:shadow-md md:gap-4 md:p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 shadow-sm md:h-12 md:w-12">
                  <FaEnvelope className="text-sm text-white md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm font-semibold md:text-base">
                    Email Me
                  </p>
                  <p className="text-sm break-all text-gray-300">
                    swayamcoder@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-4 transition-shadow duration-300 hover:shadow-md md:gap-4 md:p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 shadow-sm md:h-12 md:w-12">
                  <FaPhone className="text-sm text-white md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm font-semibold md:text-base">
                    Call Me
                  </p>
                  <p className="text-sm text-gray-300">+91 63713 52331</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-gray-700 p-4 transition-shadow duration-300 hover:shadow-md md:gap-4 md:p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 shadow-sm md:h-12 md:w-12">
                  <FaClock className="text-sm text-white md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm font-semibold md:text-base">
                    Response Time
                  </p>
                  <p className="text-sm text-gray-300">
                    Fast replies are my thing, usually within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
