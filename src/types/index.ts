export type ProjectType =
  | 'QA / Software Testing'
  | 'Quality Engineering'
  | 'Technical Project Delivery'
  | 'AI Testing'
  | 'Game Testing'
  | 'XR / AR / VR'
  | 'Other';

export type UserRole = 'super_admin' | 'editor' | 'author';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export type ArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export type CaseStudyStatus =
  | 'draft'
  | 'published'
  | 'archived'
  | 'Completed'
  | 'In Development'
  | 'In Progress';

export type CaseStudyProjectType =
  | 'Independent Case Study'
  | 'Client Project'
  | 'Prototype'
  | 'Portfolio Project'
  | 'In Development';

export interface CaseStudyCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId?: string;
  type: CaseStudyProjectType;
  clientName?: string;
  summary: string;
  heroImage: string;
  published: boolean;
  status?: CaseStudyStatus;
  featured: boolean;
  date: string;
  readTime: string;
  problem: string;
  objectives: string[];
  scope: string;
  approach: string;
  testScenarios: {
    category: string;
    details: string;
    casesCount: number;
    passRate: string;
  }[];
  findings: string[];
  defectExamples?: {
    id: string;
    title: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    rootCause: string;
    resolution: string;
  }[];
  recommendations: string[];
  tools: string[];
  environment?: string[];
  platforms?: string[];
  lessonsLearned: string[];
  gallery?: string[];
  relatedArticleSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryId?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  authorId?: string;
  publishedAt: string;
  scheduledAt?: string;
  readTime: string;
  featuredImage: string;
  published: boolean;
  status?: ArticleStatus;
  featured?: boolean;
  tags: string[];
  content: string; // Markdown or structured html
  tableOfContents?: {
    id: string;
    title: string;
    level: 2 | 3;
  }[];
  relatedCaseStudySlugs?: string[];
  relatedArticleSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  storagePath?: string;
  folder: 'Profile' | 'Case Studies' | 'Blog' | 'XR' | 'General' | 'SEO';
  altText: string;
  size: string;
  dimensions?: string;
  mimeType?: string;
  fileSize?: number;
  uploadedBy?: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  projectType: ProjectType | string;
  message: string;
  submittedAt: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Archived' | 'new' | 'read' | 'archived';
  notes?: string;
}

export interface SeoMetadata {
  id?: string;
  pageRoute: string;
  title: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  keywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SeoConfig {
  siteTitle: string;
  defaultDescription: string;
  siteUrl: string;
  author: string;
  twitterHandle: string;
  keywords: string[];
  ogImage: string;
  robots: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  email: string;
  linkedIn: string;
  innovifyXrUrl: string;
  location: string;
  availabilityStatus: 'Open for consulting & advisory' | 'Available for select projects' | 'Fully booked';
  footerCopyright?: string;
}
