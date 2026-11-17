import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CERTIFICATIONS,
  CONTACT_DETAILS,
  CV,
  EDUCATION,
  EXPERIENCE,
  HACKATHONS,
  PROJECTS,
  SITE,
  SKILLS,
  SOCIAL_LINKS,
  TECH_CATEGORIES,
} from '../data/portfolio';
import './Cv.css';

/* "https://www.linkedin.com/in/x/" → "linkedin.com/in/x" — readable on paper. */
const bareUrl = (href) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const findProject = (title) =>
  PROJECTS.find((p) => p.title.toLowerCase() === title.toLowerCase());

const POSITIONS = EXPERIENCE.filter((e) => e.kind !== 'award').sort((a, b) =>
  b.start.localeCompare(a.start),
);
const CV_PROJECTS = CV.projects.map(findProject).filter(Boolean);
const ON_CV = new Set(CV_PROJECTS.map((p) => p.title.toLowerCase()));

/* One line per Core tech category: every tool name once, plus labels for
   items that have no tools of their own (e.g. "APIs"). */
const skillLine = (category) =>
  [...new Set(category.items.flatMap((item) => (item.tools.length ? item.tools : [item.tag])))].join(
    ' · ',
  );
const PHONES = CONTACT_DETAILS.filter((c) => c.label === 'Phone' || c.label === 'WhatsApp');
const PROFILES = SOCIAL_LINKS.filter((s) => s.id === 'linkedin' || s.id === 'github');

function Section({ title, children }) {
  return (
    <section className="cv__section">
      <h2 className="cv__heading">{title}</h2>
      {children}
    </section>
  );
}

/**
 * The CV, generated from src/data/portfolio.js. "Download PDF" opens the
 * print dialog; print styles turn the page into a clean A4 document.
 */
export default function Cv() {
  useEffect(() => {
    const previous = document.title;
    /* Browsers use the title as the default PDF file name. */
    document.title = `${SITE.name} — CV`;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="cv-page">
      <div className="cv-toolbar">
        <Link to="/" className="cv-toolbar__back">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to portfolio
        </Link>
        <button type="button" className="cv-toolbar__print" onClick={() => window.print()}>
          <i className="fa-solid fa-download" aria-hidden="true" /> Download PDF
        </button>
      </div>

      <article className="cv" aria-label={`${SITE.name} — CV`}>
        <header className="cv__header">
          <h1 className="cv__name">{SITE.name}</h1>
          <p className="cv__headline">{CV.headline.join(' | ')}</p>
          <ul className="cv__contact">
            <li>{SITE.location}</li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            {PHONES.map((phone) => (
              <li key={phone.label}>
                <a href={phone.href}>{phone.value}</a>
                {phone.label === 'WhatsApp' && ' (WhatsApp)'}
              </li>
            ))}
            {PROFILES.map((profile) => (
              <li key={profile.id}>
                <a href={profile.href}>{bareUrl(profile.href)}</a>
              </li>
            ))}
            <li>
              <a href={SITE.url}>{bareUrl(SITE.url)}</a>
            </li>
          </ul>
        </header>

        <Section title="Professional summary">
          <p>{CV.summary}</p>
        </Section>

        <Section title="Experience">
          {POSITIONS.map((role) => (
            <div key={role.id} className="cv__entry">
              <div className="cv__entry-head">
                <h3>
                  {role.role} — <span>{role.company}</span>
                </h3>
                <span className="cv__date">{role.period}</span>
              </div>
              {role.desc && <p>{role.desc}</p>}
              {role.highlights?.length > 0 && (
                <ul className="cv__bullets">
                  {role.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        <Section title="Hackathons & awards">
          <ul className="cv__bullets cv__bullets--loose">
            {HACKATHONS.map((hack) => (
              <li key={hack.id}>
                <strong>{hack.project}</strong> — {hack.event}
                {hack.result && <em className="cv__result"> ({hack.result})</em>}
                {hack.period && <span className="cv__date-inline"> · {hack.period}</span>}
                {/* Projects listed below get their full write-up there. */}
                {!ON_CV.has(hack.project.toLowerCase()) && (
                  <>
                    <br />
                    {hack.desc}
                  </>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Selected projects">
          {CV_PROJECTS.map((project) => (
            <div key={project.id} className="cv__entry">
              <div className="cv__entry-head">
                <h3>
                  {project.title} — <span>{project.type}</span>
                </h3>
                {project.href && (
                  <a className="cv__date" href={project.href}>
                    {bareUrl(project.href)}
                  </a>
                )}
              </div>
              <p>{project.desc}</p>
              <p className="cv__stack">
                <strong>Stack:</strong> {project.stack.join(', ')}
              </p>
            </div>
          ))}
          <p className="cv__more">
            {PROJECTS.length - CV_PROJECTS.length} more projects at{' '}
            <a href={SITE.url}>{bareUrl(SITE.url)}</a>
          </p>
        </Section>

        <Section title="Technical skills">
          <dl className="cv__skills">
            {TECH_CATEGORIES.map((category) => (
              <div key={category.heading}>
                <dt>{category.heading}</dt>
                <dd>{skillLine(category)}</dd>
              </div>
            ))}
            <div>
              <dt>Also</dt>
              <dd>{SKILLS.map((skill) => skill.title).join(' · ')}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Education & training">
          {EDUCATION.map((item) => (
            <div key={item.institution} className="cv__entry cv__entry--tight">
              <div className="cv__entry-head">
                <h3>
                  {item.title} — <span>{item.institution}</span>
                </h3>
                <span className="cv__date">{item.label}</span>
              </div>
            </div>
          ))}
        </Section>

        {/* Certificates that come with a course are already under Education. */}
        <Section title="Certifications">
          <ul className="cv__columns">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.text}>
                <a href={cert.link}>{cert.text}</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Soft skills">
          <p>{CV.softSkills.join(' · ')}</p>
        </Section>

        <Section title="References">
          <ul className="cv__refs">
            {CV.references.map((ref) => (
              <li key={ref.email}>
                <strong>{ref.name}</strong>
                <span>{ref.role}</span>
                <a href={`mailto:${ref.email}`}>{ref.email}</a>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}
