import { useLocation } from 'react-router-dom';
import { detectLang } from '../lib/lang';
export function useLang(): 'ar' | 'en' {
  const { pathname, hash } = useLocation();
  return detectLang(pathname, hash);
}
export function px(lang: string, path: string): string {
  return lang === 'ar' ? `/ar${path === '/' ? '' : path}` : path;
}
