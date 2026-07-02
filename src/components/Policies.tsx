import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, ArrowRight, X } from "lucide-react";

interface PolicyItem {
  id: string;
  type: "policy" | "declaration" | "framework";
  badgeLabel: string;
  title: string;
  subtext: string;
  buttonLabel: string;
  content: string; // The mock content to display in a simulated reading view/modal
}

const policiesData: PolicyItem[] = [
  {
    id: "policy-1",
    type: "policy",
    badgeLabel: "POLICY",
    title: "EYPD Safeguarding & Child Protection Policy",
    subtext: "Adopted: January 2024 · Review: January 2026",
    buttonLabel: "Read Document",
    content: "This Safeguarding & Child Protection Policy outlines EYPD's zero-tolerance stance towards child exploitation, abuse, and harassment. All field volunteers, staff members, and third-party partners are required to undergo background checks and comply with our code of conduct during community health and educational outreach campaigns."
  },
  {
    id: "policy-2",
    type: "declaration",
    badgeLabel: "DECLARATION",
    title: "Youth Declaration on Peace and Inclusive Development",
    subtext: "Issued: Addis Forum 2025 · April 2025",
    buttonLabel: "Read Declaration",
    content: "The Youth Declaration on Peace and Inclusive Development serves as our fundamental advocacy framework. Drafted in collaboration with over 250 municipal youth leaders, it demands equal access to political processes, modern vocational training, and green economic empowerment throughout East African regions."
  },
  {
    id: "policy-3",
    type: "framework",
    badgeLabel: "FRAMEWORK",
    title: "Gender Equality & Social Inclusion (GESI) Framework",
    subtext: "Adopted: June 2023 · Review: June 2025",
    buttonLabel: "Read Framework",
    content: "The Gender Equality & Social Inclusion (GESI) Framework guarantees that all our water purification, medical assistance, and scholarship initiatives maintain a strict minimum of 50% female leadership representation and actively accommodate marginalized social groups."
  },
  {
    id: "policy-4",
    type: "policy",
    badgeLabel: "POLICY",
    title: "Complaints, Feedback & Accountability Mechanism",
    subtext: "Adopted: March 2023 · Currently Active",
    buttonLabel: "Read Document",
    content: "The Complaints, Feedback & Accountability Mechanism provides local community members with anonymous physical drop-boxes and a secure toll-free hotline to report project delays, fund misappropriations, or unethical conduct. Reports are analyzed independently within 72 hours."
  },
  {
    id: "policy-5",
    type: "framework",
    badgeLabel: "FRAMEWORK",
    title: "Do No Harm & Conflict Sensitivity Framework",
    subtext: "Adopted: September 2022 · Review: 2024",
    buttonLabel: "Read Framework",
    content: "The Do No Harm Framework establishes structured neutral community impact assessments prior to drilling water wells or distributing resources in politically sensitive areas. This ensures aid acts as a bridge for peace, never a driver of localized conflict."
  },
  {
    id: "policy-6",
    type: "policy",
    badgeLabel: "POLICY",
    title: "Anti-Corruption & Financial Integrity Policy",
    subtext: "Adopted: January 2024 · Review: January 2026",
    buttonLabel: "Read Document",
    content: "The Anti-Corruption & Financial Integrity Policy enforces complete transparency across all global donor contributions. We mandate public financial ledgers, require dual-signature authorization for all project expenditures exceeding $500, and enforce annual third-party fiscal audits."
  }
];

export default function Policies() {
  const [activePolicy, setActivePolicy] = useState<PolicyItem | null>(null);

  const getBadgeStyles = (type: PolicyItem["type"]) => {
    switch (type) {
      case "policy":
        return "bg-[#ecf7ed] text-[#4d8652] border-[#ecf7ed]";
      case "declaration":
        return "bg-[#f0f1fa] text-[#5560b4] border-[#f0f1fa]";
      case "framework":
        return "bg-[#fef7eb] text-[#c98e2a] border-[#fef7eb]";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-14 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] z-0 relative overflow-hidden" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-3xl">
            <span className="font-display font-black text-[#16a34a] uppercase tracking-wider text-xs sm:text-sm">
              POLICIES & DOCUMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white leading-tight tracking-tight mt-2">
              Our Policies, Declarations & Frameworks
            </h2>
            <p className="text-base text-gray-500 font-sans mt-3">
              EYPD is committed to transparency and principled practice. Access our governance documents, policy positions, and declarations here.
            </p>
          </div>

          <a  
            className="inline-flex items-center gap-1 text-sm font-display font-black text-[#16a34a] hover:text-white transition-all self-start md:self-end mt-2 md:mt-0 cursor-pointer border-b-2 border-transparent hover:border-[#1e6f3d]"
          >
            <span>All Documents</span>
            <span className="text-base">→</span>
          </a>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Grid representing the 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="policies-grid">
          {policiesData.map((policy) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#f0eded] rounded-[20px] p-4 border border-gray-200/90 shadow-none hover:shadow-sm hover:border-gray-300 transition-all duration-300 flex flex-col justify-between items-start min-h-[180px]"
              id={`policy-card-${policy.id}`}
            >
              {/* Card top */}
              <div className="space-y-4 w-full">
                {/* Badge Label */}
                <span className={`inline-block text-[10px] font-display font-black uppercase tracking-wider px-3.5 py-1 rounded-md border ${getBadgeStyles(policy.type)}`}>
                  {policy.badgeLabel}
                </span>

                {/* Title */}
                <h3 className="font-display font-black text-lg sm:text-xl text-[#0f2c59] leading-snug hover:text-[#1e6f3d] transition-colors">
                  {policy.title}
                </h3>

                {/* Subtext Date Metadata */}
                <p className="text-xs sm:text-sm text-gray-400 font-sans font-medium">
                  {policy.subtext}
                </p>
              </div>

              {/* Action Button styled as shown in image: white background, thin dark green border and green text with sheet icon */}
              <button
                onClick={() => setActivePolicy(policy)}
                className="mt-1 inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-[#1e6f3d]/60 hover:border-[#1e6f3d] text-[#1e6f3d] font-display font-black text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer shadow-sm"
                id={`policy-read-btn-${policy.id}`}
              >
                {/* Custom-styled small folded sheet icon mimicking document layout */}
                <span className="text-sm">📄</span>
                <span>{policy.buttonLabel}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>    
      </div>

      {/* Simulated Document Reader Modal Dialog overlay */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon Button */}
              <button
                onClick={() => setActivePolicy(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-4 pt-2">
                <span className={`inline-block text-[10px] font-display font-black uppercase tracking-wider px-3 py-0.5 rounded-full border ${getBadgeStyles(activePolicy.type)}`}>
                  {activePolicy.badgeLabel}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-display font-black text-[#0a1118] leading-snug pr-8">
                  {activePolicy.title}
                </h3>

                <p className="text-xs text-gray-400 font-sans">
                  {activePolicy.subtext}
                </p>

                <hr className="border-gray-100 my-4" />

                <div className="space-y-4">
                  <h4 className="font-display font-black text-sm text-[#0a1118] uppercase tracking-wider">
                    Executive Summary & Framework Details
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                    {activePolicy.content}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans bg-gray-50 p-4 rounded-xl border border-gray-100">
                    *Note: This is a digitized interactive framework summary. To acquire signed corporate certificates or localized field templates of our operations, please reach out directly via our email channel at <strong>info@exmple.com</strong>.
                  </p>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={() => setActivePolicy(null)}
                    className="px-6 py-2.5 bg-[#0a1118] hover:bg-[#478b1b] text-white font-display font-black text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Close Document
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
