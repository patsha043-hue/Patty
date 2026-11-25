export function TeacherAndStudentsRoadSvg() {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustrasi kartun guru dan murid di kawasan jalan raya"
      className="h-full w-full"
    >
      {/* Sky & Sun */}
      <rect width="420" height="300" rx="22" fill="#EAF6FD" />
      <circle cx="355" cy="54" r="28" fill="#FFD966" stroke="#29466B" strokeWidth="3" />
      <ellipse cx="95" cy="55" rx="34" ry="16" fill="#FFFFFF" />
      <ellipse cx="122" cy="50" rx="22" ry="14" fill="#FFFFFF" />
      <ellipse cx="260" cy="48" rx="30" ry="13" fill="#FFFFFF" />

      {/* Green landscape & road */}
      <rect x="0" y="180" width="420" height="45" fill="#A8DDB5" />
      <rect x="0" y="218" width="420" height="82" fill="#52657D" />
      {/* Zebra crossing */}
      <rect x="35" y="236" width="52" height="14" rx="4" fill="#FFF8E8" />
      <rect x="108" y="236" width="52" height="14" rx="4" fill="#FFF8E8" />
      <rect x="181" y="236" width="52" height="14" rx="4" fill="#FFF8E8" />
      <rect x="254" y="236" width="52" height="14" rx="4" fill="#FFF8E8" />
      <rect x="327" y="236" width="52" height="14" rx="4" fill="#FFF8E8" />

      {/* Traffic light on right */}
      <rect x="352" y="130" width="8" height="90" fill="#29466B" />
      <rect x="336" y="76" width="40" height="72" rx="12" fill="#29466B" />
      <circle cx="356" cy="94" r="8" fill="#FF8585" />
      <circle cx="356" cy="113" r="8" fill="#FFD966" />
      <circle cx="356" cy="132" r="8" fill="#A8DDB5" />

      {/* Road sign on left */}
      <rect x="52" y="140" width="6" height="78" fill="#29466B" />
      <polygon
        points="55,86 84,115 55,144 26,115"
        fill="#FFD966"
        stroke="#29466B"
        strokeWidth="3"
      />
      <circle cx="55" cy="115" r="7" fill="#29466B" />

      {/* Smiling Teacher */}
      <rect x="122" y="148" width="50" height="68" rx="16" fill="#83C9F4" stroke="#29466B" strokeWidth="3" />
      <circle cx="147" cy="112" r="24" fill="#FCD5B5" stroke="#29466B" strokeWidth="3" />
      {/* Hijab/Hair */}
      <path
        d="M123 114C123 95 134 84 147 84C160 84 171 95 171 114C171 128 164 138 147 138C130 138 123 128 123 114Z"
        stroke="#29466B"
        strokeWidth="3"
        fill="#FF8585"
        fillOpacity="0.25"
      />
      <circle cx="139" cy="112" r="2.8" fill="#29466B" />
      <circle cx="155" cy="112" r="2.8" fill="#29466B" />
      <path d="M141 122C144 126 150 126 153 122" stroke="#29466B" strokeWidth="2.8" strokeLinecap="round" />
      {/* Teacher holding book */}
      <rect x="155" y="162" width="26" height="32" rx="4" fill="#FFD966" stroke="#29466B" strokeWidth="2.5" />

      {/* Pupil 1 */}
      <rect x="206" y="166" width="36" height="50" rx="12" fill="#FFFFFF" stroke="#29466B" strokeWidth="3" />
      <rect x="206" y="190" width="36" height="26" rx="6" fill="#29466B" />
      <circle cx="224" cy="138" r="20" fill="#FCD5B5" stroke="#29466B" strokeWidth="3" />
      <path d="M204 134C204 120 214 114 224 114C234 114 244 120 244 134" fill="#29466B" />
      <circle cx="217" cy="138" r="2.4" fill="#29466B" />
      <circle cx="231" cy="138" r="2.4" fill="#29466B" />
      <path d="M219 146C222 149 226 149 229 146" stroke="#29466B" strokeWidth="2.4" strokeLinecap="round" />

      {/* Pupil 2 */}
      <rect x="262" y="168" width="36" height="48" rx="12" fill="#FFFFFF" stroke="#29466B" strokeWidth="3" />
      <rect x="262" y="190" width="36" height="26" rx="6" fill="#83C9F4" stroke="#29466B" strokeWidth="2.5" />
      <circle cx="280" cy="140" r="20" fill="#F4C29F" stroke="#29466B" strokeWidth="3" />
      <path d="M260 136C260 122 270 116 280 116C290 116 300 122 300 136" fill="#29466B" />
      <circle cx="273" cy="140" r="2.4" fill="#29466B" />
      <circle cx="287" cy="140" r="2.4" fill="#29466B" />
      <path d="M275 148C278 151 282 151 285 148" stroke="#29466B" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function AdjectiveTypeCartoonIcon({
  type,
}: {
  type: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu';
}) {
  if (type === 'sifat') {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="4" y="4" width="72" height="72" rx="18" fill="#FFFFFF" stroke="#29466B" strokeWidth="2.5" />
        <circle cx="40" cy="40" r="20" fill="#FFD966" stroke="#29466B" strokeWidth="2.5" />
        <circle cx="33" cy="36" r="2.5" fill="#29466B" />
        <circle cx="47" cy="36" r="2.5" fill="#29466B" />
        <path d="M32 45C35 50 45 50 48 45" stroke="#29466B" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'warna') {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="4" y="4" width="72" height="72" rx="18" fill="#FFFFFF" stroke="#29466B" strokeWidth="2.5" />
        <rect x="27" y="14" width="26" height="52" rx="10" fill="#29466B" />
        <circle cx="40" cy="26" r="6" fill="#FF8585" />
        <circle cx="40" cy="40" r="6" fill="#FFD966" />
        <circle cx="40" cy="54" r="6" fill="#A8DDB5" />
      </svg>
    );
  }
  if (type === 'ukuran') {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="4" y="4" width="72" height="72" rx="18" fill="#FFFFFF" stroke="#29466B" strokeWidth="2.5" />
        <rect x="14" y="42" width="52" height="16" rx="5" fill="#FFD966" stroke="#29466B" strokeWidth="2.5" />
        <line x1="24" y1="42" x2="24" y2="50" stroke="#29466B" strokeWidth="2.5" />
        <line x1="35" y1="42" x2="35" y2="48" stroke="#29466B" strokeWidth="2.5" />
        <line x1="46" y1="42" x2="46" y2="50" stroke="#29466B" strokeWidth="2.5" />
        <line x1="57" y1="42" x2="57" y2="48" stroke="#29466B" strokeWidth="2.5" />
        <rect x="18" y="20" width="20" height="16" rx="4" fill="#83C9F4" stroke="#29466B" strokeWidth="2.5" />
        <rect x="46" y="26" width="14" height="10" rx="3" fill="#A8DDB5" stroke="#29466B" strokeWidth="2.5" />
      </svg>
    );
  }
  if (type === 'bentuk') {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="4" y="4" width="72" height="72" rx="18" fill="#FFFFFF" stroke="#29466B" strokeWidth="2.5" />
        <circle cx="28" cy="32" r="12" fill="#FF8585" stroke="#29466B" strokeWidth="2.5" />
        <polygon points="54,18 66,42 42,42" fill="#FFD966" stroke="#29466B" strokeWidth="2.5" />
        <rect x="22" y="50" width="36" height="14" rx="4" fill="#83C9F4" stroke="#29466B" strokeWidth="2.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16" aria-hidden="true">
      <rect x="4" y="4" width="72" height="72" rx="18" fill="#FFFFFF" stroke="#29466B" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="21" fill="#83C9F4" stroke="#29466B" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="15" fill="#FFFFFF" />
      <path d="M40 29V40L48 45" stroke="#29466B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="2.5" fill="#29466B" />
    </svg>
  );
}

