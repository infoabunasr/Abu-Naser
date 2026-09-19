import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  CheckCircle2,
  Trash2,
  Search,
  Filter,
  AlertCircle,
  ExternalLink,
  Folder
} from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaLibraryCmsProps {
  mediaItems: MediaItem[];
  onUpload: (
    file: File,
    folder: 'Profile' | 'Case Studies' | 'Blog' | 'XR' | 'General' | 'SEO',
    altText: string,
    title: string
  ) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: string, storagePath?: string) => Promise<void>;
}

export const MediaLibraryCms: React.FC<MediaLibraryCmsProps> = ({
  mediaItems,
  onUpload,
  onDelete,
}) => {
  const [folderFilter, setFolderFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<'Profile' | 'Case Studies' | 'Blog' | 'XR' | 'General' | 'SEO'>('General');
  const [customAlt, setCustomAlt] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = ['All', 'Profile', 'Case Studies', 'Blog', 'XR', 'General', 'SEO'];

  const handleCopyUrl = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const processFile = async (file: File) => {
    setUploadError('');
    setIsUploading(true);
    const res = await onUpload(file, selectedFolder, customAlt || file.name, customTitle || file.name);
    setIsUploading(false);
    if (!res.success) {
      setUploadError(res.error || 'Failed to upload image.');
    } else {
      setCustomAlt('');
      setCustomTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const filtered = mediaItems.filter((m) => {
    if (folderFilter !== 'All' && m.folder !== folderFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = m.title.toLowerCase().includes(q) || m.altText.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Media & Asset Storage</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            {mediaItems.length} Assets • Supabase Storage Bucket <span className="text-zinc-200">media</span>
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
            <UploadCloud className="w-4 h-4 text-zinc-400" />
            <span>Upload New Asset to Supabase Storage</span>
          </div>

          {/* Folder Target selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Target Folder:</span>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none"
            >
              {folders.filter(f => f !== 'All').map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {uploadError && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Asset Title (optional)"
            className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
          />
          <input
            type="text"
            value={customAlt}
            onChange={(e) => setCustomAlt(e.target.value)}
            placeholder="Alt text for SEO / accessibility"
            className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
          />
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-zinc-300 bg-zinc-800/40'
              : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-zinc-200">
            {isUploading ? 'Uploading asset to storage...' : 'Click to select or drag and drop image file here'}
          </p>
          <p className="text-[11px] font-mono text-zinc-500 mt-1">
            Supported: JPG, PNG, WEBP, AVIF (Max 5MB)
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setFolderFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer shrink-0 ${
                folderFilter === f
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-zinc-950 overflow-hidden">
              <img
                src={item.url}
                alt={item.altText || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-zinc-800 text-[10px] font-mono text-zinc-300">
                {item.folder}
              </span>
            </div>

            {/* Info */}
            <div className="p-3 space-y-1">
              <p className="text-xs font-medium text-zinc-200 truncate" title={item.title}>
                {item.title}
              </p>
              <p className="text-[10px] font-mono text-zinc-500 truncate" title={item.altText}>
                alt: {item.altText || 'None'}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-850">
                <span>{item.size || '120 KB'}</span>
                <span>{item.dimensions || '1200x800'}</span>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-2.5 bg-zinc-950/60 border-t border-zinc-850 flex items-center justify-between">
              <button
                onClick={() => handleCopyUrl(item)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white cursor-pointer"
              >
                {copiedId === item.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete media item "${item.title}"?`)) {
                    onDelete(item.id, item.storagePath);
                  }
                }}
                className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                title="Delete media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
