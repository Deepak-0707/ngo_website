import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'organizer' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
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
          <h1 className="font-display text-3xl text-stone-900 mb-2">Join the movement</h1>
          <p className="font-body text-stone-500 text-sm">Create your account to start reducing food waste</p>
        </div>

        {/* Form card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name or organization name"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Min 6 characters"
                className="input-field"
              />
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2 font-body">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'organizer', label: '🎪 Event Organizer', desc: 'I have surplus food to donate' },
                  { value: 'ngo', label: '🤝 NGO', desc: 'I distribute food to communities' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                      form.role === opt.value
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={opt.value}
                      checked={form.role === opt.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <p className="font-body font-medium text-stone-800 text-sm">{opt.label}</p>
                    <p className="font-body text-stone-400 text-xs mt-1">{opt.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 font-body mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-700 font-medium hover:text-forest-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
