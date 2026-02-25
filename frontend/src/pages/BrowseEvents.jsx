import { useState, useEffect } from 'react';
import { getAllEvents } from '../api/events';
import { claimEvent } from '../api/bookings';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/Toast';

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const { showToast, ToastComponent } = useToast();

  const fetchEvents = async () => {
    try {
      const { data } = await getAllEvents();
      setEvents(data.events);
    } catch (err) {
      showToast('Failed to load events', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleClaim = async (eventId) => {
    setClaimingId(eventId);
    try {
      await claimEvent(eventId);
      showToast('Food claimed successfully! 🎉 The organizer will be in touch.');
      // Remove from available list
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to claim event', 'error');
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}

      <div className="mb-8">
        <h1 className="font-display text-3xl text-stone-900">Available Food Donations</h1>
        <p className="font-body text-stone-500 mt-1">
          {events.length} event{events.length !== 1 ? 's' : ''} available for claiming
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-24 card">
          <span className="text-5xl mb-4 block">🔍</span>
          <h3 className="font-display text-2xl text-stone-700 mb-2">No events available</h3>
          <p className="font-body text-stone-400">Check back soon — organizers are regularly listing new donations.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              role="ngo"
              onClaim={handleClaim}
              loading={claimingId === event._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseEvents;
