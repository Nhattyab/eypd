export interface Campaign {
  id: string;
  title: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  month: string;
  venue: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface VolunteerFaq {
  id: string;
  title: string;
  content: string;
}

export interface ProjectComment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
}

export interface ProjectContentSection {
  title: string;
  paragraph: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  colSpan?: string;
  aspectRatio?: string;
  description: string;
  location: string;
  date: string;
  targetAmount: number;
  raisedAmount: number;
  highlighted?: boolean;
  author: string;
  tags: string[];
  challengeSolution?: string;
  finalResult?: string;
  content: ProjectContentSection[];
  quote?: string;
  comments: ProjectComment[];
}

export interface BlogComment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
}

export interface DetailedBlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  content: string[];
  quote?: string;
  tags: string[];
  comments: BlogComment[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  read?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  read?: boolean;
}