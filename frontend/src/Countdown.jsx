import React, { useState, useEffect } from 'react';

const Countdown = ({ target = '2026-09-30T00:00:00' }) => {
  const [left, setLeft] = useState(getLeft());

  function getLeft() {
    const now = new Date();
    const t = new Date(target) - now;
    if (t <= 0) return { d:0,h:0,m:0,s:0 };
    const s = Math.floor((t/1000)%60);
    const m = Math.floor((t/1000/60)%60);
    const h = Math.floor((t/1000/60/60)%24);
    const d = Math.floor(t/1000/60/60/24);
    return { d,h,m,s };
  }

  useEffect(() => {
    const id = setInterval(()=> setLeft(getLeft()),1000);
    return ()=> clearInterval(id);
  },[]);

  return (
    <div className="countdown">
      <div className="unit"><div className="num">{left.d}</div><div className="label">Days</div></div>
      <div className="unit"><div className="num">{left.h}</div><div className="label">Hours</div></div>
      <div className="unit"><div className="num">{left.m}</div><div className="label">Minutes</div></div>
      <div className="unit"><div className="num">{left.s}</div><div className="label">Seconds</div></div>
    </div>
  );
};

export default Countdown;
