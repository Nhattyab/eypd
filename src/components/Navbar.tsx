import React, { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import logoImg from "../assets/images/logo.png";

interface NavbarProps {
  onDonateClick: () => void;
  onNavigate: (sectionId: string) => void;
  onJoinClick: () => void;
  currentView: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin";
  onViewChange: (view: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin") => void;
}

export default function Navbar({ onDonateClick, onNavigate, onJoinClick, currentView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About EYPD", path: "/about" },
    { id: "projects", label: "Our Projects", path: "/projects" },
    { id: "blog", label: "News & Stories", path: "/blog" },
    { id: "contact", label: "Contact Us", path: "/contact" }
  ];

  // Sync activeTab when currentView changes
  useEffect(() => {
    if (currentView === "about") {
      setActiveTab("about");
    } else if (currentView === "projects" || currentView === "project-details") {
      setActiveTab("projects");
    } else if (currentView === "blog" || currentView === "blog-details") {
      setActiveTab("blog");
    } else if (currentView === "contact") {
      setActiveTab("contact");
    } else if (currentView === "admin") {
      setActiveTab("admin");
    } else if (currentView === "home" && (activeTab === "about" || activeTab === "projects" || activeTab === "blog" || activeTab === "contact" || activeTab === "admin")) {
      setActiveTab("home");
    }
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveTab(sectionId);
    setIsOpen(false);
    
    if (sectionId === "about") {
      onViewChange("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "projects") {
      onViewChange("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "blog") {
      onViewChange("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "contact") {
      onViewChange("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "admin") {
      onViewChange("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onViewChange("home");
      // Give React a tiny frame to mount the home elements, then perform scroll
      setTimeout(() => {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          onNavigate(sectionId);
        }
      }, 80);
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-primary z-50 origin-[0%]"
        style={{ scaleX }}
        id="scroll-progress-bar"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white text-secondary lg:bg-secondary/95 lg:backdrop-blur-md lg:text-white shadow-md py-3"
            : "bg-transparent py-4 lg:py-5 text-white"
        }`}
        id="global-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick("home")}
              id="header-logo"
            >
              <div className="w-20 h-10 overflow-hidden bg-transparent flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src={logoImg}
                  alt="Eypd Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`relative font-display font-medium text-sm transition-colors py-1 ${
                    activeTab === item.id
                      ? "text-primary"
                      :isScrolled
                      ? "text-secondary/80 hover:text-secondary"
                      : "text-white/80 hover:text-white"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-5" id="desktop-actions">
              {/* Action Button */}
              <button
                onClick={onDonateClick}
                className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
                id="join-with-us-btn"
              >
                <span>Donate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Actions Container */}
            <div className="flex lg:hidden items-center gap-2" id="mobile-nav-actions">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-full transition-colors ${
                  isScrolled ? "text-secondary hover:bg-black/5" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
                id="mobile-hamburger-btn"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                id="mobile-menu-backdrop"
              />

              {/* Mobile Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-0 w-full h-full bg-secondary z-50 p-6 flex flex-col lg:hidden"
                id="mobile-drawer"
              >
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-display font-bold text-lg text-white">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full text-white/80"
                    id="mobile-drawer-close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links inside Drawer */}
                <nav className="flex flex-col gap-4 flex-1" id="mobile-drawer-nav">
                  {menuItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.path}
                      onClick={(e) => handleNavClick(item.id, e)}
                      className={`text-left py-2 px-3 font-display font-medium text-base rounded-lg transition-colors block ${
                        activeTab === item.id
                          ? "bg-primary text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                      id={`mobile-nav-item-${item.id}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Bottom Join CTA in Drawer */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onDonateClick();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-display font-semibold py-3 rounded-full shadow-lg"
                    id="mobile-drawer-join-btn"
                  >
                    <span>Donate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}