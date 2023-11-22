export interface IconsProps {
  size?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

export const MenuIcon = ({
  size = "48",
  fill = "#fff",
  className,
  onClick,
}: IconsProps) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 48 48`}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#5B5B5B" />
        <rect x="10" y="16" width="28" height="3" fill="white" />
        <rect x="10" y="23" width="28" height="3" fill="white" />
        <rect x="10" y="30" width="28" height="3" fill="white" />
      </svg>
    </div>
  );
};
export const PrevIcon = ({
  size = "48",
  fill = "#fff",
  className,
  onClick,
}: IconsProps) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 48 48`}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#5B5B5B" />
        <path
          d="M20.06 15.5954V22.7621H36.0417L36.0955 26.3633H20.06V33.5121L11.1017 24.5538L20.06 15.5954Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
