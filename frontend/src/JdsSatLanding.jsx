import React, { useEffect, useRef, useState } from 'react';
import { buildApiUrl, fetchWithTimeout } from './api';
import Countdown from './Countdown';
import FAQ from './FAQ';
import { useFlasher } from './Flasher';

const benefits = [
  { icon: 'bi-award', title: 'Merit-Based Scholarship' },
  { icon: 'bi-laptop', title: 'Industry-Oriented Training' },
  { icon: 'bi-file-earmark-text', title: 'Participation Certificate' },
  { icon: 'bi-trophy', title: 'Merit Certificate' },
  { icon: 'bi-folder2-open', title: 'Hands-on Projects' },
  { icon: 'bi-person-workspace', title: 'Expert Mentorship' },
  { icon: 'bi-file-person', title: 'Resume Building' },
  { icon: 'bi-mic', title: 'Interview Preparation' },
  { icon: 'bi-briefcase', title: 'Internship Opportunity' },
  { icon: 'bi-rocket-takeoff', title: 'Placement Ready Training' }
];

const courses = [
  'Python Programming', 'Java Programming', 'C Programming', 'C++', 'SQL', 'Power BI',
  'Web Development', 'AI & Machine Learning', 'Data Analysis', 'Software Testing',
  'AutoCAD', 'SolidWorks', 'CATIA'
];

const applicants = [
  'Engineering Students', 'Polytechnic Students', 'BCA', 'B.Sc Computer Science',
  'MCA', 'Diploma Students', 'Fresh Graduates', 'Anyone interested in IT skills'
];

const examFacts = [
  ['Mode', 'Online'],
  ['Duration', '60 Minutes'],
  ['Questions', '50'],
  ['Negative Marking', 'No'],
  ['Language', 'English'],
  ['Type', 'MCQ']
];

const syllabus = [
  { title: 'Logical Reasoning', items: ['Coding-Decoding', 'Blood Relation', 'Direction', 'Puzzle', 'Pattern'] },
  { title: 'English', items: ['Grammar', 'Vocabulary', 'Sentence Correction', 'Reading'] },
  { title: 'Computer Fundamentals', items: ['Operating System', 'Internet', 'MS Office', 'Networking Basics', 'Programming Concepts'] }
];

const whyJds = [
  'Industry Experienced Trainers', 'Live Practical Sessions', 'Project Based Learning',
  'Latest Curriculum', 'Personal Mentorship', 'Interview Preparation',
  'Internship Opportunities', 'Career Guidance', 'Affordable Learning', 'Student Support'
];

const timeline = [
  { label: 'Registration Opens', date: '26 July 2026' },
  { label: 'Registration Closes', date: '16 August 2026' },
  { label: 'Scholarship Exam', date: '16 August 2026 | 3:00 PM' },
  { label: 'Result Declaration', date: '18 August 2026' },
  { label: 'Scholarship Announcement', date: '18 August 2026' },
  { label: 'Course Admission Starts', date: '18 August 2026' },
  { label: 'Training Begins', date: '1 September 2026' }
];

const faqItems = [
  { q: 'Is the test free?', a: 'The final test fee policy will be announced by Jay Dynamic Solutions Pvt.Ltd before registration closes.' },
  { q: 'Is scholarship guaranteed?', a: 'Scholarship is awarded based on performance and the announced criteria.' },
  { q: 'Is internship guaranteed?', a: 'Internship opportunities may be available for eligible students based on performance and program requirements.' },
  { q: 'Can I choose any course?', a: 'Yes, scholarship can be applied to eligible courses as per the announced terms.' },
  { q: 'How will results be announced?', a: 'Results will be announced through email and website updates.' }
];

const initialForm = {
  fullName: '',
  mobile: '',
  email: '',
  college: '',
  course: '',
  branch: '',
  year: '',
  city: '',
  state: '',
  resume: ''
};

