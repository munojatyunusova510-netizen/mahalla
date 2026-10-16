import React from 'react';
import { MapPin, Calendar, ThumbsUp, User, MessageCircle, CheckCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { PROBLEM_CATEGORIES } from '../../data/mockData';

export default function ProblemCard({ problem, onVote, onOpenDetail }) {
  const categoryObj = PROBLEM_CATEGORIES.find(c => c.id === problem.category) || { label: "Umumiy" };

  return (
    <div className="card problem-card">
      <div className="problem-image-box">
        <img
          src={problem.image}
          alt={problem.title}
          className="problem-image"
          loading="lazy"
        />
        <div className="problem-status-pill">
          <StatusBadge status={problem.status} />
        </div>
        <div className="problem-category-pill">
          {categoryObj.label}
        </div>
      </div>

      <div className="problem-content">
        <h3
          className="problem-title"
          onClick={() => onOpenDetail(problem)}
          style={{ cursor: 'pointer' }}
          title={problem.title}
        >
          {problem.title}
        </h3>

        <p className="problem-desc">
          {problem.description}
        </p>

        {problem.officialResponse && (
          <div style={{
            background: 'var(--primary-50)',
            borderLeft: '3px solid var(--primary-700)',
            padding: '0.65rem 0.85rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            color: 'var(--primary-900)',
            marginBottom: '1rem',
            lineHeight: 1.4
          }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-800)', marginBottom: '2px' }}>
              <CheckCircle size={13} /> Mahalla mas'uli javobi:
            </strong>
            {problem.officialResponse}
          </div>
        )}

        <div className="problem-meta">
          <div className="problem-meta-row">
            <MapPin size={14} color="var(--primary-700)" />
            <span style={{ fontWeight: 500 }}>{problem.address}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="problem-meta-row">
              <Calendar size={14} />
              <span>{problem.date}</span>
            </div>
            <div className="problem-meta-row">
              <User size={14} />
              <span>{problem.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="problem-footer">
        <button
          className={`vote-btn ${problem.hasVoted ? 'voted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVote(problem.id);
          }}
          title={problem.hasVoted ? "Ovozingizni qaytarib olish" : "Ushbu muammoga ovoz berish"}
        >
          <ThumbsUp size={15} fill={problem.hasVoted ? "currentColor" : "none"} />
          <span>{problem.votes} ta ovoz</span>
        </button>

        <button
          onClick={() => onOpenDetail(problem)}
          className="btn btn-secondary btn-sm"
        >
          <span>Batafsil</span>
        </button>
      </div>
    </div>
  );
}
