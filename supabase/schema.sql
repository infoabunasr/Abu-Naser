-- ==============================================================================
-- PRODUCTION SUPABASE DATABASE SCHEMA FOR ABU NASER MAAZ CMS
-- ==============================================================================
-- Tables:
-- 1. profiles
-- 2. article_categories
-- 3. article_tags
-- 4. article_tag_relations
-- 5. articles
-- 6. case_study_categories
-- 7. case_studies
-- 8. media
-- 9. seo_metadata
-- 10. contact_submissions
-- 11. site_settings
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- HELPER FUNCTIONS
-- ==============================================================================

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Helper to check if current user is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 1. PROFILES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'editor', 'author')),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 2. ARTICLE CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS article_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_article_categories_updated_at
BEFORE UPDATE ON article_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 3. ARTICLE TAGS & RELATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS article_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. ARTICLES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    reading_time TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    seo_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Article Tags Junction
CREATE TABLE IF NOT EXISTS article_tag_relations (
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES article_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- ==============================================================================
-- 5. CASE STUDY CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS case_study_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_case_study_categories_updated_at
BEFORE UPDATE ON case_study_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 6. CASE STUDIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES case_study_categories(id) ON DELETE SET NULL,
    short_summary TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    project_type TEXT NOT NULL DEFAULT 'Independent Case Study' CHECK (
        project_type IN ('Independent Case Study', 'Client Project', 'Prototype', 'Portfolio Project', 'In Development')
    ),
    client_name TEXT,
    problem TEXT,
    objectives JSONB NOT NULL DEFAULT '[]'::JSONB,
    scope TEXT,
    approach TEXT,
    test_scenarios JSONB NOT NULL DEFAULT '[]'::JSONB,
    findings JSONB NOT NULL DEFAULT '[]'::JSONB,
    recommendations JSONB NOT NULL DEFAULT '[]'::JSONB,
    tools JSONB NOT NULL DEFAULT '[]'::JSONB,
    platforms JSONB NOT NULL DEFAULT '[]'::JSONB,
    lessons_learned JSONB NOT NULL DEFAULT '[]'::JSONB,
    featured_image TEXT,
    gallery JSONB NOT NULL DEFAULT '[]'::JSONB,
    related_articles JSONB NOT NULL DEFAULT '[]'::JSONB,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    seo_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON case_studies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 7. MEDIA TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    alt_text TEXT DEFAULT '',
    title TEXT DEFAULT '',
    mime_type TEXT,
    file_size BIGINT,
    folder TEXT NOT NULL DEFAULT 'general' CHECK (
        folder IN ('profile', 'case-studies', 'blog', 'general', 'seo')
    ),
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. SEO METADATA TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_route TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_description TEXT,
    canonical_url TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    twitter_card TEXT DEFAULT 'summary_large_image',
    keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_seo_metadata_updated_at
BEFORE UPDATE ON seo_metadata
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 9. CONTACT SUBMISSIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    project_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 10. SITE SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status_pub ON articles(status, published_at);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);

CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_contact_status_created ON contact_submissions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_page_route ON seo_metadata(page_route);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage all profiles" 
ON profiles FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 2. Article Categories Policies
CREATE POLICY "Public can view article categories" 
ON article_categories FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage article categories" 
ON article_categories FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 3. Article Tags Policies
CREATE POLICY "Public can view article tags" 
ON article_tags FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage article tags" 
ON article_tags FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 4. Article Tag Relations Policies
CREATE POLICY "Public can view article tag relations" 
ON article_tag_relations FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage article tag relations" 
ON article_tag_relations FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 5. Articles Policies
-- Public can only view published articles whose published_at is in the past (or null)
CREATE POLICY "Public can view published articles" 
ON articles FOR SELECT 
USING (
    status = 'published' AND (published_at IS NULL OR published_at <= NOW())
);

CREATE POLICY "Super admins can manage all articles" 
ON articles FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 6. Case Study Categories Policies
CREATE POLICY "Public can view case study categories" 
ON case_study_categories FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage case study categories" 
ON case_study_categories FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 7. Case Studies Policies
CREATE POLICY "Public can view published case studies" 
ON case_studies FOR SELECT 
USING (status = 'published');

