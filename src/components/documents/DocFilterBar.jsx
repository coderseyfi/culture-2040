import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import DocFilterMenu from '@/components/documents/DocFilterMenu';
import DocSearchField from '@/components/documents/DocSearchField';
import { useStickyHeaderOffset } from '@/hooks/useStickyHeaderOffset';

const SHEET_OPEN =
  'to-720:!flex to-720:fixed to-720:inset-x-0 to-720:bottom-0 to-720:top-auto to-720:z-[95] to-720:flex-col to-720:items-stretch to-720:gap-3 to-720:rounded-t-[18px] to-720:bg-white to-720:px-[18px] to-720:pb-[26px] to-720:pt-5 to-720:shadow-sheet to-720:[&>*]:w-full';

export default function DocFilterBar({ archive }) {
  const { t } = useTranslation();
  const stickyRef = useStickyHeaderOffset();
  const {
    filters,
    typeOptions,
    organOptions,
    rangePresets,
    openFilter,
    toggleFilterMenu,
    closeFilterMenu,
    setType,
    setOrgan,
    toggleRange,
    chips,
    clearAll,
    sheetOpen,
    toggleSheet,
  } = archive;

  const typeLabel =
    typeOptions.find((option) => option.value === filters.type)?.label ?? filters.type;
  const organLabel =
    organOptions.find((option) => option.value === filters.organ)?.label ?? filters.organ;

  return (
    <div
      ref={stickyRef}
      className="sticky top-[68px] z-20 mb-2 border-b border-hair-7 bg-surface pb-4 pt-[14px]"
    >
      <button
        type="button"
        onClick={toggleSheet}
        className="mb-3 hidden w-full cursor-pointer items-center justify-center gap-[9px] rounded-[10px] border border-hair-20 bg-white p-[13px] font-sans text-[14.5px] font-semibold text-ink to-720:inline-flex"
      >
        <icons.filter size={16} />
        {t('documents.filters')}
        {chips.length > 0 && (
          <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand px-[6px] text-[12px] font-bold text-white">
            {chips.length}
          </span>
        )}
      </button>

      <div
        className={`flex flex-wrap items-center gap-3 to-720:hidden ${sheetOpen ? SHEET_OPEN : ''}`}
      >
        <DocSearchField archive={archive} />

        <DocFilterMenu
          name={t('documents.type')}
          ariaLabel={t('documents.typeAria')}
          value={filters.type}
          valueLabel={typeLabel}
          options={typeOptions}
          open={openFilter === 'type'}
          onToggle={() => toggleFilterMenu('type')}
          onClose={closeFilterMenu}
          onSelect={(value) => {
            setType(value);
            closeFilterMenu();
          }}
        />

        <DocFilterMenu
          name={t('documents.organ')}
          ariaLabel={t('documents.organAria')}
          value={filters.organ}
          valueLabel={organLabel}
          options={organOptions}
          open={openFilter === 'organ'}
          onToggle={() => toggleFilterMenu('organ')}
          onClose={closeFilterMenu}
          onSelect={(value) => {
            setOrgan(value);
            closeFilterMenu();
          }}
          menuWidth="min-w-[210px]"
        />

        <div className="flex flex-wrap items-center gap-[7px]">
          {rangePresets.map((preset) => {
            const active = filters.range === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => toggleRange(preset.value)}
                className={`h-[46px] cursor-pointer rounded-[10px] border border-hair-20 px-[15px] font-sans text-[13.5px] font-semibold transition-colors duration-[180ms] ${
                  active ? 'bg-brand text-white' : 'bg-white text-ink-700'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
          <button
            type="button"
            className="inline-flex h-[46px] cursor-pointer items-center gap-[7px] rounded-[10px] border border-hair-20 bg-white px-[15px] font-sans text-[13.5px] font-semibold text-ink-700 transition-colors duration-[180ms] hover:border-brand hover:text-brand"
          >
            <icons.calendar size={15} />
            {t('documents.pickRange')}
          </button>
        </div>

        <button
          type="button"
          onClick={toggleSheet}
          className="hidden w-full cursor-pointer items-center justify-center rounded-[10px] border-none bg-ink-black p-[13px] font-sans text-[14.5px] font-semibold text-white to-720:inline-flex"
        >
          {t('documents.showResults')}
        </button>
      </div>

      {chips.length > 0 && (
        <div className="mt-[14px] flex flex-wrap items-center gap-[9px]">
          {chips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-[7px] rounded-full border border-brandA-20 bg-brandA-9 py-[5px] pl-3 pr-2 text-[13px] font-medium text-brand"
            >
              {chip.label}
              <button
                type="button"
                onClick={chip.clear}
                aria-label={t('documents.removeFilter')}
                className="inline-flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full border-none bg-brandA-15 p-0 text-brand"
              >
                <icons.close size={11} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="cursor-pointer border-none bg-none p-1 font-sans text-[13px] font-semibold text-ink-600 underline transition-colors duration-[180ms] hover:text-brand"
          >
            {t('documents.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
}
