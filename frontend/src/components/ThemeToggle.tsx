import type { FC } from 'react';

type ThemeToggleProps = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-200"
      aria-label="切换主题"
    >
      <span className="text-base">{theme === 'dark' ? '夜' : '日'}</span>
      <span className="text-xs uppercase tracking-[0.2em]">
        {theme === 'dark' ? '暗色' : '亮色'}
      </span>
    </button>
  );
};

export default ThemeToggle;
