export default function HalalSeal() {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="100% Certified Halal"
      className="w-24 h-24 md:w-28 md:h-28 shrink-0 drop-shadow-xl"
    >
      <defs>
        <path id="halal-seal-top" d="M 22,60 A 38,38 0 0,1 98,60" />
        <path id="halal-seal-bottom" d="M 22,60 A 38,38 0 0,0 98,60" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#083b2a" />
      <circle cx="60" cy="60" r="55" fill="none" stroke="#e5cc91" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#e5cc91" strokeWidth="0.6" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="#e5cc91" strokeWidth="0.6" opacity="0.45" />
      <g fill="#e5cc91" className="font-sub" fontSize="10" fontWeight="700" letterSpacing="2.6">
        <text>
          <textPath href="#halal-seal-top" startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
        </text>
        <text>
          <textPath href="#halal-seal-bottom" startOffset="50%" textAnchor="middle">LAVASH</textPath>
        </text>
      </g>
      <circle cx="19" cy="60" r="2" fill="#e5cc91" />
      <circle cx="101" cy="60" r="2" fill="#e5cc91" />
      <text x="60" y="52" fill="#e5cc91" textAnchor="middle" className="font-sub" fontSize="15" fontWeight="700" letterSpacing="1">100%</text>
      <text x="60" y="76" fill="#fff8e8" textAnchor="middle" className="font-display" fontSize="25" letterSpacing="0.5">HALAL</text>
    </svg>
  );
}
