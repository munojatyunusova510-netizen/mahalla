import React from 'react';
import { HeartHandshake, CheckCircle2, Calendar, ShieldCheck, Gift } from 'lucide-react';

export default function SocialCard({ initiative, onOpenHelp }) {
  return (
    <div className="card social-card">
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--accent-orange-700)',
            backgroundColor: 'var(--accent-orange-50)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(234, 88, 12, 0.2)'
          }}>
            {initiative.code}
          </span>

          <span className="badge badge-category">
            {initiative.category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
          {initiative.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {initiative.description}
        </p>

        {/* Needed items */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-subtle)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Gift size={14} color="var(--primary-700)" />
            Zarur bo'lgan ko'mak turi:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {initiative.neededItems.map((item, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                • {item}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Ko'rsatilgan ko'mak: <strong>{initiative.collectedProgress} ta</strong>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--primary-800)' }}>
              {initiative.progressPercent}%
            </span>
          </div>

          <div className="social-progress-bar">
            <div
              className="social-progress-fill"
              style={{ width: `${Math.min(100, initiative.progressPercent)}%` }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.35rem' }}>
            <span>Reja: {initiative.targetGoal}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Calendar size={13} /> muddat: {initiative.deadline}
            </span>
          </div>

          {/* Verification note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--primary-700)', marginTop: '0.75rem', fontWeight: 500 }}>
            <ShieldCheck size={14} />
            <span>{initiative.verifiedBy}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Maxfiylik kafolatlangan</span>
        <button
          onClick={() => onOpenHelp(initiative)}
          className="btn btn-primary btn-sm"
        >
          <HeartHandshake size={16} />
          <span>Yordam berish</span>
        </button>
      </div>
    </div>
  );
}
