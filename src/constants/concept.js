/**
 * Konsepsiya səhifəsinin quruluşu.
 * Bütün mətnlər tərcümə açarları ilə gəlir (`concept.*`),
 * `mb` — orijinal dizayndakı margin-bottom (px).
 */
export const CONCEPT_TOC = [
  { id: 'meqsed', labelKey: 'concept.meqsedTitle' },
  { id: 'prinsipler', labelKey: 'concept.prinsiplerTitle' },
  { id: 'baxis', labelKey: 'concept.baxisTitle' },
  { id: 'istiqametler', labelKey: 'concept.istiqametlerTitle' },
  { id: 'merhelelor', labelKey: 'concept.merhelelerTitle' },
];

export const CONCEPT_SECTIONS = [
  {
    id: 'meqsed',
    headingKey: 'concept.meqsedTitle',
    blocks: [
      { type: 'p', mb: 20, textKey: 'concept.meqsedP1' },
      { type: 'p', mb: 32, textKey: 'concept.meqsedP2' },
    ],
  },
  {
    id: 'prinsipler',
    headingKey: 'concept.prinsiplerTitle',
    blocks: [
      { type: 'p', mb: 16, textKey: 'concept.prinsiplerP1' },
      {
        type: 'list',
        mb: 32,
        itemKeys: [
          'concept.prinsiplerItem1',
          'concept.prinsiplerItem2',
          'concept.prinsiplerItem3',
          'concept.prinsiplerItem4',
          'concept.prinsiplerItem5',
        ],
      },
    ],
  },
  {
    id: 'baxis',
    headingKey: 'concept.baxisTitle',
    blocks: [
      { type: 'p', mb: 20, textKey: 'concept.baxisP1' },
      { type: 'quote', mb: 32, textKey: 'concept.baxisQuote' },
    ],
  },
  {
    id: 'istiqametler',
    headingKey: 'concept.istiqametlerTitle',
    blocks: [
      { type: 'p', mb: 20, textKey: 'concept.istiqametlerP1' },
      { type: 'p', mb: 32, textKey: 'concept.istiqametlerP2' },
    ],
  },
  {
    id: 'merhelelor',
    headingKey: 'concept.merhelelerTitle',
    blocks: [{ type: 'p', mb: 20, textKey: 'concept.merhelelerP1' }],
  },
];
