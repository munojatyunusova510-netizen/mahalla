import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertCircle,
  Trophy,
  Newspaper,
  HeartHandshake,
  MessageSquareText,
  Trash2,
  Edit,
  PlusCircle,
  RotateCcw,
  CheckCircle,
  Clock,
  Layers,
  Check
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { storageService } from '../services/storageService';
import { PROBLEM_STATUSES, PROBLEM_CATEGORIES } from '../data/mockData';

export default function AdminPage({ onDataMutated }) {
  const [activeTab, setActiveTab] = useState('problems'); // 'problems' | 'news' | 'achievements' | 'proposals'
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [proposals, setProposals] = useState([]);

  // Modals for admin creation
  const [isNewNewsModalOpen, setIsNewNewsModalOpen] = useState(false);
  const [isNewAchModalOpen, setIsNewAchModalOpen] = useState(false);
  const [responseModalItem, setResponseModalItem] = useState(null);
  const [officialResponseText, setOfficialResponseText] = useState('');

  // Form states
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Hashar va obodonlik',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
  });

  const [achForm, setAchForm] = useState({
    title: '',
    category: 'Obodonlashtirish',
    description: '',
    impact: '',
    beforeImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80'
  });

  const reloadAll = async () => {
    const s = await storageService.getStats();
    setStats(s);
    const p = await storageService.getProblems();
    setProblems(p);
    const n = await storageService.getNews();
    setNewsList(n);
    const a = await storageService.getAchievements();
    setAchievements(a);
    const pr = await storageService.getProposals();
    setProposals(pr);
    if (onDataMutated) onDataMutated();
  };

  useEffect(() => {
    reloadAll();
  }, []);

  // Update Problem Status
  const handleProblemStatusChange = async (id, newStatus) => {
    await storageService.updateProblemStatus(id, newStatus);
    reloadAll();
  };

  // Delete Problem
  const handleDeleteProblem = async (id) => {
    if (window.confirm("Haqiqatan ham ushbu muammoni o'chirmoqchimisiz?")) {
      await storageService.deleteProblem(id);
      reloadAll();
    }
  };

  // Save Official Response
  const handleSaveOfficialResponse = async (e) => {
    e.preventDefault();
    if (!responseModalItem) return;
    await storageService.updateProblemStatus(responseModalItem.id, responseModalItem.status, officialResponseText);
    setResponseModalItem(null);
    setOfficialResponseText('');
    reloadAll();
  };

  // Create News
  const handleCreateNews = async (e) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      alert("Sarlavha va matn kiritilishi shart");
      return;
    }
    await storageService.createNews(newsForm);
    setIsNewNewsModalOpen(false);
    setNewsForm({
      title: '',
      category: 'Hashar va obodonlik',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    });
    reloadAll();
  };

  // Delete News
  const handleDeleteNews = async (id) => {
    if (window.confirm("Ushbu yangilikni o'chirasizmi?")) {
      await storageService.deleteNews(id);
      reloadAll();
    }
  };

  // Create Achievement
  const handleCreateAchievement = async (e) => {
    e.preventDefault();
    if (!achForm.title.trim() || !achForm.description.trim()) {
      alert("Loyiha nomi va tavsifini kiriting");
      return;
    }
    await storageService.createAchievement(achForm);
    setIsNewAchModalOpen(false);
    setAchForm({
      title: '',
      category: 'Obodonlashtirish',
      description: '',
      impact: '',
      beforeImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80'
    });
    reloadAll();
  };

  // Delete Achievement
  const handleDeleteAchievement = async (id) => {
    if (window.confirm("Ushbu yutuqni o'chirasizmi?")) {
      await storageService.deleteAchievement(id);
      reloadAll();
    }
  };

  // Progress proposal timeline
  const handleAdvanceProposal = async (proposal) => {
    const nextSteps = [
      { status: 'qabul_qilindi', index: 1, note: "Murojaat mahalla kotibiyati tomonidan qabul qilindi va ijrochiga yo'naltirildi." },
      { status: 'organilmoqda', index: 2, note: "Mas'ul xodim joyiga chiqib o'rganmoqda." },
      { status: 'ijroga_qaratildi', index: 3, note: "Murojaat mutasaddi korxonaga ijro uchun yuborildi." },
      { status: 'hal_qilindi', index: 4, note: "Murojaat to'liq ijobiy hal etildi!" }
    ];

    const currentStepIndex = proposal.timeline.findIndex(t => t.status === 'current');
    const nextIndex = currentStepIndex < 0 ? 1 : Math.min(nextSteps.length, currentStepIndex + 1);

    if (nextIndex <= 4) {
      const target = nextSteps[nextIndex - 1];
      await storageService.updateProposalStatus(proposal.id, target.status, nextIndex, target.note);
      reloadAll();
    }
  };

  // Reset to Defaults
  const handleResetData = () => {
    if (window.confirm("Barcha ma'lumotlarni dastlabki demo holatiga qaytarishni xohlaysizmi? Bu kiritilgan yangi muammolar va o'zgarishlarni tozalaydi.")) {
      storageService.resetToDefaults();
      reloadAll();
      alert("Barcha ma'lumotlar dastlabki holatga qaytarildi.");
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="admin-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.8rem', color: '#ffffff', margin: 0 }}>Mahalla Boshqaruv Paneli</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, fontSize: '0.88rem' }}>
                  Mahalla fuqarolar yig'ini xodimlari va mutasaddilar uchun ishchi kabinet
                </p>
              </div>
            </div>

            <button
              onClick={handleResetData}
              className="btn btn-outline-white btn-sm"
              title="Dastlabki demo ma'lumotlarni tiklash"
            >
              <RotateCcw size={16} />
              <span>Dastlabki ma'lumotlarni tiklash</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4.5rem' }}>
        {/* Security & Architecture Alert */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.85rem',
          color: '#1e40af',
          fontSize: '0.85rem',
          marginBottom: '2rem'
        }}>
          <ShieldCheck size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Arxitektura va xavfsizlik eslatmasi:</strong> Ushbu frontend prototipida admin boshqaruv paneli bevosita ko'rsatilgan. Keyingi bosqichda backend bilan integratsiya qilinganda, ushbu bo'lim <strong>JWT token</strong>, <strong>OAuth2</strong> yoki davlatning <strong>E-IMZO</strong> autentifikatsiyasi orqali himoyalanadi va rollar (Admin, Mahalla raisi, Inspektor) tizimi joriy etiladi.
          </div>
        </div>

        {/* Stats Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Jami Muammolar</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{problems.length}</div>
          </div>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Hal Qilingan</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-800)' }}>{problems.filter(p => p.status === 'hal_qilindi').length}</div>
          </div>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Jarayonda</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-orange-600)' }}>{problems.filter(p => p.status === 'jarayonda' || p.status === 'korib_chiqilmoqda').length}</div>
          </div>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Taklif va Shikoyatlar</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue-600)' }}>{proposals.length}</div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border-subtle)', marginBottom: '2rem', overflowX: 'auto' }}>
          <button
            className={`btn ${activeTab === 'problems' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', borderBottom: 'none' }}
            onClick={() => setActiveTab('problems')}
          >
            <AlertCircle size={16} />
            <span>Muammolar nazorati ({problems.length})</span>
          </button>

          <button
            className={`btn ${activeTab === 'proposals' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', borderBottom: 'none' }}
            onClick={() => setActiveTab('proposals')}
          >
            <MessageSquareText size={16} />
            <span>Taklif & Shikoyatlar ({proposals.length})</span>
          </button>

          <button
            className={`btn ${activeTab === 'news' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', borderBottom: 'none' }}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={16} />
            <span>Yangiliklar ({newsList.length})</span>
          </button>

          <button
            className={`btn ${activeTab === 'achievements' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', borderBottom: 'none' }}
            onClick={() => setActiveTab('achievements')}
          >
            <Trophy size={16} />
            <span>Yutuqlar ({achievements.length})</span>
          </button>
        </div>

        {/* TAB 1: PROBLEMS MANAGEMENT */}
        {activeTab === 'problems' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sarlavha & Manzil</th>
                  <th>Kategoriya</th>
                  <th>Ovozlar</th>
                  <th>Holati</th>
                  <th>Holatni o'zgartirish</th>
                  <th>Mas'ul javobi</th>
                  <th style={{ textAlign: 'right' }}>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p) => (
                  <tr key={p.id}>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                        📍 {p.address} • {p.date}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-category">
                        {p.category}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--primary-800)' }}>{p.votes}</strong> ta
                    </td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem', width: 'auto' }}
                        value={p.status}
                        onChange={(e) => handleProblemStatusChange(p.id, e.target.value)}
                      >
                        <option value="yangi">Yangi</option>
                        <option value="korib_chiqilmoqda">Ko'rib chiqilmoqda</option>
                        <option value="jarayonda">Jarayonda</option>
                        <option value="hal_qilindi">Hal qilindi</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setResponseModalItem(p);
                          setOfficialResponseText(p.officialResponse || '');
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem' }}
                      >
                        <Edit size={13} />
                        <span>{p.officialResponse ? "Javobni tahrirlash" : "Javob yozish"}</span>
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteProblem(p.id)}
                        style={{ color: '#dc2626', padding: '6px', cursor: 'pointer' }}
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: PROPOSALS TIMELINE MANAGEMENT */}
        {activeTab === 'proposals' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kod & Turi</th>
                  <th>Sarlavha & Yuboruvchi</th>
                  <th>Kategoriya</th>
                  <th>Hozirgi bosqich</th>
                  <th>Bosqichni oshirish</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((pr) => {
                  const currentStep = pr.timeline.find(t => t.status === 'current') || pr.timeline[0];
                  return (
                    <tr key={pr.id}>
                      <td>
                        <strong style={{ color: 'var(--primary-900)' }}>{pr.trackingCode}</strong>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: pr.type === 'taklif' ? 'var(--primary-700)' : '#ea580c' }}>
                          {pr.type}
                        </div>
                      </td>
                      <td style={{ maxWidth: '320px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{pr.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                          {pr.submittedBy} • {pr.phone}
                        </div>
                      </td>
                      <td>{pr.category}</td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--primary-800)', fontSize: '0.85rem' }}>
                          {currentStep.step}
                        </span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {currentStep.note}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleAdvanceProposal(pr)}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <CheckCircle size={14} color="var(--primary-700)" />
                          <span>Navbatdagi bosqichga o'tkazish</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button onClick={() => setIsNewNewsModalOpen(true)} className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>Yangi yangilik qo'shish</span>
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sarlavha</th>
                    <th>Kategoriya</th>
                    <th>Sana</th>
                    <th>Ko'rishlar</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((n) => (
                    <tr key={n.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.title}</td>
                      <td><span className="badge badge-category">{n.category}</span></td>
                      <td>{n.date}</td>
                      <td>{n.views}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteNews(n.id)}
                          style={{ color: '#dc2626', padding: '6px' }}
                          title="O'chirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS MANAGEMENT */}
        {activeTab === 'achievements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button onClick={() => setIsNewAchModalOpen(true)} className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>Yangi yutuq loyihasini qo'shish</span>
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Loyiha nomi</th>
                    <th>Kategoriya</th>
                    <th>Natija va foydasi</th>
                    <th>Sana</th>
                    <th style={{ textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{a.title}</td>
                      <td><span className="badge badge-category">{a.category}</span></td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{a.impact}</td>
                      <td>{a.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteAchievement(a.id)}
                          style={{ color: '#dc2626', padding: '6px' }}
                          title="O'chirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: Official Response to Problem */}
        {responseModalItem && (
          <Modal
            isOpen={!!responseModalItem}
            onClose={() => setResponseModalItem(null)}
            title="Mahalla mas'uli rasmiy javobini yozish"
            size="md"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
                <button className="btn btn-secondary" onClick={() => setResponseModalItem(null)}>
                  Bekor qilish
                </button>
                <button className="btn btn-primary" onClick={handleSaveOfficialResponse}>
                  Saqlash va e'lon qilish
                </button>
              </div>
            }
          >
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {responseModalItem.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Ushbu javob fuqarolarga muammo kartasida ko'rinadi va mas'ul tashkilotning amaliy choralari haqida xabardor qiladi.
              </div>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Masalan: Tuman obodonlashtirish bo'limi tomonidan joyiga chiqildi va asfalt yotqizish ishlari 20-oktabrga belgilandi..."
                value={officialResponseText}
                onChange={(e) => setOfficialResponseText(e.target.value)}
              />
            </div>
          </Modal>
        )}

        {/* MODAL: Add News */}
        {isNewNewsModalOpen && (
          <Modal
            isOpen={isNewNewsModalOpen}
            onClose={() => setIsNewNewsModalOpen(false)}
            title="Yangi yangilik qo'shish"
            size="lg"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
                <button className="btn btn-secondary" onClick={() => setIsNewNewsModalOpen(false)}>
                  Bekor qilish
                </button>
                <button className="btn btn-primary" onClick={handleCreateNews}>
                  E'lon qilish
                </button>
              </div>
            }
          >
            <form onSubmit={handleCreateNews}>
              <div className="form-group">
                <label className="form-label">Sarlavha *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategoriya</label>
                <select
                  className="form-select"
                  value={newsForm.category}
                  onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                >
                  <option value="Hashar va obodonlik">Hashar va obodonlik</option>
                  <option value="Sport va yoshlar">Sport va yoshlar</option>
                  <option value="Ta'lim va IT">Ta'lim va IT</option>
                  <option value="Ijtimoiy tadbirlar">Ijtimoiy tadbirlar</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Qisqacha mazmun (Anons) *</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  required
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">To'liq matn *</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  required
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                />
              </div>
            </form>
          </Modal>
        )}

        {/* MODAL: Add Achievement */}
        {isNewAchModalOpen && (
          <Modal
            isOpen={isNewAchModalOpen}
            onClose={() => setIsNewAchModalOpen(false)}
            title="Yangi yutuq / Obodonlik loyihasi qo'shish"
            size="lg"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
                <button className="btn btn-secondary" onClick={() => setIsNewAchModalOpen(false)}>
                  Bekor qilish
                </button>
                <button className="btn btn-primary" onClick={handleCreateAchievement}>
                  Qo'shish
                </button>
              </div>
            }
          >
            <form onSubmit={handleCreateAchievement}>
              <div className="form-group">
                <label className="form-label">Loyiha nomi *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Masalan: Ko'cha chiroqlarini quyosh panellariga o'tkazish"
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategoriya</label>
                <input
                  type="text"
                  className="form-control"
                  value={achForm.category}
                  onChange={(e) => setAchForm({ ...achForm, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tavsif *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  value={achForm.description}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Natija va ijtimoiy samara *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Masalan: 5 000 aholi uchun tungi qulaylik yaratildi"
                  value={achForm.impact}
                  onChange={(e) => setAchForm({ ...achForm, impact: e.target.value })}
                />
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
