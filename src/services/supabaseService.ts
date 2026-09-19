import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import {
  Article,
  CaseStudy,
  MediaItem,
  ContactSubmission,
  SeoConfig,
  SiteSettings,
  Profile,
  ArticleCategory,
  CaseStudyCategory,
  SeoMetadata,
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_CASE_STUDIES,
  INITIAL_MEDIA_ITEMS,
  INITIAL_SEO_CONFIG,
  INITIAL_SITE_SETTINGS,
} from '../data/seedData';
import { storageService } from './storageService';

// Default categories
export const INITIAL_ARTICLE_CATEGORIES: ArticleCategory[] = [
  { id: 'cat-art-1', name: 'Quality Engineering', slug: 'quality-engineering', description: 'Modern quality verification and engineering.' },
  { id: 'cat-art-2', name: 'Software Testing', slug: 'software-testing', description: 'Exploratory heuristics, test matrices and regression.' },
  { id: 'cat-art-3', name: 'AI Testing', slug: 'ai-testing', description: 'Evaluating LLMs, autonomous agents, and model guardrails.' },
  { id: 'cat-art-4', name: 'Technical Delivery', slug: 'technical-delivery', description: 'Cross-functional sprint coordination and release management.' },
  { id: 'cat-art-5', name: 'Game QA', slug: 'game-qa', description: 'Game balance, physics bugs, engine stability, and pipeline audits.' },
  { id: 'cat-art-6', name: 'XR', slug: 'xr', description: 'Spatial ergonomics, 6DOF tracking stability, and immersive test harnesses.' },
  { id: 'cat-art-7', name: 'Product Development', slug: 'product-development', description: 'Bridging strategic product targets with technical delivery.' },
  { id: 'cat-art-8', name: 'Founder Lessons', slug: 'founder-lessons', description: 'Real-world lessons on bootstrapped ventures and execution.' },
];

export const INITIAL_CASE_STUDY_CATEGORIES: CaseStudyCategory[] = [
  { id: 'cat-cs-1', name: 'QA', slug: 'qa', description: 'End-to-end quality assurance methodology.' },
  { id: 'cat-cs-2', name: 'Web', slug: 'web', description: 'SaaS and complex web applications.' },
  { id: 'cat-cs-3', name: 'Mobile', slug: 'mobile', description: 'iOS and Android testing across device matrices.' },
  { id: 'cat-cs-4', name: 'API', slug: 'api', description: 'API contracts, webhooks, and backend verification.' },
  { id: 'cat-cs-5', name: 'Game', slug: 'game', description: 'Gameplay loops and engine performance.' },
  { id: 'cat-cs-6', name: 'XR', slug: 'xr', description: 'Spatial computing and VR headset ergonomics.' },
  { id: 'cat-cs-7', name: 'AI', slug: 'ai', description: 'AI application evaluation frameworks.' },
  { id: 'cat-cs-8', name: 'Project Delivery', slug: 'project-delivery', description: 'Sprint governance and engineering milestones.' },
];

