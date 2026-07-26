import React from 'react';

const Newsletter = () => {
  return (
    <div className="newsletter-band">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <h3>Newsletter - Stay tune and get the latest update</h3>
          <div>Far far away, behind the word mountains</div>
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks — subscription placeholder');}} className="newsletter-form">
          <input type="email" placeholder="Enter email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
