import React, { useState } from "react";
import { Campaign } from "../types";
import { X, CreditCard, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, campaignTitle: string) => void;
}

export default function CheckoutModal({ campaign, isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [amount, setAmount] = useState<number>(30);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!campaign || !isOpen) return null;

  const quickAmounts = [15, 30, 50, 100, 250];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) return;

    setIsSubmitting(true);

    // Simulate payment gateway delay
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(amount, campaign.title);
      // Reset form fields
      setDonorName("");
      setDonorEmail("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black"
          id="modal-backdrop"
        />

        {/* Modal body */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden z-10 border border-border-main"
          id="checkout-modal-body"
        >
          {/* Header */}
          <div className="bg-secondary p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <h3 className="font-display font-bold text-lg text-white">
                Sponsor Campaign
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full text-white/80 transition-colors"
              id="close-modal-btn"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto" id="checkout-modal-form">
            {/* Selected Campaign Description info banner */}
            <div className="bg-surface-main p-4 rounded-2xl border border-border-main flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-secondary">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-display font-bold text-primary uppercase block">Target Project</span>
                <h4 className="font-display font-bold text-xs text-secondary leading-snug line-clamp-2">
                  {campaign.title}
                </h4>
              </div>
            </div>

            {/* Quick Amount Choices */}
            <div className="space-y-2">
              <label className="text-xs font-display font-bold text-secondary uppercase block">
                Select Sponsoring Amount
              </label>
              <div className="grid grid-cols-5 gap-2" id="modal-amounts-grid">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all duration-200 text-center ${
                      amount === amt
                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                        : "bg-surface-main hover:bg-border-main text-secondary"
                    }`}
                    id={`modal-amount-${amt}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom inputs */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-display font-bold text-xs">
                Custom $
              </span>
              <input
                type="number"
                min={1}
                placeholder="Other Amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-surface-main border border-border-main rounded-xl py-3 pl-14 pr-4 font-display font-semibold text-secondary placeholder-text-light text-xs sm:text-sm focus:outline-none focus:border-primary focus:bg-white"
                id="modal-custom-amount-input"
              />
            </div>

            {/* Donor info */}
            <div className="space-y-3 pt-2 border-t border-border-main">
              <h4 className="font-display font-extrabold text-xs text-secondary uppercase block tracking-wider">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-display font-bold text-text-muted uppercase block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white"
                    id="modal-name-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-display font-bold text-text-muted uppercase block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="janedoe@email.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white"
                    id="modal-email-input"
                  />
                </div>
              </div>
            </div>

            {/* Card Information */}
            <div className="space-y-3 pt-2 border-t border-border-main">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-xs text-secondary uppercase block tracking-wider">
                  Payment Details
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-primary font-display font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SECURE SSL</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <CreditCard className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-surface-main border border-border-main rounded-xl py-3 pl-10 pr-4 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white"
                  id="modal-card-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white text-center"
                  id="modal-expiry-input"
                />
                <input
                  type="password"
                  required
                  maxLength={4}
                  placeholder="CVC"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  className="w-full bg-surface-main border border-border-main rounded-xl p-3 text-xs text-secondary focus:outline-none focus:border-primary focus:bg-white text-center"
                  id="modal-cvc-input"
                />
              </div>
            </div>

            {/* Sponsoring Button or Loader */}
            <button
              type="submit"
              disabled={isSubmitting || amount <= 0}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:hover:bg-primary text-white font-display font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer shadow-lg hover:shadow-primary/15"
              id="modal-pay-submit-btn"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing Sponsoring...</span>
                </div>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  <span>Sponsor ${amount.toLocaleString()} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
