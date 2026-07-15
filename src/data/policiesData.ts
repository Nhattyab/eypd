export interface PolicySection {
  title: string;
  type: "paragraph" | "bullets" | "numbered" | "quote";
  items: string[];
}

export interface PolicyItem {
  id: string;
  type: "policy" | "declaration" | "framework";
  badgeLabel: string;
  title: string;
  subtext: string;
  buttonLabel: string;
  pdfFilename: string;
  metaIssued: string;
  metaEndorsed?: string;
  sections: PolicySection[];
  content: string; // fallback summary content
}

export const policiesData: PolicyItem[] = [
  {
    id: "policy-1",
    type: "policy",
    badgeLabel: "POLICY",
    title: "EYPD Safeguarding & Child Protection Policy",
    subtext: "Adopted: January 2024 · Review: January 2026",
    buttonLabel: "Read Policy",
    pdfFilename: "📄 EYPD-Safeguarding-Policy-2024.pdf",
    metaIssued: " Approved by: EYPD Board",
    sections: [
      {
        title: "1. Purpose and Scope",
        type: "paragraph",
        items: [
          "This policy sets out EYPD's commitment to safeguarding all individuals — particularly children, young people, and vulnerable adults — who come into contact with our programs, staff, volunteers, and partners across Ethiopia."
        ]
      },
      {
        title: "2. Our Commitment",
        type: "bullets",
        items: [
          "All staff and volunteers undergo safeguarding training before deployment",
          "A designated Safeguarding Focal Point is appointed at all program sites",
          "All partners must comply with equivalent safeguarding standards",
          "Breaches result in disciplinary action, up to termination"
        ]
      },
      {
        title: "3. Reporting",
        type: "paragraph",
        items: [
          "Any safeguarding concern must be reported immediately to the Safeguarding Focal Point. Anonymous reports can be submitted via the Feedback and Complaints Mechanism. All reports are confidential and investigated promptly."
        ]
      }
    ],
    content: "This Safeguarding & Child Protection Policy outlines EYPD's zero-tolerance stance towards child exploitation, abuse, and harassment. All field volunteers, staff members, and third-party partners are required to undergo background checks and comply with our code of conduct during community health and educational outreach campaigns."
  },
  {
    id: "policy-2",
    type: "declaration",
    badgeLabel: "DECLARATION",
    title: "Youth Declaration on Peace and Inclusive Development",
    subtext: "Issued: Addis Forum 2025, Addis Ababa · April 26, 2025",
    buttonLabel: "Read Declaration",
    pdfFilename: "EYPD-Youth-Declaration-AddisForumm2025.pdf",
    metaIssued: "Issued: Addis Forum 2025, Addis Ababa · April 26, 2025",
    metaEndorsed: "Endorsed by 250+ delegates",
    sections: [
      {
        title: "Preamble",
        type: "paragraph",
        items: [
          "We, the youth delegates of Addis Forum 2025, gathered from all regions of Ethiopia, affirm our commitment to peace, justice, inclusive development, and the active participation of young people in shaping Ethiopia's future."
        ]
      },
      {
        title: "We Declare That:",
        type: "bullets",
        items: [
          "Youth are not beneficiaries of peace — we are its architects and defenders",
          "No sustainable development is possible without meaningful youth inclusion in decision-making",
          "Livelihoods, peace, and community stability are inseparable for Ethiopian youth",
          "Climate resilience and humanitarian response are youth issues — and must be treated as such in national policy"
        ]
      },
      {
        title: "Our Commitment",
        type: "paragraph",
        items: [
          "We commit to carrying this declaration beyond the forum — into our communities, our organizations, and our daily work for a more just and peaceful Ethiopia."
        ]
      }
    ],
    content: "The Youth Declaration on Peace and Inclusive Development serves as our fundamental advocacy framework. Drafted in collaboration with over 250 municipal youth leaders, it demands equal access to political processes, modern vocational training, and green economic empowerment throughout East African regions."
  },
  {
    id: "policy-3",
    type: "framework",
    badgeLabel: "FRAMEWORK",
    title: "Gender Equality & Social Inclusion (GESI) Framework",
    subtext: "Adopted: June 2023 · Review: June 2025",
    buttonLabel: "Read Framework",
    pdfFilename: "EYPD-GESI-Framework-2023.pdf",
    metaIssued: "Adopted: June 2023 · Review: June 2025 ",
    metaEndorsed: "· Applies to: All Programs",
    sections: [
      {
        title: "Introduction",
        type: "paragraph",
        items: [
          "EYPD's GESI Framework provides the principles, standards, and minimum requirements for integrating gender equality and social inclusion across all programs, partnerships, and internal operations."
        ]
      },
      {
        title: "Core Principles",
        type: "bullets",
        items: [
          "Gender Equality: Equal rights and opportunities for all gender identities",
          "Social Inclusion: Meaningful participation of marginalized groups including people with disabilities and displaced communities",
          "Do No Harm: Programs must not deepen existing inequalities",
          "Accountability: Regular GESI outcome reporting across all programs"
          ]
      }
    ],
    content: "The Gender Equality & Social Inclusion (GESI) Framework guarantees that all our water purification, medical assistance, and scholarship initiatives maintain a strict minimum of 50% female leadership representation and actively accommodate marginalized social groups."
  },
  {
    id: "policy-4",
    type: "policy",
    badgeLabel: "POLICY",
    title: "Complaints, Feedback & Accountability Mechanism",
    subtext: "Adopted: March 2023 · Currently Active",
    buttonLabel: "Read Policy",
    pdfFilename: "📄 EYPD-Complaints-Mechanism-2023.pdf",
    metaIssued: "Adopted: March 2023 · Currently Active",
    metaEndorsed: "· Focal Point: EYPD Program Manager",
    sections: [
      {
        title: "Purpose",
        type: "paragraph",
        items: [
          "This mechanism establishes accessible, safe, and transparent channels for community members, partners, staff, and all stakeholders to submit feedback, raise concerns, and make complaints.",
        ]
      },
      {
        title: "How to Submit",
        type: "bullets",
        items: [
          "In person: At any EYPD site through the Feedback Focal Point",
          "By email: feedback@eypd.org",
          "Anonymous: Via feedback box at program sites"
        ]
      },
      {
        title: "Response Commitment",
        type: "paragraph",
        items: [
          "EYPD acknowledges all complaints within 5 working days and resolves or escalates within 20 working days. Retaliation against anyone who raises a concern in good faith is strictly prohibited."
        ]
      }
    ],
    content: "The Complaints, Feedback & Accountability Mechanism provides local community members with anonymous physical drop-boxes and a secure toll-free hotline to report project delays, fund misappropriations, or unethical conduct. Reports are analyzed independently within 72 hours."
  },
  {
    id: "policy-5",
    type: "framework",
    badgeLabel: "FRAMEWORK",
    title: "Do No Harm & Conflict Sensitivity Framework",
    subtext: "Adopted: September 2022 · Review: September 2024",
    buttonLabel: "Read Framework",
    pdfFilename: "📄 EYPD-DoNoHarm-Framework-2022.pdf",
    metaIssued: "Adopted: September 2022 · Review: September 2024",
    metaEndorsed: "· Applies to: All Programs",
    sections: [
      {
        title: "Introduction",
        type: "paragraph",
        items: [
          "EYPD operates in complex, conflict-affected contexts. This framework ensures that programs do not inadvertently fuel conflict, deepen divisions, or cause harm to the communities we serve."
        ]
      },
      {
        title: "Key Principles",
        type: "bullets",
        items: [
          "Conduct conflict analysis before program design in all contexts",
          "Ensure equitable and impartial access to EYPD services",
          "Engage community leadership in program planning",
          "Monitor regularly for unintended negative effects",
          "Adapt rapidly when conflict dynamics shift"
          ]
      }
    ],
    content: "The Do No Harm Framework establishes structured neutral community impact assessments prior to drilling water wells or distributing resources in politically sensitive areas. This ensures aid acts as a bridge for peace, never a driver of localized conflict."
  },
  {
    id: "policy-6",
    type: "policy",
    badgeLabel: "POLICY",
    title: "Anti-Corruption & Financial Integrity Policy",
    subtext: "Adopted: January 2024 · Review: January 2026",
    buttonLabel: "Read Document",
    pdfFilename: "📄 EYPD-AntiCorruption-Policy-2024.pdf",
    metaIssued: "Adopted: January 2024 · Review: January 2026",
    metaEndorsed: "· Applies to: All Staff and Partners",
    sections: [
      {
        title: "Statement",
        type: "paragraph",
        items: [
          "EYPD has zero tolerance for corruption, bribery, fraud, or any financial misconduct. This policy sets out obligations of all staff, volunteers, consultants, and partners."
        ]
      },
      {
        title: "Prohibited Conduct",
        type: "bullets",
        items: [
          "Offering or accepting bribes or kickbacks in any form",
          "Misappropriation of organizational or donor funds",
          "Falsification of financial records or expense claims",
          "Undisclosed conflicts of interest in procurement decisions"
        ]
      },
      {
        title: "Reporting",
        type: "paragraph",
        items: [
          "Any suspected breach must be reported immediately to EYPD management or via the anonymous Complaints Mechanism. Confirmed breaches result in termination and potential legal referral."
        ]
      }
    ],
    content: "The Anti-Corruption & Financial Integrity Policy enforces complete transparency across all global donor contributions. We mandate public financial ledgers, require dual-signature authorization for all project expenditures exceeding $500, and enforce annual third-party fiscal audits."
  }
];