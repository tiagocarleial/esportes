import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { sportsCategories, sportsEvents } from './data/sportsData';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  return (
    <div className="app">
      <Sidebar
        categories={sportsCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Dashboard
        events={sportsEvents}
        selectedCategory={selectedCategory}
        categories={sportsCategories}
      />
    </div>
  );
}

export default App;
