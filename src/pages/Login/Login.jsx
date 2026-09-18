import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/Button';
import Field from '@/components/Field';
import OrDivider from '@/components/OrDivider';
import { ROUTES } from '@/constants/routes';

export default function Login() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      icon={<icons.user size={24} color="#fff" />}
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginText')}
      subtitleTone="text-ink-500"
      backTone="text-ink-500"
    >
      <Field
        label={t('auth.identity')}
        type="text"
        placeholder={t('auth.identityPlaceholder')}
        border="soft"
        className="mb-[18px]"
      />

      <Field
        label={t('auth.password')}
        type="password"
        placeholder={t('auth.passwordPlaceholder')}
        border="soft"
        className="mb-[18px]"
        labelAction={
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="text-[13px] font-medium text-brand"
          >
            {t('auth.forgot')}
          </a>
        }
      />

      <label className="mb-6 flex cursor-pointer items-center gap-[9px] text-[14px] text-ink-600">
        <input type="checkbox" className="h-4 w-4 cursor-pointer accent-brand" />
        {t('auth.remember')}
      </label>

      <Button variant="dark" size="block" className="mb-4">
        {t('auth.loginButton')}
      </Button>

      <OrDivider tone="text-ink-400" />

      <Button variant="outline" size="blockSm">
        <icons.mail size={18} />
        {t('auth.asanLogin')}
      </Button>

      <p className="m-0 mt-6 text-center text-[14px] text-ink-600">
        {t('auth.noAccount')}{' '}
        <Link to={ROUTES.REGISTER} className="font-semibold text-brand">
          {t('auth.registerLink')}
        </Link>
      </p>
    </AuthLayout>
  );
}
