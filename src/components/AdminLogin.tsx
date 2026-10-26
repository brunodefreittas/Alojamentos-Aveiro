import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
  language?: 'pt' | 'en';
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onClose, language = 'pt' }) => {
  const isPt = language === 'pt';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Try Supabase auth login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        // Fallback if Supabase user isn't created yet
        if (email === 'contacto@alojamentosaveiro.pt' && password === 'Ouditot2026*') {
          localStorage.setItem('aveiro_admin_logged', 'true');
          onSuccess();
          return;
        }
        throw authError;
      }

      if (data.session) {
        localStorage.setItem('aveiro_admin_logged', 'true');
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || (isPt ? 'Erro ao iniciar sessão. Verifique as credenciais.' : 'Error logging in. Check credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError(isPt ? 'Insira o seu email para recuperar a password.' : 'Enter your email to recover password.');
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setResetSent(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            {isPt ? 'Painel Administrativo' : 'Admin Dashboard'}
          </h2>
          <p className="text-xs text-slate-400">
            {isPt ? 'Gestão de Imóveis • Aveiro' : 'Property Management • Aveiro'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {resetSent ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center text-xs space-y-2">
            <p className="font-semibold">{isPt ? 'Email de recuperação enviado!' : 'Recovery email sent!'}</p>
            <p className="text-slate-400">{isPt ? 'Verifique a sua caixa de entrada.' : 'Check your inbox.'}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aveiro-white.pt"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-indigo-400 hover:underline"
              >
                {isPt ? 'Esqueceu a password?' : 'Forgot password?'}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all"
            >
              {loading ? (isPt ? 'A entrar...' : 'Logging in...') : (isPt ? 'Entrar no Painel' : 'Enter Dashboard')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