export function HappyStudentCelebrationSvg() {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustrasi kartun murid gembira meraikan kejayaan menyiapkan aktiviti"
      className="h-40 w-48 shrink-0"
    >
      <circle cx="110" cy="92" r="72" fill="#FFF8E8" stroke="#29466B" strokeWidth="3" />
      {/* Stars */}
      <polygon
        points="42,48 46,56 55,57 48,63 50,72 42,67 34,72 36,63 29,57 38,56"
        fill="#FFD966"
        stroke="#29466B"
        strokeWidth="2"
      />
      <polygon
        points="178,44 181,51 189,52 183,57 185,65 178,61 171,65 173,57 167,52 175,51"
        fill="#FFD966"
        stroke="#29466B"
        strokeWidth="2"
      />
      {/* Raised arms */}
      <path d="M74 114L54 84" stroke="#29466B" strokeWidth="7" strokeLinecap="round" />
      <path d="M146 114L166 84" stroke="#29466B" strokeWidth="7" strokeLinecap="round" />
      <circle cx="52" cy="81" r="6" fill="#FCD5B5" stroke="#29466B" strokeWidth="2.5" />
      <circle cx="168" cy="81" r="6" fill="#FCD5B5" stroke="#29466B" strokeWidth="2.5" />

      {/* Student torso */}
      <rect x="78" y="102" width="64" height="52" rx="18" fill="#83C9F4" stroke="#29466B" strokeWidth="3" />
      {/* Student head */}
      <circle cx="110" cy="74" r="28" fill="#FCD5B5" stroke="#29466B" strokeWidth="3" />
      <path d="M82 68C84 48 96 42 110 42C124 42 136 48 138 68" fill="#29466B" />
      <circle cx="100" cy="74" r="3" fill="#29466B" />
      <circle cx="120" cy="74" r="3" fill="#29466B" />
      <circle cx="94" cy="82" r="4" fill="#FF8585" fillOpacity="0.6" />
      <circle cx="126" cy="82" r="4" fill="#FF8585" fillOpacity="0.6" />
      <path d="M101 84C105 90 115 90 119 84" stroke="#29466B" strokeWidth="3" strokeLinecap="round" />

      {/* Star badge on shirt */}
      <polygon
        points="110,114 113,121 121,122 115,127 117,135 110,131 103,135 105,127 99,122 107,121"
        fill="#FFD966"
        stroke="#29466B"
        strokeWidth="2"
      />
    </svg>
  );
}
