import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-stone-900 text-white overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-forest-800/50 border border-forest-600/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="text-forest-300 text-xs font-mono uppercase tracking-widest">
            Reducing Food Waste Since 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-6">
          Food Waste Ends
          <br />
          <span className="text-forest-400">Here.</span>
        </h1>

        <p className="font-body text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed mb-12">
          FoodBridge connects event organizers with surplus food to NGOs ready to distribute it.
          Every meal saved is a life touched. Join the movement.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-forest-500 hover:bg-forest-400 text-white font-body font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-forest-900/50"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-forest-500 hover:bg-forest-400 text-white font-body font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-forest-900/50"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white font-body font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-2xl mx-auto">
          {[
            { label: 'Meals Saved', value: '10K+' },
            { label: 'NGO Partners', value: '200+' },
            { label: 'Events Listed', value: '500+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-forest-400">{stat.value}</p>
              <p className="font-body text-stone-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mt-24 text-left">
          {[
            {
              icon: '🎪',
              title: 'For Organizers',
              desc: 'List surplus food from your events in minutes. Set location, quantity, and pickup date. An NGO will claim it before it goes to waste.',
              role: 'organizer',
            },
            {
              icon: '🤝',
              title: 'For NGOs',
              desc: 'Browse available food donations in real time. Claim what your community needs and coordinate efficient pickup with organizers.',
              role: 'ngo',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
              <p className="font-body text-stone-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
