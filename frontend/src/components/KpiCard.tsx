import type { FC } from 'react';

type KpiCardProps = {
  label: string;
  value: string;
  delta: string;
  helper: string;
};

const KpiCard: FC<KpiCardProps> = ({ label, value, delta, helper }) => {
  const isPositive = delta.startsWith('+');

  return (
    <div className="glass-card p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200'
          }`}
        >
          {delta}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
    </div>
  );
};

export default KpiCard;
