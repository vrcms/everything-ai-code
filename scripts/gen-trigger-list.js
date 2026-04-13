const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/skills_data.json', 'utf8'));

const categories = [
  { name: 'Orchestration & Workflow', nameCn: '编排与工作流', keywords: ['brainstorm', 'plan', 'orchestrat', 'workflow', 'subagent', 'verification', 'systematic-debug', 'kaizen', 'behavioral'] },
  { name: 'Frontend & UI', nameCn: '前端与 UI', keywords: ['react', 'vue', 'angular', 'nextjs', 'next.js', 'tailwind', 'css', 'html', 'frontend', 'ui', 'ux', 'design', 'radix', 'svelte', 'remotion', 'avalonia', 'stitch', 'superdesign', 'canvas', 'slide', 'web-artifacts', '3d-web', 'threejs', 'web-design', 'visual'] },
  { name: 'Backend & API', nameCn: '后端与 API', keywords: ['backend', 'api', 'nodejs', 'node.js', 'fastapi', 'nestjs', 'graphql', 'serverless', 'saga', 'microservice', 'rest', 'express', 'django', 'flask'] },
  { name: 'Database', nameCn: '数据库', keywords: ['database', 'sql', 'postgres', 'prisma', 'nosql', 'migration', 'sqlite', 'mongodb', 'supabase', 'neon'] },
  { name: 'DevOps & Infrastructure', nameCn: '运维与基础设施', keywords: ['docker', 'kubernetes', 'k8s', 'terraform', 'aws', 'azure', 'gcp', 'cloud', 'helm', 'istio', 'linkerd', 'deploy', 'ci', 'cd', 'github-actions', 'gitlab-ci', 'gitops', 'service-mesh', 'observability', 'monitor', 'grafana', 'prometheus', 'slo', 'incident', 'on-call', 'pagerduty', 'sentry'] },
  { name: 'Testing & Quality', nameCn: '测试与质量', keywords: ['test', 'tdd', 'jest', 'playwright', 'cypress', 'qa', 'e2e', 'unit-test', 'integration-test', 'coverage', 'lint', 'validate'] },
  { name: 'Security & Pentesting', nameCn: '安全与渗透测试', keywords: ['security', 'owasp', 'xss', 'inject', 'pentest', 'vulnerability', 'exploit', 'red-team', 'attack', 'threat', 'malware', 'forensic', 'reverse-engineer', 'binary-analysis', 'shodan', 'metasploit', 'sqlmap', 'privilege-escalat', 'active-directory', 'recon', 'scanning', 'smtp-penetration', 'ssh-penetration', 'wordpress-penetration', 'anti-revers', 'memory-forensic', 'firmware', 'memory-safety'] },
  { name: 'AI & Machine Learning', nameCn: 'AI 与机器学习', keywords: ['ai-', 'ml-', 'llm', 'langchain', 'langgraph', 'rag', 'vector', 'embedding', 'prompt', 'autonomous-agent', 'hugging', 'agent-', 'multi-agent', 'agent-memory', 'voice-ai', 'imagen', 'fal-', 'mlops'] },
  { name: 'Mobile Development', nameCn: '移动开发', keywords: ['flutter', 'react-native', 'swiftui', 'ios-', 'mobile', 'expo'] },
  { name: 'Language-Specific', nameCn: '编程语言', keywords: ['python', 'typescript', 'javascript', 'golang', 'rust', 'java-pro', 'ruby', 'php', 'scala', 'haskell', 'julia', 'csharp', 'cpp', 'shell', 'bash', 'powershell', 'posix', 'arm-cortex', 'swift-pro', 'dart', 'kotlin', 'golang-pro', 'rust-pro', 'python-pro', 'typescript-pro'] },
  { name: 'SaaS Automation', nameCn: 'SaaS 自动化', keywords: ['slack', 'jira', 'zendesk', 'salesforce', 'hubspot', 'notion', 'trello', 'asana', 'zapier', 'airtable', 'figma', 'mailchimp', 'twilio', 'stripe', 'shopify', 'webflow', 'vercel', 'google-', 'gmail', 'outlook', 'teams-automation', 'zoom', 'linear', 'todoist', 'pipedrive', 'intercom', 'freshdesk', 'segment', 'amplitude', 'mixpanel', 'posthog', 'sendgrid', 'n8n', 'brevo', 'klaviyo', 'monday', 'basecamp', 'bamboohr', 'wrike', 'miro', 'activecampaign', 'bitbucket', 'instagram', 'tiktok', 'twitter', 'linkedin', 'reddit', 'youtube-automation', 'whatsapp', 'telegram', 'square', 'one-drive', 'googlesheets'] },
  { name: 'SEO & Growth', nameCn: 'SEO 与增长', keywords: ['seo', 'cro', 'analytics', 'tracking', 'growth', 'launch', 'viral', 'referral', 'pricing', 'marketing', 'content-', 'ab-test', 'landing', 'signup', 'paywall', 'popup', 'app-store', 'programmatic'] },
  { name: 'Game Development', nameCn: '游戏开发', keywords: ['game', 'unity', 'unreal', 'godot', 'minecraft'] },
  { name: 'Blockchain & Web3', nameCn: '区块链与 Web3', keywords: ['blockchain', 'nft', 'web3', 'smart-contract'] },
  { name: 'Documentation & Content', nameCn: '文档与内容', keywords: ['doc', 'readme', 'wiki', 'pdf', 'xlsx', 'pptx', 'tutorial', 'obsidian', 'youtube-summarizer', 'beautiful-prose', 'reference-builder', 'mermaid', 'article'] },
  { name: 'Git & Code Review', nameCn: 'Git 与代码审查', keywords: ['git', 'github', 'review', 'code-quality', 'clean-code', 'refactor', 'fix-review', 'iterate', 'address-github', 'pr-'] },
  { name: 'Architecture & Design', nameCn: '架构与设计', keywords: ['architect', 'architecture', 'design', 'pattern', 'decision-record', 'monorepo', 'turborepo', 'nx-workspace', 'legacy', 'framework-migration', 'software-architecture', 'senior-architect', 'full-stack'] },
  { name: 'Startup & Business', nameCn: '创业与商业', keywords: ['startup', 'business', 'financial', 'market', 'kpi', 'product-manager', 'product-owner', 'legal', 'billing', 'payment', 'free-tool'] },
  { name: 'Other', nameCn: '其他', keywords: [] }
];

