import { youtubeLinkRegex } from '@/lib/regex';

export function getYoutubeVideoIdFromLink(link: string): string | null {
  const match = link.match(youtubeLinkRegex);
  return match ? match[5] : null;
}
