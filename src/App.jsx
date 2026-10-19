import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useAnimationControls,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Code2,
  Database,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Send,
  Server,
  Sparkles,
  Terminal as TerminalIcon,
  X,
  Wrench,
} from "lucide-react";
import {
  experiences,
  profile,
  projects,
  skillGroups,
} from "./data/portfolioData";
import InteractiveText from "./components/InteractiveText";
import NeuralNetworkHero from "./components/NeuralNetworkHero";

const iconMap = {
  "code-2": Code2,
  "layers-3": Layers3,
  server: Server,
  database: Database,
  "brain-circuit": BrainCircuit,
  wrench: Wrench,
};

const revealEase = [0.22, 1, 0.36, 1];
const revealVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: revealEase } },
};
const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const slideVariants = (direction) => ({
  hidden: { opacity: 0, x: direction * 64, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.72, ease: revealEase },
  },
});
const projectSlideVariants = (direction) => ({
  hidden: { opacity: 0, x: direction * 72, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: revealEase },
  },
  exit: {
    opacity: 0,
    x: 0,
    y: 14,
    scale: 0.85,
    transition: { duration: 0.6, ease: [0.4, 0, 1, 1] },
  },
});

function SectionHeading({ kicker, title, description }) {
  return (
    <motion.div
      className="section-heading"
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}

function Navbar({ active, menuOpen, setMenuOpen }) {
  const items = ["About", "Experience", "Skills", "Projects", "Contact"];
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Go to homepage">
        <span>Koushik G S</span>
      </a>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {items.map((item, index) => (
          <a
            className={active === item.toLowerCase() ? "active" : ""}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            key={item}
          >
            <span>0{index + 1}</span>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero container" id="home">
      <motion.div className="hero-copy" initial="hidden" animate="visible" variants={staggerVariants}>
        <motion.div className="availability" variants={revealVariants}>
          <span /> AVAILABLE FOR OPPORTUNITIES
        </motion.div>
        <motion.p className="hero-role" variants={revealVariants}>PYTHON DEVELOPER / BACKEND ENGINEER / AI APPLICATION DEVELOPER</motion.p>
        <motion.p className="hero-kicker" variants={revealVariants}>HELLO, I&apos;M</motion.p>
        <motion.p className="hero-name" variants={revealVariants}>{profile.name}</motion.p>
        <motion.h1 variants={revealVariants}>
          <InteractiveText
            ariaLabel="Building Intelligent Digital Experiences."
            segments={[
              { text: "Building " },
              { text: "intelligent", className: "interactive-highlight" },
              { text: "\ndigital experiences." },
            ]}
          />
        </motion.h1>
        <motion.p className="hero-intro" variants={revealVariants}>{profile.intro}</motion.p>
        <motion.div className="hero-actions" variants={revealVariants}>
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowUpRight size={17} />
          </a>
          <a className="button button-ghost" href="#contact">
            Contact me <Send size={15} />
          </a>
        </motion.div>
        <a className="resume-link" href={profile.resumePath} download>
          Download resume <span className="resume-arrow" aria-hidden="true">↓</span>
        </a>
        <motion.div className="socials" variants={revealVariants}>
          <a href={profile.links.github || "#contact"} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href={profile.links.linkedin || "#contact"} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href={profile.links.emailUrl} target="_blank" rel="noreferrer" aria-label="Email">
            <Mail size={17} />
          </a>
          <span className="social-line" />
          <small>
            SCROLL TO EXPLORE <ChevronDown size={14} />
          </small>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-art"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: revealEase }}
      >
        <NeuralNetworkHero />
      </motion.div>
    </section>
  );
}

function About() {
  const cards = [
    [
      "01",
      "Software development",
      "Turning ideas into maintainable, useful software with care for the details.",
    ],
    [
      "02",
      "Backend & APIs",
      "Designing clear services, data flows, and integrations that hold up under change.",
    ],
    [
      "03",
      "AI-powered applications",
      "Exploring practical ways to connect products with LLMs and intelligent workflows.",
    ],
    [
      "04",
      "Continuous learning",
      "Staying curious across the stack and learning by building real systems.",
    ],
  ];
  return (
    <section className="section container" id="about">
      <SectionHeading
        kicker="01 / ABOUT"
        title={
          <InteractiveText
            ariaLabel="Curious by nature. Precise by craft."
            segments={[
              { text: "Curious by nature.\n" },
              { text: "Precise by craft.", className: "interactive-highlight" },
            ]}
          />
        }
        description={`${profile.aboutSummary} I graduated from ${profile.education}.`}
      />
      <motion.div className="about-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
        {cards.map(([number, title, text], index) => (
          <motion.article
            className="info-card"
            variants={slideVariants(index % 2 === 0 ? -1 : 1)}
            whileHover={{ y: -7, borderColor: "rgba(117, 236, 255, .55)" }}
            key={number}
          >
            <span>{number}</span>
            <Sparkles size={18} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHeading
        kicker="02 / EXPERIENCE"
        title={
          <InteractiveText
            ariaLabel="Building through real-world problems."
            segments={[
              { text: "Building through\n" },
              { text: "real-world problems.", className: "interactive-highlight" },
            ]}
          />
        }
      />
      <motion.div className="timeline" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
        <motion.div className="timeline-progress" variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.3, ease: revealEase } } }} />
        {experiences.map((experience, index) => (
          <motion.article
            className="timeline-item"
            variants={slideVariants(index % 2 === 0 ? -1 : 1)}
            key={experience.company}
          >
            <motion.div className={`timeline-dot ${experience.accent}`} variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.45, delay: 0.2 } } }} />
            <div className="timeline-index">0{index + 1}</div>
            <div className="timeline-content">
              <div>
                <p className="eyebrow">{experience.dates}</p>
                <h3>{experience.role}</h3>
                <h4>{experience.company}</h4>
              </div>
              <ul>
                {experience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section container" id="skills">
      <SectionHeading
        kicker="03 / CAPABILITIES"
        title={
          <InteractiveText
            ariaLabel="A versatile toolkit for meaningful builds."
            segments={[
              { text: "A versatile toolkit\n" },
              { text: "for meaningful builds.", className: "interactive-highlight" },
            ]}
          />
        }
        description="Technologies I use to explore, prototype, and ship. No arbitrary scores — just tools I work with."
      />
      <motion.div className="skills-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.18 }}>
        {skillGroups.map((group, index) => {
          const Icon = iconMap[group.icon];
          return (
            <motion.article
              className="skill-card"
              variants={{ hidden: { opacity: 0, scale: 0.86, y: 18 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, delay: index * 0.06, ease: revealEase } } }}
              whileHover={{ y: -7, rotateX: 2, rotateY: index % 2 ? -2 : 2, borderColor: "rgba(117, 236, 255, .48)" }}
              style={{ transformPerspective: 900 }}
              key={group.label}
            >
              <div className="skill-icon">
                <Icon size={20} />
              </div>
              <h3>{group.label}</h3>
              <div className="tag-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(cardRef, {
    amount: 0.22,
    margin: "-8% 0px -8% 0px",
  });
  const direction = index % 2 === 0 ? -1 : 1;

  useEffect(() => {
    controls.start(isInView ? "visible" : "exit");
  }, [controls, isInView]);

  return (
    <motion.article
      ref={cardRef}
      className={`project-card ${project.tone}`}
      layout
      initial="hidden"
      animate={controls}
      variants={projectSlideVariants(direction)}
      whileHover={{
        y: -8,
        rotateX: 1.5,
        rotateY: index % 2 ? -1.5 : 1.5,
        transition: { duration: 0.3 },
      }}
      style={{ transformPerspective: 1200 }}
    >
      <div className="project-visual">
        <span>{project.eyebrow}</span>
        <div className={`visual-motif visual-motif-${project.visual}`} aria-hidden="true">
          {project.visual === "web" && (
            <div className="motif-browser">
              <i /><i /><i />
              <strong>TRAVEL / BOOKING</strong>
              <span />
              <span />
              <span />
            </div>
          )}
          {project.visual === "ai" && (
            <div className="motif-neural">
              {Array.from({ length: 7 }, (_, nodeIndex) => <i key={nodeIndex} />)}
              <span /><span /><span />
            </div>
          )}
          {project.visual === "database" && (
            <div className="motif-database">
              <i /><i /><i />
              <span>INDEXED SEARCH</span>
            </div>
          )}
          {project.visual === "commerce" && (
            <div className="motif-flow">
              <span>API</span><i /><span>LLM</span><i /><span>PAY</span>
            </div>
          )}
        </div>
        <strong>0{index + 1}</strong>
        <ArrowUpRight />
      </div>
      <div className="project-body">
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <button onClick={() => onSelect(project)}>
            View details <ArrowUpRight size={15} />
          </button>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub <Github size={14} />
            </a>
          ) : (
            <span className="not-configured">Links not configured</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const categories = ["All", "Web Development", "Backend", "AI"];
  const visible = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  return (
    <section className="section container projects-section" id="projects">
      <SectionHeading
        kicker="04 / SELECTED WORK"
        title={
          <InteractiveText
            ariaLabel="Ideas made tangible."
            segments={[
              { text: "Ideas made\n" },
              { text: "tangible.", className: "interactive-highlight" },
            ]}
          />
        }
      />
      <div className="filter-row">
        {categories.map((category) => (
          <button
            className={filter === category ? "filter active" : "filter"}
            onClick={() => setFilter(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div className="projects-grid">
        {visible.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            onSelect={setSelected}
            key={project.name}
          />
        ))}
      </motion.div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
              >
                <X />
              </button>
              <span className="eyebrow">{selected.eyebrow}</span>
              <h3>{selected.name}</h3>
              <p>{selected.details}</p>
              <div className="tag-list">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TerminalWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Type “help” to see available commands.",
  ]);
  const commands = {
    help: "about · skills · projects · experience · contact · clear",
    about: profile.intro,
    skills: skillGroups.map((group) => group.items.join(", ")).join(" · "),
    projects: projects.map((project) => project.name).join(" · "),
    experience: experiences
      .map((experience) => `${experience.role} @ ${experience.company}`)
      .join(" · "),
    contact: "Email or connect through the contact panel below.",
  };
  const submit = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") setLines([]);
    else
      setLines((current) => [
        ...current,
        `> ${command}`,
        commands[command] || "Unknown command. Try “help”.",
      ]);
    setInput("");
  };
  return (
    <div className={open ? "terminal open" : "terminal"}>
      <button className="terminal-trigger float-terminal" onClick={() => setOpen(!open)}>
        <TerminalIcon size={16} /> <span>OPEN TERMINAL</span>
      </button>
      {open && (
        <div className="terminal-window">
          <div className="terminal-top">
            <span>koushik@portfolio:~</span>
            <button onClick={() => setOpen(false)} aria-label="Close terminal">
              <X size={14} />
            </button>
          </div>
          <div className="terminal-output">
            {lines.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
          <form onSubmit={submit}>
            <span>$</span>
            <input
              autoFocus
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Terminal command"
            />
          </form>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: profile.links.email,
      su: subject,
      body,
    }).toString();

    const gmailComposeUrl = gmailUrl.toString();
    const composeWindow = window.open(gmailComposeUrl, "portfolio-gmail-compose");

    if (composeWindow) {
      setStatus("Gmail opened with your message. Review it and click Send.");
      return;
    }

    window.location.assign(gmailComposeUrl);
  };
  return (
    <section className="section contact-section container" id="contact">
      <motion.div className="contact-panel" initial={{ opacity: 0, scale: 0.94, y: 24 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.8, ease: revealEase }}>
        <div>
          <SectionHeading
            kicker="05 / CONTACT"
            title={
              <InteractiveText
                ariaLabel="Have a problem worth solving?"
                segments={[
                  { text: "Have a problem\n" },
                  { text: "worth solving?", className: "interactive-highlight" },
                ]}
              />
            }
            description="I’m open to conversations about software, backend systems, and AI-powered products."
          />
          <div className="contact-links">
            <a href={profile.links.emailUrl} target="_blank" rel="noreferrer">
              <Mail size={17} /> {profile.links.email}
            </a>
            <a href={profile.links.linkedin || "#contact"} target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn profile
            </a>
            <a href={profile.links.github || "#contact"} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub profile
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            Name
            <input required name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              required
              name="message"
              rows="4"
              placeholder="Tell me about your idea..."
            />
          </label>
          <button className="button button-primary float-message" type="submit">
            Prepare message <Send size={15} />
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </motion.div>
    </section>
  );
}

function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    const sections = [
      "home",
      "about",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const current = [...sections].reverse().find((section) => {
        const element = document.getElementById(section);
        return element && window.scrollY >= element.offsetTop - 180;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer container">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          Designed & built with intention <Sparkles size={13} />
        </span>
      </footer>
      <TerminalWidget />
      <a className="back-top" href="#home" aria-label="Back to top">
        ↑
      </a>
    </>
    </MotionConfig>
  );
}

export default App;

