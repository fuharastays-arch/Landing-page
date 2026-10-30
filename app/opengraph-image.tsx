import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { art } from '@/lib/art';

export const alt = 'Fuhara Stays — Feel at home, away. Verified short stays in Abuja.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const font = (p: string) => readFile(join(process.cwd(), 'node_modules/@fontsource', p));

export default async function OgImage() {
  const [serifItalic, serif, sans, icon] = await Promise.all([
    font('cormorant-garamond/files/cormorant-garamond-latin-300-italic.woff'),
    font('cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff'),
    font('manrope/files/manrope-latin-500-normal.woff'),
    readFile(join(process.cwd(), 'app/icon.svg'), 'utf8'),
  ]);

  const door = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="#231A12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${art.door.main}"/>${art.door.details
    .map((d) => `<path d="${d}" stroke-width="1.3" opacity=".8"/>`)
    .join('')}</g></svg>`;
  const src = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F2E9D8',
          padding: '64px 72px',
          fontFamily: 'Manrope',
          color: '#231A12',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={src(icon)} width={46} height={46} alt="" />
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#9A4A2C' }}>FUHARA STAYS · ABUJA</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Cormorant', fontSize: 132, lineHeight: 0.9, letterSpacing: -2 }}>Feel at home,</div>
            <div style={{ fontFamily: 'CormorantItalic', fontSize: 132, lineHeight: 1, color: '#0B7F78' }}>away.</div>
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#5A4636', maxWidth: 620 }}>
            Verified short stays. Every host identity-checked, every home reviewed.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={src(door)} width={420} height={420} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: serif, weight: 400, style: 'normal' },
        { name: 'CormorantItalic', data: serifItalic, weight: 300, style: 'italic' },
        { name: 'Manrope', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
