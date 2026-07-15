import { useState,  useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Check,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Star,
  Users,
  Award,
  Gift,
  Globe,
  Quote,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  HeartCrack,
} from "lucide-react";


import DonationWidget from "./DonationWidget";

// Image Imports
// @ts-ignore
import logoImg from "../assets/images/charitics_logo_1782817422748.jpg";
// @ts-ignore
import handsHoldingHeartImage from "../assets/images/hands_holding_heart_1782473086845.jpg";
// @ts-ignore
import volunteerFoodDelivery from "../assets/images/volunteer_food_delivery_1782474593369.jpg";
// @ts-ignore
import refugeeChildPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";
// @ts-ignore
import childEatingBowl from "../assets/images/child_eating_bowl_1782474654974.jpg";
// @ts-ignore
import elderManBlanket from "../assets/images/elder_man_blanket_1782474613376.jpg";
// @ts-ignore
import youngManCarrying from "../assets/images/young_man_carrying_load_1782474631970.jpg";
// @ts-ignore
import fundRaisedDonationImage from "../assets/images/fund_raised_donation_1782473794638.jpg";
// @ts-ignore
import medicalTreatmentHelpImage from "../assets/images/medical_treatment_help_1782473815510.jpg";

interface AboutPageProps {
  onDonateClick: () => void;
  onJoinClick: () => void;
  onBackToHome: () => void;
}

