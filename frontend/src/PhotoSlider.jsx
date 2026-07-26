import React, { useEffect, useState } from 'react';

const photos = Array.from({ length: 9 }, (_, index) => `/Photo (${index + 1}).jpeg`);

const PhotoSlider = ({ alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="photo-slider">
      {photos.map((photo, index) => (
        <img key={photo} src={photo} alt={alt} className={index === activeIndex ? 'is-active' : ''} />
      ))}
      <div className="photo-slider-dots" aria-label="Photo slideshow">
        {photos.map((photo, index) => <span key={photo} className={index === activeIndex ? 'is-active' : ''}></span>)}
      </div>
    </div>
  );
};

export default PhotoSlider;