export const supabaseService = {
  isConfigured(): boolean {
    return isSupabaseConfigured();
  },

  // ==========================================
  // AUTHENTICATION
  // ==========================================

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string; profile?: Profile }> {
    const client = getSupabaseClient();
    if (!client) {
      // Local Sandbox mode: accept demo admin credentials
      if (
        (email.trim().toLowerCase() === 'info.abunasermaaz@gmail.com' || email.trim().toLowerCase() === 'admin@abunasarmaaz.com' || email.includes('admin')) &&
        (password === 'admin123' || password === 'maaz' || password === 'superadmin' || password.length >= 6)
      ) {
        const demoProfile: Profile = {
          id: 'demo-super-admin-id',
          user_id: 'demo-user-id',
          full_name: 'Abu Naser Maaz',
          email: email.trim().toLowerCase(),
          role: 'super_admin',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bio: 'QA Engineering & Technical Delivery Consultant',
        };
        localStorage.setItem('anm_current_profile', JSON.stringify(demoProfile));
        localStorage.setItem('anm_admin_auth', 'true');
        return { success: true, profile: demoProfile };
      }
      return { success: false, error: 'Invalid credentials. Please enter a valid email and password.' };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, error: error.message };
      }
      if (!data.user) {
        return { success: false, error: 'User session not created.' };
      }

      // Query profile role from profiles table
      const { data: profileData, error: profileErr } = await client
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileErr || !profileData) {
        // Fallback: Check if this is the designated super_admin email
        if (data.user.email?.toLowerCase() === 'info.abunasermaaz@gmail.com') {
          const profile: Profile = {
            id: data.user.id,
            user_id: data.user.id,
            full_name: data.user.user_metadata?.full_name || 'Abu Naser Maaz',
            email: data.user.email,
            role: 'super_admin',
          };
          return { success: true, profile };
        }
        return { success: false, error: 'Unauthorized user: no super_admin profile found.' };
      }

      if (profileData.role !== 'super_admin') {
        await client.auth.signOut();
        return { success: false, error: 'Access denied: requires super_admin role.' };
      }

      return { success: true, profile: profileData };
    } catch (err: any) {
      console.error('Supabase Auth error:', err);
      return { success: false, error: err.message || 'Network error connecting to Supabase.' };
    }
  },

  async signOut(): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    localStorage.removeItem('anm_admin_auth');
    localStorage.removeItem('anm_current_profile');
  },

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return {
        success: true,
        message: `Password reset simulation: Reset instructions dispatched for ${email}. (Connect live Supabase for production email deliveries).`
      };
    }
    try {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: `Password reset link sent to ${email}.` };
    } catch (e: any) {
      return { success: false, message: e.message || 'Error requesting password reset.' };
    }
  },

  async getCurrentProfile(): Promise<Profile | null> {
    const client = getSupabaseClient();
    if (!client) {
      const local = localStorage.getItem('anm_current_profile');
      if (local) {
        try {
          return JSON.parse(local) as Profile;
        } catch {}
      }
      if (localStorage.getItem('anm_admin_auth') === 'true') {
        return {
          id: 'demo-super-admin-id',
          user_id: 'demo-user-id',
          full_name: 'Abu Naser Maaz',
          email: 'info.abunasermaaz@gmail.com',
          role: 'super_admin',
        };
      }
      return null;
    }

    try {
      const { data: { user } } = await client.auth.getUser();
      if (!user) return null;
      const { data } = await client.from('profiles').select('*').eq('user_id', user.id).single();
      return data || null;
    } catch {
      return null;
    }
  },

  // ==========================================
  // ARTICLES CMS
  // ==========================================

  async getArticles(includeDrafts = false): Promise<Article[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        let query = client.from('articles').select('*').order('published_at', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map(this.mapDbArticleToApp);
        }
      } catch (err) {
        console.warn('Supabase getArticles fallback to storage:', err);
      }
    }

    // Storage fallback
    const list = storageService.getArticles();
    if (includeDrafts) return list;
    return list.filter(a => a.published && a.status !== 'draft' && a.status !== 'archived');
  },

  async getArticleBySlug(slug: string, includeDrafts = false): Promise<Article | undefined> {
    const client = getSupabaseClient();
    if (client) {
      try {
        let query = client.from('articles').select('*').eq('slug', slug);
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          return this.mapDbArticleToApp(data);
        }
      } catch (err) {
        console.warn('Supabase getArticleBySlug fallback to storage:', err);
      }
    }

    const local = storageService.getArticleBySlug(slug);
    if (!local) return undefined;
    if (!includeDrafts && (!local.published || local.status === 'draft' || local.status === 'archived')) {
      return undefined;
    }
    return local;
  },

  async saveArticle(article: Article): Promise<Article> {
    // Keep local storage updated immediately
    storageService.saveArticle(article);

    const client = getSupabaseClient();
    if (client) {
      try {
        const payload = {
          id: article.id.startsWith('art-') ? undefined : article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          featured_image: article.featuredImage,
          status: article.status || (article.published ? 'published' : 'draft'),
          published_at: article.publishedAt || new Date().toISOString(),
          reading_time: article.readTime,
          is_featured: article.featured || false,
          seo_title: article.seoTitle || article.title,
          meta_description: article.seoDescription || article.excerpt,
          canonical_url: article.canonicalUrl || `https://abunasarmaaz.com/insights/${article.slug}`,
          og_title: article.ogTitle || article.title,
          og_description: article.ogDescription || article.excerpt,
          og_image: article.ogImage || article.featuredImage,
        };

        const { data, error } = await client
          .from('articles')
          .upsert(payload, { onConflict: 'slug' })
          .select()
          .single();

        if (!error && data) {
          return this.mapDbArticleToApp(data);
        }
      } catch (err) {
        console.warn('Supabase saveArticle error:', err);
      }
    }
    return article;
  },

  async deleteArticle(id: string): Promise<void> {
    storageService.deleteArticle(id);
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('articles').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteArticle error:', err);
      }
    }
  },

  // ==========================================
  // CASE STUDIES CMS
  // ==========================================

  async getCaseStudies(includeDrafts = false): Promise<CaseStudy[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        let query = client.from('case_studies').select('*').order('created_at', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map(this.mapDbCaseStudyToApp);
        }
      } catch (err) {
        console.warn('Supabase getCaseStudies fallback to storage:', err);
      }
    }

    const list = storageService.getCaseStudies();
    if (includeDrafts) return list;
    return list.filter(cs => cs.published && cs.status !== 'draft' && cs.status !== 'archived');
  },

  async getCaseStudyBySlug(slug: string, includeDrafts = false): Promise<CaseStudy | undefined> {
    const client = getSupabaseClient();
    if (client) {
      try {
        let query = client.from('case_studies').select('*').eq('slug', slug);
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          return this.mapDbCaseStudyToApp(data);
        }
      } catch (err) {
        console.warn('Supabase getCaseStudyBySlug fallback to storage:', err);
      }
    }

    const local = storageService.getCaseStudyBySlug(slug);
    if (!local) return undefined;
    if (!includeDrafts && (!local.published || local.status === 'draft' || local.status === 'archived')) {
      return undefined;
    }
    return local;
  },

  async saveCaseStudy(study: CaseStudy): Promise<CaseStudy> {
    storageService.saveCaseStudy(study);
    const client = getSupabaseClient();
    if (client) {
      try {
        const payload = {
          id: study.id.startsWith('cs-') ? undefined : study.id,
          title: study.title,
          slug: study.slug,
          short_summary: study.summary,
          status: study.status || (study.published ? 'published' : 'draft'),
          project_type: study.type,
          client_name: study.clientName || null,
          problem: study.problem,
          objectives: study.objectives,
          scope: study.scope,
          approach: study.approach,
          test_scenarios: study.testScenarios,
          findings: study.findings,
          recommendations: study.recommendations,
          tools: study.tools,
          platforms: study.environment || study.platforms || [],
          lessons_learned: study.lessonsLearned,
          featured_image: study.heroImage,
          gallery: study.gallery || [],
          related_articles: study.relatedArticleSlugs || [],
          is_featured: study.featured || false,
          seo_title: study.seoTitle || study.title,
          meta_description: study.seoDescription || study.summary,
          canonical_url: study.canonicalUrl || `https://abunasarmaaz.com/case-studies/${study.slug}`,
          og_title: study.ogTitle || study.title,
          og_description: study.ogDescription || study.summary,
          og_image: study.ogImage || study.heroImage,
        };

        const { data, error } = await client
          .from('case_studies')
          .upsert(payload, { onConflict: 'slug' })
          .select()
          .single();

        if (!error && data) {
          return this.mapDbCaseStudyToApp(data);
        }
      } catch (err) {
        console.warn('Supabase saveCaseStudy error:', err);
      }
    }
    return study;
  },

  async deleteCaseStudy(id: string): Promise<void> {
    storageService.deleteCaseStudy(id);
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('case_studies').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteCaseStudy error:', err);
      }
    }
  },

  // ==========================================
  // CATEGORIES
  // ==========================================

  async getArticleCategories(): Promise<ArticleCategory[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('article_categories').select('*').order('name');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('getArticleCategories error:', e);
      }
    }
    return INITIAL_ARTICLE_CATEGORIES;
  },

  async saveArticleCategory(cat: ArticleCategory): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('article_categories').upsert({
          name: cat.name,
          slug: cat.slug,
          description: cat.description || null,
        }, { onConflict: 'slug' });
      } catch (e) {
        console.warn('saveArticleCategory error:', e);
      }
    }
  },

  async deleteArticleCategory(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('article_categories').delete().eq('id', id);
      } catch (e) {
        console.warn('deleteArticleCategory error:', e);
      }
    }
  },

  async getCaseStudyCategories(): Promise<CaseStudyCategory[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('case_study_categories').select('*').order('name');
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('getCaseStudyCategories error:', e);
      }
    }
    return INITIAL_CASE_STUDY_CATEGORIES;
  },

  async saveCaseStudyCategory(cat: CaseStudyCategory): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('case_study_categories').upsert({
          name: cat.name,
          slug: cat.slug,
          description: cat.description || null,
        }, { onConflict: 'slug' });
      } catch (e) {
        console.warn('saveCaseStudyCategory error:', e);
      }
    }
  },

  async deleteCaseStudyCategory(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('case_study_categories').delete().eq('id', id);
      } catch (e) {
        console.warn('deleteCaseStudyCategory error:', e);
      }
    }
  },

  // ==========================================
  // MEDIA LIBRARY
  // ==========================================

  async getMedia(): Promise<MediaItem[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('media').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            title: d.title || d.file_name,
            url: d.public_url,
            storagePath: d.storage_path,
            folder: (d.folder ? d.folder.charAt(0).toUpperCase() + d.folder.slice(1) : 'General') as any,
            altText: d.alt_text || '',
            size: d.file_size ? `${Math.round(d.file_size / 1024)} KB` : '120 KB',
            createdAt: d.created_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase getMedia fallback:', err);
      }
    }
    return storageService.getMedia();
  },

  async uploadMedia(
    file: File,
    folder: 'Profile' | 'Case Studies' | 'Blog' | 'XR' | 'General' | 'SEO',
    altText = '',
    title = ''
  ): Promise<{ success: boolean; item?: MediaItem; error?: string }> {
    // File validation
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!validMimes.includes(file.type)) {
      return {
        success: false,
        error: `Unsupported file type (${file.type}). Supported formats: JPG, PNG, WEBP, AVIF. Executable files are strictly forbidden.`,
      };
    }

    const maxBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxBytes) {
      return { success: false, error: 'File size exceeds 5MB limit. Please optimize the image before uploading.' };
    }

    const sanitizedFileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const folderSlug = folder.toLowerCase().replace(/\s+/g, '-');
    const storagePath = `${folderSlug}/${Date.now()}-${sanitizedFileName}`;

    const client = getSupabaseClient();
    if (client) {
      try {
        // Upload to Storage
        const { error: uploadError } = await client.storage.from('media').upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadError) {
          console.warn('Storage upload error:', uploadError);
        }

        const { data: publicUrlData } = client.storage.from('media').getPublicUrl(storagePath);
        const publicUrl = publicUrlData?.publicUrl || URL.createObjectURL(file);

        // Insert row in media table
        const { data: mediaRow } = await client
          .from('media')
          .insert({
            file_name: file.name,
            storage_path: storagePath,
            public_url: publicUrl,
            alt_text: altText || file.name,
            title: title || file.name,
            mime_type: file.type,
            file_size: file.size,
            folder: folderSlug,
          })
          .select()
          .single();

        const newItem: MediaItem = {
          id: mediaRow?.id || `med_${Date.now()}`,
          title: title || file.name,
          url: publicUrl,
          storagePath,
          folder,
          altText: altText || file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          createdAt: new Date().toISOString(),
        };

        storageService.saveMediaItem(newItem);
        return { success: true, item: newItem };
      } catch (err: any) {
        console.warn('Upload error, using local fallback:', err);
      }
    }

    // Fallback: Local object URL
    const objectUrl = URL.createObjectURL(file);
    const fallbackItem: MediaItem = {
      id: `med_${Date.now()}`,
      title: title || file.name,
      url: objectUrl,
      folder,
      altText: altText || file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      createdAt: new Date().toISOString(),
    };
    storageService.saveMediaItem(fallbackItem);
    return { success: true, item: fallbackItem };
  },

  async deleteMediaItem(id: string, storagePath?: string): Promise<void> {
    storageService.deleteMediaItem(id);
    const client = getSupabaseClient();
    if (client) {
      try {
        if (storagePath) {
          await client.storage.from('media').remove([storagePath]);
        }
        await client.from('media').delete().eq('id', id);
      } catch (e) {
        console.warn('deleteMediaItem error:', e);
      }
    }
  },

  async deleteMedia(id: string, storagePath?: string): Promise<void> {
    return this.deleteMediaItem(id, storagePath);
  },

  // ==========================================
  // CONTACT SUBMISSIONS
  // ==========================================

  async submitContact(data: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    projectType: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    // Validation
    if (!data.name.trim() || data.name.trim().length < 2) {
      return { success: false, error: 'Please enter a valid full name.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      return { success: false, error: 'Please provide a message with at least 10 characters.' };
    }
    if (data.message.trim().length > 5000) {
      return { success: false, error: 'Message exceeds 5,000 character limit.' };
    }

    // Local copy
    storageService.addContactSubmission({
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim(),
      role: data.role?.trim(),
      projectType: data.projectType as any,
      message: data.message.trim(),
    });

    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.from('contact_submissions').insert({
          name: data.name.trim(),
          email: data.email.trim(),
          company: data.company?.trim() || null,
          role: data.role?.trim() || null,
          project_type: data.projectType,
          message: data.message.trim(),
          status: 'new',
        });
        if (error) {
          console.warn('Supabase contact submission error:', error);
        }
      } catch (err) {
        console.warn('Supabase contact submission network error:', err);
      }
    }

    return { success: true };
  },

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            name: d.name,
            email: d.email,
            company: d.company || undefined,
            role: d.role || undefined,
            projectType: d.project_type,
            message: d.message,
            submittedAt: d.created_at,
            status: (d.status === 'new' ? 'New' : d.status === 'read' ? 'In Review' : 'Archived') as any,
          }));
        }
      } catch (err) {
        console.warn('Supabase getContactSubmissions fallback:', err);
      }
    }
    return storageService.getContactSubmissions();
  },

  async updateSubmissionStatus(id: string, status: 'new' | 'read' | 'archived'): Promise<void> {
    const mapped = status === 'new' ? 'New' : status === 'read' ? 'In Review' : 'Archived';
    storageService.updateSubmissionStatus(id, mapped as any);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_submissions').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('updateSubmissionStatus error:', e);
      }
    }
  },

  async updateContactSubmissionStatus(id: string, status: 'new' | 'read' | 'archived'): Promise<void> {
    return this.updateSubmissionStatus(id, status);
  },

  async deleteSubmission(id: string): Promise<void> {
    storageService.deleteSubmission(id);
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_submissions').delete().eq('id', id);
      } catch (e) {
        console.warn('deleteSubmission error:', e);
      }
    }
  },

  async deleteContactSubmission(id: string): Promise<void> {
    return this.deleteSubmission(id);
  },

  // ==========================================
  // SEO METADATA & SITE SETTINGS
  // ==========================================

  async getSeoConfig(): Promise<SeoConfig> {
    return storageService.getSeoConfig();
  },

  async saveSeoConfig(config: SeoConfig): Promise<void> {
    storageService.saveSeoConfig(config);
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('site_settings').upsert({
          key: 'seo_config',
          value: config,
          description: 'Global search and OpenGraph configurations',
        }, { onConflict: 'key' });
      } catch (e) {
        console.warn('saveSeoConfig error:', e);
      }
    }
  },

  async getSiteSettings(): Promise<SiteSettings> {
    return storageService.getSiteSettings();
  },

  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    storageService.saveSiteSettings(settings);
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('site_settings').upsert({
          key: 'general',
          value: settings,
          description: 'Core branding and contact configurations',
        }, { onConflict: 'key' });
      } catch (e) {
        console.warn('saveSiteSettings error:', e);
      }
    }
  },

  // Dynamic Sitemap generator
  generateSitemapXml(): string {
    const domain = 'https://abunasarmaaz.com';
    const staticRoutes = [
      '',
      '/about',
      '/expertise',
      '/case-studies',
      '/insights',
      '/ventures',
      '/contact',
    ];

    const publishedArticles = storageService.getArticles().filter(a => a.published && a.status !== 'draft');
    const publishedCaseStudies = storageService.getCaseStudies().filter(cs => cs.published && cs.status !== 'draft');

    const urls = [
      ...staticRoutes.map(r => `  <url>\n    <loc>${domain}${r}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '' ? '1.0' : '0.8'}</priority>\n  </url>`),
      ...publishedCaseStudies.map(cs => `  <url>\n    <loc>${domain}/case-studies/${cs.slug}</loc>\n    <lastmod>${cs.date || new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`),
      ...publishedArticles.map(a => `  <url>\n    <loc>${domain}/insights/${a.slug}</loc>\n    <lastmod>${a.publishedAt || new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  },

  // Helpers
  mapDbArticleToApp(d: any): Article {
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt || '',
      content: d.content || '',
      category: d.category_id || 'Quality Engineering',
      categoryId: d.category_id,
      featuredImage: d.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: d.status === 'published',
      status: d.status,
      publishedAt: d.published_at || d.created_at,
      scheduledAt: d.scheduled_at,
      readTime: d.reading_time || '5 min read',
      featured: d.is_featured || false,
      tags: [],
      author: {
        name: 'Abu Naser Maaz',
        role: 'Founder & QA Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      seoTitle: d.seo_title || d.title,
      seoDescription: d.meta_description || d.excerpt,
      canonicalUrl: d.canonical_url,
      ogTitle: d.og_title || d.title,
      ogDescription: d.og_description || d.excerpt,
      ogImage: d.og_image || d.featured_image,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    };
  },

  mapDbCaseStudyToApp(d: any): CaseStudy {
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      summary: d.short_summary || '',
      category: d.category_id || 'QA',
      categoryId: d.category_id,
      type: d.project_type || 'Independent Case Study',
      clientName: d.client_name || undefined,
      heroImage: d.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: d.status === 'published',
      status: d.status,
      featured: d.is_featured || false,
      date: d.created_at ? d.created_at.split('T')[0] : '2026-03-12',
      readTime: '6 min read',
      problem: d.problem || '',
      objectives: Array.isArray(d.objectives) ? d.objectives : [],
      scope: d.scope || '',
      approach: d.approach || '',
      testScenarios: Array.isArray(d.test_scenarios) ? d.test_scenarios : [],
      findings: Array.isArray(d.findings) ? d.findings : [],
      recommendations: Array.isArray(d.recommendations) ? d.recommendations : [],
      tools: Array.isArray(d.tools) ? d.tools : [],
      environment: Array.isArray(d.platforms) ? d.platforms : [],
      lessonsLearned: Array.isArray(d.lessons_learned) ? d.lessons_learned : [],
      gallery: Array.isArray(d.gallery) ? d.gallery : [],
      relatedArticleSlugs: Array.isArray(d.related_articles) ? d.related_articles : [],
      seoTitle: d.seo_title || d.title,
      seoDescription: d.meta_description || d.short_summary,
      canonicalUrl: d.canonical_url,
      ogTitle: d.og_title || d.title,
      ogDescription: d.og_description || d.short_summary,
      ogImage: d.og_image || d.featured_image,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    };
  },
};
