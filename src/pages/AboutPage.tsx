import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Boxes,
  Cpu,
  Linkedin,
  Mail,
  ExternalLink,
  Target
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { SeoHead } from '../components/common/SeoHead';
import { IMAGES } from '../data/images';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="About Abu Naser Maaz — Quality Engineering & Technical Delivery"
        description="Learn about Abu Naser Maaz's journey across Software QA, Technical Project Delivery, AI testing, and founding Innovify XR."
        canonicalUrl="https://abunasarmaaz.com/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'About Abu' }]} />

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6 sm:py-10 border-b border-zinc-800/80">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
              Background & Approach
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
              About Abu Naser Maaz
            </h1>
            <p className="mt-3 text-base sm:text-lg font-mono text-zinc-400">
              Quality Engineer • Technical Delivery Lead • Founder of Innovify XR
            </p>
            <p className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              I help founders and engineering teams ship resilient, predictable digital software. By bridging hands-on Quality Engineering with technical project coordination, I ensure that product risks are identified early and development cycles move forward with release confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm transition-colors cursor-pointer"
              >
                <span>Discuss Your Product</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://linkedin.com/in/abunasarmaaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                <span>CONNECT ON LINKEDIN</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900/80 p-3">
              <img
                src={IMAGES.profile.about}
                alt="Abu Naser Maaz"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold text-base text-zinc-100">Abu Naser Maaz</h3>
                <p className="text-xs font-mono text-zinc-500">Dhaka, Bangladesh • Global Remote</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: My Approach */}
        <section className="py-16 sm:py-20 border-b border-zinc-800/80">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              [Core Philosophy]
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-6">
              My Approach to Quality Engineering
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              <p>
                Many teams treat QA as a reactionary checkpoint at the end of a sprint—a friction point where testers frantically log cosmetic defects before an arbitrary deadline.
              </p>
              <p>
                I operate differently. I treat Quality Engineering as an embedded risk-management discipline. From sprint planning and backlog grooming to API contract verification and user-journey exploratory testing, quality should be an accelerator, not a bottleneck.
              </p>
              <p>
                Every defect I report is structured with clear steps, network payloads, environment parameters, and business context so developers can fix the root cause in minutes rather than spending days guessing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Target className="w-5 h-5 text-zinc-300 mb-2" />
                <h4 className="font-bold text-zinc-100 text-sm mb-1">Risk-First Prioritization</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Focusing validation where defects would cause financial, security, or retention impact.</p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Workflow className="w-5 h-5 text-zinc-300 mb-2" />
                <h4 className="font-bold text-zinc-100 text-sm mb-1">Clear Coordination</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Bridging product requirements with engineering reality through structured definitions.</p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Cpu className="w-5 h-5 text-zinc-300 mb-2" />
                <h4 className="font-bold text-zinc-100 text-sm mb-1">Modern Specialization</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Applying deterministic testing alongside LLM evaluation and spatial computing QA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Professional Journey */}
        <section className="py-16 sm:py-20 border-b border-zinc-800/80">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              [Milestones]
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-8">
              Professional Journey
            </h2>

            <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-800">
              {/* Item 1 */}
              <div className="relative flex items-start gap-6 pl-8">
                <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-200" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Present Focus</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">
                    Quality Engineering, Technical Delivery & Emerging Tech
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Partnering with startup founders, SaaS teams, and digital product studios. Specializing in structured web and mobile QA, API validation, AI application evaluation, and agile delivery coordination.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-start gap-6 pl-8">
                <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-500" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Venture Leadership</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">
                    Founder & CEO — Innovify XR
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Founded Innovify XR to build immersive training simulations, spatial computing experiences (Meta Quest), and AI-integrated products. Spearheaded both technical execution and product lifecycle delivery.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-start gap-6 pl-8">
                <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-500" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Foundation</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">
                    Software Testing, Game QA & Project Coordination
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Developed foundational expertise executing black-box testing, regression matrices, device fragmentation validation for Android/iOS, gameplay mechanics QA, and coordinating cross-functional sprints in Jira.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: What I Believe */}
        <section className="py-16 sm:py-20 border-b border-zinc-800/80">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              [Principles]
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-6">
              What I Believe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100 mb-2">1. Prevention beats detection</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Clarifying acceptance criteria during sprint grooming prevents logic flaws before a developer writes a single line of code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100 mb-2">2. Respect developer time</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Every bug ticket should be a complete reproduction package: exact inputs, environment, console traces, network payloads, and expected behavior.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100 mb-2">3. Transparency over false comfort</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  100% test coverage is an illusion. Product leaders deserve an honest assessment of residual risks so they can make informed release decisions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100 mb-2">4. Quality is a team sport</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  QA should never be an isolated department or police force. We are collaborative partners helping engineering ship with pride.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Current Focus & Founder Journey */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              [Continuous Growth]
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-2 mb-6">
              Current Focus & Entrepreneurial Perspective
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              <p>
                My primary day-to-day focus is on <strong className="text-zinc-200">Quality Engineering</strong> and <strong className="text-zinc-200">Technical Project Delivery</strong> for web, mobile, and SaaS applications.
              </p>
              <p>
                Concurrently, I am actively expanding structured evaluation methodologies for <strong className="text-zinc-200">AI-integrated applications</strong> (evaluating hallucinations, prompt injection vulnerabilities, and latency in LLMs) and <strong className="text-zinc-200">XR experiences</strong> (framerate profiling and spatial ergonomics on Meta Quest headsets).
              </p>
              <p>
                Through founding <strong className="text-zinc-200">Innovify XR</strong>, I have lived the challenges of managing roadmap trade-offs, client expectations, and engineering deadlines. This founder experience directly sharpens how I coordinate technical projects and safeguard product quality.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <button
                onClick={() => onNavigate('/expertise')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors cursor-pointer"
              >
                <span>EXPLORE TECHNICAL EXPERTISE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('/ventures')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
              >
                <span>LEARN ABOUT INNOVIFY XR</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
