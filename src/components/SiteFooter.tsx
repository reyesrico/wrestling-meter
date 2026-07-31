import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { MaskIcon } from './MaskIcon';

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="shell">
        <Link className="brand brand--footer" to="/">
          <span className="brand__mask">
            <MaskIcon />
          </span>
          <span>
            WRESTLE
            <br />
            <b>METER</b>
          </span>
        </Link>
        <p>{t('footer.copy')}</p>
        <span>{t('footer.prototype', { season: 2026 })}</span>
      </div>
    </footer>
  );
}
