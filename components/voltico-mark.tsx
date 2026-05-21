type Props = {
  className?: string;
  variant?: "indigo-on-white" | "white-on-indigo" | "dark";
  size?: number;
};

export function VolticoMark({
  className,
  variant = "indigo-on-white",
  size = 28,
}: Props) {
  const fill =
    variant === "white-on-indigo"
      ? "#ffffff"
      : variant === "dark"
        ? "#202020"
        : "#3636EA";

  return (
    <svg
      width={size}
      height={size * (28 / 32)}
      viewBox="0 0 32 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Voltico"
      className={className}
    >
      <g fill={fill}>
        <rect x="0" y="2" width="9" height="9" rx="1.2" />
        <path d="M11 2 L25 2 L18 26 L4 26 Z" />
      </g>
    </svg>
  );
}

export function VolticoWordmark({
  className,
  color = "#202020",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <VolticoMark size={26} variant={color === "#ffffff" ? "white-on-indigo" : "indigo-on-white"} />
      <span
        className="font-semibold text-[22px] tracking-tight"
        style={{ color, letterSpacing: "-0.02em" }}
      >
        Voltico
      </span>
    </div>
  );
}
