import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import api from '../utils/api';

const SESSION_KEY = 'visitor_counted';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === '1';

        if (alreadyCounted) {
          const { data } = await api.get('/visitors');
          if (!cancelled) setCount(data.count);
          return;
        }

        const { data } = await api.post('/visitors');
        if (!cancelled) {
          setCount(data.count);
          sessionStorage.setItem(SESSION_KEY, '1');
        }
      } catch (err) {
        // If POST is rate-limited or fails, fall back to a plain read
        try {
          const { data } = await api.get('/visitors');
          if (!cancelled) setCount(data.count);
        } catch {
          if (!cancelled) setCount(null);
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  const formatted = count === null ? '—' : count.toLocaleString();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 18px',
        border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: '999px',
        background: 'rgba(16,185,129,0.06)',
        color: '#94a3b8',
        fontSize: '0.82rem',
        fontWeight: 500,
        letterSpacing: '0.3px'
      }}
      aria-label="Total portfolio visitors"
    >
      <FaEye style={{ color: '#10b981' }} />
      <span>
        <span style={{ color: '#10b981', fontWeight: 700 }}>{formatted}</span>
        <span style={{ marginLeft: '6px' }}>visitors</span>
      </span>
    </div>
  );
};

export default VisitorCounter;
