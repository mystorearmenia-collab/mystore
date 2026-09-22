import { PowerIcon } from "./icons";

type LogoProps = {
  className?: string;
  glow?: boolean;
};

/**
 * The MyStore wordmark. The "o" of Store is the orange power symbol —
 * sized in em so the mark scales with whatever font-size it is given.
 */
export default function Logo({ className = "", glow = true }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold tracking-[-0.04em] leading-none select-none ${className}`}
    >
      <span>MySt</span>
      <PowerIcon
        className="mx-[-0.035em] h-[0.72em] w-[0.72em] translate-y-[0.055em] text-orange"
        style={glow ? { filter: "drop-shadow(0 0 10px var(--orange-glow))" } : undefined}
      />
      <span>re</span>
    </span>
  );
}
