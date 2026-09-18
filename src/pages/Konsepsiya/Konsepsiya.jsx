import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PageHero from '@/components/PageHero';
import { CONCEPT_SECTIONS, CONCEPT_TOC } from '@/constants/concept';
import { ROUTES } from '@/constants/routes';

/** Məqalə bloklarını tipinə görə render edir. */
function ArticleBlock({ block, t }) {
  const style = { marginBottom: `${block.mb}px` };

  if (block.type === 'list') {
    return (
      <ul className="flex list-disc flex-col gap-[10px] pl-[22px]" style={style}>
        {block.itemKeys.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        className="rounded-r-[10px] border-l-[3px] border-brand bg-surface-soft px-[26px] py-5 text-[18px] text-ink-800 to-540:px-4 to-540:text-[16px]"
        style={style}
      >
        {t(block.textKey)}
      </blockquote>
    );
  }

  return <p style={style}>{t(block.textKey)}</p>;
}

export default function Konsepsiya() {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: ROUTES.HOME },
          { label: t('concept.breadcrumb'), to: ROUTES.KONSEPSIYA },
          { label: t('concept.title') },
        ]}
      />

      <PageHero
        eyebrow={t('concept.eyebrow')}
        title={t('concept.title')}
        description={t('concept.lead')}
        descriptionTone="text-ink-600"
        eyebrowSpacing="mb-[14px]"
        paddingBottom="pb-11"
      />

      <section className="bg-surface">
        <Container className="grid grid-cols-[240px_minmax(0,1fr)] items-start gap-14 pb-[88px] pt-[52px] to-lg:grid-cols-1 to-lg:gap-0 to-640:pb-12 to-640:pt-8">
          <aside className="sticky top-[92px] to-lg:hidden">
            <div className="mb-4 text-[12px] font-semibold tracking-[0.06em] text-ink-500">
              {t('concept.toc')}
            </div>
            <nav className="flex flex-col gap-[2px] border-l border-hair-10">
              {CONCEPT_TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="-ml-px border-l-2 border-transparent py-[7px] pl-4 text-[14px] text-ink-600 transition-colors duration-[180ms] hover:border-brand hover:text-brand"
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>
            <Button
              href="#"
              onClick={(event) => event.preventDefault()}
              variant="brand"
              size="sm"
              className="mt-7"
            >
              <icons.download size={16} />
              {t('common.downloadPdf')}
            </Button>
          </aside>

          <article className="max-w-prose text-[17px] leading-[1.75] text-ink-800 to-540:text-[15.5px]">
            {CONCEPT_SECTIONS.map((section) => (
              <section key={section.id}>
                <h2
                  id={section.id}
                  className="m-0 mb-4 scroll-mt-[92px] text-[26px] font-semibold tracking-[-0.01em] text-ink to-540:text-[21px]"
                >
                  {t(section.headingKey)}
                </h2>
                {section.blocks.map((block, index) => (
                  <ArticleBlock key={`${section.id}-${index}`} block={block} t={t} />
                ))}
              </section>
            ))}

            <div className="mt-2 flex flex-wrap gap-3 to-360:[&>*]:w-full to-360:[&>*]:justify-center">
              <Button href="#" onClick={(event) => event.preventDefault()} variant="dark" size="md">
                {t('home.ctaPlan')}
                <icons.arrowRight size={16} />
              </Button>
              <Button to={ROUTES.HOME} variant="outline" size="md">
                {t('common.backHome')}
              </Button>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
