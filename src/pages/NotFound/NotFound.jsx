import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface">
      <Container className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center py-20 text-center to-540:py-12">
        <div className="mb-4 text-[64px] font-light leading-none tracking-[-0.025em] text-brand to-540:text-[48px]">
          404
        </div>
        <h1 className="m-0 mb-[14px] text-[32px] font-light tracking-[-0.02em] text-ink to-540:text-[26px]">
          {t('notFound.title')}
        </h1>
        <p className="m-0 mb-8 max-w-[440px] text-[16px] leading-[1.6] text-ink-600">
          {t('notFound.text')}
        </p>
        <Button to={ROUTES.HOME} variant="dark" size="md">
          {t('common.backHome')}
        </Button>
      </Container>
    </section>
  );
}
