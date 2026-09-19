import React, { useState } from 'react';
import {
  Globe,
  Share2,
  Search,
  Save,
  Download,
  CheckCircle2,
  FileCode,
  ExternalLink,
  Info
} from 'lucide-react';
import { SeoConfig } from '../../types';
import { supabaseService } from '../../services/supabaseService';

interface SeoManagementCmsProps {
  seoConfig: SeoConfig;
  onSave: (config: SeoConfig) => Promise<void>;
}

export const SeoManagementCms: React.FC<SeoManagementCmsProps> = ({
  seoConfig,
  onSave,
}) => {
  const [formData, setFormData] = useState<SeoConfig>(seoConfig);
  const [activeTab, setActiveTab] = useState<'global' | 'pages' | 'sitemap'>('global');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [sitemapXml, setSitemapXml] = useState('');

  const pages = [
    { route: '/', name: 'Home' },
    { route: '/about', name: 'About' },
    { route: '/expertise', name: 'Core Expertise' },
    { route: '/case-studies', name: 'Case Studies Directory' },
    { route: '/insights', name: 'Insights & Blog' },
    { route: '/ventures', name: 'Ventures & Innovify XR' },
    { route: '/contact', name: 'Contact & Inquiries' },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleGenerateSitemap = () => {
    const xml = supabaseService.generateSitemapXml();
    setSitemapXml(xml);
  };

  const downloadSitemapFile = () => {
    const xml = sitemapXml || supabaseService.generateSitemapXml();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">SEO, OpenGraph & Indexing</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Search engine metadata, canonical routing, Google SERP simulator, and XML sitemap
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SEO configuration updated!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('global')}
          className={`py-2.5 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'global'
              ? 'border-zinc-100 text-zinc-100'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Global Meta & Social
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`py-2.5 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'pages'
              ? 'border-zinc-100 text-zinc-100'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Page-Level Overrides
        </button>
        <button
          onClick={() => {
            setActiveTab('sitemap');
            handleGenerateSitemap();
          }}
          className={`py-2.5 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'sitemap'
              ? 'border-zinc-100 text-zinc-100'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Dynamic XML Sitemap & Robots
        </button>
      </div>

      {activeTab === 'global' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Default Site Title
              </label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, siteTitle: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                required
                value={formData.defaultDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, defaultDescription: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Canonical Base Domain
                </label>
                <input
                  type="url"
                  required
                  value={formData.siteUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteUrl: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Twitter / X Handle
                </label>
                <input
                  type="text"
                  value={formData.twitterHandle}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitterHandle: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Default OpenGraph Image URL
              </label>
              <input
                type="url"
                value={formData.ogImage}
                onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Global Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Global SEO Settings</span>
            </button>
          </form>

          {/* Real-time Previews */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google SERP Simulator */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Google Search Engine Result Snippet
              </span>
              <div className="text-xs text-[#8ab4f8] truncate hover:underline cursor-pointer">
                {formData.siteUrl}
              </div>
              <div className="text-sm font-medium text-[#c58af9] line-clamp-1">
                {formData.siteTitle}
              </div>
              <div className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                {formData.defaultDescription}
              </div>
            </div>

            {/* Social Share Card Simulator */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Social Share Card (Twitter / LinkedIn)
              </span>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src={formData.ogImage}
                  alt="OG Preview"
                  className="w-full h-36 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">abunasarmaaz.com</div>
                  <div className="text-xs font-bold text-zinc-100 mt-0.5 truncate">{formData.siteTitle}</div>
                  <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{formData.defaultDescription}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Core route overrides stored directly in <code className="text-zinc-200">seo_metadata</code>. Dynamic pages (individual case studies & insights) inherit the customized title and description set inside their respective CMS editors.
          </p>

          <div className="space-y-3">
            {pages.map((p) => (
              <div
                key={p.route}
                className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-semibold text-xs text-zinc-200">{p.name}</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">{p.route}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40">
                    Configured in Supabase
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sitemap' && (
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400 font-mono">
              Live index generated dynamically across all published articles, case studies, and static routes.
            </p>
            <button
              onClick={downloadSitemapFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download sitemap.xml</span>
            </button>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-300 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{sitemapXml || supabaseService.generateSitemapXml()}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
