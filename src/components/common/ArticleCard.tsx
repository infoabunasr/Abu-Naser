import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group bg-zinc-900/60 rounded-2xl border border-zinc-800/90 hover:border-zinc-600 hover:bg-zinc-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute top-3.5 left-3.5">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-zinc-950/80 text-zinc-200 backdrop-blur-md border border-zinc-700/60 shadow-md">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Metadata */}
          <div className="flex items-center gap-3.5 text-[11px] font-mono text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-400" />
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3.5 border-t border-zinc-800/80 flex items-center justify-between bg-zinc-950/60 group-hover:bg-zinc-950 transition-colors">
        <span className="text-[11px] font-mono text-zinc-500">
          By {article.author.name}
        </span>
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-200 group-hover:text-white group-hover:translate-x-1 transition-transform">
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
