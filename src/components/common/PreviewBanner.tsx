import React from 'react';
import { Eye, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface PreviewBannerProps {
  type: 'article' | 'case-study';
  slug: string;
  isPublished: boolean;
  onReturnToEditor: () => void;
  onPublishNow: () => void;
}

export const PreviewBanner: React.FC<PreviewBannerProps> = ({
  type,
  slug,
  isPublished,
  onReturnToEditor,
  onPublishNow,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-amber-500/95 backdrop-blur-md text-zinc-950 px-4 py-2.5 shadow-lg border-b border-amber-600 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium">
          <span className="p-1 rounded-md bg-zinc-950 text-amber-400">
            <Eye className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold tracking-wide uppercase font-mono text-[11px]">
            Preview Mode: {type === 'article' ? 'Insight Article' : 'Case Study'}
          </span>
          <span className="hidden sm:inline text-zinc-800">
            (Draft Content • Rendered with Public Layout • Excluded from Search Engines via noindex)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isPublished && (
            <button
              onClick={onPublishNow}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-950 text-zinc-100 hover:bg-zinc-900 font-semibold cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Publish Now</span>
            </button>
          )}

          <button
            onClick={onReturnToEditor}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-900/10 hover:bg-zinc-900/20 text-zinc-950 font-bold border border-zinc-900/30 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to CMS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
