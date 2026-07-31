export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: 'brand-identity-nova',
    title: 'Nova — Brand Identity',
    category: 'Brand Identity',
    year: '2026',
    tags: ['Identity', 'Print', 'Art Direction'],
    description: 'Strategic positioning and visual identity for a tech startup challenging category norms with a human-centric approach.',
    longDescription: 'Nova approached us with a challenge: how do you build a brand in a saturated market that feels genuinely human? We started with strategy, mapping their audience, competitors, and cultural context before a single mark was drawn.',
    image: '/sample_1.jpg',
    challenge: 'The tech space is flooded with cold, geometric brands that prioritize speed over substance. Nova needed to feel approachable, warm, and trustworthy—without sacrificing the sense of forward momentum that the category demands.',
    solution: 'We developed a visual identity anchored in a custom wordmark drawn from humanist type principles, paired with an editorial-inspired system of photography, texture, and a muted-yet-vivid palette. The result is a brand that feels like it belongs in a magazine, not a pitch deck.',
    outcome: 'Nova launched to press coverage in four major design publications and reported a 40% increase in inbound inquiries in the three months following rebrand.',
  },
  {
    slug: 'editorial-twice-magazine',
    title: 'Twice — Editorial Design',
    category: 'Editorial Design',
    year: '2025',
    tags: ['Editorial', 'Typography', 'Layout'],
    description: 'A 200-page biannual publication exploring the intersection of architecture and digital culture through bespoke typography.',
    longDescription: 'Twice is a biannual publication that had an exceptional editorial voice but a layout system that was struggling to keep pace with the ambition of its content. We were brought in to redesign the publication from the ground up.',
    image: '/sample_2.jpg',
    challenge: 'Translating complex, multi-disciplinary content—spanning architecture, software, philosophy, and photography—into a cohesive visual language that felt equally rigorous and beautiful.',
    solution: 'We commissioned a bespoke display typeface for headlines, paired it with a classical body type, and developed a flexible 12-column grid system with rules that could be broken intentionally. Every spread was designed as a compositional object.',
    outcome: 'The redesigned Twice won a Type Directors Club award and saw a 65% increase in print subscription renewals.',
  },
  {
    slug: 'packaging-verdant',
    title: 'Verdant — Packaging System',
    category: 'Packaging',
    year: '2025',
    tags: ['Packaging', 'Illustration', 'Print'],
    description: 'Sustainable structural packaging and labeling system for a premium skincare line focusing on minimal, tactile materials.',
    longDescription: 'Verdant came to us with a commitment to sustainability and a product that genuinely delivered. They needed packaging that could communicate luxury and ecological responsibility simultaneously—two qualities the market often treats as incompatible.',
    image: '/sample_3.jpg',
    challenge: 'Most sustainable packaging feels like a compromise. Verdant wanted packaging that felt premium, tactile, and beautiful—while using only FSC-certified board, soy-based inks, and zero plastic.',
    solution: 'We designed a system built around tactile contrast: uncoated board with deep embossing, spot UV on botanical illustrations, and a structural system that required zero adhesives. Every element was designed for easy disassembly and recycling.',
    outcome: 'Verdant\'s retail sell-through rate increased by 28% after launch. The packaging has been featured in three sustainability-focused design journals.',
  },
  {
    slug: 'digital-meridian',
    title: 'Meridian — Digital Platform',
    category: 'Web & Digital',
    year: '2024',
    tags: ['Web Design', 'Brand System', 'UX'],
    description: 'Comprehensive digital platform and design system overhaul for an international arts institution.',
    longDescription: 'Meridian Arts had accumulated years of technical debt in their digital presence. Multiple CMS systems, inconsistent branding, and a user experience that failed to match the quality of their programming. We rebuilt everything.',
    image: '/sample_4.jpg',
    challenge: 'A 15-year-old institution with disparate digital touchpoints, a diverse global audience, and a board of directors who needed to see ROI—not just beautiful design.',
    solution: 'We ran a six-month discovery process involving staff, audiences, and partners. From there, we built a comprehensive design system (80+ components), a new CMS architecture, and a content strategy that unified every digital touchpoint.',
    outcome: 'Meridian\'s digital engagement increased by 180% in the first year. Ticket sales through the platform grew by 55%.',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
