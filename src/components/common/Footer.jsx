import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldAlert,
  Heart
} from 'lucide-react';
import { MAHALLA_INFO, EMERGENCY_CONTACTS } from '../../data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand and Mission */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-icon" style={{ width: '38px', height: '38px' }}>
                <Building2 size={20} />
              </div>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>Mening Mahallam</h3>
            </div>
            <p>
              O‘zbekiston mahallalarida aholi farovonligini oshirish, muammolarni shaffof va tezkor hal etish,
              ijtimoiy birdamlikni mustahkamlashga qaratilgan yagona raqamli mahalla tizimi.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              Tizim faol va fuqarolar murojaatlari uchun ochiq
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Asosiy bo'limlar</h4>
            <div className="footer-links">
              <Link to="/muammolar" className="footer-link">Mahalla muammolari</Link>
              <Link to="/yutuqlar" className="footer-link">Erishilgan yutuqlar</Link>
              <Link to="/ijtimoiy-yordam" className="footer-link">Saxovat va ijtimoiy yordam</Link>
              <Link to="/murojaatlar" className="footer-link">Taklif va shikoyatlar</Link>
              <Link to="/murojaatlar#tekshirish" className="footer-link">Murojaat holatini tekshirish</Link>
              <Link to="/yangiliklar" className="footer-link">Mahalla yangiliklari</Link>
              <Link to="/admin" className="footer-link">Mas'ullar boshqaruv paneli</Link>
            </div>
          </div>

          {/* Contacts & Working Hours */}
          <div>
            <h4 className="footer-heading">Aloqa va qabul</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{MAHALLA_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <a href={`tel:${MAHALLA_INFO.phone}`} style={{ color: '#ffffff' }}>{MAHALLA_INFO.phone}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{MAHALLA_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Clock size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{MAHALLA_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <ShieldAlert size={20} color="#f87171" />
              <h4 className="footer-heading" style={{ margin: 0 }}>Favqulodda raqamlar</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Zudlik bilan yordam talab qilinganda quyidagi tezkor xizmatlarga qo'ng'iroq qiling:
            </p>
            <div className="emergency-pills">
              {EMERGENCY_CONTACTS.map((item) => (
                <div key={item.number} className="emergency-pill" title={item.service}>
                  <strong style={{ color: '#ffffff' }}>{item.number}</strong> — {item.service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {currentYear} <strong>Mening Mahallam</strong> — O‘zbekiston Respublikasi Mahalla tizimini raqamlashtirish namunaviy platformasi.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem' }}>Aholi soni: {MAHALLA_INFO.population}</span>
            <span style={{ fontSize: '0.8rem' }}>Xonadonlar: {MAHALLA_INFO.households}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
