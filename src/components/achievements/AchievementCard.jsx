import React from 'react';
import { Calendar, Award, CheckCircle2 } from 'lucide-react';
import BeforeAfterSlider from '../common/BeforeAfterSlider';

export default function AchievementCard({ achievement }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Interactive Before & After Slider */}
      <BeforeAfterSlider
        beforeImage={achievement.beforeImage}
        afterImage={achievement.afterImage}
        title={achievement.title}
        height="260px"
      />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span className="badge badge-category" style={{ backgroundColor: 'var(--primary-100)', color: 'var(--primary-800)', border: 'none' }}>
            {achievement.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> {achievement.date}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
          {achievement.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          {achievement.description}
        </p>

        {/* Impact banner */}
        <div style={{
          marginTop: 'auto',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          color: 'var(--primary-900)',
          fontSize: '0.85rem'
        }}>
          <Award size={18} color="var(--primary-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Natija va ijtimoiy samara:</strong> {achievement.impact}
          </div>
        </div>
      </div>
    </div>
  );
}
