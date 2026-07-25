import React, { useState } from "react";
import { Heart, MapPin, Mail, Phone, Calendar, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";

// @ts-ignore
import img2 from "../assets/images/elder_man_blanket_1782474613376.jpg";
// @ts-ignore
import img4 from "../assets/images/child_eating_bowl_1782474654974.jpg";

import logoImg from "../assets/images/logo.png";

interface FooterProps {
  onNewsletterSubmit: (email: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNewsletterSubmit, onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    onNewsletterSubmit(newsletterEmail);
    setNewsletterEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] text-gray-300 font-sans mt-24" id="contact">
      
      {/* 1. Overlapping Ribbon Callout Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-primary rounded-[28px] py-6 px-6 sm:px-10 lg:px-12 shadow-2xl -translate-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-white">
            
            {/* Address Column */}
            <div className="flex items-center gap-4 justify-start md:border-r md:border-white/25 md:pr-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-[#478b1b] " />
              </div>
              <div>
                <span className="text-xs font-bold text-white/80 block uppercase tracking-wider">Address</span>
                <span className="font-display font-black text-sm sm:text-base leading-tight block mt-0.5">
                  Adissababa, Ethiopia
                </span>
              </div>
            </div>

            {/* Email Column */}
            <div className="flex items-center gap-4 justify-start md:border-r md:border-white/25 md:px-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <Mail className="w-6 h-6 text-[#478b1b]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white/80 block uppercase tracking-wider">Send Email</span>
                <a href="mailto:info@exmple.com" className="font-display font-black text-sm sm:text-base leading-tight block mt-0.5 hover:underline">
                  info@eypd.org
                </a>
              </div>
            </div>

            {/* Emergency Call Column */}
            <div className="flex items-center gap-4 justify-start md:pl-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <Phone className="w-6 h-6 text-[#478b1b]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white/80 block uppercase tracking-wider">Call Emergency</span>
                <a href="tel:+88012365499" className="font-display font-black text-sm sm:text-base leading-tight block mt-0.5 hover:underline">
                  +12 3456 789 00                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Structured Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4 relative z-10" id="footer-top-row">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => onNavigate("home")}
              id="header-logo"
            >
              <div className="w-40 h-15 overflow-hidden  flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src={logoImg}
                  alt="Eypd Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-sans pr-4">
              A youth-led civil society organization advancing peace, resilience, livelihoods, and inclusive development across Ethiopia since 2015.
            </p>

            {/* Social Links inside rounded dark boxes */}
            <div className="flex items-center gap-3.5" id="footer-social-links">
              <a href="https://www.facebook.com/profile.php?id=61551751547218&mibextid=wwXIfr&rdid=uvaFUC4jCzMhzLTP&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GmD1C5Qr6%2F%3Fmibextid%3DwwXIfr%26ref%3D1#" className="w-10 h-10 bg-white/[0.03] border border-white/5 hover:border-[#478b1b] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://t.me/EYDPA" className="w-10 h-10 bg-white/[0.03] border border-white/5 hover:border-[#478b1b] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/ethiopian-youth-for-peace-and-development/" className="w-10 h-10 bg-white/[0.03] border border-white/5 hover:border-[#478b1b] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@eypd2026?_r=1&_t=ZS-97fXG7wbm0l" className="w-10 h-10 bg-white/[0.03] border border-white/5 hover:border-[#478b1b] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links with Left double angles */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-display font-black text-lg text-white pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[3px] after:bg-[#478b1b]">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm font-sans font-medium" id="footer-links-list">
              {[
                { label: "About Us", target: "about" },
                { label: "Our Services", target: "services" },
                { label: "Our Blogs", target: "news" },
                { label: "Policies", target: "resources" },
                { label: "Contact Us", target: "contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#478b1b] transition-colors duration-200 cursor-pointer"
                  >
                    <span className="text-[#478b1b] text-base leading-none">»</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Recent Posts */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-black text-lg text-white pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[3px] after:bg-[#478b1b]">
              Recent Posts
            </h4>
            <div className="space-y-4" id="footer-posts-list">
              {[
                {
                  id: "recent-p-1",
                  title: "There are many vario ns of passages of",
                  date: "May 12, 2025",
                  image: img2,
                },
                {
                  id: "recent-p-2",
                  title: "There are many vario ns of passages of",
                  date: "May 12, 2025",
                  image: img4,
                },
              ].map((post) => (
                <div key={post.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{post.date}</span>
                    </div>
                    <h5 className="font-sans font-bold text-sm text-white group-hover:text-[#478b1b] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Us & Form */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-black text-lg text-white pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[3px] after:bg-[#478b1b]">
              Contact Us
            </h4>
            
            <div className="space-y-3 text-sm font-sans" id="footer-contact-details">
              <div className="flex items-center gap-2.5 text-gray-300 hover:text-[#478b1b] transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>info@eypd.org</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 hover:text-[#478b1b] transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>123-456-7890</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Row: Copyrights & Policy in Solid Orange */}
      <div className="bg-[#181f2a] py-6 text-xs sm:text-sm text-white font-display font-bold border-t border-gray-300" id="footer-bottom-row">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>© 2026 EYPD — All rights reserved.</p>

            <div className="flex items-center gap-6" id="footer-policy-links">
              Made By :<a href="#" className="hover:underline transition-all text-sm"> Wari Communications</a>
            </div>

            <div className="flex items-center gap-6" id="footer-policy-links">
              <a href="#" className="hover:underline transition-all">Terms & Conditions</a>
              <a href="#" className="hover:underline transition-all">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
