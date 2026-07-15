import React, { useState } from "react";
import { DollarSign, ArrowRight, Heart } from "lucide-react";
import { motion } from "motion/react";

interface DonationWidgetProps {
  onDonateSubmit: (amount: number, isKidSupport: boolean) => void;
}

export default function DonationWidget({ onDonateSubmit }: DonationWidgetProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(30);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [currentRaised, setCurrentRaised] = useState(25000);
  const goalAmount = 100000;

  const quickAmounts = [10, 20, 30, 40, 50];

  const handleQuickSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount !== null ? selectedAmount : parseInt(customAmount) || 0;
    if (finalAmount <= 0) return;

    onDonateSubmit(finalAmount, true);
    // Update live counter locally for fun user feedback!
    setCurrentRaised((prev) => prev + finalAmount);
    setCustomAmount("");
    setSelectedAmount(30);
  };

  const percentage = Math.min(Math.round((currentRaised / goalAmount) * 100), 100);

  return (
    <div
      className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-border-main"
      id="donation-widget-card"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Custom Donate Form */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] z-0 text-white flex flex-col justify-between" id="donation-widget-left">
          <div>
            <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-xs font-display font-semibold uppercase px-3 py-1 rounded-full mb-3">
              Make a Donation
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mb-6 leading-tight">
              Choose an amount 
            </h3>

            {/* Quick Select Grid */}
            <div className="grid grid-cols-5 gap-2 mb-6" id="quick-donation-grid">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleQuickSelect(amount)}
                  className={`py-3 px-1 rounded-xl font-display font-semibold text-sm transition-all duration-200 text-center ${
                    selectedAmount === amount
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                  id={`quick-donate-${amount}`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom Amount Form */}
            <form onSubmit={handleSubmit} className="space-y-4" id="custom-donation-form">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-display font-bold">
                  $
                </span>
                <input
                  type="text"
                  placeholder="Enter custom amount..."
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-8 pr-4 font-display font-semibold text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  id="custom-donate-input"
                />
              </div>

              <button
                type="submit"
                disabled
                // disabled={(selectedAmount === null && !customAmount)}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:hover:bg-primary text-white font-display font-bold py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-primary/10"
                id="submit-donation-btn"
              >
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          <p className="text-xs text-white/50 mt-6 leading-relaxed">
            🔒 Secure · Tax receipt provided · All currencies accepted
          </p>
        </div>

        {/* Right Side: Support Kids raised tracker */}
        <div className="p-8 sm:p-10 bg-surface-main flex flex-col justify-between" id="donation-widget-right">
          <div>
            <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-display font-semibold uppercase px-3 py-1 rounded-full mb-3">
              Support Our Work
            </span>
            <h3 className="text-2xl font-display font-extrabold text-secondary mb-4 leading-tight">
              Your Support Moves Ethiopia Forward
            </h3>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              Every contribution directly funds youth leadership programs, peace initiatives, livelihoods support, and community resilience work across Ethiopia.
            </p>

            {/* Progress Container */}
            <div className="space-y-4" id="tracker-progress-container">
              <div className="flex items-center justify-between text-xs font-display font-bold text-secondary">
                <span>PROGRESS</span>
                <span className="text-primary font-mono text-sm">{percentage}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-4 bg-border-main rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full relative"
                >
                  {/* Subtle pulsing animation overlay */}
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-3 rounded-xl border border-border-main shadow-sm">
                  <span className="text-[10px] font-display font-bold text-text-muted uppercase block tracking-wider">
                    Total Raised
                  </span>
                  <span className="text-lg font-display font-black text-secondary">
                    ${currentRaised.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-border-main shadow-sm">
                  <span className="text-[10px] font-display font-bold text-text-muted uppercase block tracking-wider">
                    Target Goal
                  </span>
                  <span className="text-lg font-display font-black text-secondary">
                    ${goalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
