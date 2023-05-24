export default function myImageLoader({ src, width, quality }) {
  return `https://app.osmosis.zone/${src}?w=${width}&q=${quality || 75}`;
}
