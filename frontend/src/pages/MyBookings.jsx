import { useState, useEffect } from 'react';
import { getMyBookings } from '../api/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/Toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMyBookings();
        setBookings(data.bookings);
      } catch {
        showToast('Failed to load bookings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}

      <div className="mb-8">
        <h1 className="font-display text-3xl text-stone-900">My Claims</h1>
        <p className="font-body text-stone-500 mt-1">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-24 card">
          <span className="text-5xl mb-4 block">📦</span>
          <h3 className="font-display text-2xl text-stone-700 mb-2">No claims yet</h3>
          <p className="font-body text-stone-400">Browse available events and start claiming food for your community.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const event = booking.event;
            const date = event ? new Date(event.eventDate) : null;
            return (
              <div key={booking._id} className="card p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-lg text-stone-900">{event?.title || 'Event Deleted'}</h3>
                      {date && (
                        <p className="text-sm text-stone-400 font-body mt-0.5">
                          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>

                  {event && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-stone-400 font-mono uppercase tracking-wide">Location</p>
                        <p className="text-stone-700 font-body mt-0.5">{event.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-mono uppercase tracking-wide">Food Qty</p>
                        <p className="text-stone-700 font-body mt-0.5">{event.foodQuantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-mono uppercase tracking-wide">Claimed On</p>
                        <p className="text-stone-700 font-body mt-0.5">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'completed'
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-earth-100 text-earth-800'
                    }`}
                  >
                    {booking.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
