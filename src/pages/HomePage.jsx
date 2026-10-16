import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  PlusCircle,
  Trophy,
  AlertCircle,
  Users,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Search,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import ProblemCard from '../components/problems/ProblemCard';
import AchievementCard from '../components/achievements/AchievementCard';
import SocialCard from '../components/social/SocialCard';
import { storageService } from '../services/storageService';
import { MAHALLA_INFO, MAHALLA_OFFICIALS } from '../data/mockData';

export default function HomePage({
  onOpenNewProblem,
  onOpenHelp,
  onOpenDetail
}) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [featuredProblems, setFeaturedProblems] = useState([]);
  const [featuredAchievements, setFeaturedAchievements] = useState([]);
  const [featuredSocial, setFeaturedSocial] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [quickTrackCode, setQuickTrackCode] = useState('');

  const loadData = async () => {
    const s = await storageService.getStats();
    setStats(s);

    const probs = await storageService.getProblems();
    // Sort by votes descending for featured
    const sortedProbs = [...probs].sort((a, b) => b.votes - a.votes).slice(0, 3);
    setFeaturedProblems(sortedProbs);

    const achs = await storageService.getAchievements();
    setFeaturedAchievements(achs.slice(0, 2));

    const soc = await storageService.getSocialInitiatives();
    setFeaturedSocial(soc.slice(0, 2));

    const news = await storageService.getNews();
    setLatestNews(news.slice(0, 3));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVote = async (id) => {
    await storageService.toggleVoteProblem(id);
    loadData();
  };

  const handleQuickTrackSubmit = (e) => {
    e.preventDefault();
    if (quickTrackCode.trim()) {
      navigate(`/murojaatlar?code=${encodeURIComponent(quickTrackCode.trim())}`);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-pattern" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div>
              <div className="hero-badge">
                <Sparkles size={16} color="#fbbf24" />
                <span>O‘zbekiston mahallalari uchun yagona raqamli platforma</span>
              </div>

              <h1 className="hero-title">
                Mahallamizni birgalikda rivojlantiramiz!
              </h1>

              <p className="hero-desc">
                {MAHALLA_INFO.name}ning barcha aholisi uchun qulay xizmat: muammolar haqida xabar bering,
                ularning hal etilishini kuzating, yutuqlarimiz bilan tanishing va ijtimoiy tashabbuslarni qo‘llab-quvvatlang.
              </p>

              <div className="hero-actions">
                <button
                  onClick={onOpenNewProblem}
                  className="btn btn-white btn-lg"
                  id="hero-report-btn"
                >
                  <PlusCircle size={20} color="var(--primary-800)" />
                  <span>Muammo yuborish</span>
                </button>

                <Link to="/yutuqlar" className="btn btn-outline-white btn-lg">
                  <Trophy size={20} />
                  <span>Yutuqlarni ko‘rish</span>
                </Link>
              </div>

              {/* Quick stats on hero */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <h3>{MAHALLA_INFO.population}</h3>
                  <p>Mahalla aholisi</p>
                </div>
                <div className="hero-stat-item">
                  <h3>{stats ? stats.resolvedProblems : '4'} ta</h3>
                  <p>Hal etilgan masala</p>
                </div>
                <div className="hero-stat-item">
                  <h3>{MAHALLA_INFO.streetsCount}</h3>
                  <p>Ichki ko'chalar</p>
                </div>
              </div>
            </div>

            {/* Right Widget: Quick Track & Info Box */}
            <div>
              <div className="hero-widget-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--primary-100)', borderRadius: 'var(--radius-md)', color: 'var(--primary-800)' }}>
                    <Search size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>Murojaatni tekshirish</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Maxsus kod orqali holatni aniqlang</p>
                  </div>
                </div>

                <form onSubmit={handleQuickTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masalan: MH-2026-1042"
                    value={quickTrackCode}
                    onChange={(e) => setQuickTrackCode(e.target.value.toUpperCase())}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <span>Tekshirish</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PhoneCall size={14} color="var(--primary-700)" />
                    <strong>Mahalla ishonch telefoni:</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-900)' }}>{MAHALLA_INFO.phone}</span>
                    <span style={{ fontSize: '0.78rem', backgroundColor: 'var(--primary-100)', color: 'var(--primary-800)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>09:00 - 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS ROW OVERVIEW */}
      <section className="container">
        <div className="stat-cards-grid">
          <StatCard
            icon="check"
            theme="green"
            value={stats ? stats.resolvedProblems : '...'}
            label="Hal qilingan muammolar"
            badgeText={`${stats ? stats.resolvedRate : 85}% samaradorlik`}
          />
          <StatCard
            icon="clock"
            theme="orange"
            value={stats ? stats.inProgressProblems : '...'}
            label="Jarayondagi murojaatlar"
            subtext="Mutasaddilar nazoratida"
          />
          <StatCard
            icon="award"
            theme="blue"
            value={stats ? stats.totalAchievements : '4'}
            label="Bajarilgan yirik yutuqlar"
            subtext="Obodonlik va sport"
          />
          <StatCard
            icon="users"
            theme="amber"
            value={stats ? stats.totalVotes : '...'}
            label="Fuqarolar ovozi va faolligi"
            subtext="Aholi ishtiroki"
          />
        </div>
      </section>

      {/* 3. FEATURED PROBLEMS (Eng muhim muammolar) */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <AlertCircle size={14} /> Dolzarb masalalar
            </span>
            <h2 className="section-title">Eng ko'p ovoz to'plagan muammolar</h2>
            <p className="section-subtitle">
              Aholi tomonidan bildirilgan va eng ko'p qo'llab-quvvatlangan murojaatlar.
              Siz ham o'z ko'changizdagi masalaga ovoz bering!
            </p>
          </div>

          <div className="problems-grid">
            {featuredProblems.map((prob) => (
              <ProblemCard
                key={prob.id}
                problem={prob}
                onVote={handleVote}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/muammolar" className="btn btn-secondary btn-lg">
              <span>Barcha muammolarni ko‘rish ({stats ? stats.totalProblems : '6'})</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS PREVIEW (Yutuqlar) */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Trophy size={14} /> Qilingan ishlar
            </span>
            <h2 className="section-title">Mahallamizning yangi qiyofasi</h2>
            <p className="section-subtitle">
              Aholi takliflari va davlat dasturlari asosida amalga oshirilgan loyihalar.
              Suruvchi orqali oldingi va keyingi holatni taqqoslang!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {featuredAchievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/yutuqlar" className="btn btn-primary btn-lg">
              <span>Barcha loyihalar va yutuqlar</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL SUPPORT HIGHLIGHT (Ijtimoiy yordam) */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow" style={{ backgroundColor: 'var(--accent-orange-50)', color: 'var(--accent-orange-700)' }}>
              <HeartHandshake size={14} /> Saxovat va birdamlik
            </span>
            <h2 className="section-title">Yordamga muhtoj oilalarni qo‘llab-quvvatlash</h2>
            <p className="section-subtitle">
              Hech bir inson mehr va e'tibordan chetda qolmasin. Barcha yordam tashabbuslari
              mahalla ijtimoiy xodimi nazorati ostida amalga oshiriladi.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {featuredSocial.map((item) => (
              <SocialCard
                key={item.id}
                initiative={item}
                onOpenHelp={onOpenHelp}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/ijtimoiy-yordam" className="btn btn-secondary btn-lg">
              <span>Barcha xayriya tashabbuslarini ko'rish</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MAHALLA BESHligi / YETTILIGI */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <ShieldCheck size={14} /> Mahalla mas'ullari
            </span>
            <h2 className="section-title">Mahalla yetakchilari va faollari</h2>
            <p className="section-subtitle">
              Sizning murojaatingizni ko'rib chiquvchi, xavfsizlik va farovonlikni ta'minlovchi mas'ul shaxslar
            </p>
          </div>

          <div className="officials-grid">
            {MAHALLA_OFFICIALS.map((off) => (
              <div key={off.id} className="official-card">
                <img src={off.photo} alt={off.name} className="official-avatar" />
                <h4 className="official-name">{off.name}</h4>
                <div className="official-role">{off.role}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>
                  {off.department}
                </div>
                <div className="official-contacts">
                  <div><strong>Telefon:</strong> {off.phone}</div>
                  <div><strong>Qabul:</strong> {off.receptionDays}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LATEST NEWS PREVIEW */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Calendar size={14} /> Yangiliklar va tadbirlar
            </span>
            <h2 className="section-title">Mahalla hayotidan so‘nggi lavhalar</h2>
            <p className="section-subtitle">
              Hasharlar, sport musobaqalari, yoshlar tadbirlari va e'lonlar
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {latestNews.map((article) => (
              <div key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--primary-700)' }}>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {article.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                    {article.excerpt}
                  </p>
                  <Link to="/yangiliklar" style={{ color: 'var(--primary-800)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Batafsil o'qish</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/yangiliklar" className="btn btn-secondary">
              <span>Barcha yangiliklarni ko'rish</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="container" style={{ paddingBottom: '4.5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.85rem' }}>
            Mahallamiz ravnaqiga siz ham hissa qo'shing!
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '620px', margin: '0 auto 2rem auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Ko'changizdagi obodonlashtirish, chiroqlar yoki boshqa masala bo'yicha taklifingiz bormi?
            Bir necha daqiqa ichida ariza yuboring va uning yechimini onlayn kuzating.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenNewProblem} className="btn btn-white btn-lg">
              <PlusCircle size={20} color="var(--primary-800)" />
              <span>Muammo haqida xabar berish</span>
            </button>
            <Link to="/murojaatlar" className="btn btn-outline-white btn-lg">
              <span>Taklif yoki shikoyat yuborish</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
