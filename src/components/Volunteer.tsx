import React, { useState } from "react";
import { VolunteerFaq } from "../types";
import { Users, ChevronDown, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VolunteerProps {
  faqs: VolunteerFaq[];
  onVolunteerSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
}

export default function Volunteer({ faqs, onVolunteerSubmit }: VolunteerProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>("faq-1");
  const [formOpen, setFormOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleToggle = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onVolunteerSubmit({ name, email, phone, message });
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFormOpen(false);
  };

  return (
    <section className="py-24 bg-surface-main relative" id="volunteer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Media Column - Dual Curved Frame */}
          <div className="lg:col-span-5 relative flex justify-center" id="volunteer-media-left">
            {/* Outer dotted circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-primary/25 rounded-[30%] pointer-events-none" />

            {/* Premium Photo Grid in Curved Frame */}
            <div className="relative z-10 w-full max-w-sm aspect-[4/5] rounded-[50px] overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800"
                alt="Happy NGO Volunteers"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
            </div>

            {/* Float badge inside section */}
            <div className="absolute -right-6 bottom-10 bg-primary text-white py-3.5 px-6 rounded-2xl shadow-xl z-20 flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-display font-bold text-xs uppercase tracking-wider">Join 120+ Active Teams</span>
            </div>
          </div>

          {/* Right Content Column with Interactive Accordion */}
          <div className="lg:col-span-7 space-y-6" id="volunteer-content-right">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-accent/15 text-primary border border-primary/20 text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5" />
                <span>Join Our Journey</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary leading-tight" id="volunteer-main-headline">
                Why We Need You to Become a Dedicated Volunteer
              </h2>
              <p className="text-sm text-text-muted max-w-xl font-sans" id="volunteer-intro">
                Our global programs depend on passionate changemakers. Together, we provide vital on-the-ground project support, nutritional feeding, and community building programs.
              </p>
            </div>

            {/* Accordion Component */}
            <div className="space-y-3 pt-2" id="volunteer-accordion-group">
              {faqs.map((faq) => {
                const isOpen = activeFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-border-main overflow-hidden transition-all duration-300"
                    id={`faq-item-${faq.id}`}
                  >
                    <button
                      onClick={() => handleToggle(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-secondary hover:text-primary transition-colors cursor-pointer"
                      id={`faq-trigger-${faq.id}`}
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                        {faq.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-muted border-t border-border-main leading-relaxed font-sans">
                            {faq.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Action Group: Join Now and Register Form toggle */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4" id="volunteer-action-buttons">
              <button
                onClick={() => setFormOpen(!formOpen)}
                className="bg-primary hover:bg-primary/95 text-white font-display font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-200 text-center"
                id="volunteer-now-toggle-btn"
              >
                Apply as Volunteer Now
              </button>
            </div>

            {/* Collapsible Volunteer Registration Form */}
            <AnimatePresence>
              {formOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-border-main shadow-xl space-y-4"
                  id="volunteer-signup-form-container"
                >
                  <h3 className="font-display font-extrabold text-lg text-secondary border-b border-border-main pb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Volunteer Application
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-display font-bold text-secondary uppercase block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs sm:text-sm text-secondary focus:outline-none focus:border-primary focus:bg-white"
                          id="vol-name-input"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-display font-bold text-secondary uppercase block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="johndoe@email.com"
                          className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs sm:text-sm text-secondary focus:outline-none focus:border-primary focus:bg-white"
                          id="vol-email-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-display font-bold text-secondary uppercase block">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 234 567 890"
                        className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs sm:text-sm text-secondary focus:outline-none focus:border-primary focus:bg-white"
                        id="vol-phone-input"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-display font-bold text-secondary uppercase block">Your Message & Availability</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about yourself and when you can volunteer..."
                        className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs sm:text-sm text-secondary focus:outline-none focus:border-primary focus:bg-white"
                        id="vol-msg-input"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-display font-bold text-sm py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-md"
                      id="vol-submit-btn"
                    >
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
