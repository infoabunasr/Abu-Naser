import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExpertisePage } from './pages/ExpertisePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { VenturesPage } from './pages/VenturesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    if (!route) return;
    if (typeof route === 'string' && route.startsWith('http')) {
      window.open(route, '_blank', 'noopener,noreferrer');
      return;
    }
    window.history.pushState({}, '', route);
    setCurrentPath(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe normalized path
  const path = currentPath || '/';

  // Route Matching Engine
  const renderPage = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    // 2. About
    if (path === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    // 3. Expertise
    if (path.startsWith('/expertise')) {
      const parts = path.split('/');
      const initialDomain = parts[2] ? decodeURIComponent(parts[2]) : undefined;
      return <ExpertisePage initialDomain={initialDomain} onNavigate={handleNavigate} />;
    }

    // 4. Case Studies
    if (path === '/case-studies') {
      return <CaseStudiesPage onNavigate={handleNavigate} />;
    }
    if (path.startsWith('/case-studies/')) {
      const slug = path.replace('/case-studies/', '');
      return <CaseStudyDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    // 5. Insights
    if (path === '/insights') {
      return <InsightsPage onNavigate={handleNavigate} />;
    }
    if (path.startsWith('/insights/')) {
      const slug = path.replace('/insights/', '');
      return <InsightDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    // 6. Ventures
    if (path === '/ventures') {
      return <VenturesPage onNavigate={handleNavigate} />;
    }

    // 7. Contact
    if (path === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    // 8. Admin
    if (path.startsWith('/admin')) {
      return <AdminDashboard currentRoute={path} onNavigate={handleNavigate} />;
    }

    // Fallback: 404
    return (
      <div className="pt-36 pb-24 text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">[404 ERROR]</span>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">Page Not Found</h1>
        <p className="mt-3 text-zinc-400 text-sm">The requested destination does not exist or has been relocated.</p>
        <button
          onClick={() => handleNavigate('/')}
          className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-900 transition-colors cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  };

  const isAdminPage = path.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-zinc-200 selection:text-black antialiased">
      {!isAdminPage && (
        <Navbar currentPath={path} currentRoute={path} onNavigate={handleNavigate} />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {!isAdminPage && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
