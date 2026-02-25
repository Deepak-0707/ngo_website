import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
    <div className="text-center">
      <p className="font-mono text-forest-500 text-lg mb-4">404</p>
      <h1 className="font-display text-5xl text-stone-900 mb-4">Page Not Found</h1>
      <p className="font-body text-stone-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary inline-block">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
