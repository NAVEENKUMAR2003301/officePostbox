import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await API.post('/feedback', { content, category, isAnonymous });
      setMessage('Feedback submitted!');
      setContent('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      {user.role === 'admin' && (
        <button onClick={() => navigate('/admin')}>Admin Panel</button>
      )}

      <h3 style={{ marginTop: 24 }}>Submit Feedback</h3>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work Environment</option>
          <option>Management</option>
          <option>Suggestions</option>
        </select>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Your feedback..." />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
          <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} style={{ width: 'auto' }} />
          Submit Anonymously
        </label>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}