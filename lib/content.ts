import fs from 'fs';
import path from 'path';
import { createClient } from '@vercel/kv';

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const kv = (kvUrl && kvToken) ? createClient({ url: kvUrl, token: kvToken }) : null;

const CONTENT_PATH = path.join(process.cwd(), 'content', 'content.json');

export interface SiteSettings {
  studioName: string;
  tagline: string;
  email: string;
  phone: string;
  socials: { instagram: string; behance: string; linkedin: string };
  manifesto: string;
  testimonial: { quote: string; author: string; role: string };
  ctaHeadline: string;
  ctaAvailability: string;
  footerBio: string;
  heroRole: string;
  heroLocation: string;
  heroVolume: string;
  heroSub: string;
  heroImage?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  videoUrl: string;
  challenge: string;
  solution: string;
  outcome: string;
  featured: boolean;
  order: number;
}

export interface SiteContent {
  settings: SiteSettings;
  projects: Project[];
  studioPassword?: string;
}

export async function readContent(): Promise<SiteContent> {
  if (kv) {
    try {
      const data = await kv.get<SiteContent>('site-content');
      if (data) return data;
    } catch (e) {
      console.warn('Failed to read from Vercel KV, falling back to local file.', e);
    }
  }
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  if (kv) {
    await kv.set('site-content', content);
  }
  // Try to sync to disk for local development
  try {
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
  } catch (e) {
    // Ignore error in production serverless environments where fs is read-only
  }
}

export async function getProjects(): Promise<Project[]> {
  const { projects } = await readContent();
  return [...projects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getAdjacentProjects(slug: string) {
  const all = await getProjects();
  const index = all.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const content = await readContent();
  return content.settings;
}

export async function getPassword(): Promise<string> {
  const content = await readContent();
  return content.studioPassword || process.env.STUDIO_PASSWORD || 'markyyy-owner-2026';
}
