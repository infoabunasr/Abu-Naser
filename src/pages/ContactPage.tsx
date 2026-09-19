import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { storageService } from '../services/storageService';
import { ProjectType } from '../types';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    projectType: 'Quality Engineering' as ProjectType,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const projectTypes: ProjectType[] = [
    'Quality Engineering',
    'QA / Software Testing',
    'Technical Project Delivery',
    'AI Testing',
    'Game Testing',
    'XR / AR / VR',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      storageService.addContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        role: formData.role.trim() || undefined,
        projectType: formData.projectType,
        message: formData.message.trim(),
      });

      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting your message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      <SeoHead
        title="Contact Abu Naser Maaz — Quality Engineering & Technical Delivery"
        description="Let's discuss your product. Reach out for software quality audits, QA strategy, AI application testing, and technical project delivery coordination."
        canonicalUrl="https://abunasarmaaz.com/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-8 border-b border-zinc-800/80">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
            Start a Conversation
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
            Let's Discuss Your Product
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
            Have a product that needs stronger quality, clearer delivery, or technical validation? Let's start with the problem.
          </p>
        </div>

        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/80 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/60 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-800">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100">Message Sent Successfully</h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed font-mono">
                    Thank you for reaching out. I have received your message and will review your project details promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        role: '',
                        projectType: 'Quality Engineering',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-zinc-950 bg-zinc-100 hover:bg-white transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-950/60 text-red-400 text-xs font-mono border border-red-800">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl focus:outline-none focus:border-zinc-500 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl focus:outline-none focus:border-zinc-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Company / Product
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Labs"
                        className="w-full px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl focus:outline-none focus:border-zinc-500 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Founder, CTO, VP Product"
                        className="w-full px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl focus:outline-none focus:border-zinc-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Project Type Picker */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Primary Area of Need
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`p-2.5 rounded-xl text-xs font-mono text-left transition-all border cursor-pointer ${
                            formData.projectType === type
                              ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100 shadow-sm'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Tell Me About the Problem or Product <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share context on your stage, target platform, timeline, and current quality or delivery challenges..."
                      className="w-full px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl focus:outline-none focus:border-zinc-500 transition-all leading-relaxed font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-200 cursor-pointer disabled:opacity-70 shadow-lg"
                  >
                    {loading ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Info & Expectations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/80 text-zinc-100 rounded-3xl p-8 border border-zinc-800 shadow-xl">
              <h3 className="text-xl font-bold mb-3">Direct Contact</h3>
              <p className="text-xs font-mono text-zinc-400 mb-6 leading-relaxed">
                Prefer direct communication? Reach out via email or LinkedIn anytime.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:info.abunasermaaz@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-300 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase">Email</span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-200">info.abunasermaaz@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/abunasarmaaz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-300 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block font-mono uppercase">LinkedIn</span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-200">linkedin.com/in/abunasarmaaz</span>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 space-y-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <span>Response Time: Typically within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <span>Location: Dhaka, Bangladesh • Global Remote</span>
                </div>
              </div>
            </div>

            {/* Engagement Types */}
            <div className="bg-zinc-900/60 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-sm">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                [Engagement Frameworks]
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-100">Full QA Audit:</strong> Comprehensive test matrix & defect backlog analysis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-100">Ongoing Quality Engineering:</strong> Embedded sprint QA & release gatekeeper.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-100">Technical Project Delivery:</strong> Agile sprint coordination and milestone tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-100">AI & XR Specialization:</strong> LLM hallucination benchmarking & VR profiling.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
