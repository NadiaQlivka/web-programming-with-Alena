import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.content}>

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </button>

        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {children && (
          <div className={styles.body}>
            {children}
          </div>
        )}

        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}

      </div>
    </dialog>
  );
}