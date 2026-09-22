import type { CSSProperties, ReactNode } from "react";

export type ProductArt =
  | "iphone"
  | "galaxy"
  | "macbook"
  | "ipad"
  | "playstation"
  | "headphones"
  | "dyson"
  | "watch"
  | "earbuds"
  | "speaker"
  | "camera"
  | "drone"
  | "accessory";

type Props = {
  art: ProductArt;
  /** Real product photography, once available, wins over the vector stand-in. */
  image?: string | null;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

const BODY = "#17171a";
const BODY_DARK = "#0b0b0d";
const EDGE = "rgba(255,255,255,0.16)";
const SCREEN = "#070709";
const GLASS = "rgba(255,255,255,0.06)";
const ORANGE = "var(--orange)";

/**
 * Vector stand-ins for product photography. Every device is drawn on the same
 * matte-black plinth language so the grid stays visually consistent until real
 * shots are dropped in via `image`.
 */
export default function ProductVisual({
  art,
  image,
  alt,
  className = "",
  style,
}: Props) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  return (
    <svg
      viewBox={viewBox[art]}
      role="img"
      aria-label={alt}
      className={className}
      style={style}
    >
      {shapes[art]}
    </svg>
  );
}

/** Cropped to each device's own bounds so it fills its stage instead of floating in padding. */
const viewBox: Record<ProductArt, string> = {
  iphone: "62 16 76 168",
  galaxy: "60 14 80 172",
  macbook: "14 38 176 114",
  ipad: "40 14 120 160",
  playstation: "62 26 84 148",
  headphones: "26 38 148 124",
  dyson: "56 18 88 168",
  watch: "62 20 80 160",
  earbuds: "58 48 88 94",
  speaker: "54 42 92 116",
  camera: "30 46 140 108",
  drone: "25 41 150 118",
  accessory: "58 62 84 76",
};

