import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import ThemeToggle from './components/ThemeToggle';
import KpiCard from './components/KpiCard';
import {
  channelShare,
  kpis,
  pipelineStages,
  regionSales,
  salesTrend,
  teamMomentum,
  topDeals
} from './data/dashboard';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const labelColor = isDark ? '#e2e8f0' : '#0f172a';
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.35)';
  const lineAccent = isDark ? '#38bdf8' : '#0ea5e9';
  const barAccent = isDark ? '#c084fc' : '#8b5cf6';
  const piePalette = ['#f472b6', '#60a5fa', '#facc15', '#34d399'];

  const lineOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: { left: 12, right: 20, top: 20, bottom: 10, containLabel: true },
      xAxis: {
        type: 'category',
        data: salesTrend.map((item) => item.month),
        axisLine: { lineStyle: { color: axisColor } },
        axisTick: { show: false },
        axisLabel: { color: axisColor }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: axisColor },
        splitLine: { lineStyle: { color: gridColor } }
      },
      series: [
        {
          data: salesTrend.map((item) => item.value),
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: { color: lineAccent, width: 3 },
          itemStyle: { color: lineAccent },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(14, 165, 233, 0.35)' },
              { offset: 1, color: 'rgba(14, 165, 233, 0.02)' }
            ])
          }
        }
      ]
    }),
    [axisColor, gridColor, isDark, lineAccent]
  );

  const regionOption = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      grid: { left: 20, right: 20, top: 20, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: regionSales.map((item) => item.region),
        axisLabel: { color: axisColor, rotate: 25 },
        axisLine: { lineStyle: { color: axisColor } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: axisColor },
        splitLine: { lineStyle: { color: gridColor } }
      },
      series: [
        {
          data: regionSales.map((item) => item.value),
          type: 'bar',
          barWidth: '50%',
          itemStyle: {
            borderRadius: [12, 12, 4, 4],
            color: barAccent
          }
        }
      ]
    }),
    [axisColor, barAccent, gridColor]
  );

  const pieOption = useMemo(
    () => ({
      tooltip: { trigger: 'item' },
      legend: {
        bottom: 0,
        textStyle: { color: axisColor },
        itemGap: 16
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          data: channelShare,
          itemStyle: {
            borderColor: isDark ? '#0b1220' : '#ffffff',
            borderWidth: 2
          },
          label: { color: labelColor }
        }
      ],
      color: piePalette
    }),
    [axisColor, isDark, labelColor]
  );

  const pipelineOption = useMemo(
    () => ({
      grid: { left: 20, right: 20, top: 10, bottom: 10, containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { color: axisColor },
        splitLine: { lineStyle: { color: gridColor } }
      },
      yAxis: {
        type: 'category',
        data: pipelineStages.map((item) => item.stage),
        axisLabel: { color: axisColor }
      },
      series: [
        {
          type: 'bar',
          data: pipelineStages.map((item) => item.value),
          barWidth: 14,
          itemStyle: {
            borderRadius: 10,
            color: isDark ? '#f472b6' : '#ec4899'
          }
        }
      ]
    }),
    [axisColor, gridColor, isDark]
  );

  const dateLabel = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-midnight">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-aurora/60 via-sky-400/20 to-sunrise/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-sky-400/30 via-violet-400/30 to-sunrise/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="pill">FY26 Q1 · 实时快照</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              NovaPulse 销售指挥中心
            </h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              在一个自适应仪表盘内追踪收入节奏、管道健康度与区域增长。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="glass-card flex items-center gap-3 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">今日</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{dateLabel}</p>
              </div>
              <div className="h-9 w-px bg-slate-200/70 dark:bg-slate-700/70" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">区域</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">全球</p>
              </div>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.label} {...item} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  收入趋势
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  月度经常性收入增长
                </h2>
              </div>
              <span className="pill">季度 +12%</span>
            </div>
            <div className="mt-6 h-[280px]">
              <ReactECharts option={lineOption} style={{ height: '100%' }} />
            </div>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              渠道结构
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">收入分布</h2>
            <div className="mt-6 h-[280px]">
              <ReactECharts option={pieOption} style={{ height: '100%' }} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="glass-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              区域动能
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">各区域 ARR</h2>
            <div className="mt-6 h-[260px]">
              <ReactECharts option={regionOption} style={{ height: '100%' }} />
            </div>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              管道健康度
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
              各阶段转化量
            </h2>
            <div className="mt-6 h-[220px]">
              <ReactECharts option={pipelineOption} style={{ height: '100%' }} />
            </div>
            <div className="mt-6 space-y-3">
              {teamMomentum.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">{member.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">完成 {member.quota}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                      style={{ width: `${member.quota}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                重点交易
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                高价值商机
              </h2>
            </div>
            <span className="pill">4 个谈判中</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/70">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">客户</th>
                  <th className="px-4 py-3">负责人</th>
                  <th className="px-4 py-3">金额</th>
                  <th className="px-4 py-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                {topDeals.map((deal) => (
                  <tr key={deal.company} className="bg-white/40 dark:bg-slate-900/40">
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                      {deal.company}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{deal.owner}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white">
                      {deal.value}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{deal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
