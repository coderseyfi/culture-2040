import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/Container';
import PageHero from '@/components/PageHero';
import DataState from '@/components/DataState';
import DocEmptyState from '@/components/documents/DocEmptyState';
import DocFilterBar from '@/components/documents/DocFilterBar';
import DocPagination from '@/components/documents/DocPagination';
import DocPreviewDrawer from '@/components/documents/DocPreviewDrawer';
import DocTable from '@/components/documents/DocTable';
import DocTableSkeleton from '@/components/documents/DocTableSkeleton';
import { ROUTES } from '@/constants/routes';
import { useDocumentArchive } from '@/hooks/useDocumentArchive';

export default function Senedler() {
  const { t } = useTranslation();
  const archive = useDocumentArchive();

  return (
    <>
      <Breadcrumbs
        items={[{ label: t('nav.home'), to: ROUTES.HOME }, { label: t('documents.title') }]}
      />

      <PageHero
        eyebrow={t('documents.eyebrow')}
        title={t('documents.title')}
        description={t('documents.lead')}
      />

      <section className="bg-surface">
        <Container className="pb-20 pt-8 to-640:pb-12">
          <DocFilterBar archive={archive} />

          <div className="mb-[14px] mt-[18px] flex flex-wrap items-center justify-between gap-3">
            <span className="text-[14px] font-medium text-ink-700">{archive.countLabel}</span>

            {archive.selectedCount > 0 && (
              <div className="flex flex-wrap items-center gap-[10px]">
                <span className="text-[13.5px] font-semibold text-brand">
                  {t('documents.selected', { value: archive.selectedCount })}
                </span>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-[7px] rounded-[9px] border-none bg-ink-black px-4 py-[9px] font-sans text-[13.5px] font-semibold text-white transition-colors duration-[180ms] hover:bg-black"
                >
                  <icons.download size={15} />
                  {t('documents.downloadZip')}
                </button>
                <button
                  type="button"
                  onClick={archive.clearSelection}
                  className="cursor-pointer border-none bg-none p-1 font-sans text-[13px] font-semibold text-ink-600 underline transition-colors duration-[180ms] hover:text-brand"
                >
                  {t('documents.clearSelection')}
                </button>
              </div>
            )}
          </div>

          {archive.error && (
            <DataState error={archive.error} onRetry={archive.retry} />
          )}

          {archive.loading && !archive.error && <DocTableSkeleton />}

          {archive.hasDocs && (
            <>
              <DocTable archive={archive} />
              <DocPagination archive={archive} />
            </>
          )}

          {archive.noDocs && <DocEmptyState onClear={archive.clearAll} />}

          <DocPreviewDrawer archive={archive} />
        </Container>
      </section>
    </>
  );
}
