// API-ready data layer.
// Today: local static data (same host, no backend).
// Tomorrow (Dashboard): swap internals to fetch('/api/...') without touching pages.
import { clients, projects } from '../data/projects';
import type { Project } from '../data/projects';
import { services } from '../data/services';
import type { Service } from '../data/services';
import { posts, type Post } from '../data/news';

export type { Project, Service, Post };

export async function getProjects(): Promise<Project[]> {
  return projects;
}
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}
export async function getServices(): Promise<Service[]> {
  return services;
}
export function getProjectsSync(): Project[] {
  return projects;
}
export async function getClients(): Promise<string[]> {
  return clients;
}
export async function getNews(): Promise<Post[]> {
  return posts;
}
