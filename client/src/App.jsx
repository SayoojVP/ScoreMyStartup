import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    status: 'Idea',
  });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    const res = await axios.get('http://localhost:5000/api/ideas');
    setIdeas(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    try {
      const res = await axios.post('http://localhost:5000/api/ideas', form);
      setIdeas([res.data, ...ideas]);
      setForm({ title: '', description: '', category: '', status: 'Idea' });
    } catch (err) {
      console.error('Error submitting idea', err);
    }
  };

  return (
    <div className="container">
      <h1>Submit a Startup Idea</h1>

      <form onSubmit={handleSubmit} className="idea-form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g., EdTech)"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Idea">Idea</option>
          <option value="MVP">MVP</option>
          <option value="Validated">Validated</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h2>My Startup Ideas</h2>
      <ul className="idea-list">
        {ideas.map((idea) => (
          <li key={idea.id} className="idea-card">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <small>Category: {idea.category || 'None'} • Status: {idea.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
