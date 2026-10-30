import { art, type ArtKey } from '@/lib/art';

/**
 * One drawing "slot". With motion on, the travelling ink line lands here and
 * the finishing strokes ink in around it. With motion off (or before the
 * script loads) the whole drawing is shown, complete and still.
 */
export function Drawing({ shape, className = '' }: { shape: ArtKey; className?: string }) {
  return (
    <div className={`slot ${className}`} data-slot={shape} aria-hidden="true">
      <svg viewBox="0 0 400 400" focusable="false">
        <DrawingLayer shape={shape} />
      </svg>
    </div>
  );
}

export function DrawingLayer({ shape, step }: { shape: ArtKey; step?: number }) {
  const d = art[shape];
  return (
    <g className="layer" data-layer={shape} data-step={step}>
      {'wash' in d && d.wash
        ? d.wash.map((w, i) => <path key={`w${i}`} className="wash" d={w} fillRule="evenodd" />)
        : null}
      <path className="static-main ink" d={d.main} />
      {d.details.map((p, i) => (
        <path key={i} className="detail ink" d={p} />
      ))}
      {d.notes.map((n, i) => (
        <text
          key={`n${i}`}
          className="note"
          textAnchor={n.anchor ?? 'start'}
          transform={n.mirror ? `translate(${n.x} ${n.y}) scale(-1 1)` : `translate(${n.x} ${n.y})`}
        >
          {n.text}
        </text>
      ))}
    </g>
  );
}
