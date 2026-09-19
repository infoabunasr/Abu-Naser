import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CaseStudyCard } from '../components/common/CaseStudyCard';
import { CTASection } from '../components/common/CTASection';
import { SeoHead } from '../components/common/SeoHead';
import { storageService } from '../services/storageService';

interface CaseStudiesPageProps {
  onNavigate: (route: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allCaseStudies = storageService.getCaseStudies().filter(cs => cs.published);

  const filterOptions = [
    'All',
    'Web QA',
    'Mobile QA',
    'AI Testing',
    'Game QA',
    'XR / VR',
    'Project Delivery',
  ];

  const filteredStudies = useMemo(() => {
    return allCaseStudies.filter((cs) => {
      const matchesFilter = selectedFilter === 'All' || cs.category === selectedFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        cs.title.toLowerCase().includes(q) ||
        cs.summary.toLowerCase().includes(q) ||
        cs.problem.toLowerCase().includes(q) ||
        cs.tools.some(t => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [allCaseStudies, selectedFilter, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="Practical QA & Delivery Case Studies — Abu Naser Maaz"
        description="Explore structured case studies across Web QA, Mobile App testing, AI evaluation, Game QA, XR ergonomics, and Agile project delivery."
        canonicalUrl="https://abunasarmaaz.com/case-studies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'Case Studies' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-10 border-b border-zinc-800/80">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Case Studies & Verification
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            Selected Work & Quality Case Studies
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
            Detailed breakdowns of testing strategies, test scenarios, identified defect samples, and delivery coordination across modern digital products.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases or tools..."
                className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="py-12">
          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.id}
                  caseStudy={cs}
                  onSelect={(slug) => onNavigate(`/case-studies/${slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/60 rounded-2xl border border-zinc-800">
              <Layers className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-100">No Case Studies Found</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-mono">
                No case studies matched your current filter or search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedFilter('All');
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
