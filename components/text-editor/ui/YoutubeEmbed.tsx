import { getYoutubeVideoIdFromLink } from '../utils';

export default function YoutubeEmbed({
  link,
  width,
  height,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement> & {
  link: string;
  width?: number;
  height?: number;
}) {
  return (
    <iframe
      {...props}
      width={width}
      height={height}
      src={`https://www.youtube-nocookie.com/embed/${getYoutubeVideoIdFromLink(link)}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={false}
      title="YouTube video"
    />
  );
}
