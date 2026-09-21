// Shared admin/content types — Wave 1 contract (do not rename exports).
// Agents in Wave 2 build on these exact names/shapes.

export type PublishStatus = 'draft' | 'published';

export type Lang = 'ar' | 'en';

export type AdminMessage = {
  id: string;
  source: 'contact' | 'quote';
  serviceId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  lang: Lang;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'spam';
  createdAt: string;
};

export type ContentBundle = {
  version: 1;
  updatedAt: string;
  projects?: unknown[];
};
