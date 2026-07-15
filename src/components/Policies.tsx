import React from "react";
import { motion } from "motion/react";
import { policiesData, PolicyItem } from "../data/policiesData";

interface PoliciesProps {
  onPolicySelect: (policy: PolicyItem) => void;
}

export default function Policies({ onPolicySelect }: PoliciesProps) {

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
                <h4 className="font-display font-black text-base sm:text-md text-[#0f2c59] leading-snug hover:text-[#1e6f3d] transition-colors">
                  {policy.title}
                </h4>

                {/* Subtext Date Metadata */}
                <p className="text-xs sm:text-sm text-gray-400 font-sans font-medium">
                  {policy.subtext}
                </p>
              </div>

              {/* Action Button styled as shown in image: white background, thin dark green border and green text with sheet icon */}
              <button
                onClick={() => onPolicySelect(policy)}
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
    </section>
  );
}
