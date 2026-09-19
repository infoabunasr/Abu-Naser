import React from 'react';
import {
  FileText,
  Layers,
  Image as ImageIcon,
  Mail,
  Plus,
  ArrowUpRight,
  Database,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Article, CaseStudy, ContactSubmission, MediaItem } from '../../types';
import { supabaseService } from '../../services/supabaseService';

interface AdminOverviewProps {
  articles: Article[];
  caseStudies: CaseStudy[];
  media: MediaItem[];
  submissions: ContactSubmission[];
  onNavigate: (route: string) => void;
  onNewArticle: () => void;
  onNewCaseStudy: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  articles,
  caseStudies,
  media,
  submissions,
  onNavigate,
  onNewArticle,
  onNewCaseStudy,
}) => {
  const isConnected = supabaseService.isConfigured();

  const publishedArticles = articles.filter(a => a.published && a.status !== 'draft');
  const draftArticles = articles.filter(a => !a.published || a.status === 'draft');
  const publishedCaseStudies = caseStudies.filter(cs => cs.published && cs.status !== 'draft');
  const newSubmissions = submissions.filter(s => s.status === 'New' || s.status === 'new');

  const stats = [
    { label: 'Total Articles', value: articles.length, sub: `${publishedArticles.length} published`, icon: FileText, route: '/admin/articles' },
    { label: 'Draft Articles', value: draftArticles.length, sub: 'In progress / review', icon: Clock, route: '/admin/articles' },
    { label: 'Case Studies', value: caseStudies.length, sub: `${publishedCaseStudies.length} published`, icon: Layers, route: '/admin/case-studies' },
    { label: 'Contact Submissions', value: submissions.length, sub: `${newSubmissions.length} unread`, icon: Mail, route: '/admin/contact-submissions' },
    { label: 'Media Items', value: media.length, sub: 'Storage assets', icon: ImageIcon, route: '/admin/media' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            System Overview & Metrics
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Direct telemetry from Supabase PostgreSQL tables & storage buckets
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNewArticle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </button>

          <button
            onClick={onNewCaseStudy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/media')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <button
              key={i}
              onClick={() => onNavigate(st.route)}
              className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-2xl font-bold text-zinc-100 tracking-tight">{st.value}</div>
              <div className="text-xs text-zinc-300 font-medium mt-0.5 truncate">{st.label}</div>
              <div className="text-[10px] font-mono text-zinc-500 mt-1 truncate">{st.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Backend Infrastructure Info */}
      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-zinc-200">Supabase PostgreSQL 15 + Storage</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isConnected ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'}`}>
                {isConnected ? 'LIVE CONNECTED' : 'LOCAL PERSISTENCE / SANDBOX'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Row Level Security is declared across all 11 tables. Contact submissions and draft content are protected against unauthorized reads.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/admin/settings')}
          className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-mono bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
        >
          View Settings →
        </button>
      </div>

      {/* Recent Activity Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Recent Articles</span>
            </h3>
            <button
              onClick={() => onNavigate('/admin/articles')}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              View all ({articles.length}) →
            </button>
          </div>

          <div className="space-y-2">
            {articles.slice(0, 4).map((art) => (
              <div
                key={art.id}
                onClick={() => onNavigate('/admin/articles')}
                className="p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/60 hover:border-zinc-700 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="truncate flex-1">
                  <p className="text-xs font-medium text-zinc-200 truncate">{art.title}</p>
                  <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                    {art.category} • {art.readTime}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    art.published && art.status !== 'draft'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                  }`}
                >
                  {art.status || (art.published ? 'published' : 'draft')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact Submissions */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Recent Contact Inquiries</span>
            </h3>
            <button
              onClick={() => onNavigate('/admin/contact-submissions')}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              Inbox ({submissions.length}) →
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-400 font-mono">
              No inquiries received yet. Contact form submissions appear here.
            </div>
          ) : (
            <div className="space-y-2">
              {submissions.slice(0, 4).map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => onNavigate('/admin/contact-submissions')}
                  className="p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/60 hover:border-zinc-700 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                >
                  <div className="truncate flex-1">
                    <p className="text-xs font-medium text-zinc-200 truncate">{sub.name}</p>
                    <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                      {sub.email} • {sub.projectType}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      sub.status === 'New' || sub.status === 'new'
                        ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
