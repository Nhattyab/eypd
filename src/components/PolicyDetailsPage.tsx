import React from "react";
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PolicyItem } from "../data/policiesData";

interface PolicyDetailsPageProps {
  policy: PolicyItem;
  onBack: () => void;
  addToast?: (type: "success" | "info" | "warning" | "error", title: string, message: string) => void;
}

export default function PolicyDetailsPage({ policy, onBack, addToast }: PolicyDetailsPageProps) {
  
  const handleDownloadPDF = () => {
    // Simulate successful download
    if (addToast) {
      addToast(
        "success",
        "Document Download Initiated",
        `Downloading "${policy.pdfFilename}" successfully!`
      );
    }
    
    // Create a temporary link to download raw text content as mock PDF data
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
    link.setAttribute("download", policy.pdfFilename.replace(".pdf", ".txt")); // safe text file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <div className="bg-white min-h-screen" id="policy-details-page">
      {/* Top Banner with back button */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-4 mb-8" id="policy-details-header-banner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-gray-600 hover:text-[#1e6f3d] transition-all cursor-pointer select-none"
            id="policy-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Policies</span>
          </button>
          
          <span className="text-xs font-mono text-gray-400">
            SECURE REPOSITORY // OFFICIAL DOCUMENT
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 " id="policy-details-content-wrapper">
        {/* Category Badge matching the small top declaration indicator in the image */}
        <div className="mb-4" id="policy-detail-badge-row">
          <span className={`inline-block text-[11px] font-sans font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${getBadgeStyles(policy.type)}`}>
            {policy.badgeLabel}
          </span>
        </div>

        {/* Title exactly formatted with large font */}
        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#0f2c59] tracking-tight leading-[1.1] mb-4"
          id="policy-detail-title"
        >
          {policy.title}
        </h1>

        {/* Small metadata subtitle below title */}
        <div className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6" id="policy-detail-metadata">
          {policy.metaIssued}
          {policy.metaEndorsed && (
            <>
              <span className="mx-2 text-gray-300">·</span>
              <span>{policy.metaEndorsed}</span>
            </>
          )}
        </div>

        {/* Horizontal thin separator */}
        <hr className="border-gray-200 my-6" />

        {/* PDF Box - exactly designed like the attached image */}
        <div 
          className="bg-[#f0f9f4] border border-[#d1ebd9] rounded-2xl p-5 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          id="policy-download-panel"
        >
          <div className="flex items-center gap-3.5">
            {/* Visual Custom PDF Page icon imitating the one in the screenshot */}
            <div className="relative w-11 h-12 flex-shrink-0 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex items-center justify-center">
              {/* Corner fold simulation */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#f3d4dc] border-l border-b border-gray-200 rounded-bl-sm"></div>
              {/* Small accent bar mimicking pdf colors */}
              <div className="w-1.5 h-1.5 bg-[#478b1b] rounded-full absolute bottom-2.5 left-2.5"></div>
              <FileText className="w-5 h-5 text-gray-400 mt-1" />
            </div>
            
            <span className="font-sans font-bold text-[#2c6e49] text-sm sm:text-base break-all hover:underline cursor-pointer">
              {policy.pdfFilename}
            </span>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-[#2c6e49] hover:bg-[#1e4e32] text-white font-sans font-bold text-xs sm:text-sm py-3 px-6 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap select-none"
            id="policy-pdf-download-btn"
          >
            <span>↓ Download PDF</span>
          </button>
        </div>

        {/* Main Body structured dynamically based on sections */}
        <div className="prose max-w-none text-gray-800 space-y-8 font-sans" id="policy-body-content">
          
          {policy.sections.map((section, sIdx) => {
            return (
              <div 
                key={sIdx} 
                className={`space-y-4 ${section.type === "quote" ? "pt-2 pb-2" : ""}`} 
                id={`policy-section-${sIdx}`}
              >
                <h2 className="text-xl sm:text-2xl font-black text-[#0f2c59] tracking-tight">
                  {section.title}
                </h2>
                
                {section.type === "paragraph" && (
                  <div className="space-y-3">
                    {section.items.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {section.type === "bullets" && (
                  <ul className="space-y-3.5 pl-1" id={`policy-bullets-${sIdx}`}>
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                        <span className="text-[#2c6e49] text-lg leading-none mt-1 select-none flex-shrink-0">•</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "numbered" && (
                  <ol className="space-y-3.5 pl-1 list-none" id={`policy-numbered-${sIdx}`}>
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f0f9f4] text-[#2c6e49] text-xs font-bold font-mono flex-shrink-0 select-none mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="font-medium pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {section.type === "quote" && (
                  <div className="border-l-4 border-[#2c6e49] pl-4 py-1.5 bg-[#fcfdfd] italic text-base sm:text-lg text-[#2c6e49] font-sans font-semibold rounded-r-lg">
                    {section.items.map((q, qIdx) => (
                      <p key={qIdx} className="leading-relaxed">{q}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Official Seals Info or Stamp */}
          <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6" id="policy-seal-stamps" />

        </div>
      </div>
    </div>
  );
}