import React, { useState } from 'react';
import { Users } from 'lucide-react';
import type { AuthData } from '../../types/types';
import ApiService from '../../api/ApiService';

interface LoginProps {
  onLogin: (authData: AuthData) => void;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiService = new ApiService();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let authData: AuthData;
      if (isLogin) {
        authData = await apiService.login({ email: formData.email, password: formData.password });
      } else {
        authData = await apiService.register(formData);
      }
      apiService.setToken(authData.token);
      onLogin(authData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <Users className="task-icon" />
          </div>
          <h1 className="auth-title">Collaborative To-Do</h1>
          <p className="auth-subtitle">{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            {!isLogin && (
              <>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        <div className="auth-footer">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="auth-toggle"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;