/**
 * Fuhara line-art set.
 *
 * Every object lives in the same 400 x 400 drawing space so the single
 * travelling ink line can morph from one object into the next.
 * `main` is ONE continuous stroke (one M command) – that is the line that
 * travels and morphs. `details` are finishing strokes that ink in once the
 * line has arrived, and `notes` are Leonardo-style margin notes
 * (mirrored = written right-to-left, as in his notebooks).
 */

export type Note = { x: number; y: number; text: string; mirror?: boolean; anchor?: 'start' | 'middle' | 'end' };
export type Drawing = { main: string; details: string[]; notes: Note[]; wash?: string[] };

export const LOGO_OUTER =
  'M200 358.08C131.06 358.08 74.98 307.19 74.98 244.65V140.14C74.98 129.16 80.33 118.82 89.3 112.49L180.47 48.11C192.15 39.86 207.85 39.86 219.53 48.11L310.7 112.49C319.67 118.82 325.02 129.16 325.02 140.14V244.65C325.02 307.19 268.94 358.08 200 358.08Z';
export const LOGO_RING =
  'M200 358.08C131.06 358.08 74.98 307.19 74.98 244.65V140.14C74.98 129.16 80.33 118.82 89.3 112.49L180.47 48.11C192.15 39.86 207.85 39.86 219.53 48.11L310.7 112.49C319.67 118.82 325.02 129.16 325.02 140.14V244.65C325.02 307.19 268.94 358.08 200 358.08ZM200 57.11C196.23 57.11 192.46 58.25 189.24 60.52L98.07 124.9C93.12 128.39 90.17 134.09 90.17 140.14V244.65C90.17 298.82 139.44 342.88 200 342.88H200C260.56 342.88 309.83 298.82 309.83 244.65V140.14C309.83 134.09 306.88 128.39 301.93 124.9L210.76 60.52C207.54 58.25 203.77 57.11 200 57.11Z';
export const LOGO_INNER =
  'M277.67 147.12L207.35 97.47C202.94 94.36 197.06 94.36 192.65 97.47L122.33 147.12C118.95 149.51 116.94 153.39 116.94 157.53V234.47C116.94 266.84 139.74 294.41 171.66 304.85L183.36 242.35C174.13 236.72 167.95 226.92 167.95 215.32 167.95 197.62 182.3 183.28 200 183.28S232.05 197.62 232.05 215.32C232.05 226.68 226.14 236.64 217.24 242.33L228.49 304.81C260.33 294.33 283.06 266.79 283.06 234.47V157.53C283.06 153.39 281.05 149.51 277.67 147.12Z';

