import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, FileText, ArrowRight, BookOpen, Layers, Award, ShieldAlert, Download } from "lucide-react";
import { policiesData, PolicyItem } from "../data/policiesData";

interface ResourcesPageProps {
  onPolicySelect: (policy: PolicyItem) => void;
  onBackToHome: () => void;
  addToast?: (type: "success" | "info" | "warning" | "error", title: string, message: string) => void;
}

export default function ResourcesPage({ onPolicySelect, onBackToHome, addToast }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "policy" | "declaration" | "framework">("all");

  const filteredPolicies = useMemo(() => {
    return policiesData.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.badgeLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "all" || policy.type === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleDownloadPDF = (policy: PolicyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addToast) {
      addToast(
        "success",
        "Document Download Initiated",
        `Downloading "${policy.pdfFilename}" successfully!`
      );
    }

    const contentText = `
${policy.badgeLabel}: ${policy.title}
${policy.metaIssued}
${policy.metaEndorsed || ""}

--------------------------------------------------

${policy.sections.map((section) => {
  const itemsText = section.type === "bullets" 
    ? section.items.map((it) => `• ${it}`).join("\n")
    : section.type === "numbered"
    ? section.items.map((it, idx) => `${idx + 1}. ${it}`).join("\n")
    : section.items.join("\n\n");
  return `${section.title.toUpperCase()}\n${itemsText}`;
}).join("\n\n--------------------------------------------------\n\n")}

EYPD Governance Document - Certified & Authenticated
--------------------------------------------------
    `;

    const blob = new Blob([contentText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", policy.pdfFilename.replace(".pdf", ".txt"));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeStyles = (type: PolicyItem["type"]) => {
    switch (type) {
      case "policy":
        return "bg-[#ecf7ed] text-[#4d8652] border-[#ecf7ed]/50";
      case "declaration":
        return "bg-[#f0f1fa] text-[#5560b4] border-[#f0f1fa]/50";
      case "framework":
        return "bg-[#fef7eb] text-[#c98e2a] border-[#fef7eb]/50";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16" id="resources-page-container"> 
        {/* Hero Banner */}
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
            Resources
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <button
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Resources
            </button>
          </div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto pt-16">
        {/* Search and Filters Hub */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-6 mb-12 space-y-6" id="resources-search-filters-card">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Box */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, policy names, or key terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-[#1e6f3d] placeholder-gray-400 font-sans transition-all"
                id="resources-search-input"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#0f2c59] text-white shadow-md"
                    : "bg-[#f8fafc] text-gray-600 hover:bg-gray-100 border border-gray-150"
                }`}
              >
                All Resources ({policiesData.length})
              </button>
              <button
                onClick={() => setActiveFilter("policy")}
                className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "policy"
                    ? "bg-[#1e6f3d] text-white shadow-md"
                    : "bg-[#f8fafc] text-gray-600 hover:bg-gray-100 border border-gray-150"
                }`}
              >
                Policies
              </button>
              <button
                onClick={() => setActiveFilter("declaration")}
                className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "declaration"
                    ? "bg-[#5560b4] text-white shadow-md"
                    : "bg-[#f8fafc] text-gray-600 hover:bg-gray-100 border border-gray-150"
                }`}
              >
                Declarations
              </button>
              <button
                onClick={() => setActiveFilter("framework")}
                className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "framework"
                    ? "bg-[#c98e2a] text-white shadow-md"
                    : "bg-[#f8fafc] text-gray-600 hover:bg-gray-100 border border-gray-150"
                }`}
              >
                Frameworks
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid List */}
        {filteredPolicies.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200/60" id="resources-empty-state">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
            <p className="text-lg font-bold text-gray-600">No matching resources found</p>
            <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              We couldn't find any governance documents matching your search. Try using other keywords or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-6 inline-flex items-center gap-1.5 px-6 py-3 bg-[#0f2c59] hover:bg-[#1e6f3d] text-white font-sans font-bold text-xs rounded-full transition-all shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="resources-results-grid">
            {filteredPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between gap-6"
                id={`resource-full-card-${policy.id}`}
              >
                <div className="space-y-4 text-left">
                  {/* Category and Date row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block text-[10px] font-display font-black uppercase tracking-wider px-3 py-1 rounded-md border ${getBadgeStyles(policy.type)}`}>
                      {policy.badgeLabel}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{policy.subtext.split("·")[0].trim()}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-lg sm:text-xl text-[#0f2c59] leading-tight hover:text-[#1e6f3d] transition-colors cursor-pointer" onClick={() => onPolicySelect(policy)}>
                    {policy.title}
                  </h3>

                  {/* Fallback details content */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {policy.content}
                  </p>

                  {/* Inside section items preview */}
                  <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-150/60 text-xs text-gray-500 space-y-2">
                    <span className="font-bold text-gray-700 block uppercase tracking-wider text-[9px]">Document Preview ({policy.sections.length} Sections)</span>
                    <div className="divide-y divide-gray-100">
                      {policy.sections.slice(0, 2).map((section, idx) => (
                        <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate text-gray-600 font-medium">{section.title}</span>
                        </div>
                      ))}
                      {policy.sections.length > 2 && (
                        <div className="py-1.5 text-gray-400 italic text-[10px]">+ {policy.sections.length - 2} additional chapters</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3">
                  <button
                    onClick={() => onPolicySelect(policy)}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-orimary/5 border border-[#1e6f3d]/50 hover:border-[#1e6f3d] text-white font-display font-black text-xs py-3 px-5 rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <span>📄 Read Document</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleDownloadPDF(policy, e)}
                    className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-display font-black text-xs py-3 px-4.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                    title="Download Plain-Text PDF backup"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
