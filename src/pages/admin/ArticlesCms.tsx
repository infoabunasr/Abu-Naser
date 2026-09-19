import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  X,
  ExternalLink,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  Send,
  AlertTriangle
} from 'lucide-react';
import { Article, ArticleCategory, ArticleStatus } from '../../types';
import { INITIAL_ARTICLE_CATEGORIES } from '../../services/supabaseService';

interface ArticlesCmsProps {
  articles: Article[];
  categories?: ArticleCategory[];
  onSave: (article: Article) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onPreview: (slug: string) => void;
  initialEditingId?: string | null;
  onCloseEditor?: () => void;
}

export const ArticlesCms: React.FC<ArticlesCmsProps> = ({
  articles,
  categories = INITIAL_ARTICLE_CATEGORIES,
  onSave,
  onDelete,
  onPreview,
  initialEditingId,
  onCloseEditor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ArticleStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Editor State
  const [isEditing, setIsEditing] = useState(Boolean(initialEditingId));
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Model
  const [formData, setFormData] = useState<Partial<Article>>(() => {
    if (initialEditingId) {
      const found = articles.find(a => a.id === initialEditingId);
      if (found) return { ...found };
    }
    return {
      title: '',
      slug: '',
      excerpt: '',
      category: 'Quality Engineering',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: false,
      status: 'draft',
      readTime: '5 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      featured: false,
      tags: ['Quality Engineering', 'Testing'],
      seoTitle: '',
      seoDescription: '',
    };
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    const autoSlug = !formData.id ? slugify(newTitle) : formData.slug;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: autoSlug,
      seoTitle: prev.seoTitle || newTitle,
    }));
  };

  const openNewArticle = () => {
    setFormData({
      id: `art-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      category: 'Quality Engineering',
      content: '## Executive Overview\n\nEnter the core breakdown of this quality engineering insight.\n\n### Key Principles\n\n- Principle 1: Early verification\n- Principle 2: Continuous guardrails\n\n```typescript\n// Quality Gate Assertion\nexpect(response.status).toBe(200);\n```\n',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: false,
      status: 'draft',
      readTime: '5 min read',
      publishedAt: new Date().toISOString().split('T')[0],
      featured: false,
      tags: ['Quality Engineering', 'Testing'],
      author: {
        name: 'Abu Naser Maaz',
        role: 'Founder & QA Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    });
    setActiveTab('content');
    setIsEditing(true);
  };

  const openEditArticle = (art: Article) => {
    setFormData({ ...art });
    setActiveTab('content');
    setIsEditing(true);
  };

  const handleSave = async (asPublished: boolean) => {
    if (!formData.title?.trim()) {
      alert('Please enter an article title.');
      return;
    }
    const finalSlug = formData.slug?.trim() || slugify(formData.title);

    const updated: Article = {
      id: formData.id || `art-${Date.now()}`,
      title: formData.title.trim(),
      slug: finalSlug,
      excerpt: formData.excerpt || '',
      category: formData.category || 'Quality Engineering',
      content: formData.content || '',
      featuredImage: formData.featuredImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: asPublished,
      status: asPublished ? 'published' : (formData.status === 'archived' ? 'archived' : 'draft'),
      publishedAt: formData.publishedAt || new Date().toISOString().split('T')[0],
      readTime: formData.readTime || '5 min read',
      featured: formData.featured || false,
      tags: Array.isArray(formData.tags) ? formData.tags : [],
      author: formData.author || {
        name: 'Abu Naser Maaz',
        role: 'Founder & QA Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.excerpt,
      canonicalUrl: formData.canonicalUrl || `https://abunasarmaaz.com/insights/${finalSlug}`,
      ogTitle: formData.ogTitle || formData.title,
      ogDescription: formData.ogDescription || formData.excerpt,
      ogImage: formData.ogImage || formData.featuredImage,
      updatedAt: new Date().toISOString(),
    };

    setSaving(true);
    await onSave(updated);
    setSaving(false);
    setIsEditing(false);
    if (onCloseEditor) onCloseEditor();
  };

  // Formatting Toolbar Helper
  const insertMarkdown = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('article-content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = formData.content || '';
    const selected = current.substring(start, end) || 'text';
    const nextContent = current.substring(0, start) + prefix + selected + suffix + current.substring(end);
    setFormData(prev => ({ ...prev, content: nextContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  // Filtered list
  const filtered = articles.filter(a => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSlug = a.slug.toLowerCase().includes(q);
      const matchExcerpt = a.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchExcerpt) return false;
    }
    if (statusFilter !== 'all') {
      const artStatus = a.status || (a.published ? 'published' : 'draft');
      if (artStatus !== statusFilter) return false;
    }
    if (categoryFilter !== 'all' && a.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* CMS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Articles Management</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            {articles.length} Total • {articles.filter(a => a.published && a.status !== 'draft').length} Published • {articles.filter(a => !a.published || a.status === 'draft').length} Drafts
          </p>
        </div>

        <button
          onClick={openNewArticle}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, slug or excerpt..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
          >
            <option value="all">Category: All</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                    No articles match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((art) => {
                  const currentStatus = art.status || (art.published ? 'published' : 'draft');
                  return (
                    <tr key={art.id} className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-semibold text-zinc-200 truncate">{art.title}</div>
                        <div className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                          /insights/{art.slug}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                            currentStatus === 'published'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : currentStatus === 'draft'
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                              : currentStatus === 'scheduled'
                              ? 'bg-blue-950/60 text-blue-400 border border-blue-800/60'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">
                        {art.publishedAt}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview Button */}
                          <button
                            onClick={() => onPreview(art.slug)}
                            title="Preview Public Layout"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Publish / Unpublish */}
                          <button
                            onClick={() => {
                              onSave({
                                ...art,
                                published: !art.published,
                                status: !art.published ? 'published' : 'draft',
                              });
                            }}
                            title={art.published ? 'Unpublish' : 'Publish'}
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <CheckCircle className={`w-3.5 h-3.5 ${art.published ? 'text-emerald-400' : 'text-zinc-600'}`} />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => openEditArticle(art)}
                            title="Edit Article"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeleteConfirmId(art.id)}
                            title="Delete Article"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-red-950/60 text-zinc-400 hover:text-red-300 border border-zinc-800 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Delete Article?</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                This action is permanent and will remove this article from the database and public site.
              </p>
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const id = deleteConfirmId;
                  setDeleteConfirmId(null);
                  await onDelete(id);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Article Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {formData.id && articles.some(a => a.id === formData.id) ? 'Edit Article' : 'New Article'}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-mono text-zinc-300 truncate max-w-md">
                  {formData.title || 'Untitled Draft'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{saving ? 'Saving...' : 'Save Draft'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish</span>
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    if (onCloseEditor) onCloseEditor();
                  }}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 border-b border-zinc-800 bg-zinc-950/30 flex items-center gap-4">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'content'
                    ? 'border-zinc-200 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Article Content & Metadata
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`py-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'seo'
                    ? 'border-zinc-200 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                SEO & OpenGraph
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`py-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'preview'
                    ? 'border-zinc-200 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Live Preview
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'content' && (
                <div className="space-y-5">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Heuristics for Non-Deterministic AI Testing"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        URL Slug (/insights/[slug])
                      </label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                        placeholder="heuristics-ai-testing"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm font-mono focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  {/* Category, Status, Reading Time, Date */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category || 'Quality Engineering'}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Status
                      </label>
                      <select
                        value={formData.status || 'draft'}
                        onChange={(e) => {
                          const st = e.target.value as ArticleStatus;
                          setFormData(prev => ({ ...prev, status: st, published: st === 'published' }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Reading Time
                      </label>
                      <input
                        type="text"
                        value={formData.readTime || '5 min read'}
                        onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={formData.publishedAt ? formData.publishedAt.split('T')[0] : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Excerpt / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Concise overview displayed in article lists and previews..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  {/* Featured Image & Featured Toggle */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Featured Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.featuredImage || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="is-featured-toggle"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                      <label htmlFor="is-featured-toggle" className="text-xs text-zinc-300 select-none cursor-pointer">
                        Feature on Insights Hero
                      </label>
                    </div>
                  </div>

                  {/* Rich Text Toolbar & Content Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        Article Body (Markdown & HTML Supported)
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {(formData.content || '').split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>

                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-950 border border-zinc-800 rounded-t-xl">
                      <button
                        type="button"
                        onClick={() => insertMarkdown('## ', '\n')}
                        title="Heading 2"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('### ', '\n')}
                        title="Heading 3"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <span className="w-px h-4 bg-zinc-800 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertMarkdown('**', '**')}
                        title="Bold"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('*', '*')}
                        title="Italic"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <span className="w-px h-4 bg-zinc-800 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertMarkdown('- ', '\n')}
                        title="Bulleted List"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('1. ', '\n')}
                        title="Numbered List"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('> ', '\n')}
                        title="Blockquote"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('```typescript\n', '\n```')}
                        title="Code Block"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <span className="w-px h-4 bg-zinc-800 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertMarkdown('[', '](https://...)')}
                        title="Insert Link"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('![Image description](', ')')}
                        title="Insert Image"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      id="article-content-editor"
                      rows={14}
                      value={formData.content || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your article in markdown..."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-b-xl text-zinc-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      SEO Meta Title (recommended &lt; 60 chars)
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                      placeholder="Leave empty to use article title"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Meta Description (recommended 150-160 chars)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seoDescription || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                      placeholder="Leave empty to use article excerpt"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={formData.canonicalUrl || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                      placeholder={`https://abunasarmaaz.com/insights/${formData.slug || 'slug'}`}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        OpenGraph Title
                      </label>
                      <input
                        type="text"
                        value={formData.ogTitle || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        OpenGraph Image
                      </label>
                      <input
                        type="url"
                        value={formData.ogImage || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-3xl mx-auto">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    {formData.category} • {formData.readTime}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">{formData.title || 'Untitled'}</h1>
                  <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-700 pl-4 italic">
                    {formData.excerpt || 'No excerpt provided.'}
                  </p>
                  <div className="pt-4 border-t border-zinc-850 prose prose-invert text-xs leading-relaxed max-w-none">
                    <pre className="p-4 bg-zinc-900 rounded-xl whitespace-pre-wrap font-sans text-zinc-300">
                      {formData.content || 'Start typing in the Content tab to view formatted article.'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
