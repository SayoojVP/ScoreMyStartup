import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ideas')
      .then(res => setIdeas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Startup Ideas</h1>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <strong>{idea.title}</strong>: {idea.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

