import { ResumeData } from "./resumeSchema";

export const fresherResume: ResumeData = {
  personal: {
    name: "Alex Student",
    email: "alex@university.edu",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/alexstudent",
    github: "github.com/alexstudent"
  },
  experience: [],
  education: [
    {
      id: "edu-1",
      school: "University of Texas at Austin",
      degree: "B.S. Computer Science",
      startDate: "Aug 2020",
      endDate: "May 2024",
      description: "GPA: 3.9/4.0. Minor in Mathematics.\nRelevant Coursework: Data Structures, Algorithms, Machine Learning."
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Campus Connect",
      link: "github.com/alexstudent/campusconnect",
      description: "• Built a full-stack social platform for university students using React and Node.js.\n• Implemented real-time messaging with Socket.io, serving 500+ active users."
    },
    {
      id: "proj-2",
      name: "Algorithm Visualizer",
      link: "alexstudent.github.io/algo-vis",
      description: "• Created an interactive web application to visualize sorting algorithms.\n• Utilized TypeScript and HTML5 Canvas for high-performance rendering."
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL", "Git"]
};

export const experiencedResume: ResumeData = {
  personal: {
    name: "Sarah Professional",
    email: "sarah.prof@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahprof",
    github: "github.com/sarahprof"
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Mar 2020",
      endDate: "Present",
      description: "• Led a team of 5 engineers in developing a scalable microservices architecture.\n• Reduced system latency by 40% through database query optimization and caching strategies.\n• Mentored junior developers and instituted comprehensive code review guidelines."
    },
    {
      id: "exp-2",
      company: "Innovative Startups LLC",
      position: "Full Stack Developer",
      startDate: "Jun 2016",
      endDate: "Feb 2020",
      description: "• Developed and launched 3 commercial web applications using the MERN stack.\n• Increased user retention by 25% through performance enhancements and UI/UX improvements.\n• Integrated third-party APIs for payment processing and automated email campaigns."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "State University",
      degree: "M.S. Software Engineering",
      startDate: "Aug 2014",
      endDate: "May 2016",
      description: "Graduated with Honors. Thesis on Distributed Systems."
    },
    {
      id: "edu-2",
      school: "State University",
      degree: "B.S. Computer Science",
      startDate: "Aug 2010",
      endDate: "May 2014",
      description: ""
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Open Source Analytics",
      link: "github.com/sarahprof/os-analytics",
      description: "• Developed a lightweight analytics library used by over 1,000 repositories.\n• Featured on GitHub Trending for JavaScript projects."
    }
  ],
  skills: ["React", "Next.js", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker", "Kubernetes", "System Design"]
};
