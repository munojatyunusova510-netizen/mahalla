// ==========================================================================
// Mening Mahallam - Storage Service & Repository Layer
// Ready for Seamless Future Backend Integration (REST / GraphQL)
// ==========================================================================

import {
  INITIAL_PROBLEMS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_SOCIAL_INITIATIVES,
  INITIAL_PROPOSALS,
  INITIAL_NEWS,
  MAHALLA_INFO
} from '../data/mockData';

const KEYS = {
  PROBLEMS: 'mening_mahallam_problems_v1',
  ACHIEVEMENTS: 'mening_mahallam_achievements_v1',
  SOCIAL: 'mening_mahallam_social_v1',
  PROPOSALS: 'mening_mahallam_proposals_v1',
  NEWS: 'mening_mahallam_news_v1',
  VOLUNTEERS: 'mening_mahallam_volunteers_v1',
  VOTED_IDS: 'mening_mahallam_user_votes_v1'
};

// Seed initial data if not present
function initializeStorage() {
  if (!localStorage.getItem(KEYS.PROBLEMS)) {
    localStorage.setItem(KEYS.PROBLEMS, JSON.stringify(INITIAL_PROBLEMS));
  }
  if (!localStorage.getItem(KEYS.ACHIEVEMENTS)) {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
  }
  if (!localStorage.getItem(KEYS.SOCIAL)) {
    localStorage.setItem(KEYS.SOCIAL, JSON.stringify(INITIAL_SOCIAL_INITIATIVES));
  }
  if (!localStorage.getItem(KEYS.PROPOSALS)) {
    localStorage.setItem(KEYS.PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
  }
  if (!localStorage.getItem(KEYS.NEWS)) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
  }
  if (!localStorage.getItem(KEYS.VOTED_IDS)) {
    localStorage.setItem(KEYS.VOTED_IDS, JSON.stringify(['prob-104']));
  }
  if (!localStorage.getItem(KEYS.VOLUNTEERS)) {
    localStorage.setItem(KEYS.VOLUNTEERS, JSON.stringify([]));
  }
}

// Auto-run on load
initializeStorage();

const getItem = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

/**
 * Storage Service Object
 * All methods return Promises to emulate real network calls and allow
 * one-line replacement with Axios / Fetch API when backend is ready.
 */
