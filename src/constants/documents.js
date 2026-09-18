/** Format → ikon açarı (`@/assets/icons/icons`). */
export const FORMAT_ICONS = {
  PDF: 'filePdf',
  DOCX: 'fileDocx',
  XLSX: 'fileXlsx',
};

/**
 * Tarix aralığı presetləri. API bu filtri dəstəkləmir, ona görə klient
 * tərəfdə tətbiq olunur.
 */
export const RANGE_KEYS = ['30', 'year', 'lastYear'];

export const PER_PAGE_OPTIONS = [12, 25, 50];

export const ALL = 'all';

export const DEFAULT_FILTERS = {
  q: '',
  type: ALL,
  organ: ALL,
  range: null,
  sortKey: 'date',
  sortDir: 'desc',
  page: 1,
  perPage: 12,
};

/** Skelet sətirlərinin başlıq enləri. */
export const SKELETON_WIDTHS = ['72%', '58%', '80%', '64%', '75%', '52%'];
