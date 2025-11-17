'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../lib/auth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAuthenticated(password)) {
      localStorage.setItem('admin-auth', 'true');
      router.push('/admin/projects');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="bg-darker p-8 rounded-2xl shadow-2xl border border-purple-500/20 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gradient mb-6 text-center">
          Administration Portfolio
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-light text-sm font-medium mb-2">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-light"
              placeholder="Entrez le mot de passe"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}