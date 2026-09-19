import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { CaseStudy } from '../../types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  onSelect,
  featured = false,
}) => {
  const getTypeBadge = (type: CaseStudy['type']) => {
    switch (type) {
      case 'Client Project':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80';
      case 'Prototype':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/80';
      case 'Independent Case Study':
      default:
        return 'bg-zinc-800/80 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <article
      onClick={() => onSelect(caseStudy.slug)}
      className="group bg-zinc-900/60 rounded-2xl border border-zinc-800/90 hover:border-zinc-600 hover:bg-zinc-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="p-6 sm:p-7">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
            {caseStudy.category}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${getTypeBadge(
              caseStudy.type
            )}`}
          >
            {caseStudy.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
          {caseStudy.title}
        </h3>

        {/* Short Problem Context */}
        <div className="mt-4 pt-4 border-t border-zinc-800/60">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            Challenge & Context
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>

        {/* Scope / Approach */}
        <div className="mt-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            Testing Approach
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 font-normal leading-relaxed">
            {caseStudy.approach}
          </p>
        </div>

        {/* Tool badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {caseStudy.tools.slice(0, 4).map((tool, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
            >
              {tool}
            </span>
          ))}
          {caseStudy.tools.length > 4 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-zinc-500">
              +{caseStudy.tools.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 sm:px-7 py-3.5 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center justify-between group-hover:bg-zinc-950 transition-colors">
        <span className="text-[11px] font-mono text-zinc-500">
          {caseStudy.readTime}
        </span>
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-200 group-hover:text-white group-hover:translate-x-0.5 transition-all">
          <span>Read Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