const shapes: Record<ProductArt, ReactNode> = {
  iphone: (
    <g>
      <rect x="66" y="22" width="68" height="156" rx="17" fill={BODY} stroke={EDGE} />
      <rect x="70.5" y="26.5" width="59" height="147" rx="13" fill={SCREEN} />
      <rect x="86" y="29" width="28" height="6" rx="3" fill={BODY_DARK} />
      <rect x="74" y="118" width="52" height="52" rx="10" fill={GLASS} opacity="0.35" />
      <path d="M74 150h52" stroke={ORANGE} strokeWidth="1.2" opacity="0.55" />
      <g opacity="0.9">
        <rect x="76" y="34" width="26" height="26" rx="8" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.8" />
        <circle cx="83.5" cy="41.5" r="4" fill="#111" stroke={EDGE} strokeWidth="0.8" />
        <circle cx="94.5" cy="52.5" r="4" fill="#111" stroke={EDGE} strokeWidth="0.8" />
      </g>
    </g>
  ),
  galaxy: (
    <g>
      <rect x="64" y="20" width="72" height="160" rx="9" fill={BODY} stroke={EDGE} />
      <rect x="68" y="24" width="64" height="152" rx="6" fill={SCREEN} />
      <circle cx="100" cy="31" r="2.4" fill={BODY_DARK} />
      <g opacity="0.9">
        <circle cx="78" cy="40" r="4.6" fill="#111" stroke={EDGE} strokeWidth="0.8" />
        <circle cx="78" cy="54" r="4.6" fill="#111" stroke={EDGE} strokeWidth="0.8" />
        <circle cx="78" cy="68" r="4.6" fill="#111" stroke={EDGE} strokeWidth="0.8" />
      </g>
      <path d="M68 140h64" stroke={ORANGE} strokeWidth="1.2" opacity="0.5" />
      <rect x="136" y="60" width="2.5" height="22" rx="1.2" fill={BODY_DARK} />
    </g>
  ),
  macbook: (
    <g>
      <path d="M46 44h108a5 5 0 0 1 5 5v78H41V49a5 5 0 0 1 5-5Z" fill={BODY} stroke={EDGE} />
      <rect x="46" y="49" width="108" height="73" rx="2" fill={SCREEN} />
      <path d="M46 110h108" stroke={ORANGE} strokeWidth="1.2" opacity="0.45" />
      <path d="M26 127h148l8 13a4 4 0 0 1-3.4 6H21.4a4 4 0 0 1-3.4-6Z" fill={BODY_DARK} stroke={EDGE} />
      <path d="M84 133h32" stroke={EDGE} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  ipad: (
    <g>
      <rect x="44" y="32" width="112" height="136" rx="11" fill={BODY} stroke={EDGE} />
      <rect x="49" y="37" width="102" height="126" rx="7" fill={SCREEN} />
      <circle cx="100" cy="34.5" r="1.6" fill={BODY_DARK} />
      <path d="M49 128h102" stroke={ORANGE} strokeWidth="1.2" opacity="0.45" />
      <rect x="128" y="20" width="30" height="4" rx="2" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.7" />
    </g>
  ),
  playstation: (
    <g>
      <path d="M78 30h18l14 140H92Z" fill={BODY_DARK} stroke={EDGE} />
      <path d="M104 30h18l14 140h-18Z" fill={BODY} stroke={EDGE} />
      <path d="M96 30h8l14 140h-8Z" fill={SCREEN} />
      <path d="M97 92h20" stroke={ORANGE} strokeWidth="1.4" opacity="0.6" />
      <rect x="66" y="160" width="76" height="8" rx="4" fill={BODY_DARK} stroke={EDGE} />
    </g>
  ),
  headphones: (
    <g>
      <path d="M48 108V96a52 52 0 0 1 104 0v12" fill="none" stroke={EDGE} strokeWidth="9" strokeLinecap="round" />
      <path d="M48 104V96a52 52 0 0 1 104 0v8" fill="none" stroke={BODY} strokeWidth="6" strokeLinecap="round" />
      <rect x="32" y="100" width="34" height="56" rx="16" fill={BODY} stroke={EDGE} />
      <rect x="134" y="100" width="34" height="56" rx="16" fill={BODY} stroke={EDGE} />
      <rect x="40" y="110" width="18" height="36" rx="9" fill={SCREEN} />
      <rect x="142" y="110" width="18" height="36" rx="9" fill={SCREEN} />
      <circle cx="151" cy="128" r="3" fill={ORANGE} opacity="0.85" />
    </g>
  ),
  dyson: (
    <g>
      <rect x="88" y="96" width="24" height="84" rx="12" fill={BODY} stroke={EDGE} />
      <circle cx="100" cy="62" r="40" fill="none" stroke={EDGE} strokeWidth="9" />
      <circle cx="100" cy="62" r="40" fill="none" stroke={BODY} strokeWidth="6" />
      <path d="M100 22a40 40 0 0 1 34 19" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <rect x="92" y="120" width="16" height="3" rx="1.5" fill={ORANGE} opacity="0.5" />
      <rect x="92" y="130" width="16" height="3" rx="1.5" fill={EDGE} />
    </g>
  ),
  watch: (
    <g>
      <path d="M82 24h36l-4 34H86Z" fill={BODY_DARK} stroke={EDGE} />
      <path d="M86 142h28l4 34H82Z" fill={BODY_DARK} stroke={EDGE} />
      <rect x="66" y="54" width="68" height="92" rx="22" fill={BODY} stroke={EDGE} />
      <rect x="72" y="60" width="56" height="80" rx="18" fill={SCREEN} />
      <path d="M100 78v22l14 8" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <rect x="134" y="80" width="4" height="14" rx="2" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.7" />
    </g>
  ),
  earbuds: (
    <g>
      <path d="M62 70a18 18 0 0 1 36 0v22a12 12 0 0 1-24 0" fill={BODY} stroke={EDGE} />
      <path d="M74 92v34a9 9 0 0 0 18 0" fill="none" stroke={EDGE} strokeWidth="7" strokeLinecap="round" />
      <path d="M104 70a18 18 0 0 1 36 0v22a12 12 0 0 1-24 0" fill={BODY} stroke={EDGE} />
      <path d="M116 92v34a9 9 0 0 0 18 0" fill="none" stroke={EDGE} strokeWidth="7" strokeLinecap="round" />
      <circle cx="80" cy="74" r="3" fill={ORANGE} opacity="0.8" />
      <circle cx="122" cy="74" r="3" fill={ORANGE} opacity="0.8" />
    </g>
  ),
  speaker: (
    <g>
      <rect x="58" y="46" width="84" height="108" rx="14" fill={BODY} stroke={EDGE} />
      <circle cx="100" cy="98" r="30" fill={SCREEN} stroke={EDGE} />
      <circle cx="100" cy="98" r="13" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.8" />
      <circle cx="100" cy="98" r="4" fill={ORANGE} opacity="0.75" />
      <path d="M74 62h52" stroke={EDGE} strokeWidth="1.2" />
      <path d="M86 140h28" stroke={EDGE} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  camera: (
    <g>
      <rect x="34" y="66" width="132" height="82" rx="14" fill={BODY} stroke={EDGE} />
      <path d="M74 66l8-14h36l8 14" fill={BODY} stroke={EDGE} />
      <circle cx="100" cy="108" r="30" fill={SCREEN} stroke={EDGE} />
      <circle cx="100" cy="108" r="18" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.8" />
      <circle cx="100" cy="108" r="8" fill="#000" stroke={ORANGE} strokeWidth="1.4" opacity="0.9" />
      <circle cx="146" cy="80" r="3" fill={ORANGE} opacity="0.8" />
    </g>
  ),
  drone: (
    <g>
      <rect x="80" y="82" width="40" height="36" rx="8" fill={BODY} stroke={EDGE} />
      <path d="M80 90 46 62M120 90l34-28M80 110l-34 28M120 110l34 28" stroke={EDGE} strokeWidth="4" strokeLinecap="round" />
      <circle cx="44" cy="60" r="15" fill="none" stroke={EDGE} strokeWidth="1.4" />
      <circle cx="156" cy="60" r="15" fill="none" stroke={EDGE} strokeWidth="1.4" />
      <circle cx="44" cy="140" r="15" fill="none" stroke={EDGE} strokeWidth="1.4" />
      <circle cx="156" cy="140" r="15" fill="none" stroke={EDGE} strokeWidth="1.4" />
      <circle cx="100" cy="122" r="7" fill={SCREEN} stroke={ORANGE} strokeWidth="1.3" opacity="0.9" />
    </g>
  ),
  accessory: (
    <g>
      <rect x="62" y="66" width="76" height="68" rx="14" fill={BODY} stroke={EDGE} />
      <rect x="72" y="76" width="56" height="34" rx="6" fill={SCREEN} stroke={EDGE} strokeWidth="0.8" />
      <circle cx="100" cy="122" r="5" fill={BODY_DARK} stroke={EDGE} strokeWidth="0.8" />
      <path d="M92 122h16" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M78 90h44" stroke={EDGE} strokeWidth="1" opacity="0.6" />
    </g>
  ),
};
