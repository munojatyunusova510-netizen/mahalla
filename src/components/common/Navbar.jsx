import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  AlertCircle,
  Trophy,
  HeartHandshake,
  MessageSquareText,
  Newspaper,
  ShieldCheck,
  PlusCircle,
  Menu,
  X,
  Building2,
  PhoneCall
} from 'lucide-react';
import { MAHALLA_INFO } from '../../data/mockData';

export default function Navbar({ onOpenNewProblem }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Bosh sahifa', icon: Home },
    { path: '/muammolar', label: 'Muammolar', icon: AlertCircle },
    { path: '/yutuqlar', label: 'Yutuqlar', icon: Trophy },
    { path: '/ijtimoiy-yordam', label: 'Ijtimoiy yordam', icon: HeartHandshake },
    { path: '/murojaatlar', label: 'Taklif & Shikoyat', icon: MessageSquareText },
    { path: '/yangiliklar', label: 'Yangiliklar', icon: Newspaper },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Bosh sahifaga o'tish">
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ lineHeight: 1.2 }}>Mening Mahallam</div>
            <span className="brand-tagline">{MAHALLA_INFO.shortName} • {MAHALLA_INFO.district}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Asosiy menyu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'text-bottom' }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Quick Problem Reporter CTA */}
          <button
            onClick={onOpenNewProblem}
            className="btn btn-primary btn-sm"
            style={{ display: 'none' }}
            id="nav-quick-report-btn"
          >
            <PlusCircle size={16} />
            <span>Muammo yuborish</span>
          </button>

          {/* Admin shortcut */}
          <Link
            to="/admin"
            className={`btn btn-secondary btn-sm ${location.pathname === '/admin' ? 'active' : ''}`}
            title="Mahalla boshqaruv paneli"
          >
            <ShieldCheck size={16} />
            <span style={{ display: 'none' }}>Admin</span>
            <span>Admin</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-subtle)' }}>BO'LIMLAR</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-800)', fontWeight: 600 }}>{MAHALLA_INFO.shortName}</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ fontSize: '1rem' }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewProblem();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <PlusCircle size={18} />
              <span>Muammo haqida xabar berish</span>
            </button>

            <Link
              to="/admin"
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              <ShieldCheck size={18} />
              <span>Mahalla Admin Paneli</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-subtle)', marginTop: '0.5rem' }}>
              <PhoneCall size={15} color="var(--primary-700)" />
              <span>Ishonch telefoni: {MAHALLA_INFO.phone}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