CREATE POLICY "Super admins can manage all case studies" 
ON case_studies FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 8. Media Policies
CREATE POLICY "Public can view media items" 
ON media FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage all media" 
ON media FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 9. SEO Metadata Policies
CREATE POLICY "Public can view seo metadata" 
ON seo_metadata FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage seo metadata" 
ON seo_metadata FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 10. Contact Submissions Policies
-- Public can create submissions (with validation guards)
CREATE POLICY "Public can submit contact messages" 
ON contact_submissions FOR INSERT 
WITH CHECK (
    char_length(name) >= 2 AND 
    char_length(email) >= 5 AND 
    char_length(message) >= 10 AND 
    char_length(message) <= 5000
);

-- Only Super Admins can view/update/delete contact submissions
CREATE POLICY "Super admins can manage contact submissions" 
ON contact_submissions FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- 11. Site Settings Policies
CREATE POLICY "Public can view site settings" 
ON site_settings FOR SELECT 
USING (true);

CREATE POLICY "Super admins can manage site settings" 
ON site_settings FOR ALL 
TO authenticated 
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION & POLICIES
-- ==============================================================================
-- Bucket: media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read any file in the media bucket
CREATE POLICY "Public Access for Media Bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Only super_admin can upload to media bucket
CREATE POLICY "Super admin can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media' AND is_super_admin());

-- Only super_admin can update media objects
CREATE POLICY "Super admin can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND is_super_admin());

-- Only super_admin can delete media objects
CREATE POLICY "Super admin can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND is_super_admin());

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. Article Categories
INSERT INTO article_categories (name, slug, description) VALUES
('Quality Engineering', 'quality-engineering', 'Modern paradigms for software verification, continuous quality gates, and risk engineering.'),
('Software Testing', 'software-testing', 'Core test methodology, exploratory heuristics, defect taxonomy, and regression design.'),
('AI Testing', 'ai-testing', 'Evaluating prompt robustness, non-deterministic model outputs, hallucination boundaries, and agent verification.'),
('Technical Delivery', 'technical-delivery', 'Cross-functional sprint coordination, engineering release cadences, blocker resolution, and risk tracking.'),
('Game QA', 'game-qa', 'Gameplay balance verification, physics boundary checks, engine memory stability, and asset pipeline audits.'),
('XR', 'xr', 'Spatial computing ergonomics, 6DOF tracking stability, motion-to-photon latency, and Unity/Unreal test harnesses.'),
('Product Development', 'product-development', 'Bridging strategic product objectives with technical execution and user expectations.'),
('Founder Lessons', 'founder-lessons', 'Real-world insights on technical leadership, venture bootstrapping, and operational discipline.')
ON CONFLICT (slug) DO NOTHING;

-- 2. Case Study Categories
INSERT INTO case_study_categories (name, slug, description) VALUES
('QA', 'qa', 'End-to-end quality assurance and test design methodologies.'),
('Web', 'web', 'Full-stack web application quality, security validation, and cross-browser resilience.'),
('Mobile', 'mobile', 'Native and hybrid iOS/Android test suites, device matrix verification, and offline resilience.'),
('API', 'api', 'REST, GraphQL, webhook contract verification, and payload security testing.'),
('Game', 'game', 'Gameplay loop verification, physics edge-cases, and frame-rate optimization.'),
('XR', 'xr', 'Immersive spatial applications, VR headset ergonomics, and hand-tracking precision.'),
('AI', 'ai', 'Evaluation frameworks for LLMs, autonomous agents, and computer vision models.'),
('Project Delivery', 'project-delivery', 'Sprint release governance, multi-team dependencies, and technical risk triage.')
ON CONFLICT (slug) DO NOTHING;