export const art = {
  door: {
    main: 'M56 352 H344 L330 340 H290 V150 A90 90 0 0 0 110 150 V340 H140 V176 A60 60 0 0 1 260 176 V340 H244 V266 A9 9 0 1 1 243.99 266',
    details: [
      'M200 60 V116 M150 74 L170 112 M250 74 L230 112 M118 104 L148 128 M282 104 L252 128',
      'M140 222 H260 M140 290 H260',
      'M64 364 l10 -12 M96 364 l10 -12 M128 364 l10 -12 M262 364 l10 -12 M294 364 l10 -12 M326 364 l10 -12',
      'M30 150 V340 M24 150 H36 M24 340 H36',
    ],
    notes: [
      { x: 370, y: 40, text: 'la porta di casa', mirror: true, anchor: 'start' },
      { x: 18, y: 250, text: '2', anchor: 'middle' },
    ],
  },
  key: {
    main: 'M346 186 H196 V176 H184 V186 H168 A44 44 0 1 0 168 214 H184 V224 H196 V214 H300 V246 H316 V228 H330 V246 H346 Z',
    details: [
      'M144 200 A18 18 0 1 1 108 200 A18 18 0 1 1 144 200',
      'M86 150 A62 62 0 0 1 150 140 M86 250 A62 62 0 0 0 150 260',
      'M200 286 H346 M200 280 V292 M346 280 V292',
    ],
    notes: [
      { x: 360, y: 120, text: 'la chiave, controllata', mirror: true, anchor: 'start' },
      { x: 273, y: 312, text: 'una per ogni casa', anchor: 'middle' },
    ],
  },
  building: {
    main: 'M36 352 H84 V112 H112 V88 H288 V112 H316 V352 H364',
    details: [
      'M108 132 h26 v30 h-26 z M152 132 h26 v30 h-26 z M222 132 h26 v30 h-26 z M266 132 h26 v30 h-26 z',
      'M108 186 h26 v30 h-26 z M152 186 h26 v30 h-26 z M222 186 h26 v30 h-26 z M266 186 h26 v30 h-26 z',
      'M108 240 h26 v30 h-26 z M152 240 h26 v30 h-26 z M222 240 h26 v30 h-26 z M266 240 h26 v30 h-26 z',
      'M176 352 V312 A24 24 0 0 1 224 312 V352 M100 172 H162 M216 226 H300',
      'M200 88 V60 L226 68 L200 76',
    ],
    notes: [{ x: 370, y: 48, text: 'scegli la casa', mirror: true, anchor: 'start' }],
  },
  bell: {
    main: 'M60 318 H340 L328 300 H312 A112 112 0 0 0 88 300 H72 Z',
    details: [
      'M190 188 V176 H210 V188',
      'M176 176 Q200 160 224 176',
      'M118 284 A86 86 0 0 1 146 222',
      'M136 140 L118 116 M200 132 V102 M264 140 L282 116',
    ],
    notes: [{ x: 360, y: 60, text: 'suona, e ti rispondono', mirror: true, anchor: 'start' }],
  },
  bed: {
    main: 'M52 336 V168 Q52 150 72 150 Q92 150 92 168 V252 H318 Q344 252 344 278 V336 H326 V306 H70 V336 Z',
    details: [
      'M104 252 Q104 222 136 222 H178 Q198 222 198 240 V252',
      'M198 252 Q258 236 318 252 M226 252 V306 M286 256 V306',
      'M60 196 H84 M60 222 H84',
      'M262 150 A26 26 0 1 0 290 116 A20 20 0 1 1 262 150',
    ],
    notes: [{ x: 360, y: 60, text: 'e poi, il riposo', mirror: true, anchor: 'start' }],
  },
  window: {
    main: 'M100 344 V176 A100 100 0 0 1 300 176 V344 Z',
    details: [
      'M200 76 V344 M100 236 H300',
      'M112 334 Q130 300 152 304 Q170 266 196 274 Q214 242 238 258 Q264 250 278 290 Q292 304 290 334',
      'M268 150 A16 16 0 1 1 236 150 A16 16 0 1 1 268 150',
      'M132 150 q7 -7 14 0 q7 -7 14 0 M168 128 q5 -5 10 0 q5 -5 10 0',
      'M84 344 H316 L306 358 H94 Z',
    ],
    notes: [
      { x: 360, y: 40, text: 'Abuja dalla finestra', mirror: true, anchor: 'start' },
      { x: 200, y: 386, text: 'Aso Rock, at dusk', anchor: 'middle' },
    ],
  },
  chair: {
    main: 'M84 330 V252 Q84 230 106 230 H122 V164 Q122 134 152 134 H240 Q270 134 270 164 V230 H286 Q308 230 308 252 V330 H284 V302 H108 V330 Z',
    details: [
      'M122 264 H270 M122 230 V264 M270 230 V264',
      'M352 330 V150 M334 330 H370',
      'M328 150 H376 L364 108 H340 Z',
      'M320 176 L302 202 M352 170 V194 M384 176 L396 196',
    ],
    notes: [{ x: 300, y: 70, text: 'il tuo spazio', mirror: true, anchor: 'start' }],
  },
  logo: {
    main: LOGO_OUTER,
    details: [],
    wash: [LOGO_RING, LOGO_INNER],
    notes: [],
  },
} satisfies Record<string, Drawing>;

export type ArtKey = keyof typeof art;

/** A faint apartment floor plan used as the slowly turning background. */
export const PLAN =
  'M40 40 H760 V520 H40 Z M46 46 H754 V514 H46 Z M380 40 V250 M380 310 V520 M40 300 H220 M280 300 H380 M560 40 V210 M560 270 V520 M560 360 H760 M420 80 H720 V180 H420 Z M440 90 H560 V130 H440 Z M600 90 H700 V130 H600 Z M80 380 H300 V460 H80 Z M80 400 H300 M150 380 V460 M230 380 V460 M590 470 V400 H740 M620 440 A14 14 0 1 0 648 440 A14 14 0 1 0 620 440 M680 440 A14 14 0 1 0 708 440 A14 14 0 1 0 680 440 M380 250 A60 60 0 0 1 440 310 M220 300 A60 60 0 0 1 280 240 M560 210 A60 60 0 0 1 620 270';
