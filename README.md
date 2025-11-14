# AI-Raise（爱提升）

<div align="center">

**基于 Nuxt 4 的现代化全栈 Web 应用**

一个学习工程化、CI/CD、自动化部署的实践项目

[![Nuxt](https://img.shields.io/badge/Nuxt-4.1.2-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5.21-4FC08D?logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**[🌐 在线访问](https://ai-raise.vercel.app/)**

</div>

---

## 📖 项目介绍

AI-Raise 是一个个人网站项目，致力于提供优质的开发工具收录、学习笔记和资源推荐。项目采用现代化的技术栈，注重工程化实践和用户体验。

**主要特性：**
- 🚀 基于 Nuxt 4 的 SSR/SSG 渲染
- 🎨 UnoCSS 原子化 CSS 方案
- 📦 Turborepo Monorepo 架构
- 🔍 完善的 SEO 优化
- 🛠️ 工具网站收录与推荐
- 📝 拼音转换工具
- 🌐 响应式设计，移动端友好

## 🛠️ 技术栈

### 核心框架
- **前端框架**: [Nuxt 4.1.2](https://nuxt.com) + [Vue 3.5.21](https://vuejs.org)
- **服务端**: [Nitro 2.12.6](https://nitro.unjs.io)
- **构建工具**: [Vite 7.1.6](https://vitejs.dev)
- **包管理**: [pnpm 10.10.0](https://pnpm.io)

### 样式与 UI
- **CSS 引擎**: [UnoCSS 66.5.1](https://unocss.dev)
- **图标**: [@iconify-json/carbon](https://iconify.design)
- **Sass**: sass-embedded 1.92.1

### 工具库
- **组合式函数**: [@vueuse/nuxt 13.9.0](https://vueuse.org)
- **日期处理**: [dayjs 1.11.19](https://day.js.org)
- **拼音转换**: [pinyin-pro 3.27.0](https://pinyin-pro.cn)
- **PDF 生成**: jspdf 3.0.3
- **截图工具**: html2canvas 1.4.1

### SEO & 优化
- **站点地图**: [@nuxtjs/sitemap 7.4.7](https://nuxtseo.com/sitemap)
- **图片优化**: [@nuxt/image 1.11.0](https://image.nuxt.com)

### 工程化
- **Monorepo**: [Turborepo 2.5.6](https://turbo.build)
- **代码规范**: ESLint + Commitlint
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.1.6
- **提交规范**: czg 1.12.0

## 📦 Monorepo 结构

```
ai-raise/
├── frontend/                    # 前端应用
│   ├── app/
│   │   ├── pages/              # 页面路由
│   │   │   ├── index.vue       # 工具网站收录页
│   │   │   └── pinyin/         # 拼音转换工具
│   │   ├── components/         # Vue 组件
│   │   │   ├── Navs/           # 导航栏组件
│   │   │   └── Pinyin/         # 拼音相关组件
│   │   ├── composables/        # 组合式函数
│   │   │   ├── usePinyinData.ts
│   │   │   ├── useTime.ts
│   │   │   └── useSiteUrl.ts
│   │   ├── layouts/            # 布局组件
│   │   │   └── default.vue
│   │   ├── assets/             # 静态资源
│   │   │   └── styles/         # 样式文件
│   │   └── types/              # TypeScript 类型定义
│   ├── server/                 # Nitro 服务端
│   │   └── api/                # API 接口
│   │       ├── global/         # 全局 API
│   │       └── tools/          # 工具相关 API
│   │           └── websites.ts # 网站收录数据
│   ├── public/                 # 公共静态文件
│   │   ├── favicon.png
│   │   └── robots.txt
│   ├── nuxt.config.ts          # Nuxt 配置
│   ├── uno.config.ts           # UnoCSS 配置
│   └── package.json
├── internal/                    # 内部共享包
│   ├── eslint-config/          # ESLint 共享配置
│   └── typescript-config/      # TypeScript 共享配置
├── turbo.json                  # Turborepo 配置
├── pnpm-workspace.yaml         # pnpm 工作区配置
├── commitlint.config.mjs       # Commitlint 配置
└── package.json                # 根 package.json
```

## ✨ 功能模块

### 1. 工具网站收录 (`/`)
- 📚 收录 20+ 优质开发工具和学习资源
- 🏷️ 分类管理：AI、Vue、UI、Learn、Canvas、3D、Design
- 🔍 实时模糊搜索（名称、描述、标签）
- 🎨 网格/列表视图切换
- 🖼️ 自动获取网站 favicon + emoji 后备图标
- 🌐 SEO 优化（meta 标签、结构化数据）

**收录网站包括：**
- **AI**: Claude Cookbooks, Claude Academy, Google Stitch
- **Vue**: Vue.js, Nuxt, VxeTable, Vue Bits
- **UI**: UnoCSS, Tailwind CSS v4, Kigen Design Color
- **Learn**: JavaScript.info, Patterns.dev, web.dev, SVG Tutorial, Git 教程
- **Canvas/3D**: Three.js, Fabric.js, Konva.js
- **Design**: Figma Community

### 2. 拼音转换工具 (`/pinyin`)
- 🔤 中文汉字转拼音
- 🎛️ 多种样式选项（声调、大小写、空格分隔）
- 📋 示例文本快速填充
- 💾 结果导出功能

## 🚀 快速开始

### 环境要求
- Node.js >= 20.19.5
- pnpm >= 10.10.0

### 安装依赖

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm@10.10.0

# 安装项目依赖
pnpm install
```

### 开发模式

```bash
# 启动所有应用（Turborepo 并行执行）
pnpm dev

# 仅启动前端
cd frontend && pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
# 构建所有应用
pnpm build

# 仅构建前端
cd frontend && pnpm build
```

### 预览生产构建

```bash
cd frontend && pnpm preview
```

## 🌿 分支管理策略

```
1. develop   - 开发分支，显示最新开发状态
2. main      - 主干分支，保持和生产环境一致（禁止直接 push）
3. feature-xxx - 功能开发分支，完成后 merge 到 develop
4. bugfix-xxx  - Bug 修复分支，完成后 merge 到 develop
```

### 工作流程
1. 从 `develop` 创建 `feature-xxx` 或 `bugfix-xxx` 分支
2. 开发完成后，提交代码并创建 Pull Request
3. Code Review 通过后，merge 到 `develop`
4. 定期将 `develop` merge 到 `main` 进行发布

## 📝 代码规范

### Git 提交规范

**推荐使用交互式提交工具：**
```bash
pnpm commit
```

**手动提交（需遵循 Conventional Commits）：**
```bash
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复某个 bug"
git commit -m "docs: 更新文档"
git commit -m "style: 代码格式调整"
git commit -m "refactor: 重构代码"
git commit -m "perf: 性能优化"
git commit -m "test: 添加测试"
git commit -m "chore: 构建/工具链相关"
```

**绕过代码检查（不推荐）：**
```bash
git commit --no-verify -m "你的消息"
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 自动修复代码问题
cd frontend && pnpm lint:fix
```

## 🌐 部署

### Vercel 部署

1. **设置环境变量**
   ```
   NUXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

2. **配置 Vercel**
   - Framework Preset: Nuxt.js
   - Build Command: `cd frontend && pnpm build`
   - Output Directory: `frontend/.output/public`
   - Install Command: `pnpm install`

3. **自动部署**
   - 推送到 `main` 分支触发生产环境部署
   - 推送到 `develop` 分支触发预览环境部署

### 手动部署

```bash
cd frontend
pnpm build
pnpm preview  # 本地预览
```

## 🔧 配置说明

### 环境变量

创建 `frontend/.env` 文件：

```env
# 基础 API URL
NUXT_PUBLIC_BASE_URL=http://localhost:1337

# 网站 URL（用于 SEO）
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Nuxt 配置

主要配置项在 `frontend/nuxt.config.ts`：
- **模块**: UnoCSS, VueUse, Nuxt Image, Sitemap
- **SEO**: 自动生成 sitemap.xml 和 robots.txt
- **性能**: 资源压缩、预渲染、图片优化
- **开发**: DevTools 已启用

### UnoCSS 配置

`frontend/uno.config.ts` 配置了自定义快捷方式和主题。

## 📊 项目统计

- **总代码行数**: ~3000+ 行
- **组件数量**: 10+ 个
- **API 接口**: 2+ 个
- **页面路由**: 2 个
- **收录网站**: 20+ 个

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`pnpm commit`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 License

本项目采用 [MIT License](LICENSE) 开源协议。

## 👤 作者

**dremtri**

- GitHub: [@dremtri](https://github.com/dremtri)

## 🙏 致谢

感谢以下开源项目：
- [Nuxt](https://nuxt.com)
- [Vue.js](https://vuejs.org)
- [UnoCSS](https://unocss.dev)
- [VueUse](https://vueuse.org)
- [Turborepo](https://turbo.build)

---

<div align="center">

**[开始使用](https://github.com/dremtri/ai-raise)** | **[报告问题](https://github.com/dremtri/ai-raise/issues)** | **[功能建议](https://github.com/dremtri/ai-raise/issues)**

Made with ❤️ by dremtri

</div>