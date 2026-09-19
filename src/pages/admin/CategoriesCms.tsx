import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import { ArticleCategory, CaseStudyCategory, Article, CaseStudy } from '../../types';

interface CategoriesCmsProps {
  articleCategories: ArticleCategory[];
  caseStudyCategories: CaseStudyCategory[];
  articles: Article[];
  caseStudies: CaseStudy[];
  onSaveArticleCategory: (cat: ArticleCategory) => void;
  onDeleteArticleCategory: (id: string) => void;
  onSaveCaseStudyCategory: (cat: CaseStudyCategory) => void;
  onDeleteCaseStudyCategory: (id: string) => void;
}

export const CategoriesCms: React.FC<CategoriesCmsProps> = ({
  articleCategories,
  caseStudyCategories,
  articles,
  caseStudies,
  onSaveArticleCategory,
  onDeleteArticleCategory,
  onSaveCaseStudyCategory,
  onDeleteCaseStudyCategory,
}) => {
  const [activeType, setActiveType] = useState<'articles' | 'case-studies'>('articles');
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newCatName.trim()) return;

    const slug = slugify(newCatName.trim());
    if (activeType === 'articles') {
      if (articleCategories.some(c => c.slug === slug)) {
        setErrorMsg('An article category with this name/slug already exists.');
        return;
      }
      onSaveArticleCategory({
        id: `cat-art-${Date.now()}`,
        name: newCatName.trim(),
        slug,
        description: newCatDesc.trim() || undefined,
      });
    } else {
      if (caseStudyCategories.some(c => c.slug === slug)) {
        setErrorMsg('A case study category with this name/slug already exists.');
        return;
      }
      onSaveCaseStudyCategory({
        id: `cat-cs-${Date.now()}`,
        name: newCatName.trim(),
        slug,
        description: newCatDesc.trim() || undefined,
      });
    }

    setNewCatName('');
    setNewCatDesc('');
  };

  const checkInUse = (catName: string, type: 'articles' | 'case-studies') => {
    if (type === 'articles') {
      return articles.filter(a => a.category === catName).length;
    }
    return caseStudies.filter(cs => cs.category === catName).length;
  };

  const handleDelete = (id: string, name: string, type: 'articles' | 'case-studies') => {
    const count = checkInUse(name, type);
    if (count > 0) {
      alert(`Cannot delete category "${name}": currently referenced by ${count} ${type === 'articles' ? 'article(s)' : 'case study/studies'}. Please reassign them first.`);
      return;
    }
    if (type === 'articles') {
      onDeleteArticleCategory(id);
    } else {
      onDeleteCaseStudyCategory(id);
    }
  };

  const currentList = activeType === 'articles' ? articleCategories : caseStudyCategories;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Taxonomy & Categories</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Manage hierarchical groupings for Insights articles and Case Study reports
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveType('articles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeType === 'articles' ? 'bg-zinc-100 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Article Categories ({articleCategories.length})
          </button>
          <button
            onClick={() => setActiveType('case-studies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeType === 'case-studies' ? 'bg-zinc-100 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Case Study Categories ({caseStudyCategories.length})
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Add Category Form */}
      <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
        <div className="font-semibold text-xs text-zinc-200 uppercase tracking-wider font-mono">
          Add New {activeType === 'articles' ? 'Article' : 'Case Study'} Category
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Category Name (e.g. AI Security)"
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <input
              type="text"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="Brief description for SEO / taxonomy archive..."
              className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentList.map((cat) => {
          const inUseCount = checkInUse(cat.name, activeType);
          return (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-zinc-100">{cat.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                    {inUseCount} items
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-1">slug: {cat.slug}</div>
                {cat.description && (
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-zinc-500">
                  {inUseCount > 0 ? 'Referenced in active records' : 'Unused'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name, activeType)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/40 cursor-pointer transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
