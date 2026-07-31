import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function NotFoundPage() {
  const { t } = useTranslation()
  return <main className="not-found shell"><span>404</span><h1>{t('notFound.title')}</h1><p>{t('notFound.copy')}</p><Link className="button button--primary" to="/">{t('notFound.action')}</Link></main>
}