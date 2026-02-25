import { useState, useEffect } from 'react';
import { adminGetUsers, adminGetEvents, adminGetBookings } from '../api/admin';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/Toast';

// ---- Admin Users ----
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    adminGetUsers()
      .then(({ data }) => setUsers(data.users))
      .catch(() => showToast('Failed to load users', 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}
      <h1 className="font-display text-3xl text-stone-900 mb-2">All Users</h1>
      <p className="font-body text-stone-500 mb-8">{users.length} users registered</p>

      <div className="card overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Name', 'Email', 'Role', 'Joined'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wide text-stone-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-800">{u.name}</td>
                <td className="px-6 py-4 text-stone-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`badge-${u.role}`}>{u.role}</span>
                </td>
                <td className="px-6 py-4 text-stone-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-body">No users found</div>
        )}
      </div>
    </div>
  );
};

// ---- Admin Events ----
export const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    adminGetEvents()
      .then(({ data }) => setEvents(data.events))
      .catch(() => showToast('Failed to load events', 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}
      <h1 className="font-display text-3xl text-stone-900 mb-2">All Events</h1>
      <p className="font-body text-stone-500 mb-8">{events.length} events total</p>

      <div className="card overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Title', 'Organizer', 'Date', 'Location', 'Status'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wide text-stone-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {events.map((e) => (
              <tr key={e._id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-800 max-w-[180px] truncate">{e.title}</td>
                <td className="px-6 py-4 text-stone-500">{e.createdBy?.name || '—'}</td>
                <td className="px-6 py-4 text-stone-400">{new Date(e.eventDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-stone-400 max-w-[160px] truncate">{e.location}</td>
                <td className="px-6 py-4">
                  <span className={e.isClaimed ? 'badge-claimed' : 'badge-available'}>
                    {e.isClaimed ? 'Claimed' : 'Available'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-body">No events found</div>
        )}
      </div>
    </div>
  );
};

// ---- Admin Bookings ----
export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    adminGetBookings()
      .then(({ data }) => setBookings(data.bookings))
      .catch(() => showToast('Failed to load bookings', 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}
      <h1 className="font-display text-3xl text-stone-900 mb-2">All Bookings</h1>
      <p className="font-body text-stone-500 mb-8">{bookings.length} bookings total</p>

      <div className="card overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Event', 'NGO', 'Status', 'Claimed On'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wide text-stone-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-stone-800 max-w-[200px] truncate">{b.event?.title || '—'}</td>
                <td className="px-6 py-4 text-stone-500">{b.ngo?.name || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    b.status === 'completed' ? 'bg-forest-100 text-forest-700' : 'bg-earth-100 text-earth-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-400">{new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-body">No bookings found</div>
        )}
      </div>
    </div>
  );
};
