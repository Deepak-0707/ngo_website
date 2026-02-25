import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = {
    organizer: [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/events/new', label: 'Create Event' },
      { to: '/events/my', label: 'My Events' },
    ],
    ngo: [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/events', label: 'Browse Events' },
      { to: '/bookings/my', label: 'My Claims' },
    ],
    admin: [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/admin/users', label: 'Users' },
      { to: '/admin/events', label: 'Events' },
      { to: '/admin/bookings', label: 'Bookings' },
    ],
  };

  const links = isAuthenticated ? navLinks[user.role] || [] : [];

  const roleBadgeClass = {
    organizer: 'badge-organizer',
    ngo: 'badge-ngo',
    admin: 'badge-admin',
  };

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-forest-700 rounded-lg flex items-center justify-center group-hover:bg-forest-800 transition-colors">
              <span className="text-white text-sm">🌿</span>
            </div>
            <span className="font-display font-bold text-xl text-forest-900">FoodBridge</span>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-stone-600 hover:text-forest-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* User Info + Logout */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-stone-800">{user.name}</span>
                  <span className={roleBadgeClass[user.role]}>{user.role}</span>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
