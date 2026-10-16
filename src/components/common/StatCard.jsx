import React from 'react';
import { TrendingUp, Users, CheckCircle, Clock, Award, HelpCircle } from 'lucide-react';

const ICON_MAP = {
  check: CheckCircle,
  clock: Clock,
  users: Users,
  award: Award,
  trending: TrendingUp
};

export default function StatCard({
  icon = 'check',
  theme = 'green',
  value,
  label,
  subtext,
  badgeText
}) {
  const IconComponent = ICON_MAP[icon] || HelpCircle;

  return (
    <div className="stat-card">
      <div className={`stat-icon-wrapper stat-icon-${theme}`}>
        <IconComponent size={26} />
      </div>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {badgeText && (
          <div className="stat-card-badge">
            <TrendingUp size={14} />
            <span>{badgeText}</span>
          </div>
        )}
        {subtext && !badgeText && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
