import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HeartHandshake, ShieldAlert, Package, Users, Phone, CheckCircle, Info } from 'lucide-react';
import Modal from '../common/Modal';

export default function DonateModal({ initiative, isOpen, onClose, onSuccess }) {
  const [helpType, setHelpType] = useState('goods'); // 'goods', 'volunteer', 'contact'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    itemDetails: '',
    convenientTime: 'Kun davomida'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!initiative) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert("Iltimos, ismingiz va telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSuccess(initiative.id, { helpType, ...formData });
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ijtimoiy yordam ko'rsatish"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Bekor qilish
          </button>
          <button
            type="submit"
            form="donate-help-form"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Yuborilmoqda..." : "Yordam arizasini tasdiqlash"}
          </button>
        </div>
      }
    >
      <form id="donate-help-form" onSubmit={handleSubmit}>
        {/* Initiative info banner */}
        <div style={{
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          border: '1px solid var(--primary-200)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 700 }}>
            TANLANGAN TASHABBUS:
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            {initiative.title} ({initiative.code})
          </div>
        </div>

        {/* Essential confidentiality & payment notice */}
        <div className="confidential-banner" style={{ margin: '0 0 1.25rem 0' }}>
          <ShieldAlert size={24} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
            <strong>Muhim qoidalar:</strong> Oilalarning ismi, telefon raqami va aniq uy manzili ularning sha'ni va qonun talabiga binoan ochiq ko'rsatilmaydi.
            Barcha ko'mak mahalla mas'ul xodimi nazorati ostida rasmiy dalolatnoma bilan yetkaziladi.
            <div style={{ marginTop: '0.4rem', color: '#78350f', fontWeight: 600 }}>
              💳 Haqiqiy to'lov tizimlari (Click/Payme) xavfsiz backend integratsiyasidan so'ng faollashtiriladi. Hozirda arizalar ro'yxatga olinadi.
            </div>
          </div>
        </div>

        {/* Selection of Help Format */}
        <div className="form-group">
          <label className="form-label">
            Ko'rsatmoqchi bo'lgan yordam shaklini tanlang:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div
              onClick={() => setHelpType('goods')}
              style={{
                border: helpType === 'goods' ? '2px solid var(--primary-700)' : '1px solid var(--border-strong)',
                backgroundColor: helpType === 'goods' ? 'var(--primary-50)' : '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              <Package size={22} color={helpType === 'goods' ? "var(--primary-800)" : "var(--text-muted)"} />
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '0.4rem' }}>Buyum / Mahsulot</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Kiyim-kechak, o'quv qurollari, dori yoki qurilish moli
              </div>
            </div>

            <div
              onClick={() => setHelpType('volunteer')}
              style={{
                border: helpType === 'volunteer' ? '2px solid var(--primary-700)' : '1px solid var(--border-strong)',
                backgroundColor: helpType === 'volunteer' ? 'var(--primary-50)' : '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              <Users size={22} color={helpType === 'volunteer' ? "var(--primary-800)" : "var(--text-muted)"} />
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '0.4rem' }}>Shaxsiy mehnat / Ko'ngillilik</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Ta'mirlash, transport, tibbiy ko'rik yoki dars berish
              </div>
            </div>
          </div>
        </div>

        {/* Contact inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="don-name">
              F.I.Sh (Saxiy fuqaro yoki tashkilot nomi) <span className="required">*</span>
            </label>
            <input
              id="don-name"
              type="text"
              required
              className="form-control"
              placeholder="Masalan: Dilshod Rahimov"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="don-phone">
              Telefon raqamingiz <span className="required">*</span>
            </label>
            <input
              id="don-phone"
              type="tel"
              required
              className="form-control"
              placeholder="+998 90 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Details */}
        <div className="form-group">
          <label className="form-label" htmlFor="don-items">
            Yordam tafsilotlari (qanday buyumlar yoki xizmat taqdim eta olasiz?)
          </label>
          <textarea
            id="don-items"
            className="form-textarea"
            rows={3}
            placeholder="Masalan: 3 ta to'liq maktab sumkasi va daftarlar to'plami yetkazib bera olaman..."
            value={formData.itemDetails}
            onChange={(e) => setFormData({ ...formData, itemDetails: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
}
