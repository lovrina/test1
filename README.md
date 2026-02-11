# 销售数据看板

## 代码简介
- 前端基于 React + Vite，使用 Tailwind 构建样式体系与暗黑/明亮主题切换。
- 图表使用 ECharts，包含收入趋势、渠道占比、区域动能与管道健康度等模块。
- 关键入口：`frontend/src/App.tsx`，主题逻辑：`frontend/src/hooks/useTheme.ts`，数据：`frontend/src/data/dashboard.ts`。

## 启动方式

### 方式一：Docker 一键启动（推荐）
```bash
docker compose up 
```
访问：`http://localhost:3000`

### 方式二：本地开发启动
```bash
cd frontend
npm install
npm run dev
```
访问：`http://localhost:3000`
