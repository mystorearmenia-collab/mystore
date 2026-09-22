import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PowerIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 2.6v8.6"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
    />
    <path
      d="M6.9 5.9A7.7 7.7 0 1 0 17.1 5.9"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
    />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.9-3.9" />
  </Icon>
);

export const UserIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20.2c1.4-3.6 4.1-5.4 7.5-5.4s6.1 1.8 7.5 5.4" />
  </Icon>
);

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 20.3 4.9 13.4a4.6 4.6 0 0 1 0-6.6 4.8 4.8 0 0 1 6.7 0l.4.4.4-.4a4.8 4.8 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6Z" />
  </Icon>
);

export const BagIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5.6 7.8h12.8l1 12.4H4.6Z" />
    <path d="M8.9 7.8V6a3.1 3.1 0 0 1 6.2 0v1.8" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4.8 12h14" />
    <path d="m13 6.2 5.8 5.8-5.8 5.8" />
  </Icon>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7.5 16.5 16.5 7.5" />
    <path d="M8.6 7.5h7.9v7.9" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3.5 7.5h17" />
    <path d="M3.5 16.5h17" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Icon>
);

export const ShieldIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2.8 4.8 5.9v5.5c0 4.4 2.9 8.4 7.2 9.8 4.3-1.4 7.2-5.4 7.2-9.8V5.9Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </Icon>
);

export const TruckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2.8 6.5h10.4v9.8H2.8z" />
    <path d="M13.2 10h3.9l3.1 3.1v3.2h-7z" />
    <circle cx="7" cy="18.2" r="1.9" />
    <circle cx="16.6" cy="18.2" r="1.9" />
  </Icon>
);

export const VerifiedIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 2.8 2.4 2 3.1-.3.9 3 2.6 1.8-1.3 2.9 1.3 2.9-2.6 1.8-.9 3-3.1-.3-2.4 2-2.4-2-3.1.3-.9-3L3 15.1l1.3-2.9L3 9.3l2.6-1.8.9-3 3.1.3Z" />
    <path d="m9.4 12.1 1.9 1.9 3.4-3.6" />
  </Icon>
);

export const LockIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4.6" y="10.2" width="14.8" height="10.2" rx="2.4" />
    <path d="M8.2 10.2V7.6a3.8 3.8 0 0 1 7.6 0v2.6" />
  </Icon>
);

export const PinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 21.2c4.3-4.4 6.4-7.8 6.4-10.4a6.4 6.4 0 1 0-12.8 0c0 2.6 2.1 6 6.4 10.4Z" />
    <circle cx="12" cy="10.6" r="2.5" />
  </Icon>
);

export const ClockIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 1.9" />
  </Icon>
);

export const PhoneCallIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3.8 5.6c0 7.9 6.7 14.6 14.6 14.6l1.8-3.7-4.2-1.9-1.8 2.2a12.8 12.8 0 0 1-7-7l2.2-1.8-1.9-4.2Z" />
  </Icon>
);

export const MailIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="m3.6 7.2 8.4 5.6 8.4-5.6" />
  </Icon>
);

export const InstagramIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
  </Icon>
);

export const FacebookIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13.8 21v-7.6h2.6l.5-3.2h-3.1V8.2c0-.9.3-1.6 1.7-1.6h1.6V3.7c-.8-.1-1.7-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.4v2.3H7.4v3.2h2.7V21" />
  </Icon>
);

export const WhatsAppIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3.4 20.6 4.8 16A8.3 8.3 0 1 1 8 19.2Z" />
    <path d="M9 8.6c-.4 1.6 2.1 5 3.9 5.4l1-1.3 2 1-.6 1.6c-2.8.5-6.5-3-6.6-5.9l1.4-.8Z" />
  </Icon>
);
