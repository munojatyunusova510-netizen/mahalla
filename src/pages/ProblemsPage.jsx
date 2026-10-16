import React, { useState, useEffect, useMemo } from 'react';
import {
  AlertCircle,
  PlusCircle,
  Search,
  Filter,
  SlidersHorizontal,
  ThumbsUp,
  Inbox
} from 'lucide-react';
import ProblemCard from '../components/problems/ProblemCard';
import { storageService } from '../services/storageService';
import { PROBLEM_CATEGORIES, PROBLEM_STATUSES } from '../data/mockData';

export default function ProblemsPage({
  onOpenNewProblem,
  onOpenDetail
}) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('votes'); // 'votes' | 'newest' | 'oldest'

  const loadProblems = async () => {
    setLoading(true);
    const data = await storageService.getProblems();
    setProblems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProblems();
  }, []);

  const handleVote = async (id) => {
    await storageService.toggleVoteProblem(id);
    // Refresh
    const updated = await storageService.getProblems();
    setProblems(updated);
  };

  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Status filter
        if (selectedStatus !== 'all' && p.status !== selectedStatus) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchAddress = p.address.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchAddress && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'votes') {
          return (b.votes || 0) - (a.votes || 0);
        } else if (sortBy === 'newest') {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
  }, [problems, selectedCategory, selectedStatus, searchQuery, sortBy]);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Page Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span className="section-eyebrow">
              <AlertCircle size={14} /> Mahalla masalalari
            </span>
            <h1 className="section-title" style={{ margin: 0 }}>Mahalla Muammolari</h1>
            <p className="section-subtitle" style={{ marginTop: '0.5rem' }}>
              Hududimizdagi kamchilik va muammolar haqida xabar bering, ovoz bering va hal etilish jarayonini kuzating.
            </p>
          </div>

          <button
            onClick={onOpenNewProblem}
            className="btn btn-primary btn-lg"
            id="page-new-problem-btn"
          >
            <PlusCircle size={20} />
            <span>Muammo yuborish</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-bar-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Muammo nomi, manzil yoki ta'rif bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status & Sort Dropdowns */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                className="form-select"
                style={{ width: 'auto', minWidth: '170px' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Holati: Barchasi</option>
                <option value="yangi">Yangi</option>
                <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                <option value="jarayonda">Jarayonda</option>
                <option value="hal_qilindi">Hal qilindi</option>
              </select>

              <select
                className="form-select"
                style={{ width: 'auto', minWidth: '170px' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="votes">Ko'p ovoz olganlar</option>
                <option value="newest">Eng yangi sanalilar</option>
                <option value="oldest">Eng avvalgilar</option>
              </select>
            </div>
          </div>

          {/* Category Pills Scroll */}
          <div className="pills-scroll">
            {PROBLEM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Quick Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div>
            Jami: <strong>{filteredProblems.length} ta</strong> muammo topildi
          </div>
          {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery.trim()) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              style={{ color: 'var(--primary-800)', fontWeight: 600, fontSize: '0.85rem' }}
            >
              Filtrlarni tozalash
            </button>
          )}
        </div>

        {/* Problems List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Yuklanmoqda...
          </div>
        ) : filteredProblems.length > 0 ? (
          <div className="problems-grid">
            {filteredProblems.map((prob) => (
              <ProblemCard
                key={prob.id}
                problem={prob}
                onVote={handleVote}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <Inbox size={48} color="var(--text-subtle)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Mavjud filtrlarga mos keluvchi muammo topilmadi
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
              Qidiruv so'zini o'zgartirib ko'ring yoki birinchi bo'lib ushbu kategoriya bo'yicha yangi muammo yuboring!
            </p>
            <button
              onClick={onOpenNewProblem}
              className="btn btn-primary"
            >
              <PlusCircle size={18} />
              <span>Yangi muammo qo'shish</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
