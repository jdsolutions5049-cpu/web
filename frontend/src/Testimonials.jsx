import React, { useState } from 'react';

const Testimonials = ({ items }) => {
  const list = items || [
    { name:'Roger Scott', role:'Marketing Manager', text:'The program helped me level up fast.' },
    { name:'Sarah Johnson', role:'Software Engineer', text:'Great instructors and projects.' },
    { name:'Michael Chen', role:'Data Analyst', text:'Practical and career-focused.' },
  ];
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx(i => (i-1+list.length)%list.length);
  const next = () => setIdx(i => (i+1)%list.length);

  return (
    <div className="testimonials-wrap">
      <div className="carousel">
        <div className="carousel-track" style={{transform:`translateX(${-idx*((100/3)+9.35)}%)`}}>
          {list.map((t,i)=>(
            <div className="testimonial" key={i}>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
              <p className="testimonial-text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button className="btn btn-ghost" onClick={prev}>← Prev</button>
        <button className="btn btn-primary" onClick={next}>Next →</button>
      </div>
    </div>
  );
};

export default Testimonials;
