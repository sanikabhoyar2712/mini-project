import React, { useState, useEffect } from 'react';
import './GratitudeGarden.css';

const GratitudeGarden = () => {
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF69B4'); // Default pink color
  const [selectedFlowerEmoji, setSelectedFlowerEmoji] = useState('🌸'); // Default flower emoji

  const flowerColors = [
    { 
      name: 'Sunflower', 
      value: '#FFD700', 
      emoji: '🌻',
      category: 'Friends & Family',
      description: 'Express gratitude for the people who bring sunshine to your life'
    },
    { 
      name: 'Rose', 
      value: '#FF69B4', 
      emoji: '🌹',
      category: 'Love & Relationships',
      description: 'Show appreciation for love and deep connections'
    },
    { 
      name: 'Cherry Blossom', 
      value: '#FFB6C1', 
      emoji: '🌸',
      category: 'Nature & Beauty',
      description: 'Celebrate the beauty of nature and life\'s simple pleasures'
    },
    { 
      name: 'Lotus', 
      value: '#E6E6FA', 
      emoji: '🪷',
      category: 'Personal Growth',
      description: 'Acknowledge your journey of growth and inner peace'
    },
    { 
      name: 'Tulip', 
      value: '#FF1493', 
      emoji: '🌷',
      category: 'Achievements',
      description: 'Celebrate your accomplishments and milestones'
    },
    { 
      name: 'Dandelion', 
      value: '#FFEA00', 
      emoji: '🌼',
      category: 'Hopes & Dreams',
      description: 'Express gratitude for opportunities and future possibilities'
    }
  ];

  // Set initial selected flower emoji based on default color
  useEffect(() => {
    const defaultColorEmoji = flowerColors.find(color => color.value === selectedColor)?.emoji || '🌸';
    setSelectedFlowerEmoji(defaultColorEmoji);
  }, []);

  // Load gratitude entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('gratitudeEntries');
    if (savedEntries) {
      setGratitudeEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save gratitude entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(gratitudeEntries));
  }, [gratitudeEntries]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (newEntry.trim()) {
      const entry = {
        id: Date.now(),
        text: newEntry,
        color: selectedColor,
        flowerEmoji: selectedFlowerEmoji,
        date: new Date().toLocaleDateString(),
      };
      setGratitudeEntries([...gratitudeEntries, entry]);
      setNewEntry('');
    }
  };

  const handleDeleteEntry = (id) => {
    setGratitudeEntries(gratitudeEntries.filter(entry => entry.id !== id));
  };

  const handleColorSelect = (colorValue, emoji) => {
    setSelectedColor(colorValue);
    setSelectedFlowerEmoji(emoji);
  };

  return (
    <div className="gratitude-garden">
      <div className="garden-header">
        <h1><span role="img" aria-label="flower">🌺</span> Gratitude Garden</h1>
        <p>Plant flowers of gratitude and watch your garden grow</p>
      </div>

      <div className="garden-content">
        <div className="plant-new-flower">
          <h2>Plant a New Flower</h2>
          <form onSubmit={handleAddEntry}>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="I'm grateful for"
              required
            />
            <div className="color-picker">
              <label>Choose a Flower Type</label>
              <div className="color-options">
                {flowerColors.map((flower) => (
                  <div 
                    key={flower.value} 
                    className="flower-option"
                    onClick={() => handleColorSelect(flower.value, flower.emoji)}
                  >
                    <div 
                      className={`color-option ${selectedColor === flower.value ? 'selected' : ''}`}
                      style={{ backgroundColor: flower.value }}
                    >
                      {flower.emoji}
                    </div>
                    <div className="flower-info">
                      <span className="flower-name">{flower.name}</span>
                      <span className="flower-category">{flower.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="plant-button">
              Plant Flower
            </button>
          </form>
        </div>

        <div className="garden-display">
          <h2>Your Garden</h2>
          {gratitudeEntries.length === 0 ? (
            <p className="no-entries">Your garden is empty. Plant your first flower of gratitude!</p>
          ) : (
            <div className="flowers-grid">
              {gratitudeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flower-container"
                  style={{ backgroundColor: entry.color }}
                >
                  <span className="flower-emoji" role="img" aria-label="flower">{entry.flowerEmoji}</span>
                  <div className="flower-content">
                    <p className="flower-text">{entry.text}</p>
                    <p className="flower-date">{entry.date}</p>
                    <button
                      className="delete-flower"
                      onClick={() => handleDeleteEntry(entry.id)}
                      title="Remove flower"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GratitudeGarden; 