const JdsSatLanding = () => {
  const flasher = useFlasher();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionLock = useRef(false);

  useEffect(() => {
    document.title = 'JDSAT (JD SAT) Scholarship Aptitude Test 2026 | Jay Dynamic Solutions';
    const description = 'Register for JDSAT, also searched as JD SAT, JDS SAT, or JDSSAT, and compete for scholarships on industry-oriented IT courses.';
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);
    return () => {
      document.title = 'Jay Dynamic Solutions Pvt.Ltd | Internships & IT Services in Pune';
    };
  }, []);

  const handleRegister = () => {
    const el = document.getElementById('jds-register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const setField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fullName = form.fullName.trim();
    const mobile = form.mobile.replace(/\D/g, '');
    const email = form.email.trim();
    let validationMessage = '';

    if (fullName.length < 2) validationMessage = 'Please enter your full name';
    else if (!/^[6-9]\d{9}$/.test(mobile)) validationMessage = 'Enter a valid 10-digit Indian mobile number';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) validationMessage = 'Enter a valid email address';
    else if (!form.college.trim()) validationMessage = 'Please enter your college name';
    else if (!form.course) validationMessage = 'Please choose a course';

    if (validationMessage) {
      if (flasher) flasher.flash('error', 'Validation', validationMessage);
      else window.__flasherFallback('error', 'Validation', validationMessage);
      return;
    }

    if (submissionLock.current) {
      const message = 'Your registration is already being submitted. Please wait.';
      if (flasher) flasher.flash('info', 'Please Wait', message);
      else window.__flasherFallback('info', 'Please Wait', message);
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        phone: mobile,
        email: form.email,
        domain: form.course || 'N/A',
        type: 'Scholarship Registration',
        source: 'JDS-SAT',
        college: form.college,
        course: form.course,
        branch: form.branch,
        year: form.year,
        city: form.city,
        state: form.state,
        resume: form.resume
      };
      const res = await fetchWithTimeout(buildApiUrl('/api/enquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (flasher) flasher.flash('success', 'Registered', 'Registration submitted successfully');
        else window.__flasherFallback('success', 'Registered', 'Registration submitted successfully');
        setForm(initialForm);
      } else {
        const text = await res.text();
        const message = text || 'Submission failed';
        if (flasher) flasher.flash('error', res.status === 409 ? 'Already Registered' : 'Server', message);
        else window.__flasherFallback('error', res.status === 409 ? 'Already Registered' : 'Server', message);
      }
    } catch (err) {
      if (flasher) flasher.flash('error', 'Network', 'Unable to submit - check your connection');
      else window.__flasherFallback('error', 'Network', 'Unable to submit - check your connection');
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sat-page">
      <button onClick={handleRegister} className="sat-sticky-register">Register Now</button>
      <a className="sat-whatsapp" href="https://wa.me/918308035049?text=Can%20I%20get%20info%20about%20JDS-SAT%20and%20the%20courses%3F" aria-label="WhatsApp">
        <i className="bi bi-whatsapp"></i>
      </a>

      <header className="sat-header">
        <div className="sat-header-left">
          <h1>Jay Dynamic Solutions Scholarship Aptitude Test (JDS-SAT) 2026</h1>
          <p className="sat-lead">Take One Aptitude Test & Earn Scholarship on Industry-Oriented IT Courses</p>
          <p className="sat-desc">Unlock your career with merit-based scholarships on professional IT courses offered by Jay Dynamic Solutions Pvt.Ltd. Show your skills, secure your scholarship, and begin your journey toward becoming industry-ready.</p>
          <div className="sat-cta-row">
            <button onClick={handleRegister} className="btn btn-primary">Register Now</button>
            <a href="#courses" className="btn btn-ghost">Explore Courses</a>
          </div>
        </div>
        <div className="sat-header-right">
          <div className="sat-logo">JDS</div>
          <div className="sat-illustration"><i className="bi bi-mortarboard"></i></div>
          <div className="sat-badge">Scholarship Badge<br/><strong>Up to 100%</strong></div>
          <Countdown target="2026-08-16T15:00:00+05:30" />
        </div>
      </header>

      <section className="sat-section" id="why">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">ABOUT JDS-SAT</div>
          <h2 className="section-title dark-text">Why Should You Take JDS-SAT?</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-copy-block">
          <p>JDS-SAT is a scholarship aptitude test designed to identify talented students and reward them with scholarships on professional IT courses. The test evaluates aptitude, logical reasoning, problem-solving, and basic technical knowledge.</p>
          <p>Whether you are an Engineering, Polytechnic, BCA, BSc, MCA student, or a recent graduate, JDS-SAT gives you an opportunity to reduce your course fees based on your performance.</p>
        </div>
      </section>

      <section className="sat-section" id="benefits">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">BENEFITS</div>
          <h2 className="section-title dark-text">What Will You Get?</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-grid">
          {benefits.map((item) => (
            <div key={item.title} className="sat-card sat-icon-card">
              <i className={`bi ${item.icon}`}></i>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sat-section sat-registration-section" id="apply">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">REGISTER NOW</div>
          <h2 className="section-title dark-text">Registration Form</h2>
          <div className="section-divider"></div>
        </div>
        <p className="sat-register-note">Register now and compete for scholarships while building industry-ready skills with expert training.</p>
        <form id="jds-register" onSubmit={submitForm} className="sat-form sat-form-wide">
          <input name="fullName" placeholder="Full Name" required minLength="2" autoComplete="name" className="form-input" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} />
          <input name="mobile" placeholder="10-digit Mobile Number" required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength="10" className="form-input" value={form.mobile} onChange={(e) => setField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} />
          <input name="email" placeholder="Email" type="email" required autoComplete="email" className="form-input" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          <input name="college" placeholder="College Name" required className="form-input" value={form.college} onChange={(e) => setField('college', e.target.value)} />
          <select name="course" required className="form-select" value={form.course} onChange={(e) => setField('course', e.target.value)}><option value="">Choose Course</option>{courses.map((course) => <option key={course}>{course}</option>)}</select>
          <input name="branch" placeholder="Branch" className="form-input" value={form.branch} onChange={(e) => setField('branch', e.target.value)} />
          <input name="year" placeholder="Year" className="form-input" value={form.year} onChange={(e) => setField('year', e.target.value)} />
          <input name="city" placeholder="City" className="form-input" value={form.city} onChange={(e) => setField('city', e.target.value)} />
          <input name="state" placeholder="State" className="form-input" value={form.state} onChange={(e) => setField('state', e.target.value)} />
          <input name="resume" placeholder="Resume Link (Optional)" className="form-input" value={form.resume} onChange={(e) => setField('resume', e.target.value)} />
          <button type="submit" className="btn btn-primary" style={{ color: '#000' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Registration...' : 'Submit Registration'}
          </button>
        </form>
      </section>

      <section className="sat-section" id="structure">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">SCHOLARSHIP DETAILS</div>
          <h2 className="section-title dark-text">Scholarship Structure</h2>
          <div className="section-divider"></div>
        </div>
        <ul className="sat-structure-list">
          <li><strong>Top 10 Students</strong><span>100% Scholarship</span></li>
          <li><strong>Rank 11-25</strong><span>75% Scholarship</span></li>
          <li><strong>Rank 26-50</strong><span>50% Scholarship</span></li>
          <li><strong>Rank 51-100</strong><span>30% Scholarship</span></li>
          <li><strong>All Participants</strong><span>Special Scholarships / Course Discount</span></li>
        </ul>
        <p className="sat-note">Final scholarship criteria will be announced by Jay Dynamic Solutions Pvt.Ltd.</p>
      </section>

      <section className="sat-section" id="courses">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">OUR COURSES</div>
          <h2 className="section-title dark-text">Courses Covered Under Scholarship</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-pill-grid">
          {courses.map((course) => <span key={course}>{course}</span>)}
        </div>
      </section>

      <section className="sat-section" id="apply-who">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">ELIGIBILITY</div>
          <h2 className="section-title dark-text">Who Can Apply?</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-grid-small">
          {applicants.map((item) => (
            <div key={item} className="sat-card-compact sat-check-card">
              <i className="bi bi-check-circle"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sat-section" id="exam">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">EXAM INFO</div>
          <h2 className="section-title dark-text">Exam Pattern & Syllabus</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-facts">
          {examFacts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="sat-grid-small">
          <div className="sat-card-compact">
            <h4>Sections</h4>
            <ul>
              <li>Logical Reasoning</li>
              <li>Quantitative Aptitude</li>
              <li>English</li>
              <li>Computer Fundamentals</li>
              <li>Programming Basics</li>
            </ul>
          </div>
          {syllabus.map((group) => (
            <div key={group.title} className="sat-card-compact">
              <h4>{group.title}</h4>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="sat-section" id="why-jds">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">WHY JDS</div>
          <h2 className="section-title dark-text">Why Jay Dynamic Solutions?</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-grid">
          {whyJds.map((item) => (
            <div key={item} className="sat-card sat-icon-card">
              <i className="bi bi-stars"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sat-section" id="timeline">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">JD SAT SCHOLARSHIP EXAMINATION 2026</div>
          <h2 className="section-title dark-text">Important Dates</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-timeline">
          {timeline.map((item, index) => (
            <div key={item.label} className="sat-timeline-step">
              <span>{index + 1}</span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.date}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sat-section" id="industry-skills">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">BUILD INDUSTRY-READY SKILLS</div>
          <h2 className="section-title dark-text">Learn Your Way</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-grid-small">
          <div className="sat-card-compact"><h4>Online</h4><p>Attend live interactive sessions from anywhere.</p></div>
          <div className="sat-card-compact"><h4>Offline</h4><p>Learn in person with practical guidance at our Pune centre.</p></div>
          <div className="sat-card-compact"><h4>Internship</h4><p>Build real-world experience through eligible internship opportunities.</p></div>
          <div className="sat-card-compact"><h4>Corporate Training</h4><p>Upskill teams with focused, industry-aligned training.</p></div>
        </div>
        <p className="sat-register-note">Register now and compete for scholarships while building industry-ready skills with expert training.</p>
      </section>

      <section className="sat-section" id="internship">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">CAREER OPPORTUNITY</div>
          <h2 className="section-title dark-text">Internship Opportunity</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-copy-block">
          <p>Eligible students will receive an Internship Opportunity after successful course completion, based on their performance and eligibility criteria.</p>
        </div>
      </section>

      <section className="sat-section" id="faq">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">FAQ</div>
          <h2 className="section-title dark-text">Frequently Asked Questions</h2>
          <div className="section-divider"></div>
        </div>
        <FAQ items={faqItems} />
      </section>

      <section className="sat-section" id="contact">
        <div className="section-header" style={{marginBottom: 32}}>
          <div className="section-subtitle">CONTACT</div>
          <h2 className="section-title dark-text">Get In Touch</h2>
          <div className="section-divider"></div>
        </div>
        <div className="sat-contact-grid">
          <div><i className="bi bi-telephone"></i><span>Phone: +91 83080 35049</span></div>
          <div><i className="bi bi-envelope"></i><span>Email: Info@jdsolutionss.com</span></div>
          <div><i className="bi bi-globe2"></i><span>Website: www.jdsolutionss.com</span></div>
          <div><i className="bi bi-geo-alt"></i><span>Jay Dynamic Solutions Pvt.Ltd, Shop No. 113, 1st Floor, Rainbow Crossroad, Behind McDonald's, Bakori Phata, Wagholi, Pune.</span></div>
          <div><i className="bi bi-instagram"></i><a href="https://www.instagram.com/jd_solutions_pvt_ltd/" target="_blank" rel="noreferrer">Instagram</a></div>
          <div><i className="bi bi-linkedin"></i><a href="https://www.linkedin.com/company/jd-solution-pune/" target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
      </section>

      <footer className="sat-footer">
        <div className="sat-footer-links">
          <span>About Company</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Refund Policy</span>
          <span>Contact</span>
        </div>
        <div>Copyright &copy; Jay Dynamic Solutions Pvt.Ltd.</div>
      </footer>
    </div>
  );
};

export default JdsSatLanding;
