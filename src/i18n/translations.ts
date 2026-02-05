 export type Language = 'fr' | 'en' | 'zh';
 
 export const translations = {
   fr: {
     // Header
     nav: {
       offers: 'Offres',
       calendar: 'Calendrier',
     },
     // Hero
     hero: {
       badge: 'Repartez avec des insights concrets pour faire grandir votre business — que nous travaillions ensemble ou non.',
       title1: 'Vos équipes perdent 20h/semaine',
       title2: 'sur des tâches automatisables.',
       subtitle: 'IA, Automatisation & Agentique',
       subtitleEnd: 'Je construis les systèmes qui libèrent votre temps.',
       experience: '3 ans d\'expérience sur les projets customisés d\'automatisation et d\'agents IA.',
       proof: 'Prospection automatisée • Agents IA sur-mesure • Coaching inclus',
       ctaPrimary: 'Réserver 15 min — Gratuit',
       ctaSecondary: 'Voir les offres',
       scrollIndicator: 'Découvrir les offres',
     },
     // Offers
     offers: {
       pay: {
         title: 'PaY — Your SAP AI Assistant',
         subtitle: 'Pour utilisateurs SAP & consultants',
         description: 'Trouvez vos réponses en 10 secondes au lieu de 20 minutes.',
         badge: 'Accès Bêta',
         cta: 'Demander l\'accès bêta',
         bullets: [
           '"Comment créer une commande d\'achat ?" → Réponse instantanée',
           '"Erreur M7001, je fais quoi ?" → Solution étape par étape',
           'Modules MM, FI, SD couverts',
         ],
         mention: 'Base de connaissances validée par consultants seniors',
         legalMention: 'PaY n\'est pas affilié à SAP SE.',
       },
       prospection: {
         title: 'Prospection Signaux d\'Intention',
         subtitle: 'On remplit votre pipeline de RDV qualifiés',
         description: 'Vous nous donnez votre ICP, on détecte ceux qui sont prêts à acheter.',
         badge: 'Setup 5K€',
         cta: 'Découvrir l\'offre',
         twoColumns: {
           left: {
             title: 'Ce que vous fournissez :',
             items: [
               'Votre client idéal (ICP)',
               'Votre offre et ses bénéfices',
               'Les problèmes que vous résolvez',
             ],
           },
           right: {
             title: 'Ce qu\'on livre :',
             items: [
               'Système de détection des signaux',
               'Pipeline alimenté en continu',
               'Leads chauds dans votre CRM',
             ],
           },
         },
         mention: 'Coaching acquisition inclus dans le setup',
       },
       agentique: {
         title: 'Projets Agentiques Sur-Mesure',
         subtitle: 'Solutions IA pour vos défis uniques',
         description: 'Automatisation, agents IA, workflows complexes — on construit ce qui n\'existe pas encore.',
         badge: 'Sur devis',
         cta: 'Prendre RDV',
         bullets: [
           'Catalogues automatisés (maisons de vente aux enchères)',
           'Assistants WhatsApp connectés à votre CRM',
           'Process métier : franchises, juridique, RH',
           'Génération de contenu : SEO, réseaux sociaux',
         ],
         mention: 'Accompagnement premium de A à Z',
       },
       formation: {
         title: 'Formation & Prise de Parole',
         subtitle: 'Montez en compétence sur l\'IA et l\'agentique',
         description: 'Pour équipes, dirigeants, ou événements — on forme et on inspire.',
         badge: 'Sur demande',
         cta: 'En savoir plus',
         bullets: [
           'Formation déploiement d\'agents IA',
           'Masterclass "De l\'IA à l\'Agentique"',
           'Coaching individuel (outils, mindset, démos)',
           'Conférences et ateliers en entreprise',
         ],
         mention: 'Formats adaptés à vos contraintes',
       },
     },
     // Why Section
     why: {
       title: 'Pourquoi travailler avec Parrit.ai ?',
       reasons: [
         {
           title: 'Pas de bullshit',
           text: 'On parle vrai. Si un projet n\'a pas de sens, on vous le dit.',
         },
         {
           title: 'Exécution rapide',
           text: 'POC en 2 semaines, déploiement en 4-8 semaines selon le scope.',
         },
         {
           title: 'Coaching inclus',
           text: 'On ne livre pas juste un outil. On vous rend autonome.',
         },
       ],
     },
     // Final CTA
     finalCta: {
       title: 'Prêt à accélérer ?',
       subtitle: '15 minutes pour repartir avec des pistes concrètes — que nous travaillions ensemble ou non.',
       cta: 'Réserver un créneau',
       proof: 'Réponse sous 24h • 100% gratuit • Sans engagement',
     },
     // Calendar
     calendar: {
       title: 'Réservez votre appel découverte',
       subtitle: '15 minutes pour explorer vos besoins et voir si on peut vous aider.',
     },
     // Footer
     footer: {
       copyright: '© 2025 Parrit.ai — Tous droits réservés',
       legal: 'Mentions légales',
     },
     // Lead Capture Modal
     modal: {
       title: 'Demander plus d\'infos',
       firstName: 'Prénom',
       email: 'Email',
       phone: 'Téléphone',
       need: 'Votre besoin (optionnel)',
       submit: 'Envoyer ma demande',
       sending: 'Envoi en cours...',
       successTitle: 'C\'est envoyé !',
       successMessage: 'Je vous recontacte sous 24h.',
       close: 'Fermer',
     },
   },
   en: {
     // Header
     nav: {
       offers: 'Offers',
       calendar: 'Calendar',
     },
     // Hero
     hero: {
       badge: 'Leave with actionable insights to grow your business — whether we work together or not.',
       title1: 'Your teams waste 20h/week',
       title2: 'on automatable tasks.',
       subtitle: 'AI, Automation & Agentic',
       subtitleEnd: 'I build systems that free up your time.',
       experience: '3 years of experience on custom automation and AI agent projects.',
       proof: 'Automated prospecting • Custom AI agents • Coaching included',
       ctaPrimary: 'Book 15 min — Free',
       ctaSecondary: 'See offers',
       scrollIndicator: 'Discover offers',
     },
     // Offers
     offers: {
       pay: {
         title: 'PaY — Your SAP AI Assistant',
         subtitle: 'For SAP users & consultants',
         description: 'Find your answers in 10 seconds instead of 20 minutes.',
         badge: 'Beta Access',
         cta: 'Request beta access',
         bullets: [
           '"How to create a purchase order?" → Instant answer',
           '"Error M7001, what do I do?" → Step-by-step solution',
           'MM, FI, SD modules covered',
         ],
         mention: 'Knowledge base validated by senior consultants',
         legalMention: 'PaY is not affiliated with SAP SE.',
       },
       prospection: {
         title: 'Intent Signal Prospecting',
         subtitle: 'We fill your pipeline with qualified meetings',
         description: 'You give us your ICP, we detect those ready to buy.',
         badge: 'Setup 5K€',
         cta: 'Learn more',
         twoColumns: {
           left: {
             title: 'What you provide:',
             items: [
               'Your ideal customer (ICP)',
               'Your offer and its benefits',
               'The problems you solve',
             ],
           },
           right: {
             title: 'What we deliver:',
             items: [
               'Signal detection system',
               'Continuously fed pipeline',
               'Hot leads in your CRM',
             ],
           },
         },
         mention: 'Acquisition coaching included in setup',
       },
       agentique: {
         title: 'Custom Agentic Projects',
         subtitle: 'AI solutions for your unique challenges',
         description: 'Automation, AI agents, complex workflows — we build what doesn\'t exist yet.',
         badge: 'On quote',
         cta: 'Book a call',
         bullets: [
           'Automated catalogs (auction houses)',
           'WhatsApp assistants connected to your CRM',
           'Business processes: franchises, legal, HR',
           'Content generation: SEO, social media',
         ],
         mention: 'Premium support from A to Z',
       },
       formation: {
         title: 'Training & Speaking',
         subtitle: 'Level up on AI and agentic systems',
         description: 'For teams, executives, or events — we train and inspire.',
         badge: 'On request',
         cta: 'Learn more',
         bullets: [
           'AI agent deployment training',
           'Masterclass "From AI to Agentic"',
           'Individual coaching (tools, mindset, demos)',
           'Corporate conferences and workshops',
         ],
         mention: 'Formats adapted to your constraints',
       },
     },
     // Why Section
     why: {
       title: 'Why work with Parrit.ai?',
       reasons: [
         {
           title: 'No BS',
           text: 'We speak the truth. If a project doesn\'t make sense, we\'ll tell you.',
         },
         {
           title: 'Fast execution',
           text: 'POC in 2 weeks, deployment in 4-8 weeks depending on scope.',
         },
         {
           title: 'Coaching included',
           text: 'We don\'t just deliver a tool. We make you autonomous.',
         },
       ],
     },
     // Final CTA
     finalCta: {
       title: 'Ready to accelerate?',
       subtitle: '15 minutes to leave with actionable insights — whether we work together or not.',
       cta: 'Book a slot',
       proof: 'Response within 24h • 100% free • No commitment',
     },
     // Calendar
     calendar: {
       title: 'Book your discovery call',
       subtitle: '15 minutes to explore your needs and see if we can help.',
     },
     // Footer
     footer: {
       copyright: '© 2025 Parrit.ai — All rights reserved',
       legal: 'Legal notice',
     },
     // Lead Capture Modal
     modal: {
       title: 'Request more info',
       firstName: 'First name',
       email: 'Email',
       phone: 'Phone',
       need: 'Your need (optional)',
       submit: 'Send my request',
       sending: 'Sending...',
       successTitle: 'Sent!',
       successMessage: 'I\'ll get back to you within 24h.',
       close: 'Close',
     },
   },
   zh: {
     // Header
     nav: {
       offers: '服务',
       calendar: '预约',
     },
     // Hero
     hero: {
       badge: '无论我们是否合作，您都将获得具体可行的见解来发展您的业务。',
       title1: '您的团队每周浪费20小时',
       title2: '在可自动化的任务上。',
       subtitle: 'AI、自动化与智能代理',
       subtitleEnd: '我构建释放您时间的系统。',
       experience: '3年定制自动化和AI代理项目经验。',
       proof: '自动化获客 • 定制AI代理 • 包含辅导',
       ctaPrimary: '预约15分钟 — 免费',
       ctaSecondary: '查看服务',
       scrollIndicator: '探索服务',
     },
     // Offers
     offers: {
       pay: {
         title: 'PaY — 您的SAP AI助手',
         subtitle: '面向SAP用户和顾问',
         description: '10秒内找到答案，而不是20分钟。',
         badge: 'Beta测试',
         cta: '申请Beta访问',
         bullets: [
           '"如何创建采购订单？" → 即时回答',
           '"错误M7001，我该怎么办？" → 分步解决方案',
           '涵盖MM、FI、SD模块',
         ],
         mention: '知识库由资深顾问验证',
         legalMention: 'PaY与SAP SE无关联。',
       },
       prospection: {
         title: '意向信号获客',
         subtitle: '我们为您的销售管道填充合格会议',
         description: '您提供理想客户画像，我们识别准备购买的客户。',
         badge: '设置费5K€',
         cta: '了解更多',
         twoColumns: {
           left: {
             title: '您提供：',
             items: [
               '您的理想客户(ICP)',
               '您的产品及其优势',
               '您解决的问题',
             ],
           },
           right: {
             title: '我们交付：',
             items: [
               '信号检测系统',
               '持续供给的销售管道',
               'CRM中的热门线索',
             ],
           },
         },
         mention: '设置费包含获客辅导',
       },
       agentique: {
         title: '定制智能代理项目',
         subtitle: '为您独特挑战提供AI解决方案',
         description: '自动化、AI代理、复杂工作流——我们构建尚不存在的系统。',
         badge: '定制报价',
         cta: '预约通话',
         bullets: [
           '自动化目录（拍卖行）',
           '连接CRM的WhatsApp助手',
           '业务流程：加盟店、法务、人力资源',
           '内容生成：SEO、社交媒体',
         ],
         mention: '从A到Z的优质支持',
       },
       formation: {
         title: '培训与演讲',
         subtitle: '提升AI和智能代理能力',
         description: '面向团队、高管或活动——我们培训并激励。',
         badge: '按需定制',
         cta: '了解更多',
         bullets: [
           'AI代理部署培训',
           '"从AI到智能代理"大师课',
           '个人辅导（工具、思维、演示）',
           '企业会议和研讨会',
         ],
         mention: '格式适应您的需求',
       },
     },
     // Why Section
     why: {
       title: '为什么选择Parrit.ai？',
       reasons: [
         {
           title: '实话实说',
           text: '我们坦诚相告。如果项目不合理，我们会告诉您。',
         },
         {
           title: '快速执行',
           text: 'POC 2周，部署4-8周（取决于范围）。',
         },
         {
           title: '包含辅导',
           text: '我们不只是交付工具。我们让您自主。',
         },
       ],
     },
     // Final CTA
     finalCta: {
       title: '准备加速了吗？',
       subtitle: '15分钟获得可行的见解——无论我们是否合作。',
       cta: '预约时间',
       proof: '24小时内回复 • 100%免费 • 无承诺',
     },
     // Calendar
     calendar: {
       title: '预约您的发现通话',
       subtitle: '15分钟探索您的需求，看看我们能否帮助您。',
     },
     // Footer
     footer: {
       copyright: '© 2025 Parrit.ai — 版权所有',
       legal: '法律声明',
     },
     // Lead Capture Modal
     modal: {
       title: '请求更多信息',
       firstName: '名字',
       email: '电子邮件',
       phone: '电话',
       need: '您的需求（可选）',
       submit: '发送我的请求',
       sending: '发送中...',
       successTitle: '已发送！',
       successMessage: '我会在24小时内回复您。',
       close: '关闭',
     },
   },
 } as const;
 
 // Generic type that captures the structure but allows any string values
 export type Translations = {
   nav: { offers: string; calendar: string };
   hero: {
     badge: string;
     title1: string;
     title2: string;
     subtitle: string;
     subtitleEnd: string;
     experience: string;
     proof: string;
     ctaPrimary: string;
     ctaSecondary: string;
     scrollIndicator: string;
   };
   offers: {
     pay: {
       title: string;
       subtitle: string;
       description: string;
       badge: string;
       cta: string;
       bullets: readonly string[];
       mention: string;
       legalMention: string;
     };
     prospection: {
       title: string;
       subtitle: string;
       description: string;
       badge: string;
       cta: string;
       twoColumns: {
         left: { title: string; items: readonly string[] };
         right: { title: string; items: readonly string[] };
       };
       mention: string;
     };
     agentique: {
       title: string;
       subtitle: string;
       description: string;
       badge: string;
       cta: string;
       bullets: readonly string[];
       mention: string;
     };
     formation: {
       title: string;
       subtitle: string;
       description: string;
       badge: string;
       cta: string;
       bullets: readonly string[];
       mention: string;
     };
   };
   why: {
     title: string;
     reasons: readonly { title: string; text: string }[];
   };
   finalCta: {
     title: string;
     subtitle: string;
     cta: string;
     proof: string;
   };
   calendar: {
     title: string;
     subtitle: string;
   };
   footer: {
     copyright: string;
     legal: string;
   };
   modal: {
     title: string;
     firstName: string;
     email: string;
     phone: string;
     need: string;
     submit: string;
     sending: string;
     successTitle: string;
     successMessage: string;
     close: string;
   };
 };