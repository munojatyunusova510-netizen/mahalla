import React, { useState, useEffect } from 'react';
import { Trophy, Award, CheckCircle, Sparkles, Filter } from 'lucide-react';
import AchievementCard from '../components/achievements/AchievementCard';
import { storageService } from '../services/storageService';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const categories = [
    'Barchasi',
    'Obodonlashtirish',
    'Energiya tejamkorlik',
    'Sport va sog\'lom turmush',
    'Yo\'l infratuzilmasi'
  ];

  useEffect(() => {
    const fetchAchs = async () => {
      const data = await storageService.getAchievements();
      setAchievements(data);
    };
    fetchAchs();
  }, []);

  const filtered = selectedCategory === 'Barchasi'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">
            <Trophy size={14} /> Muvaffaqiyatlarimiz
          </span>
          <h1 className="section-title">Mahallamiz Yutuqlari</h1>
          <p className="section-subtitle">
            Aholi faolligi, hasharlar va davlat dasturlari natijasida mahallamizda amalga oshirilgan eng muhim loyihalar va ularning amaliy natijasi.
          </p>
        </div>

        {/* Highlights Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0f5132 0%, #15803d 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.4rem' }}>
              Birlashgan mahalla — yengilmas kuch!
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem' }}>
              Oxirgi bir yilda mahallamizda aholi hayot sifatini yaxshilash borasida erishilgan muhim ko'rsatkichlar:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>1.2 ga</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>Yangi eko-xiyobon hududi</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>120 ta</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>Quyosh panelli chiroqlar</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>3.4 km</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>Yangi asfalt qoplamasi</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>Kamerallashtirilgan hudud</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {filtered.map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
