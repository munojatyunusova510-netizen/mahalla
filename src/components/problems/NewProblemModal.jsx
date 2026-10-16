import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Camera, Upload, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import Modal from '../common/Modal';
import { PROBLEM_CATEGORIES } from '../../data/mockData';

const SAMPLE_IMAGES = [
  { label: "Yo'l / Asfalt", url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" },
  { label: "Ko'cha chirog'i", url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80" },
  { label: "O'yin maydonchasi", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80" },
  { label: "Chiqindi / Tozalik", url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" },
  { label: "Suv quvuri", url: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80" }
];

export default function NewProblemModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'roads',
    address: '',
    description: '',
    author: '',
    phone: '',
    image: SAMPLE_IMAGES[0].url
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(SAMPLE_IMAGES[0].url);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = "Muammo sarlavhasini kiritish majburiy";
    } else if (formData.title.trim().length < 5) {
      errs.title = "Sarlavha kamida 5 ta belgidan iborat bo'lsin";
    }

    if (!formData.address.trim()) {
      errs.address = "Aniq manzil yoki mo'ljalni ko'rsatish zarur";
    }

    if (!formData.description.trim()) {
      errs.description = "Muammoni batafsil ta'riflang";
    } else if (formData.description.trim().length < 15) {
      errs.description = "Ta'rif kamida 15 ta belgidan iborat bo'lsin";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Rasm hajmi 5MB dan oshmasligi kerak");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmitSuccess(formData);
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      // Reset
      setFormData({
        title: '',
        category: 'roads',
        address: '',
        description: '',
        author: '',
        phone: '',
        image: SAMPLE_IMAGES[0].url
      });
      setImagePreview(SAMPLE_IMAGES[0].url);
      setErrors({});
      onClose();
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mahalla muammosi haqida xabar berish"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Bekor qilish
          </button>
          <button
            type="submit"
            form="new-problem-form"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Yuborilmoqda..." : "Murojaatni yuborish"}
          </button>
        </div>
      }
    >
      <form id="new-problem-form" onSubmit={handleSubmit} noValidate>
        {/* Info notice */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-200)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--primary-900)',
          marginBottom: '1.25rem',
          lineHeight: 1.45
        }}>
          💡 <strong>Eslatma:</strong> Siz yuborgan murojaat mahalla fuqarolar yig'ini va mas'ul xizmatlar tomonidan ko'rib chiqiladi va hal etish bosqichlari platformada e'lon qilib boriladi.
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="prob-title">
            Muammo sarlavhasi <span className="required">*</span>
          </label>
          <input
            id="prob-title"
            type="text"
            className="form-control"
            placeholder="Masalan: 12-ko'chadagi tungi chiroq ishlamayapti"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <div className="form-error"><AlertCircle size={14} /> {errors.title}</div>}
        </div>

        {/* Category & Address row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="prob-category">
              Kategoriya <span className="required">*</span>
            </label>
            <select
              id="prob-category"
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {PROBLEM_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prob-address">
              Aniq manzil yoki mo'ljal <span className="required">*</span>
            </label>
            <input
              id="prob-address"
              type="text"
              className="form-control"
              placeholder="Masalan: 4-mavze, 12-uy ro'parasi"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {errors.address && <div className="form-error"><AlertCircle size={14} /> {errors.address}</div>}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="prob-desc">
            Batafsil tavsif <span className="required">*</span>
          </label>
          <textarea
            id="prob-desc"
            className="form-textarea"
            rows={4}
            placeholder="Muammoning kelib chiqish sabablari, qachondan beri mavjudligi va qanday xavf yoki noqulaylik tug'dirayotganini tushuntiring..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <div className="form-error"><AlertCircle size={14} /> {errors.description}</div>}
        </div>

        {/* Image upload / selection */}
        <div className="form-group">
          <label className="form-label">
            Muammo rasmi (Foto-dalil)
          </label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={16} />
              <span>O'z qurilmangizdan rasm yuklash</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>yoki namuna tanlang:</span>
          </div>

          {/* Sample images pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {SAMPLE_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className={`filter-pill ${formData.image === sample.url ? 'active' : ''}`}
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
                onClick={() => {
                  setFormData(prev => ({ ...prev, image: sample.url }));
                  setImagePreview(sample.url);
                }}
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* Preview */}
          {imagePreview && (
            <div style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src={imagePreview} alt="Yuklangan rasm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Submitter info (optional) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="prob-author">
              Ismingiz (ixtiyoriy)
            </label>
            <input
              id="prob-author"
              type="text"
              className="form-control"
              placeholder="Masalan: Sardor Aliyev"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prob-phone">
              Telefon raqam (mas'ullar bog'lanishi uchun)
            </label>
            <input
              id="prob-phone"
              type="tel"
              className="form-control"
              placeholder="+998 90 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
