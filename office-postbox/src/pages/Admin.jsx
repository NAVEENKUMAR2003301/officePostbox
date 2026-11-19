import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/feedback')
      .then((res) => setFeedback(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'));
  }, []);

  return (
    <div className="container">
      <h2>Admin — All Feedback</h2>
      <button onClick={() => navigate('/dashboard')}>Back</button>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {feedback.map((item) => (
        <div key={item._id} className="card">
          <p>
            <strong>{item.category}</strong>{' '}
            {item.isAnonymous ? '(Anonymous)' : `by ${item.submittedBy?.name || 'Unknown'}`}
          </p>
          <p style={{ margin: '8px 0' }}>{item.content}</p>
          <small style={{ color: '#666' }}>
            {new Date(item.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}