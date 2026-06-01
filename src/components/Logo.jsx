// Logo de EduTech — birrete académico + nombre, en color primario.
export default function Logo({ size = 40, showText = true, light = false }) {
  const color = light ? '#ffffff' : 'var(--primary)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6 4 16l20 10 16-8v12h4V16L24 6z" fill={color} />
        <path d="M12 23v8c0 3.3 5.4 6 12 6s12-2.7 12-6v-8l-12 6-12-6z" fill={color} opacity="0.55" />
      </svg>
      {showText && (
        <span style={{
          fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: size * 0.5,
          color: light ? '#fff' : 'var(--primary-pressed)', letterSpacing: '-0.02em',
        }}>
          Edu<span style={{ color: light ? '#fff' : 'var(--primary)' }}>Tech</span>
        </span>
      )}
    </span>
  );
}
