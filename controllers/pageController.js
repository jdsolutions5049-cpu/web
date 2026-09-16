const courses = [
  'Python Programming', 'Java Programming', 'C Programming', 'C++', 'SQL', 'Power BI',
  'Web Development', 'AI & Machine Learning', 'Data Analysis', 'Software Testing',
  'AutoCAD', 'SolidWorks', 'CATIA'
];

const internships = [
  ['Web Development', 'bi-globe2', 'Master HTML, CSS, JavaScript, React, and Node.js.'],
  ['App Development', 'bi-phone', 'Build cross-platform mobile apps and learn API integration.'],
  ['Data Science', 'bi-bar-chart-line', 'Analyze datasets with Python, visualization, and predictive analysis.'],
  ['AI & Machine Learning', 'bi-robot', 'Build models for image recognition and natural language processing.'],
  ['Data Analytics', 'bi-graph-up-arrow', 'Transform raw data into insights with Excel, Tableau, and Power BI.'],
];

const pageData = { courses, internships };

const SiteSetting = require('../models/SiteSetting');

const getSiteSettings = async () => {
  const settings = await SiteSetting.findOneAndUpdate(
    { key: 'main' },
    { $setOnInsert: { key: 'main', satEnabled: true } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  return settings;
};

exports.home = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    res.render('home', { title: 'Internships & IT Services in Pune', ...pageData, homePage: true, satEnabled: settings.satEnabled, message: req.query.message });
  } catch (error) { next(error); }
};
const sitePages = {
  services: {
    title: 'IT Services & Website Design',
    seoTitle: 'IT Services, Website Design & Digital Solutions in Pune',
    description: 'Professional website design, web development, software, and digital solutions for growing businesses in Pune and across India.',
    eyebrow: 'IT SERVICES',
    heading: 'Digital work that helps your business move.',
    intro: 'From a first website to a complete business platform, we design and build clear, fast, and useful technology for your next stage.',
    icon: 'bi-window-stack',
    items: [
      ['Website Design & Development', 'Responsive business websites, landing pages, portfolios, and CMS solutions designed around your goals.', 'bi-window-stack'],
      ['Web Applications', 'Custom dashboards, portals, booking systems, and internal tools that remove friction from everyday work.', 'bi-code-slash'],
      ['Mobile App Development', 'Reliable Android and cross-platform applications with thoughtful user experiences and maintainable code.', 'bi-phone'],
      ['UI/UX Design', 'Research-led interfaces, wireframes, prototypes, and design systems that make products easier to use.', 'bi-bezier2'],
      ['E-commerce Solutions', 'Conversion-focused online stores with secure payments, catalog management, and simple administration.', 'bi-cart3'],
      ['Maintenance & Support', 'Ongoing improvements, security updates, performance checks, and technical support after launch.', 'bi-shield-check'],
    ],
    formTitle: 'Tell us what you want to build',
    formType: 'IT Services',
  },
  'corporate-training': {
    title: 'Corporate Training Programs',
    seoTitle: 'Corporate Training Programs for Modern Teams',
    description: 'Customized technical, leadership, soft skills, HR, and workplace training programs for companies and teams.',
    eyebrow: 'CORPORATE TRAINING',
    heading: 'Build capability inside your team.',
    intro: 'Practical, customized training designed around your people, your tools, and the outcomes your organization needs next.',
    icon: 'bi-people',
    items: [
      ['Technical Training', 'Full stack development, Python, Java, cloud, data analytics, AI, cybersecurity, testing, and emerging technology.', 'bi-cpu'],
      ['Leadership Training', 'Programs that help managers communicate clearly, make better decisions, and lead with confidence.', 'bi-compass'],
      ['Soft Skills Training', 'Business communication, presentation skills, teamwork, time management, and professional effectiveness.', 'bi-chat-square-text'],
      ['HR Training', 'Practical learning for recruitment, employee engagement, performance, workplace culture, and HR technology.', 'bi-person-badge'],
      ['Foreign Languages', 'Language programs for professionals and teams working with global customers and partners.', 'bi-translate'],
      ['Customized Programs', 'We begin with your training needs analysis and shape the curriculum, format, and delivery around it.', 'bi-sliders'],
    ],
    formTitle: 'Plan a corporate training program',
    formType: 'Corporate Training',
  },
  'college-training': {
    title: 'College Workshops & Student Training',
    seoTitle: 'College Workshops, Seminars & Student Training Programs',
    description: 'Hands-on college workshops, seminars, faculty development programs, and industry-oriented training for students.',
    eyebrow: 'COLLEGE TRAINING',
    heading: 'Turn a workshop into a head start.',
    intro: 'Give students practical exposure through expert-led workshops, live projects, seminars, and career-focused technology programs.',
    icon: 'bi-mortarboard',
    items: [
      ['Technical Workshops', 'Interactive sessions in web development, programming, data science, AI, IoT, robotics, and cybersecurity.', 'bi-code-square'],
      ['Career & Industry Seminars', 'Help students understand current roles, hiring expectations, portfolios, and the path from campus to career.', 'bi-mic'],
      ['Hands-on Project Labs', 'Students learn by building guided projects with tools, mentorship, reviews, and a clear final outcome.', 'bi-kanban'],
      ['Faculty Development', 'Enable faculty members with updated technology knowledge, teaching resources, and industry context.', 'bi-easel2'],
      ['Summer Training', 'Structured short-term programs for students across engineering, computer applications, and management streams.', 'bi-calendar2-week'],
      ['Campus Engagement', 'Flexible workshops and events planned around your academic calendar, audience, and learning objectives.', 'bi-building'],
    ],
    formTitle: 'Organize a college workshop',
    formType: 'College Workshop',
  },
  about: {
    title: 'About Us',
    seoTitle: 'About Jay Dynamic Solutions | Training & IT Services',
    description: 'Learn about Jay Dynamic Solutions, a Pune-based technology and learning partner for businesses, colleges, and aspiring professionals.',
    eyebrow: 'ABOUT JAY DYNAMIC SOLUTIONS',
    heading: 'A practical partner for learning and building.',
    intro: 'We bring technology services, corporate learning, and student development together so people and organizations can make meaningful progress.',
    icon: 'bi-stars',
    items: [
      ['Our approach', 'We listen first, simplify the problem, and deliver work that is useful in the real world.', 'bi-lightbulb'],
      ['Learning by doing', 'Our training is project-led, mentor-supported, and connected to the tools people use at work.', 'bi-hammer'],
      ['People before process', 'Every program and product is shaped around the people who will use it, learn from it, or depend on it.', 'bi-heart'],
    ],
    formTitle: 'Start a conversation with our team',
    formType: 'General Enquiry',
  },
  contact: {
    title: 'Contact Us',
    seoTitle: 'Contact Jay Dynamic Solutions in Pune',
    description: 'Contact Jay Dynamic Solutions for IT services, corporate training, college workshops, internships, and student programs.',
    eyebrow: 'CONTACT US',
    heading: 'Let us talk about the next useful step.',
    intro: 'Share a little about your requirement and our team will get back to you with a clear way forward.',
    icon: 'bi-chat-square-dots',
    items: [
      ['Call us', '+91 83080 35049', 'bi-telephone'],
      ['Email us', 'Info@jdsolutionss.com', 'bi-envelope'],
      ['Visit us', 'Rainbow Crossroad, Wagholi, Pune', 'bi-geo-alt'],
    ],
    formTitle: 'Send us your enquiry',
    formType: 'Contact',
  },
};

exports.page = (slug) => async (req, res, next) => {
  const page = sitePages[slug];
  try {
    const settings = await getSiteSettings();
    res.render('page', { ...page, slug, satEnabled: settings.satEnabled, title: page.seoTitle, canonical: `https://www.jdsolutionss.com${req.path}`, message: req.query.message });
  } catch (error) { next(error); }
};
exports.sat = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    if (!settings.satEnabled) return res.status(404).render('error', { message: 'This page is currently unavailable.' });
    res.render('sat', { title: 'JDS-SAT Scholarship Aptitude Test 2026', courses, message: req.query.message });
  } catch (error) { next(error); }
};
exports.adminDashboard = (req, res) => {
  if (!req.session.admin) return res.render('admin-login', { title: 'Admin Login', error: null });
  const allowedViews = new Set(['dashboard', 'courses', 'internships', 'corporate', 'sat', 'contacts']);
  const view = allowedViews.has(req.query.view) ? req.query.view : 'dashboard';
  res.render('admin', { title: 'Admin Dashboard', data: req.adminData, view, search: '', satEnabled: req.siteSettings?.satEnabled !== false });
};
exports.notFound = (req, res) => res.status(404).render('error', { message: 'Page not found.' });
