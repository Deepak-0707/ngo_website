import { useState, useEffect } from 'react';
import { getMyEvents, deleteEvent, updateEvent } from '../api/events';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/Toast';
import { Link } from 'react-router-dom';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const fetchEvents = async () => {
    try {
      const { data } = await getMyEvents();
      setEvents(data.events);
    } catch (err) {
      showToast('Failed to load events', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      showToast('Event deleted successfully');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete event', 'error');
    }
  };

  const handleUpdate = async (form) => {
    setActionLoading(true);
    try {
      const { data } = await updateEvent(editingEvent._id, form);
      setEvents((prev) => prev.map((e) => (e._id === editingEvent._id ? data.event : e)));
      setEditingEvent(null);
      showToast('Event updated successfully');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update event', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {ToastComponent}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-stone-900">My Events</h1>
          <p className="font-body text-stone-500 mt-1">{events.length} event{events.length !== 1 ? 's' : ''} listed</p>
        </div>
        <Link to="/events/new" className="btn-primary">+ New Event</Link>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="font-display text-2xl text-stone-900 mb-6">Edit Event</h2>
            <EventForm
              initialData={editingEvent}
              onSubmit={handleUpdate}
              onCancel={() => setEditingEvent(null)}
              loading={actionLoading}
            />
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-24 card">
          <span className="text-5xl mb-4 block">📭</span>
          <h3 className="font-display text-2xl text-stone-700 mb-2">No events yet</h3>
          <p className="font-body text-stone-400 mb-6">Create your first food donation listing</p>
          <Link to="/events/new" className="btn-primary inline-block">Create Event</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              role="organizer"
              onEdit={setEditingEvent}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