export const storageService = {
  // --------------------------------------------------------------------------
  // 1. PROBLEMS (Backend Endpoint: /api/v1/problems)
  // --------------------------------------------------------------------------
  async getProblems() {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const userVotes = getItem(KEYS.VOTED_IDS, []);
    return problems.map(p => ({
      ...p,
      hasVoted: userVotes.includes(p.id)
    }));
  },

  async getProblemById(id) {
    const problems = await this.getProblems();
    return problems.find(p => p.id === id) || null;
  },

  async createProblem(problemData) {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const newProblem = {
      id: `prob-${Date.now()}`,
      title: problemData.title.trim(),
      description: problemData.description.trim(),
      category: problemData.category || 'other',
      address: problemData.address.trim(),
      author: problemData.author?.trim() || "Mahalla fuqarosi",
      phone: problemData.phone?.trim() || "",
      date: new Date().toISOString().split('T')[0],
      status: 'yangi',
      votes: 1,
      image: problemData.image || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
      officialResponse: null
    };

    const updated = [newProblem, ...problems];
    setItem(KEYS.PROBLEMS, updated);

    // Auto mark as voted by creator
    const userVotes = getItem(KEYS.VOTED_IDS, []);
    if (!userVotes.includes(newProblem.id)) {
      setItem(KEYS.VOTED_IDS, [...userVotes, newProblem.id]);
    }

    return { ...newProblem, hasVoted: true };
  },

  async toggleVoteProblem(id) {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const userVotes = getItem(KEYS.VOTED_IDS, []);
    const hasVoted = userVotes.includes(id);

    let updatedVotes;
    if (hasVoted) {
      updatedVotes = userVotes.filter(vId => vId !== id);
    } else {
      updatedVotes = [...userVotes, id];
    }
    setItem(KEYS.VOTED_IDS, updatedVotes);

    const updatedProblems = problems.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votes: hasVoted ? Math.max(0, p.votes - 1) : p.votes + 1
        };
      }
      return p;
    });

    setItem(KEYS.PROBLEMS, updatedProblems);
    return { id, hasVoted: !hasVoted, votes: updatedProblems.find(p => p.id === id)?.votes };
  },

  async updateProblemStatus(id, newStatus, officialResponse = null) {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const updated = problems.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          officialResponse: officialResponse !== null ? officialResponse : p.officialResponse
        };
      }
      return p;
    });
    setItem(KEYS.PROBLEMS, updated);
    return updated.find(p => p.id === id);
  },

  async deleteProblem(id) {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const updated = problems.filter(p => p.id !== id);
    setItem(KEYS.PROBLEMS, updated);
    return true;
  },

  // --------------------------------------------------------------------------
  // 2. ACHIEVEMENTS (Backend Endpoint: /api/v1/achievements)
  // --------------------------------------------------------------------------
  async getAchievements() {
    return getItem(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  },

  async createAchievement(data) {
    const items = getItem(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    const newItem = {
      id: `ach-${Date.now()}`,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category || 'Obodonlashtirish',
      beforeImage: data.beforeImage || "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      afterImage: data.afterImage || "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
      date: data.date || new Date().toISOString().split('T')[0],
      impact: data.impact || "Mahalla ahli uchun yangi imkoniyat yaratildi."
    };
    setItem(KEYS.ACHIEVEMENTS, [newItem, ...items]);
    return newItem;
  },

  async deleteAchievement(id) {
    const items = getItem(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    setItem(KEYS.ACHIEVEMENTS, items.filter(a => a.id !== id));
    return true;
  },

  // --------------------------------------------------------------------------
  // 3. SOCIAL SUPPORT (Backend Endpoint: /api/v1/social-initiatives)
  // --------------------------------------------------------------------------
  async getSocialInitiatives() {
    return getItem(KEYS.SOCIAL, INITIAL_SOCIAL_INITIATIVES);
  },

  async supportInitiative(initiativeId, supportData) {
    // Note: When real backend connects, this will register support / pledge
    const initiatives = getItem(KEYS.SOCIAL, INITIAL_SOCIAL_INITIATIVES);
    const updated = initiatives.map(init => {
      if (init.id === initiativeId) {
        const newCollected = (init.collectedProgress || 0) + 1;
        const targetNumber = parseInt(init.targetGoal) || 10;
        const newPercent = Math.min(100, Math.round((newCollected / targetNumber) * 100));
        return {
          ...init,
          collectedProgress: newCollected,
          progressPercent: newPercent
        };
      }
      return init;
    });
    setItem(KEYS.SOCIAL, updated);
    return true;
  },

  async registerVolunteer(volunteerData) {
    const volunteers = getItem(KEYS.VOLUNTEERS, []);
    const newVol = {
      id: `vol-${Date.now()}`,
      ...volunteerData,
      registeredAt: new Date().toISOString()
    };
    setItem(KEYS.VOLUNTEERS, [newVol, ...volunteers]);
    return newVol;
  },

  // --------------------------------------------------------------------------
  // 4. PROPOSALS & COMPLAINTS (Backend Endpoint: /api/v1/proposals)
  // --------------------------------------------------------------------------
  async getProposals() {
    return getItem(KEYS.PROPOSALS, INITIAL_PROPOSALS);
  },

  async getProposalByCode(code) {
    const proposals = getItem(KEYS.PROPOSALS, INITIAL_PROPOSALS);
    const formatted = code.trim().toUpperCase();
    return proposals.find(p => p.trackingCode.toUpperCase() === formatted) || null;
  },

  async createProposal(proposalData) {
    const proposals = getItem(KEYS.PROPOSALS, INITIAL_PROPOSALS);
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `MH-${currentYear}-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    const newProposal = {
      id: `prop-${Date.now()}`,
      trackingCode,
      type: proposalData.type || 'taklif',
      title: proposalData.title.trim(),
      description: proposalData.description.trim(),
      category: proposalData.category || "Umumiy masala",
      submittedBy: proposalData.fullName.trim(),
      phone: proposalData.phone.trim(),
      date: today,
      status: 'yuborildi',
      timeline: [
        {
          step: "Yuborildi",
          date: `${today} ${nowTime}`,
          status: "completed",
          note: "Murojaat fuqaro tomonidan onlayn shaklda yuborildi."
        },
        {
          step: "Qabul qilindi",
          date: null,
          status: "pending",
          note: "Mahalla kotibiyati tomonidan ko'rib chiqiladi."
        },
        {
          step: "O'rganilmoqda",
          date: null,
          status: "pending",
          note: "Tegishli mutaxassis joyiga chiqib o'rganadi."
        },
        {
          step: "Ijroga qaratildi",
          date: null,
          status: "pending",
          note: "Mas'ul tashkilotga yo'naltiriladi."
        },
        {
          step: "Natija",
          date: null,
          status: "pending",
          note: "Murojaat bo'yicha yakuniy hisobot."
        }
      ]
    };

    setItem(KEYS.PROPOSALS, [newProposal, ...proposals]);
    return newProposal;
  },

  async updateProposalStatus(id, newStatus, currentStepIndex = 1, note = "") {
    const proposals = getItem(KEYS.PROPOSALS, INITIAL_PROPOSALS);
    const updated = proposals.map(p => {
      if (p.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        const newTimeline = p.timeline.map((step, idx) => {
          if (idx < currentStepIndex) {
            return { ...step, status: 'completed' };
          } else if (idx === currentStepIndex) {
            return {
              ...step,
              status: 'current',
              date: `${today} ${nowTime}`,
              note: note || step.note
            };
          } else {
            return { ...step, status: 'pending' };
          }
        });

        return {
          ...p,
          status: newStatus,
          timeline: newTimeline
        };
      }
      return p;
    });
    setItem(KEYS.PROPOSALS, updated);
    return updated.find(p => p.id === id);
  },

  // --------------------------------------------------------------------------
  // 5. NEWS (Backend Endpoint: /api/v1/news)
  // --------------------------------------------------------------------------
  async getNews() {
    return getItem(KEYS.NEWS, INITIAL_NEWS);
  },

  async getNewsById(id) {
    const news = await this.getNews();
    return news.find(n => n.id === id) || null;
  },

  async createNews(newsData) {
    const newsList = getItem(KEYS.NEWS, INITIAL_NEWS);
    const newArticle = {
      id: `news-${Date.now()}`,
      title: newsData.title.trim(),
      excerpt: newsData.excerpt.trim(),
      content: newsData.content.trim(),
      category: newsData.category || "Mahalla hayoti",
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.max(2, Math.round(newsData.content.length / 300))} daqiqa`,
      image: newsData.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      views: 1
    };
    setItem(KEYS.NEWS, [newArticle, ...newsList]);
    return newArticle;
  },

  async updateNews(id, updateData) {
    const newsList = getItem(KEYS.NEWS, INITIAL_NEWS);
    const updated = newsList.map(n => (n.id === id ? { ...n, ...updateData } : n));
    setItem(KEYS.NEWS, updated);
    return updated.find(n => n.id === id);
  },

  async deleteNews(id) {
    const newsList = getItem(KEYS.NEWS, INITIAL_NEWS);
    setItem(KEYS.NEWS, newsList.filter(n => n.id !== id));
    return true;
  },

  // --------------------------------------------------------------------------
  // 6. STATISTICS OVERVIEW
  // --------------------------------------------------------------------------
  async getStats() {
    const problems = getItem(KEYS.PROBLEMS, INITIAL_PROBLEMS);
    const achievements = getItem(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    const proposals = getItem(KEYS.PROPOSALS, INITIAL_PROPOSALS);
    const social = getItem(KEYS.SOCIAL, INITIAL_SOCIAL_INITIATIVES);

    const totalProblems = problems.length;
    const resolvedProblems = problems.filter(p => p.status === 'hal_qilindi').length;
    const inProgressProblems = problems.filter(p => p.status === 'jarayonda' || p.status === 'korib_chiqilmoqda').length;
    const newProblems = problems.filter(p => p.status === 'yangi').length;

    const totalVotes = problems.reduce((acc, p) => acc + (p.votes || 0), 0);
    const resolvedRate = totalProblems > 0 ? Math.round((resolvedProblems / totalProblems) * 100) : 0;

    return {
      totalProblems,
      resolvedProblems,
      inProgressProblems,
      newProblems,
      totalAchievements: achievements.length,
      totalProposals: proposals.length,
      activeSocialCases: social.length,
      totalVotes,
      resolvedRate,
      population: MAHALLA_INFO.population,
      households: MAHALLA_INFO.households
    };
  },

  // --------------------------------------------------------------------------
  // RESET ALL DEMO DATA
  // --------------------------------------------------------------------------
  resetToDefaults() {
    localStorage.setItem(KEYS.PROBLEMS, JSON.stringify(INITIAL_PROBLEMS));
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
    localStorage.setItem(KEYS.SOCIAL, JSON.stringify(INITIAL_SOCIAL_INITIATIVES));
    localStorage.setItem(KEYS.PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
    localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
    localStorage.setItem(KEYS.VOTED_IDS, JSON.stringify(['prob-104']));
    localStorage.setItem(KEYS.VOLUNTEERS, JSON.stringify([]));
  }
};
