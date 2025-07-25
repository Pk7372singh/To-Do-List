import React from 'react';
import Login from '../components/auth/Login';
import type { AuthData } from '../types/types';
interface AuthPageProps {
  onLogin: (authData: AuthData) => void;
}
const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  return (
    <div className="auth-page">
      <Login onLogin={onLogin} />
    </div>
  );
};
export default AuthPage;