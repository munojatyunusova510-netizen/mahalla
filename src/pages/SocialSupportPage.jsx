import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  ShieldAlert,
  Users,
  CheckCircle2,
  Gift,
  HandHeart,
  Lock
} from 'lucide-react';
import SocialCard from '../components/social/SocialCard';
import { storageService } from '../services/storageService';

export default function SocialSupportPage({
  onOpenHelp,
  onOpenVolunteer
}) {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await storageService.getSocialInitiatives();
    setInitiatives(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <span className="section-eyebrow" style={{ backgroundColor: 'var(--accent-orange-50)', color: 'var(--accent-orange-700)' }}>
              <HeartHandshake size={14} /> Saxovat va birdamlik
            </span>
            <h1 className="section-title" style={{ margin: 0 }}>Ijtimoiy Qo'llab-quvvatlash</h1>
            <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
              Kam ta'minlangan oilalar, keksalar va ehtiyojmand fuqarolarga yordam ko'rsatishning yagona shaffof maydoni.
            </p>
          </div>

          <button
            onClick={onOpenVolunteer}
            className="btn btn-secondary btn-lg"
          >
            <Users size={20} color="var(--primary-800)" />
            <span>Ko'ngilli (Volontyor) bo'lish</span>
          </button>
        </div>

        {/* Mandatory Legal & Ethical Notice Banner */}
        <div className="confidential-banner">
          <Lock size={26} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            <strong>Shaxsiy daxlsizlik va xavfsizlik kafolati:</strong>
            <p style={{ margin: '0.35rem 0' }}>
              Inson qadri va sha'nini e'zozlash maqsadida ehtiyojmand oilalarning familiyasi, telefon raqami, fotosuratlari va aniq uy manzili ochiq e'lon qilinmaydi.
              Barcha ehtiyojlar <strong>Mahalla ijtimoiy xodimi</strong> va <strong>Xotin-qizlar faoli</strong> tomonidan joyiga chiqib to'liq o'rganilgan va tasdiqlangan.
            </p>
            <div style={{ color: '#78350f', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.5rem' }}>
              ⚠️ Eslatma: Ushbu platforma prototip bosqichida bo'lib, to'g'ridan-to'g'ri bank kartalaridan pul yig'ish funksiyasi faqat xavfsiz davlat to'lov shlyuzlari (Click/Payme) integratsiya qilingandan so'ng yo'lga qo'yiladi. Hozirda yordam ariza va moddiy ko'rinishda (buyum, dori, hashar) qabul qilinadi.
            </div>
          </div>
        </div>

        {/* 4 Core Principles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <ShieldCheck size={18} />
              <span>100% Tasdiqlangan</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Har bir holat mas'ul mutaxassislar tomonidan asosli ravishda kiritilgan.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <Gift size={18} />
              <span>Aniq manzilga yetkazish</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Yordam vositalari dalolatnoma va jamoatchilik vakillari ishtirokida topshiriladi.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <HandHeart size={18} />
              <span>Ixtiyoriylik</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Har bir fuqaro o'z imkoniyatidan kelib chiqib ehson yoki mehnat bilan qatnashishi mumkin.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <CheckCircle2 size={18} />
              <span>Shaffof hisobot</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Ko'rsatilgan ko'mak natijalari umumiy hisobot shaklida doimiy e'lon qilinadi.
            </p>
          </div>
        </div>

        {/* Initiatives Grid */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
          Hozirda faol bo'lgan yordam yo'nalishlari
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>Yuklanmoqda...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {initiatives.map((item) => (
              <SocialCard
                key={item.id}
                initiative={item}
                onOpenHelp={onOpenHelp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