export default function AboutPage({
  onDonateClick,
  onJoinClick,
  onBackToHome,
}: AboutPageProps) {
  // Tabs for history section
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "history">("mission");
  
  // Testimonial sliding state
  const [testIdx, setTestIdx] = useState(0);

  // Service details modal state
  const [selectedService, setSelectedService] = useState<{ title: string; content: string } | null>(null);

  const handleViewServiceDetails = (title: string, content: string) => {
    setSelectedService({ title, content });
  };

  const stats = [
    { id: "stat-1", value: "250+", label: "Youth delegates at Addis Forum 2025", icon: Users },
    { id: "stat-2", value: "9+", label: "Years of youth-led work in Ethiopia", icon: Award },
    { id: "stat-3", value: "11+", label: "Regions and communities reached", icon: Gift },
    { id: "stat-4", value: "15+", label: "Institutional partners and collaborators", icon: Globe },
  ];
  // Tab contents
  const tabContents = {
    mission: {
      title: "Our target population",
      paragraphs: [
        "EYPD's work is youth-led and rights-based, placing young people's agency and the rights of the communities it serves at the centre. It is gender-responsive and conflict-sensitive, designed to include those most often left out and to avoid deepening tensions. And it is evidence-based, locally led, and partnership-driven, grounded in community realities, delivered as close to the ground as possible, and built on trust and principle based alliances rather than working alone."
      ],
      bullets: [
        "Children, adolescents and youth (young people): children under 18 (Convention on the Rights of the Child), adolescents 10 to 19 (WHO), and youth 15 to 35 (African Youth Charter). EYPD uses 'young people' as the umbrella across these stages because it is inclusive, people-first, and not tied to a single age definition.",
        "Conflict- and crisis-affected communities, including displaced and host populations and young people in reintegration, such as ex-combatants and returnees.",
        "women and marginalized groups.",
        "persons with disabilities."
      ]
    },
    vision: {
      title: "Theory Of Change",
      paragraphs: [
        "EYPD starts from a simple conviction: those most affected by conflict, exclusion, and crisis are also the ones best placed to resolve them. If young people are equipped with voice, skills, and opportunity, and if communities and institutions open genuine space for their leadership, then Ethiopia's young generation can drive lasting peace, resilience, and inclusive development."
      ],
      bullets: [
        "Accelerate clean water infrastructure through solar pumps.",
        "Sustain digital learning tools in primary village hubs.",
        "Provide direct medical screenings via mobile clinic routes.",
        "Foster local agrarian training for village households."
      ]
    },
    history: {
      title: "Our programme pillars",
      paragraphs: [
        "EYPD's work is organised around five interconnected strategic pillars that reflect its identity and community-rooted approach. Together they bring EYPD's peacebuilding and social cohesion, youth voice and civic participation, humanitarian response and protection, economic empowerment and climate, and policy advocacy work into a single, coherent programme framework, designed to work across the humanitarian, development and peace (HDP) nexus so that relief, development and peacebuilding reinforce one another and reduce overall vulnerability and address the root causes of conflict. Advocacy is mainstreamed across all five pillars, with each one generating community-level evidence and carrying it into influence."
      ],
      bullets: [
        "peace and social cohesion",
        "policy advocacy and influencing",
        "Humaniterial Responce, protection and community resilience",
        "Economic empowerment and climate resilience"
      ]
    }
  };

  const currentTabContent = tabContents[activeTab];

  return (
    <div className="bg-transparent min-h-screen  text-gray-800" id="about-page-container">
      {/* 1. Header Banner with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="about-hero-banner"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={refugeeChildPortrait}
            alt="About Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. Main About NGO Introduction Section */}
      <section className="py-14 bg-white" id="about-intro-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            
            {/* Left Column: Organic Heart-Shape Photo Grid & Badge */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-start" id="about-intro-media">
              {/* Double-layered organic design */}
              <div className="relative z-10 w-full max-w-[450px] aspect-square rounded-[10%] overflow-hidden bg-primary-50/50 hover:scale-[1.01] transition-transform duration-500 shadow-2xl border border-primary-100 flex items-center justify-center">
                <div className="absolute inset-4 rounded-[8%] overflow-hidden border-4 border-dashed border-primary/20" />
                <img
                  src={handsHoldingHeartImage}
                  alt="Hands holding red wooden heart"
                  className="w-[90%] h-[90%] object-cover rounded-[12%] shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Years of Experience orange badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-96 md:-right-4 bg-primary text-white px-6 py-4 rounded-3xl shadow-2xl z-20 text-center max-w-[140px]"
                id="about-badge-experience"
              >
                <div className="font-display font-black text-5xl tracking-tight">9+</div>
                <div className="text-xs font-display font-bold uppercase tracking-wider mt-1.5 leading-snug">
                  Years Of Experience
                </div>
              </motion.div>
            </div>

            {/* Right Column: NGO Narrative & Call Blocks */}
            <div className="lg:col-span-6 space-y-6" id="about-intro-text">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary" id="about-tagline">
                  <span className="font-display font-black uppercase tracking-wider text-xs sm:text-sm">
                    About US
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#0f2c59] leading-[1.15] tracking-tight">
                  Helping Each Other can Make World Better
                </h2>
              </div>

              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
                Ethiopian Youth for Peace and Development (EYPD), formerly the Ethiopian Youth Dialogue for Peace Association (EYDPA), is a non-partisan, non-governmental, and non-profit youth-led organisation working towards a future where every young person thrives. We exist to place young people at the centre of building sustained peace, resilience, secure livelihoods, and long-term development across Ethiopia. EYPD holds legal personality under registry number 5105, in accordance with the Civil Society Organizations Proclamation No. 1113/2019.              </p>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
                Through a grassroots network of hundreds of young volunteers and alumni, we connect community action with national policy, nurturing dialogue and constructive discourse through an inclusive, bottom-up approach. Our work brings together peacebuilding and social cohesion, youth voice and policy advocacy, humanitarian response and protection, economic empowerment, gender equality, and climate resilience rried throughout by strong community engagement and clear, credible communications.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Circular Stats Counters Section (Dark Blue Background) */}
      <section className="py-20 bg-gradient-to-r from-[#111e38] via-[#10352c] to-[#0e4d2d] text-white relative overflow-hidden" id="about-stats-counters">
        {/* Background visual detail */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ec5b2d_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group w-full"
                  id={`stat-circle-${stat.id}`}
                >
                  {/* Circular double border outlining  */}
                  <div className="w-36 h-36 rounded-full border border-white/10 p-2 flex items-center justify-center mb-5 relative group-hover:border-primary/60 transition-all duration-500">
                    <div className="w-full h-full rounded-full border-2 border-white/25 flex flex-col items-center justify-center bg-secondary/70 group-hover:scale-105 group-hover:border-primary transition-all duration-500 relative overflow-hidden">
                      {/* Hover glowing overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <Icon className="w-6 h-6 text-primary mb-1 relative z-10" />
                      <span className="font-display font-black text-2xl tracking-tight text-white relative z-10">
                        {stat.value}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors tracking-wide">
                    {stat.label}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NGO History / Interactive Events Tabbed Section */}
      <section className="py-18 bg-white" id="about-history-tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" id="history-header">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary" id="history-tag">
                <span className="font-display font-black uppercase tracking-wider text-xs sm:text-sm">
                  Our Organization History
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Split Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="history-content-grid">
            
            {/* Left media block */}
            <div className="lg:col-span-5 relative" id="history-media">
              <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] bg-gray-100 border border-gray-100 group">
                <img
                  src={volunteerFoodDelivery}
                  alt="NGO volunteers collaborating"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Organic primarycolored frame element */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border-[12px] border-primary/10 rounded-full -z-10" />
            </div>

            {/* Right Tab Contents block */}
            <div className="lg:col-span-7 space-y-6" id="history-tabs-container">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-display font-black text-[#0f2c59] transition-all">
                  {currentTabContent.title}
                </h3>
                
                {currentTabContent.paragraphs.map((p, index) => (
                  <p key={index} className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
                    {p}
                  </p>
                ))}
              </div>

              {/* Checked Bullet columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2" id="history-bullets-grid">
                {currentTabContent.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-sans font-medium">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tabs buttons block at the bottom */}
              <div className="flex border-t border-gray-100 pt-8 gap-4 sm:gap-8 overflow-x-auto" id="history-tab-buttons">
                {(["mission", "vision", "history"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-display font-black text-sm uppercase tracking-wider py-2 relative transition-all duration-300 cursor-pointer shrink-0 ${
                      activeTab === tab
                        ? "text-primary"
                        : "text-gray-400 hover:text-[#0f2c59]"
                    }`}
                    id={`history-tab-btn-${tab}`}
                  >
                    {tab === "mission" && "Our Target"}
                    {tab === "vision" && "Theory of change"}
                    {tab === "history" && "Our Program pillars"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. Our Featured Services Section (Matching Mockup Screenshot) */}
      <section className="py-14 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38]" id="about-services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="about-services-header">
            <div className="flex items-center justify-center gap-2 text-primary" id="about-services-tag">
              <span className="font-display font-black uppercase tracking-wider text-xs sm:text-sm">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-[1.15]">
              What We Provide?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto">
              Our holistic programs deliver physical, clinical, and nutritional reinforcement directly to communities experiencing critical infrastructure vulnerabilities.
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-services-grid">
            
            {/* Card 1: Fund Raised & Donation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
              id="service-card-fund-raised"
            >
              <div className="space-y-4">
                {/* Image Wrapper with diagonal cut background details mimicking screenshot */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={fundRaisedDonationImage}
                    alt="Fund Raised & Donation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle decorative grey triangle overlay matching screenshot style */}
                  <div className="absolute top-0 left-0 w-8 h-8 bg-black/10 rounded-br-2xl pointer-events-none" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-display font-black text-xl text-[#0f2c59] group-hover:text-primary transition-colors duration-200">
                    Peace & Reconciliation
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    Grassroots dialogue platforms and community reconciliation programs across conflict-affected regions of Ethiopia.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Medical Treatment Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
              id="service-card-medical"
            >
              <div className="space-y-4">
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={medicalTreatmentHelpImage}
                    alt="Medical Treatment Help"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 w-8 h-8 bg-black/10 rounded-br-2xl pointer-events-none" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-display font-black text-xl text-[#0f2c59] group-hover:text-primary transition-colors duration-200">
                      Livelihoods & Resilience
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    Skills development, economic empowerment, and climate resilience for youth in vulnerable communities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Child Medical Research */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full"
              id="service-card-research"
            >
              <div className="space-y-4">
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600"
                    alt="Child Medical Research"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 w-8 h-8 bg-black/10 rounded-br-2xl pointer-events-none" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-display font-black text-xl text-[#0f2c59] group-hover:text-primary transition-colors duration-200">
                    Advocacy & Leadership
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    Youth leadership programs, civic education, and policy advocacy to amplify youth voices at all levels.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}