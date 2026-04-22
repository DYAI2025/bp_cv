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
    fullDesc: 'An interactive platform combining astrological data with modern web technologies to provide personalized insights and daily trajectories.',
    tech: ['React', 'API Integration', 'Framer Motion', 'D3.js'],
    highlight: false,
    icon: 'Server',
    color: '168, 85, 247',
    media: {
      type: 'image',
      url: '/bazodiac.webp'
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
    fullDesc: 'For therapists, psychologists, coaches and all who want to look deeper into language patterns. A tool for semantic pattern recognition in long dialogs, chats, or live conversations.',
    tech: ['AI', 'NLP', 'React', 'Data Viz'],
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
    fullDesc: 'A lightweight, focused utility application designed to help couples synchronize schedules, manage shared time effectively, and maintain their relationship.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    highlight: false,
    icon: 'Layers',
    color: '244, 63, 94',
    media: {
      type: 'video',
      url: 'https://media.dyai.cloud/uploads/2026/03/7a6d07a3-98f1-41b9-b5c2-68168467368f.mp4'
    }
  },
  {
    name: 'Promptschmiede',
    url: 'https://prompt.machinetool.site/',
    desc: 'AI designed advanced prompting. Every prompt is refined to stand out.',
    fullDesc: 'Every prompt is detailed and refined. A workspace for crafting, testing, and managing complex prompts for various LLMs.',
    tech: ['Prompt Engineering', 'Next.js', 'OpenAI API'],
    highlight: false,
    icon: 'Terminal',
    color: '245, 158, 11',
    media: {
      type: 'video',
      url: '/prompt.forge.mp4'
    }
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
      agentId: 'agent_6201kndfxgmwf8gbx5zfbhtsmstc'
    }
  }
];