-- 3. Initial Site Settings
INSERT INTO site_settings (key, value, description) VALUES
('general', '{
    "name": "Abu Naser Maaz",
    "tagline": "Quality Engineering & Technical Project Delivery",
    "heroHeadline": "I Help Founders & Product Teams Ship Better Software",
    "heroSubheadline": "I work across Quality Engineering, Software Testing, and Technical Project Delivery to help product teams identify risks, improve product quality, and deliver reliable digital experiences.",
    "email": "info.abunasermaaz@gmail.com",
    "linkedIn": "https://linkedin.com/in/abunasarmaaz/",
    "innovifyXrUrl": "https://innovifyxr.com",
    "location": "Dhaka, Bangladesh (Available Globally / Remote)",
    "availabilityStatus": "Open for consulting & advisory",
    "footerCopyright": "© Abu Naser Maaz. All rights reserved."
}'::JSONB, 'Core branding and contact configurations')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 4. Initial SEO Metadata
INSERT INTO seo_metadata (page_route, title, meta_description, canonical_url, og_title, og_description, keywords) VALUES
('/', 'Abu Naser Maaz — Quality Engineering & Technical Delivery', 'I help founders and product teams ship reliable software through structured QA, risk-based testing, AI application evaluation, and technical project delivery.', 'https://abunasarmaaz.com/', 'Abu Naser Maaz — Quality Engineering & Technical Delivery', 'I help founders and product teams ship reliable software through structured QA, risk-based testing, AI application evaluation, and technical project delivery.', ARRAY['Quality Engineering', 'Software QA', 'Software Testing', 'Technical Project Delivery', 'AI Testing', 'XR Testing']),
('/about', 'About Abu Naser Maaz — Background, Philosophy & Experience', 'Learn about Abu Naser Maaz, his journey in software quality engineering, leadership philosophy, and technical project delivery.', 'https://abunasarmaaz.com/about', 'About Abu Naser Maaz', 'Learn about Abu Naser Maaz, his journey in software quality engineering, leadership philosophy, and technical project delivery.', ARRAY['About Abu Naser Maaz', 'QA Leadership', 'Technical Delivery']),
('/expertise', 'Core Technical Expertise & Services — Abu Naser Maaz', 'Detailed technical capabilities across Quality Engineering, AI Testing, Web/Mobile QA, XR/Spatial Validation, and Project Delivery.', 'https://abunasarmaaz.com/expertise', 'Core Technical Expertise — Abu Naser Maaz', 'Detailed technical capabilities across Quality Engineering, AI Testing, Web/Mobile QA, XR/Spatial Validation, and Project Delivery.', ARRAY['QA Services', 'AI Testing', 'Game QA', 'Technical Project Delivery']),
('/case-studies', 'Practical QA & Delivery Case Studies — Abu Naser Maaz', 'Explore structured case studies across Web QA, Mobile App testing, AI evaluation, Game QA, XR ergonomics, and Agile project delivery.', 'https://abunasarmaaz.com/case-studies', 'Case Studies & Verification — Abu Naser Maaz', 'Explore structured case studies across Web QA, Mobile App testing, AI evaluation, Game QA, XR ergonomics, and Agile project delivery.', ARRAY['Case Studies', 'Software Testing Reports', 'QA Verification']),
('/insights', 'Insights on Software Quality & Technical Delivery — Abu Naser Maaz', 'Practical articles on quality engineering, risk-based testing, AI application evaluation, agile sprint coordination, and XR QA.', 'https://abunasarmaaz.com/insights', 'Insights on Quality & Delivery — Abu Naser Maaz', 'Practical articles on quality engineering, risk-based testing, AI application evaluation, agile sprint coordination, and XR QA.', ARRAY['QA Articles', 'Tech Blog', 'Software Quality Insights']),
('/ventures', 'Ventures & Initiatives — Innovify XR & Beyond', 'Explore Abu Naser Maaz''s entrepreneurial initiatives, including Innovify XR and early-stage software projects.', 'https://abunasarmaaz.com/ventures', 'Ventures & Initiatives — Abu Naser Maaz', 'Explore Abu Naser Maaz''s entrepreneurial initiatives, including Innovify XR and early-stage software projects.', ARRAY['Innovify XR', 'Ventures', 'XR Startups']),
('/contact', 'Contact Abu Naser Maaz — Project Inquiries & Consulting', 'Get in touch for quality engineering audits, technical project delivery advisory, or collaborative software ventures.', 'https://abunasarmaaz.com/contact', 'Contact Abu Naser Maaz', 'Get in touch for quality engineering audits, technical project delivery advisory, or collaborative software ventures.', ARRAY['Contact', 'Consulting Inquiry', 'Hire QA Lead'])
ON CONFLICT (page_route) DO NOTHING;
