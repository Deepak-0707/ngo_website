import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import EventForm from '../components/EventForm';
import { useToast } from '../components/Toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      await createEvent(form);
      showToast('Event created successfully! 🎉');
      setTimeout(() => navigate('/events/my'), 1500);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Failed to create event';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {ToastComponent}

      <div className="mb-8">
        <h1 className="font-display text-3xl text-stone-900">Create Event</h1>
        <p className="font-body text-stone-500 mt-1">List your surplus food for NGOs to claim</p>
      </div>

      <div className="card p-8">
        <EventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateEvent;
