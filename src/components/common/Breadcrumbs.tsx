import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-xs font-mono text-zinc-500">
        <li className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
          <button
            onClick={() => {
              if (items[0]?.onClick) items[0].onClick();
              else window.location.hash = '#/';
            }}
            className="flex items-center gap-1 hover:text-zinc-200 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-zinc-500" />
            <span>HOME</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
              {isLast ? (
                <span className="text-zinc-200 font-semibold truncate max-w-[240px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-zinc-200 transition-colors cursor-pointer truncate max-w-[180px]"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
