const ITSectionScene = ({ variant = 'portfolio' }) => (
  <div className={`section-it-scene section-it-scene-${variant}`} aria-hidden="true">
    <svg className="section-it-map" viewBox="0 0 1440 900" preserveAspectRatio="none">
      <g className="section-it-routes">
        <path d="M-40 176h194l46 46h155l60-60h226" />
        <path d="M1480 700h-210l-45-45h-162l-48 48h-230" />
        <path d="M338 -30v172l48 48v118m730 632V770l-48-48V578m270-608v136l-48 48v146" />
        <path d="M-35 522h116l42 42h116l48-48h133m1060-26h-162l-44 44h-120" />
      </g>
      <g className="section-it-data">
        <path className="section-it-data-one" d="M-40 176h194l46 46h155l60-60h226" />
        <path className="section-it-data-two" d="M1480 700h-210l-45-45h-162l-48 48h-230" />
        <path className="section-it-data-three" d="M338 -30v172l48 48v118m730 632V770l-48-48V578m270-608v136l-48 48v146" />
        <path className="section-it-data-four" d="M-35 522h116l42 42h116l48-48h133m1060-26h-162l-44 44h-120" />
      </g>
      <g className="section-it-nodes">
        <circle cx="154" cy="176" r="3" />
        <circle cx="395" cy="222" r="3" />
        <circle cx="1270" cy="700" r="3" />
        <circle cx="1011" cy="655" r="3" />
        <circle cx="338" cy="142" r="3" />
        <circle cx="1116" cy="578" r="3" />
        <circle cx="239" cy="564" r="2.5" />
        <circle cx="1330" cy="492" r="2.5" />
      </g>
    </svg>
    <span className="section-it-grid" />
    <span className="section-it-scan" />
    <i className="section-it-signal section-it-signal-a" />
    <i className="section-it-signal section-it-signal-b" />
  </div>
)

export default ITSectionScene
