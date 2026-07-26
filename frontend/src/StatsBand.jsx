import React from 'react';

const Stat = ({icon, num, label}) => (
  <div className="stat">
    <div className="num">{num}</div>
    <div className="label">{label}</div>
  </div>
);

const StatsBand = () => {
  return (
    <div className="stats-band">
      <div className="stats">
        <Stat num={3000} label="SUCCESS STORIES" />
        <Stat num={320} label="TRUSTED TUTORS" />
        <Stat num={1000} label="SCHEDULES" />
        <Stat num={587} label="COURSES" />
      </div>
    </div>
  );
}

export default StatsBand;
