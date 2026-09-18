import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/Button';
import Field from '@/components/Field';
import OrDivider from '@/components/OrDivider';
import { ROUTES } from '@/constants/routes';

export default function Register() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      icon={<icons.userPlus size={24} color="#fff" />}
      title={t('auth.registerTitle')}
      subtitle={t('auth.registerText')}
      maxWidth="max-w-[520px]"
    >
      <div className="mb-[18px] grid grid-cols-2 gap-[14px] to-360:grid-cols-1 to-360:gap-[18px]">
        <Field label={t('auth.firstName')} type="text" placeholder={t('auth.firstName')} />
        <Field label={t('auth.lastName')} type="text" placeholder={t('auth.lastName')} />
      </div>

      <Field
        label={t('auth.email')}
        type="email"
        placeholder={t('auth.identityPlaceholder')}
        className="mb-[18px]"
      />

      <Field
        label={t('auth.phone')}
        type="tel"
        placeholder={t('auth.phonePlaceholder')}
        className="mb-[18px]"
      />

      <Field
        label={t('auth.password')}
        type="password"
        placeholder={t('auth.passwordPlaceholder')}
        hint={t('auth.passwordHelp')}
        className="mb-[18px]"
      />

      <Field
        label={t('auth.passwordConfirm')}
        type="password"
        placeholder={t('auth.passwordPlaceholder')}
        className="mb-5"
      />

      <label className="mb-6 flex cursor-pointer items-start gap-[10px] text-[13.5px] leading-[1.5] text-ink-700">
        <input
          type="checkbox"
          className="mt-[2px] h-4 w-4 flex-none cursor-pointer accent-brand"
        />
        <span>
          {/* Söz sırası dillərə görə dəyişdiyi üçün cümlə bütöv tərcümə olunur. */}
          <Trans
            i18nKey="auth.terms"
            components={[
              <span key="0" />,
              <a
                key="1"
                href="#"
                onClick={(event) => event.preventDefault()}
                className="font-semibold text-brand"
              />,
              <span key="2" />,
              <a
                key="3"
                href="#"
                onClick={(event) => event.preventDefault()}
                className="font-semibold text-brand"
              />,
            ]}
          />
        </span>
      </label>

      <Button variant="dark" size="block" className="mb-4">
        {t('auth.registerButton')}
      </Button>

      <OrDivider />

      <Button variant="outlineStrong" size="blockSm" className="text-ink">
        <icons.mail size={18} />
        {t('auth.asanRegister')}
      </Button>

      <p className="m-0 mt-6 text-center text-[14px] text-ink-600">
        {t('auth.hasAccount')}{' '}
        <Link to={ROUTES.LOGIN} className="font-semibold text-brand">
          {t('auth.loginLink')}
        </Link>
      </p>
    </AuthLayout>
  );
}
