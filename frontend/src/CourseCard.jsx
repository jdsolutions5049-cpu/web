import React from 'react';

const CourseCard = ({title, price, lectures, author, highlight}) => {
  return (
    <div className={"course-card" + (highlight? ' highlight':'')}>
      <div className="course-icon">🎓</div>
      <h3 className="course-title">{title}</h3>
      <div className="course-meta">{lectures} lectures • by {author}</div>
      <div className="course-price">{price}</div>
      <button className="btn btn-ghost enroll">ENROLL NOW!</button>
    </div>
  );
}

export default CourseCard;
