import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import BrowseEvents from './pages/BrowseEvents';
import MyBookings from './pages/MyBookings';
import { AdminUsers, AdminEvents, AdminBookings } from './pages/AdminPages';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shared protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Organizer routes */}
            <Route
              path="/events/new"
              element={
                <ProtectedRoute roles={['organizer']}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/my"
              element={
                <ProtectedRoute roles={['organizer']}>
                  <MyEvents />
                </ProtectedRoute>
              }
            />

            {/* NGO routes */}
            <Route
              path="/events"
              element={
                <ProtectedRoute roles={['ngo', 'admin']}>
                  <BrowseEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings/my"
              element={
                <ProtectedRoute roles={['ngo']}>
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />

            {/* Fallbacks */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
