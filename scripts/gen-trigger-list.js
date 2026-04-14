const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/skills_data.json', 'utf8'));

// Category definitions with priority-ordered keywords
// Skills are matched top-down; first match wins. More specific keywords first.
// Order matters: more specific categories before more general ones.
const categories = [
  {
    name: 'Healthcare & Compliance',
    nameCn: '医疗与合规',
    cnMap: { 'healthcare': '医疗', 'hipaa': 'HIPAA', 'phi-compliance': 'PHI 合规', 'cdss': '临床决策', 'emr': '电子病历', 'ehr': '电子健康', 'clinical': '临床', 'patient-safety': '患者安全', 'gdpr': 'GDPR' }
  },
  {
    name: 'Industry & Operations',
    nameCn: '行业与运营',
    cnMap: { 'carrier-relationship': '承运商管理', 'customs-trade': '海关合规', 'energy-procurement': '能源采购', 'inventory-demand': '库存规划', 'logistics-exception': '物流异常', 'production-scheduling': '生产排程', 'quality-nonconformance': '质量不合格', 'returns-reverse': '逆向物流', 'supply-chain': '供应链', 'procurement': '采购', 'manufacturing': '制造' }
  },
  {
    name: 'Blockchain & Web3',
    nameCn: '区块链与 Web3',
    cnMap: { 'blockchain': '区块链', 'nft-': 'NFT', 'web3-': 'Web3', 'solidity-': 'Solidity', 'defi-': 'DeFi', 'evm-': 'EVM', 'amm-': 'AMM', 'smart-contract': '智能合约' }
  },
  {
    name: 'Game Development',
    nameCn: '游戏开发',
    cnMap: { 'game-': '游戏', 'unity-': 'Unity', 'unreal-': 'Unreal Engine', 'godot': 'Godot', 'minecraft': 'Minecraft' }
  },
  {
    name: 'Mobile Development',
    nameCn: '移动开发',
    cnMap: { 'flutter': 'Flutter', 'react-native': 'React Native', 'swiftui': 'SwiftUI', 'ios-developer': 'iOS 开发', 'mobile-': '移动', 'expo': 'Expo', 'compose-multiplatform': 'KMP', 'on-device': '端侧推理', 'swift-actor': 'Swift Actor', 'swift-concurrency': 'Swift 并发', 'kmp': 'KMP' }
  },
  {
    name: 'SaaS Automation',
    nameCn: 'SaaS 自动化',
    cnMap: { 'slack': 'Slack', 'jira-': 'Jira', 'zendesk': 'Zendesk', 'salesforce': 'Salesforce', 'hubspot': 'HubSpot', 'notion-': 'Notion', 'trello': 'Trello', 'asana': 'Asana', 'zapier': 'Zapier', 'airtable': 'Airtable', 'figma-': 'Figma', 'mailchimp': 'Mailchimp', 'twilio': 'Twilio', 'stripe-': 'Stripe', 'shopify': 'Shopify', 'webflow': 'Webflow', 'vercel-': 'Vercel', 'google-calendar': 'Google 日历', 'google-drive': 'Google Drive', 'google-analytic': 'Google 分析', 'gmail': 'Gmail', 'outlook-': 'Outlook', 'teams-automation': 'Teams', 'zoom-automation': 'Zoom', 'linear-': 'Linear', 'todoist': 'Todoist', 'pipedrive': 'Pipedrive', 'intercom': 'Intercom', 'freshdesk': 'Freshdesk', 'freshservice': 'Freshservice', 'segment-': 'Segment', 'amplitude': 'Amplitude', 'mixpanel': 'Mixpanel', 'posthog': 'PostHog', 'sendgrid': 'SendGrid', 'n8n': 'n8n', 'brevo': 'Brevo', 'klaviyo': 'Klaviyo', 'monday-': 'Monday', 'basecamp': 'Basecamp', 'bamboohr': 'BambooHR', 'wrike': 'Wrike', 'miro-': 'Miro', 'activecampaign': 'ActiveCampaign', 'bitbucket-': 'Bitbucket', 'instagram': 'Instagram', 'tiktok': 'TikTok', 'twitter-': 'Twitter', 'linkedin-': 'LinkedIn', 'reddit-': 'Reddit', 'youtube-automation': 'YouTube', 'whatsapp': 'WhatsApp', 'telegram-': 'Telegram', 'square-automation': 'Square', 'one-drive': 'OneDrive', 'googlesheets': 'Google 表格', 'plaid': 'Plaid', 'helpdesk': '帮助台', 'mail-automation': '邮件自动化', 'slack-bot': 'Slack 机器人', 'telegram-bot': 'Telegram 机器人', 'cal-com': 'Cal.com', 'calendly': 'Calendly', 'clickup': 'ClickUp', 'close-automation': 'Close CRM', 'coda-automation': 'Coda', 'confluence': 'Confluence', 'convertkit': 'ConvertKit', 'docusign': 'DocuSign', 'dropbox': 'Dropbox', 'make-automation': 'Make', 'zoho': 'Zoho', 'discord': 'Discord', 'x-api': 'X API', 'canva': 'Canva', 'datadog': 'Datadog', 'circleci-automation': 'CircleCI', 'box-automation': 'Box', 'gitlab-automation': 'GitLab', 'render-automation': 'Render', 'rube-mcp': 'Rube MCP', 'composio': 'Composio' }
  },
  {
    name: 'Security & Pentesting',
    nameCn: '安全与渗透测试',
    cnMap: { 'security': '安全', 'owasp': 'OWASP', 'xss': 'XSS', 'injection': '注入攻击', 'pentest': '渗透测试', 'vulnerability': '漏洞', 'exploit': '漏洞利用', 'red-team': '红队', 'attack': '攻击', 'threat-model': '威胁建模', 'threat-mitigation': '威胁缓解', 'malware': '恶意软件', 'forensic': '取证', 'reverse-engineer': '逆向工程', 'binary-analysis': '二进制分析', 'shodan': 'Shodan', 'metasploit': 'Metasploit', 'sqlmap': 'SQLMap', 'privilege-escalat': '提权', 'active-directory-attack': 'AD 攻击', 'recon': '侦察', 'scanning-tool': '扫描工具', 'smtp-penetration': 'SMTP 渗透', 'ssh-penetration': 'SSH 渗透', 'wordpress-penetration': 'WordPress 渗透', 'anti-revers': '反逆向', 'memory-forensic': '内存取证', 'firmware': '固件分析', 'memory-safety': '内存安全', 'sql-injection': 'SQL 注入', 'broken-auth': '认证破解', 'file-path-traversal': '路径穿越', 'idor': 'IDOR', 'wireshark': 'Wireshark', 'nmap': 'Nmap', 'burp': 'Burp Suite', 'mtls': 'mTLS', 'secrets-management': '密钥管理', 'ffuf': 'ffuf', 'safety-guard': '安全防护', 'sharp-edges': '风险识别', 'compliance': '合规' }
  },
  {
    name: 'Data Engineering & Analytics',
    nameCn: '数据工程与分析',
    cnMap: { 'data-engineer': '数据工程', 'data-scientist': '数据科学', 'data-pipeline': '数据管道', 'data-warehouse': '数据仓库', 'spark-': 'Spark', 'dbt-': 'dbt', 'etl': 'ETL', 'data-quality': '数据质量', 'clickhouse': 'ClickHouse', 'airflow': 'Airflow', 'backtesting': '回测', 'data-storytelling': '数据叙事', 'data-analysis': '数据分析', 'analytics': '分析' }
  },
  {
    name: 'AI & Machine Learning',
    nameCn: 'AI 与机器学习',
    cnMap: { 'ai-engineer': 'AI 工程', 'ai-product': 'AI 产品', 'ai-wrapper': 'AI 封装', 'ml-': '机器学习', 'llm': 'LLM', 'langchain': 'LangChain', 'langgraph': 'LangGraph', 'rag-': 'RAG', 'vector': '向量', 'embedding': '嵌入', 'prompt-': '提示工程', 'autonomous-agent': '自主代理', 'hugging': 'Hugging Face', 'multi-agent': '多代理', 'agent-memory': '代理记忆', 'agent-orchestrat': '代理编排', 'voice-ai': '语音 AI', 'imagen': 'Imagen', 'fal-': 'FAL', 'mlops': 'MLOps', 'agent-evaluation': '代理评估', 'agent-manager': '代理管理', 'agent-tool-builder': '代理工具', 'ai-agent': 'AI 代理', 'agent-eval': '代理评估', 'agent-harness': '代理构建', 'agent-payment': '代理支付', 'agent-introspect': '代理自省', 'agentic': '智能体', 'ai-first': 'AI 优先', 'continuous-agent': '持续代理', 'gan-style': 'GAN 风格', 'devfleet': 'DevFleet', 'claude-api': 'Claude API', 'computer-vision': '计算机视觉', 'cortex-': 'Cortex', 'neural': '神经网络', 'openai-': 'OpenAI', 'anthropic': 'Anthropic', 'copilot': 'Copilot', 'gpt-': 'GPT', 'fine-tun': '微调', 'inference': '推理', 'model-serve': '模型服务', 'token-budget': 'Token 预算' }
  },
  {
    name: 'Frontend & UI',
    nameCn: '前端与 UI',
    cnMap: { 'react': 'React', 'angular': 'Angular', 'vue': 'Vue', 'nextjs': 'Next.js', 'next.js': 'Next.js', 'tailwind': 'Tailwind CSS', 'frontend': '前端', 'ui-ux': 'UI/UX 设计', 'ui-skill': 'UI 技能', 'radix': 'Radix UI', 'svelte': 'Svelte', 'remotion': 'Remotion', 'avalonia': 'Avalonia', 'stitch-ui': 'Stitch UI', 'superdesign': '超级设计', 'canvas-design': '画布设计', 'frontend-slide': '前端幻灯片', 'web-artifacts': 'Web 构件', '3d-web': '3D Web', 'threejs': 'Three.js', 'web-design': 'Web 设计', 'visual-validator': '视觉验证', 'design-system': '设计系统', 'frontend-design': '前端设计', 'frontend-developer': '前端开发', 'frontend-mobile': '前端移动', 'frontend-pattern': '前端模式', 'frontend-security': '前端安全', 'nuxt': 'Nuxt', 'i18n': '国际化', 'localization': '本地化', 'core-components': '核心组件', 'interactive-portfolio': '交互作品集', 'css-': 'CSS', 'html-': 'HTML', 'animation': '动画' }
  },
  {
    name: 'Backend & API',
    nameCn: '后端与 API',
    cnMap: { 'backend': '后端', 'api-design': 'API 设计', 'api-pattern': 'API 模式', 'api-security': 'API 安全', 'api-document': 'API 文档', 'api-fuzzing': 'API 模糊测试', 'api-testing': 'API 测试', 'nodejs': 'Node.js', 'fastapi': 'FastAPI', 'nestjs': 'NestJS', 'graphql': 'GraphQL', 'serverless': '无服务器', 'saga': 'Saga 模式', 'microservice': '微服务', 'auth-implementation': '认证实现', 'payment-integration': '支付集成', 'paypal': 'PayPal', 'file-upload': '文件上传', 'grpc': 'gRPC', 'rest-api': 'REST API', 'webhook': 'Webhook', 'queue': '队列', 'cache': '缓存', 'redis': 'Redis', 'kafka': 'Kafka', 'rabbitmq': 'RabbitMQ' }
  },
  {
    name: 'Database',
    nameCn: '数据库',
    cnMap: { 'database': '数据库', 'postgres': 'PostgreSQL', 'prisma': 'Prisma', 'nosql': 'NoSQL', 'migration': '数据迁移', 'sqlite': 'SQLite', 'mongodb': 'MongoDB', 'supabase': 'Supabase', 'neon-postgres': 'Neon Postgres', 'sql-optimization': 'SQL 优化', 'sql-pro': 'SQL 专家', 'dynamodb': 'DynamoDB', 'couchbase': 'Couchbase', 'cockroach': 'CockroachDB', 'planetscale': 'PlanetScale', 'firestore': 'Firestore' }
  },
  {
    name: 'DevOps & Infrastructure',
    nameCn: '运维与基础设施',
    cnMap: { 'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'K8s', 'terraform': 'Terraform', 'aws-': 'AWS', 'azure-': 'Azure', 'gcp-': 'GCP', 'cloud': '云架构', 'helm': 'Helm', 'istio': 'Istio', 'linkerd': 'Linkerd', 'deploy': '部署', 'github-actions': 'GitHub Actions', 'gitlab-ci': 'GitLab CI', 'gitops': 'GitOps', 'service-mesh': '服务网格', 'observability': '可观测性', 'monitor': '监控', 'grafana': 'Grafana', 'prometheus': 'Prometheus', 'slo-': 'SLO', 'incident': '事件响应', 'on-call': '值班', 'pagerduty': 'PagerDuty', 'sentry-': 'Sentry', 'ci-cd': 'CI/CD', 'server-management': '服务器管理', 'benchmark': '基准测试', 'performance-profiling': '性能分析', 'web-performance': 'Web 性能', 'cost-optimization': '成本优化', 'cache-pattern': '缓存模式', 'load-balanc': '负载均衡', 'scaling': '扩缩容', 'chaos-': '混沌工程', 'network-engineer': '网络工程', 'nginx': 'Nginx', 'haproxy': 'HAProxy', 'traefik': 'Traefik' }
  },
  {
    name: 'Testing & Quality',
    nameCn: '测试与质量',
    cnMap: { 'test': '测试', 'tdd': 'TDD', 'jest': 'Jest', 'playwright': 'Playwright', 'cypress': 'Cypress', 'qa-': 'QA', 'e2e': 'E2E 测试', 'unit-test': '单元测试', 'integration-test': '集成测试', 'coverage': '覆盖率', 'lint': '代码检查', 'validate': '验证', 'code-quality': '代码质量', 'clean-code': '整洁代码', 'refactor': '重构', 'find-bugs': '找 Bug', 'error-handling': '错误处理', 'error-detective': '错误侦探', 'smart-debug': '智能调试', 'error-diagnostic': '错误诊断', 'debugging': '调试', 'bug-': 'Bug' }
  },
  {
    name: 'Language-Specific',
    nameCn: '编程语言',
    cnMap: { 'python-pro': 'Python 专家', 'python-pattern': 'Python 模式', 'python-testing': 'Python 测试', 'python-performance': 'Python 性能', 'python-': 'Python', 'typescript-expert': 'TypeScript 专家', 'typescript-pro': 'TypeScript 专家', 'typescript-advanced': 'TypeScript 进阶', 'typescript-': 'TypeScript', 'javascript-mastery': 'JavaScript 精通', 'javascript-pro': 'JavaScript 专家', 'javascript-testing': 'JavaScript 测试', 'javascript-': 'JavaScript', 'golang-pro': 'Go 专家', 'golang-': 'Go', 'rust-pro': 'Rust 专家', 'rust-async': 'Rust 异步', 'rust-': 'Rust', 'java-pro': 'Java 专家', 'ruby-pro': 'Ruby 专家', 'php-pro': 'PHP 专家', 'scala-pro': 'Scala 专家', 'haskell-pro': 'Haskell 专家', 'julia-pro': 'Julia 专家', 'csharp-': 'C#', 'cpp-': 'C++', 'shell': 'Shell', 'bash-': 'Bash', 'powershell': 'PowerShell', 'posix': 'POSIX', 'arm-cortex': 'ARM Cortex', 'swift-pro': 'Swift 专家', 'dart-': 'Dart', 'kotlin-': 'Kotlin', 'go-concurrency': 'Go 并发', 'c-pro': 'C 语言', 'elixir-pro': 'Elixir', 'django-': 'Django', 'perl-': 'Perl', 'java-coding': 'Java 编码', 'jpa-': 'JPA', 'hibernate': 'Hibernate', 'laravel': 'Laravel', 'rails': 'Rails', 'makepad': 'Makepad', 'spring-': 'Spring' }
  },
  {
    name: 'SEO & Growth',
    nameCn: 'SEO 与增长',
    cnMap: { 'seo-': 'SEO', 'cro': '转化优化', 'analytics-tracking': '分析追踪', 'growth': '增长', 'launch-strategy': '发布策略', 'viral-generator': '病毒式传播', 'referral-program': '推荐计划', 'pricing-strategy': '定价策略', 'marketing': '营销', 'content-strategy': '内容策略', 'ab-test': 'A/B 测试', 'signup-flow': '注册流程', 'paywall': '付费墙', 'popup-cro': '弹窗优化', 'app-store-optimization': 'ASO', 'programmatic-seo': '程序化 SEO', 'schema-markup': '结构化数据', 'landing': '落地页', 'paid-ads': '付费广告', 'social-content': '社交内容', 'geo-fundamentals': 'GEO 优化', 'geo-': 'GEO' }
  },
  {
    name: 'Architecture & Design',
    nameCn: '架构与设计',
    cnMap: { 'architect': '架构', 'architecture': '架构', 'design-': '设计模式', 'decision-record': '架构决策', 'monorepo': 'Monorepo', 'turborepo': 'Turborepo', 'nx-workspace': 'NX 工作区', 'legacy-moderniz': '遗留现代化', 'framework-migration': '框架迁移', 'software-architecture': '软件架构', 'senior-architect': '高级架构师', 'full-stack-orchestration': '全栈编排', 'projection-pattern': '投影模式', 'c4-': 'C4 模型', 'event-sourc': '事件溯源', 'cqrs': 'CQRS', 'ddd': '领域驱动', 'hexagonal': '六边形', 'clean-architecture': '整洁架构', 'micro-frontend': '微前端' }
  },
  {
    name: 'Documentation & Content',
    nameCn: '文档与内容',
    cnMap: { 'doc-': '文档', 'readme': 'README', 'wiki': 'Wiki', 'pdf-': 'PDF', 'xlsx-': 'Excel', 'pptx-': 'PPT', 'tutorial': '教程', 'obsidian': 'Obsidian', 'youtube-summarizer': 'YouTube 摘要', 'beautiful-prose': '优美写作', 'reference-builder': '参考构建', 'mermaid': 'Mermaid 图表', 'x-article': '文章发布', 'postmortem-writing': '事后总结', 'docx': 'Word 文档', 'brand-voice': '品牌语调', 'brand-guidelines': '品牌规范', 'copywriting': '文案写作', 'competitive-landscape': '竞品分析', 'manim-video': 'Manim 视频', 'daily-news': '每日新闻', 'changelog': '变更日志', 'code-documentation': '代码文档', 'code-explain': '代码解读' }
  },
  {
    name: 'Git & Code Review',
    nameCn: 'Git 与代码审查',
    cnMap: { 'git-advanced': 'Git 高级', 'git-pr-workflow': 'Git PR 工作流', 'git-pushing': 'Git 推送', 'github-workflow': 'GitHub 工作流', 'review': '代码审查', 'fix-review': '修复审查', 'iterate-pr': '迭代 PR', 'address-github': '处理 GitHub 评论' }
  },
  {
    name: 'Startup & Business',
    nameCn: '创业与商业',
    cnMap: { 'startup-': '创业', 'business-': '商业分析', 'financial': '财务', 'market-': '市场', 'kpi-': 'KPI 仪表盘', 'product-manager': '产品经理', 'product-owner': '产品负责人', 'legal-': '法律', 'billing-': '账单', 'free-tool': '免费工具', 'micro-saas': '微 SaaS', 'risk-manager': '风控', 'hr-pro': '人力资源', 'sales-automator': '销售自动化', 'investor-outreach': '投资者拓展', 'employment-contract': '雇佣合同', 'personal-tool': '个人工具', 'customer-support': '客户支持' }
  },
  {
    name: 'Research & Web Scraping',
    nameCn: '研究与网页抓取',
    cnMap: { 'deep-research': '深度研究', 'exa-search': 'Exa 搜索', 'firecrawl': 'Firecrawl', 'tavily': 'Tavily', 'web-scraping': '网页抓取', 'search-specialist': '搜索专家', 'scraper': '爬虫', 'crawler': '爬虫', 'spider': '爬虫' }
  },
  {
    name: 'Developer Tooling & DX',
    nameCn: '开发者工具与体验',
    cnMap: { 'configure-ecc': 'ECC 配置', 'dx-optimizer': 'DX 优化', 'environment-setup': '环境搭建', 'skill-developer': '技能开发', 'skill-seekers': '技能发现', 'find-skills': '技能查找', 'claude-code-guide': 'Claude Code 指南', 'nanoclaw': 'NanoClaw', 'ecc-': 'ECC', 'vscode-': 'VS Code', 'ide-': 'IDE', 'devcontainer': '开发容器', 'pre-commit': '预提交', 'husky': 'Husky', 'eslint-': 'ESLint', 'prettier': 'Prettier' }
  },
  {
    name: 'Orchestration & Workflow',
    nameCn: '编排与工作流',
    cnMap: { 'brainstorm': '头脑风暴', 'writing-plans': '编写计划', 'subagent': '子代理开发', 'systematic-debug': '系统调试', 'orchestrat': '编排', 'workflow': '工作流', 'kaizen': '持续改进', 'behavioral': '行为模式', 'plan-writing': '计划编写', 'antigravity-workflows': '工作流编排', 'conductor': 'Conductor', 'concise-planning': '精简规划', 'council': '委员会', 'intelligent-routing': '智能路由', 'team-builder': '团队构建', 'context-management': '上下文管理', 'context-budget': '上下文预算', 'strategic-compact': '战略压缩', 'app-builder': '应用构建器' }
  },
  {
    name: 'Other',
    nameCn: '其他',
    cnMap: {}
  }
];

// Get all keywords from all categories for matching
// Some keywords are too generic and should only match dir+name, not description
const genericKeywords = new Set(['security', 'attack', 'analytics', 'cloud', 'deploy', 'shell', 'cache', 'queue', 'animation', 'compliance', 'inference', 'growth', 'landing']);

// English descriptions for skills with empty/broken descriptions
const specialEn = {
  'angular': 'Angular framework development best practices including component design, DI, and RxJS',
  'blueprint': 'Project blueprint planning tool for defining structure and tech stack',
  'prompt-optimizer': 'Optimize AI prompts for better output quality and consistency',
  'token-budget-advisor': 'Token budget advisor for managing context window consumption',
  'typescript-expert': 'Advanced TypeScript expert covering type gymnastics and engineering practices',
  'analytics-tracking': 'Analytics tracking setup covering event instrumentation and user behavior',
  'arm-cortex-expert': 'ARM Cortex embedded development expert covering RTOS and peripheral programming',
  'carrier-relationship-management': 'Carrier relationship management for optimizing logistics partnerships',
  'copywriting': 'Copywriting skill for generating high-conversion marketing copy',
  'customs-trade-compliance': 'Customs and trade compliance for managing import/export regulations',
  'design-orchestration': 'Design orchestration for coordinating multiple design systems and component libraries',
  'energy-procurement': 'Energy procurement management for optimizing energy costs and supplier selection',
  'form-cro': 'Form conversion rate optimization for reducing drop-off and improving submission rates',
  'imagen': 'Google Imagen image generation model integration',
  'inventory-demand-planning': 'Inventory and demand planning for forecasting and stock optimization',
  'logistics-exception-management': 'Logistics exception management for handling shipping delays and damage',
  'multi-agent-brainstorming': 'Multi-agent brainstorming for creative ideation through multiple AI perspectives',
  'openclaw-persona-forge': 'OpenClaw persona forge for creating and managing AI agent personas',
  'page-cro': 'Page conversion rate optimization for landing pages and key pages',
  'production-scheduling': 'Production scheduling management for optimizing line resources and delivery',
  'programmatic-seo': 'Programmatic SEO for generating search-optimized pages at scale',
  'quality-nonconformance': 'Quality nonconformance management for handling defects and corrective actions',
  'returns-reverse-logistics': 'Returns and reverse logistics for managing returns and recycling flows',
  'schema-markup': 'Schema structured data markup for improving search engine understanding',
  'seo-audit': 'SEO audit for analyzing website search optimization issues and recommendations',
  'shopify-development': 'Shopify store development including theme customization and App integration',
  'superdesign': 'SuperDesign system for rapidly building UI components'
};

// Chinese trigger guides for skills with empty/broken descriptions
const specialCn = {
  'angular': '开发 Angular 应用时使用，包括组件设计和依赖注入',
  'blueprint': '规划项目蓝图时使用，定义结构和技术选型',
  'prompt-optimizer': '优化 AI 提示词时使用，提升输出质量',
  'token-budget-advisor': '管理 Token 预算时使用，控制上下文消耗',
  'typescript-expert': '需要 TypeScript 高级类型和工程实践时使用',
  'analytics-tracking': '搭建数据追踪和用户行为分析时使用',
  'arm-cortex-expert': '开发 ARM Cortex 嵌入式系统时使用',
  'carrier-relationship-management': '管理承运商关系和物流合作时使用',
  'copywriting': '生成营销文案和高转化文案时使用',
  'customs-trade-compliance': '处理海关合规和进出口法规时使用',
  'design-orchestration': '协调多个设计系统和组件库时使用',
  'energy-procurement': '管理能源采购和成本优化时使用',
  'form-cro': '优化表单转化率和减少流失时使用',
  'imagen': '集成 Google Imagen 图像生成时使用',
  'inventory-demand-planning': '规划库存需求和预测时使用',
  'logistics-exception-management': '处理物流异常和运输延误时使用',
  'multi-agent-brainstorming': '多代理头脑风暴和创意激发时使用',
  'openclaw-persona-forge': '创建和管理 AI 代理角色时使用',
  'page-cro': '优化页面转化率时使用',
  'production-scheduling': '管理生产排程和资源优化时使用',
  'programmatic-seo': '规模化生成 SEO 优化页面时使用',
  'quality-nonconformance': '处理质量不合格和纠正措施时使用',
  'returns-reverse-logistics': '管理退货和逆向物流时使用',
  'schema-markup': '添加结构化数据标记以提升搜索排名时使用',
  'seo-audit': '审计网站 SEO 问题时使用',
  'shopify-development': '开发 Shopify 商店和主题定制时使用',
  'superdesign': '使用 SuperDesign 快速构建 UI 组件时使用'
};

function getCategoryForSkill(skill) {
  const nameText = (skill.dir + ' ' + skill.name).toLowerCase();
  const fullText = (nameText + ' ' + skill.desc).toLowerCase();
  for (const cat of categories) {
    if (Object.keys(cat.cnMap).length === 0) continue;
    for (const kw of Object.keys(cat.cnMap)) {
      const searchIn = genericKeywords.has(kw) ? nameText : fullText;
      if (searchIn.includes(kw)) return cat;
    }
  }
  return categories[categories.length - 1]; // Other
}

// Get Chinese name for a skill within its category
function getCnName(skill, cat) {
  const nameText = (skill.dir + ' ' + skill.name).toLowerCase();
  const fullText = (nameText + ' ' + skill.desc).toLowerCase();
  for (const [kw, cn] of Object.entries(cat.cnMap)) {
    const searchIn = genericKeywords.has(kw) ? nameText : fullText;
    if (searchIn.includes(kw)) return cn;
  }
  return skill.name; // fallback to English name
}

// Generate a Chinese trigger guide for a skill
// Describes WHEN to use the skill, in Chinese
function getCnTriggerGuide(skill, cat, cnName) {
  const name = skill.dir.toLowerCase();
  const desc = (skill.desc || '').toLowerCase();
  
  // Special cases: precise Chinese trigger guides for broken/empty descriptions
  if (specialCn[name]) return specialCn[name];
  
  // Extract "Use when" context from description — keep as mixed CN/EN
  const useWhenMatch = desc.match(/\buse (?:this skill |this )?when\s+(.{5,80}?)(?:\.|$)/i);
  if (useWhenMatch) {
    let ctx = useWhenMatch[1].trim()
      .replace(/^you (?:need|want) to /i, '')
      .replace(/^you're /i, '')
      .replace(/^you are /i, '')
      .replace(/^working (?:on|with) /i, '')
      .replace(/^the user /i, '')
      .replace(/^(?:a|an|the) /i, '')
      .trim();
    if (ctx.length > 3 && ctx.length < 60) {
      return '当' + ctx + '时使用';
    }
  }
  
  // Extract verb+object from first sentence of description
  const firstSentence = desc.split(/\.\s/)[0];
  
  // Pattern: "Verb X for Y" / "Verb X with Y"
  const verbObjMatch = firstSentence.match(/^(?:expert (?:in|at|for) |master |guide (?:for|on) |patterns? (?:for|in) )?(?:build|design|create|implement|automate|optimize|deploy|monitor|secure|test|debug|review|migrate|refactor|configure|integrate|setup|manage|generate|write|analyze|develop|handle|process)\s+(.{10,70}?)(?:\s+(?:for|with|using|via|through|in|on)\b|$)/i);
  if (verbObjMatch) {
    return '当需要' + verbObjMatch[1].trim().replace(/\.$/, '') + '时使用';
  }
  
  // Pattern: "X patterns" / "X best practices" / "X guide"
  const patternMatch = firstSentence.match(/^(.{10,50}?)\s+(?:patterns?|best practices?|guide|workflow|workflow|checklist|template|framework)\s/i);
  if (patternMatch) {
    return '当需要' + patternMatch[1].trim() + '相关指导时使用';
  }
  
  // Pattern: "You are a/an X expert/specialist"
  const expertMatch = firstSentence.match(/^you are (?:a|an)\s+(.{10,50}?)\s+(?:expert|specialist|engineer|architect|developer|professional)/i);
  if (expertMatch) {
    return '当需要' + expertMatch[1].trim() + '专业帮助时使用';
  }
  
  // Fallback: use cnName
  return '当需要' + cnName + '相关功能时使用';
}

// Categorize
const categorized = {};
for (const cat of categories) categorized[cat.name] = [];

for (const skill of data) {
  const cat = getCategoryForSkill(skill);
  const cnName = getCnName(skill, cat);
  const cnTrigger = getCnTriggerGuide(skill, cat, cnName);
  // Fix empty/broken descriptions
  let fixedDesc = skill.desc;
  const skillDir = skill.dir.toLowerCase();
  if (specialEn[skillDir]) {
    fixedDesc = specialEn[skillDir];
  } else if (!fixedDesc || fixedDesc.trim() === '' || fixedDesc.trim() === '>' || fixedDesc.trim() === '|' || fixedDesc.trim() === '|-') {
    fixedDesc = cnName + ' skill for ' + cat.name.toLowerCase();
  }
  categorized[cat.name].push({ ...skill, desc: fixedDesc, catName: cat.name, catCn: cat.nameCn, cnName, cnTrigger });
}

// Generate markdown
let md = '';
md += '# Skills Trigger List / 技能触发指南\n\n';
md += 'All available skills and how to trigger them in your AI assistant.\n';
md += '所有可用技能及其触发方式。\n\n';
md += '> Total: **' + data.length + ' skills** | 共 **' + data.length + ' 个技能**\n\n';
md += '---\n\n';

// Category index
md += '## Category Index / 分类索引\n\n';
md += '| # | Category / 分类 | Count / 数量 |\n';
md += '|---|------|------|\n';
let idx = 1;
for (const cat of categories) {
  const skills = categorized[cat.name];
  if (skills.length === 0) continue;
  md += '| ' + idx + ' | ' + cat.name + ' / ' + cat.nameCn + ' | ' + skills.length + ' |\n';
  idx++;
}
md += '\n---\n\n';

// Skill tables by category
for (const cat of categories) {
  const skills = categorized[cat.name];
  if (skills.length === 0) continue;
  md += '## ' + cat.name + ' / ' + cat.nameCn + ' (' + skills.length + ')\n\n';
  md += '| Skill / 技能 | 中文 | Trigger / 触发方式 | Description / 描述 | 触发说明 |\n';
  md += '|------|------|------|------|------|\n';
  for (const s of skills) {
    const trigger = '@' + s.dir;
    let desc = s.desc.replace(/^"/, '').replace(/"$/, '').substring(0, 100);
    if (desc.length === 100) desc += '...';
    desc = desc.replace(/\|/g, '\\|');
    md += '| ' + s.name + ' | ' + s.cnName + ' | `' + trigger + '` | ' + desc + ' | ' + s.cnTrigger + ' |\n';
  }
  md += '\n';
}

md += '---\n\n';
md += '## How to Use / 如何使用\n\n';
md += '| Method / 方式 | Example / 示例 |\n';
md += '|------|------|\n';
md += '| **@mention** (CodeBuddy, Antigravity) | `@tdd-workflow Help me write tests` |\n';
md += '| **/slash command** (some tools) | `/tdd-workflow Help me write tests` |\n';
md += '| **Natural language** (AI auto-matches) | "Help me write tests" → AI auto-selects tdd-workflow |\n';
md += '| **Explicit request** | "Use the api-design skill to review my endpoints" |\n\n';
md += '> AI assistants automatically match skills based on task description. You don\'t need to memorize trigger names — just describe what you want.\n';
md += '>\n';
md += '> AI 助手会根据任务描述自动匹配技能。你不需要记住触发名称——只需描述你想做什么。\n';

fs.writeFileSync(__dirname + '/../skills-trigger-list.md', md, 'utf8');

// Stats
console.log('Total:', data.length);
for (const cat of categories) {
  const n = categorized[cat.name].length;
  if (n > 0) console.log(cat.name + ' / ' + cat.nameCn + ': ' + n);
}
