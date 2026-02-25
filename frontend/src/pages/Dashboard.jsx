import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const orgActions = [
    { to: '/events/new', icon: '➕', label: 'Create Event', desc: 'Add a new food donation listing' },
    { to: '/events/my', icon: '📋', label: 'My Events', desc: 'View and manage your listings' },
  ];

  const ngoActions = [
    { to: '/events', icon: '🔍', label: 'Browse Events', desc: 'Find available food donations near you' },
    { to: '/bookings/my', icon: '📦', label: 'My Claims', desc: 'Track your food claim history' },
  ];

  const adminActions = [
    { to: '/admin/users', icon: '👥', label: 'All Users', desc: 'View and manage platform users' },
    { to: '/admin/events', icon: '📅', label: 'All Events', desc: 'Monitor all donation listings' },
    { to: '/admin/bookings', icon: '📊', label: 'All Bookings', desc: 'Track all food claims' },
  ];

  const actions = {
    organizer: orgActions,
    ngo: ngoActions,
    admin: adminActions,
  }[user.role] || [];

  const greeting = {
    organizer: 'Ready to share your surplus?',
    ngo: "Let's find food for your community.",
    admin: 'Platform overview at a glance.',
  }[user.role];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Welcome section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className={`badge-${user.role}`}>{user.role}</span>
        </div>
        <h1 className="font-display text-4xl text-stone-900 mb-2">
          Hello, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="font-body text-stone-500 text-lg">{greeting}</p>
      </div>

      {/* Action cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="card p-6 group cursor-pointer hover:border-forest-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
              <span className="text-2xl">{action.icon}</span>
            </div>
            <h3 className="font-display text-lg text-stone-900 mb-1">{action.label}</h3>
            <p className="font-body text-stone-500 text-sm leading-relaxed">{action.desc}</p>
            <div className="mt-4 flex items-center gap-1 text-forest-600 text-sm font-medium group-hover:gap-2 transition-all">
              <span>Go</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-12 bg-forest-950 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🌿</span>
          <h2 className="font-display text-xl">Your Impact Matters</h2>
        </div>
        <p className="font-body text-forest-300 leading-relaxed text-sm max-w-xl">
          Every piece of food you help save or distribute reduces greenhouse gas emissions, combats
          hunger, and builds stronger communities. Thank you for being part of FoodBridge.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
