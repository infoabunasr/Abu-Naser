import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Bug,
  Cpu,
  Layers,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FileText
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { CaseStudyCard } from '../components/common/CaseStudyCard';
import { ArticleCard } from '../components/common/ArticleCard';
import { SeoHead } from '../components/common/SeoHead';
import { PreviewBanner } from '../components/common/PreviewBanner';
import { storageService } from '../services/storageService';

interface CaseStudyDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
  isPreview?: boolean;
  onReturnToEditor?: () => void;
  onPublishNow?: () => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  slug,
  onNavigate,
  isPreview = false,
  onReturnToEditor,
  onPublishNow,
}) => {
  const caseStudy = storageService.getCaseStudyBySlug(slug);

  if (!caseStudy || (!caseStudy.published && !isPreview)) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">[404 NOT FOUND]</span>
        <h1 className="text-3xl font-bold text-zinc-100">Case Study Not Found</h1>
        <p className="mt-2 text-zinc-400 font-mono text-sm">
          The requested case study does not exist or has not been published yet.
        </p>
        <button
          onClick={() => onNavigate('/case-studies')}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-zinc-100 text-zinc-950 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CASE STUDIES</span>
        </button>
      </div>
    );
  }

  // Related items
  const allStudies = storageService.getCaseStudies().filter(cs => cs.published && cs.slug !== slug);
  const relatedStudies = allStudies.slice(0, 2);

  const allArticles = storageService.getArticles().filter(a => a.published);
  const relatedArticles = allArticles
    .filter(a => caseStudy.relatedArticleSlugs?.includes(a.slug))
    .slice(0, 2);

  const getSeverityBadge = (severity: 'Critical' | 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-950/60 text-red-400 border-red-800';
      case 'High':
        return 'bg-amber-950/60 text-amber-400 border-amber-800';
      case 'Medium':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'Low':
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div>
      {isPreview && (
        <PreviewBanner
          type="case-study"
          slug={caseStudy.slug}
          isPublished={caseStudy.published}
          onReturnToEditor={onReturnToEditor || (() => onNavigate('/admin/case-studies'))}
          onPublishNow={onPublishNow || (() => {})}
        />
      )}
      <div className="pt-24 sm:pt-28">
        <SeoHead
          title={`${caseStudy.title} — Case Study | Abu Naser Maaz`}
          description={caseStudy.summary}
          ogImage={caseStudy.heroImage}
          canonicalUrl={`https://abunasarmaaz.com/case-studies/${caseStudy.slug}`}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Breadcrumbs
            items={[
              { label: 'Case Studies', onClick: () => onNavigate('/case-studies') },
              { label: caseStudy.title },
            ]}
          />

          {/* Header Block */}
          <div className="py-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
                {caseStudy.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                {caseStudy.type}
              </span>
              <span className="text-xs font-mono text-zinc-500 ml-auto">
                Status: <span className="font-semibold text-zinc-300">{caseStudy.status}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
              {caseStudy.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
              {caseStudy.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-800/80">
              {caseStudy.clientName && caseStudy.clientName.trim() !== '' && (
                <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                  Client: {caseStudy.clientName}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                Published: {new Date(caseStudy.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {caseStudy.readTime}
              </span>
            </div>
          </div>

        {/* Hero Image */}
        <div className="my-8 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900 aspect-[16/8]">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover grayscale contrast-105"
          />
        </div>

        {/* Main Content Layout */}
        <div className="space-y-10">
          {/* Section: Context & Problem */}
          <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>The Problem & Context</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {caseStudy.problem}
            </p>
          </section>

          {/* Section: Objectives & Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                <span>Core Objectives</span>
              </h2>
              <ul className="space-y-3">
                {caseStudy.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-400" />
                <span>Scope of Testing</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 font-normal">
                {caseStudy.scope}
              </p>
              <div className="pt-3 border-t border-zinc-800">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  Approach Summary
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {caseStudy.approach}
                </p>
              </div>
            </section>
          </div>

          {/* Section: Test Scenarios & Pass Rates Matrix */}
          <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Test Matrix & Execution Scenarios</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider bg-zinc-950">
                    <th className="py-3 px-4 rounded-l-lg">Test Suite / Category</th>
                    <th className="py-3 px-4">Coverage Details</th>
                    <th className="py-3 px-4 text-center">Cases</th>
                    <th className="py-3 px-4 text-right rounded-r-lg">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {caseStudy.testScenarios.map((scen, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/40">
                      <td className="py-3.5 px-4 font-semibold text-zinc-100 text-xs sm:text-sm">
                        {scen.category}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-zinc-400 font-normal">
                        {scen.details}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-zinc-400 text-center">
                        {scen.casesCount}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                          {scen.passRate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Key Findings */}
          <section className="bg-zinc-900/80 rounded-2xl p-6 sm:p-8 border border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Key Audit Findings</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.findings.map((finding, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2.5">
                  <span className="text-zinc-500 font-bold mt-0.5">•</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Reproducible Defect Examples */}
          {caseStudy.defectExamples.length > 0 && (
            <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <Bug className="w-4 h-4 text-red-400" />
                <span>Actionable Defect Reports & Triage</span>
              </h2>
              <p className="text-xs font-mono text-zinc-500 mb-6">
                Reproducible bug reports authored in Jira with network logs and root-cause analysis.
              </p>

              <div className="space-y-4">
                {caseStudy.defectExamples.map((bug) => (
                  <div
                    key={bug.id}
                    className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          {bug.id}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-zinc-100">
                          {bug.title}
                        </h3>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium border ${getSeverityBadge(bug.severity)}`}>
                        {bug.severity} Severity
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                      <strong className="text-zinc-200 font-mono text-xs">Symptom:</strong> {bug.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-mono text-zinc-500 block mb-0.5 text-[11px] uppercase">Identified Root Cause:</span>
                        <p className="text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 font-mono text-[11px]">
                          {bug.rootCause}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-zinc-500 block mb-0.5 text-[11px] uppercase">Recommended Resolution:</span>
                        <p className="text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 font-mono text-[11px]">
                          {bug.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Recommendations & Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h2 className="text-base font-bold text-zinc-100 mb-4">
                Strategic Recommendations
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                {caseStudy.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h2 className="text-base font-bold text-zinc-100 mb-4">
                Lessons Learned
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                {caseStudy.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section: Environment & Tools */}
          <section className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                Tools & Execution Stack
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {caseStudy.tools.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-zinc-950 text-xs font-mono text-zinc-300 border border-zinc-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer"
              >
                <span>DISCUSS YOUR PRODUCT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <div className="pt-8 border-t border-zinc-800/80">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                Related Case Studies
              </h2>
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

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-zinc-800/80">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                Related Insights & Methodologies
              </h2>
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
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  </div>
  );
};
