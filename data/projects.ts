export const projectsData = [
  {
    name: 'DYAI',
    url: 'https://dyai.machinemind.me',
    desc: 'Design your augmented intelligence',
    fullDesc: "The page that this refers to is a statement toward the world of tomorrow. How will we handle AI in normal human workflows and how will it contribute to our daily life? We think that these questions are not necessary for us because it's some kind of future, but it's our future.",
    tech: ['LLMs', 'Python', 'FastAPI', 'React'],
    highlight: true,
    icon: 'Cpu',
    color: '59, 130, 246',
    media: {
      type: 'image',
      url: '/dyai.webp'
    }
  },
  {
    name: 'Bazodiac',
    url: 'https://bazodiac.space',
    desc: 'As if a NASA engineer were reading your cards at night.',
    fullDesc: "A high-end fusion astrology platform that uniquely integrates Western Astrology with Chinese BaZi (Four Pillars) and Wu-Xing (Five Elements). The system features the 'Fusion Ring' engine, an advanced interactive visualization built with Three.js and Pixi.js. It leverages Google Gemini for narrative horoscope generation and ElevenLabs for conversational voice agents, providing a deeply personalized and immersive astrological experience.",
    tech: ['React', 'Three.js', 'Framer Motion', 'Supabase', 'Gemini AI', 'ElevenLabs'],
    highlight: false,
    icon: 'Server',
    color: '168, 85, 247',
    media: {
      type: 'video',
      url: '/bazodiac.sky.mp4',
      poster: '/bazodiac.webp'
    },
    subLinks: [
      { label: 'The Idea', url: 'https://insight.bazodiac.space' },
      { label: 'The Funnel', url: 'https://sky.bazodiac.space' },
      { label: 'The Product', url: 'https://bazodiac.space' },
      { label: 'The Math (FufirE_API)', url: 'https://bafe-production.up.railway.app/docs' }
    ]
  },
  {
    name: 'LeanDeep',
    url: 'https://app.LeanDeep.de',
    desc: 'A tool for semantic pattern recognition in long dialogs, chats, or live conversations.',
    fullDesc: "An AI-guided interpretation tool designed for therapists, psychologists, and researchers to uncover hidden semantic patterns in dialogues. The platform uses 'Semantic Framing' to detect tone and emotional intent, and 'Marker Resonance' to weight psychological patterns against the conversation's context. Its standout innovation is a multi-perspective narrative engine that provides alternative interpretations based on context uncertainty, preventing professional bias and enhancing diagnostic accuracy.",
    tech: ['FastAPI', 'Python', 'LLM Semantic Framing', 'Multi-Perspective AI', 'React'],
    highlight: false,
    icon: 'LineChart',
    color: '20, 184, 166',
    media: {
      type: 'video',
      url: '/leandeep6.mp4'
    }
  },
  {
    name: 'Couple Time',
    url: 'https://coupletimer.site/',
    desc: 'A digital framework for self hosted relationship maintenance and better partnership.',
    fullDesc: "A structured communication framework for couples based on the Moeller Method ('Zwiegespräch'). The application serves as a neutral mediator, managing speaking slots, breaks, and transitions to ensure both partners are heard without interruption. It features a gentle guidance system with context-sensitive tips and uses Web Audio API singing bowl sounds to signal phase changes, facilitating deeper emotional intimacy and preventive relationship maintenance.",
    tech: ['React', 'Moeller Method', 'Web Audio API', 'Framer Motion', 'i18next'],
    highlight: false,
    icon: 'Layers',
    color: '244, 63, 94',
    media: {
      type: 'video',
      url: 'https://media.dyai.cloud/uploads/2026/03/7a6d07a3-98f1-41b9-b5c2-68168467368f.mp4'
    }
  },
  {
    name: 'Augmented Ops',
    url: 'https://augmentedopsinc-production.up.railway.app',
    desc: 'Eine 100% Agent-Agency — autonome AI-Agenten liefern Dienstleistungen schnell, professionell, überraschend günstig.',
    fullDesc: 'Eine 100%ige Agent-Agency, in der autonome AI-Agenten Dienstleistungen in höchster professioneller Qualität anbieten — schnell geliefert, zu erstaunlich guten Preisen.',
    tech: ['Autonomous Agents', 'Multi-Agent Systems', 'LLMs', 'Agent SDKs'],
    highlight: false,
    icon: 'Workflow',
    color: '16, 185, 129',
    media: {
      type: 'video',
      url: '/augmented-ops.mp4'
    },
    subLinks: [
      { label: 'Live Site', url: 'https://augmentedopsinc-production.up.railway.app' },
      { label: 'Source (GitHub)', url: 'https://github.com/DYAI2025/Augmented_ops.INC' }
    ]
  },
  {
    name: 'Ben B18 Quantified',
    url: '#',
    desc: 'Interactive voice agent representing my quantified self.',
    fullDesc: 'Talk directly to my quantified self via this interactive voice agent powered by ElevenLabs. It uses semantic pattern recognition and my personal data to converse with you.',
    tech: ['Voice AI', 'ElevenLabs', 'Conversational AI'],
    highlight: false,
    icon: 'Mic',
    color: '212, 175, 55',
    media: {
      type: 'elevenlabs',
      agentId: 'agent_6201kndfxgmwf8gbx5zfbhtsmstc',
      hoverVideo: '/ben.p.holo.mp4'
    }
  }
];
