import React, { createContext, useContext, useState, useCallback } from 'react';
import './theme.css';

const FlasherContext = createContext(null);

export const useFlasher = () => useContext(FlasherContext);

export const FlasherProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const flash = useCallback((type, title, message, timeout = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(t => [{ id, type, title, message }, ...t]);
    if (timeout > 0) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), timeout);
  }, []);

  const value = { flash };
  // expose quick global fallback so legacy code can call window.__flasherFallback(type,title,message)
  // type -> 'info' | 'error' | 'success'
  if (typeof window !== 'undefined') {
    window.__flasherFallback = (type = 'info', title = '', message = '', timeout = 4000) => flash(type, title, message, timeout);
  }

  return (
    <FlasherContext.Provider value={value}>
      {children}
      <div className="flasher-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`flasher ${t.type}`}>
            <div>
              <div className="title">{t.title}</div>
              <div className="msg">{t.message}</div>
            </div>
          </div>
        ))}
      </div>
    </FlasherContext.Provider>
  );
};

export default FlasherProvider;
