import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MessageSquareText,
  Lightbulb,
  Search,
  FileCheck,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';
import ProposalForm from '../components/proposals/ProposalForm';
import TrackRequest from '../components/proposals/TrackRequest';
import { storageService } from '../services/storageService';

export default function ProposalsPage({ onProposalCreated }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track' | 'public'
  const [publicProposals, setPublicProposals] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Check if URL has ?code= parameter or hash #tekshirish
    const params = new URLSearchParams(location.search);
    if (params.get('code') || location.hash === '#tekshirish') {
      setActiveTab('track');
    }
    loadPublicProposals();
  }, [location]);

  const loadPublicProposals = async () => {
    const list = await storageService.getProposals();
    setPublicProposals(list);
  };

  const handleCreated = async (proposalData) => {
    const res = await storageService.createProposal(proposalData);
    if (onProposalCreated) onProposalCreated(res);
    loadPublicProposals();
    return res;
  };

  const filteredList = filterType === 'all'
    ? publicProposals
    : publicProposals.filter(p => p.type === filterType);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">
            <MessageSquareText size={14} /> Fuqarolar murojaati
          </span>
          <h1 className="section-title">Taklif va Shikoyatlar</h1>
          <p className="section-subtitle">
            Mahalla hayotini yaxshilash bo'yicha tashabbuslaringizni bildiring yoki mavjud kamchiliklar yuzasidan murojaat yo'llang.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <button
            onClick={() => setActiveTab('submit')}
            className="btn"
            style={{
              backgroundColor: activeTab === 'submit' ? 'var(--primary-800)' : '#ffffff',
              color: activeTab === 'submit' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'submit' ? 'var(--shadow-green)' : 'var(--shadow-sm)'
            }}
          >
            <Lightbulb size={18} />
            <span>Murojaat yuborish</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className="btn"
            style={{
              backgroundColor: activeTab === 'track' ? 'var(--primary-800)' : '#ffffff',
              color: activeTab === 'track' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'track' ? 'var(--shadow-green)' : 'var(--shadow-sm)'
            }}
          >
            <Search size={18} />
            <span>Holatni tekshirish</span>
          </button>

          <button
            onClick={() => setActiveTab('public')}
            className="btn"
            style={{
              backgroundColor: activeTab === 'public' ? 'var(--primary-800)' : '#ffffff',
              color: activeTab === 'public' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              boxShadow: activeTab === 'public' ? 'var(--shadow-green)' : 'var(--shadow-sm)'
            }}
          >
            <FileCheck size={18} />
            <span>Ochiq takliflar reyestri</span>
          </button>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === 'submit' && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <ProposalForm onSubmitProposal={handleCreated} />
          </div>
        )}

        {/* Tab 2: Tracking Tool */}
        {activeTab === 'track' && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <TrackRequest />
          </div>
        )}

        {/* Tab 3: Public Proposals List */}
        {activeTab === 'public' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Jami e'lon qilingan taklif va arizalar: <strong>{filteredList.length} ta</strong>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterType('all')}
                >
                  Barchasi
                </button>
                <button
                  className={`filter-pill ${filterType === 'taklif' ? 'active' : ''}`}
                  onClick={() => setFilterType('taklif')}
                >
                  Faqat Takliflar
                </button>
                <button
                  className={`filter-pill ${filterType === 'shikoyat' ? 'active' : ''}`}
                  onClick={() => setFilterType('shikoyat')}
                >
                  Faqat Shikoyatlar
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredList.map((item) => (
                <div key={item.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: item.type === 'taklif' ? 'var(--primary-800)' : '#c2410c',
                      backgroundColor: item.type === 'taklif' ? 'var(--primary-100)' : '#ffedd5',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px'
                    }}>
                      {item.type}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-subtle)' }}>
                      {item.trackingCode}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                    {item.description}
                  </p>

                  <div style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--text-subtle)'
                  }}>
                    <span>Kategoriya: <strong>{item.category}</strong></span>
                    <span>Sana: {item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
