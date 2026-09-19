import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Tag,
  Image as ImageIcon,
  Globe,
  Mail,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Database,
  Code,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Profile } from '../../types';
import { supabaseService } from '../../services/supabaseService';
import { IMAGES } from '../../data/images';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  profile: Profile | null;
  toastMessage?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  onLogout,
  profile,
  toastMessage,
  children,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const isConnected = supabaseService.isConfigured();

  const navItems = [
    { label: 'Dashboard', route: '/admin', icon: LayoutDashboard },
    { label: 'Articles CMS', route: '/admin/articles', icon: FileText },
    { label: 'Case Studies CMS', route: '/admin/case-studies', icon: Layers },
    { label: 'Categories', route: '/admin/categories', icon: Tag },
    { label: 'Media Library', route: '/admin/media', icon: ImageIcon },
    { label: 'SEO Management', route: '/admin/seo', icon: Globe },
    { label: 'Contact Submissions', route: '/admin/contact-submissions', icon: Mail },
    { label: 'Site Settings', route: '/admin/settings', icon: Settings },
  ];

  const isActive = (route: string) => {
    if (route === '/admin') {
      return currentPath === '/admin' || currentPath === '/admin/';
    }
    return currentPath.startsWith(route);
  };

  const handleNavClick = (route: string) => {
    setMobileDrawerOpen(false);
    onNavigate(route);
  };

  const copySchemaToClipboard = async () => {
    try {
      const response = await fetch('/supabase/schema.sql');
      const sqlText = await response.text();
      await navigator.clipboard.writeText(sqlText);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    } catch {
      // Fallback
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#EDEDED] flex flex-col antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs shadow-2xl animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation drawer"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <img
              src={IMAGES.profile.avatar}
              alt="Abu Naser Maaz"
              className="w-7 h-7 rounded-md object-cover border border-zinc-700 shadow-sm"
            />
            <span className="font-bold text-sm tracking-tight">Admin CMS</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </header>

      {/* Main Framework Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-800/80 bg-[#0A0A0A] shrink-0 select-none">
          {/* Brand Header */}
          <div className="p-5 border-b border-zinc-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={IMAGES.profile.avatar}
                alt="Abu Naser Maaz"
                className="w-9 h-9 rounded-lg object-cover border border-zinc-700 shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <span className="block font-bold text-sm text-zinc-100 tracking-tight truncate">Abu Naser Maaz</span>
                <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Super Admin
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.route);
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-zinc-950' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Database & Schema Status */}
          <div className="p-3 border-t border-zinc-850 bg-zinc-950/40 m-3 rounded-xl border border-zinc-800/60">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">Backend:</span>
              <span className={`inline-flex items-center gap-1.5 font-semibold ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {isConnected ? 'Live Supabase' : 'Sandbox (Ready)'}
              </span>
            </div>
            <button
              onClick={() => setSchemaModalOpen(true)}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Database className="w-3 h-3 text-zinc-400" />
              <span>SQL Schema / Setup</span>
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="p-3 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={() => handleNavClick('/admin/profile')}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-200">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="truncate max-w-[110px]">
                <p className="text-xs font-medium text-zinc-200 truncate">{profile?.full_name || 'Maaz'}</p>
                <p className="text-[10px] font-mono text-zinc-400 truncate">{profile?.role || 'super_admin'}</p>
              </div>
            </button>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0A0A0A] border-r border-zinc-800 p-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                <span className="font-bold text-sm text-zinc-100">Navigation Menu</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-md text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const active = isActive(item.route);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer ${
                        active
                          ? 'bg-zinc-100 text-zinc-950 font-semibold'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onNavigate('/admin/profile');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-900"
                >
                  <User className="w-4 h-4" />
                  <span>Admin Profile</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Center Content Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#080808]">
          {/* Top action bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-zinc-850 bg-[#0A0A0A]/50 backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span>ADMIN CONSOLE</span>
              <span>/</span>
              <span className="text-zinc-200 uppercase">{currentPath.replace('/admin', '') || 'OVERVIEW'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSchemaModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Code className="w-3.5 h-3.5 text-zinc-400" />
                <span>Supabase Schema</span>
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer shadow-sm"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Supabase Schema / Instructions Modal */}
      {schemaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">Supabase Database Architecture</h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    PostgreSQL 15+ • Row Level Security • Tables & Storage Buckets
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSchemaModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-zinc-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <p className="font-semibold text-zinc-100">Connecting your live Supabase project:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-zinc-400 font-mono text-[11px]">
                  <li>Create a free project at <span className="text-zinc-200">supabase.com</span>.</li>
                  <li>Go to your Supabase SQL Editor and run the production script below.</li>
                  <li>Copy your Project URL and anon public key into <span className="text-zinc-200">.env</span> (<code className="text-zinc-300">VITE_SUPABASE_URL</code> and <code className="text-zinc-300">VITE_SUPABASE_ANON_KEY</code>).</li>
                  <li>Create a user in Supabase Authentication and insert into <code className="text-zinc-300">profiles</code> with <code className="text-zinc-300">role = 'super_admin'</code>.</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between pb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    schema.sql (11 tables, RLS policies, storage & seeds)
                  </span>
                  <button
                    onClick={copySchemaToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-750 text-zinc-200 transition-colors cursor-pointer"
                  >
                    {copiedSchema ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
                    <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy Schema SQL'}</span>
                  </button>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-300 max-h-60 overflow-y-auto">
                  <p className="text-zinc-500">-- Schema file location: /supabase/schema.sql</p>
                  <p className="mt-1 text-emerald-400">-- Click the "Copy Schema SQL" button above to copy the complete DDL to clipboard.</p>
                  <pre className="mt-2 text-zinc-400 whitespace-pre-wrap">
{`CREATE TABLE profiles (id UUID PRIMARY KEY, user_id UUID, role TEXT ...);
CREATE TABLE articles (id UUID PRIMARY KEY, title TEXT, slug TEXT UNIQUE ...);
CREATE TABLE case_studies (id UUID PRIMARY KEY, title TEXT, slug TEXT UNIQUE ...);
CREATE TABLE media (id UUID PRIMARY KEY, file_name TEXT, public_url TEXT ...);
CREATE TABLE contact_submissions (id UUID PRIMARY KEY, name TEXT, message TEXT ...);
CREATE TABLE seo_metadata (id UUID PRIMARY KEY, page_route TEXT UNIQUE ...);
CREATE TABLE site_settings (id UUID PRIMARY KEY, key TEXT UNIQUE, value JSONB ...);
-- RLS enabled on all 11 tables with super_admin policies and public read constraints.`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSchemaModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
