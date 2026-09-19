import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badge?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  badge,
  id,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      id={id}
      className={`mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3.5 ${isCenter ? 'justify-center' : ''}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-zinc-900 text-zinc-300 border border-zinc-800">
            {eyebrow}
          </span>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
              {badge}
            </span>
          )}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-zinc-100 tracking-tight leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
