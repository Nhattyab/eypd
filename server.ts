import express from "express";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { createServer as createViteServer } from "vite";

const PORT = 3000;

const app = express();
app.use(express.json({ limit: "50mb" }));

// Serve static assets from src/assets and dist/src/assets
const srcAssetsDir = path.join(process.cwd(), "src", "assets");
const distAssetsDir = path.join(process.cwd(), "dist", "src", "assets");

if (fs.existsSync(srcAssetsDir)) {
  app.use("/src/assets", express.static(srcAssetsDir));
  app.use("/assets", express.static(srcAssetsDir));
}
if (fs.existsSync(distAssetsDir)) {
  app.use("/src/assets", express.static(distAssetsDir));
  app.use("/assets", express.static(distAssetsDir));
}

// Initialize SQLite database
const dbPath = path.join(process.cwd(), "sqlite.db");
const db = new Database(dbPath);

// Enable WAL mode for performance
db.pragma("journal_mode = WAL");

// Ensure tables exist
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    category TEXT,
    image TEXT,
    colSpan TEXT,
    aspectRatio TEXT,
    description TEXT,
    location TEXT,
    date TEXT,
    targetAmount REAL,
    raisedAmount REAL,
    highlighted INTEGER,
    author TEXT,
    tags TEXT,          -- JSON string array
    challengeSolution TEXT,
    finalResult TEXT,
    content TEXT,       -- JSON array of ProjectContentSection
    quote TEXT,
    comments TEXT       -- JSON array of ProjectComment
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title TEXT,
    excerpt TEXT,
    date TEXT,
    category TEXT,
    image TEXT,
    author TEXT,
    content TEXT,       -- JSON string array
    quote TEXT,
    tags TEXT,          -- JSON string array
    comments TEXT       -- JSON array of BlogComment
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    date TEXT,
    read INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    title TEXT,
    message TEXT,
    type TEXT,
    date TEXT,
    read INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS donations (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    amount REAL,
    campaign TEXT,
    recurring TEXT,
    date TEXT,
    anonymous INTEGER DEFAULT 0
  );
