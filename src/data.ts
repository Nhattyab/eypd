import { Campaign, Event, TeamMember, Testimonial, BlogPost, VolunteerFaq } from "./types";

export const campaignsData: Campaign[] = [
  {
    id: "cause-1",
    title: "Voices Online, Peace on the Ground project",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
    category: "Healthy Foods",
    description: "funded by the Life & Peace Institute. Directly impacted 50 national youth digital peace fellows and reaches over 2,000,000 audiences."
  },
  {
    id: "cause-2",
    title: "African Youth Leadership Diplomatic Conference",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
    category: "Medical Care",
    description: "Uses multiple funding sources. Directly impacted over 700 youth leaders continentally in 5 consecutive editions and reaches over 20 million audiences."
  },
  {
    id: "cause-3",
    title: "WE-Care: Women Economic Empowerment and Care Economy Ethiopia Project",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800",
    category: "Pure Water",
    description: "funded by OXFAM in Ethiopia. Directly impacted 60 women’s and reaches over 710,000 audiences."
  },
  {
    id: "cause-4",
    title: "Promoting Men’s Engagement on Unpaid Care & Domestic Work",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    category: "Education",
    description: "in Meri Hidase and Abado Primary school funded by the OXFAM in Ethiopia."
  },
  {
    id: "cause-4",
    title: "Promoting Men’s Engagement on Unpaid Care & Domestic Work",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    category: "Education",
    description: "in Meri Hidase and Abado Primary school funded by the OXFAM in Ethiopia."
  },
  {
    id: "cause-5",
    title: "Addis Forum",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    category: "Education",
    description: "Uses multiple funding sources. Directly impacted over 650 youth leaders nationally and reaches over 5 million audiences. "
  }
];

export const eventsData: Event[] = [
  {
    id: "event-1",
    title: "Annual Walk for Water & Clean Sanitation",
    description: "An educational workshop teaching families home gardening techniques, seed preservation, and zero-chemical soil enhancement methods.",
    date: "14",
    month: "Oct",
    venue: "AdisAbaba, Ethiopia",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800"
  },
  {
    id: "event-2",
    title: "Annual Walk for Water & Clean Sanitation",
    description: "An educational workshop teaching families home gardening techniques, seed preservation, and zero-chemical soil enhancement methods.",
    date: "28",
    month: "Oct",
    venue: "AdisAbaba, Ethiopia",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800"
  },
  {
    id: "event-3",
    title: "Annual Walk for Water & Clean Sanitation",
    description: "An educational workshop teaching families home gardening techniques, seed preservation, and zero-chemical soil enhancement methods.",
    date: "12",
    month: "Nov",
    venue: "AdisAbaba, Ethiopia",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800"
  },
  {
    id: "event-4",
    title: "Annual Walk for Water & Clean Sanitation",
    description: "An educational workshop teaching families home gardening techniques, seed preservation, and zero-chemical soil enhancement methods.",
    date: "22",
    month: "Nov",
    venue: "AdisAbaba, Ethiopia",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    role: "Monthly Supporter",
    rating: 5,
    comment: "Deciding to sponsor a classroom through Charitics was one of the most fulfilling choices I've made. Seeing the direct field updates, hearing from the teachers, and witnessing the genuine transparency in their funding has won my complete trust.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
  },
  {
    id: "test-2",
    name: "Dr. Marcus Vance",
    role: "Volunteer Doctor",
    rating: 5,
    comment: "The operational efficiency of this NGO is phenomenal. In our last medical mission camp, every single tablet, kit, and consultation slot was pre-arranged beautifully. It makes the work of medical professionals on-ground extremely productive and impactful.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Corporate Partner",
    rating: 5,
    comment: "We partnered with Charitics for our corporate social responsibility (CSR) programs. They provided comprehensive impact metrics, clean tax reporting, and a wonderful hands-on volunteering day that truly aligned and energized our core employee teams.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "blog-1",
    title: "Unlocking Potential: The Link Between Clean Water and Child Literacy",
    excerpt: "Explore how school sanitation projects directly influence classroom attendance, and why local boreholes unlock hours of study time for young girls.",
    date: "June 24, 2026",
    category: "Sanitation",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    author: "Admin"
  },
  {
    id: "blog-2",
    title: "Unlocking Potential: The Link Between Clean Water and Child Literacy",
    excerpt: "Explore how school sanitation projects directly influence classroom attendance, and why local boreholes unlock hours of study time for young girls.",
    date: "June 18, 2026",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
    author: "Admin"
  },
  {
    id: "blog-3",
    title: "Unlocking Potential: The Link Between Clean Water and Child Literacy",
    excerpt: "Explore how school sanitation projects directly influence classroom attendance, and why local boreholes unlock hours of study time for young girls.",
    date: "June 12, 2026",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
    author: "Admin"
  }
];

export const volunteerFaqData: VolunteerFaq[] = [
  {
    id: "faq-1",
    title: "Recognition and Fulfillment",
    content: "Our volunteer program offers official recognition certificates, training workshops, and letters of recommendation. We celebrate achievements monthly and provide professional development modules in humanitarian project planning, fundraising strategies, and community engagement."
  },
  {
    id: "faq-2",
    title: "Why Join Us as a Volunteer?",
    content: "By volunteering with Charitics, you become the hands and feet of vital community solutions. You will acquire practical field experience, gain team leadership skills, and join a vibrant network of professionals dedicated to lasting global impact."
  },
  {
    id: "faq-3",
    title: "Be Part of a Community",
    content: "We believe in collaborative strength. You'll participate in regular community bonding events, online discussions, and local volunteer councils, building strong friendships and peer networks that endure well beyond active field deployments."
  }
];
