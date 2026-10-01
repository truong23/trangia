export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'editor' | 'user';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail?: string;
  status: 'published' | 'draft' | 'archived';
  viewCount: number;
  isFeatured: boolean;
  categoryId?: string;
  category?: Category;
  authorId?: string;
  author?: User;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  code?: string;
  client?: string; // Chủ đầu tư / Tổng thầu
  location: string;
  scope: string; // Hạng mục thi công của Trần Gia
  category: 'hotel' | 'commercial' | 'residential' | 'industrial' | 'all';
  categoryLabel?: string;
  region: 'north' | 'central' | 'south';
  image: string;
  gallery?: string[];
  year?: string;
  pageInPdf?: number;
  description?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  role: string;
  description?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  icon?: string;
  description?: string;
}

export interface PersonnelItem {
  role: string;
  count: number;
  desc: string;
  icon?: string;
}

export interface ContactRequest {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  createdAt?: string;
}

export interface ArticlesResponse {
  items: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface SiteSettings {
  company: {
    name: string;
    shortName?: string;
    logo: string;
    whiteLogo: string;
    address: string;
    phone: string;
    hotline: string;
    fax?: string;
    email: string;
    website: string;
    slogan: string;
    director?: string;
  };
  heroBanner: {
    title: string;
    subtext: string;
    feedbackEmail: string;
    backgroundImage?: string;
    recruitmentBanner?: string;
  };
  navigation: Array<{
    title: string;
    href: string;
    active?: boolean;
    children?: Array<{ title: string; href: string }>;
  }>;
  footer: {
    introHeading: string;
    fieldsHeading: string;
    newsletterHeading: string;
    newsletterText: string;
    copyright: string;
    introLinks: Array<{ title: string; href: string }>;
    fieldLinks: Array<{ title: string; href: string }>;
  };
}



export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  jobType: string;
  deadline: string;
  description: string;
  requirements: string;
  benefits: string;
  status: 'open' | 'closed';
  applicationCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  cvUrl: string;
  hrNote?: string;
  status: 'pending' | 'passed' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}
