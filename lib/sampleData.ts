import { ResumeData } from "./resumeSchema";

export const fresherResume: ResumeData = {
  personal: {
    name: "Mohammed Saif",
    email: "email@example.com",
    phone: "+91 9876543210",
    location: "Bengaluru, Karnataka",
    linkedin: "linkedin.com/in/i-amsaif",
    github: "github.com/i-amsaif",
  },
  careerObjective:
    "Passionate Computer Science student with hands-on experience in full-stack development and mobile engineering. Seeking to leverage my skills in React and Kotlin to contribute to impactful software products.",
  education: [
    {
      id: "edu-1",
      level: "Undergraduate",
      institution: "National Degree College",
      board: "BNU",
      degree: "B.C.A",
      marksType: "CGPA",
      marks: "8.2",
      year: "2026",
      description: "Coursework: Data Structures, DBMS, Web Tech.",
    },
  ],
  experience: [],
  projects: [
    {
      id: "proj-1",
      name: "StuTool",
      link: "github.com/i-amsaif/StuTool",
      description:
        "• Built a cross-platform toolkit with a local PDF tool suite and resume builder.\n• Developed in Kotlin with Jetpack Compose.",
    },
    {
      id: "proj-2",
      name: "Finvovo",
      link: "github.com/i-amsaif/Finvovo",
      description:
        "• Developed a Android App for Personal & Business Ledger Management.\n• Developed in Kotlin with Jetpack Compose.",
    },
  ],
  skills: ["React", "Kotlin", "Next.js", "Java", "HTML/CSS"],
  declaration: {
    enabled: true,
    place: "Bengaluru",
    date: "2026-04-03",
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
    email: "email@example.com",
    phone: "+91 9876543210",
    location: "Bengaluru, Karnataka",
    linkedin: "linkedin.com/in/i-amsaif",
    github: "github.com/i-amsaif",
  },
  careerObjective:
    "Experienced software engineer with 6+ years in full-stack development, seeking a leadership role to drive scalable product engineering.",
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
        "• Led a team of 8 engineers building microservices.\n• Reduced system latency by 40% through Redis caching.",
    },
    {
      id: "exp-2",
      company: "Infosys Limited",
      position: "Software Engineer",
      startDate: "Jul 2018",
      endDate: "Feb 2021",
      description:
        "• Maintained 3 enterprise MERN web applications.\n• Improved API response times by 35%.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Open Source Analytics Dashboard",
      link: "github.com/i-amsaif/analytics-dash",
      description:
        "• Built a lightweight dashboard used by 500+ developers.",
    },
  ],
  skills: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "MongoDB"],
  declaration: {
    enabled: false,
    place: "",
    date: "2026-04-03",
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
