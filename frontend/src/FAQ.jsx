import React, { useState } from 'react';

const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);
  const list = items || [
    { q:'Is the test free?', a:'Yes — mention your actual policy here.' },
    { q:'Will everyone receive a certificate?', a:'Participation certificates will be provided.' },
    { q:'Is scholarship guaranteed?', a:'Scholarship is awarded based on performance.' },
  ];

  return (
    <div className="accordion" style={{maxWidth: 900, margin: '0 auto'}}>
      {list.map((it, idx) => (
        <div className="item" key={idx}>
          <div className={`q ${open===idx?'active':''}`} onClick={()=> setOpen(open===idx?null:idx)}>
            <div>{it.q}</div>
            <div>{open===idx?'−':'+'}</div>
          </div>
          {open===idx && <div className="a">{it.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
