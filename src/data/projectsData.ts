// @ts-ignore
import refugeeChildPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";
// @ts-ignore
import elderManBlanket from "../assets/images/elder_man_blanket_1782474613376.jpg";
// @ts-ignore
import youngManCarrying from "../assets/images/young_man_carrying_load_1782474631970.jpg";
// @ts-ignore
import childEatingBowl from "../assets/images/child_eating_bowl_1782474654974.jpg";
// @ts-ignore
import pureDrinkingWater from "../assets/images/pure_drinking_water_1782473834335.jpg";
// @ts-ignore
import qualityEducation from "../assets/images/quality_education_1782473853014.jpg";

export interface ProjectComment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
  replies?: ProjectComment[];
}

export interface ProjectContentSection {
  title: string;
  paragraph: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Care" | "Medical" | "Nutrition" | "Water" | "Education";
  image: string;
  colSpan: string; // tailwind grid columns
  aspectRatio: string;
  location: string;
  date: string;
  highlighted?: boolean;
  author: string;
  tags: string[]; // Adopted tag array like blog
  content: ProjectContentSection[]; // Adopted multi-paragraph array of objects with titles
}

export const initialProjects: Project[] = [
  {
    id: "project-1",
    title: "AYLDC — African Youth Leadership Diplomatic Conference ",
    subtitle: "EYPD's annual pan-African platform for youth diplomacy and policy leadership. ",
    category: "Care",
    image: youngManCarrying,
    description: "EYPD's annual pan-African platform for youth diplomacy and policy leadership.",
    colSpan: "lg:col-span-8 md:col-span-7",
    aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
    location: "Addis Ababa Urban Outskirts",
    date: "25 May, 2026",
    author: "Admin",
    tags: ["Cargo Relief", "Family Care", "Burden Relief"],
    content: [
      {
        title: "About AYLDC ",
        paragraph: "The African Youth Leadership Diplomatic Conference (AYLDC) is EYPD's flagship annual convening. Each year, it brings together young leaders, policymakers, diplomats, and youth advocates from across the continent to shape Africa's future through dialogue, leadership development, and policy engagement. Since its first edition in 2021, AYLDC has grown into one of Africa's notable youth diplomacy platforms. It has convened young delegates from across the continent alongside respected voices including a former Prime Minister of Ethiopia, Prof. PLO Lumumba, the Mayor of Harare, Ethiopian government ministers, and the UNICEF Deputy Representative. AYLDC reflects EYPD's conviction that young Africans are not beneficiaries of leadership, but architects of it. "

      },
      {
        title: "Bringing Africa's Youth Together ",
        paragraph: "Over six editions, AYLDC has convened 1,200 young leaders from 34 African countries. What began in 2021 has grown into a sustained continental platform, building the capacity of young Africans to lead and equipping them to influence policy across the continent. Each edition strengthens a pan-African network that reaches further and deeper into the next generation of leadership."
      },
      {
        title: "What EYPD Delivers Through AYLDC ",
        paragraph: "Through AYLDC, EYPD convenes young leaders from across borders, languages, and sectors, and facilitates direct exchange between them and senior policymakers, diplomats, and thought leaders. Every delegate gains diplomatic, leadership, and policy engagement skills through structured programming and mentorship. Beyond the conference itself, EYPD works to translate delegate dialogue into policy positions and advocacy that reach the platforms where continental decisions are made."
      },
      {
        title: "From Dialogue to Policy ",
        paragraph: "AYLDC connects young people's voices to real policy processes. One example is EYPD's contribution to the Youth Agenda 2055: The Future We Want, the youth-led declaration and action plan connected to the Ninth Tokyo International Conference on African Development (TICAD 9), held in August 2025. As part of this process, representatives of the TICAD 9 youth engagement joined an AYLDC gathering to consult directly with young delegates on the priorities that would shape Africa's next thirty years. EYPD facilitated that exchange and gathered structured feedback, feeding young African perspectives into the inputs that informed the Youth Agenda 2055. TICAD 9 marked the first time a youth-led declaration and action plan was formally recognized in its plenary session. Through AYLDC, EYPD helped ensure that young African voices were part of that process. "
      }
    ]
  },
  {
    id: "project-2",
    title: "Addis Forum",
    subtitle: "EYPD's annual national platform for youth policy and civic engagement.",
    category: "Medical",
    image: youngManCarrying,
    description: "EYPD's annual pan-African platform for youth diplomacy and policy leadership.",
    colSpan: "lg:col-span-4 md:col-span-5",
    aspectRatio: "aspect-[4/5] sm:aspect-square md:aspect-[4/5]",
    location: "Addis Ababa Urban Outskirts",
    date: "25 May, 2026",
    author: "Admin",
    tags: ["Cargo Relief", "Family Care", "Burden Relief"],
    content: [
      {
        title: "About Addis Forum",
        paragraph: "Addis Forum is EYPD's flagship national convening, held every year to bring together young people from across Ethiopia to engage directly on the policies and decisions that shape their future. Held in Addis Ababa, the Forum creates a space where youth from every region can raise their voices, exchange ideas, and engage with the people who make national decisions. Since its first edition in 2024, Addis Forum has convened around 600 young Ethiopians alongside ministers and senior government officials, opening direct dialogue between the next generation and national leadership. It reflects EYPD's conviction that young people are not a constituency to be spoken for, but active participants in shaping the country's direction. "

      },
      {
        title: "Youth Voice, National Reach ",
        paragraph: "Addis Forum brings together young people drawn from regions across Ethiopia, ensuring that the conversation reflects the full diversity of the country rather than a single city or community. By convening youth from every corner of the nation, the Forum builds a national picture of youth priorities and channels them into engagement with government and decision-makers. "
      },
      {
        title: "Outcomes That Reach the Ground  ",
        paragraph: "Addis Forum is built on a simple principle: its conversations must lead somewhere. Every edition produces a concrete outcome designed to move from dialogue into action. The first edition produced a youth-led project, taking the priorities raised at the Forum and turning them into a tangible initiative on the ground. The second edition produced a declaration, one that does not sit on a shelf, but has translated into real action. Among its clearest results, the Forum has fed directly into the drafting of Ethiopia's National Action Plan on Youth, Peace and Security, ensuring that the voices of young Ethiopians are written into one of the country's most significant youth policy frameworks. This is what sets Addis Forum apart. It does not simply gather young people to talk. It converts their engagement into projects, declarations, and policy that shape the decisions affecting their lives. "
      },
      {
        title: "What EYPD Delivers Through Addis Forum",
        paragraph: "Through Addis Forum, EYPD convenes young people from across Ethiopia and connects them directly with ministers, senior officials, and national decision-makers. The Forum equips participants to engage in policy dialogue with confidence, strengthens their civic engagement, and creates a structured channel for youth priorities to reach the national agenda. It is a platform built not for one-off conversation, but for sustained, year-on-year youth engagement in Ethiopia's civic and policy life. "
      },
      {
        title: "Featured Voices ",
        paragraph: "Addis Forum has convened young people alongside ministers and senior government officials, creating direct national dialogue between Ethiopia's youth and its decision-makers. "
      }
    ]
  },
  {
    id: "project-3",
    title: "Addis Forum",
    subtitle: "EYPD's annual national platform for youth policy and civic engagement.",
    category: "Nutrition",
    image: youngManCarrying,
    description: "EYPD's annual pan-African platform for youth diplomacy and policy leadership.",
    colSpan: "lg:col-span-4 md:col-span-5",
    aspectRatio: "aspect-[4/5] sm:aspect-square md:aspect-[4/5]",
    location: "Addis Ababa Urban Outskirts",
    date: "25 May, 2026",
    author: "Admin",
    tags: ["Cargo Relief", "Family Care", "Burden Relief"],
    content: [
      {
        title: "About Addis Forum",
        paragraph: "Addis Forum is EYPD's flagship national convening, held every year to bring together young people from across Ethiopia to engage directly on the policies and decisions that shape their future. Held in Addis Ababa, the Forum creates a space where youth from every region can raise their voices, exchange ideas, and engage with the people who make national decisions. Since its first edition in 2024, Addis Forum has convened around 600 young Ethiopians alongside ministers and senior government officials, opening direct dialogue between the next generation and national leadership. It reflects EYPD's conviction that young people are not a constituency to be spoken for, but active participants in shaping the country's direction. "

      },
      {
        title: "Youth Voice, National Reach ",
        paragraph: "Addis Forum brings together young people drawn from regions across Ethiopia, ensuring that the conversation reflects the full diversity of the country rather than a single city or community. By convening youth from every corner of the nation, the Forum builds a national picture of youth priorities and channels them into engagement with government and decision-makers. "
      },
      {
        title: "Outcomes That Reach the Ground  ",
        paragraph: "Addis Forum is built on a simple principle: its conversations must lead somewhere. Every edition produces a concrete outcome designed to move from dialogue into action. The first edition produced a youth-led project, taking the priorities raised at the Forum and turning them into a tangible initiative on the ground. The second edition produced a declaration, one that does not sit on a shelf, but has translated into real action. Among its clearest results, the Forum has fed directly into the drafting of Ethiopia's National Action Plan on Youth, Peace and Security, ensuring that the voices of young Ethiopians are written into one of the country's most significant youth policy frameworks. This is what sets Addis Forum apart. It does not simply gather young people to talk. It converts their engagement into projects, declarations, and policy that shape the decisions affecting their lives. "
      },
      {
        title: "What EYPD Delivers Through Addis Forum",
        paragraph: "Through Addis Forum, EYPD convenes young people from across Ethiopia and connects them directly with ministers, senior officials, and national decision-makers. The Forum equips participants to engage in policy dialogue with confidence, strengthens their civic engagement, and creates a structured channel for youth priorities to reach the national agenda. It is a platform built not for one-off conversation, but for sustained, year-on-year youth engagement in Ethiopia's civic and policy life. "
      },
      {
        title: "Featured Voices ",
        paragraph: "Addis Forum has convened young people alongside ministers and senior government officials, creating direct national dialogue between Ethiopia's youth and its decision-makers. "
      }
    ]
  },
  {
    id: "project-4",
    title: "Addis Forum",
    subtitle: "EYPD's annual national platform for youth policy and civic engagement.",
    category: "Medical",
    image: youngManCarrying,
    description: "EYPD's annual pan-African platform for youth diplomacy and policy leadership.",
    colSpan: "lg:col-span-8 md:col-span-7",
    aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
    location: "Addis Ababa Urban Outskirts",
    date: "25 May, 2026",
    author: "Admin",
    tags: ["Cargo Relief", "Family Care", "Burden Relief"],
    content: [
      {
        title: "About Addis Forum",
        paragraph: "Addis Forum is EYPD's flagship national convening, held every year to bring together young people from across Ethiopia to engage directly on the policies and decisions that shape their future. Held in Addis Ababa, the Forum creates a space where youth from every region can raise their voices, exchange ideas, and engage with the people who make national decisions. Since its first edition in 2024, Addis Forum has convened around 600 young Ethiopians alongside ministers and senior government officials, opening direct dialogue between the next generation and national leadership. It reflects EYPD's conviction that young people are not a constituency to be spoken for, but active participants in shaping the country's direction. "

      },
      {
        title: "Youth Voice, National Reach ",
        paragraph: "Addis Forum brings together young people drawn from regions across Ethiopia, ensuring that the conversation reflects the full diversity of the country rather than a single city or community. By convening youth from every corner of the nation, the Forum builds a national picture of youth priorities and channels them into engagement with government and decision-makers. "
      },
      {
        title: "Outcomes That Reach the Ground  ",
        paragraph: "Addis Forum is built on a simple principle: its conversations must lead somewhere. Every edition produces a concrete outcome designed to move from dialogue into action. The first edition produced a youth-led project, taking the priorities raised at the Forum and turning them into a tangible initiative on the ground. The second edition produced a declaration, one that does not sit on a shelf, but has translated into real action. Among its clearest results, the Forum has fed directly into the drafting of Ethiopia's National Action Plan on Youth, Peace and Security, ensuring that the voices of young Ethiopians are written into one of the country's most significant youth policy frameworks. This is what sets Addis Forum apart. It does not simply gather young people to talk. It converts their engagement into projects, declarations, and policy that shape the decisions affecting their lives. "
      },
      {
        title: "What EYPD Delivers Through Addis Forum",
        paragraph: "Through Addis Forum, EYPD convenes young people from across Ethiopia and connects them directly with ministers, senior officials, and national decision-makers. The Forum equips participants to engage in policy dialogue with confidence, strengthens their civic engagement, and creates a structured channel for youth priorities to reach the national agenda. It is a platform built not for one-off conversation, but for sustained, year-on-year youth engagement in Ethiopia's civic and policy life. "
      },
      {
        title: "Featured Voices ",
        paragraph: "Addis Forum has convened young people alongside ministers and senior government officials, creating direct national dialogue between Ethiopia's youth and its decision-makers. "
      }
    ]
  },
  {
    id: "project-5",
    title: "Addis Forum",
    subtitle: "EYPD's annual national platform for youth policy and civic engagement.",
    category: "Medical",
    image: youngManCarrying,
    description: "EYPD's annual pan-African platform for youth diplomacy and policy leadership.",
    colSpan: "lg:col-span-8 md:col-span-7",
    aspectRatio: "aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9.5]",
    location: "Addis Ababa Urban Outskirts",
    date: "25 May, 2026",
    author: "Admin",
    tags: ["Cargo Relief", "Family Care", "Burden Relief"],
    content: [
      {
        title: "About Addis Forum",
        paragraph: "Addis Forum is EYPD's flagship national convening, held every year to bring together young people from across Ethiopia to engage directly on the policies and decisions that shape their future. Held in Addis Ababa, the Forum creates a space where youth from every region can raise their voices, exchange ideas, and engage with the people who make national decisions. Since its first edition in 2024, Addis Forum has convened around 600 young Ethiopians alongside ministers and senior government officials, opening direct dialogue between the next generation and national leadership. It reflects EYPD's conviction that young people are not a constituency to be spoken for, but active participants in shaping the country's direction. "

      },
      {
        title: "Youth Voice, National Reach ",
        paragraph: "Addis Forum brings together young people drawn from regions across Ethiopia, ensuring that the conversation reflects the full diversity of the country rather than a single city or community. By convening youth from every corner of the nation, the Forum builds a national picture of youth priorities and channels them into engagement with government and decision-makers. "
      },
      {
        title: "Outcomes That Reach the Ground  ",
        paragraph: "Addis Forum is built on a simple principle: its conversations must lead somewhere. Every edition produces a concrete outcome designed to move from dialogue into action. The first edition produced a youth-led project, taking the priorities raised at the Forum and turning them into a tangible initiative on the ground. The second edition produced a declaration, one that does not sit on a shelf, but has translated into real action. Among its clearest results, the Forum has fed directly into the drafting of Ethiopia's National Action Plan on Youth, Peace and Security, ensuring that the voices of young Ethiopians are written into one of the country's most significant youth policy frameworks. This is what sets Addis Forum apart. It does not simply gather young people to talk. It converts their engagement into projects, declarations, and policy that shape the decisions affecting their lives. "
      },
      {
        title: "What EYPD Delivers Through Addis Forum",
        paragraph: "Through Addis Forum, EYPD convenes young people from across Ethiopia and connects them directly with ministers, senior officials, and national decision-makers. The Forum equips participants to engage in policy dialogue with confidence, strengthens their civic engagement, and creates a structured channel for youth priorities to reach the national agenda. It is a platform built not for one-off conversation, but for sustained, year-on-year youth engagement in Ethiopia's civic and policy life. "
      },
      {
        title: "Featured Voices ",
        paragraph: "Addis Forum has convened young people alongside ministers and senior government officials, creating direct national dialogue between Ethiopia's youth and its decision-makers. "
      }
    ]
  }
];