const categorized = {};
for (const cat of categories) categorized[cat.name] = [];

for (const skill of data) {
  const text = (skill.dir + ' ' + skill.name + ' ' + skill.desc).toLowerCase();
  let placed = false;
  for (const cat of categories) {
    if (cat.keywords.length === 0) continue;
    if (cat.keywords.some(kw => text.includes(kw))) {
      categorized[cat.name].push(skill);
      placed = true;
      break;
    }
  }
  if (!placed) categorized['Other'].push(skill);
}

let md = '';
md += '# Skills Trigger List / 技能触发指南\n\n';
md += 'All available skills and how to trigger them in your AI assistant.\n';
md += '所有可用技能及其触发方式。\n\n';
md += '> Total: **' + data.length + ' skills**\n\n';
md += '---\n\n';

for (const cat of categories) {
  const skills = categorized[cat.name];
  if (skills.length === 0) continue;
  md += '## ' + cat.name + ' / ' + cat.nameCn + ' (' + skills.length + ')\n\n';
  md += '| Skill / 技能 | Trigger / 触发方式 | Description / 描述 |\n';
  md += '|------|------|------|\n';
  for (const s of skills) {
    const trigger = '@' + s.dir;
    let desc = s.desc.replace(/^"/, '').replace(/"$/, '').substring(0, 120);
    if (desc.length === 120) desc += '...';
    // Escape pipe characters in desc
    desc = desc.replace(/\|/g, '\\|');
    md += '| ' + s.name + ' | `' + trigger + '` | ' + desc + ' |\n';
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

fs.writeFileSync('d:/www/wwwroot/everything-ai-code/skills-trigger-list.md', md, 'utf8');
console.log('Done! Total skills:', data.length);

// Print category stats
for (const cat of categories) {
  console.log(cat.name + ': ' + categorized[cat.name].length);
}
