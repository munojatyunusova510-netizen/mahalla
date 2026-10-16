import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="region" aria-label="Xabarlar">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`toast ${isError ? 'toast-error' : isInfo ? 'toast-info' : ''}`}
            role="status"
          >
            {isError ? (
              <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : isInfo ? (
              <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <CheckCircle2 size={20} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                {toast.title}
              </div>
              {toast.message && (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              style={{ color: 'var(--text-subtle)', padding: '2px', display: 'flex' }}
              aria-label="Xabarni yopish"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
