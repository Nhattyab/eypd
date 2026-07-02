import { useState, useCallback } from "react";
import { campaignsData, eventsData, testimonialsData, blogPostsData, volunteerFaqData } from "./data";
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
import { ToastContainer, ToastMessage, ToastType } from "./components/Toast";

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [checkoutCampaign, setCheckoutCampaign] = useState<Campaign | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    addToast(
      "info",
      "Journal Loaded",
      `Displaying "${post.title}". Full editorial document and photorealistic community logs are available in our public database.`
    );
  }, [addToast]);

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
    handleScrollToSection("volunteer");
    addToast(
      "info",
      "Join as Volunteer",
      "Please fill out our short volunteer form below to submit your field application."
    );
  }, [handleScrollToSection, addToast]);

  const handleAboutUsExploreClick = useCallback(() => {
    handleScrollToSection("donation");
  }, [handleScrollToSection]);

  return (
    <div className="relative min-h-screen bg-white selection:bg-primary/20" id="main-app-container">
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
      <Navbar
        onDonateClick={() => handleScrollToSection("donation")}
        onNavigate={handleScrollToSection}
        onJoinClick={handleNavbarJoinClick}
      />

      {/* Main Content Area */}
      <main id="main-sections-wrapper">
        {/* Section 1: Parallax Hero Intro */}
        <Hero
          onDonateClick={() => handleScrollToSection("donation")}
          onExploreClick={() => handleScrollToSection("donation")}
        />

        {/* Section 2: About Us NGO Introduction */}
        <AboutUs onExploreClick={handleAboutUsExploreClick} />

        {/* Section 2.3: Core Pillars & Values Accordions Column Grid */}
        <Values />

        {/* Section 2.5: Interactive Services Grid */}
        <Services />

        {/* Section 3: Active Charity Causes Grid */}
        <Causes campaigns={campaignsData} onDonateClick={handleOpenCheckout} />

        {/* Section 4: Live Interactive Donation Widget */}
        <section className="py-20 bg-white" id="quick-donation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DonationWidget onDonateSubmit={handleQuickDonateSubmit} />
          </div>
        </section>

        {/* Section 5: Real-Time Scroll Statistics */}
        <StatsCounter />

        {/* Section 6: Upcoming Event Schedule */}
        <EventSchedule events={eventsData} onRegisterClick={handleEventRegister} />

       


        {/* Section 10: Editorial News Blog */}
        <LatestNews posts={blogPostsData} onPostClick={handleBlogPostRead} />

        {/* Section 10.5: Policies & Documents Governance Grid */}
        <Policies />

        {/* Section 11: Dedicated Partner Brands Carousel/List */}
        <Partners />


        {/* Section 12: Stand with Ethiopian Youth Call to Action */}
        <CTA 
          onDonateClick={() => handleScrollToSection("donation")}
          onPartnerClick={() => handleScrollToSection("contact")}
        />
      </main>

      {/* Global double-row footer */}
      <Footer
        onNewsletterSubmit={handleNewsletterSubscribe}
        onNavigate={handleScrollToSection}
      />

      {/* Scroll to Top Floating Button */}
      <BackToTop />
    </div>
  );
}
