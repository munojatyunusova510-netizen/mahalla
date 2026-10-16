import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Users, HeartHandshake, CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';

export default function VolunteerModal({ isOpen, onClose, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    skills: ['Hashar va obodonlik'],
    availability: 'Dam olish kunlari',
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSkills = [
    "Hashar va obodonlashtirish",
    "Keksa nuroniylar va bemorlarga ko'mak",
    "Yoshlarga fan / til o'rgatish (repetitorlik)",
    "Kompyuter va IT savodxonligi darslari",
    "Sport musobaqalarini tashkil etish",
    "Avtotransport va yuk tashish yordami"
  ];

  const handleToggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    } else {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert("Iltimos, ism va telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onRegisterSuccess(formData);
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
      title="Mahalla ko'ngillilari (Volontyorlar) safiga qo'shilish"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
            Bekor qilish
          </button>
          <button
            type="submit"
            form="volunteer-form"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ro'yxatga olinmoqda..." : "Ko'ngilli bo'lib yozilish"}
          </button>
        </div>
      }
    >
      <form id="volunteer-form" onSubmit={handleSubmit}>
        <div style={{
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          border: '1px solid var(--primary-200)',
          marginBottom: '1.25rem',
          fontSize: '0.88rem',
          color: 'var(--primary-900)',
          lineHeight: 1.5
        }}>
          🤝 <strong>Mahallamiz ravnaqi o'z qo'limizda!</strong> Sizning mehnatingiz, bilimlaringiz va ezgu tashabbusingiz yordamga muhtoj hamyurtlarimizga yangi umid bag'ishlaydi.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="vol-name">
              F.I.Sh <span className="required">*</span>
            </label>
            <input
              id="vol-name"
              type="text"
              required
              className="form-control"
              placeholder="Masalan: Jamshid To'rayev"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="vol-phone">
              Telefon raqam <span className="required">*</span>
            </label>
            <input
              id="vol-phone"
              type="tel"
              required
              className="form-control"
              placeholder="+998 90 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Qaysi yo'nalishlarda ko'maklasha olasiz? (Bir nechtasini tanlashingiz mumkin)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
            {availableSkills.map((skill, idx) => {
              const isChecked = formData.skills.includes(skill);
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleSkill(skill)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: isChecked ? '1px solid var(--primary-700)' : '1px solid var(--border-subtle)',
                    backgroundColor: isChecked ? 'var(--primary-50)' : '#ffffff',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{ accentColor: 'var(--primary-700)' }}
                  />
                  <span>{skill}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vol-comment">
            Qo'shimcha taklif yoki izohlaringiz
          </label>
          <textarea
            id="vol-comment"
            className="form-textarea"
            rows={3}
            placeholder="Qachon va qanday sharoitda faol qatnasha olishingiz haqida qisqacha..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
}
