/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import placeholderImages from "./placeholderImages"; // Placeholder images for quick start
import {certificationCards} from "./data/certifications";

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Echo Chen",
  title: {
    zh: "你好，我是陈琛",
    en: "Hi, I'm Echo Chen"
  },
  tagline: {
    zh: "AI 开发者 × 游戏创作者 × 数字叙事者",
    en: "AI Developer x Game Creator x Digital Storyteller"
  },
  subTitle: {
    zh: "我在技术与创意的交汇处创造体验：从 AI 教育工具到沉浸式游戏与获奖影像作品。作为 PolyU 的研究项目助理，我持续探索 AI 与多媒体如何放大人类表达。",
    en: "I build experiences at the intersection of technology and creativity, from AI education tools to immersive games and award-winning multimedia. As a research project assistant at PolyU, I explore how AI and multimedia can amplify human expression."
  },
  story: {
    zh: "我相信技术的意义在于让故事被更多人看见。无论是纪录片镜头、摄影作品，还是交互式游戏，我都在寻找能够连接人心的叙事方式。",
    en: "I believe technology matters when it helps stories reach people. Through documentaries, photography, and interactive games, I'm always searching for narratives that connect with hearts."
  },
  profileImage: require("./assets/images/profile.jpg"), // 你的个人头像
  resumeLink: "https://img.chenchen-echo.com/ChenChen_Personal_CV_2026.pdf",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/KrisameReimu",
  linkedin: "https://www.linkedin.com/in/chenchenai/",
  gmail: "krisamegreimu@flounderfantasy.com",
  instagram: "https://www.instagram.com/krisame_reimu/",
  twitter: "",
  youtube: "https://www.youtube.com/@KrisameReimu",
  display: true
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "FULL-STACK DEVELOPER & AI ENTHUSIAST WHO TURNS IDEAS INTO REALITY",
  skills: [
    "Develop AI-powered educational tools using GPT-4 and Azure OpenAI for personalized learning experiences",
    "Create immersive 2D action-adventure games with Unity, featuring intricate level design and narrative-driven gameplay",
    "Build responsive full-stack web applications with React.js, Flask, and modern JavaScript frameworks",
    "Design and produce multimedia content as a Department Multimedia Producer, bringing creative visions to life",
    "Write compelling articles and stories that blend technical insights with creative narratives"
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "PyTorch",
      fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "TensorFlow",
      fontAwesomeClassname: "fas fa-project-diagram"
    },
    {
      skillName: "Unity",
      fontAwesomeClassname: "fab fa-unity"
    },
    {
      skillName: "C#",
      fontAwesomeClassname: "fas fa-code"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "SQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "Adobe PR",
      fontAwesomeClassname: "fas fa-film"
    },
    {
      skillName: "Adobe PS",
      fontAwesomeClassname: "fas fa-image"
    },
    {
      skillName: "Photography",
      fontAwesomeClassname: "fas fa-camera"
    },
    {
      skillName: "3ds Max",
      fontAwesomeClassname: "fas fa-cube"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "The Hong Kong Polytechnic University",
      logo: placeholderImages.polyuLogo,
      subHeader: "BSc in Internet and Multimedia Technologies",
      duration: "September 2021 - August 2025 (Expected)",
      desc: " Focused on multimedia development, programming, and machine intelligence.",
      descBullets: [
        "Key courses: Digital and Computer Systems (A+), Computer Programming (A), Fundamentals of Machine Intelligence (A)",
        "Object-Oriented Design and Programming (A), Database System (A-)"
      ]
    },
    {
      schoolName: "University of Oxford - Lady Margaret Hall",
      logo: placeholderImages.oxfordLogo,
      subHeader: "Short Academic Programme: AI and Machine Learning",
      duration: "August 5 - August 23, 2024",
      desc: "Completed a short academic programme on Artificial Intelligence and Machine Learning: Theory and Practice",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Game Development", //Insert stack or technology you have experience in
      progressPercentage: "85%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Photography & Video Editing",
      progressPercentage: "90%"
    },
    {
      Stack: "Programming",
      progressPercentage: "75%"
    },
    {
      Stack: "Creative Writing",
      progressPercentage: "80%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Department Multimedia Producer",
      company: "The Hong Kong Polytechnic University",
      companylogo: placeholderImages.polyuLogo,
      date: "Jun 2023 - Jun 2025",
      desc: "Creating and producing multimedia content for the department, showcasing technical and creative expertise.",
      descBullets: [
        "Produced high-quality multimedia content for departmental communications",
        "Designed visual assets and managed video production workflows",
        "Collaborated with faculty and students on creative projects"
      ]
    },
    {
      role: "Web Developer Intern",
      company: "BornTea",
      companylogo: placeholderImages.bornteaLogo,
      date: "Jun 2024 - Aug 2024",
      desc: "Developed and maintained eCommerce platform, improving user experience and web performance.",
      descBullets: [
        "Built responsive web interfaces using modern JavaScript frameworks",
        "Integrated digital campaigns with marketing teams",
        "Supported multimedia marketing strategies and content creation"
      ]
    },
    {
      role: "Student Assistant",
      company: "The Hong Kong Polytechnic University",
      companylogo: placeholderImages.polyuLogo,
      date: "Jul 2023 - Jul 2025",
      desc: "Supporting campus initiatives and representing PolyU at various events.",
      descBullets: [
        "Guided 200+ freshmen annually as Student Ambassador",
        "Represented PolyU at 20+ public events and seminars",
        "Conducted campus surveys and assisted with administrative tasks"
      ]
    },
    {
      role: "IET Young Member Programme Contributor",
      company: "The Institution of Engineering and Technology Hong Kong",
      companylogo: placeholderImages.ietLogo,
      date: "2024",
      desc: "Active participant in promoting engineering innovation and mentoring young students."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Featured Projects",
  subtitle:
    "INNOVATIVE SOLUTIONS AT THE INTERSECTION OF AI, GAMES, AND WEB TECHNOLOGIES",
  projects: [
    {
      image: placeholderImages.genaiFeedback,
      projectName: "GenAI Feedback System",
      projectDesc:
        "AI-powered educational feedback system using GPT-4 for automated, personalized assessment. Published at WAIE2025.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/KrisameReimu"
        }
      ]
    },
    {
      image: placeholderImages.melinaGame,
      projectName: "Melina Dream of Hero",
      projectDesc:
        "2D action-adventure puzzle game inspired by Hollow Knight, featuring intricate level design, combat mechanics, and narrative-driven gameplay.",
      footerLink: [
        {
          name: "View Details",
          url: "#game-showcase"
        }
      ]
    },
    {
      image: placeholderImages.ecommerceWeb,
      projectName: "BornTea eCommerce Platform",
      projectDesc:
        "Full-stack eCommerce web application with enhanced user experience and integrated marketing campaigns.",
      footerLink: [
        {
          name: "Case Study",
          url: "#"
        }
      ]
    },
    {
      image: placeholderImages.multimediaPortfolio,
      projectName: "Multimedia Production Works",
      projectDesc:
        "Collection of multimedia productions including promotional videos, creative content, and visual storytelling projects.",
      footerLink: [
        {
          name: "View Portfolio",
          url: "#video-portfolio"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: "Achievements And Certifications",
  subtitle:
    "Awards, Certifications and Recognition for my contributions and skills",

  achievementsCards: certificationCards,
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Essays",
  subtitle:
    "Thoughts, reflections, and stories I love to share through my writing.",
  blogs: [
    {
      url: "", // 可以添加散文链接
      title: "思考的边界",
      description: "关于人类思考极限的随想..."
    },
    {
      url: "", // 可以添加散文链接
      title: "城市中的孤独",
      description: "现代都市生活中的孤独感受..."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "PHOTOGRAPHY",
  subtitle: "CAPTURING MOMENTS AND TELLING STORIES THROUGH IMAGES",

  talks: [
    {
      title: "Urban Photography Collection",
      subtitle: "Exploring city life through the lens",
      slides_url: "", // Add photography showcase link
      event_url: "" // Add event/gallery link
    },
    {
      title: "Nature Photography Series",
      subtitle: "Finding beauty in natural landscapes",
      slides_url: "", // Add photography showcase link
      event_url: "" // Add event/gallery link
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Feature Display Toggles for New Sections
// NOTE: Detailed content for these sections has been migrated to:
// - Game Dev: src/data/gamedev.js + GameDevShowcase component
// - Videos: src/data/videos.js + VideoPortfolio component
// - Photography: src/data/photography.js + Photography component
// These objects are kept minimal for Header navigation display control

const gameDevSection = {
  display: true // Toggle Game Dev section visibility
};

const videoPortfolioSection = {
  display: true // Toggle Video Portfolio section visibility
};

const photographySection = {
  display: true // Toggle Photography section visibility
};

const characterSection = {
  display: false // Set true if you want to show the bottom-corner character assistant
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section (currently placeholder)
// Add embed URLs (Spotify, Apple Podcasts, Ximalaya, etc.) into the podcast array when ready.
// Set display to true only after populating real content to avoid empty iframes.
const podcastSection = {
  title: "Podcast",
  subtitle:
    "Conversations & reflections blending AI, game dev, and creative storytelling (coming soon)",
  podcast: [
    // Example (commented out until real links available):
    // "https://open.spotify.com/embed/episode/your-episode-id",
    // "https://podcasts.apple.com/your-show-id"
  ],
  display: false // Hidden until real podcast links are added
};

const contactInfo = {
  title: {
    zh: "联系我",
    en: "Contact Me"
  },
  subtitle: {
    zh: "无论是项目合作还是简单聊聊，都欢迎联系我。",
    en: "Discuss a project or just want to say hi? My inbox is open for all."
  },
  number: "852 91303739",
  email_address: "krisamegreimu@flounderfantasy.com"
};

const supportInfo = {
  display: true,
  wechatQrImage: "/wechat_qrcode_echo.jpg",
  paypal: "",
  fps: "",
  alipay: "",
  wechatPay: ""
};

// Twitter Section

const twitterDetails = {
  userName: "", // 如果你有Twitter账号，可以添加
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
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
