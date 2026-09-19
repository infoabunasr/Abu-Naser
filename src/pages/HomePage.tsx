import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  Globe,
  Gamepad2,
  Boxes,
  Workflow,
  ExternalLink,
  ChevronRight,
  Search,
  MessageSquare
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { CaseStudyCard } from '../components/common/CaseStudyCard';
import { ArticleCard } from '../components/common/ArticleCard';
import { CTASection } from '../components/common/CTASection';
import { storageService } from '../services/storageService';
import { IMAGES } from '../data/images';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const caseStudies = storageService.getCaseStudies().filter(cs => cs.published).slice(0, 6);
  const articles = storageService.getArticles().filter(a => a.published).slice(0, 3);
  const siteSettings = storageService.getSiteSettings();

  const workingSteps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'Deep dive into product requirements, business goals, target user personas, and critical release milestones.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Identify',
      desc: 'Map failure probabilities, identify high-impact risk paths, and construct tailored test matrices before code freezes.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Test',
      desc: 'Execute rigorous exploratory, functional, cross-platform regression, boundary, and device fragmentation testing.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Communicate',
      desc: 'Deliver reproducible defect reports with console traces, network payloads, and actionable severity triage in Jira.',
      icon: MessageSquare,
    },
    {
      num: '05',
      title: 'Improve',
      desc: 'Validate fixes, evaluate residual release risks, and ensure the engineering team ships with high confidence.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pb-28 border-b border-zinc-800/80 bg-[#0A0A0A]">
        {/* Subtle decorative grid/glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-zinc-800/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-300 border border-zinc-800 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>QUALITY ENGINEERING • TECHNICAL DELIVERY</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-zinc-100 tracking-tight leading-[1.12]">
                I Help Founders & Teams{' '}
                <span className="font-serif-italic font-normal text-zinc-300">Ship Better Software</span>
              </h1>

              {/* Supporting Paragraph */}
              <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
                I work across Quality Engineering, Software Testing, and Technical Project Delivery to help product teams identify risks, improve product quality, and deliver reliable digital experiences.
              </p>

              {/* Secondary Sentence */}
              <p className="mt-3 text-sm sm:text-base text-zinc-500 leading-relaxed">
                With experience across web, mobile, games, APIs, XR, and emerging technology, I bring a product-focused approach to software quality and delivery.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/case-studies')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 transition-all duration-200 cursor-pointer"
                >
                  <span>View Case Studies</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="mt-10 pt-8 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-zinc-100 font-mono">2+ Years</div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono mt-1">QA & Testing Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-100 font-mono">1+ Year</div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono mt-1">Project Coordination</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-200 font-mono">Founder</div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono mt-1">Innovify XR (CEO)</div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-zinc-900/80 rounded-3xl p-6 sm:p-7 border border-zinc-800 shadow-2xl relative z-10 backdrop-blur-sm">
                  {/* Card Header Profile */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800/80">
                    <img
                      src={IMAGES.profile.about}
                      alt="Abu Naser Maaz"
                      className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-zinc-100">
                        Abu Naser Maaz
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono">
                        Quality Engineer & Founder
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{siteSettings.availabilityStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Focus Matrix Pillars */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-200">Web & Mobile App QA</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Core</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <div className="flex items-center gap-2.5">
                        <Workflow className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-200">Technical Delivery</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Coordination</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <div className="flex items-center gap-2.5">
                        <Cpu className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-200">AI Testing & Safety</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Specialization</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <div className="flex items-center gap-2.5">
                        <Boxes className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-semibold text-zinc-200">Game & XR QA (Quest/Unity)</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Immersive</span>
                    </div>
                  </div>

                  {/* Card footer info */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Stack: Jira, Postman, ADB, MQDH</span>
                    <button
                      onClick={() => onNavigate('/expertise')}
                      className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      View Stack →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CAPABILITY STRIP */}
      <section className="bg-[#050505] text-zinc-400 py-5 border-b border-zinc-800/80 overflow-hidden font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-4 text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              QUALITY ENGINEERING
            </span>
            <span className="hidden sm:inline text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              SOFTWARE TESTING
            </span>
            <span className="hidden sm:inline text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              TECHNICAL DELIVERY
            </span>
            <span className="hidden sm:inline text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              AI TESTING
            </span>
            <span className="hidden sm:inline text-zinc-800">•</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              GAME & XR TESTING
            </span>
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION: Quality is more than finding bugs */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Quality Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            Quality is more than <span className="font-serif-italic font-normal text-zinc-300">finding bugs.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto font-normal">
            Good software quality requires understanding the product, identifying meaningful risks, validating real user journeys, communicating clearly with technical teams, and helping teams make better release decisions.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
            >
              <span>Learn more about my background & approach</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE PREVIEW: How I Can Support Your Product */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Competencies"
            title="How I Can Support Your Product"
            description="Combining structured Quality Engineering with technical project coordination to keep product releases predictable, stable, and user-centric."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 01 */}
            <div className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                    01
                  </span>
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-3">
                  Quality Engineering
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  Structured software testing, defect analysis, regression validation, usability evaluation, and release quality support.
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Functional & exploratory test design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Cross-browser & mobile device matrices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Regression suites & release gatekeeper</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('/expertise')}
                className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>View Quality Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 02 */}
            <div className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                    02
                  </span>
                  <Workflow className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-3">
                  Technical Project Delivery
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  Project coordination, progress tracking, QA coordination, task follow-up, risk visibility, and delivery support.
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Agile sprint tracking & blocker triage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Definition of Ready & Done enforcement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Developer, QA & stakeholder alignment</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('/expertise')}
                className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>View Delivery Coordination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 03 */}
            <div className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                    03
                  </span>
                  <Cpu className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-3">
                  AI & Emerging Tech
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  AI application testing, AI-assisted quality practices, XR testing, immersive technology, games, and emerging product experiences.
                </p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>LLM hallucination & prompt injection tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Meta Quest spatial UI & 90 FPS profiling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Game physics, boundary & collision QA</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('/expertise')}
                className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                <span>Explore Emerging Tech</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/expertise')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
            >
              <span>EXPLORE ALL EXPERTISE & TOOLS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SELECTED CASE STUDIES */}
      <section className="py-20 sm:py-28 bg-[#080808] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-3">
                Evidence & Execution
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
                Selected Work & Case Studies
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
                Hands-on test matrices, defect documentation, and delivery workflows across diverse technical architectures.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/case-studies')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>BROWSE ALL CASE STUDIES →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard
                key={cs.id}
                caseStudy={cs}
                onSelect={(slug) => onNavigate(`/case-studies/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORKING APPROACH (5-Step Process) */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Methodology"
            title="From Product Understanding to Release Confidence"
            description="A structured 5-step quality workflow designed to catch defects early, protect developer time, and provide clarity to product leaders."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {workingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800/90 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                        {step.num}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-zinc-400 border border-zinc-800">
                        <Icon className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-zinc-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER / INNOVIFY XR SECTION */}
      <section className="py-20 sm:py-28 bg-[#080808] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-zinc-900 to-[#070707] rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-800 text-zinc-300 border border-zinc-700 mb-6">
                  <span>Founder & CEO — Innovify XR</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Building at the Intersection of <span className="font-serif-italic font-normal text-zinc-300">XR, AI & Emerging Tech</span>
                </h2>

                <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  Through Innovify XR, Abu works on immersive training, simulation, XR experiences, AI-integrated solutions, and emerging technology products.
                </p>

                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  As founder, this hands-on building experience provides deep empathy for product velocity, technical constraints, and the balance between engineering speed and release quality.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="https://innovifyxr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors shadow-sm"
                  >
                    <span>Explore Innovify XR</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onNavigate('/ventures')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
                  >
                    <span>VENTURES OVERVIEW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl bg-zinc-950">
                  <img
                    src={IMAGES.ventures.innovifyXr}
                    alt="Innovify XR Immersive Simulation"
                    className="w-full h-64 sm:h-72 object-cover opacity-90"
                    loading="lazy"
                  />
                  <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Immersive Simulation & XR Studio</span>
                    <span className="text-zinc-200 font-medium">innovifyxr.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSIGHTS PREVIEW */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-3">
                Editorial & Analysis
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
                Insights on Quality & Delivery
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
                Practical perspectives on risk-based testing, generative AI quality evaluation, startup pitfalls, and agile QA workflows.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/insights')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>VIEW ALL INSIGHTS →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={(slug) => onNavigate(`/insights/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
