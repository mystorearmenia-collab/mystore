import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import { ArrowRightIcon } from "./icons";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: Props) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6 pb-[clamp(2rem,4vw,3.25rem)]">
        <div className="max-w-[46ch]">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="h2">{title}</h2>
          {description && <p className="lede mt-4">{description}</p>}
        </div>

        {action && (
          <Link href={action.href} className="btn btn-quiet group">
            {action.label}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
