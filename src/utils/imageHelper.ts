import React from 'react';

/**
 * Image helper utility for sanitizing broken Unsplash image URLs
 * and providing resilient fallbacks.
 */

// Known broken Unsplash photo IDs mapped to reliable, verified working replacements
const URL_REPLACEMENTS: Record<string, string> = {
  // Office chair / Office furniture
  'photo-1580481077195-c3a82145be60': 'photo-1589384267710-7a170981ca78',
  // Safety helmet / Safety & Security
  'photo-1578873375969-d71a8e1f0e47': 'photo-1582139329536-e7284fece509',
  // Industrial RO plant / Air compressor machinery
  'photo-1581092335397-9583fe92d232': 'photo-1581091226825-a6a2a5aee158',
};

// Generic placeholder SVG data URI for instant graceful fallback if an image fails to load
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23F1F5F9'%3E%3Crect width='400' height='300' fill='%23F8FAFC'/%3E%3Cpath d='M170 120a20 20 0 1 0 0-40 20 20 0 0 0 0 40zm-60 90h180l-55-70-45 55-25-30-55 45z' fill='%23CBD5E1'/%3E%3Ctext x='50%25' y='82%25' dominant-baseline='middle' text-anchor='middle' fill='%2394A3B8' font-family='sans-serif' font-size='12'%3EImage Unavailable%3C/text%3E%3C/svg%3E";

/**
 * Sanitizes an image URL by replacing any obsolete or 404 Unsplash photo IDs.
 */
export function sanitizeImageUrl(url: string | undefined, defaultPlaceholder: string = FALLBACK_IMAGE): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return defaultPlaceholder;
  }

  let sanitized = url;
  for (const [brokenId, replacementId] of Object.entries(URL_REPLACEMENTS)) {
    if (sanitized.includes(brokenId)) {
      sanitized = sanitized.replace(brokenId, replacementId);
    }
  }

  return sanitized;
}

/**
 * Standard onError image handler to prevent broken icon display.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string = FALLBACK_IMAGE): void {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.onerror = null; // Prevent endless loop
    target.src = fallbackUrl;
  }
}
