import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  CheckCircle,
  Archive,
  Trash2,
  ExternalLink,
  Eye,
  X,
  Clock,
  AlertTriangle,
  Building,
  User,
  Briefcase
} from 'lucide-react';
import { ContactSubmission } from '../../types';

interface ContactSubmissionsCmsProps {
  submissions: ContactSubmission[];
  onUpdateStatus: (id: string, status: 'new' | 'read' | 'archived') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const ContactSubmissionsCms: React.FC<ContactSubmissionsCmsProps> = ({
  submissions,
  onUpdateStatus,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const normalizeStatus = (status: string): 'new' | 'read' | 'archived' => {
    const s = status.toLowerCase();
    if (s === 'in review' || s === 'read' || s === 'contacted') return 'read';
    if (s === 'archived') return 'archived';
    return 'new';
  };

  const filtered = submissions.filter((sub) => {
    if (statusFilter !== 'all') {
      const norm = normalizeStatus(sub.status);
      if (norm !== statusFilter) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        sub.name.toLowerCase().includes(q) ||
        sub.email.toLowerCase().includes(q) ||
        sub.message.toLowerCase().includes(q) ||
        (sub.company && sub.company.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Contact Inquiries & Leads</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            {submissions.length} Total • {submissions.filter(s => normalizeStatus(s.status) === 'new').length} Unread • Stored in Supabase <code className="text-zinc-300">contact_submissions</code>
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by name, email, company, message..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="new">New / Unread</option>
            <option value="read">In Review / Read</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Project Scope</th>
                <th className="py-3 px-4">Message Preview</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => {
                  const norm = normalizeStatus(sub.status);
                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-zinc-900/60 transition-colors ${
                        norm === 'new' ? 'bg-zinc-950/40 font-medium' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-100">{sub.name}</span>
                          {norm === 'new' && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 mt-0.5 truncate">
                          {sub.email}
                        </div>
                        {sub.company && (
                          <div className="text-[10px] font-mono text-zinc-500 truncate">
                            {sub.company} {sub.role ? `(${sub.role})` : ''}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[10px]">
                          {sub.projectType}
                        </span>
                        <div className="text-[10px] font-mono text-zinc-500 mt-1">
                          {sub.submittedAt.split('T')[0]}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-sm">
                        <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed">
                          {sub.message}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                            norm === 'new'
                              ? 'bg-blue-950/60 text-blue-400 border border-blue-800/60'
                              : norm === 'read'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {norm}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => {
                              setSelectedSubmission(sub);
                              if (norm === 'new') {
                                onUpdateStatus(sub.id, 'read');
                              }
                            }}
                            title="View Full Message"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick mark read/archive */}
                          <button
                            onClick={() => onUpdateStatus(sub.id, norm === 'read' ? 'archived' : 'read')}
                            title={norm === 'read' ? 'Archive Inquiry' : 'Mark as Read'}
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                          >
                            {norm === 'read' ? <Archive className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry from ${sub.name}?`)) {
                                onDelete(sub.id);
                              }
                            }}
                            title="Delete Inquiry"
                            className="p-1.5 rounded-lg bg-zinc-950 hover:bg-red-950/60 text-zinc-500 hover:text-red-300 border border-zinc-800 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Viewer Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Inquiry Details
                </span>
                <h3 className="text-base font-bold text-zinc-100 mt-0.5">{selectedSubmission.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1">Email Address</span>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="text-zinc-200 hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{selectedSubmission.email}</span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1">Project Category</span>
                <span className="text-zinc-200 font-mono">{selectedSubmission.projectType}</span>
              </div>

              {selectedSubmission.company && (
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">Company</span>
                  <span className="text-zinc-200">{selectedSubmission.company}</span>
                </div>
              )}

              {selectedSubmission.role && (
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">Role / Position</span>
                  <span className="text-zinc-200">{selectedSubmission.role}</span>
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                Full Message
              </span>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedSubmission.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <a
                href={`mailto:${selectedSubmission.email}?subject=Re:%20${encodeURIComponent(selectedSubmission.projectType)}%20Inquiry`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdateStatus(selectedSubmission.id, 'archived');
                    setSelectedSubmission(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Archive
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
