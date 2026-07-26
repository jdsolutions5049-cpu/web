import React from 'react';

const courseCategories = [
  {
    title: 'Information Technology (IT)',
    icon: 'bi-code-slash',
    description: 'Learn the latest programming languages, software development technologies, data analytics, artificial intelligence, cloud computing, and cybersecurity through practical projects.',
    courses: ['C Programming', 'C++', 'Java', 'Python', 'Full Stack Web Development', 'Data Analysis', 'Data Science', 'Artificial Intelligence & Machine Learning', 'SQL', 'Power BI', 'Cloud Computing (AWS)', 'Software Testing'],
    curriculum: 'Programming Fundamentals, Object-Oriented Programming, Database Management, APIs, Web Technologies, Version Control (Git & GitHub), Live Projects, Industry Assignments, Resume Building, and Interview Preparation.'
  },
  {
    title: 'Civil Engineering',
    icon: 'bi-buildings',
    description: 'Master industry-standard design and construction software with practical applications used in infrastructure and building projects.',
    courses: ['AutoCAD Civil', 'Revit Architecture', 'STAAD.Pro', 'ETABS', 'SketchUp', 'Primavera P6', 'Quantity Surveying', 'Estimation & Costing'],
    curriculum: '2D & 3D Drafting, Structural Analysis, Building Information Modeling (BIM), Project Planning, Construction Management, Estimation, Live Design Projects, and Industry Practices.'
  },
  {
    title: 'Mechanical Engineering',
    icon: 'bi-gear-wide-connected',
    description: 'Develop product design and manufacturing skills using leading CAD/CAM/CAE software and real engineering workflows.',
    courses: ['AutoCAD Mechanical', 'SolidWorks', 'CATIA', 'Creo', 'ANSYS', 'Fusion 360', 'GD&T', 'CNC Programming'],
    curriculum: 'Mechanical Design, 3D Modeling, Assembly Design, Surface Modeling, Sheet Metal, Simulation, Product Development, Manufacturing Processes, and Industrial Projects.'
  },
  {
    title: 'Electronics & Telecommunication (ENTC)',
    icon: 'bi-cpu',
    description: 'Gain practical knowledge in embedded systems, electronics, communication technologies, IoT, and automation.',
    courses: ['Embedded Systems', 'Arduino', 'Raspberry Pi', 'IoT Development', 'PCB Design', 'Embedded C', 'Microcontrollers', 'Robotics', 'MATLAB', 'Digital Electronics'],
    curriculum: 'Embedded Programming, Circuit Design, Sensors & Actuators, Communication Protocols, PCB Designing, IoT Applications, Hardware Interfacing, Mini Projects, and Industry-Based Projects.'
  }
];

const CourseMode = () => {
  const exploreCourses = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="course-mode-section">
      <div className="section-header professional-courses-heading">
        <div className="section-subtitle">PROFESSIONAL COURSES</div>
        <h2 className="section-title dark-text">Build Industry-Ready Skills</h2>
        <div className="section-divider"></div>
        <p>Build industry-ready skills through practical training, live projects, expert mentorship, and hands-on learning. Our courses are designed for students, graduates, and working professionals looking to advance their careers.</p>
      </div>

      <div className="professional-course-grid">
        {courseCategories.map((category) => (
          <article className="professional-course-card" key={category.title}>
            <div className="professional-course-icon"><i className={`bi ${category.icon}`}></i></div>
            <h3>{category.title}</h3>
            <p className="professional-course-description">{category.description}</p>
            <h4>Courses</h4>
            <div className="professional-course-tags">
              {category.courses.map((course) => <span key={course}>{course}</span>)}
            </div>
            <p className="professional-course-curriculum"><strong>Curriculum Includes:</strong> {category.curriculum}</p>
            <button className="professional-course-button" onClick={exploreCourses}>Explore Courses <i className="bi bi-arrow-right"></i></button>
          </article>
        ))}
      </div>

      <div className="course-mode-options">
        <article className="course-mode-card online">
          <div className="course-mode-icon"><i className="bi bi-camera-video-fill"></i></div>
          <div><span className="course-mode-label">COURSE MODE</span><h3>Online</h3><p>Attend live interactive sessions from anywhere.</p></div>
        </article>
        <article className="course-mode-card offline">
          <div className="course-mode-icon"><i className="bi bi-building-fill"></i></div>
          <div><span className="course-mode-label">COURSE MODE</span><h3>Offline</h3><p>Jay Dynamic Solutions Pvt. Ltd.<br />Shop No. 113, 1st Floor, Rainbow Crossroad,<br />Behind McDonald's, Bakori Phata, Wagholi, Pune.</p></div>
        </article>
      </div>
    </section>
  );
};

export default CourseMode;
