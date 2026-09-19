import React from 'react';
import { ArrowRight, Mail, Calendar, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (route: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0A0A0A] border-t border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 to-[#070707] text-white p-8 sm:p-12 lg:p-16 overflow-hidden border border-zinc-800 shadow-2xl">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-800 text-zinc-300 border border-zinc-700 mb-6">
              <span>Start With The Problem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Building a Product? <br />
              <span className="font-serif-italic font-normal text-zinc-300">Let's make quality part of the process.</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              Whether you are validating a new early-stage product, standardizing QA for rapid sprints, or testing complex AI and spatial computing workflows, let's explore actionable ways to de-risk your release.
            </p>

            {/* Value checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Risk-based test strategy aligned with business priorities</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Zero fluff bug reporting with reproducible payloads</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Sprint coordination bridging product & engineering</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>AI, Web, Mobile, Games & XR evaluation frameworks</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:info.abunasermaaz@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-all duration-200 font-mono text-xs"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>info.abunasermaaz@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
