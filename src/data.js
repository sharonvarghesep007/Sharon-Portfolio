export const profile = {
  name: 'Sharon Varghese P',
  initials: 'SV',
  title: 'Software Tester & QA Engineer',
  tagline: 'Computer Science Engineering graduate from Sahrdaya College of Engineering and Technology, Class of 2026.',
  location: 'Puthenchira, Thrissur, Kerala, India',
  locationShort: 'Thrissur, Kerala',
  phone: '+91 8592984256',
  email: 'sharonvarghesep007@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/sharonvarghesep',
  linkedInHandle: 'sharonvarghesep',
  focus: 'Manual testing, automation testing',
  educationSummary: 'B.Tech CSE, Sahrdaya College (2026)',
  backgroundIntro: 'I want to build a career as a Software Tester / QA Engineer and help teams ship high-quality software. I pay close attention to detail and understand SDLC, STLC and the defect life cycle.',
  contactIntro: 'Interested in working together or have an opportunity in software testing? Send me a message.',
  contactNote: 'Based in Puthenchira, Thrissur, Kerala',
  copyright: '© 2026 Sharon Varghese P',
};

export const skills = {
  intro: 'Core competencies across test execution, automation, test design, defect management, and software development processes.',
  groups: [
    {
      id: 'test-execution',
      name: 'Test execution',
      items: [
        'Manual Testing',
        'Functional Testing',
        'Regression Testing',
        'Smoke Testing',
        'Sanity Testing',
        'UI Testing',
        'End-to-End Testing',
      ],
    },
    {
      id: 'automation-testing',
      name: 'Automation testing',
      items: [
        'Automation Testing',
        'Selenium Framework',
        'Playwright Framework',
      ],
    },
    {
      id: 'test-design',
      name: 'Test design',
      items: [
        'Test Case Design',
        'Test Scenario Creation',
        'Positive and Negative Testing',
        'Boundary Value Analysis',
        'Equivalence Partitioning',
      ],
    },
    {
      id: 'defect-management',
      name: 'Defect management',
      items: [
        'Bug Reporting',
        'Defect Life Cycle',
        'Severity and Priority',
        'Defect Tracking',
      ],
    },
    {
      id: 'process-and-tools',
      name: 'Process and tools',
      items: [
        'SQL',
        'MySQL',
        'SDLC',
        'STLC',
        'Agile',
        'Scrum',
      ],
    },
  ],
};

export const projects = {
  intro: 'Software testing and engineering projects demonstrating test lifecycle coverage and secure communication.',
  items: [
    {
      id: 'prestashop',
      title: 'PrestaShop',
      subtitle: 'Manual software testing, e-commerce platform',
      tag: 'Manual Testing',
      highlights: [
        'Performed manual testing of the PrestaShop e-commerce platform, covering registration, login, product search, cart, wishlist, account management and checkout.',
        'Designed and executed functional test cases, including positive, negative, UI, validation, regression and end-to-end scenarios.',
        'Identified, documented and reported defects with appropriate severity and priority, with detailed steps to reproduce.',
        'Prepared Test Case, Bug Report, Defect Distribution and Final Test Reports to evaluate overall application quality.',
      ],
      workflows: [
        'Register',
        'Login',
        'Search',
        'Cart & wishlist',
        'Checkout',
      ],
      testCoverage: {
        note: 'Bars show test types used, not defect counts.',
        areas: [
          {
            area: 'Registration',
            testTypes: ['Positive & Negative', 'Functional', 'UI Testing', 'Validation'],
            level: 80,
          },
          {
            area: 'Login',
            testTypes: ['Positive & Negative', 'Functional', 'Validation', 'Sanity Testing'],
            level: 80,
          },
          {
            area: 'Search',
            testTypes: ['Functional', 'UI Testing', 'Boundary Value Analysis', 'Negative Testing'],
            level: 80,
          },
          {
            area: 'Cart',
            testTypes: ['Functional', 'Validation', 'Regression', 'End-to-End'],
            level: 80,
          },
          {
            area: 'Checkout',
            testTypes: ['Functional', 'Validation', 'End-to-End', 'Regression'],
            level: 80,
          },
        ],
      },
    },
    {
      id: 'invisdata',
      title: 'INVISDATA',
      subtitle: 'Image steganography, secure communication system',
      tag: 'Security & Privacy',
      highlights: [
        'Developed a secure communication system that uses image steganography for covert data transmission.',
        'Embedded sensitive information into image files so the hidden data is imperceptible to unauthorized users.',
        'Focused on data privacy and secure communication through image-based information hiding.',
      ],
    },
  ],
};

export const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Sahrdaya College of Engineering and Technology',
    period: '2022 – 2026',
    score: null,
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'St. Antony’s Higher Secondary School, Mala',
    period: '2020 – 2022',
    score: '87.75%',
  },
];

export const experience = {
  role: 'Member',
  organization: 'Google Developer Student Clubs, Sahrdaya College of Engineering and Technology',
  period: 'Jun 2024',
  highlights: [
    'Participated in technical activities and learning initiatives related to Google technologies and software development.',
    'Gained exposure to Google Cloud Platform and emerging technologies through collaborative learning.',
  ],
};

export const achievements = [
  'Micro Project, First Prize (Sahrdaya College of Engineering and Technology)',
  'AI for Future Workforce Program: completed an AI awareness and foundation course at Sahrdaya College',
  'GenAI Study Jam, completed in 2023 and 2024',
];
