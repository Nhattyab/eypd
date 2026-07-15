// Blog Data for Charitics App
export interface DetailedBlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  location:string;
  category: string;
  image: string;
  author: string;
  content: string[];
  lastparagraph: string;
  quote: string;
  tags: string[];
}

// @ts-ignore
import imgChildren from "../assets/images/quality_education_1782473853014.jpg";
// @ts-ignore
import imgElder from "../assets/images/elder_man_blanket_1782474613376.jpg";
// @ts-ignore
import imgPureWater from "../assets/images/pure_drinking_water_1782473834335.jpg";
// @ts-ignore
import imgHandsHeart from "../assets/images/hands_holding_heart_1782473086845.jpg";
// @ts-ignore
import imgMedical from "../assets/images/medical_treatment_help_1782473815510.jpg";
// @ts-ignore
import imgVolunteers from "../assets/images/volunteer_food_delivery_1782474593369.jpg";

export const categoriesWithCounts = [
  { name: "Charity", count: "08" },
  { name: "Crowdfunding", count: "11" },
  { name: "Industries", count: "18" },
  { name: "Innovations", count: "11" },
  { name: "Technology", count: "07" }
];

export const tagCloudList = [
  "Crowdfunding",
  "Innovations",
  "Justice",
  "Lead",
  "Startup",
  "Technology",
  "Market",
  "Court"
];

export const initialBlogs: DetailedBlogPost[] = [
  {
    id: "blog-1",
    title: "The Water Changed Everything — Voices from Jewi Settlement",
    excerpt: "When clean water finally reached the settlement, it was not just a resource. For the women of Jewi, it was the beginning of a new chapter entirely....",
    date: "12, May ",
    location: "Gambella Region",
    category: "story",
    image: imgChildren || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: "EYPD Communications",
    tags: [],
    quote: "When the water came close — when it was here, in our community — I felt something shift. Not just in my day. In my thinking. Like something was possible.",
    content: [
      "For Nyakim, a 34-year-old mother of four in Jewi refugee settlement, the daily walk for water once meant hours away from her children, from her small vegetable garden, from everything that anchored her day. That walk — in heat, sometimes through insecurity — was a tax on her time that she could never afford to stop paying.",
      '"I would wake before the sun," she says, sitting outside her shelter in Jewi. And sometimes I would come back and still it was not enough."'
    ],
    lastparagraph: "The installation of a new water point at Jewi Settlement, supported through EYPD's partnership with Oxfam Italy, is one of several interventions documented as part of the Beyond Stillness project — a storytelling and advocacy initiative collecting voices and field evidence from Gambella's displacement-affected communities."
  },
  {
    id: "blog-2",
    title: "Addis Forum 2025 Convenes 250+ Youth Leaders from Across Ethiopia",
    excerpt: "EYPD hosted its flagship national youth gathering, drawing delegates from all regions and key government collaborators....",
    date: "28, April ",
    location: "Adiss Ababa",
    category: "News",
    image: imgChildren || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: " EYPD Press Release",
    tags: [],
    quote: '"This is not a conference. This is a commitment. Every young person who walks through these doors is choosing to be part of the solution for Ethiopia."',
    content: [
      "On April 25–26, 2025, EYPD convened Addis Forum — its flagship national youth gathering — in Addis Ababa, drawing over 250 delegates from all regions of Ethiopia. Collaborating bodies included the Ministry of Women and Social Affairs (MoWSA) and the Adwa Victory Memorial Museum."
    ],
    lastparagraph: "Sessions focused on youth-led approaches to peace, economic resilience, climate adaptation, and civic engagement, with structured dialogue and peer-learning exchanges designed to translate conversation into action plans."
  },
  {
    id: "blog-3",
    title: "EYPD Calls for Greater Youth Inclusion in Ethiopia's National Dialogue Process",
    excerpt: "EYPD releases formal statement urging structured youth representation in ongoing national reconciliation efforts...",
    date: "15, March ",
    location: "Adiss Ababa",
    category: "Press Release",
    image: imgChildren || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: " EYPD Statement",
    tags: [],
    quote: '"Young people are not observers of this dialogue. We are its most directly affected constituency. Our exclusion from the process is not just a procedural failure — it is a risk to peace itself."',
    content: [
      "EYPD today released a formal statement calling on the National Dialogue Commission and relevant government bodies to establish structured, meaningful mechanisms for youth participation in Ethiopia's ongoing national reconciliation and dialogue process."
    ],
    lastparagraph: "The statement outlines specific recommendations for youth representation, including the establishment of a Youth Advisory Panel to the National Dialogue Commission and the inclusion of youth civil society organizations in formal consultation processes."
  },
  {
    id: "blog-4",
    title: "Youth Climate Resilience Must Be a National Priority — EYPD Position Paper",
    excerpt: "EYPD launches its advocacy campaign linking climate resilience, youth livelihoods, and community-led adaptation across Ethiopia...",
    date: "25, February ",
    location: "Adiss Ababa",
    category: "Advocacy Message",
    image: imgChildren || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: " · EYPD Advocacy Unit",
    tags: [],
    quote: '"Climate change is not an abstract future risk for Ethiopian youth — it is destroying livelihoods, displacing families, and fueling conflict today. Our response must match the urgency."',
    content: [
      "EYPD has launched its 2025 advocacy campaign linking climate resilience, youth livelihoods, and community-led adaptation across Ethiopia, calling on government and international partners to prioritize youth-centered climate programming in national development plans."
    ],
    lastparagraph: "The campaign includes a position paper, community consultations across four regions, and a digital advocacy series amplifying youth voices on the frontlines of Ethiopia's climate crisis."
  },
  {
    id: "blog-5",
    title: "From Conflict to Community — One Youth Leader's Journey in Tigray",
    excerpt: "How one young woman used EYPD's leadership program to rebuild her community after years of displacement and loss...",
    date: "2025, January ",
    location: "Tigray Region",
    category: "Story",
    image: imgChildren || "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: "EYPD Communications",
    tags: [],
    quote: '"I knew what it felt like to have nothing. That made me very clear about what other people needed."',
    content: [
      "Mekdes had not planned to become a community leader. At 24, she had spent the better part of three years navigating displacement, loss, and the slow, difficult work of rebuilding her life in Tigray after the conflict. What EYPD's leadership program gave her was not a title — it was a framework for turning what she had survived into something she could offer others."
    ],
    lastparagraph: "Today Mekdes facilitates two EYPD community dialogue groups in her area, has trained twelve other young people in conflict mediation, and is part of EYPD's regional youth leadership network. Her story is one of hundreds EYPD is working to amplify."
  },
];
