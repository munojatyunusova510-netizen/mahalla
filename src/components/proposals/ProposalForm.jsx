import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, AlertTriangle, Lightbulb, CheckCircle2, Copy, Check } from 'lucide-react';

export default function ProposalForm({ onSubmitProposal }) {
  const [type, setType] = useState('taklif'); // 'taklif' | 'shikoyat'
  const [formData, setFormData] = useState({
    title: '',
    category: "Obodonlashtirish",
    description: '',
    fullName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdResult, setCreatedResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const categories = [
    "Obodonlashtirish va ko'kalamzorlashtirish",
    "Kommunal va infratuzilma",
    "Yo'l harakati va xavfsizlik",
    "Yoshlar va ta'lim",
    "Ijtimoiy himoya",
    "Ekologiya va tozalik",
    "Boshqa masala"
  ];

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = "Murojaat sarlavhasi majburiy";
    }
    if (!formData.description.trim()) {
      errs.description = "Batafsil mazmunini yozing";
    } else if (formData.description.trim().length < 15) {
      errs.description = "Mazmun kamida 15 ta belgidan iborat bo'lishi kerak";
    }
    if (!formData.fullName.trim()) {
      errs.fullName = "F.I.Sh kiritish majburiy";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Bog'lanish uchun telefon raqam kiritilishi shart";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmitProposal({ ...formData, type });
      setCreatedResult(result);
      confetti({
        particleCount: 85,
        spread: 60,
        origin: { y: 0.6 }
      });
      // reset form
      setFormData({
        title: '',
        category: "Obodonlashtirish",
        description: '',
        fullName: '',
        phone: ''
      });
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (createdResult?.trackingCode) {
      navigator.clipboard.writeText(createdResult.trackingCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      {/* Type Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
        <button
          type="button"
          onClick={() => { setType('taklif'); setCreatedResult(null); }}
          className="btn"
          style={{
            flex: 1,
            backgroundColor: type === 'taklif' ? 'var(--primary-800)' : 'var(--bg-subtle)',
            color: type === 'taklif' ? '#ffffff' : 'var(--text-main)',
            border: type === 'taklif' ? 'none' : '1px solid var(--border-subtle)'
          }}
        >
          <Lightbulb size={18} />
          <span>Taklif yuborish</span>
        </button>

        <button
          type="button"
          onClick={() => { setType('shikoyat'); setCreatedResult(null); }}
          className="btn"
          style={{
            flex: 1,
            backgroundColor: type === 'shikoyat' ? '#c2410c' : 'var(--bg-subtle)',
            color: type === 'shikoyat' ? '#ffffff' : 'var(--text-main)',
            border: type === 'shikoyat' ? 'none' : '1px solid var(--border-subtle)'
          }}
        >
          <AlertTriangle size={18} />
          <span>Shikoyat yuborish</span>
        </button>
      </div>

      {createdResult ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          backgroundColor: 'var(--primary-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--primary-200)'
        }}>
          <CheckCircle2 size={56} color="var(--primary-700)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-950)', marginBottom: '0.5rem' }}>
            Murojaatingiz muvaffaqiyatli qabul qilindi!
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
            Murojaat mahalla fuqarolar yig'ini devonxonasida ro'yxatga olindi. Holatini tekshirish uchun ushbu maxsus kodni saqlab qo'ying:
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: '#ffffff',
            padding: '0.85rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed var(--primary-600)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', letterSpacing: '0.05em' }}>
              {createdResult.trackingCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="btn btn-secondary btn-sm"
              title="Kodni nusxalash"
            >
              {isCopied ? <Check size={16} color="var(--primary-700)" /> : <Copy size={16} />}
              <span>{isCopied ? "Nusxalandi" : "Nusxa olish"}</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => setCreatedResult(null)}
              className="btn btn-primary btn-sm"
            >
              Yangi murojaat yozish
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="prop-title">
              {type === 'taklif' ? "Taklifingiz sarlavhasi" : "Shikoyatingiz mavzusi"} <span className="required">*</span>
            </label>
            <input
              id="prop-title"
              type="text"
              className="form-control"
              placeholder={type === 'taklif' ? "Masalan: Mahalla hududida yoshlar kutubxonasi ochish taklifi" : "Masalan: Chiqindilar o'z vaqtida olib ketilmayotgani yuzasidan"}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prop-cat">
              Yo'nalish / Kategoriya <span className="required">*</span>
            </label>
            <select
              id="prop-cat"
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prop-desc">
              Batafsil mazmuni <span className="required">*</span>
            </label>
            <textarea
              id="prop-desc"
              rows={4}
              className="form-textarea"
              placeholder={type === 'taklif' ? "Taklifingiz mahallaga qanday foyda keltiradi? Uni amalga oshirish bo'yicha qanday fikrlaringiz bor?" : "Shikoyat yuz bergan joy, vaqt va holatni aniq bayon qiling..."}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="prop-name">
                F.I.Sh <span className="required">*</span>
              </label>
              <input
                id="prop-name"
                type="text"
                className="form-control"
                placeholder="Masalan: Anvar Rustamov"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <div className="form-error">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prop-phone">
                Telefon raqamingiz <span className="required">*</span>
              </label>
              <input
                id="prop-phone"
                type="tel"
                className="form-control"
                placeholder="+998 90 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={isSubmitting}
          >
            <Send size={18} />
            <span>{isSubmitting ? "Yuborilmoqda..." : `${type === 'taklif' ? 'Taklifni' : 'Shikoyatni'} rasmiylashtirish`}</span>
          </button>
        </form>
      )}
    </div>
  );
}
