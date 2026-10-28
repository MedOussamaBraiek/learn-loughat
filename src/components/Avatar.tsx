interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const gradients = [
  'linear-gradient(135deg, #2563eb, #60a5fa)',
  'linear-gradient(135deg, #7c3aed, #a78bfa)',
  'linear-gradient(135deg, #0891b2, #22d3ee)',
  'linear-gradient(135deg, #16a34a, #4ade80)',
  'linear-gradient(135deg, #ea580c, #fb923c)',
  'linear-gradient(135deg, #db2777, #f472b6)',
  'linear-gradient(135deg, #4f46e5, #818cf8)',
  'linear-gradient(135deg, #0d9488, #2dd4bf)',
];

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function gradientFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return gradients[hash % gradients.length];
}

// Initials avatar with a stable color per learner, so no photo is needed anywhere.
export function Avatar({ name, size = 40, className }: AvatarProps) {
  return (
    <span
      className={`avatar${className ? ` ${className}` : ''}`}
      style={{
        width: size,
        height: size,
        background: gradientFor(name),
        fontSize: Math.round(size * 0.36),
      }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
