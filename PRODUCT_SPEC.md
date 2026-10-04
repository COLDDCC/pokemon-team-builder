Pokémon Team Builder

产品方案书 / Codex 开发规格 v1.0

目标：用“选 Pokémon → 即时评分 → 找问题 → 一键优化”的体验，切入 pokemon team builder 搜索需求。

1. 项目结论

值得做 MVP。现有 SERP 中存在多个独立工具站与 GitHub Pages 页面，说明该查询并非只能由超大型品牌域名占据。产品不应复制传统的属性弱点表，而应复制 genshinteambuilder.com 的核心产品骨架：低门槛选择、即时可视化评分、明确问题诊断、推荐补位/替换，并让 SEO 页面直接进入工具。

2. MVP 的一句话定义

Build your Pokémon team. Get an instant score. See what is wrong. Fix it in one click.

中文理解：用户不需要先懂竞技术语；先选自己喜欢的 Pokémon，网站告诉他这支队伍哪里强、哪里弱，以及下一只应该放谁。

3. 第一版范围：必须做 / 暂时不做

MVP 必须做

V1 暂时不做

6 个 Pokémon 队伍槽位；搜索、添加、删除、替换

完整战斗模拟器

Game / Format 选择；先支持一个主格式，再扩展

所有世代/所有规则一次性支持

Team Score 0–100

复杂机器学习推荐

Offense / Defense / Coverage / Synergy 子评分

账号、云同步、社交系统

弱点、抗性、重复弱点、进攻覆盖分析

完整 EV/IV breeding 工具链

推荐 Pokémon：补位或替换后显示预计分数变化

完整 Showdown 克隆

分享 URL：队伍状态编码进 URL

原生 App

响应式桌面/手机 UI + 基础 SEO

大量 AI 生成文章

4. 核心用户流程

进入首页 → 选择 Game / Format。

点击空槽 → 搜索 Pokémon → 添加；最多 6 只。

每次变化即时重新计算 Team Score 与四项子评分。

分析卡片用自然语言显示 3–6 个最重要的问题/优点。

Recommended Pokémon 显示候选 Pokémon、推荐原因和预计 +Score。

点击推荐项即可填入空槽；满队时选择替换对象，并立即比较新旧评分。

用户可复制分享链接；链接打开后自动恢复相同队伍与格式。

5. 首页信息架构

Hero：H1“Pokémon Team Builder”；副标题突出 weakness / coverage / synergy；首屏直接出现 6 个队伍槽位，不做巨大的营销 Banner。

A. Format selector：当前规则集。

B. Team slots：6 张 Pokémon 卡；空卡是最明显 CTA。

C. Team Score：大数字 + 简短评级（Poor / Fair / Good / Excellent）。

D. Four Scores：Offense / Defense / Coverage / Synergy。

E. Key Insights：优先展示最影响队伍的弱点，不把 18 属性大表放在首要位置。

F. Recommended Pokémon：3–6 个候选；说明“为什么”和预计分数变化。

G. Detailed Analysis：下方再提供完整 type matrix / coverage 表，服务高级用户。

H. SEO content：页面底部短说明、FAQ、相关工具入口；不要挤占工具首屏。

6. 评分系统 v1（可解释、确定性）

V1 不使用 LLM 直接打分。评分必须是 deterministic：同一队伍、同一规则永远得到同一结果。这样容易测试、容易让 Codex 实现，也避免“AI 随口给 82 分”。

维度

建议权重

核心信号

Offense

25%

STAB/可用攻击属性覆盖、明显盲区、重复进攻类型

Defense

30%

全队共同弱点、抗性/免疫覆盖、4×弱点惩罚

Coverage

25%

面对目标类型集合时可有效命中的比例；避免单纯“类型越多越高”

Synergy

20%

队友能否覆盖彼此弱点、角色/速度/功能的基础互补

总分 = 0.25×Offense + 0.30×Defense + 0.25×Coverage + 0.20×Synergy。具体系数放在独立 config 文件中，禁止散落在 UI 组件里，方便后续根据真实用户反馈调权重。

7. 推荐算法 v1

候选 Pokémon = 当前 Format 可用 Pokémon − 当前队伍。对每个候选临时加入空槽（或替换指定成员），重新运行评分函数。按 newScore − currentScore 排序，并生成可解释 reason tags，例如 Covers Ground weakness、Adds Fairy resistance、Improves offensive coverage。

性能要求：评分函数应为纯函数并可缓存；不要为了推荐逐个请求外部 API。Pokémon 数据在 build time 或本地数据层准备好。

8. 数据与技术建议

前端：优先沿用你现有站最熟悉的技术栈；若新建，推荐 Astro/React + TypeScript + Tailwind，静态 SEO 页面与交互组件并存。

数据：使用合法可用的 Pokémon 数据源/公开 API 做基础属性数据，并在仓库中记录来源与许可；不要抓取竞争站内容。

图片：不要把第三方官方美术直接打包进仓库后假设拥有版权。开发阶段可使用数据源允许的 sprites/占位图，并明确 Attribution/Terms。

核心逻辑目录独立：src/lib/scoring、src/lib/recommendations、src/data/formats；UI 不直接承担规则计算。

