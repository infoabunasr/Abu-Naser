import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  BookOpen,
  Layers,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { ArticleCard } from '../components/common/ArticleCard';
import { CaseStudyCard } from '../components/common/CaseStudyCard';
import { SeoHead } from '../components/common/SeoHead';
import { PreviewBanner } from '../components/common/PreviewBanner';
import { storageService } from '../services/storageService';

interface InsightDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  isPreview?: boolean;
  onReturnToEditor?: () => void;
  onPublishNow?: () => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({
  slug,
  onNavigate,
  isPreview = false,
  onReturnToEditor,
  onPublishNow,
}) => {
  const [copied, setCopied] = useState(false);
  const article = storageService.getArticleBySlug(slug);

  if (!article || (!article.published && !isPreview)) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">[404 NOT FOUND]</span>
        <h1 className="text-3xl font-bold text-zinc-100">Article Not Found</h1>
        <p className="mt-2 text-zinc-400 font-mono text-sm">
          The requested article does not exist or has not been published yet.
        </p>
        <button
          onClick={() => onNavigate('/insights')}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-zinc-100 text-zinc-950 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO INSIGHTS</span>
        </button>
      </div>
    );
  }

  const allArticles = storageService.getArticles().filter(a => a.published && a.slug !== slug);
  const relatedArticles = allArticles.slice(0, 2);

  const allCaseStudies = storageService.getCaseStudies().filter(cs => cs.published);
  const relatedStudies = allCaseStudies
    .filter(cs => article.relatedCaseStudySlugs?.includes(cs.slug))
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: 'https://abunasarmaaz.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Abu Naser Maaz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    },
    datePublished: article.publishedAt,
    mainEntityOfPage: `https://abunasarmaaz.com/insights/${article.slug}`
  };

  return (
    <div>
      {isPreview && (
        <PreviewBanner
          type="article"
          slug={article.slug}
          isPublished={article.published}
          onReturnToEditor={onReturnToEditor || (() => onNavigate('/admin/articles'))}
          onPublishNow={onPublishNow || (() => {})}
        />
      )}
      <div className="pt-24 sm:pt-28">
      <SeoHead
        title={`${article.title} — Abu Naser Maaz`}
        description={article.excerpt}
        ogImage={article.featuredImage}
        type="article"
        canonicalUrl={`https://abunasarmaaz.com/insights/${article.slug}`}
        schema={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Breadcrumbs
          items={[
            { label: 'Insights', onClick: () => onNavigate('/insights') },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="py-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            {article.excerpt}
          </p>

          {/* Author & Metas */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <span className="font-bold text-xs sm:text-sm text-zinc-100 block">
                  {article.author.name}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {article.readTime}
              </span>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs cursor-pointer transition-colors"
                title="Copy share link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'SHARE'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-8 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl aspect-[16/9] bg-zinc-900">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover grayscale contrast-105"
          />
        </div>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <div className="mb-10 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
              [Table of Contents]
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-mono">
              {article.tableOfContents.map((item) => (
                <li
                  key={item.id}
                  className={`${item.level === 3 ? 'pl-4 text-xs text-zinc-500' : 'font-medium text-zinc-300'} hover:text-zinc-100 transition-colors`}
                >
                  <a href={`#${item.id}`} className="block">
                    • {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Content Render */}
        <div className="prose prose-invert max-w-none text-sm sm:text-base text-zinc-300 leading-relaxed space-y-6 font-normal">
          {(article.content || '').split('\n\n').map((paragraph, idx) => {
            if (!paragraph) return null;
            if (paragraph.startsWith('### ')) {
              const text = paragraph.replace('### ', '');
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h3 key={idx} id={id} className="text-xl sm:text-2xl font-bold text-zinc-100 pt-6 pb-2 border-b border-zinc-800">
                  {text}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              const text = paragraph.replace('#### ', '');
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h4 key={idx} id={id} className="text-lg font-bold text-zinc-200 pt-4 pb-1">
                  {text}
                </h4>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={idx} className="space-y-2 list-disc pl-6 text-zinc-300 text-sm sm:text-base">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d\./.test(paragraph)) {
              const items = paragraph.split('\n');
              return (
                <ol key={idx} className="space-y-2 list-decimal pl-6 text-zinc-300 text-sm sm:text-base">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mr-2">
            Topics:
          </span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <div className="mt-16 pt-8 border-t border-zinc-800/80">
            <h3 className="text-2xl font-bold text-zinc-100 mb-6">
              Relevant Practical Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.id}
                  caseStudy={cs}
                  onSelect={(s) => onNavigate(`/case-studies/${s}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Insights */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-zinc-800/80">
            <h3 className="text-2xl font-bold text-zinc-100 mb-6">
              More Insights & Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={(s) => onNavigate(`/insights/${s}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  </div>
  );
};
