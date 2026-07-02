export interface Campaign {
  id: string;
  title: string;
  image: string;
  category: string;
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

