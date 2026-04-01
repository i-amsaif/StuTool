import { ResumeData } from "./resumeSchema";

export const fresherResume: ResumeData = {
  personal: {
    name: "Mohammed Saif",
    email: "mohammedsaif@gmail.com",
    phone: "+91 98765 43210",
    location: "Mangaluru, Karnataka",
    linkedin: "linkedin.com/in/mohammedsaif",
    github: "github.com/i-amsaif",
  },
  careerObjective:
    "Passionate Computer Science student with hands-on experience in full-stack development and mobile app engineering. Seeking to leverage my skills in React, Next.js, and Kotlin to contribute to impactful software products.",
  education: [
    {
      id: "edu-1",
      level: "Undergraduate",
      institution: "Bearys Institute of Technology",
      board: "VTU",
      degree: "B.E. in Computer Science",
      marksType: "CGPA",
      marks: "8.2",
      year: "2026",
      description: "Relevant Coursework: Data Structures, DBMS, Web Technologies, Software Engineering.",
    },
    {
      id: "edu-2",
      level: "12th",
      institution: "Kendriya Vidyalaya, Mangaluru",
      board: "CBSE",
      degree: "",
      marksType: "Percentage",
      marks: "88",
      year: "2022",
      description: "Science stream with Computer Science.",
    },
    {
      id: "edu-3",
      level: "10th",
      institution: "Kendriya Vidyalaya, Mangaluru",
      board: "CBSE",
      degree: "",
      marksType: "Percentage",
      marks: "91",
      year: "2020",
      description: "",
    },
  ],
  experience: [],
  projects: [
    {
      id: "proj-1",
      name: "StuTool - Student Utility App",
      link: "github.com/i-amsaif/StuTool",
      description:
        "• Built a cross-platform student toolkit with PDF tools (merge, compress, extract) and a resume builder.\n• Developed the Android app in Kotlin with Jetpack Compose and the web app using Next.js.\n• Implemented client-side PDF processing with no server uploads for privacy.",
    },
    {
      id: "proj-2",
      name: "Online Job Portal",
      link: "github.com/i-amsaif/job-portal",
      description:
        "• Developed a full-stack job portal with separate dashboards for admins, employers, and job seekers.\n• Built using PHP, MySQL, and Bootstrap with role-based access control.\n• Features include job posting, application tracking, and search filters.",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "Kotlin",
    "Python",
    "MySQL",
    "Git",
    "HTML/CSS",
  ],
  declaration: {
    enabled: true,
    place: "Mangaluru",
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
    name: "Mohammed Saif",
    email: "mohammed.saif.dev@gmail.com",
    phone: "+91 9876543210",
    location: "Bengaluru, Karnataka",
    linkedin: "linkedin.com/in/mohammedsaif",
    github: "github.com/i-amsaif",
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
      link: "github.com/i-amsaif/analytics-dash",
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
