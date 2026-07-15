import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { campaignsData, eventsData, blogPostsData, volunteerFaqData } from "./data";
import { Campaign, Event, BlogPost } from "./types";

// Component imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Values from "./components/Values";
import Services from "./components/Services";
import Causes from "./components/Causes";
import DonationWidget from "./components/DonationWidget";
import StatsCounter from "./components/StatsCounter";
import EventSchedule from "./components/EventSchedule";
import Volunteer from "./components/Volunteer";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import LatestNews from "./components/LatestNews";
import Partners from "./components/Partners";
import Policies from "./components/Policies";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import BackToTop from "./components/BackToTop";
import CheckoutModal from "./components/CheckoutModal";
import AboutPage from "./components/AboutPage";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import BlogPage from "./components/BlogPage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import ContactPage from "./components/ContactPage";
import AdminPanel from "./components/AdminPanel";
import PolicyDetailsPage from "./components/PolicyDetailsPage";
import { policiesData, PolicyItem } from "./data/policiesData";
import { Project, initialProjects } from "./data/projectsData";
import { DetailedBlogPost, initialBlogs } from "./data/blogData";
import { ToastContainer, ToastMessage, ToastType } from "./components/Toast";
import { useMemo } from "react";

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [checkoutCampaign, setCheckoutCampaign] = useState<Campaign | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentView, setCurrentViewInternal] = useState<"home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "policy-details">(() => {
    const path = window.location.pathname;
    if (path === "/about") return "about";
    if (path === "/projects") return "projects";
    if (path === "/blog") return "blog";
    if (path === "/contact") return "contact";
    if (path === "/admin") return "admin";
    if (path === "/project-details") return "project-details";
    if (path === "/blog-details") return "blog-details";
    if (path === "/policy-details") return "policy-details";
    return "home";
  });

  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(() => {
    const path = window.location.pathname;
    if (path === "/policy-details") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        return policiesData.find((p) => p.id === id) || policiesData[1];
      }
      return policiesData[1]; // default to youth declaration
    }
    return null;
  });

  const setCurrentView = useCallback((
    view: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "policy-details",
    policyId?: string
  ) => {
    setCurrentViewInternal(view);
    let path = "/";
    if (view === "about") path = "/about";
    else if (view === "projects") path = "/projects";
    else if (view === "project-details") path = "/project-details";
    else if (view === "blog") path = "/blog";
    else if (view === "blog-details") path = "/blog-details";
    else if (view === "contact") path = "/contact";
    else if (view === "admin") path = "/admin";
    else if (view === "policy-details") {
      path = `/policy-details?id=${policyId || "policy-2"}`;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/about") setCurrentViewInternal("about");
      else if (path === "/projects") setCurrentViewInternal("projects");
      else if (path === "/project-details") setCurrentViewInternal("project-details");
      else if (path === "/blog") setCurrentViewInternal("blog");
      else if (path === "/blog-details") setCurrentViewInternal("blog-details");
      else if (path === "/contact") setCurrentViewInternal("contact");
      else if (path === "/admin") setCurrentViewInternal("admin");
      else if (path === "/policy-details") {
        setCurrentViewInternal("policy-details");
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) {
          const found = policiesData.find((p) => p.id === id);
          if (found) setSelectedPolicy(found);
        }
      } else {
        setCurrentViewInternal("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<DetailedBlogPost | null>(null);

  // Dynamic projects and blogs states backed by localStorage
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("charitics_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [blogs, setBlogs] = useState<DetailedBlogPost[]>(() => {
    const saved = localStorage.getItem("charitics_blogs");
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const handleUpdateProjects = useCallback((updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem("charitics_projects", JSON.stringify(updated));
  }, []);

  const handleUpdateBlogs = useCallback((updated: DetailedBlogPost[]) => {
    setBlogs(updated);
    localStorage.setItem("charitics_blogs", JSON.stringify(updated));
  }, []);

  // Map dynamic state arrays to formats expected by static-typed home components
  const homeCampaigns: Campaign[] = useMemo(() => {
    return initialProjects.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      category: p.category,
      raised: p.raisedAmount,
      goal: p.targetAmount,
      description: p.description
    }));
  }, []);

  const homeBlogPosts: BlogPost[] = useMemo(() => {
    return blogs.map((b) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      category: b.category,
      image: b.image,
      author: b.author
    }));
  }, [blogs]);

  // Helper to trigger stylish toasts
  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Smooth scroll handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    };

    if (!scroll()) {
      // Retry if the element wasn't found immediately (due to route transitions/animations)
      setTimeout(scroll, 150);
    }
  }, []);

  // Event handlers
  const handleQuickDonateSubmit = useCallback((amount: number, isKidSupport: boolean) => {
    addToast(
      "success",
      "Donation Received",
      `Thank you so much! You donated $${amount.toLocaleString()} successfully. Your support immediately funds active nutrition and healthcare programs.`
    );
  }, [addToast]);

  const handleVolunteerApply = useCallback((data: { name: string; email: string; phone: string; message: string }) => {
    addToast(
      "success",
      "Application Submitted",
      `Welcome to the team, ${data.name}! Your application has been logged. Our outreach lead will email you within 48 hours.`
    );
  }, [addToast]);

  const handleNewsletterSubscribe = useCallback((email: string) => {
    addToast(
      "success",
      "Subscription Successful",
      `Thank you! ${email} has been subscribed to our monthly impact reports and priority campaign logs.`
    );
  }, [addToast]);

  const handleEventRegister = useCallback((evt: Event) => {
    addToast(
      "info",
      "Event Registered",
      `You have requested details for "${evt.title}". An informational schedule and venue access guide have been sent to your contact inbox.`
    );
  }, [addToast]);

  const handleBlogPostRead = useCallback((post: BlogPost) => {
    const detailedBlog = blogs.find(b => b.id === post.id) || blogs[0];
    setSelectedBlog(detailedBlog);
    setCurrentView("blog-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
    addToast(
      "info",
      "Journal Loaded",
      `Displaying "${detailedBlog.title}". Full editorial document and photorealistic community logs are available in our public database.`
    );
  }, [blogs, addToast]);

  // Open Checkout Modal for a specific campaign card
  const handleOpenCheckout = useCallback((campaign: Campaign) => {
    setCheckoutCampaign(campaign);
    setIsCheckoutOpen(true);
  }, []);

  const handleCheckoutSuccess = useCallback((amount: number, campaignTitle: string) => {
    addToast(
      "success",
      "Payment Successful",
      `Thank you! Sponsoring $${amount.toLocaleString()} for "${campaignTitle}" was processed successfully. Together we protect lives.`
    );
  }, [addToast]);

  const handleNavbarJoinClick = useCallback(() => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        handleScrollToSection("volunteer");
      }, 100);
    } else {
      handleScrollToSection("volunteer");
    }
    addToast(
      "info",
      "Join as Volunteer",
      "Please fill out our short volunteer form below to submit your field application."
    );
  }, [currentView, handleScrollToSection, addToast]);

  const handleAboutUsExploreClick = useCallback(() => {
    setCurrentView("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFooterNavigation = useCallback((sectionId: string) => {
    if (sectionId === "about") {
      setCurrentView("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "projects") {
      setCurrentView("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "news" || sectionId === "blog") {
      setCurrentView("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "contact") {
      setCurrentView("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (currentView !== "home") {
        setCurrentView("home");
        setTimeout(() => {
          handleScrollToSection(sectionId);
        }, 100);
      } else {
        handleScrollToSection(sectionId);
      }
    }
  }, [currentView, handleScrollToSection]);

  return (
    <div className="relative min-h-screen bg-Transparent selection:bg-primary/20" id="main-app-container">
      {/* Dynamic Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Checkout modal pop-up */}
      <CheckoutModal
        campaign={checkoutCampaign}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Primary Sticky Header Navigation */}
      {currentView !== "policy-details" && (
        <Navbar
          onDonateClick={() => {
            if (currentView !== "home") {
              setCurrentView("home");
              setTimeout(() => handleScrollToSection("donation"), 100);
            } else {
              handleScrollToSection("donation");
            }
          }}
          onNavigate={handleScrollToSection}
          onJoinClick={handleNavbarJoinClick}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}

      {/* Main Content Area */}
      <main id="main-sections-wrapper">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section 1: Hero section */}
              <Hero
                onDonateClick={() => {
                  setCurrentView("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onExploreClick={() => {
                  setCurrentView("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 2: About Us section */}
              <AboutUs onExploreClick={handleAboutUsExploreClick} />

              {/* Section 3: Core Pillars & Values Accordions Column Grid */}
              <Values />

              {/* Section 4: Services Grid Section*/}
              <Services />

              {/* Section 5: Projects section */}
              <Causes 
                campaigns={homeCampaigns} 
                onDonateClick={handleOpenCheckout} 
                onViewAllProjects={() => {
                  setCurrentView("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 6: Donation Widget */}
              <section className="py-20 bg-white" id="quick-donation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <DonationWidget onDonateSubmit={handleQuickDonateSubmit} />
                </div>
              </section>

              {/* Section 7: Stats section */}
              <StatsCounter />

              {/* Section 8: Blog section */}
              <LatestNews 
                posts={homeBlogPosts} 
                onPostClick={handleBlogPostRead} 
                onViewAllNews={() => {
                  setCurrentView("blog");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 9: Policies & Documents Grif section*/}
              <Policies 
                onPolicySelect={(policy) => {
                  setSelectedPolicy(policy);
                  setCurrentView("policy-details", policy.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 10: Dedicated Partner Brands section */}
              <Partners />

              {/* Section 11: Call to Action */}
              <CTA 
                onDonateClick={() => handleScrollToSection("donation")}
                onPartnerClick={() => handleScrollToSection("contact")}
              />
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onDonateClick={() => {
                  setCurrentView("home");
                  setTimeout(() => handleScrollToSection("donation"), 100);
                }}
                onJoinClick={handleNavbarJoinClick}
                onBackToHome={() => setCurrentView("home")}
              />
            </motion.div>
          )}

          {currentView === "projects" && (
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                projects={initialProjects}
                onDonateClick={() => {
                  setCurrentView("home");
                  setTimeout(() => handleScrollToSection("donation"), 100);
                }}
                onJoinClick={handleNavbarJoinClick}
                onBackToHome={() => setCurrentView("home")}
                onProjectSelect={(proj) => {
                  setSelectedProject(proj);
                  setCurrentView("project-details");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          )}

          {currentView === "project-details" && selectedProject && (
            <motion.div
              key="project-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectDetailsPage
                project={initialProjects.find((p) => p.id === selectedProject.id) || selectedProject}
                projects={initialProjects}
                onNavigateToProject={(proj) => {
                  setSelectedProject(proj);
                  window.scrollTo({ top: 0 });
                }}
                onDonateClick={() => {
                  setCurrentView("home");
                  setTimeout(() => handleScrollToSection("donation"), 100);
                }}
                onBackToHome={() => setCurrentView("home")}
                onBackToProjects={() => {
                  setCurrentView("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          )}

          {currentView === "blog" && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage
                blogs={blogs}
                onBlogSelect={(blogItem) => {
                  setSelectedBlog(blogItem);
                  setCurrentView("blog-details");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          )}

          {currentView === "blog-details" && selectedBlog && (
            <motion.div
              key="blog-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BlogDetailsPage
                blog={selectedBlog}
                onNavigateToBlog={(blogItem) => {
                  setSelectedBlog(blogItem);
                  window.scrollTo({ top: 0 });
                }}
                onBackToBlogs={() => {
                  setCurrentView("blog");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "contact" && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "policy-details" && selectedPolicy && (
            <motion.div
              key="policy-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PolicyDetailsPage
                policy={selectedPolicy}
                onBack={() => {
                  setCurrentView("home");
                  setTimeout(() => handleScrollToSection("policies-documents"), 400);
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "admin" && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                projects={projects}
                blogs={blogs}
                onUpdateProjects={handleUpdateProjects}
                onUpdateBlogs={handleUpdateBlogs}
                addToast={addToast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global double-row footer */}
      <Footer
        onNewsletterSubmit={handleNewsletterSubscribe}
        onNavigate={handleFooterNavigation}
      />

      {/* Scroll to Top Floating Button */}
      <BackToTop />
    </div>
  );
}