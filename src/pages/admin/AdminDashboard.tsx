import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../services/supabaseService';
import { storageService } from '../../services/storageService';
import {
  Article,
  CaseStudy,
  ContactSubmission,
  MediaItem,
  SeoConfig,
  SiteSettings,
  Profile,
  ArticleCategory,
  CaseStudyCategory
} from '../../types';

import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { AdminOverview } from './AdminOverview';
import { ArticlesCms } from './ArticlesCms';
import { CaseStudiesCms } from './CaseStudiesCms';
import { CategoriesCms } from './CategoriesCms';
import { MediaLibraryCms } from './MediaLibraryCms';
import { SeoManagementCms } from './SeoManagementCms';
import { ContactSubmissionsCms } from './ContactSubmissionsCms';
import { SiteSettingsCms } from './SiteSettingsCms';
import { AdminProfileCms } from './AdminProfileCms';

import { InsightDetailPage } from '../InsightDetailPage';
import { CaseStudyDetailPage } from '../CaseStudyDetailPage';

interface AdminDashboardProps {
  currentRoute?: string;
  onNavigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentRoute = '/admin',
  onNavigate,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      localStorage.getItem('anm_admin_auth') === 'true' ||
      !!localStorage.getItem('sb-access-token')
    );
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // App Data State
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [articleCategories, setArticleCategories] = useState<ArticleCategory[]>([]);
  const [caseStudyCategories, setCaseStudyCategories] = useState<CaseStudyCategory[]>([]);
  const [seoConfig, setSeoConfig] = useState<SeoConfig>(supabaseService.getSeoConfig());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(supabaseService.getSiteSettings());

  // Editing state for new or edit routes
  const [initialEditArticleId, setInitialEditArticleId] = useState<string | null>(null);
  const [initialEditCaseStudyId, setInitialEditCaseStudyId] = useState<string | null>(null);

  // Check Supabase session & fetch initial records
  useEffect(() => {
    const initData = async () => {
      try {
        const userProfile = await supabaseService.getCurrentProfile();
        if (userProfile) {
          setProfile(userProfile);
          setIsAuthenticated(true);
        } else if (localStorage.getItem('anm_admin_auth') === 'true') {
          // Local fallback admin session
          setProfile({
            id: 'admin-fallback',
            email: 'info.abunasermaaz@gmail.com',
            full_name: 'Abu Naser Maaz',
            role: 'super_admin',
            created_at: new Date().toISOString(),
          });
        }

        // Fetch all datasets from Supabase (with fallback)
        const [arts, css, med, subs, artCats, csCats, seo, settings] = await Promise.all([
          supabaseService.getArticles(),
          supabaseService.getCaseStudies(),
          supabaseService.getMedia(),
          supabaseService.getContactSubmissions(),
          supabaseService.getArticleCategories(),
          supabaseService.getCaseStudyCategories(),
          supabaseService.getSeoConfig(),
          supabaseService.getSiteSettings(),
        ]);

        setArticles(arts);
        setCaseStudies(css);
        setMedia(med);
        setSubmissions(subs);
        setArticleCategories(artCats);
        setCaseStudyCategories(csCats);
        setSeoConfig(seo);
        setSiteSettings(settings);
      } catch (err) {
        console.error('Error initializing admin data:', err);
      } finally {
        setLoadingInitial(false);
      }
    };

    initData();
  }, []);

  // Determine active section from route
  const getActiveSection = (): string => {
    if (currentRoute === '/admin' || currentRoute === '/admin/') return 'overview';
    if (currentRoute.startsWith('/admin/articles')) return 'articles';
    if (currentRoute.startsWith('/admin/case-studies')) return 'case-studies';
    if (currentRoute.startsWith('/admin/categories')) return 'categories';
    if (currentRoute.startsWith('/admin/media')) return 'media';
    if (currentRoute.startsWith('/admin/seo')) return 'seo';
    if (currentRoute.startsWith('/admin/contact-submissions')) return 'submissions';
    if (currentRoute.startsWith('/admin/settings')) return 'settings';
    if (currentRoute.startsWith('/admin/profile')) return 'profile';
    return 'overview';
  };

  // Check for edit IDs in URL if applicable
  useEffect(() => {
    if (currentRoute.startsWith('/admin/articles/edit/')) {
      const id = currentRoute.replace('/admin/articles/edit/', '');
      setInitialEditArticleId(id);
    } else if (currentRoute === '/admin/articles/new') {
      setInitialEditArticleId('new');
    } else {
      setInitialEditArticleId(null);
    }

    if (currentRoute.startsWith('/admin/case-studies/edit/')) {
      const id = currentRoute.replace('/admin/case-studies/edit/', '');
      setInitialEditCaseStudyId(id);
    } else if (currentRoute === '/admin/case-studies/new') {
      setInitialEditCaseStudyId('new');
    } else {
      setInitialEditCaseStudyId(null);
    }
  }, [currentRoute]);

  // Auth Handlers
  const handleLoginSuccess = (userProfile: Profile) => {
    setProfile(userProfile);
    setIsAuthenticated(true);
    localStorage.setItem('anm_admin_auth', 'true');
    onNavigate('/admin');
  };

  const handleLogout = async () => {
    await supabaseService.signOut();
    setIsAuthenticated(false);
    setProfile(null);
    localStorage.removeItem('anm_admin_auth');
    onNavigate('/admin/login');
  };

  // Article handlers
  const handleSaveArticle = async (article: Article) => {
    await supabaseService.saveArticle(article);
    const updated = await supabaseService.getArticles();
    setArticles(updated);
  };

  const handleDeleteArticle = async (id: string) => {
    await supabaseService.deleteArticle(id);
    const updated = await supabaseService.getArticles();
    setArticles(updated);
  };

  // Case Study handlers
  const handleSaveCaseStudy = async (study: CaseStudy) => {
    await supabaseService.saveCaseStudy(study);
    const updated = await supabaseService.getCaseStudies();
    setCaseStudies(updated);
  };

  const handleDeleteCaseStudy = async (id: string) => {
    await supabaseService.deleteCaseStudy(id);
    const updated = await supabaseService.getCaseStudies();
    setCaseStudies(updated);
  };

  // Category handlers
  const handleSaveArticleCategory = async (cat: ArticleCategory) => {
    await supabaseService.saveArticleCategory(cat);
    const updated = await supabaseService.getArticleCategories();
    setArticleCategories(updated);
  };

  const handleDeleteArticleCategory = async (id: string) => {
    await supabaseService.deleteArticleCategory(id);
    const updated = await supabaseService.getArticleCategories();
    setArticleCategories(updated);
  };

  const handleSaveCaseStudyCategory = async (cat: CaseStudyCategory) => {
    await supabaseService.saveCaseStudyCategory(cat);
    const updated = await supabaseService.getCaseStudyCategories();
    setCaseStudyCategories(updated);
  };

  const handleDeleteCaseStudyCategory = async (id: string) => {
    await supabaseService.deleteCaseStudyCategory(id);
    const updated = await supabaseService.getCaseStudyCategories();
    setCaseStudyCategories(updated);
  };

  // Media handlers
  const handleUploadMedia = async (
    file: File,
    folder: 'Profile' | 'Case Studies' | 'Blog' | 'XR' | 'General' | 'SEO',
    altText: string,
    title: string
  ) => {
    const res = await supabaseService.uploadMedia(file, folder, altText, title);
    if (res.item) {
      const updated = await supabaseService.getMedia();
      setMedia(updated);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const handleDeleteMedia = async (id: string, storagePath?: string) => {
    await supabaseService.deleteMedia(id, storagePath);
    const updated = await supabaseService.getMedia();
    setMedia(updated);
  };

  // SEO handlers
  const handleSaveSeo = async (config: SeoConfig) => {
    await supabaseService.saveSeoConfig(config);
    setSeoConfig(config);
  };

  // Submission handlers
  const handleUpdateSubmissionStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
    await supabaseService.updateContactSubmissionStatus(id, status);
    const updated = await supabaseService.getContactSubmissions();
    setSubmissions(updated);
  };

  const handleDeleteSubmission = async (id: string) => {
    await supabaseService.deleteContactSubmission(id);
    const updated = await supabaseService.getContactSubmissions();
    setSubmissions(updated);
  };

  // Settings handlers
  const handleSaveSettings = async (settings: SiteSettings) => {
    await supabaseService.saveSiteSettings(settings);
    setSiteSettings(settings);
  };

  // 1. Preview Mode handling for unpublished drafts
  if (currentRoute.startsWith('/admin/preview/article/')) {
    const slug = currentRoute.replace('/admin/preview/article/', '');
    const art = articles.find(a => a.slug === slug);
    return (
      <InsightDetailPage
        slug={slug}
        onNavigate={onNavigate}
        isPreview={true}
        onReturnToEditor={() => onNavigate('/admin/articles')}
        onPublishNow={async () => {
          if (art) {
            await handleSaveArticle({ ...art, published: true, status: 'published' });
            alert('Article published successfully!');
            onNavigate('/admin/articles');
          }
        }}
      />
    );
  }

  if (currentRoute.startsWith('/admin/preview/case-study/')) {
    const slug = currentRoute.replace('/admin/preview/case-study/', '');
    const cs = caseStudies.find(c => c.slug === slug);
    return (
      <CaseStudyDetailPage
        slug={slug}
        onNavigate={onNavigate}
        isPreview={true}
        onReturnToEditor={() => onNavigate('/admin/case-studies')}
        onPublishNow={async () => {
          if (cs) {
            await handleSaveCaseStudy({ ...cs, published: true, status: 'Completed' });
            alert('Case study published successfully!');
            onNavigate('/admin/case-studies');
          }
        }}
      />
    );
  }

  // 2. Unauthenticated check
  if (!isAuthenticated || currentRoute === '/admin/login') {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onNavigate={onNavigate} />;
  }

  // 3. Render authenticated Admin Dashboard with selected page
  const activeSection = getActiveSection();

  return (
    <AdminLayout
      currentRoute={currentRoute}
      onNavigate={onNavigate}
      profile={profile}
      onLogout={handleLogout}
      unreadCount={submissions.filter(s => s.status === 'new' || s.status === 'unread').length}
    >
      {activeSection === 'overview' && (
        <AdminOverview
          articles={articles}
          caseStudies={caseStudies}
          submissions={submissions}
          mediaCount={media.length}
          onNavigate={onNavigate}
        />
      )}

      {activeSection === 'articles' && (
        <ArticlesCms
          articles={articles}
          categories={articleCategories}
          caseStudies={caseStudies}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
          onPreviewArticle={(slug) => onNavigate(`/admin/preview/article/${slug}`)}
          onNavigate={onNavigate}
        />
      )}

      {activeSection === 'case-studies' && (
        <CaseStudiesCms
          caseStudies={caseStudies}
          categories={caseStudyCategories}
          articles={articles}
          onSaveCaseStudy={handleSaveCaseStudy}
          onDeleteCaseStudy={handleDeleteCaseStudy}
          onPreviewCaseStudy={(slug) => onNavigate(`/admin/preview/case-study/${slug}`)}
          onNavigate={onNavigate}
        />
      )}

      {activeSection === 'categories' && (
        <CategoriesCms
          articleCategories={articleCategories}
          caseStudyCategories={caseStudyCategories}
          articles={articles}
          caseStudies={caseStudies}
          onSaveArticleCategory={handleSaveArticleCategory}
          onDeleteArticleCategory={handleDeleteArticleCategory}
          onSaveCaseStudyCategory={handleSaveCaseStudyCategory}
          onDeleteCaseStudyCategory={handleDeleteCaseStudyCategory}
        />
      )}

      {activeSection === 'media' && (
        <MediaLibraryCms
          mediaItems={media}
          onUpload={handleUploadMedia}
          onDelete={handleDeleteMedia}
        />
      )}

      {activeSection === 'seo' && (
        <SeoManagementCms
          seoConfig={seoConfig}
          onSave={handleSaveSeo}
        />
      )}

      {activeSection === 'submissions' && (
        <ContactSubmissionsCms
          submissions={submissions}
          onUpdateStatus={handleUpdateSubmissionStatus}
          onDelete={handleDeleteSubmission}
        />
      )}

      {activeSection === 'settings' && (
        <SiteSettingsCms
          settings={siteSettings}
          onSave={handleSaveSettings}
        />
      )}

      {activeSection === 'profile' && (
        <AdminProfileCms
          profile={profile}
          onLogout={handleLogout}
        />
      )}
    </AdminLayout>
  );
};
