const inks = ["#2466fd", "#6f3fff", "#ca89ea", "#ffb1e0", "#ff7e3f", "#ffa602"];

/** Vector print checks use the section's exact grey as their paper ground. */
export function ApprovalArtwork() {
  return (
    <svg className="approval__illustration" viewBox="0 0 640 640" role="img" aria-label="A graphic print proof with colour swatches, fine resolution lines and a magnified detail, in Giclée Club colours">
      <defs>
        <pattern id="approval-resolution" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0V9" stroke="var(--color-ultra)" strokeWidth="2" />
        </pattern>
        <clipPath id="approval-detail"><circle cx="450" cy="421" r="111" /></clipPath>
      </defs>

      <g fill="none" stroke="var(--color-charcoal)" strokeWidth="1">
        <path d="M59 92h24m-12-12v24m475-12h24m-12-12v24M59 550h24m-12-12v24m475-12h24m-12-12v24" />
        <path d="M92 92h444v458H92z" />
      </g>

      <g transform="translate(118 122)">
        {inks.map((ink, index) => <path key={ink} d={`M${index * 66} 0h66v25h-66z`} fill={ink} />)}
      </g>

      <g fill="var(--color-violet)" transform="translate(128 199) rotate(-17.29 104 100)">
        <path d="M0 0h208v65H0zM0 85h208v65H0zM0 170h208v65H0z" />
      </g>
      <g fill="none" stroke="var(--color-ultra)" strokeWidth="1.5">
        {[25, 41, 57, 73].map((radius) => <circle key={radius} cx="451" cy="246" r={radius} />)}
      </g>
      <path d="M118 472h189v50H118z" fill="url(#approval-resolution)" />
      <path d="M118 446h189" stroke="var(--color-charcoal)" />

      <path d="m527 502 49 49" stroke="var(--color-ultra)" strokeWidth="21" />
      <circle cx="450" cy="421" r="119" fill="var(--approval-ground)" stroke="var(--color-ultra)" strokeWidth="2" />
      <g clipPath="url(#approval-detail)">
        <path d="M332 304h236v236H332z" fill="var(--color-pink)" />
        {Array.from({ length: 17 }, (_, index) => (
          <path key={index} d={`M${305 + index * 17} 295v255`} stroke="var(--color-ultra)" strokeWidth="4" transform="rotate(-17.29 450 421)" />
        ))}
        <path d="M324 466 575 388v165H324z" fill="var(--color-orange)" />
      </g>
      <circle cx="450" cy="421" r="111" fill="none" stroke="var(--color-ultra)" strokeWidth="2" />
    </svg>
  );
}
