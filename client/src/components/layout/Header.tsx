import React from 'react';
import { LogOut, Users } from 'lucide-react';
import type { User } from '../../types/types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}
const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <Users className="task-icon" />
          </div>
          <div>
            <h1 className="app-title">Collaborative To-Do</h1>
            <p className="user-greeting">Welcome back, {user.name}!</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="logout-btn"
        >
          <LogOut className="task-icon" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
export default Header;