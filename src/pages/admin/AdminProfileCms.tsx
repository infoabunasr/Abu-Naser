import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Key, LogOut, CheckCircle2, Database, AlertCircle } from 'lucide-react';
import { Profile } from '../../types';
import { supabaseService } from '../../services/supabaseService';
import { IMAGES } from '../../data/images';

interface AdminProfileCmsProps {
  profile: Profile | null;
  onLogout: () => void;
}

export const AdminProfileCms: React.FC<AdminProfileCmsProps> = ({
  profile,
  onLogout,
}) => {
  const [resetMessage, setResetMessage] = useState<{ success?: boolean; text?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const isConnected = supabaseService.isConfigured();

  const handlePasswordReset = async () => {
    if (!profile?.email) return;
    setLoading(true);
    const res = await supabaseService.resetPassword(profile.email);
    setLoading(false);
    setResetMessage({ success: res.success, text: res.message });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Super Admin Profile</h1>
        <p className="mt-1 text-xs text-zinc-400 font-mono">
          Credential management and security privileges
        </p>
      </div>

      {resetMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            resetMessage.success
              ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border border-red-800 text-red-300'
          }`}
        >
          {resetMessage.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{resetMessage.text}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar_url || IMAGES.profile.avatar}
            alt="Abu Naser Maaz"
            className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 shadow-md"
          />

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-zinc-100">{profile?.full_name || 'Abu Naser Maaz'}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{profile?.role || 'super_admin'}</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{profile?.email || 'info.abunasermaaz@gmail.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-850 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Role-Based Access Control
            </span>
            <span className="text-zinc-200 font-semibold">Super Administrator</span>
            <p className="text-[11px] text-zinc-400 mt-1">
              Full CRUD privileges across Articles, Case Studies, Media, Categories, and Settings.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Backend Integration
            </span>
            <span className={`font-semibold ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isConnected ? 'Supabase PostgreSQL (Live)' : 'Local Storage Sandbox'}
            </span>
            <p className="text-[11px] text-zinc-400 mt-1">
              {isConnected
                ? 'Authenticated sessions validated via Supabase Auth & profiles table.'
                : 'Sandbox mode active. Insert Supabase credentials in .env to connect live.'}
            </p>
          </div>
        </div>

        {/* Security Actions */}
        <div className="pt-4 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={handlePasswordReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{loading ? 'Sending Request...' : 'Send Password Reset Email'}</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
