export function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent ${className}`} />;
}
