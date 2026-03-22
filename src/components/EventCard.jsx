import React from 'react';
import './EventCard.css';

const EventCard = ({ event, categoryIcon }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <span className="event-icon">{categoryIcon}</span>
        <span className="event-league">{event.league}</span>
      </div>

      <h3 className="event-title">{event.title}</h3>

      <div className="event-details">
        <div className="event-detail">
          <span className="detail-label">📅 Data:</span>
          <span className="detail-value">{formatDate(event.date)}</span>
        </div>

        <div className="event-detail">
          <span className="detail-label">⏰ Horário:</span>
          <span className="detail-value">{event.time}</span>
        </div>

        <div className="event-detail">
          <span className="detail-label">📺 Onde assistir:</span>
          <span className="detail-value">{event.channel}</span>
        </div>

        {event.stadium && (
          <div className="event-detail">
            <span className="detail-label">🏟️ Local:</span>
            <span className="detail-value">{event.stadium}</span>
          </div>
        )}

        {event.result && (
          <div className="event-detail result-detail">
            <span className="detail-label">🏆 Resultado:</span>
            <span className="detail-value">{event.result}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
