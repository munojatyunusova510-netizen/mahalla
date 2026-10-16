import React from 'react';
import { MapPin, Calendar, User, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';
import { PROBLEM_CATEGORIES } from '../../data/mockData';

export default function ProblemDetailModal({ problem, isOpen, onClose, onVote }) {
  if (!problem) return null;

  const categoryObj = PROBLEM_CATEGORIES.find(c => c.id === problem.category) || { label: "Umumiy" };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Muammo tafsilotlari"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button
            className={`vote-btn ${problem.hasVoted ? 'voted' : ''}`}
            onClick={() => onVote(problem.id)}
          >
            <ThumbsUp size={16} fill={problem.hasVoted ? "currentColor" : "none"} />
            <span>{problem.votes} kishi ovoz berdi {problem.hasVoted && "(Siz qo'lladingiz)"}</span>
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Yopish
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Main image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxHeight: '360px', backgroundColor: '#000' }}>
          <img
            src={problem.image}
            alt={problem.title}
            style={{ width: '100%', height: '320px', objectFit: 'cover' }}
          />
        </div>

        {/* Status and category pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <StatusBadge status={problem.status} />
          <span className="badge badge-category" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem' }}>
            {categoryObj.label}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginLeft: 'auto' }}>
            ID: #{problem.id}
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '1.45rem', color: 'var(--text-main)', lineHeight: 1.35 }}>
          {problem.title}
        </h2>

        {/* Description */}
        <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {problem.description}
        </div>

        {/* Official response */}
        {problem.officialResponse ? (
          <div style={{
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginTop: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ShieldCheck size={20} />
              <span>Mahalla boshqaruvi va mutasaddi tashkilot javobi:</span>
            </div>
            <p style={{ color: 'var(--primary-950)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
              {problem.officialResponse}
            </p>
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.88rem',
            color: 'var(--text-subtle)',
            textAlign: 'center'
          }}>
            Ushbu murojaat mutasaddilar tomonidan ko'rib chiqish navbatida turibdi. Natija haqida shu yerda ma'lum qilinadi.
          </div>
        )}

        {/* Meta details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.88rem'
        }}>
          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Manzil</div>
            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="var(--primary-700)" />
              {problem.address}
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Yuborilgan sana</div>
            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} />
              {problem.date}
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>Murojaatchi</div>
            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} />
              {problem.author}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
