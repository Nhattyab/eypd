import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, CreditCard, ShieldCheck, Users, Sparkles, CheckCircle, Gift, DollarSign,
  ArrowRight, Landmark, RefreshCw, Send, AlertCircle
} from "lucide-react";

export interface DonationItem {
  id: string;
  name: string;
  email: string;
  amount: number;
  campaign: string;
  recurring: string;
  date: string;
  anonymous: boolean;
}

interface DonationPageProps {
  onBackToHome: () => void;
  addToast?: (type: "success" | "info" | "warning" | "error", title: string, message: string) => void;
  selectedCampaignName?: string;
  selectedCampaignId?: string;
  initialAmount?: number;
  onDonationSuccess?: () => void;
}

export default function DonationPage({ 
  onBackToHome, 
  addToast, 
  selectedCampaignName, 
  selectedCampaignId,
  initialAmount,
  onDonationSuccess 
}: DonationPageProps) {
  const [amount, setAmount] = useState<number>(() => {
    if (initialAmount !== undefined) return initialAmount;
    return 50;
  });
  const [customAmount, setCustomAmount] = useState<string>(() => {
    if (initialAmount !== undefined && ![15, 30, 50, 100, 250].includes(initialAmount)) {
      return initialAmount.toString();
    }
    return "";
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [recurring, setRecurring] = useState<"One-Time" | "Monthly">("One-Time");
  const [anonymous, setAnonymous] = useState(false);
  
  // Available campaigns for selection
  const campaigns = [
    { id: "general", label: "General Peace & Development Fund" },
    { id: "project-2", label: "Pediatric Clinical Screening Outpost" },
    { id: "project-1", label: "Family Survival & Burden Relief" },
    { id: "project-3", label: "Water Infrastructure & Borehole Drills" },
    { id: "project-4", label: "Youth Enterprise & Vocational Tools" }
  ];

  const [selectedCampaign, setSelectedCampaign] = useState(() => {
    if (selectedCampaignName) {
      const match = campaigns.find(c => c.label === selectedCampaignName || c.id === selectedCampaignId);
      if (match) return match.id;
    }
    return "general";
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "bank">("card");
  
  // Payment detail states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileProvider, setMobileProvider] = useState("telebirr"); // telebirr or mpesa
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentDonations, setRecentDonations] = useState<DonationItem[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(false);

  // Load recent donations from API
  const fetchRecentDonations = async () => {
    setLoadingDonations(true);
    try {
      const res = await fetch("/api/donations");
      if (res.ok) {
        const data = await res.json();
        setRecentDonations(data.slice(0, 5)); // show latest 5
      }
    } catch (err) {
      console.error("Failed to load donations", err);
    } finally {
      setLoadingDonations(false);
    }
  };

  useEffect(() => {
    fetchRecentDonations();
  }, []);

  // Update amount state when presets are selected
  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*$/.test(val)) {
      setCustomAmount(val);
      if (val !== "") {
        setAmount(parseInt(val, 10) || 0);
      } else {
        setAmount(0);
      }
    }
  };

  // Get localized impact explanation based on current amount
  const getImpactExplanation = (val: number) => {
    if (val <= 0) return "Choose an amount to see its direct, transparent impact in East African communities.";
    if (val < 20) return `$${val} covers high-nutrition organic school lunches for a child for two full weeks.`;
    if (val < 40) return `$${val} supplies custom cargo protectors, carriage accessories, and work safety gear for rural laborers.`;
    if (val < 75) return `$${val} funds a portable clinical screening kit, complete with primary antibiotics and children's vitamins.`;
    if (val < 150) return `$${val} supplies solar vaccine refrigeration power or installs premium hygiene basins in an isolated district.`;
    if (val < 350) return `$${val} empowers 5 local women-led trade co-ops with modern sewing machinery, tools, and raw startup fabric.`;
    return `$${val.toLocaleString()} facilitates extensive peace education sessions, restores shallow community water wells, or implements major agricultural seed pipelines.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount !== "" ? parseInt(customAmount, 10) : amount;

    if (finalAmount <= 0) {
      if (addToast) addToast("error", "Invalid Amount", "Please specify a donation amount greater than $0.");
      return;
    }
    if (!name.trim()) {
      if (addToast) addToast("error", "Name Required", "Please enter your full name or specify a pseudonym.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      if (addToast) addToast("error", "Email Required", "Please enter a valid email address to receive your tax certificate.");
      return;
    }

    setIsSubmitting(true);
    
    // Find campaign label
    const chosenCampaignLabel = campaigns.find(c => c.id === selectedCampaign)?.label || "General Peace & Development Fund";
    const mappedProjectId = selectedCampaign !== "general" ? selectedCampaign : undefined;

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          amount: finalAmount,
          campaign: chosenCampaignLabel,
          recurring: recurring,
          anonymous: anonymous,
          projectId: mappedProjectId
        })
      });

      if (response.ok) {
        if (addToast) {
          addToast(
            "success",
            "Donation Successful!",
            `Thank you so much, ${name || "friend"}! Your contribution of $${finalAmount.toLocaleString()} has been fully received & verified.`
          );
        }
        
        // Reset states
        setName("");
        setEmail("");
        setCustomAmount("");
        setAmount(50);
        setCardNumber("");
        setCardExpiry("");
        setCardCvv("");
        setMobileNumber("");
        
        // Fetch fresh donations
        await fetchRecentDonations();

        if (onDonationSuccess) {
          onDonationSuccess();
        }
      } else {
        throw new Error("API responded with an error status");
      }
    } catch (err) {
      console.error(err);
      if (addToast) addToast("error", "Donation Failed", "A communication error occurred with our secure payment gateway. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const presets = [15, 30, 50, 100, 250];

  return (
    <div className="bg-gray-50 min-h-screen pb-24" id="donation-page-container">
      
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="project-details-hero"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Donate Now
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">Donate Now</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto pt-16">
        {/* 2-Column Core Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" id="donation-main-grid"> 
          {/* LEFT COLUMN: Main Interactive Donation Hub (8 Columns) */}
          <div className="lg:col-span-8 space-y-8" id="donation-interactive-hub">
            
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200/95 shadow-md overflow-hidden" id="main-donation-form">
              
              {/* Form Section 1: Amount selection */}
              <div className="p-8 sm:p-10 border-b border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-display font-black text-[#0f2c59] flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ecf7ed] text-[#1e6f3d] text-sm">1</span>
                    Choose Your Support Level
                  </h2>
                  
                  {/* Recurring Toggle */}
                  <div className="inline-flex bg-gray-100 p-1 rounded-xl shrink-0" id="donation-frequency-toggle">
                    <button
                      type="button"
                      onClick={() => setRecurring("One-Time")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        recurring === "One-Time" ? "bg-white text-[#0f2c59] shadow-sm" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecurring("Monthly")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        recurring === "Monthly" ? "bg-[#1e6f3d] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin-slow" /> Monthly
                      </span>
                    </button>
                  </div>
                </div>

                {/* Preset Button Grid */}
                <div className="grid grid-cols-5 gap-3" id="donation-presets-grid">
                  {presets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePresetSelect(val)}
                      className={`py-4 rounded-2xl font-display font-black text-base sm:text-lg transition-all border cursor-pointer ${
                        amount === val && customAmount === ""
                          ? "bg-[#0f2c59] border-[#0f2c59] text-white shadow-md scale-[1.02]"
                          : "bg-[#f8fafc] border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                {/* Custom Amount input field */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Or Enter Custom Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-display font-black text-gray-400 text-xl">$</span>
                    <input
                      type="text"
                      placeholder="Enter other value..."
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-4 pl-10 pr-6 text-base font-display font-black text-[#0f2c59] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f3d]/10 focus:border-[#1e6f3d] transition-all"
                      id="custom-donation-input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Form Section 2: Donor details */}
              <div className="p-8 sm:p-10 border-b border-gray-100 space-y-6">
                <h2 className="text-xl font-display font-black text-[#0f2c59] flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ecf7ed] text-[#1e6f3d] text-sm">2</span>
                  Donor Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abebe Bikila"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#1e6f3d] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. abebe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#1e6f3d] transition-all"
                    />
                  </div>
                </div>

                {/* Campaign Designation Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                    Designate Your Contribution To
                  </label>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-[#0f2c59] font-sans font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-[#1e6f3d] transition-all cursor-pointer"
                  >
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id} className="font-sans">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="anonymous-checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 shrink-0 cursor-pointer"
                  />
                  <label htmlFor="anonymous-checkbox" className="text-xs font-semibold text-gray-600 cursor-pointer select-none text-left">
                    Make my donation anonymous. Hide my name and email from public recent activity feeds.
                  </label>
                </div>
              </div>

              {/* Form Section 3: Secure Mock Payment details */}
              <div className="p-8 sm:p-10 bg-[#fbfcfd] space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-display font-black text-[#0f2c59] flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ecf7ed] text-[#1e6f3d] text-sm">3</span>
                    Secure Payment Protocol
                  </h2>
                  <div className="flex items-center gap-1.5 text-[#1e6f3d] text-xs font-bold bg-[#ecf7ed] px-3 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secured SSL
                  </div>
                </div>

                {/* Payment method selector tabs */}
                <div className="grid grid-cols-3 gap-3" id="payment-methods-tabs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-3.5 px-2.5 rounded-xl border font-sans font-bold text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                      paymentMethod === "card"
                        ? "bg-[#0f2c59] text-white border-[#0f2c59] shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                    className={`py-3.5 px-2.5 rounded-xl border font-sans font-bold text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                      paymentMethod === "mobile"
                        ? "bg-[#0f2c59] text-white border-[#0f2c59] shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>Mobile Money</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`py-3.5 px-2.5 rounded-xl border font-sans font-bold text-xs transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                      paymentMethod === "bank"
                        ? "bg-[#0f2c59] text-white border-[#0f2c59] shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Landmark className="w-4 h-4 shrink-0" />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                {/* Tab content wrapper with smooth motion height */}
                <div className="bg-white rounded-2xl border border-gray-200/60 p-5 shadow-inner">
                  <AnimatePresence mode="wait">
                    {paymentMethod === "card" && (
                      <motion.div
                        key="card-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="4111 •••• •••• 1111 (Mock Accepted)"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-11 pr-5 py-3 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">CVC/CVV</label>
                            <input
                              type="password"
                              placeholder="•••"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "mobile" && (
                      <motion.div
                        key="mobile-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setMobileProvider("telebirr")}
                            className={`py-3 px-4 border rounded-xl font-display font-black text-xs cursor-pointer transition-all ${
                              mobileProvider === "telebirr" 
                                ? "bg-[#1e6f3d]/10 text-[#1e6f3d] border-[#1e6f3d]" 
                                : "bg-[#f8fafc] text-gray-600 border-gray-200"
                            }`}
                          >
                            Telebirr (Ethiopia)
                          </button>
                          <button
                            type="button"
                            onClick={() => setMobileProvider("mpesa")}
                            className={`py-3 px-4 border rounded-xl font-display font-black text-xs cursor-pointer transition-all ${
                              mobileProvider === "mpesa" 
                                ? "bg-[#e51937]/10 text-[#e51937] border-[#e51937]" 
                                : "bg-[#f8fafc] text-gray-600 border-gray-200"
                            }`}
                          >
                            M-Pesa (East Africa)
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider text-left">Mobile Money Phone Number</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                              {mobileProvider === "telebirr" ? "+251" : "+254"}
                            </span>
                            <input
                              type="tel"
                              placeholder="911 234 567"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-16 pr-5 py-3 text-sm focus:outline-none font-sans font-medium"
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 block text-left">
                            * We will automatically trigger a secure, instant checkout PIN prompt to this mobile wallet.
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "bank" && (
                      <motion.div
                        key="bank-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-3 text-left bg-[#f8fafc] p-4 rounded-xl border border-gray-150"
                      >
                        <span className="text-[10px] font-display font-black uppercase text-[#0f2c59] tracking-wider block">EYPD Main Bank Ledger accounts</span>
                        <div className="divide-y divide-gray-100 text-xs font-sans text-gray-600 space-y-2.5">
                          <div className="pt-2 first:pt-0">
                            <p className="font-bold text-[#0f2c59]">Commercial Bank of Ethiopia (CBE)</p>
                            <p>Account Number: <span className="font-mono font-bold">1000293481232</span></p>
                            <p className="text-[10px] text-gray-400">Mek'ele Main Branch, Ethiopia</p>
                          </div>
                          <div className="pt-2.5">
                            <p className="font-bold text-[#0f2c59]">Dashen Bank S.C.</p>
                            <p>Account Number: <span className="font-mono font-bold">5012389148011</span></p>
                            <p className="text-[10px] text-gray-400">Bole Branch, Addis Ababa, Ethiopia</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#1e6f3d] font-bold italic pt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Please specify your full name in the transaction description memo!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Central Checkout Action CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#5CB815] hover:bg-[#4ea211] disabled:opacity-50 text-white font-display font-black text-base sm:text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  id="checkout-secure-submit-btn"
                >
                  <Heart className="w-5 h-5 fill-white stroke-none shrink-0" />
                  <span>
                    {isSubmitting 
                      ? "Verifying Secure Channels..." 
                      : `Complete Secure Donation of $${(customAmount !== "" ? (parseInt(customAmount, 10) || 0) : amount).toLocaleString()}`
                    }
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-gray-400 max-w-lg mx-auto font-sans leading-relaxed">
                  EYPD is a certified non-profit CSO NGO (#4412). All contributions are fully tax-deductible. A certified PDF certificate of receipt is dispatched directly to your designated email box upon settlement.
                </p>
              </div>

            </form>

          </div>

          {/* RIGHT COLUMN: Recent Ledgers & Testimonials (4 Columns) */}
          <div className="lg:col-span-4 space-y-8" id="donation-sidebar-content">
            
            {/* Real-time Recent Activity Ledger */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-sm space-y-6" id="donation-feed-card">
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-display font-black text-[#1e6f3d] uppercase tracking-wider block">Live Platform activity</span>
                <h3 className="text-lg font-display font-black text-[#0f2c59] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#0f2c59]" /> Recent Contributions
                </h3>
              </div>

              {loadingDonations ? (
                <div className="text-center py-10 space-y-2">
                  <div className="w-6 h-6 border-2 border-[#1e6f3d] border-t-transparent rounded-full animate-spin mx-auto" />
                  <span className="text-xs text-gray-400 font-medium">Syncing with server database...</span>
                </div>
              ) : recentDonations.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No recent contributions found.</p>
              ) : (
                <div className="space-y-4" id="recent-donors-list">
                  {recentDonations.map((don, idx) => (
                    <motion.div
                      key={don.id}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0 text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#1e6f3d] font-display font-black text-xs flex items-center justify-center shrink-0">
                        {don.anonymous ? "A" : (don.name ? don.name[0].toUpperCase() : "D")}
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-gray-800 truncate">
                            {don.anonymous ? "Anonymous Partner" : don.name}
                          </span>
                          <span className="text-xs font-display font-black text-[#1e6f3d] shrink-0">
                            +${don.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 truncate">{don.campaign}</p>
                        <div className="flex items-center justify-between text-[9px] text-gray-400 pt-0.5">
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-500 uppercase">{don.recurring}</span>
                          <span>{don.date.split(",")[0]}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <span className="text-[10px] text-gray-400 font-sans italic block text-center">
                  Live synced with secure SQLite core database.
                </span>
              </div>
            </div>

            {/* Testimonial Panel */}
            <div className="bg-[#0f2c59] text-white rounded-3xl p-8 border border-[#0f2c59]/50 shadow-md relative overflow-hidden" id="donation-testimonial-card">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 shrink-0 pointer-events-none" />
              <div className="space-y-4 text-left relative">
                <Sparkles className="w-8 h-8 text-[#5CB815] fill-[#5CB815]" />
                <p className="text-sm font-sans italic leading-relaxed text-white/90">
                  "Before the outpost screening campsite in Mek'ele, child illness went undetected for long months. With the clinical equipment funded by direct public donations, my three children got examined, treated, and immunized right at school. It changed everything."
                </p>
                <div>
                  <h4 className="text-sm font-display font-black text-white">Helen Demissie</h4>
                  <span className="text-xs text-white/65">Mother of three, Mek'ele foothills</span>
                </div>
              </div>
            </div>

            {/* Integrity list */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150 text-left space-y-3" id="donation-integrity-widget">
              <span className="text-[9px] font-display font-black text-gray-400 uppercase tracking-wider block">Trust & Governance Standards</span>
              <ul className="text-xs text-gray-500 space-y-2.5 font-sans font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1e6f3d] shrink-0" />
                  <span>100% of public gifts go directly to local programs.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1e6f3d] shrink-0" />
                  <span>Transparent public ledgers published monthly.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1e6f3d] shrink-0" />
                  <span>Regulated NGO board oversight and annual audits.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}