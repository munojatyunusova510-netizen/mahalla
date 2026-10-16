import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import NewProblemModal from './components/problems/NewProblemModal';
import ProblemDetailModal from './components/problems/ProblemDetailModal';
import DonateModal from './components/social/DonateModal';
import VolunteerModal from './components/social/VolunteerModal';

// Pages
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import AchievementsPage from './pages/AchievementsPage';
import SocialSupportPage from './pages/SocialSupportPage';
import ProposalsPage from './pages/ProposalsPage';
import NewsPage from './pages/NewsPage';
import AdminPage from './pages/AdminPage';

import { storageService } from './services/storageService';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Global Modals State
  const [isNewProblemOpen, setIsNewProblemOpen] = useState(false);
  const [selectedProblemDetail, setSelectedProblemDetail] = useState(null);
  const [selectedHelpInitiative, setSelectedHelpInitiative] = useState(null);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message = '', type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Submit new problem handler
  const handleProblemSubmit = async (formData) => {
    const created = await storageService.createProblem(formData);
    addToast(
      "Murojaatingiz yuborildi!",
      `"${created.title}" muammosi ro'yxatga olindi va ovoz berish uchun ochildi.`,
      "success"
    );
  };

  // Vote handler
  const handleVote = async (id) => {
    const result = await storageService.toggleVoteProblem(id);
    if (result.hasVoted) {
      addToast("Ovozingiz qabul qilindi!", "Ushbu muammo ustuvorligi oshirildi.", "success");
    } else {
      addToast("Ovozingiz qaytarib olindi", "", "info");
    }
  };

  // Donate / Support submission handler
  const handleSupportSubmit = async (initiativeId, supportData) => {
    await storageService.supportInitiative(initiativeId, supportData);
    addToast(
      "Saxovatingiz uchun tashakkur!",
      "Yordam arizangiz qabul qilindi. Tez orada mahalla ijtimoiy xodimi bog'lanadi.",
      "success"
    );
  };

  // Volunteer registration handler
  const handleVolunteerRegister = async (volunteerData) => {
    await storageService.registerVolunteer(volunteerData);
    addToast(
      "Ko'ngillilar safiga xush kelibsiz!",
      "Ma'lumotlaringiz saqlandi. Mahalla yetakchisi siz bilan aloqaga chiqadi.",
      "success"
    );
  };

  return (
    <>
      <ScrollToTop />
      {/* Main Navbar */}
      <Navbar onOpenNewProblem={() => setIsNewProblemOpen(true)} />

      {/* Main Route Content */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenNewProblem={() => setIsNewProblemOpen(true)}
                onOpenHelp={(init) => setSelectedHelpInitiative(init)}
                onOpenDetail={(prob) => setSelectedProblemDetail(prob)}
              />
            }
          />
          <Route
            path="/muammolar"
            element={
              <ProblemsPage
                onOpenNewProblem={() => setIsNewProblemOpen(true)}
                onOpenDetail={(prob) => setSelectedProblemDetail(prob)}
              />
            }
          />
          <Route path="/yutuqlar" element={<AchievementsPage />} />
          <Route
            path="/ijtimoiy-yordam"
            element={
              <SocialSupportPage
                onOpenHelp={(init) => setSelectedHelpInitiative(init)}
                onOpenVolunteer={() => setIsVolunteerOpen(true)}
              />
            }
          />
          <Route
            path="/murojaatlar"
            element={
              <ProposalsPage
                onProposalCreated={(prop) => {
                  addToast(
                    "Murojaat muvaffaqiyatli saqlandi!",
                    `Tracking kodi: ${prop.trackingCode}`,
                    "success"
                  );
                }}
              />
            }
          />
          <Route path="/yangiliklar" element={<NewsPage />} />
          <Route
            path="/admin"
            element={
              <AdminPage
                onDataMutated={() => {
                  addToast("O'zgarishlar saqlandi", "Tizim ma'lumotlari yangilandi.", "success");
                }}
              />
            }
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals */}
      <NewProblemModal
        isOpen={isNewProblemOpen}
        onClose={() => setIsNewProblemOpen(false)}
        onSubmitSuccess={handleProblemSubmit}
      />

      <ProblemDetailModal
        problem={selectedProblemDetail}
        isOpen={!!selectedProblemDetail}
        onClose={() => setSelectedProblemDetail(null)}
        onVote={handleVote}
      />

      <DonateModal
        initiative={selectedHelpInitiative}
        isOpen={!!selectedHelpInitiative}
        onClose={() => setSelectedHelpInitiative(null)}
        onSuccess={handleSupportSubmit}
      />

      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
        onRegisterSuccess={handleVolunteerRegister}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
