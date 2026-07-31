import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <label className="language-switcher">
      <Languages aria-hidden="true" />
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage ?? 'en'}
        onChange={(event) => void i18n.changeLanguage(event.target.value as SupportedLanguage)}
        aria-label={t('language.label')}
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language}>
            {language.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
