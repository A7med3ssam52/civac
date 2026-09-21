// API-ready data layer.
// Today: local static data (same host, no backend).
// Tomorrow (Dashboard): swap internals to fetch('/api/...') without touching pages.
import { projects, type Project } from '../data/projects';
import { services, type Service } from '../data/services';

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
