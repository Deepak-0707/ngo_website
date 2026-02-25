import { useState, useEffect } from 'react';

const EventForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    foodQuantity: '',
    location: '',
    eventDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        foodQuantity: initialData.foodQuantity || '',
        location: initialData.location || '',
        eventDate: initialData.eventDate
          ? new Date(initialData.eventDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Event Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Annual Gala Dinner Surplus"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Describe the food available, dietary information, etc."
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Food Quantity</label>
          <input
            name="foodQuantity"
            value={form.foodQuantity}
            onChange={handleChange}
            required
            placeholder="e.g. 50 meals, 20kg rice"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          placeholder="Full address or landmark"
          className="input-field"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