部署：GitHub → Cloudflare Pages/Vercel 均可；域名接入后开启 HTTPS、canonical、sitemap、robots、GA4、GSC。

9. SEO 架构

第一阶段只创建真正有独立搜索意图、且页面内容能由工具数据支撑的页面。不要一开始生成几万张薄页。

/ — Pokémon Team Builder

/team-maker — Pokémon Team Maker（可后做；避免与首页内容完全重复）

/weakness-calculator — Pokémon Team Weakness Calculator

/type-coverage — Pokémon Type Coverage Calculator

/games/{game} — 各游戏/规则 Team Builder

/pokemon/{slug} — Pokémon 基础分析页

/pokemon/{slug}/best-teammates — 预填该 Pokémon 的 Builder + 数据驱动推荐

关键原则：SEO 页面不是文章农场。比如 /pokemon/garchomp/best-teammates 打开后，Builder 已预填 Garchomp，用户可直接继续组队。

10. UI / 视觉要求

整体感觉：现代游戏工具，而不是 Wiki，也不要廉价“AI SaaS”风。

首屏以工具为中心；少文字、强交互。

Pokémon 卡片统一比例；移动端 2×3，桌面端 6 槽横排或 3×2。

分数变化使用动画但不影响 Core Web Vitals；避免重粒子背景。

颜色不能只承担信息表达；弱点/优势同时配 icon + 文本。

详细矩阵折叠在下方，普通用户先看到结论。

11. Codex 开发任务拆分

Phase 0 — Scaffold: 初始化项目、lint/typecheck/test/build、目录结构、环境变量模板。

Phase 1 — Data: Pokémon 类型、基础数据、Format schema、数据加载与验证。

Phase 2 — Builder UI: 6 槽、搜索弹窗、过滤、添加/删除/替换、URL 状态。

Phase 3 — Analyzer: type effectiveness engine、四项评分、insights、单元测试。

Phase 4 — Recommendations: 候选评分、delta score、reason tags、性能优化。

Phase 5 — SEO: metadata、canonical、OG、sitemap、robots、JSON-LD、游戏/宝可梦模板页。

Phase 6 — QA: 移动端、键盘可用性、404、空状态、非法 URL、Lighthouse、构建测试。

12. 交给 Codex 的工作规则

先阅读 README、PRODUCT_SPEC.md、现有代码，再写代码；不要凭空换技术栈。

每个 Phase 单独提交 commit；不要一次性重写整个仓库。

任何 scoring 改动必须同时新增/更新测试。

不要把评分常量硬编码在多个组件；集中 config。

不要使用 LLM API 作为 MVP 的评分依赖。

不要抓竞争对手页面或复制其文案/代码。

每完成一个 Phase：运行 lint、typecheck、test、build，并修复全部失败。

发现规格冲突时停止扩大范围，在 TODO/issue 中记录，而不是自行发明大型功能。

13. MVP 验收标准

☐ 用户能在 30 秒内选出 6 只 Pokémon，并立即理解 Team Score。

☐ 添加/删除/替换 Pokémon 后，所有评分与 insights 无刷新更新。

☐ 推荐 Pokémon 确实能通过同一评分函数计算 delta，而不是写死。

☐ 分享 URL 可在新浏览器恢复队伍。

☐ 核心评分逻辑有单元测试，至少覆盖：单属性、双属性、免疫、4×弱点、重复弱点、空队、满队。

☐ 桌面和手机无横向溢出；主要交互可键盘操作。

☐ 生产 build 成功；无 console error；404/非法参数有安全 fallback。

☐ 首页 title/H1/canonical/sitemap/robots 正确，页面可被搜索引擎正常抓取。

14. 你现在要做的事情

你负责：① 购买域名；② 新建 GitHub 仓库；③ 把仓库链接发给我。仓库可以先保持空白。拿到仓库后，我们把这份方案进一步转换成仓库内的 PRODUCT_SPEC.md + AGENTS.md + 分阶段 Codex Prompt。

推荐流程：不要把整份方案一次扔给 Codex 说“做完”。先让 Codex完成 Phase 0–2，跑通基础 Builder；我们验收后再做评分与推荐。这样出现方向错误时，返工成本最低。

15. 第一条 Codex Prompt（仓库创建后使用）

Read PRODUCT_SPEC.md and AGENTS.md completely before making changes.

Goal for this task: implement Phase 0 only.
1. Inspect the repository and preserve the existing stack if one exists.
2. Create the minimum production-ready project scaffold.
3. Add lint, typecheck, test, and build commands.
4. Create the directory boundaries described in PRODUCT_SPEC.md, but do not implement the scoring engine or recommendation engine yet.
5. Add a concise README with local development instructions.
6. Run all checks and fix failures.
7. Commit only Phase 0 changes.

Do not expand scope. Do not implement battle simulation, authentication, AI features, or programmatic SEO pages in this task.
At the end, report: files changed, commands run, test/build results, and any decisions that need product approval.

16. 后续版本

MVP 有真实曝光/用户后再考虑：movesets、held items、Nature/EV/IV、Showdown import/export、Pokémon Champions 专用规则、VGC/Singles meta、用户保存队伍、更多程序化 SEO。优先级由 GSC 查询与实际工具行为决定，而不是一次性堆功能。