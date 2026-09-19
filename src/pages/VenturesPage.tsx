import React from 'react';
import {
  ExternalLink,
  ArrowRight,
  Boxes,
  Sparkles,
  MapPin,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { SeoHead } from '../components/common/SeoHead';
import { IMAGES } from '../data/images';

interface VenturesPageProps {
  onNavigate: (route: string) => void;
}

export const VenturesPage: React.FC<VenturesPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="Ventures & Entrepreneurship — Abu Naser Maaz"
        description="Explore Innovify XR (Immersive Simulations & Spatial Computing) and Locafyro founded and led by Abu Naser Maaz."
        canonicalUrl="https://abunasarmaaz.com/ventures"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'Ventures' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-10 border-b border-zinc-800/80">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Entrepreneurial Ventures
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            Ventures & Independent Building
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
            In addition to Quality Engineering and technical delivery consulting, I build and lead innovative technology products across spatial computing, AI, and digital platforms.
          </p>
        </div>

        {/* Primary Venture: Innovify XR */}
        <section className="py-12 border-b border-zinc-800/80">
          <div className="bg-zinc-900/80 rounded-3xl text-zinc-100 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Primary Venture
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Founder & CEO
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
                  Innovify XR
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal mb-6">
                  Innovify XR is an emerging technology company focused on immersive training simulations, virtual reality experiences, spatial computing applications, and AI-integrated digital systems.
                </p>

                <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Immersive VR training simulations for industrial and enterprise applications</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Meta Quest spatial computing & interactive 3D UX</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Custom generative AI integrations within virtual environments</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://innovifyxr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>VISIT INNOVIFYXR.COM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
                  <img
                    src={IMAGES.ventures.innovifyXr}
                    alt="Innovify XR"
                    className="w-full h-64 sm:h-80 object-cover grayscale contrast-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Venture: Locafyro */}
        <section className="py-12 border-b border-zinc-800/80">
          <div className="bg-zinc-900/60 rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Secondary Venture
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Product Platform
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-zinc-100 mb-4">
                  Locafyro
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-6">
                  Locafyro is an independent local discovery and commerce exploration initiative designed to empower local businesses, neighborhood services, and community connectivity through intuitive mobile and web interfaces.
                </p>

                <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Hyperlocal business search and category navigation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Real-time location proximity discovery</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <span>Seamless mobile-first booking and inquiry workflows</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>STATUS: IN DEVELOPMENT</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-md bg-zinc-950">
                  <img
                    src={IMAGES.ventures.locafyro}
                    alt="Locafyro Local Commerce"
                    className="w-full h-64 sm:h-72 object-cover grayscale contrast-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy / Synergy */}
        <section className="py-12">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-2">
              Founder Perspective
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4">
              How Building Ventures Strengthens My QA & Delivery Work
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Operating as a founder means I do not view software quality through an isolated academic lens. I understand customer acquisition friction, burn rate, engineering deadlines, and roadmap trade-offs. This makes my Quality Engineering and project coordination practical, realistic, and directly aligned with startup outcomes.
            </p>
          </div>
        </section>
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
