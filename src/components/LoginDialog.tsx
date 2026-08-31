import { useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MaskIcon } from './MaskIcon';

interface LoginDialogProps {
  open: boolean;
  configured: boolean;
  onClose: () => void;
  onSignIn: () => Promise<void>;
}

export function LoginDialog({ open, configured, onClose, onSignIn }: LoginDialogProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);
  return (
    <dialog ref={ref} className="login-dialog" onClose={onClose}>
      <button
        className="icon-button login-dialog__close"
        onClick={onClose}
        aria-label={t('login.close')}
      >
        <X />
      </button>
      <div className="login-mark">
        <MaskIcon />
      </div>
      <span className="eyebrow">{t('login.eyebrow')}</span>
      <h2>{t('login.title')}</h2>
      <p>{t('login.intro')}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onSignIn();
        }}
      >
        <button className="button button--primary" type="submit" disabled={!configured}>
          {t(configured ? 'login.continue' : 'login.unavailable')} <ArrowRight size={18} />
        </button>
      </form>
      <div className="security-copy">
        <ShieldCheck size={17} />
        <span>{t('login.security')}</span>
      </div>
    </dialog>
  );
}
