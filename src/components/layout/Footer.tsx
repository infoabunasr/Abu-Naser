import React from 'react';
import { ArrowUpRight, Linkedin, Mail, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] text-zinc-400 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 flex items-center justify-center font-bold text-base">
                M
              </div>
              <div>
                <span className="font-bold text-lg text-zinc-100 tracking-tight">
                  Abu Naser Maaz
                </span>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  QA Engineering • Technical Delivery
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Helping founders and engineering teams identify critical risks, institute disciplined testing processes, and ship resilient digital products across web, mobile, AI, games, and XR.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com/in/abunasarmaaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Abu Naser Maaz on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:info.abunasermaaz@gmail.com"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
              [Navigation]
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Abu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/expertise')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Expertise & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/case-studies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/insights')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Insights & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ventures')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ventures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-zinc-200 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Let's Talk →
                </button>
              </li>
            </ul>
          </div>

          {/* Core Focus Col */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
              [Capabilities]
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                Quality Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                Software QA & Regression
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                Technical Delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                AI Testing & Safety
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                Game & XR Testing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400" />
                Sprint Coordination
              </li>
            </ul>
          </div>

          {/* Ventures & Admin Col */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
              [Ventures]
            </h4>
            <div className="space-y-3">
              <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">Innovify XR</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Founder
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Immersive simulations & XR training solutions.
                </p>
                <a
                  href="https://innovifyxr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white"
                >
                  <span>innovifyxr.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/admin')}
                  className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <ShieldAlert className="w-3 h-3" />
                  <span>Admin CMS</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>© 2026 Abu Naser Maaz. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>abunasarmaaz.com</span>
            <span>•</span>
            <span>Structured Quality & Reliable Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
