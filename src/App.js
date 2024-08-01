import React, { useState } from 'react';
import './App.css';
import jokeBotImage from './joke-bot.jpg'; // Import the image

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tellJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
      const data = await response.json();
      setJoke(data[0].setup + ' ' + data[0].punchline);
    } catch (error) {
      setError('Failed to fetch a joke. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="image-container">
          <img src={jokeBotImage} alt="Joke Bot" className="joke-bot-image" /> {/* Use the imported image */}
        </div>
        <button onClick={tellJoke} disabled={loading}>
          {loading ? 'Loading...' : 'Tell me a joke!'}
        </button>
        {joke && <p className="joke-text">{joke}</p>}
        {error && <p className="error">{error}</p>}
      </header>
    </div>
  );
}

export default App;
