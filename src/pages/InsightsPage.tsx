import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArticleCard } from '../components/common/ArticleCard';
import { CTASection } from '../components/common/CTASection';
import { SeoHead } from '../components/common/SeoHead';
import { storageService } from '../services/storageService';

interface InsightsPageProps {
  onNavigate: (route: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allArticles = storageService.getArticles().filter(a => a.published);

  const categories = [
    'All',
    'Quality Engineering',
    'Software Testing',
    'AI Testing',
    'Technical Delivery',
    'XR',
    'Product Development',
  ];

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="Insights on Software Quality & Technical Delivery — Abu Naser Maaz"
        description="Practical articles on quality engineering, risk-based testing, AI application evaluation, agile sprint coordination, and XR QA."
        canonicalUrl="https://abunasarmaaz.com/insights"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'Insights & Articles' }]} />

        {/* Header Block */}
        <div className="py-6 sm:py-10 border-b border-zinc-800/80">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Editorial & Technical Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            Insights on Quality, Technology & Delivery
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
            Practical strategies for founders and engineering teams on structured QA, emerging technology testing, sprint workflows, and release risk reduction.
          </p>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or tags..."
                className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="py-12">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(slug) => onNavigate(`/insights/${slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/60 rounded-2xl border border-zinc-800">
              <BookOpen className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-100">No Articles Found</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 max-w-sm mx-auto">
                Try adjusting your search query or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-mono font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
