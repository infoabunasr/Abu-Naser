import { Article, CaseStudy, ContactSubmission, MediaItem, SeoConfig, SiteSettings } from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_CASE_STUDIES,
  INITIAL_MEDIA_ITEMS,
  INITIAL_SEO_CONFIG,
  INITIAL_SITE_SETTINGS
} from '../data/seedData';

const STORAGE_KEYS = {
  CASE_STUDIES: 'anm_case_studies_v1',
  ARTICLES: 'anm_articles_v1',
  MEDIA: 'anm_media_v1',
  CONTACT_SUBMISSIONS: 'anm_contact_submissions_v1',
  SEO_CONFIG: 'anm_seo_config_v1',
  SITE_SETTINGS: 'anm_site_settings_v1',
  AUTH: 'anm_auth_v1',
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

export const storageService = {
  // Case Studies
  getCaseStudies(): CaseStudy[] {
    return safeGet<CaseStudy[]>(STORAGE_KEYS.CASE_STUDIES, INITIAL_CASE_STUDIES);
  },
  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    const studies = this.getCaseStudies();
    return studies.find(cs => cs.slug === slug);
  },
  saveCaseStudy(study: CaseStudy): CaseStudy {
    const list = this.getCaseStudies();
    const index = list.findIndex(cs => cs.id === study.id);
    let updated: CaseStudy[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = study;
    } else {
      updated = [study, ...list];
    }
    safeSet(STORAGE_KEYS.CASE_STUDIES, updated);
    return study;
  },
  deleteCaseStudy(id: string): void {
    const list = this.getCaseStudies().filter(cs => cs.id !== id);
    safeSet(STORAGE_KEYS.CASE_STUDIES, list);
  },

  // Articles
  getArticles(): Article[] {
    return safeGet<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  },
  getArticleBySlug(slug: string): Article | undefined {
    const articles = this.getArticles();
    return articles.find(a => a.slug === slug);
  },
  saveArticle(article: Article): Article {
    const list = this.getArticles();
    const index = list.findIndex(a => a.id === article.id);
    let updated: Article[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = article;
    } else {
      updated = [article, ...list];
    }
    safeSet(STORAGE_KEYS.ARTICLES, updated);
    return article;
  },
  deleteArticle(id: string): void {
    const list = this.getArticles().filter(a => a.id !== id);
    safeSet(STORAGE_KEYS.ARTICLES, list);
  },

  // Media Library
  getMedia(): MediaItem[] {
    return safeGet<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA_ITEMS);
  },
  saveMediaItem(item: MediaItem): MediaItem {
    const list = this.getMedia();
    const updated = [item, ...list];
    safeSet(STORAGE_KEYS.MEDIA, updated);
    return item;
  },
  deleteMediaItem(id: string): void {
    const list = this.getMedia().filter(m => m.id !== id);
    safeSet(STORAGE_KEYS.MEDIA, list);
  },

  // Contact Submissions
  getContactSubmissions(): ContactSubmission[] {
    return safeGet<ContactSubmission[]>(STORAGE_KEYS.CONTACT_SUBMISSIONS, []);
  },
  addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): ContactSubmission {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };
    const list = this.getContactSubmissions();
    safeSet(STORAGE_KEYS.CONTACT_SUBMISSIONS, [newSubmission, ...list]);
    return newSubmission;
  },
  updateSubmissionStatus(id: string, status: ContactSubmission['status'], notes?: string): void {
    const list = this.getContactSubmissions().map(s => {
      if (s.id === id) {
        return { ...s, status, notes: notes !== undefined ? notes : s.notes };
      }
      return s;
    });
    safeSet(STORAGE_KEYS.CONTACT_SUBMISSIONS, list);
  },
  deleteSubmission(id: string): void {
    const list = this.getContactSubmissions().filter(s => s.id !== id);
    safeSet(STORAGE_KEYS.CONTACT_SUBMISSIONS, list);
  },

  // SEO
  getSeoConfig(): SeoConfig {
    return safeGet<SeoConfig>(STORAGE_KEYS.SEO_CONFIG, INITIAL_SEO_CONFIG);
  },
  saveSeoConfig(config: SeoConfig): void {
    safeSet(STORAGE_KEYS.SEO_CONFIG, config);
  },

  // Site Settings
  getSiteSettings(): SiteSettings {
    return safeGet<SiteSettings>(STORAGE_KEYS.SITE_SETTINGS, INITIAL_SITE_SETTINGS);
  },
  saveSiteSettings(settings: SiteSettings): void {
    safeSet(STORAGE_KEYS.SITE_SETTINGS, settings);
  },

  // Reset & Backup
  resetToDefaults(): void {
    safeSet(STORAGE_KEYS.CASE_STUDIES, INITIAL_CASE_STUDIES);
    safeSet(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
    safeSet(STORAGE_KEYS.MEDIA, INITIAL_MEDIA_ITEMS);
    safeSet(STORAGE_KEYS.SEO_CONFIG, INITIAL_SEO_CONFIG);
    safeSet(STORAGE_KEYS.SITE_SETTINGS, INITIAL_SITE_SETTINGS);
  },

  exportAllData(): string {
    const data = {
      caseStudies: this.getCaseStudies(),
      articles: this.getArticles(),
      media: this.getMedia(),
      contactSubmissions: this.getContactSubmissions(),
      seoConfig: this.getSeoConfig(),
      siteSettings: this.getSiteSettings(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }
};
