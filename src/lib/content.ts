// Helpers for exporting edited content as downloadable JSON.
import type { ContentBundle } from './types';

// Download any value as a JSON file via Blob + object URL.
export function downloadJson(filename: string, data: unknown): void {
  const text = JSON.stringify(data, null, 2);
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Save the full content bundle (always as content.json for hosting upload).
export function downloadContentBundle(bundle: ContentBundle): void {
  downloadJson('content.json', bundle);
}
