import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, FileText, Check } from 'lucide-react';
import { storageService } from '../../services/storageService';

export default function TrackRequest() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const sampleCodes = ["MH-2026-1042", "MH-2026-2184", "MH-2026-3490"];

  const handleSearch = async (codeToSearch) => {
    const code = (codeToSearch || trackingCode).trim();
    if (!code) return;

    setLoading(true);
    setSearched(true);
    try {
      const found = await storageService.getProposalByCode(code);
      setResult(found);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        Murojaat holatini tekshirish
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Taklif yoki shikoyat yuborganingizda berilgan maxsus <strong>MH-2026-XXXX</strong> kodini kiriting:
      </p>

      {/* Search Bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}
      >
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Masalan: MH-2026-1042"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Qidirilmoqda..." : "Tekshirish"}
        </button>
      </form>

      {/* Quick sample pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Namuna kodlar:</span>
        {sampleCodes.map((code) => (
          <button
            key={code}
            type="button"
            className="filter-pill"
            style={{ fontSize: '0.78rem', padding: '0.2rem 0.6rem' }}
            onClick={() => {
              setTrackingCode(code);
              handleSearch(code);
            }}
          >
            {code}
          </button>
        ))}
      </div>

      {/* Results */}
      {searched && (
        <div>
          {result ? (
            <div style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              backgroundColor: '#ffffff'
            }}>
              {/* Request Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: result.type === 'taklif' ? 'var(--primary-800)' : '#c2410c',
                    backgroundColor: result.type === 'taklif' ? 'var(--primary-100)' : '#ffedd5',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    {result.type === 'taklif' ? 'Taklif' : 'Shikoyat'}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginTop: '0.4rem' }}>
                    {result.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                    Yuboruvchi: {result.submittedBy} • Kategoriya: {result.category}
                  </div>
                </div>

                <div style={{
                  padding: '0.4rem 0.85rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: 'var(--primary-900)'
                }}>
                  {result.trackingCode}
                </div>
              </div>

              {/* Timeline */}
              <div className="tracking-timeline">
                {result.timeline.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'current';

                  return (
                    <div
                      key={idx}
                      className={`timeline-step ${isDone ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className="timeline-dot">
                        {isDone ? (
                          <Check size={14} />
                        ) : isCurrent ? (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-blue-600)' }} />
                        ) : (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--border-strong)' }} />
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="timeline-step-title">{step.step}</div>
                        {step.date && (
                          <span className="timeline-step-time">{step.date}</span>
                        )}
                      </div>

                      <div className="timeline-step-desc">
                        {step.note}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)'
            }}>
              <AlertCircle size={36} color="var(--accent-orange-600)" style={{ margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontWeight: 600 }}>Murojaat topilmadi</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Kiritilgan kodni tekshiring yoki yuqoridagi namunaviy kodlardan birini tanlang.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
