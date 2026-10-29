import { useEffect, useState } from "react";
import {
  profile, stats, experience, projects, skills, education, certifications,
} from "./data.js";

function Typed({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1200);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <p className="typed"># {text}<span className="caret" /></p>;
}

function Photo() {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img className="photo" src="/photo.jpg" alt="Gourav Kumar Singh" onError={() => setOk(false)} />
  ) : (
    <div className="photo initials" aria-hidden="true">GS</div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);
  const job = experience[tab];

  return (
    <>
      <header className="nav">
        <a className="logo" href="#top">GouravSingh.dev</a>
        <nav>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-text">
            <h1>
              Hey, I’m <span className="accent">{profile.name}</span>
              <br />
              <span className="sub">{profile.role}</span>
            </h1>
            <p className="lead">{profile.tagline}</p>
            <Typed words={profile.typed} />
            <div className="actions">
              <a className="btn" href="#contact">Hire me</a>
              <a className="link" href={profile.resume} download>Download resume</a>
            </div>
          </div>
          <Photo />
        </section>

        <section className="wrap">
          <div className="stats">
            {stats.map((s) => (
              <div key={s.l}><strong>{s.n}</strong><span>{s.l}</span></div>
            ))}
          </div>
        </section>

        <section id="experience" className="wrap">
          <h2>My timeline</h2>
          <div className="timeline" role="tablist">
            {experience.map((e, idx) => (
              <button
                key={e.company}
                role="tab"
                aria-selected={tab === idx}
                className={tab === idx ? "seg on" : "seg"}
                onClick={() => setTab(idx)}
              >
                <span>{e.company}</span>
                <small>{e.dates}</small>
              </button>
            ))}
          </div>
          <article className="job">
            <h3>{job.role}</h3>
            <p className="muted">{job.company}, {job.place}</p>
            <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        </section>

        <section id="projects" className="wrap">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map((p) => (
              <article className="card" key={p.name}>
                <h3>{p.name}</h3>
                <p className="muted small">{p.dates}</p>
                <p>{p.text}</p>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="muted more">
            Code for these lives on <a href={profile.links.GitHub} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <section id="skills" className="wrap">
          <h2>Skills</h2>
          <dl className="skills">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v.map((s) => <span key={s}>{s}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap two">
          <div>
            <h2>Education</h2>
            <p className="strong">{education.degree}</p>
            <p className="muted">{education.school}</p>
            <p className="muted">{education.dates} · {education.score}</p>
          </div>
          <div>
            <h2>Certifications</h2>
            <ul className="plain">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </section>

        <section id="contact" className="wrap contact">
          <h2>Let’s work together</h2>
          <p className="muted">Open to software engineering roles and internships.</p>
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <p className="muted small">{profile.phone} · {profile.location}</p>
          <div className="socials">
            {Object.entries(profile.links).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noreferrer">{k}</a>
            ))}
          </div>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
