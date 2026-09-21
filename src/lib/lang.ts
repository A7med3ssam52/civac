export type Lang = 'en';

/** Site is English-only — always returns 'en'. Kept for API compatibility. */
export function detectLang(_pathname?: string, _hash?: string): Lang {
  void _pathname;
  void _hash;
  return 'en';
}

/** True when the app runs from a local file (double-click preview). */
export function isFileProtocol(): boolean {
  return typeof window !== 'undefined' && window.location.protocol === 'file:';
}
