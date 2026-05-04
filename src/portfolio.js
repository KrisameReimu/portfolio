import splashAnimation from "./assets/lottie/splashAnimation";
import oxfordLogo from "./assets/images/oxfordLogo.png";
import polyuLogo from "./assets/images/polyuLogo.png";
import ietLogo from "./assets/images/ietLogo.png";

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

const illustration = {
  animated: true
};

const greeting = {
  username: "Echo Chen",
  title: {
    zh: "你好，我是陈琛",
    en: "Hi, I'm Echo Chen"
  },
  tagline: {
    zh: "AI 开发者 x 多媒体创作者",
    en: "AI Developer x Multimedia Creator"
  },
  subTitle: {
    zh: "我在 PolyU 做 AI 系统、研究支持和多媒体创作，把少数几件事做得可展示、可验证、可持续。",
    en: "At PolyU I work across AI systems, research support, and multimedia creation, focusing on a few things that are showable, verifiable, and sustainable."
  },
  profileImage: require("./assets/images/profile.jpg"),
  resumeLink: "https://img.chenchen-echo.com/chenchen-personal-cv.pdf",
  displayGreeting: true
};

const socialMediaLinks = {
  github: "https://github.com/KrisameReimu",
  linkedin: "https://www.linkedin.com/in/chenchenai/",
  gmail: "chen944420634@gmail.com",
  instagram: "https://www.instagram.com/krisame_reimu/",
  twitter: "",
  youtube: "https://www.youtube.com/@KrisameReimu",
  display: true
};

const skillsSection = {
  title: "What I do",
  subTitle:
    "FULL-STACK AI DEVELOPMENT, MULTIMEDIA STORYTELLING, AND EDUCATIONAL PRODUCT BUILDING",
  skills: [
    "Build GenAI-powered educational feedback systems with React, Flask, and Azure API",
    "Ship end-to-end web products with a focus on clarity, performance, and maintainability",
    "Produce videos, posters, and visual storytelling assets for awards, outreach, and service-learning"
  ],
  softwareSkills: [
    {skillName: "React", fontAwesomeClassname: "fab fa-react"},
    {skillName: "JavaScript", fontAwesomeClassname: "fab fa-js"},
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "Flask", fontAwesomeClassname: "fas fa-server"},
    {skillName: "Azure API", fontAwesomeClassname: "fas fa-cloud"},
    {skillName: "Docker", fontAwesomeClassname: "fab fa-docker"},
    {skillName: "Unity", fontAwesomeClassname: "fab fa-unity"},
    {skillName: "Git", fontAwesomeClassname: "fab fa-git-alt"},
    {skillName: "Canva", fontAwesomeClassname: "fas fa-palette"},
    {skillName: "CapCut", fontAwesomeClassname: "fas fa-film"}
  ],
  display: false
};

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "The Hong Kong Polytechnic University",
      logo: polyuLogo,
      subHeader: "BSc in Internet and Multimedia Technologies",
      duration: "2021 - 2025",
      desc: "Undergraduate training across internet systems, multimedia production, and technical implementation.",
      descBullets: []
    },
    {
      schoolName: "Lady Margaret Hall, University of Oxford",
      logo: oxfordLogo,
      subHeader: "Artificial Intelligence and Machine Learning Program",
      duration: "Summer 2024",
      desc: "Short academic programme focused on AI and machine learning theory and practice.",
      descBullets: []
    }
  ]
};

const techStack = {
  viewSkillBars: false,
  experience: [],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Full-Stack AI Developer / Project Assistant",
      company: "EEE, The Hong Kong Polytechnic University",
      companylogo: polyuLogo,
      date: "Sep 2025 - Present",
      desc: "Developing and maintaining AI-powered feedback and grading systems for educational use.",
      descBullets: [
        "Built Flask + React web applications with Azure API",
        "Developed auto-evaluation and grading workflows",
        "Provided tutorial and lab support as a Teaching Assistant"
      ]
    },
    {
      role: "Ecommerce Platform & Web Developer Intern",
      company: "Borntea Company, Hong Kong",
      companylogo: polyuLogo,
      date: "May 2024 - Jul 2024",
      desc: "Worked on eCommerce delivery, interface improvements, and multimedia-aligned marketing support.",
      descBullets: [
        "Developed and maintained eCommerce platform features",
        "Improved user experience and web performance",
        "Supported campaign execution with marketing teams"
      ]
    },
    {
      role: "Student Assistant",
      company: "Office of Undergraduate Studies, PolyU",
      companylogo: polyuLogo,
      date: "Jun 2023 - Jun 2025",
      desc: "Campus support role covering student guidance, surveys, and public-facing events.",
      descBullets: [
        "Guided freshmen and supported campus onboarding",
        "Served as ambassador at public events and seminars"
      ]
    },
    {
      role: "IET Young Member Programme Contributor",
      company: "The Institution of Engineering and Technology Hong Kong",
      companylogo: ietLogo,
      date: "2024",
      desc: "Recognized for participation and contribution to youth engineering activities."
    }
  ]
};

const bigProjects = {
  title: "Selected Projects",
  subtitle: "CV-backed work only",
  projects: [],
  display: false
};

const achievementSection = {
  title: "Awards & Certifications",
  subtitle: "Verified academic, creative, and service credentials",
  achievementsCards: [],
  display: false
};

const blogSection = {
  title: "Essays",
  subtitle: "Long-form reflections and writing archive",
  blogs: [],
  display: false
};

const talkSection = {
  title: "Photography",
  subtitle: "A curated visual archive published when ready",
  talks: [],
  display: false
};

const gameDevSection = {
  display: false
};

const videoPortfolioSection = {
  display: true
};

const photographySection = {
  display: true
};

const characterSection = {
  display: false
};

const resumeSection = {
  title: "Resume",
  subtitle: "Formal CV and supporting credentials",
  display: true
};

const podcastSection = {
  title: "Podcast",
  subtitle: "Not active in the launch version",
  podcast: [],
  display: false
};

const contactInfo = {
  title: {
    zh: "联系我",
    en: "Contact Me"
  },
  subtitle: {
    zh: "项目合作、研究协作或内容制作相关交流，都可以直接联系。",
    en: "Reach out for collaboration on projects, research support, or multimedia work."
  },
  number: "852 91303739",
  email_address: "chen944420634@gmail.com"
};

const supportInfo = {
  display: true,
  fpsIdentifier: "7659766",
  paymeQrImage: "",
  fpsQrImage: "",
  paypalLink: "https://paypal.me/EhoCHEN",
  paypalQrImage: "/content/support/paypal-qrcode.png",
  stripePaymentLink: "",
  wechatTipQrImage: "",
  alipayQrImage: "",
  paypal: "",
  fps: "",
  alipay: "",
  wechatPay: ""
};

const twitterDetails = {
  userName: "",
  display: false
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  gameDevSection,
  videoPortfolioSection,
  photographySection,
  characterSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection,
  supportInfo
};
