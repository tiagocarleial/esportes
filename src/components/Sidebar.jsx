import React from 'react';
import './Sidebar.css';

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>🏆 Esportes</h1>
        <p>Dashboard de Eventos</p>
      </div>
      <nav className="sidebar-nav">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`nav-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className="nav-icon">{category.icon}</span>
            <span className="nav-text">{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
