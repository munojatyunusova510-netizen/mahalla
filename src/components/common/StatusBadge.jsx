import React from 'react';
import { Clock, CheckCircle2, AlertCircle, RefreshCw, Send, FileCheck } from 'lucide-react';

export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  switch (normalized) {
    case 'yangi':
    case 'yuborildi':
      return (
        <span className="badge badge-status-yangi">
          <Send size={13} />
          <span>{normalized === 'yuborildi' ? 'Yuborildi' : 'Yangi'}</span>
        </span>
      );

    case 'korib_chiqilmoqda':
    case 'qabul_qilindi':
      return (
        <span className="badge badge-status-korib-chiqilmoqda">
          <Clock size={13} />
          <span>{normalized === 'qabul_qilindi' ? 'Qabul qilindi' : "Ko'rib chiqilmoqda"}</span>
        </span>
      );

    case 'jarayonda':
    case 'ijroga_qaratildi':
      return (
        <span className="badge badge-status-jarayonda">
          <RefreshCw size={13} className="spin-slow" />
          <span>{normalized === 'ijroga_qaratildi' ? 'Ijroga qaratildi' : 'Jarayonda'}</span>
        </span>
      );

    case 'hal_qilindi':
    case 'tasdiqlandi':
      return (
        <span className="badge badge-status-hal-qilindi">
          <CheckCircle2 size={13} />
          <span>Hal qilindi</span>
        </span>
      );

    default:
      return (
        <span className="badge badge-category">
          <AlertCircle size={13} />
          <span>{status}</span>
        </span>
      );
  }
}
