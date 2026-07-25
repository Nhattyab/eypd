import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Heart, Send } from "lucide-react";

// @ts-ignore
import refugeeChildPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";

interface ContactPageProps {
  onBackToHome: () => void;
  addToast: (type: "success" | "info" | "warning" | "error", title: string, message: string) => void;
}

export default function ContactPage({ onBackToHome, addToast }: ContactPageProps) {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast("warning", "Missing Fields", "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      addToast(
        "success",
        "Message Sent Successfully!",
        `Thank you ${name}, your message has been received and logged in our system.`
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      addToast("error", "Submission Failed", err.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen text-gray-800" id="contact-page-container">
      
      {/* 1. Header Hero Banner with breadcrumbs */}
      <section
        className="relative bg-[#0a1118] py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="contact-hero-banner"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={refugeeChildPortrait}
            alt="Contact Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Contact us
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-[#ff5e14] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">Contact us</span>
          </div>
        </div>
      </section>

      {/* 4. Write Us Form Section */}
      <section className="py-10 bg-white border-t border-gray-100" id="contact-form-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          {/* Subtitle Badge & Main Header */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-primary font-display font-black text-sm uppercase tracking-wider">
              <span>Contact us</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#0a1118] tracking-tight">
              Feel Free To Write Us Anytime
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left" id="contact-feedback-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-2xl px-6 py-4.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary placeholder-gray-400 font-sans shadow-xs transition-all"
                id="form-name-input"
              />
              {/* Email */}
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-2xl px-6 py-4.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary placeholder-gray-400 font-sans shadow-xs transition-all"
                id="form-email-input"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-2xl px-6 py-4.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary placeholder-gray-400 font-sans shadow-xs transition-all"
              id="form-subject-input"
            />

            {/* Message Textarea */}
            <textarea
              required
              rows={6}
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-2xl px-6 py-4.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary placeholder-gray-400 font-sans shadow-xs resize-none transition-all"
              id="form-message-input"
            ></textarea>

            {/* Submit Button Centered and Styled perfectly like the image */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-between gap-5 bg-[#0a1118] hover:bg-[#ff5e14] text-white font-display font-bold text-sm rounded-full py-4.5 px-8 transition-all duration-300 cursor-pointer shadow-lg group hover:shadow-[#ff5e14]/15"
                id="form-submit-btn"
              >
                <span>{isSubmitting ? "Sending..." : "Get in Touch"}</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#0a1118] flex items-center justify-center transition-all group-hover:scale-105">
                  <Send className="w-3 h-3 rotate-45 shrink-0" />
                </span>
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* 3. Google Map Section of Rangpur Zoo */}
      <section className="bg-white pb-20" id="contact-map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[450px] rounded-[32px] overflow-hidden shadow-lg border border-gray-100 relative"
            id="map-wrapper"
          >
            <iframe
              title="Rangpur Zoo Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.4116521509176!2d89.24522437618995!3d25.75691167735749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32debc6a98f4b%3A0x1da6c28f3cb2929e!2sRangpur%20Zoo!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
