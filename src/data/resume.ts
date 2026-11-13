export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
}

export interface ProjectItem {
  title: string;
  type: string;
  points: string[];
  workflows?: string[];
  testTypes?: string[];
  deliverables?: string[];
}

export interface AchievementItem {
  title: string;
  detail: string;
}

export interface ResumeData {
  name: string;
  roles: string[];
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  objective: string;
  education: Education[];
  skills: Record<string, string[]>;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
}

export const resume: ResumeData = {
  name: "Sharon Varghese P",
  roles: ["Software Tester", "QA Engineer", "Playwright Automation", "Bug Hunter"],
  location: "Puthenchira, Thrissur",
  phone: "+91 8592984256",
  email: "sharonvarghesep007@gmail.com",
  linkedin: "https://www.linkedin.com/in/sharonvarghesep", // handle from resume: sharonvarghesep
  github: "https://github.com/Sharon-github-profile", // resume label: Sharon-github-profile

  objective:
    "Computer Science Engineering student with practical experience in Manual Testing of web applications and e-commerce platforms. Skilled in writing test scenarios and test cases, executing functional tests, identifying defects, and documenting bugs using proper bug reports. Good understanding of software testing processes, SDLC, STLC and the defect life cycle, along with hands-on exposure to test automation using Selenium and Playwright. Strong attention to detail, with an interest in pursuing a career as a Software Tester / QA Engineer and contributing to the development of high-quality software.",

  education: [
    { school: "Sahrdaya College of Engineering and Technology", degree: "B.Tech in Computer Science and Engineering", period: "2022 – 2026" },
    { school: "St. Antony's Higher Secondary School, Mala", degree: "Higher Secondary Education", period: "2020 – 2022" }
  ],

  skills: {
    "Testing": ["Manual Testing", "Functional Testing", "Regression Testing", "Smoke Testing", "Sanity Testing", "UI Testing", "End-to-End Testing"],
    "Test Design": ["Test Case Design", "Test Scenario Creation", "Positive & Negative Testing", "Boundary Value Analysis", "Equivalence Partitioning"],
    "Automation": ["Automation Testing", "Selenium", "Playwright"],
    "Programming": ["JavaScript", "TypeScript"],
    "Defect Management": ["Bug Reporting", "Defect Life Cycle", "Severity & Priority", "Defect Tracking"],
    "Tools & Methodologies": ["Git", "GitHub", "SQL", "MySQL", "SDLC", "STLC", "Agile", "Scrum"]
  },

  experience: [
    {
      company: "Testing Mavens",
      role: "QA Intern",
      period: "Oct 2026 – Present",
      current: true,
      points: [
        "Prepared test scenarios and test cases, identified bugs, and reported defects.",
        "Worked with the Playwright framework in TypeScript for test automation."
      ]
    },
    {
      company: "Luminar Technolab",
      role: "Software Testing Intern",
      period: "6 Months",
      points: [
        "Prepared test scenarios and test cases, identified bugs, and reported defects.",
        "Worked with Selenium and WebdriverIO framework in JavaScript for test automation."
      ]
    },
    {
      company: "Google Developer Student Clubs – Sahrdaya College of Engineering and Technology",
      role: "Member",
      period: "Jun 2024",
      points: [
        "Participated in technical activities and learning initiatives related to Google technologies and software development.",
        "Gained exposure to Google Cloud Platform and emerging technologies through collaborative learning."
      ]
    }
  ],

  projects: [
    {
      title: "PrestaShop",
      type: "Manual Software Testing",
      points: [
        "Performed manual testing of the PrestaShop e-commerce platform, covering key workflows such as registration, login, product search, cart, wishlist, account management, and checkout.",
        "Designed and executed functional test cases, including positive, negative, UI, validation, regression and end-to-end testing scenarios.",
        "Identified, documented, and reported defects with appropriate severity and priority, along with detailed steps to reproduce.",
        "Prepared Test Case, Bug Report, Defect Distribution, and Final Test Reports to evaluate the overall application quality."
      ],
      workflows: ["Registration", "Login", "Product Search", "Cart", "Wishlist", "Account Management", "Checkout"],
      testTypes: ["Positive", "Negative", "UI", "Validation", "Regression", "End-to-End"],
      deliverables: ["Test Case", "Bug Report", "Defect Distribution", "Final Test Report"]
    },
    {
      title: "InvisData",
      type: "Image Steganography and Secure Communication",
      points: [
        "Developed a secure communication system that uses image steganography for covert data transmission.",
        "Embedded sensitive information into image files in a way that makes the hidden data imperceptible to unauthorized users.",
        "Focused on improving data privacy and secure communication through image-based information hiding."
      ]
    }
  ],

  achievements: [
    { title: "Micro Project – First Prize", detail: "Sahrdaya College of Engineering and Technology" },
    { title: "AI for Future Workforce Program", detail: "Completed an AI awareness and foundation course conducted at Sahrdaya College of Engineering and Technology." },
    { title: "GenAI Study Jam – 2023 & 2024", detail: "Successfully completed GenAI Study Jam in 2023 and 2024, gaining practical exposure to Generative AI concepts and tools." }
  ]
};

