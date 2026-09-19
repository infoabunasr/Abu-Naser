import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Smartphone,
  Server,
  Gamepad2,
  Boxes,
  Workflow,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Zap,
  Sparkles,
  Layers,
  Search,
  CheckSquare
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { SeoHead } from '../components/common/SeoHead';

interface ExpertisePageProps {
  onNavigate: (route: string) => void;
}

export const ExpertisePage: React.FC<ExpertisePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const competencies = [
    {
      id: 'qe',
      number: '01',
      title: 'Quality Engineering',
      tagline: 'End-to-end software quality assurance, regression suites, and release validation',
      icon: ShieldCheck,
      description:
        'Structured quality practices designed to identify functional edge cases, prevent regression bugs across releases, and ensure intuitive user journeys on web and mobile.',
      capabilities: [
        { name: 'Functional Testing', detail: 'Verifying user stories against business specifications and edge cases' },
        { name: 'Regression Testing', detail: 'Ensuring new feature commits do not break existing core flows' },
        { name: 'Exploratory Testing', detail: 'Charters targeting unscripted failure paths and state conflicts' },
        { name: 'Web Application Testing', detail: 'Cross-browser (Chrome, Safari, Firefox, Edge) and responsive UI' },
        { name: 'Mobile App Testing', detail: 'Android & iOS fragmentation, deep linking, and offline sync' },
        { name: 'Usability Testing', detail: 'Validating form clarity, touch targets, and accessible user flows' },
        { name: 'Compatibility Testing', detail: 'Validating diverse resolutions, OS versions, and network speeds' },
        { name: 'Defect Analysis & Triage', detail: 'Actionable bug reports with HAR logs, reproduction steps, and severity' },
        { name: 'Release Validation', detail: 'Sanity checklists, smoke testing, and production rollback readiness' },
      ],
      tools: ['Jira', 'Chrome DevTools', 'BrowserStack', 'TestRail', 'Playwright (Basics)', 'Lighthouse'],
    },
    {
      id: 'api',
      number: '02',
      title: 'API Testing',
      tagline: 'Request/response payload validation, HTTP status codes, and endpoint integrity',
      icon: Server,
      description:
        'Foundational REST API validation to verify data contracts, status code accuracy, error payload structures, and authorization controls.',
      capabilities: [
        { name: 'Request/Response Validation', detail: 'Inspecting JSON payload structures and schema types' },
        { name: 'HTTP Status Code Verification', detail: 'Validating 200, 201, 400, 401, 403, 404, 429 and 500 handling' },
        { name: 'Authentication & Authorization', detail: 'Testing Bearer tokens, expired JWTs, and permission boundaries' },
        { name: 'Negative Scenario Probing', detail: 'Passing malformed parameters, missing fields, and boundary types' },
        { name: 'Postman Collection Runs', detail: 'Structuring reusable test suites and environment variables in Postman' },
      ],
      tools: ['Postman', 'Swagger / OpenAPI', 'Charles Proxy', 'cURL'],
    },
    {
      id: 'xr-game',
      number: '03',
      title: 'Game & XR Testing',
      tagline: 'Gameplay mechanics, physics collision, spatial tracking, and 90 FPS performance',
      icon: Boxes,
      description:
        'Specialized QA for interactive 3D media, mobile/PC indie titles, and spatial computing prototypes (Meta Quest).',
      capabilities: [
        { name: 'Gameplay & Physics Testing', detail: 'Detecting terrain clipping, animation cancels, and hitboxes' },
        { name: 'UI & Menu Interactions', detail: 'Controller button remapping, pause state locks, inventory UI' },
        { name: 'Device Compatibility', detail: 'Testing across mid-tier mobile chipsets and PC configurations' },
        { name: 'Monetization & Ads QA', detail: 'In-app purchases (IAP) sandboxes and rewarded ad network callbacks' },
        { name: 'Meta Quest Spatial Testing', detail: 'Spatial UI raycasting, 6DoF tracking, and hand-gesture occlusion' },
        { name: 'Immersive UX & Comfort', detail: 'Validating vergence distances, text readability, and 90Hz stability' },
      ],
      tools: ['Meta Quest Developer Hub (MQDH)', 'OVR Metrics Tool', 'Unity QA Profiler', 'OBS Studio', 'SideQuest'],
    },
    {
      id: 'delivery',
      number: '04',
      title: 'Technical Project Delivery',
      tagline: 'Agile sprint coordination, QA milestones, risk tracking, and stakeholder clarity',
      icon: Workflow,
      description:
        'Bridging product requirements with engineering reality through structured coordination, task follow-up, and clear release governance.',
      capabilities: [
        { name: 'Project Coordination', detail: 'Structuring sprint goals, backlog grooming, and milestone delivery' },
        { name: 'Sprint & QA Coordination', detail: 'Aligning QA test execution windows directly within sprint sprints' },
        { name: 'Progress & Blocker Tracking', detail: 'Daily blocker escalation and dependency management' },
        { name: 'Task Follow-Up', detail: 'Ensuring bug fixes and re-tests are verified within agreed SLAs' },
        { name: 'Definition of Ready / Done', detail: 'Enforcing testable acceptance criteria before code commits' },
        { name: 'Risk Tracking & Release Governance', detail: 'Clear residual risk reports for founders and engineering leads' },
        { name: 'Stakeholder Communication', detail: 'Translating technical defect nuance into business impact updates' },
      ],
      tools: ['Jira Software', 'Linear', 'Confluence', 'GitHub Projects', 'Trello', 'Slack / Notion'],
    },
    {
      id: 'ai-qa',
      number: '05',
      title: 'AI Application Testing',
      tagline: 'LLM evaluation, hallucination detection, prompt injections, and latency audits',
      icon: Cpu,
      description:
        'An actively developing specialization focused on testing non-deterministic software, generative AI outputs, and LLM-assisted workflows.',
      capabilities: [
        { name: 'Functional & Prompt Evaluation', detail: 'Testing instruction-following and edge-case prompt responses' },
        { name: 'Hallucination & Groundedness Audits', detail: 'Verifying factual accuracy and citation consistency in RAG' },
        { name: 'Prompt Injection Defense', detail: 'Adversarial probing against system prompt leakages and jailbreaks' },
        { name: 'Output Consistency & Parsing', detail: 'Ensuring structured JSON and markdown parsing never crash UI' },
        { name: 'Streaming & Latency Audits', detail: 'Time-to-first-token (TTFT) and socket reconnection resilience' },
        { name: 'AI-Assisted QA Practices', detail: 'Utilizing AI tooling to accelerate test case generation responsibly' },
      ],
      badge: 'Developing Specialization',
      tools: ['Gemini API SDK', 'Python Evaluation Scripts', 'Postman', 'Custom Benchmark Datasets'],
    },
  ];

  const filteredCompetencies = activeTab === 'all'
    ? competencies
    : competencies.filter(c => c.id === activeTab);

  const toolCategories = [
    {
      title: 'Issue & Project Tracking',
      items: ['Jira Software', 'Linear', 'GitHub Projects', 'Trello', 'Confluence', 'Notion']
    },
    {
      title: 'API & Network Testing',
      items: ['Postman', 'Chrome DevTools', 'Charles Proxy', 'Swagger', 'Network Link Conditioner']
    },
    {
      title: 'Testing & Automation (Foundations)',
      items: ['TestRail', 'BrowserStack', 'Playwright (Foundations)', 'Lighthouse', 'Firebase Test Lab']
    },
    {
      title: 'Mobile, XR & Game QA',
      items: ['Android Studio (ADB)', 'Meta Quest Developer Hub (MQDH)', 'OVR Metrics Tool', 'Unity Profiler', 'SideQuest']
    },
    {
      title: 'AI Evaluation & Tooling',
      items: ['Gemini API SDK', 'Prompt Eval Scripts', 'LangSmith (Inspection)', 'Python Test Harnesses']
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="Expertise & Capabilities — Abu Naser Maaz"
        description="Comprehensive breakdown of Quality Engineering, API Testing, Game & XR QA, Technical Project Delivery, and AI Application Testing."
        canonicalUrl="https://abunasarmaaz.com/expertise"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Breadcrumbs items={[{ label: 'Expertise & Capabilities' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-10 border-b border-zinc-800/80">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Capabilities & Service Areas
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            How I Support Your Product
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
            Delivering rigorous software quality assurance and organized technical project delivery across web, mobile, AI systems, games, and spatial computing.
          </p>

          {/* Quick Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              ALL EXPERTISE (5)
            </button>
            {competencies.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveTab(comp.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeTab === comp.id
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {comp.number} {comp.title.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Competency Sections */}
        <div className="py-12 space-y-10">
          {filteredCompetencies.map((comp) => {
            const Icon = comp.icon;
            return (
              <div
                key={comp.id}
                id={comp.id}
                className="bg-zinc-900/60 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/80">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                          {comp.number}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                          {comp.title}
                        </h2>
                        {comp.badge && (
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {comp.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-mono text-zinc-400">
                        {comp.tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/contact')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono bg-zinc-100 hover:bg-white text-zinc-950 transition-colors flex-shrink-0 cursor-pointer font-semibold"
                  >
                    <span>INQUIRE FOR {comp.title.toUpperCase()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 mb-8 max-w-4xl leading-relaxed font-normal">
                  {comp.description}
                </p>

                {/* Capabilities Grid */}
                <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
                  [What is Included & Validated]
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {comp.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/90 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-zinc-100">
                            {cap.name}
                          </h4>
                          <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-normal">
                            {cap.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools bar */}
                <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-zinc-500 text-[11px] uppercase tracking-wider">Tools & Environments:</span>
                  {comp.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION: Tool Stack Overview */}
        <section className="py-12 border-t border-zinc-800/80">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              [Tooling & Ecosystem]
            </span>
            <h2 className="text-3xl font-bold text-zinc-100 mt-1">
              Tools, Environments & Workflows
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-normal">
              Pragmatic tools utilized to investigate network payloads, coordinate sprint boards, profile render cycles, and log reproducible tickets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolCategories.map((cat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-sm">
                <h3 className="font-bold text-sm text-zinc-100 mb-4 pb-2 border-b border-zinc-800/80 font-mono">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
