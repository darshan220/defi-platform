interface EquivoLogoProps {
  className?: string;
  size?: number;
}

const EquivoLogo = ({ className, size = 40 }: EquivoLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#00E5CC" />
      <rect x="10" y="11" width="14" height="4" rx="2" fill="#000" />
      <rect x="10" y="18" width="20" height="4" rx="2" fill="#000" />
      <rect x="10" y="25" width="10" height="4" rx="2" fill="#000" />
      <path d="M26 22 L32 22 L29 17 Z" fill="#000" />
    </svg>
  );
};

export default EquivoLogo;