`);

try {
  db.exec(`
    UPDATE blogs SET category = 'News' WHERE id = 'blog-1' AND category = 'Donation';
    UPDATE blogs SET category = 'Stories' WHERE id = 'blog-2' AND category = 'Donation';
    UPDATE blogs SET category = 'Advocacy Messages' WHERE id = 'blog-3' AND category = 'Donation';
    UPDATE blogs SET category = 'Press Releases' WHERE id = 'blog-4' AND category = 'Medical Care';
    UPDATE blogs SET category = 'News' WHERE id = 'blog-5' AND category = 'Pure Water';
    UPDATE blogs SET category = 'Stories' WHERE id = 'blog-6' AND category = 'Nutrition';
  `);
} catch (e) {
  // Ignore if tables are empty
}

// Check if seeding is required
const projectsCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
if (projectsCount.count === 0) {
  console.log("Seeding initial projects into SQLite...");
  
  const initialProjects = [
    {
      id: "project-1",
      title: "Family Survival & Burden Relief",
      subtitle: "Rural Assistance & Cargo Support",
      category: "Care",
      image: "/src/assets/images/young_man_carrying_load_1782474631970.jpg",
      colSpan: "lg:col-span-8 md:col-span-7",
      aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
      description: "Supporting community laborers and young breadwinners bearing heavy manual burdens. We supply wheelbarrows, local carriage tools, and protective accessories, accompanied by small-business training to ease family economic hardships in high-density areas.",
      location: "Addis Ababa Urban Outskirts",
      date: "25 May, 2026",
      targetAmount: 20000,
      raisedAmount: 14500,
      highlighted: 0,
      author: "Athena Jones",
      tags: JSON.stringify(["Cargo Relief", "Family Care", "Burden Relief"]),
      challengeSolution: "Future, as it seeks to lead the industry in technological innovation and sustainable building practices to deliver long-lasting value for its clients. Netus lorem rutrum arcu dignissim at sit morbi phasellus nascetur eget potenti vestibulum is cras. Tempor nonummy metus lobortis. Sociis velit etiam, dapibus. Lepellentesque a cras posuere tempor facilisi habitant lectus rutrum pede.",
      finalResult: "For almost 5 years Leighton Asia, one of the region's largest and most respected construction companies, has been progressively building for a better future by leveraging international expertise with local intelligence.",
      content: JSON.stringify([
        {
          title: "The Burden on Young Laborers",
          paragraph: "The daily physical toll on young manual laborers in high-density markets is immense, often leading to chronic health issues and halting formal education opportunities."
        },
        {
          title: "Material Aid & Safety Gear",
          paragraph: "By distributing high-capacity carts, protective leather gloves, and steel-toed boots, we reduce occupational injury rates by over sixty percent while doubling delivery throughput."
        },
        {
          title: "Economic Empowerment & Training",
          paragraph: "This initiative combines immediate material support with evening financial literacy courses, allowing young breadwinners to budget, save, and eventually scale their cargo services into formal micro-retail businesses."
        }
      ]),
      quote: "Providing simple carriage equipment and protective wear doesn't just ease physical toll—it restores economic agency to entire households.",
      comments: JSON.stringify([
        {
          id: "pc1",
          name: "Helen Demissie",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
          date: "April 18, 2026 at 4:15 pm",
          content: "This is incredibly practical. Providing physical tools for self-sufficiency is always more impactful than temporary aid. Keep up the amazing work!"
        }
      ])
    },
    {
      id: "project-2",
      title: "Pediatric Clinical Screening Outpost",
      subtitle: "Preventative Pediatrics & Screenings",
      category: "Medical",
      image: "/src/assets/images/refugee_child_portrait_1782472576507.jpg",
      colSpan: "lg:col-span-4 md:col-span-5",
      aspectRatio: "aspect-[4/5] sm:aspect-square md:aspect-[4/5]",
      description: "Deploying basic diagnostic instruments and medical experts to rural and semi-rural regions. Our teams perform direct checkups, treat ear and eye infections, distribute basic vitamins, and keep local youth insulated from water-borne diseases.",
      location: "Mek'ele Rural Foothills",
      date: "12 April, 2026",
      targetAmount: 35000,
      raisedAmount: 28900,
      highlighted: 0,
      author: "Dr. Marcus Vance",
      tags: JSON.stringify(["Medical Camp", "Pediatric Aid", "Clinical Care"]),
      challengeSolution: "Our team faced immediate logistical bottlenecks, including off-grid vaccine storage and lack of sterile examination surfaces. By deploying portable solar refrigeration cases and setting up modular screening chambers, we ensured that pediatric clinicians could operate seamlessly in remote districts.",
      finalResult: "The deployment successfully screened over 850 children, identifying 120 critical sight-threatening optical anomalies and distributing essential treatment, leaving behind a self-sustaining local monitoring committee.",
      content: JSON.stringify([
        {
          title: "Isolated Communities",
          paragraph: "Many remote mountain settlements are completely disconnected from major healthcare hubs, making early pediatric clinical screening virtually non-existent for low-income families."
        },
        {
          title: "Mobile Diagnostics Outpost",
          paragraph: "Our team established fully equipped mobile diagnostic outposts featuring specialized optical screening tools, rapid blood tests, and vital pediatric supplies."
        },
        {
          title: "Clinical Screening Impact",
          paragraph: "Over eight hundred children received their first-ever full clinical screening, enabling early medical intervention for preventable visual and auditory impairments before they affect learning."
        }
      ]),
      quote: "When clinical diagnostics are brought directly into rural classrooms, we catch preventable conditions before they alter a child's path.",
      comments: JSON.stringify([
        {
          id: "pc2",
          name: "Dr. Alistair Ross",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
          date: "May 2, 2026 at 9:30 am",
          content: "As a fellow clinician, I applaud the use of portable solar refrigeration for vaccine storage. Brilliant work under difficult off-grid conditions!"
        }
      ])
    },
    {
      id: "project-3",
      title: "Emergency Nutrition & Feeding Aid",
      subtitle: "Daily Nutritious Lunch & Spoons",
      category: "Nutrition",
      image: "/src/assets/images/child_eating_bowl_1782474654974.jpg",
      colSpan: "lg:col-span-4 md:col-span-5",
      aspectRatio: "aspect-[4/5] sm:aspect-square md:aspect-[4/5]",
      description: "Providing nutrient-dense, vitamin-fortified school hot lunches to children suffering from acute nutritional voids. Every child receives a highly calculated daily ration of carbohydrates, proteins, and essential minerals to promote healthy physical development.",
      location: "Hawassa Lakeside Communities",
      date: "18 May, 2026",
      targetAmount: 18000,
      raisedAmount: 16100,
      highlighted: 0,
      author: "Sarah Jenkins",
      tags: JSON.stringify(["Nutrition", "Youth Hunger", "Emergency Aid"]),
      challengeSolution: "High volatility in regional food markets threatened the consistency of food distribution pipelines. To address this, we partnered directly with Lakeside agricultural unions to establish pre-allocated dry storage barns, neutralizing short-term pricing spikes.",
      finalResult: "Established a recurring school lunch pipeline supporting 450 school children daily, showing a 15% improvement in cognitive attentiveness and school retention metrics within three months.",
      content: JSON.stringify([
        {
          title: "The Threat of Dietary Deficits",
          paragraph: "Acute dietary deficits heavily restrict children's early cognitive growth and physical development, especially during seasonal agricultural dry spells."
        },
        {
          title: "Nutrient-Dense School Lunches",
          paragraph: "Our program guarantees a balanced daily hot lunch of local grains, fortified vitamins, and protein-rich legumes to primary school students."
        },
        {
          title: "Sustaining Attendance & Local Farmers",
          paragraph: "By working directly with regional farming cooperatives, we secured food supply stability and observed an immediate fifteen percent increase in regular school attendance."
        }
      ]),
      quote: "A warm, nutrient-dense lunch is the single most effective classroom retention tool for households facing systemic harvest volatility.",
      comments: JSON.stringify([])
    },
    {
      id: "project-4",
      title: "Clean Drinking Water Systems",
      subtitle: "Solar Wells & Clean Filtration",
      category: "Water",
      image: "/src/assets/images/pure_drinking_water_1782473834335.jpg",
      colSpan: "lg:col-span-8 md:col-span-7",
      aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
      description: "Establishing localized clean water solutions, including solar-pumped water wells and community-managed biosand filtration cylinders. This structural system stops the cycle of cholera and shields young girls from walking long, dangerous paths for river water.",
      location: "Bahir Dar Drought Regions",
      date: "08 June, 2026",
      targetAmount: 42000,
      raisedAmount: 37500,
      highlighted: 0,
      author: "Eng. David Kassa",
      tags: JSON.stringify(["Solar Wells", "Filtration", "Clean Water"]),
      challengeSolution: "Drilling through dry, basaltic rock formations required industrial-grade pneumatic rigs that exceeded typical light-duty transport limits. We collaborated with regional irrigation engineers to source heavy drills and established community-based well protection circles.",
      finalResult: "Two solar-powered high-capacity water wells are fully operational, producing over 15,000 liters of purified drinking water daily and protecting 1,200 local families from waterborne pathogens.",
      content: JSON.stringify([
        {
          title: "Water Scarcity & Consequences",
          paragraph: "Unsafe water sources subject families to chronic water-borne illnesses and force girls to spend hours fetching distant, turbid river water instead of attending school."
        },
        {
          title: "Solar Wells & Clean Filtration",
          paragraph: "We successfully installed two robust solar-pumped groundwater wells paired with multi-tier sand, gravel, and biosand filtration assemblies."
        },
        {
          title: "Community-Managed Sustainability",
          paragraph: "Local youth and mothers have been trained in sanitary water handling and solar system upkeep, making this critical water system fully community-directed and highly sustainable."
        }
      ]),
      quote: "To secure clean water safety is to eliminate ninety percent of pediatric hospital admissions in our target region.",
      comments: JSON.stringify([])
    },
    {
      id: "project-5",
      title: "Child trouble & care",
      subtitle: "Demostic & Transportation",
      category: "Care",
      image: "/src/assets/images/elder_man_blanket_1782474613376.jpg",
      colSpan: "lg:col-span-8 md:col-span-7",
      aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
      description: "A highly dedicated program focused on homeless youth and elderly citizens needing shelter, safety, and transportation resources during emergencies. This program establishes safe overnight stations, delivers high-thermal blankets, and coordinates community support services.",
      location: "Central Addis Districts",
      date: "25 February, 2024",
      targetAmount: 150499,
      raisedAmount: 124900,
      highlighted: 1,
      author: "Athena Jones",
      tags: JSON.stringify(["Homeless Support", "Elderly Care", "Emergency Relief"]),
      challengeSolution: "Future, as it seeks to lead the industry in technological innovation and sustainable building practices to deliver long-lasting value for its clients. Netus lorem rutrum arcu dignissim at sit morbi phasellus nascetur eget potenti vestibulum is cras. Tempor nonummy metus lobortis. Sociis velit etiam, dapibus. Lepellentesque a cras posuere tempor facilisi habitant lectus rutrum pede.",
      finalResult: "For almost 5 years Leighton Asia, one of the region's largest and most respected construction companies, has been progressively building for a better future by leveraging international expertise with local intelligence. In that time Leighton.",
      content: JSON.stringify([
        {
          title: "Systemic Vulnerability & Weather",
          paragraph: "Homeless youths and isolated elderly citizens face severe climate exposure, with zero access to protective bedding or emergency transport networks."
        },
        {
          title: "Shelter & High-Thermal Gear",
          paragraph: "Our dedicated program manages heated emergency shelter modules, distributes high-thermal sleeping gear, and coordinates volunteer transit services."
        },
        {
          title: "Emergency Call Networks",
          paragraph: "Through unified regional call circles, we ensure that nobody is left out on freezing streets during the critical midnight hours."
        }
      ]),
      quote: "A warm blanket and a safe overnight station represent the baseline of safety that every vulnerable individual deserves during harsh winters.",
      comments: JSON.stringify([])
    },
    {
      id: "project-6",
      title: "Primary Digital Classrooms",
      subtitle: "Solar Powered Tablet Hubs",
      category: "Education",
      image: "/src/assets/images/quality_education_1782473853014.jpg",
      colSpan: "lg:col-span-4 md:col-span-5",
      aspectRatio: "aspect-[4/5] sm:aspect-square md:aspect-[4/5]",
      description: "Constructing modular literacy stations outfitted with solar panel kits, basic LED lightbulbs, and low-wattage educational tablets. Children in off-grid rural regions gain direct access to offline curriculum and interactive mathematical utilities.",
      location: "Gondar Off-Grid Districts",
      date: "30 August, 2026",
      targetAmount: 25000,
      raisedAmount: 19800,
      highlighted: 0,
      author: "Lydia Tesfaye",
      tags: JSON.stringify(["EdTech", "Off-Grid Literacy", "Digital Hubs"]),
      challengeSolution: "Most tablets lacked localized language support and durable shock-proofing required for harsh outdoor teaching sites. Our team customized localized visual software and encapsulated the devices in military-grade silicone chassis.",
      finalResult: "Created three self-sustaining solar study hubs equipped with 45 offline interactive tablets, serving over 200 primary-school students weekly with fundamental numeracy training.",
      content: JSON.stringify([
        {
          title: "The Digital & Resource Divide",
          paragraph: "Off-grid schools suffer from a critical lack of updated physical textbooks, leaving children far behind in standard national literacy and arithmetic curricula."
        },
        {
          title: "Rugged Solar Tablet Hubs",
          paragraph: "We engineered rugged, solar-powered tablet hubs loaded with comprehensive, localized offline mathematics and literacy software."
        },
        {
          title: "Self-Paced Learning Progress",
          paragraph: "Three modular primary study stations are now operational, allowing children to learn interactively, view diagrams, and progress at their own speed."
        }
      ]),
      quote: "Offline digital libraries bypass internet shortages, placing a world of scientific and literary exploration in the hands of rural students.",
      comments: JSON.stringify([])
    }
  ];

  const insertProj = db.prepare(`
    INSERT INTO projects (
      id, title, subtitle, category, image, colSpan, aspectRatio, description,
      location, date, targetAmount, raisedAmount, highlighted, author, tags,
      challengeSolution, finalResult, content, quote, comments
    ) VALUES (
      @id, @title, @subtitle, @category, @image, @colSpan, @aspectRatio, @description,
      @location, @date, @targetAmount, @raisedAmount, @highlighted, @author, @tags,
      @challengeSolution, @finalResult, @content, @quote, @comments
    )
  `);

  const insertManyProjs = db.transaction((projs) => {
    for (const p of projs) insertProj.run(p);
  });

  insertManyProjs(initialProjects);
}

// Check if blogs seeding is required
const blogsCount = db.prepare("SELECT COUNT(*) as count FROM blogs").get() as { count: number };
if (blogsCount.count === 0) {
  console.log("Seeding initial blogs into SQLite...");
  
  const initialBlogs = [
    {
      id: "blog-1",
      title: "Give Education, It's The Best Gift Ever.",
      excerpt: "Explore how school sanitation projects directly influence classroom attendance, and why local boreholes unlock hours of study time for young girls.",
      date: "15 Dec",
      category: "News",
      image: "/src/assets/images/quality_education_1782473853014.jpg",
      author: "Admin",
      tags: JSON.stringify(["Reseller", "Hosting", "WP Hosting"]),
      quote: "Mosico has been an invaluable partner to us. Any talent we've worked with ha shown a deep understanding of digital experiences. They're seamlessl Integrate with or team and meet the level of craft that we hold ourselves accountable with our team and meet to. They're seamlessl integrate with our team and meet",
      content: JSON.stringify([
        "When to Use Lorem Ipsum generally, lorem ipsum is best suited to keeping template fo looking bare or minimizing the distractions of the draft copy. Second, use lorem ipsum if you think placeholder text will distracting, in voluptate velit esse. Cursus libero viverra.",
        "One of the most remarkable applications of AI in healthcare is in diagnostics. Machine and learning algorithms are capable of analyzing vast amounts of medical data with speed to unprecedent. This has led to earlier and more precise disease speed detection, greatly enhancing the chances of successful treatment.",
        "One of the most remarkable applications of AI in healthcare is in diagnostics. Machine and learning algorithms are capable of analyzing vast amounts of medical data with speed to unprecedent. This has led to earlier and more precise disease speed detection, greatly enhancing the chances of successful treatment."
      ]),
      comments: JSON.stringify([
        {
          id: "c1",
          name: "Leslie Alexander",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
          date: "March 20, 2023 at 2:37 pm",
          content: "Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla. Integer non quam commodo, scelerisque felis id, eleifend turpis. Phasellus in nulla quis erat tempor tristique eget vel purus. Nulla pharetra pharetra pharetra. Praesent varius eget justo ut lacinia. Phasellus pharetra.",
          replies: [
            {
              id: "c2",
              name: "Leslie Alexander",
              avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150",
              date: "March 20, 2023 at 2:37 pm",
              content: "Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla. Integer non quam commodo, scelerisque felis id, eleifend turpis. Phasellus in nulla quis erat tempor tristique eget vel purus. Nulla pharetra pharetra pharetra. Praesent varius eget justo ut lacinia. Phasellus pharetra."
            }
          ]
        }
      ])
    },
    {
      id: "blog-2",
      title: "Don't treat oceans as universal garbage cans",
      excerpt: "Nutrition forms the baseline of cognitive capacity. We review a five-year study measuring scholastic performance improvement under school feeding regimes.",
      date: "15 Dec",
      category: "Stories",
      image: "/src/assets/images/elder_man_blanket_1782474613376.jpg",
      author: "Admin",
      tags: JSON.stringify(["Ocean", "Environment", "Cleaning"]),
      quote: "Protecting our marine reserves requires a persistent presence and rigorous global standards. By partnering with local fishing teams, we have seen plastic dumping reduced by over forty percent.",
      content: JSON.stringify([
        "Plastics and non-biodegradable debris continue to choke our coastlines, decimating aquatic habitats. Activists worldwide are demanding strict policies against shipping vessels and factories using water systems as cheap sewage dumps.",
        "Developing sustainable cleaning cycles and beachside sorting bins has motivated thousands of volunteers. We must implement real-time oceanic drone telemetry to detect plastic rafts and clean them swiftly."
      ]),
      comments: JSON.stringify([
        {
          id: "c3",
          name: "Devon Lane",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
          date: "May 10, 2025 at 11:15 am",
          content: "Excellent article! Clean ocean shores are not just beautiful, they're vital to coastal economies and biodiversity. Count me in for the next coastal cleaning drive."
        }
      ])
    },
    {
      id: "blog-3",
      title: "The sun and the sand makes beaches beautiful",
      excerpt: "A deep dive into our solar irrigation systems and drought-resistant crops seminar empowering farmers in remote high-temperature terrains.",
      date: "15 Dec",
      category: "Advocacy Messages",
      image: "/src/assets/images/pure_drinking_water_1782473834335.jpg",
      author: "Admin",
      tags: JSON.stringify(["Climate", "Resilience", "Solar"]),
      quote: "Empowering rural farmers with custom solar pumps turns unproductive dry seasons into highly profitable harvest windows, unlocking year-round security.",
      content: JSON.stringify([
        "Drought conditions have long limited agricultural productivity in remote regions. Solar-powered drip systems ensure drop-by-drop water accuracy directly to roots, reducing evaporation by up to eighty-five percent.",
        "By establishing seed preservation hubs, farmers can swap heat-resistant crop varieties that survive on standard soil moisture and thrive despite sudden temperature spikes."
      ]),
      comments: JSON.stringify([])
    },
    {
      id: "blog-4",
      title: "How mobile medical clinics are changing rural lives",
      excerpt: "Setting up mobile clinics and distributing vital first-aid and sanitization kits to families in remote and low-income rural settlements.",
      date: "14 Dec",
      category: "Press Releases",
      image: "/src/assets/images/medical_treatment_help_1782473815510.jpg",
      author: "Admin",
      tags: JSON.stringify(["Healthcare", "Mobile Clinic", "Sanitation"]),
      quote: "When healthcare comes directly to the front door, community health indicators improve rapidly. Preventative screening is the greatest tool for low-income settlements.",
      content: JSON.stringify([
        "Many families live more than twenty miles from the nearest hospital, making routine checkups impossible. Mobile health vans eliminate this distance barrier completely, saving thousands of lives annually.",
        "In addition to pediatric care, mobile clinics carry clean birthing kits, simple screening tools, and chronic care medications that support elderly patients with dignity."
      ]),
      comments: JSON.stringify([])
    },
    {
      id: "blog-5",
      title: "Clean water wells as foundations for gender equality",
      excerpt: "Drilling clean boreholes and implementing solar-powered sand filtration systems in regions experiencing severe seasonal droughts.",
      date: "12 Dec",
      category: "News",
      image: "/src/assets/images/hands_holding_heart_1782473086845.jpg",
      author: "Admin",
      tags: JSON.stringify(["Pure Water", "Equity", "Community"]),
      quote: "A well in a village is not just an infrastructure asset. It represents thousands of saved hours for young girls who can now stay in classrooms and pursue their dreams.",
      content: JSON.stringify([
        "In drought-prone regions, walking for water is a multi-hour journey typically completed by women and girls. This keeps children out of schools and traps families in loops of low educational outcomes.",
        "Establishing centralized, solar-powered filtration stations turns water harvesting from a chore into a quick, five-minute task, fostering safety and community equity."
      ]),
      comments: JSON.stringify([])
    },
    {
      id: "blog-6",
      title: "Emergency food delivery loops during climate droughts",
      excerpt: "Hot nutritious lunches and clean drinking water delivered daily to over 450 school children, ensuring healthy growth and attendance.",
      date: "10 Dec",
      category: "Stories",
      image: "/src/assets/images/volunteer_food_delivery_1782474593369.jpg",
      author: "Admin",
      tags: JSON.stringify(["Nutrition", "Emergency Relief", "NGO"]),
      quote: "Food stability underpins every other human developmental metric. School feeding loops keep classrooms full and keep child nutrition rates stable.",
      content: JSON.stringify([
        "Under climate pressure, crop failure often triggers immediate nutrition crises for school-aged kids. By supplying local warehouses with staple ingredients, we guarantee continuous food availability.",
        "Volunteers work around the clock sorting and distributing school lunch boxes. This collaborative structure builds local resilience and guarantees zero children go hungry."
      ]),
      comments: JSON.stringify([])
    }
  ];

  const insertBlog = db.prepare(`
    INSERT INTO blogs (
      id, title, excerpt, date, category, image, author, content, quote, tags, comments
    ) VALUES (
      @id, @title, @excerpt, @date, @category, @image, @author, @content, @quote, @tags, @comments
    )
  `);

  const insertManyBlogs = db.transaction((blgs) => {
    for (const b of blgs) insertBlog.run(b);
  });

  insertManyBlogs(initialBlogs);
}

// Check if donations seeding is required
const donationsCount = db.prepare("SELECT COUNT(*) as count FROM donations").get() as { count: number };
if (donationsCount.count === 0) {
  console.log("Seeding initial donations into SQLite...");
  const initialDonations = [
    {
      id: "donation-1",
      name: "Abebe Bikila",
      email: "abebe@example.com",
      amount: 50.0,
      campaign: "Child Nutrition Initiative",
      recurring: "One-Time",
      date: "Jul 15, 2026, 02:30 PM",
      anonymous: 0
    },
    {
      id: "donation-2",
      name: "Helen Demissie",
      email: "helen@example.com",
      amount: 100.0,
      campaign: "Clean Water & Sanitation",
      recurring: "Monthly",
      date: "Jul 14, 2026, 11:15 AM",
      anonymous: 0
    },
    {
      id: "donation-3",
      name: "Anonymous Partner",
      email: "partner@example.com",
      amount: 25.0,
      campaign: "General Peace & Development Fund",
      recurring: "One-Time",
      date: "Jul 14, 2026, 09:45 AM",
      anonymous: 1
    },
    {
      id: "donation-4",
      name: "Dr. Marcus Vance",
      email: "marcus.v@example.com",
      amount: 250.0,
      campaign: "Youth Enterprise & Vocational Skills",
      recurring: "One-Time",
      date: "Jul 12, 2026, 04:20 PM",
      anonymous: 0
    },
    {
      id: "donation-5",
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      amount: 15.0,
      campaign: "Child Nutrition Initiative",
      recurring: "Monthly",
      date: "Jul 10, 2026, 01:10 PM",
      anonymous: 0
    }
  ];

  const insertDonation = db.prepare(`
    INSERT INTO donations (id, name, email, amount, campaign, recurring, date, anonymous)
    VALUES (@id, @name, @email, @amount, @campaign, @recurring, @date, @anonymous)
  `);

  const insertManyDonations = db.transaction((dons) => {
    for (const d of dons) insertDonation.run(d);
  });

  insertManyDonations(initialDonations);
}

// Helper to parse sqlite database record to rich frontend format
const parseProject = (p: any) => ({
  ...p,
  highlighted: Boolean(p.highlighted),
  targetAmount: Number(p.targetAmount),
  raisedAmount: Number(p.raisedAmount),
  tags: JSON.parse(p.tags || "[]"),
  content: JSON.parse(p.content || "[]"),
  comments: JSON.parse(p.comments || "[]")
});

const parseBlog = (b: any) => ({
  ...b,
  tags: JSON.parse(b.tags || "[]"),
  content: JSON.parse(b.content || "[]"),
  comments: JSON.parse(b.comments || "[]")
});

// GET all campaigns (projects)
app.get("/api/projects", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM projects").all();
    const parsed = rows.map(parseProject);
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single campaign (project)
app.get("/api/projects/:id", (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(parseProject(row));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE or UPDATE a project (UPSERT)
app.post("/api/projects", (req, res) => {
  try {
    const p = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO projects (
        id, title, subtitle, category, image, colSpan, aspectRatio, description,
        location, date, targetAmount, raisedAmount, highlighted, author, tags,
        challengeSolution, finalResult, content, quote, comments
      ) VALUES (
        @id, @title, @subtitle, @category, @image, @colSpan, @aspectRatio, @description,
        @location, @date, @targetAmount, @raisedAmount, @highlighted, @author, @tags,
        @challengeSolution, @finalResult, @content, @quote, @comments
      )
    `);
    
    stmt.run({
      id: p.id || `project-${Date.now()}`,
      title: p.title || "",
      subtitle: p.subtitle || "",
      category: p.category || "Care",
      image: p.image || "",
      colSpan: p.colSpan || "lg:col-span-4 md:col-span-6",
      aspectRatio: p.aspectRatio || "aspect-square",
      description: p.description || "",
      location: p.location || "",
      date: p.date || new Date().toLocaleDateString(),
      targetAmount: Number(p.targetAmount || 0),
      raisedAmount: Number(p.raisedAmount || 0),
      highlighted: p.highlighted ? 1 : 0,
      author: p.author || "Admin",
      tags: JSON.stringify(p.tags || []),
      challengeSolution: p.challengeSolution || "",
      finalResult: p.finalResult || "",
      content: JSON.stringify(p.content || []),
      quote: p.quote || "",
      comments: JSON.stringify(p.comments || [])
    });

    const updatedRow = db.prepare("SELECT * FROM projects WHERE id = ?").get(p.id);
    res.json(parseProject(updatedRow));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT (update) campaign (project)
