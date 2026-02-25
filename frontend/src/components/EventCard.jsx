const EventCard = ({ event, onClaim, onEdit, onDelete, role, loading }) => {
  const eventDate = new Date(event.eventDate);
  const isPast = eventDate < new Date();

  return (
    <div className="card p-6 animate-fade-up flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-display text-lg text-stone-900 leading-tight">{event.title}</h3>
          {event.createdBy && (
            <p className="text-xs text-stone-400 font-body mt-0.5">by {event.createdBy.name}</p>
          )}
        </div>
        <span className={event.isClaimed ? 'badge-claimed' : 'badge-available'}>
          {event.isClaimed ? '● Claimed' : '● Available'}
        </span>
      </div>

      {/* Description */}
      <p className="text-stone-600 font-body text-sm leading-relaxed line-clamp-2">
        {event.description}
      </p>

      {/* Meta info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-stone-400 font-mono uppercase tracking-wide">Location</span>
          <span className="text-stone-700 font-body">{event.location}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-stone-400 font-mono uppercase tracking-wide">Food Qty</span>
          <span className="text-stone-700 font-body">{event.foodQuantity}</span>
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <span className="text-xs text-stone-400 font-mono uppercase tracking-wide">Event Date</span>
          <span className={`font-body ${isPast ? 'text-stone-400' : 'text-forest-700 font-medium'}`}>
            {eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {isPast && ' (Past)'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-stone-100">
        {role === 'ngo' && !event.isClaimed && (
          <button
            onClick={() => onClaim(event._id)}
            disabled={loading}
            className="btn-primary text-sm flex-1"
          >
            {loading ? 'Claiming...' : '🤝 Claim Food'}
          </button>
        )}

        {role === 'organizer' && onEdit && (
          <button
            onClick={() => onEdit(event)}
            disabled={event.isClaimed}
            className="btn-secondary text-sm flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Edit
          </button>
        )}

        {role === 'organizer' && onDelete && (
          <button
            onClick={() => onDelete(event._id)}
            disabled={event.isClaimed}
            className="btn-danger text-sm flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
