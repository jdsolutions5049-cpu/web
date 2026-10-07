const courseCatalog = [
  { name: 'Python Programming', category: 'Programming', icon: 'bi-code-slash', description: 'Learn Python fundamentals, object-oriented programming, and practical scripting through guided exercises.' },
  { name: 'Java Programming', category: 'Programming', icon: 'bi-braces', description: 'Build a strong foundation in Java, object-oriented design, and application development.' },
  { name: 'C Programming', category: 'Programming', icon: 'bi-terminal', description: 'Understand core programming concepts, memory, and problem solving with C.' },
  { name: 'C++', category: 'Programming', icon: 'bi-cpu', description: 'Explore object-oriented programming and write efficient applications with C++.' },
  { name: 'SQL', category: 'Data & Analytics', icon: 'bi-database', description: 'Query, organize, and manage relational data with practical SQL exercises.' },
  { name: 'Power BI', category: 'Data & Analytics', icon: 'bi-bar-chart-line', description: 'Turn data into useful dashboards and reports with data modeling and visualization.' },
  { name: 'Web Development', category: 'Web & Quality', icon: 'bi-globe2', description: 'Create responsive websites and learn the core technologies behind the modern web.' },
  { name: 'AI & Machine Learning', category: 'Data & Analytics', icon: 'bi-robot', description: 'Get introduced to machine learning workflows, model building, and applied AI.' },
  { name: 'Data Analysis', category: 'Data & Analytics', icon: 'bi-graph-up-arrow', description: 'Work with datasets, find patterns, and communicate insights using analysis tools.' },
  { name: 'Software Testing', category: 'Web & Quality', icon: 'bi-check2-square', description: 'Practice software testing fundamentals, test case design, and quality assurance workflows.' },
  { name: 'AutoCAD', category: 'Engineering Design', icon: 'bi-rulers', description: 'Develop technical drawing skills and create accurate 2D and 3D designs in AutoCAD.' },
  { name: 'SolidWorks', category: 'Engineering Design', icon: 'bi-box', description: 'Model mechanical parts and assemblies, then prepare clear engineering drawings.' },
  { name: 'CATIA', category: 'Engineering Design', icon: 'bi-gear-wide-connected', description: 'Learn 3D part design, assemblies, and product modeling with CATIA.' }
];
const courses = courseCatalog.map(course => course.name);

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
  // Public pages can render with the schema defaults while MongoDB is offline.
  // The persisted setting will be picked up again once the connection returns.
  if (SiteSetting.db.readyState !== 1) return { key: 'main', satEnabled: true };
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
    res.render('home', {
      title: 'IT Services in Pune | Jay Dynamic Solutions',
      description: 'Jay Dynamic Solutions provides website development, custom software, business applications, IT training, and internship programs in Wagholi, Pune.',
      canonical: 'https://www.jdsolutionss.com/',
      ...pageData,
      homePage: true,
      satEnabled: settings.satEnabled,
      message: req.query.message
    });
  } catch (error) { next(error); }
};
exports.courses = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    res.render('courses', {
      title: 'IT Courses in Pune | Programming & CAD',
      description: 'Explore programming, data analytics, web development, software testing, and engineering design courses with Jay Dynamic Solutions in Pune.',
      canonical: `https://www.jdsolutionss.com${req.path}`,
      courses: courseCatalog,
      courseNames: courses,
      satEnabled: settings.satEnabled,
      message: req.query.message
    });
  } catch (error) { next(error); }
};
exports.careerAcceleration = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    res.render('career-acceleration', {
      title: 'IT Internships in Pune | Career Programs',
      description: 'Explore hands-on technology internships and career programs in Pune, including web development, app development, data analytics, data science, and AI & machine learning.',
      canonical: `https://www.jdsolutionss.com${req.path}`,
      courses: courseCatalog,
      courseNames: courses,
      internships,
      internshipNames: internships.map(item => item[0]),
      careerJobs: (settings.careerJobs || []).filter(job => job.isActive !== false),
      satEnabled: settings.satEnabled,
      message: req.query.message
    });
  } catch (error) { next(error); }
};
exports.internshipsPage = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    res.render('internships', {
      title: 'Internships in Pune | Jay Dynamic Solutions',
      description: 'Explore practical internships in web development, app development, data science, AI and machine learning, and data analytics with Jay Dynamic Solutions in Pune.',
      canonical: `https://www.jdsolutionss.com${req.path}`,
      internships,
      internshipNames: internships.map(item => item[0]),
      satEnabled: settings.satEnabled,
      message: req.query.message
    });
  } catch (error) { next(error); }
};
const sitePages = {
  services: {
    title: 'IT Services & Website Design',
    seoTitle: 'Website Development in Pune | IT Services',
    description: 'Website design and development, web applications, mobile apps, CRM, billing, HRMS, e-commerce, and custom business software for companies in Pune.',
    eyebrow: 'IT SERVICES',
    heading: 'Website development and IT services in Pune.',
    intro: 'Build a business website, web application, mobile app, or custom system with a Wagholi-based team. We also provide CRM, billing, HRMS, e-commerce, maintenance, and support services.',
    icon: 'bi-window-stack',
    items: [
      ['Website Design & Development', 'Responsive business websites, landing pages, portfolios, and CMS solutions designed around your goals.', 'bi-window-stack'],
      ['Web Applications', 'Custom dashboards, portals, booking systems, and internal tools that remove friction from everyday work.', 'bi-code-slash'],
      ['Mobile App Development', 'Reliable Android and cross-platform applications with thoughtful user experiences and maintainable code.', 'bi-phone'],
      ['CRM Software', 'Customer relationship tools to manage leads, sales pipelines, follow-ups, and customer support in one place.', 'bi-person-lines-fill'],
      ['Billing Software', 'Billing and invoicing systems with payment tracking, tax-ready records, and clear business reports.', 'bi-receipt-cutoff'],
      ['HRMS Software', 'Human resource systems for employee records, attendance, leave, onboarding, and day-to-day HR workflows.', 'bi-people'],
      ['Custom Business Software', 'Purpose-built software shaped around your customers, team workflows, and specific business needs.', 'bi-puzzle'],
      ['UI/UX Design', 'Research-led interfaces, wireframes, prototypes, and design systems that make products easier to use.', 'bi-bezier2'],
      ['E-commerce Solutions', 'Conversion-focused online stores with secure payments, catalog management, and simple administration.', 'bi-cart3'],
      ['Maintenance & Support', 'Ongoing improvements, security updates, performance checks, and technical support after launch.', 'bi-shield-check'],
    ],
    formTitle: 'Tell us what you want to build',
    formType: 'IT Services',
  },
  'corporate-training': {
    title: 'Corporate Training Programs',
    seoTitle: 'Corporate IT Training in Pune | Jay Dynamic Solutions',
    description: 'Explore customized technical and workplace training for companies in Pune, including programming, data analytics, AI, cybersecurity, software testing, and team upskilling.',
    eyebrow: 'CORPORATE TRAINING',
    heading: 'Corporate IT training for teams in Pune.',
    intro: 'Plan practical, customized training around your team, tools, and learning goals. Jay Dynamic Solutions works with organizations in Wagholi and across Pune.',
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
    seoTitle: 'College Workshops in Pune | Student IT Training',
    description: 'Explore technical college workshops, seminars, faculty development, and hands-on student training programs with Jay Dynamic Solutions in Pune.',
    eyebrow: 'COLLEGE TRAINING',
    heading: 'College workshops and student training in Pune.',
    intro: 'Give students practical exposure through technology workshops, seminars, project labs, and career-focused programs planned for your college.',
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
    seoTitle: 'About Jay Dynamic Solutions in Pune',
    description: 'Learn about Jay Dynamic Solutions, a Pune-based technology and learning partner for businesses, colleges, and aspiring professionals.',
    eyebrow: 'ABOUT JAY DYNAMIC SOLUTIONS',
    heading: 'About Jay Dynamic Solutions in Pune.',
    intro: 'Jay Dynamic Solutions is a technology and learning partner in Wagholi, Pune, supporting businesses, colleges, and aspiring professionals.',
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
    heading: 'Contact Jay Dynamic Solutions in Pune.',
    intro: 'Contact our Wagholi team about software development, IT services, corporate training, college workshops, or career programs.',
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
    res.render('page', { ...page, slug, satEnabled: settings.satEnabled, title: page.seoTitle, canonical: `https://www.jdsolutionss.com/${slug}`, message: req.query.message });
  } catch (error) { next(error); }
};
exports.sitemap = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    const urls = [
      '/', '/services', '/courses', '/internships', '/career-acceleration',
      '/corporate-training', '/college-training', '/about', '/contact',
      ...(settings.satEnabled ? ['/jds-sat'] : []),
    ];
    const entries = urls.map((url) => `  <url><loc>https://www.jdsolutionss.com${url}</loc></url>`).join('\n');
    res.type('application/xml').set('Cache-Control', 'public, max-age=300').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`
    );
  } catch (error) { next(error); }
};
exports.sat = async (req, res, next) => {
  try {
    const settings = await getSiteSettings();
    if (!settings.satEnabled) return res.status(404).render('error', { message: 'This page is currently unavailable.' });
    res.render('sat', {
      title: 'JDS-SAT Scholarship Aptitude Test 2026',
      description: 'Learn about the JDS-SAT scholarship aptitude test, eligibility, important dates, and available student opportunities from Jay Dynamic Solutions.',
      canonical: 'https://www.jdsolutionss.com/jds-sat',
      courses,
      satEnabled: settings.satEnabled,
      satCountdownEnabled: settings.satCountdownEnabled === true,
      satCountdownAt: settings.satCountdownAt ? new Date(settings.satCountdownAt).toISOString() : '',
      message: req.query.message
    });
  } catch (error) { next(error); }
};
exports.adminDashboard = (req, res) => {
  if (!req.session.admin) return res.render('admin-login', { title: 'Admin Login', error: null });
  const allowedViews = new Set(['dashboard', 'courses', 'internships', 'college', 'corporate', 'sat', 'contacts', 'recruitment']);
  const view = allowedViews.has(req.query.view) ? req.query.view : 'dashboard';
  res.render('admin', {
    title: 'Admin Dashboard', data: req.adminData, view, search: '',
    satEnabled: req.siteSettings?.satEnabled !== false,
    satCountdownEnabled: req.siteSettings?.satCountdownEnabled === true,
    satCountdownAt: req.siteSettings?.satCountdownAt || null,
    careerJobs: req.siteSettings?.careerJobs || [],
    databaseAvailable: req.adminDatabaseAvailable !== false,
    databaseNotice: req.adminDatabaseNotice || '',
    satCountdownLocal: req.siteSettings?.satCountdownAt ? new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date(req.siteSettings.satCountdownAt)).reduce((parts, part) => {
      if (part.type !== 'literal') parts[part.type] = part.value;
      return parts;
    }, {}) : null,
    errorMessage: req.query.error || ''
  });
};
exports.notFound = (req, res) => res.status(404).render('error', { message: 'Page not found.', noindex: true });
