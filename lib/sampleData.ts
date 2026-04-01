import { ResumeData } from "./resumeSchema";

export const fresherResume: ResumeData = {
  personal: {
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    linkedin: "linkedin.com/in/rahulsharma",
    github: "github.com/rahulsharma",
  },
  careerObjective:
    "Motivated Computer Science student seeking an opportunity to apply my skills in software development and contribute to innovative projects in a dynamic organization.",
  education: [
    {
      id: "edu-1",
      level: "Undergraduate",
      institution: "Visvesvaraya Technological University",
      board: "VTU",
      degree: "B.Tech in Computer Science",
      marksType: "CGPA",
      marks: "8.5",
      year: "2024",
      description: "Relevant Coursework: Data Structures, Algorithms, DBMS, OS.",
    },
    {
      id: "edu-2",
      level: "12th",
      institution: "Delhi Public School, Bengaluru",
      board: "CBSE",
      degree: "",
      marksType: "Percentage",
      marks: "92",
      year: "2020",
      description: "Science stream with Computer Science.",
    },
    {
      id: "edu-3",
      level: "10th",
      institution: "Delhi Public School, Bengaluru",
      board: "CBSE",
      degree: "",
      marksType: "Percentage",
      marks: "95",
      year: "2018",
      description: "",
    },
  ],
  experience: [],
  projects: [
    {
      id: "proj-1",
      name: "College ERP System",
      link: "github.com/rahulsharma/college-erp",
      description:
        "• Built a full-stack ERP system for managing student records, attendance, and results using React and Node.js.\n• Implemented role-based access for students, faculty, and administrators.\n• Deployed on AWS with 200+ active users.",
    },
    {
      id: "proj-2",
      name: "Weather Forecast App",
      link: "github.com/rahulsharma/weather-app",
      description:
        "• Developed a weather forecasting mobile app using React Native and OpenWeatherMap API.\n• Features include location-based forecasts, 7-day predictions, and push notifications.",
    },
  ],
  skills: [
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "MySQL",
    "Git",
    "HTML/CSS",
  ],
  declaration: {
    enabled: true,
    place: "Bengaluru",
    date: new Date().toISOString().split("T")[0],
  },
  sectionOrder: [
    "personal",
    "careerObjective",
    "education",
    "skills",
    "projects",
    "experience",
    "declaration",
  ],
};

export const experiencedResume: ResumeData = {
  personal: {
    name: "Priya Nair",
    email: "priya.nair@outlook.com",
    phone: "+91 87654 32109",
    location: "Mumbai, Maharashtra",
    linkedin: "linkedin.com/in/priyanair",
    github: "github.com/priyanair",
  },
  careerObjective:
    "Experienced software engineer with 6+ years in full-stack development, seeking a leadership role to drive scalable product engineering and mentor high-performing teams.",
  education: [
    {
      id: "edu-1",
      level: "Postgraduate",
      institution: "IIT Bombay",
      board: "IIT",
      degree: "M.Tech in Software Engineering",
      marksType: "CGPA",
      marks: "9.1",
      year: "2018",
      description: "Thesis on Distributed Microservices Architecture.",
    },
    {
      id: "edu-2",
      level: "Undergraduate",
      institution: "University of Mumbai",
      board: "Mumbai University",
      degree: "B.E. in Information Technology",
      marksType: "CGPA",
      marks: "8.7",
      year: "2016",
      description: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tata Consultancy Services (TCS)",
      position: "Senior Software Engineer",
      startDate: "Mar 2021",
      endDate: "Present",
      description:
        "• Led a team of 8 engineers in building a scalable microservices architecture for a banking platform.\n• Reduced system latency by 40% through database optimization and Redis caching.\n• Mentored junior developers and established code review standards.",
    },
    {
      id: "exp-2",
      company: "Infosys Limited",
      position: "Software Engineer",
      startDate: "Jul 2018",
      endDate: "Feb 2021",
      description:
        "• Developed and maintained 3 enterprise web applications using the MERN stack.\n• Improved API response times by 35% through query optimization.\n• Integrated Razorpay payment gateway for client e-commerce platform.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Open Source Analytics Dashboard",
      link: "github.com/priyanair/analytics-dash",
      description:
        "• Built a lightweight analytics dashboard used by 500+ developers.\n• Featured on GitHub Trending for JavaScript projects.",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "AWS",
    "Docker",
    "MongoDB",
    "System Design",
  ],
  declaration: {
    enabled: false,
    place: "",
    date: new Date().toISOString().split("T")[0],
  },
  sectionOrder: [
    "personal",
    "careerObjective",
    "education",
    "skills",
    "projects",
    "experience",
    "declaration",
  ],
};
