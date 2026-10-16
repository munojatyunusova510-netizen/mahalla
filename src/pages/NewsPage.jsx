import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  Eye,
  Search,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Modal from '../components/common/Modal';
import { storageService } from '../services/storageService';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState(null);

  const categories = [
    'Barchasi',
    'Hashar va obodonlik',
    'Sport va yoshlar',
    'Ta\'lim va IT',
    'Ijtimoiy tadbirlar'
  ];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await storageService.getNews();
    setNewsList(data);
  };

  const handleOpenReader = (article) => {
    setReadingArticle(article);
    // increment views locally
    storageService.updateNews(article.id, { views: (article.views || 0) + 1 });
  };

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      if (selectedCategory !== 'Barchasi' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchExcerpt = item.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchExcerpt) return false;
      }
      return true;
    });
  }, [newsList, selectedCategory, searchQuery]);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">
            <Newspaper size={14} /> Mahalla kundaligi
          </span>
          <h1 className="section-title">Yangiliklar va Tadbirlar</h1>
          <p className="section-subtitle">
            Mahallamiz hayotidagi eng so‘nggi voqealar, umumxalq hasharlari, sport musobaqalari va e'lonlar bilan tanishing.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="filter-bar" style={{ marginBottom: '2.5rem' }}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Yangiliklar ichidan qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="pills-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredNews.map((article) => (
            <div key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--primary-800)'
                }}>
                  {article.category}
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.65rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {article.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {article.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                    <Eye size={13} /> {article.views}
                  </span>
                </div>

                <h3
                  style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.65rem', lineHeight: 1.35, cursor: 'pointer' }}
                  onClick={() => handleOpenReader(article)}
                >
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.5rem', flex: 1 }}>
                  {article.excerpt}
                </p>

                <button
                  onClick={() => handleOpenReader(article)}
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <BookOpen size={15} />
                  <span>To'liq o'qish</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* News Detail / Reader Modal */}
        {readingArticle && (
          <Modal
            isOpen={!!readingArticle}
            onClose={() => setReadingArticle(null)}
            title={readingArticle.category}
            size="lg"
            footer={
              <button className="btn btn-secondary" onClick={() => setReadingArticle(null)}>
                Yopish
              </button>
            }
          >
            <div>
              <div style={{ maxHeight: '340px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-subtle)', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {readingArticle.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {readingArticle.readTime}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {readingArticle.views} marta ko'rildi</span>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.3 }}>
                {readingArticle.title}
              </h2>

              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary-900)', lineHeight: 1.6, marginBottom: '1.25rem', backgroundColor: 'var(--primary-50)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                {readingArticle.excerpt}
              </p>

              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {readingArticle.content}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
