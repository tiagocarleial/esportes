import React from 'react';
import EventCard from './EventCard';
import './Dashboard.css';

const Dashboard = ({ events, selectedCategory, categories }) => {
  const filteredEvents = selectedCategory === 'todos'
    ? events
    : events.filter(event => event.sport === selectedCategory);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateA - dateB;
  });

  const getCategoryIcon = (sportId) => {
    const category = categories.find(cat => cat.id === sportId);
    return category ? category.icon : '🏆';
  };

  const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Todos os Esportes';

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h2>{categoryName}</h2>
        <p className="event-count">
          {sortedEvents.length} {sortedEvents.length === 1 ? 'evento agendado' : 'eventos agendados'}
        </p>
      </div>

      <div className="events-grid">
        {sortedEvents.length === 0 ? (
          <div className="no-events">
            <p>Nenhum evento agendado para esta categoria.</p>
          </div>
        ) : (
          sortedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              categoryIcon={getCategoryIcon(event.sport)}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Dashboard;
