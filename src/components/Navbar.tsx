import React, { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import logoImg from "../assets/images/logo.png";

interface SubMenuItem {
  id: string;
  label: string;
  targetView: "home" | "about" | "projects" | "blog" | "contact" | "admin" | "resources" | "policy-details";
  entityId?: string;
  sectionId?: string;
  filterCategory?: string;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  targetView: "home" | "about" | "projects" | "blog" | "contact" | "admin" | "resources" | "policy-details";
  subItems?: SubMenuItem[];
}

interface NavbarProps {
  onDonateClick: () => void;
  onNavigate: (sectionId: string) => void;
  onJoinClick: () => void;
  currentView: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "resources" | "policy-details" | "donate";
  onViewChange: (
    view: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "resources" | "policy-details" | "donate",
    entityId?: string
  ) => void;
}

export default function Navbar({ onDonateClick, onNavigate, onJoinClick, currentView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const menuItems: MenuItem[] = [
    { 
      id: "home", 
      label: "Home", 
      path: "/",
      targetView: "home" 
    },
    {
      id: "about",
      label: "About EYPD",
      path: "/about",
      targetView: "about",
      subItems: [
        { id: "overview", label: "Overview", targetView: "about" },
        { id: "our-projects", label: "Our Projects", targetView: "projects" },
        { id: "our-policy", label: "Our Policy", targetView: "about", sectionId: "policy" }
      ]
    },
    {
      id: "pillars",
      label: "Programme Pillars",
      path: "/projects",
      targetView: "projects",
      subItems: [
        { id: "peace-social", label: "Peace and Social Cohesion", targetView: "projects" },
        { id: "civic-engagement", label: "Civic Engagement", targetView: "projects" },
        { id: "humanitarian", label: "Humanitarian Response, Protection and Community Resilience", targetView: "projects" },
        { id: "economic-climate", label: "Economic Empowerment and Climate Resilience", targetView: "projects" },
        { id: "policy-advocacy", label: "Policy Advocacy and Influencing", targetView: "projects" }
      ]
    },
    {
      id: "blog",
      label: "News & Stories",
      path: "/blog",
      targetView: "blog",
      subItems: [
        { id: "news", label: "News", targetView: "blog", filterCategory: "News" },
        { id: "press-releases", label: "Press Releases", targetView: "blog", filterCategory: "Press Releases" },
        { id: "stories", label: "Stories", targetView: "blog", filterCategory: "Stories" },
        { id: "advocacy-messages", label: "Advocacy Messages", targetView: "blog", filterCategory: "Advocacy Messages" }
      ]
    },
    {
      id: "policy",
      label: "Policy",
      path: "/resources",
      targetView: "resources",
      subItems: [
        { id: "policy-briefs", label: "Policy Briefs", targetView: "resources" },
        { id: "policy-declarations", label: "Policy Declarations", targetView: "resources" }
      ]
    },
    { 
      id: "contact", 
      label: "Contact Us", 
      path: "/contact",
      targetView: "contact" 
    }
  ];

  // Sync activeTab when currentView changes
  useEffect(() => {
    if (currentView === "about") {
      setActiveTab("about");
    } else if (currentView === "projects" || currentView === "project-details") {
      setActiveTab("pillars");
    } else if (currentView === "blog" || currentView === "blog-details") {
      setActiveTab("blog");
    } else if (currentView === "resources") {
      setActiveTab("policy");
    } else if (currentView === "policy-details") {
      setActiveTab("policy");
    } else if (currentView === "contact") {
      setActiveTab("contact");
    } else if (currentView === "admin") {
      setActiveTab("admin");
    } else if (currentView === "donate") {
      setActiveTab("");
    } else if (currentView === "home") {
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

  const handleNavClick = (
    targetView: "home" | "about" | "projects" | "blog" | "contact" | "admin" | "resources" | "policy-details",
    e?: React.MouseEvent
  ) => {
    if (e) e.preventDefault();
    setHoveredMenu(null);
    setIsOpen(false);

    if (targetView === "about") {
      onViewChange("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetView === "projects") {
      onViewChange("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetView === "blog") {
      onViewChange("blog", "All");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetView === "resources") {
      onViewChange("resources");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetView === "contact") {
      onViewChange("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetView === "admin") {
      onViewChange("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onViewChange("home");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);
    }
  };

  const handleSubItemClick = (sub: SubMenuItem, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setHoveredMenu(null);
    setExpandedMobileMenu(null);
    setIsOpen(false);

    if (sub.targetView === "policy-details" && sub.entityId) {
      onViewChange("policy-details", sub.entityId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sub.targetView === "blog") {
      onViewChange("blog", sub.filterCategory || sub.label);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sub.sectionId) {
      onViewChange(sub.targetView);
      setTimeout(() => {
        onNavigate(sub.sectionId!);
      }, 120);
    } else {
      onViewChange(sub.targetView);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              <div className="w-20 h-10 overflow-hidden bg-transparent  flex items-center justify-center  group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src={logoImg}
                  alt="Charitics Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Desktop Navigation with Hover Dropdowns */}
            <nav className="hidden lg:flex items-center gap-7" id="desktop-nav">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => setHoveredMenu(item.id)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(item.targetView, e)}
                    className={`flex items-center gap-1.5 font-display font-medium text-sm transition-colors py-1 ${
                      activeTab === item.id
                        ? "text-primary"
                        : isScrolled
                        ? "text-secondary"
                        : "text-white/90 hover:text-white"
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {item.subItems && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          hoveredMenu === item.id ? "rotate-180 text-primary" :isScrolled ? "text-secondary" : "text-white/60"
                        }`}
                      />
                    )}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>

                  {/* Dropdown Menu*/}
                  {item.subItems && (
                    <AnimatePresence>
                      {hoveredMenu === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 pt-1.5 z-50 min-w-[170px] max-w-[280px]"
                          id={`dropdown-menu-${item.id}`}
                        >
                          <div className="bg-transparent space-y-1 filter drop-shadow-lg">
                            {item.subItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={(e) => handleSubItemClick(sub, e)}
                                className="w-full text-left px-2.5 py-1.5 rounded bg-[#5CB815] hover:bg-[#4ea211] text-white text-xs sm:text-[13px] font-medium tracking-tight transition-all duration-150 hover:translate-x-0.5 block shadow-sm"
                                id={`sub-item-${sub.id}`}
                              >
                                <span className="leading-tight">{sub.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-5" id="desktop-actions">

              {/* Action Button */}
              <button
                onClick={onDonateClick}
                className="flex items-center gap-1.5 bg-[#5CB815] hover:bg-[#4ea211] text-white font-display font-black text-sm px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                id="header-donate-btn"
              >
                <span>Donate</span>
                <span className="font-sans">➔</span>
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

        {/* Mobile Menu Drawer */}
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
                className="fixed inset-0 w-full h-full bg-secondary z-50 p-6 flex flex-col lg:hidden overflow-y-auto"
                id="mobile-drawer"
              >
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
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
                <nav className="flex flex-col gap-2 flex-1 my-2" id="mobile-drawer-nav">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => handleNavClick(item.targetView, e)}
                          className={`text-left py-2.5 px-3 font-display font-semibold text-base rounded-lg transition-colors flex-1 ${
                            activeTab === item.id
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "text-white/90 hover:bg-white/5 hover:text-white"
                          }`}
                          id={`mobile-nav-item-${item.id}`}
                        >
                          {item.label}
                        </button>
                        {item.subItems && (
                          <button
                            onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.id ? null : item.id)}
                            className="p-2 text-white/70 hover:text-white"
                            aria-label={`Toggle sub-menu for ${item.label}`}
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-200 ${
                                expandedMobileMenu === item.id ? "rotate-180 text-primary" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Accordion Sub-items */}
                      {item.subItems && expandedMobileMenu === item.id && (
                        <div className="pl-3 pr-1 py-1 space-y-1.5 my-1 border-l-2 border-primary/40">
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={(e) => handleSubItemClick(sub, e)}
                              className="w-full text-left px-2.5 py-1.5 rounded bg-[#5CB815] hover:bg-[#4ea211] text-white text-xs font-medium shadow-sm block"
                              id={`mobile-sub-item-${sub.id}`}
                            >
                              <span>{sub.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Bottom Donate CTA in Drawer */}
                <div className="pt-4 border-t border-white/10 mt-auto shrink-0">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onDonateClick();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#5CB815] hover:bg-[#4ea211] text-white font-display font-black py-3 rounded-full shadow-lg"
                    id="mobile-drawer-donate-btn"
                  >
                    <span>Donate Now</span>
                    <span className="font-sans">➔</span>
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