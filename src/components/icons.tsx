import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(paths: React.ReactNode) {
  return function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

export const GridIcon = base(
  <>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </>
);

export const UsersIcon = base(
  <>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    <path d="M16 4.5c1.66 0 3 1.34 3 3s-1.34 3-3 3" />
    <path d="M15.5 14c2.71.32 4.5 2.44 4.5 5" />
  </>
);

export const FlowerIcon = base(
  <>
    <circle cx="12" cy="12" r="2.25" />
    <path d="M12 3.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z" />
    <path d="M12 14.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z" />
    <path d="M20.5 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3Z" />
    <path d="M9.5 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3Z" />
  </>
);

export const ShieldIcon = base(
  <>
    <path d="M12 3.5 5 6v5.5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-2.5Z" />
    <path d="M9.5 12.2l1.8 1.8 3.2-3.6" />
  </>
);

export const MegaphoneIcon = base(
  <>
    <path d="M4 10v4a1 1 0 0 0 1 1h1l1.2 4.2a1 1 0 0 0 1 .8h.3a1 1 0 0 0 1-1.24L8.6 15" />
    <path d="M4 10 15 5.5v10L4 14Z" />
    <path d="M15 8.5c1.66 0 3 1.12 3 2.5s-1.34 2.5-3 2.5" />
  </>
);

export const ScrollIcon = base(
  <>
    <path d="M6 3.5h9A2.5 2.5 0 0 1 17.5 6v13a1.5 1.5 0 0 1-2.6 1L14 19" />
    <path d="M6 3.5A2.5 2.5 0 0 0 3.5 6v11a2.5 2.5 0 0 0 2.5 2.5h8" />
    <path d="M7.5 8h6" />
    <path d="M7.5 11.5h6" />
    <path d="M7.5 15h3.5" />
  </>
);

export const LogOutIcon = base(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </>
);

export const ChevronLeftIcon = base(<path d="M15 18l-6-6 6-6" />);
export const ChevronRightIcon = base(<path d="M9 18l6-6-6-6" />);
export const ChevronDownIcon = base(<path d="M6 9l6 6 6-6" />);

export const CheckIcon = base(<path d="M20 6 9 17l-5-5" />);
export const XIcon = base(<path d="M18 6 6 18M6 6l12 12" />);

export const ArrowLeftIcon = base(
  <>
    <path d="M19 12H5" />
    <path d="M11 18l-6-6 6-6" />
  </>
);

export const AlertTriangleIcon = base(
  <>
    <path d="M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.3 2.25h17.76a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
    <path d="M12 9v4" />
    <path d="M12 16.5h.01" />
  </>
);

export const LockIcon = base(
  <>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="1.75" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </>
);

export const SearchIcon = base(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.6-3.6" />
  </>
);

export const MessageIcon = base(
  <>
    <path d="M4 5.5h16A1.5 1.5 0 0 1 21.5 7v8A1.5 1.5 0 0 1 20 16.5H9l-4.5 4V16.5A1.5 1.5 0 0 1 4 15V5.5Z" />
  </>
);

export const FlameIcon = base(
  <path d="M12 3s5 4.5 5 9.5a5 5 0 1 1-10 0c0-1.4.6-2.5 1.3-3.4.2 1.4 1.1 2 1.7 2 .3-2.3-.8-4-1-6.1C10.3 3.2 12 3 12 3Z" />
);

export const BookIcon = base(
  <>
    <path d="M4 5.2C4 4.5 4.6 4 5.3 4H12v16H5.3c-.7 0-1.3-.5-1.3-1.2V5.2Z" />
    <path d="M20 5.2c0-.7-.6-1.2-1.3-1.2H12v16h6.7c.7 0 1.3-.5 1.3-1.2V5.2Z" />
  </>
);

export const MenuIcon = base(
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </>
);

export const InboxIcon = base(
  <>
    <path d="M3.5 12.5h4.4l1.4 2.5h5.4l1.4-2.5h4.4" />
    <path d="M5.2 6 3.5 12.5v5A1.5 1.5 0 0 0 5 19h14a1.5 1.5 0 0 0 1.5-1.5v-5L18.8 6a1.5 1.5 0 0 0-1.44-1H6.64A1.5 1.5 0 0 0 5.2 6Z" />
  </>
);
