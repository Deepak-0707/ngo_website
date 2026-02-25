import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast, ToastComponent } = useToast();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      {ToastComponent}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center">
              <span className="text-white">🌿</span>
            </div>
            <span className="font-display font-bold text-2xl text-forest-900">FoodBridge</span>
          </Link>
          <h1 className="font-display text-3xl text-stone-900 mb-2">Welcome back</h1>
          <p className="font-body text-stone-500 text-sm">Sign in to continue your mission</p>
        </div>

        {/* Form card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 font-body mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-forest-700 font-medium hover:text-forest-800">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
