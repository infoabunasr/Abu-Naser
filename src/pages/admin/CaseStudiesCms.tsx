import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Save,
  Send,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CaseStudy, CaseStudyCategory, CaseStudyProjectType, CaseStudyStatus } from '../../types';
import { INITIAL_CASE_STUDY_CATEGORIES } from '../../services/supabaseService';

interface CaseStudiesCmsProps {
  caseStudies: CaseStudy[];
  categories?: CaseStudyCategory[];
  onSave: (study: CaseStudy) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onPreview: (slug: string) => void;
  initialEditingId?: string | null;
  onCloseEditor?: () => void;
}

export const CaseStudiesCms: React.FC<CaseStudiesCmsProps> = ({
  caseStudies,
  categories = INITIAL_CASE_STUDY_CATEGORIES,
  onSave,
  onDelete,
  onPreview,
  initialEditingId,
  onCloseEditor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CaseStudyStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [isEditing, setIsEditing] = useState(Boolean(initialEditingId));
  const [activeTab, setActiveTab] = useState<'core' | 'qa-execution' | 'seo'>('core');
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CaseStudy>>(() => {
    if (initialEditingId) {
      const found = caseStudies.find(cs => cs.id === initialEditingId);
      if (found) return { ...found };
    }
    return {
      title: '',
      slug: '',
      category: 'QA',
      type: 'Independent Case Study',
      clientName: '',
      summary: '',
      problem: '',
      objectives: ['Establish deterministic test suites', 'Reduce regression escape rate'],
      scope: 'End-to-end web & mobile verification',
      approach: 'Risk-based exploratory testing paired with automated regression gates.',
      testScenarios: [
        { category: 'Functional Verification', details: 'Core business flows', casesCount: 45, passRate: '98%' },
      ],
      findings: ['Identified 12 edge cases before release', 'Eliminated memory leak in telemetry module'],
      recommendations: ['Integrate automated smoke checks in CI', 'Enforce strict schema validation'],
      tools: ['Playwright', 'Postman', 'Sentry'],
      environment: ['Chrome / Safari', 'iOS / Android', 'Node.js'],
      lessonsLearned: ['Early contract validation saves sprint velocity'],
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: false,
      status: 'draft',
      featured: false,
      date: new Date().toISOString().split('T')[0],
      readTime: '6 min read',
    };
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const openNewCaseStudy = () => {
    setFormData({
      id: `cs-${Date.now()}`,
      title: '',
      slug: '',
      category: 'QA',
      type: 'Independent Case Study',
      clientName: '',
      summary: '',
      problem: '',
      objectives: ['Establish deterministic test suites', 'Reduce regression escape rate'],
      scope: 'End-to-end web & mobile verification',
      approach: 'Risk-based exploratory testing paired with automated regression gates.',
      testScenarios: [
        { category: 'Functional Verification', details: 'Core business flows', casesCount: 45, passRate: '98%' },
      ],
      findings: ['Identified 12 edge cases before release', 'Eliminated memory leak in telemetry module'],
      recommendations: ['Integrate automated smoke checks in CI', 'Enforce strict schema validation'],
      tools: ['Playwright', 'Postman', 'Sentry'],
      environment: ['Chrome / Safari', 'iOS / Android'],
      lessonsLearned: ['Early contract validation saves sprint velocity'],
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: false,
      status: 'draft',
      featured: false,
      date: new Date().toISOString().split('T')[0],
      readTime: '6 min read',
    });
    setActiveTab('core');
    setIsEditing(true);
  };

  const openEdit = (cs: CaseStudy) => {
    setFormData({ ...cs });
    setActiveTab('core');
    setIsEditing(true);
  };

  const handleSave = async (asPublished: boolean) => {
    if (!formData.title?.trim()) {
      alert('Please enter a case study title.');
      return;
    }
    const finalSlug = formData.slug?.trim() || slugify(formData.title);

    const updated: CaseStudy = {
      id: formData.id || `cs-${Date.now()}`,
      title: formData.title.trim(),
      slug: finalSlug,
      category: formData.category || 'QA',
      type: formData.type || 'Independent Case Study',
      clientName: formData.clientName?.trim() || undefined,
      summary: formData.summary || '',
      heroImage: formData.heroImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      published: asPublished,
      status: asPublished ? 'published' : (formData.status === 'archived' ? 'archived' : 'draft'),
      featured: formData.featured || false,
      date: formData.date || new Date().toISOString().split('T')[0],
      readTime: formData.readTime || '6 min read',
      problem: formData.problem || '',
      objectives: Array.isArray(formData.objectives) ? formData.objectives : [],
      scope: formData.scope || '',
      approach: formData.approach || '',
      testScenarios: Array.isArray(formData.testScenarios) ? formData.testScenarios : [],
      findings: Array.isArray(formData.findings) ? formData.findings : [],
      defectExamples: formData.defectExamples || [],
      recommendations: Array.isArray(formData.recommendations) ? formData.recommendations : [],
      tools: Array.isArray(formData.tools) ? formData.tools : [],
      environment: Array.isArray(formData.environment) ? formData.environment : [],
      lessonsLearned: Array.isArray(formData.lessonsLearned) ? formData.lessonsLearned : [],
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.summary,
      canonicalUrl: formData.canonicalUrl || `https://abunasarmaaz.com/case-studies/${finalSlug}`,
      ogTitle: formData.ogTitle || formData.title,
      ogDescription: formData.ogDescription || formData.summary,
      ogImage: formData.ogImage || formData.heroImage,
      updatedAt: new Date().toISOString(),
    };

    setSaving(true);
    await onSave(updated);
    setSaving(false);
    setIsEditing(false);
    if (onCloseEditor) onCloseEditor();
  };

  // Filtered List
  const filtered = caseStudies.filter(cs => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = cs.title.toLowerCase().includes(q) || cs.slug.toLowerCase().includes(q) || cs.summary.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'all') {
      const st = cs.status || (cs.published ? 'published' : 'draft');
      if (st !== statusFilter) return false;
    }
    if (categoryFilter !== 'all' && cs.category !== categoryFilter) {
      return false;
    }
    if (typeFilter !== 'all' && cs.type !== typeFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Case Studies CMS</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            {caseStudies.length} Total • {caseStudies.filter(c => c.published && c.status !== 'draft').length} Published • Structured QA & Verification Reports
          </p>
        </div>

        <button
          onClick={openNewCaseStudy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Case Study</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search case studies by title, slug, tools..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

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

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
          >
            <option value="all">Type: All</option>
            <option value="Independent Case Study">Independent Case Study</option>
            <option value="Client Project">Client Project</option>
            <option value="Prototype">Prototype</option>
            <option value="In Development">In Development</option>
          </select>
        </div>
      </div>

      {/* Case Studies Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Title & Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                    No case studies found.
                  </td>
                </tr>
              ) : (
                filtered.map((cs) => {
                  const currentStatus = cs.status || (cs.published ? 'published' : 'draft');
                  return (
                    <tr key={cs.id} className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-semibold text-zinc-200 truncate">{cs.title}</div>
                        <div className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                          /case-studies/{cs.slug}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                          {cs.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                        {cs.type}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                            currentStatus === 'published'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : currentStatus === 'draft'
                              ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onPreview(cs.slug)}
                            title="Preview Public Page"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              onSave({
                                ...cs,
                                published: !cs.published,
                                status: !cs.published ? 'published' : 'draft',
                              });
                            }}
                            title={cs.published ? 'Unpublish' : 'Publish'}
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <CheckCircle className={`w-3.5 h-3.5 ${cs.published ? 'text-emerald-400' : 'text-zinc-600'}`} />
                          </button>

                          <button
                            onClick={() => openEdit(cs)}
                            title="Edit Case Study"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(cs.id)}
                            title="Delete Case Study"
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

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Delete Case Study?</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                This will delete the case study from the database and public directory.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Full Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {formData.id && caseStudies.some(cs => cs.id === formData.id) ? 'Edit Case Study' : 'New Case Study'}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-mono text-zinc-300 truncate max-w-md">
                  {formData.title || 'Untitled Case Study'}
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
                  <span>Save Draft</span>
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

            <div className="px-6 border-b border-zinc-800 bg-zinc-950/30 flex items-center gap-4">
              <button
                onClick={() => setActiveTab('core')}
                className={`py-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'core'
                    ? 'border-zinc-200 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Core Info & Context
              </button>
              <button
                onClick={() => setActiveTab('qa-execution')}
                className={`py-3 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'qa-execution'
                    ? 'border-zinc-200 text-zinc-100'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                QA Methodology & Results
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
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'core' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            title: val,
                            slug: !prev.id ? slugify(val) : prev.slug,
                          }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Slug (/case-studies/[slug])
                      </label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category || 'QA'}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={formData.type || 'Independent Case Study'}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as CaseStudyProjectType }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                      >
                        <option value="Independent Case Study">Independent Case Study</option>
                        <option value="Client Project">Client Project</option>
                        <option value="Prototype">Prototype</option>
                        <option value="Portfolio Project">Portfolio Project</option>
                        <option value="In Development">In Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Client Name (Leave empty if none)
                      </label>
                      <input
                        type="text"
                        value={formData.clientName || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                        placeholder="Optional"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Short Summary / Overview
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summary || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Problem Statement
                    </label>
                    <textarea
                      rows={3}
                      value={formData.problem || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                      placeholder="Describe the architectural challenge, defect escape rate, or reliability risks..."
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Featured Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.heroImage || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="cs-featured"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700"
                      />
                      <label htmlFor="cs-featured" className="text-xs text-zinc-300 cursor-pointer">
                        Featured on Case Studies Hero
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'qa-execution' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Scope of Verification
                    </label>
                    <textarea
                      rows={2}
                      value={formData.scope || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Testing Approach & Methodology
                    </label>
                    <textarea
                      rows={3}
                      value={formData.approach || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Key Findings (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={(formData.findings || []).join('\n')}
                      onChange={(e) => setFormData(prev => ({ ...prev, findings: e.target.value.split('\n').filter(Boolean) }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Strategic Recommendations (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={(formData.recommendations || []).join('\n')}
                      onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value.split('\n').filter(Boolean) }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Tools (comma separated)
                      </label>
                      <input
                        type="text"
                        value={(formData.tools || []).join(', ')}
                        onChange={(e) => setFormData(prev => ({ ...prev, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                        placeholder="Playwright, Postman, Sentry"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                        Platforms / Environment (comma separated)
                      </label>
                      <input
                        type="text"
                        value={(formData.environment || []).join(', ')}
                        onChange={(e) => setFormData(prev => ({ ...prev, environment: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                        placeholder="Chrome, iOS, Android, Docker"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seoDescription || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs"
                    />
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
