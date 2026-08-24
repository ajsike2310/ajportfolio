import React, { createContext, useContext } from 'react';

const ContentContext = createContext();
export const useContent = () => useContext(ContentContext);

const STATIC_DATA = {
  hero: {
    name: "Avin Joy",
    title1: "Artificial",
    title2: "Intelligence",
    title3: "Engineer",
    subtitle: "Building the future with data, models, and scalable architectures."
  },
  about: {
    heading: "About Me",
    text1: "A Computer Science undergraduate specializing in Artificial Intelligence, with practical experience in building machine learning models, computer vision systems, and full-stack applications across academic and industry settings. I am seeking a role that allows me to apply this technical grounding to meaningful work, collaborate with skilled professionals, and grow in an environment that values both innovation and impact.",
    text2: "My expertise spans across Machine Learning, Deep Learning, React Native, PyTorch, Full Stack Development, NLP, FastAPI, and Python."
  },
  experience: {
    jobs: [
      {
        role: "Data Science Intern",
        company: "Nytt Analytics Pvt Ltd",
        period: "04 Nov, 2025 - Present",
        desc: "Developed and managed automation workflows using n8n to collect, process, and analyze data from sources such as Google Analytics and Google Search Console. Built automated pipelines for reporting, performance tracking, and insight generation."
      },
      {
        role: "Data Science And AI Intern",
        company: "Keltron Knowledge Centre",
        period: "23 Jun, 2025 - 30 Jun, 2025",
        desc: "Completed a program covering foundational and applied topics in Python and artificial intelligence, progressing into core AI and machine learning concepts such as classification and regression."
      },
      {
        role: "Python Developer",
        company: "Infotact Solutions",
        period: "25 Dec, 2024 - 25 Feb, 2025",
        desc: "Gained hands-on experience designing and developing software solutions using Python, contributing to writing efficient and maintainable code, debugging and testing applications."
      },
      {
        role: "Android Application Developer",
        company: "ICT Academy of Kerala",
        period: "16 Dec, 2024 - 31 Jan, 2025",
        desc: "Contributed to the development of cross-platform mobile applications using Flutter and Dart, focusing on building responsive user interfaces and integrating backend services through APIs."
      }
    ]
  },
  featured: {
    tag: "Featured Work",
    title: "ESTYLE - THE AI STYLIST",
    desc: "An AI-powered personal styling platform that combines machine learning and computer vision to deliver personalized fashion experiences. The platform runs a locally hosted AI model capable of providing professional-grade fashion insights and styling recommendations.",
    tech: ["Machine Learning", "Computer Vision", "AI"],
    image: "/e.png",
    link: "https://github.com/MagCha/AI-Stylist-Core"
  },
  projects: {
    list: [
      {
        title: "Single-Node-Finetuning-of-Tiny-LLama",
        desc: "Fine-tuning TinyLLaMA-1.1B-Chat using PyTorch and Intel's extension for transformers to run efficiently on Intel Xeon Scalable Processors.",
        tech: "PyTorch / Intel Xeon SPR",
        link: "https://github.com/ajsike2310/Single-Node-Finetuning-of-Tiny-LLama-using-Intel-Xeon-SPR"
      },
      {
        title: "Deep Convolutional GAN",
        desc: "Building a Deep Convolutional GAN to generate realistic human faces from scratch using transposed convolutions.",
        tech: "PyTorch / Python",
        link: "https://github.com/ajsike2310/Deep-Convolutional-Generative-Adversarial-Network-DCGAN-for-Realistic-Human-Face-Synthesis"
      },
      {
        title: "BOOK-NEST",
        desc: "A Python and SQLite based library management system built with Tkinter, supporting full CRUD operations.",
        tech: "Python / SQLite / Tkinter",
        link: "https://github.com/ajsike2310/BOOK-NEST"
      },
      {
        title: "Vigil Eye",
        desc: "A real-time drowsiness detection system built with Python, OpenCV, and dlib.",
        tech: "Python / OpenCV / dlib",
        link: "https://github.com/ajsike2310/Vigil-Eye"
      },
      {
        title: "CafeOrd",
        desc: "A Java and MySQL based canteen management desktop app with secure login, interactive menu and real-time dynamic pricing.",
        tech: "Java / MySQL / Swing",
        link: "https://github.com/ajsike2310/CanteenManagementSystem"
      }
    ]
  },
  testimonials: {
    list: [
      {
        quote: "Avin's ability to translate complex AI research into production-ready code is unparalleled.",
        name: "Sarah Chen - VP of Engineering"
      },
      {
        quote: "He didn't just build a model; he architected an entirely new way for our systems to learn.",
        name: "Marcus Wright - CTO"
      },
      {
        quote: "The most brilliant AI developer I've ever had the pleasure of working with. A true visionary.",
        name: "Dr. Elena Rostova - Lead Researcher"
      }
    ]
  },
  marquee: {
    words: ["MACHINE LEARNING", "•", "DEEP LEARNING", "•", "ARTIFICIAL INTELLIGENCE", "•", "REACT NATIVE", "•", "PYTORCH", "•", "FULL STACK", "•", "PYTHON", "•", "JAVA", "•"]
  },
  socials: {
    links: [
      { name: "GitHub",   url: "https://github.com/ajsike2310",                        icon: "github"   },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/avin-joy-230237260/",      icon: "linkedin" },
      { name: "Email",    url: "mailto:avinjoythankachan@gmail.com",                   icon: "mail"     }
    ]
  }
};

export const ContentProvider = ({ children }) => (
  <ContentContext.Provider value={{ data: { content: STATIC_DATA }, loading: false }}>
    {children}
  </ContentContext.Provider>
);