app.put("/api/projects/:id", (req, res) => {
  try {
    const p = req.body;
    const stmt = db.prepare(`
      UPDATE projects SET
        title = @title,
        subtitle = @subtitle,
        category = @category,
        image = @image,
        colSpan = @colSpan,
        aspectRatio = @aspectRatio,
        description = @description,
        location = @location,
        date = @date,
        targetAmount = @targetAmount,
        raisedAmount = @raisedAmount,
        highlighted = @highlighted,
        author = @author,
        tags = @tags,
        challengeSolution = @challengeSolution,
        finalResult = @finalResult,
        content = @content,
        quote = @quote,
        comments = @comments
      WHERE id = @id
    `);

    stmt.run({
      id: req.params.id,
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      image: p.image,
      colSpan: p.colSpan,
      aspectRatio: p.aspectRatio,
      description: p.description,
      location: p.location,
      date: p.date,
      targetAmount: Number(p.targetAmount || 0),
      raisedAmount: Number(p.raisedAmount || 0),
      highlighted: p.highlighted ? 1 : 0,
      author: p.author,
      tags: JSON.stringify(p.tags || []),
      challengeSolution: p.challengeSolution || "",
      finalResult: p.finalResult || "",
      content: JSON.stringify(p.content || []),
      quote: p.quote || "",
      comments: JSON.stringify(p.comments || [])
    });

    const updatedRow = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    res.json(parseProject(updatedRow));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE campaign (project)
app.delete("/api/projects/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST append comment to campaign
app.post("/api/projects/:id/comment", (req, res) => {
  try {
    const { comment } = req.body;
    const row = db.prepare("SELECT comments FROM projects WHERE id = ?").get(req.params.id) as { comments: string } | undefined;
    if (!row) {
      return res.status(404).json({ error: "Project not found" });
    }
    const currentComments = JSON.parse(row.comments || "[]");
    currentComments.push(comment);

    db.prepare("UPDATE projects SET comments = ? WHERE id = ?").run(JSON.stringify(currentComments), req.params.id);
    res.json({ success: true, comments: currentComments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// GET all blogs
app.get("/api/blogs", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM blogs").all();
    const parsed = rows.map(parseBlog);
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE or UPDATE a blog post (UPSERT)
app.post("/api/blogs", (req, res) => {
  try {
    const b = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO blogs (
        id, title, excerpt, date, category, image, author, content, quote, tags, comments
      ) VALUES (
        @id, @title, @excerpt, @date, @category, @image, @author, @content, @quote, @tags, @comments
      )
    `);

    stmt.run({
      id: b.id || `blog-${Date.now()}`,
      title: b.title || "",
      excerpt: b.excerpt || "",
      date: b.date || new Date().toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      category: b.category || "Donation",
      image: b.image || "",
      author: b.author || "Admin",
      content: JSON.stringify(b.content || []),
      quote: b.quote || "",
      tags: JSON.stringify(b.tags || []),
      comments: JSON.stringify(b.comments || [])
    });

    const updatedRow = db.prepare("SELECT * FROM blogs WHERE id = ?").get(b.id);
    res.json(parseBlog(updatedRow));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT (update) blog post
app.put("/api/blogs/:id", (req, res) => {
  try {
    const b = req.body;
    const stmt = db.prepare(`
      UPDATE blogs SET
        title = @title,
        excerpt = @excerpt,
        date = @date,
        category = @category,
        image = @image,
        author = @author,
        content = @content,
        quote = @quote,
        tags = @tags,
        comments = @comments
      WHERE id = @id
    `);

    stmt.run({
      id: req.params.id,
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      category: b.category,
      image: b.image,
      author: b.author,
      content: JSON.stringify(b.content || []),
      quote: b.quote || "",
      tags: JSON.stringify(b.tags || []),
      comments: JSON.stringify(b.comments || [])
    });

    const updatedRow = db.prepare("SELECT * FROM blogs WHERE id = ?").get(req.params.id);
    res.json(parseBlog(updatedRow));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE blog post
app.delete("/api/blogs/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM blogs WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST append comment to blog post
app.post("/api/blogs/:id/comment", (req, res) => {
  try {
    const { comment } = req.body;
    const row = db.prepare("SELECT comments FROM blogs WHERE id = ?").get(req.params.id) as { comments: string } | undefined;
    if (!row) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const currentComments = JSON.parse(row.comments || "[]");
    currentComments.push(comment);

    db.prepare("UPDATE blogs SET comments = ? WHERE id = ?").run(JSON.stringify(currentComments), req.params.id);
    res.json({ success: true, comments: currentComments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET all contacts
app.get("/api/contacts", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM contacts ORDER BY date DESC").all() as any[];
    const parsed = rows.map(r => ({
      ...r,
      read: Boolean(r.read)
    }));
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST new contact
app.post("/api/contacts", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contactId = `contact-${Date.now()}`;
    const dateStr = new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", year: "numeric" });
    
    // Insert into contacts
    db.prepare(`
      INSERT INTO contacts (id, name, email, subject, message, date, read)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `).run(contactId, name || "", email || "", subject || "", message || "", dateStr);

    // Insert into notifications
    const notifId = `notif-${Date.now()}`;
    db.prepare(`
      INSERT INTO notifications (id, title, message, type, date, read)
      VALUES (?, ?, ?, 'contact', ?, 0)
    `).run(notifId, `New Message from ${name || "Anonymous"}`, subject || "No Subject", dateStr);

    res.json({ success: true, message: "Contact message received successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST mark contact as read
app.post("/api/contacts/:id/read", (req, res) => {
  try {
    db.prepare("UPDATE contacts SET read = 1 WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE contact message
app.delete("/api/contacts/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM contacts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET all donations
app.get("/api/donations", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM donations ORDER BY date DESC").all() as any[];
    const parsed = rows.map(r => ({
      ...r,
      amount: Number(r.amount),
      anonymous: Boolean(r.anonymous)
    }));
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST new donation
app.post("/api/donations", (req, res) => {
  try {
    const { name, email, amount, campaign, recurring, anonymous, projectId } = req.body;
    const donationId = `donation-${Date.now()}`;
    const dateStr = new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short", year: "numeric" });
    const finalAmount = Number(amount || 0);

    // Insert into donations
    db.prepare(`
      INSERT INTO donations (id, name, email, amount, campaign, recurring, date, anonymous)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      donationId,
      name || "Anonymous",
      email || "anonymous@example.com",
      finalAmount,
      campaign || "General Peace & Development Fund",
      recurring || "One-Time",
      dateStr,
      anonymous ? 1 : 0
    );

    // Insert into admin notifications
    const notifId = `notif-${Date.now()}`;
    const displayName = anonymous ? "Anonymous Partner" : (name || "Anonymous Partner");
    db.prepare(`
      INSERT INTO notifications (id, title, message, type, date, read)
      VALUES (?, ?, ?, 'donation', ?, 0)
    `).run(
      notifId,
      `New Donation of $${finalAmount.toLocaleString()}`,
      `Received from ${displayName} towards: ${campaign}`,
      dateStr
    );

    // If projectId is provided, update projects raisedAmount
    if (projectId) {
      const proj = db.prepare("SELECT * FROM projects WHERE id = ?").get(projectId) as any;
      if (proj) {
        const newRaised = Number(proj.raisedAmount || 0) + finalAmount;
        db.prepare("UPDATE projects SET raisedAmount = ? WHERE id = ?").run(newRaised, projectId);
      }
    }

    res.json({ success: true, donationId, amount: finalAmount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET all notifications
app.get("/api/notifications", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM notifications ORDER BY date DESC").all() as any[];
    const parsed = rows.map(r => ({
      ...r,
      read: Boolean(r.read)
    }));
    res.json(parsed);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST mark notifications as read
app.post("/api/notifications/mark-read", (req, res) => {
  try {
    db.prepare("UPDATE notifications SET read = 1").run();
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE clear all notifications
app.delete("/api/notifications", (req, res) => {
  try {
    db.prepare("DELETE FROM notifications").run();
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



// Configure development and production modes
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
