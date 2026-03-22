import React, { useState } from 'react';
import EventCard from './EventCard';
import { footballLeagues } from '../data/sportsData';
import './Dashboard.css';

const Dashboard = ({ events, selectedCategory, categories }) => {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedSportFilter, setSelectedSportFilter] = useState('all');

  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const now = new Date();

  const isToday = (dateString) => {
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  };

  const isPastEvent = (dateString, timeString) => {
    const eventDateTime = new Date(dateString + ' ' + timeString);
    return eventDateTime < now;
  };

  // Filter by category (sport type)
  let filteredEvents = selectedCategory === 'todos'
    ? events
    : events.filter(event => event.sport === selectedCategory);

  // Filter out past events ONLY on the main "todos" page
  if (selectedCategory === 'todos') {
    filteredEvents = filteredEvents.filter(event => !isPastEvent(event.date, event.time));
  }

  // Filter by sport type when on "todos" page
  const sportFilteredEvents = selectedCategory === 'todos' && selectedSportFilter !== 'all'
    ? filteredEvents.filter(event => event.sport === selectedSportFilter)
    : filteredEvents;

  // Filter by football league
  const leagueFilteredEvents = selectedCategory === 'futebol' && selectedLeague !== 'all'
    ? sportFilteredEvents.filter(event => event.league === selectedLeague)
    : sportFilteredEvents;

  // Sort all events by date and time
  const sortedEvents = [...leagueFilteredEvents].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateA - dateB;
  });

  // Get today's events
  const todayEvents = sortedEvents.filter(event => isToday(event.date));
  const otherEvents = sortedEvents.filter(event => !isToday(event.date));

  const getCategoryIcon = (sportId) => {
    const category = categories.find(cat => cat.id === sportId);
    return category ? category.icon : '🏆';
  };

  const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Todos os Esportes';

  // Reset filters when category changes
  React.useEffect(() => {
    setSelectedLeague('all');
    setSelectedSportFilter('all');
  }, [selectedCategory]);

  // Get available sports for filtering (excluding 'todos')
  const sportsForFilter = categories.filter(cat => cat.id !== 'todos');

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h2>{categoryName}</h2>
        <p className="event-count">
          {sortedEvents.length} {sortedEvents.length === 1 ? 'evento agendado' : 'eventos agendados'}
        </p>
      </div>

      {/* Sport filter for "Todos os Esportes" page */}
      {selectedCategory === 'todos' && (
        <div className="league-filter">
          <label htmlFor="sport-filter">Filtrar por Esporte:</label>
          <select
            id="sport-filter"
            value={selectedSportFilter}
            onChange={(e) => setSelectedSportFilter(e.target.value)}
            className="league-select"
          >
            <option value="all">Todos os Esportes</option>
            {sportsForFilter.map(sport => (
              <option key={sport.id} value={sport.id}>
                {sport.icon} {sport.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* League filter for football */}
      {selectedCategory === 'futebol' && (
        <div className="league-filter">
          <label htmlFor="league-select">Campeonato:</label>
          <select
            id="league-select"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="league-select"
          >
            {footballLeagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Today's Events Highlight Section */}
      {todayEvents.length > 0 && (
        <div className="today-section">
          <div className="today-header">
            <h3>🔥 Jogos de Hoje</h3>
            <span className="today-count">{todayEvents.length} {todayEvents.length === 1 ? 'jogo' : 'jogos'}</span>
          </div>
          <div className="events-grid today-grid">
            {todayEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                categoryIcon={getCategoryIcon(event.sport)}
                isToday={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Events */}
      {otherEvents.length > 0 && (
        <>
          {todayEvents.length > 0 && (
            <div className="section-divider">
              <h3>📅 Próximos Eventos</h3>
            </div>
          )}
          <div className="events-grid">
            {otherEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                categoryIcon={getCategoryIcon(event.sport)}
              />
            ))}
          </div>
        </>
      )}

      {/* No events message */}
      {sortedEvents.length === 0 && (
        <div className="no-events">
          <p>Nenhum evento agendado para esta categoria.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
