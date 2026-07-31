import { useEffect, useRef, type FormEvent } from 'react';
import { ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MaskIcon } from './MaskIcon';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export function LoginDialog({ open, onClose, onSignIn }: LoginDialogProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSignIn();
  };
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
      <form onSubmit={submit}>
        <label>
          {t('login.email')}
          <input type="email" placeholder="fan@example.com" required />
        </label>
        <button className="button button--primary" type="submit">
          {t('login.continue')} <ArrowRight size={18} />
        </button>
      </form>
      <div className="security-copy">
        <ShieldCheck size={17} />
        <span>{t('login.security')}</span>
      </div>
    </dialog>
  );
}
