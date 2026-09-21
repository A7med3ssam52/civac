export type Lang = 'ar' | 'en';

/** Detect language from path segments AND hash segments,
 *  so it works under BrowserRouter (/ar/...) and under
 *  HashRouter / file:// preview (#/ar/...). */
export function detectLang(pathname: string, hash: string): Lang {
  const parts = `${pathname} ${hash.replace(/#/g, '/')}`
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.includes('ar') ? 'ar' : 'en';
}

/** True when the app runs from a local file (double-click preview). */
export function isFileProtocol(): boolean {
  return typeof window !== 'undefined' && window.location.protocol === 'file:';
}
