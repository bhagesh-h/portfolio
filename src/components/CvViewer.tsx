import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, ArrowUpRight, Copy, Check, Printer, Briefcase, Loader2, Github, Linkedin, Youtube, Mail, Link as LinkIcon } from 'lucide-react';
import { useMetadata } from '../context/MetadataContext';

const CustomXIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 2h4l12 20h-4z" />
    <path d="M20 2L4 22" />
  </svg>
);

const CustomSubstackIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4h16" />
    <path d="M4 9h16" />
    <path d="M4 14v6l8-4 8 4v-6H4z" />
  </svg>
);

function getSocialIcon(id: string) {
  switch (id.toLowerCase()) {
    case 'github':
      return Github;
    case 'linkedin':
      return Linkedin;
    case 'x':
    case 'twitter':
      return CustomXIcon;
    case 'substack':
      return CustomSubstackIcon;
    case 'youtube':
      return Youtube;
    case 'email':
    case 'mail':
      return Mail;
    default:
      return LinkIcon;
  }
}

export function CvViewer() {
  const { resume, isLoading } = useMetadata();
  const [activeTab, setActiveTab] = useState<'exp' | 'edu' | 'pub'>('exp');
  const [copied, setCopied] = useState(false);
  const [showIframePrintWarning, setShowIframePrintWarning] = useState(false);

  const fullName = resume.name || "";
  const title = resume.title || "";
  const location = resume.location || "";
  const email = resume.email || "";
  const summary = resume.cv_bio || "";

  const experiences = resume.experiences || [];
  const education = resume.education || [];
  const publications = resume.publications || [];

  const handlePrint = () => {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      setShowIframePrintWarning(true);
      // Attempt standard call anyway as some modern browsers can allow it under lenient settings
      try {
        window.print();
      } catch (e) {
        console.warn("Print action blocked by iframe sandbox restrictions.", e);
      }
    } else {
      window.print();
    }
  };

  const copyAsMarkdown = () => {
    const md = `
# ${fullName}
*${title}*  
📍 ${location}  

## Summary
${summary}

## Work Experience
${experiences.map(e => `### ${e.role} at ${e.company}\n*${e.duration}*\n${e.description}\nTechnologies: ${e.tools.join(', ')}`).join('\n\n')}

## Education
${education.map(e => `### ${e.degree}\n*${e.institution}* (${e.duration})\n${e.achievements.map(a => `- ${a}`).join('\n')}`).join('\n\n')}

## Selected Publications
${publications.map(p => `### ${p.title}\n*${p.journal}*, ${p.year}\nAuthors: ${p.authors}\nDOI: ${p.doi || 'N/A'}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-10 sm:py-12 print:py-0 print:m-0 print:w-full print:max-w-none">
      <div className="print:hidden">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-zinc-100">
              Professional Progression
            </h2>
            {isLoading && (
              <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
            )}
          </div>
          
          <div className="flex items-center gap-2.5">
            <button
              id="copy_md_cv_btn"
              onClick={copyAsMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg text-xs font-mono md:cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Copied md!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Markdown
                </>
              )}
            </button>
            <button
              id="print_cv_btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/20 border border-emerald-900/40 hover:border-emerald-800 text-emerald-400 hover:text-emerald-300 transition-colors rounded-lg text-xs font-mono md:cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print CV (PDF)
            </button>
          </div>
        </div>

        {showIframePrintWarning && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-zinc-950/60 border border-amber-950/30 rounded-xl flex items-start gap-3 text-xs text-zinc-400 font-mono"
          >
            <span className="text-amber-500 text-sm leading-none shrink-0 font-bold">⚠️</span>
            <div className="space-y-1.5 flex-1 select-none">
              <p className="text-zinc-300 font-semibold font-sans">Print Dialog Blocked by Sandbox Iframe</p>
              <p className="leading-relaxed text-[12px] font-sans text-zinc-400">
                Browsers block nested dialog triggers (like <code className="text-emerald-400 font-mono">window.print()</code>) inside editor frame previews. 
                For a perfect layout, simply click the <a href={window.location.href} target="_blank" rel="noreferrer" className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5">Open in New Tab <ArrowUpRight className="w-3 h-3" /></a> button or use your dev preview link, and tap <strong className="text-zinc-200">Print CV</strong> there to open the system dialog!
              </p>
            </div>
            <button 
              onClick={() => setShowIframePrintWarning(false)} 
              className="text-zinc-500 hover:text-zinc-350 font-bold transition-colors ml-2 px-1.5 text-sm md:cursor-pointer pb-1"
              title="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}

        {/* Dynamic CV Body switcher */}
        <div className="flex space-x-6 border-b border-zinc-900/60 mb-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'exp', label: 'Work Experience', icon: Briefcase },
            { id: 'edu', label: 'Academic Education', icon: BookOpen },
            { id: 'pub', label: 'Publications & preprints', icon: Award },
          ].map(tab => (
            <button
              id={`cv_tab_${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs font-mono relative md:cursor-pointer flex items-center gap-2 whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeCvTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-400" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab display */}
        <div className="min-h-[250px]">
          <AnimatePresence mode="wait">
            {activeTab === 'exp' && (
              <motion.div
                key="exp"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {experiences.length > 0 ? (
                  experiences.map((exp, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6 border-l border-zinc-900 pl-4 sm:pl-6 py-1 relative">
                      <div className="absolute w-2 h-2 rounded-full bg-zinc-800 -left-[4.5px] top-3" />
                      <div className="space-y-2 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                          <h3 className="text-base font-semibold text-zinc-200">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono text-zinc-500">{exp.duration}</span>
                        </div>
                        <p className="text-sm text-emerald-500/90 font-mono">
                          {exp.company}
                        </p>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
                          {exp.description}
                        </p>
                        {exp.tools && exp.tools.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.tools.map((tool, j) => (
                              <span key={j} className="text-[12px] font-mono px-2 py-0.5 bg-zinc-900/10 border border-zinc-900/65 text-zinc-400 rounded-md">
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm font-mono text-zinc-600">No experiences configured.</div>
                )}
              </motion.div>
            )}

            {activeTab === 'edu' && (
              <motion.div
                key="edu"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {education.length > 0 ? (
                  education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6 border-l border-zinc-900 pl-4 sm:pl-6 py-1 relative">
                      <div className="absolute w-2 h-2 rounded-full bg-zinc-800 -left-[4.5px] top-3" />
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                          <h3 className="text-base font-semibold text-zinc-200">
                            {edu.degree}
                          </h3>
                          <span className="text-xs font-mono text-zinc-500">{edu.duration}</span>
                        </div>
                        <p className="text-sm text-emerald-500/90 font-mono">
                          {edu.institution}
                        </p>
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="space-y-1.5 pt-1">
                            {edu.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="text-xs text-zinc-400 font-light flex items-start gap-2 max-w-2xl leading-relaxed">
                                <span className="text-zinc-600 font-mono shrink-0">•</span>
                                {ach}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm font-mono text-zinc-600">No education fields configured.</div>
                )}
              </motion.div>
            )}

            {activeTab === 'pub' && (
              <motion.div
                key="pub"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {publications.length > 0 ? (
                  publications.map((pub, idx) => (
                    <div key={idx} className="p-5 bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800/80 transition-colors duration-300 rounded-xl flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <span className="inline-block text-[12px] font-mono px-2 py-0.5 bg-emerald-900/10 text-emerald-400 border border-emerald-950 rounded mb-1">
                          {pub.year} • {pub.type || "Peer-Reviewed"}
                        </span>
                        <h3 className="text-base font-semibold text-zinc-200 leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono">
                          {pub.authors}
                        </p>
                        {pub.journal && (
                          <p className="text-xs text-zinc-400 font-mono">
                            Journal: <span className="text-zinc-300 italic">{pub.journal}</span>
                          </p>
                        )}
                        {pub.doi && (
                          <p className="text-[12px] text-zinc-600 font-mono font-medium">
                            DOI: {pub.doi}
                          </p>
                        )}
                      </div>
                      {pub.link && pub.link !== "#" && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 transition-all rounded-lg shrink-0 border border-zinc-800"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm font-mono text-zinc-600">No publications configured.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>

      {/* Hidden complete print sheet */}
      <div className="hidden print:block print-container-cv font-sans text-black bg-white print:relative print:inset-auto print:h-auto print:w-full print:p-0 space-y-4">
        {(fullName || title || location || email) && (
          <div className="text-center border-b pb-2 space-y-1">
            {fullName && <h1 className="text-[12pt] font-extrabold uppercase tracking-wide text-gray-900">{fullName}</h1>}
            {title && <p className="text-[10pt] font-semibold text-gray-600 uppercase tracking-widest mt-0.5">{title}</p>}
            {(location || email) && (
              <p className="text-[8.5pt] text-gray-500 mt-0.5 font-mono">
                {location && <span>{location}</span>}
                {location && email && <span> | </span>}
                {email && <span>{email}</span>}
              </p>
            )}
            
            {/* Socials & Logos specified clearly for high fidelity print */}
            {resume.socials && resume.socials.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-1.5 text-[8.5pt] text-gray-700 font-mono">
                {resume.socials
                  .filter((link) => {
                    const id = link.id.toLowerCase();
                    return id === 'email' || id === 'mail' || id === 'linkedin' || id === 'github';
                  })
                  .map((link) => {
                    const Icon = getSocialIcon(link.id);
                    const readableUrl = link.href
                      .replace(/^https?:\/\/(www\.)?/, '')
                      .replace(/^mailto:/, '')
                      .replace(/\/$/, '');
                    return (
                      <div key={link.id} className="flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5 text-gray-900 stroke-[2.5]" />
                        <span>
                          <strong className="text-gray-900 font-semibold">{link.label}:</strong>{' '}
                          <span className="text-gray-600 underline decoration-gray-300 decoration-1 underline-offset-1">{readableUrl}</span>
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {summary && (
          <div className="space-y-1 break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b pb-0.5 text-gray-800">Professional Summary</h2>
            <p className="text-[9pt] text-gray-600 leading-relaxed font-light">{summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b pb-0.5 text-gray-800">Work Experience</h2>
            <div className="space-y-2.5">
              {experiences.map((exp, idx) => (
                <div key={idx} className="text-[9pt] break-inside-avoid pb-0.5" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between font-bold text-gray-800 text-[9.5pt]">
                    {exp.role && <span>{exp.role}</span>}
                    {exp.duration && <span className="font-mono text-[8.5pt]">{exp.duration}</span>}
                  </div>
                  {exp.company && <p className="font-semibold text-emerald-700 italic text-[8.5pt]">{exp.company}</p>}
                  {exp.description && <p className="text-gray-600 font-light mt-0.5 text-[8.5pt] leading-relaxed mb-0.5">{exp.description}</p>}
                  {exp.tools && exp.tools.length > 0 && (
                    <p className="text-[8pt] font-mono text-gray-500">Core Technologies: {exp.tools.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b pb-0.5 text-gray-800">Academic Education</h2>
            <div className="space-y-2.5">
              {education.map((edu, idx) => (
                <div key={idx} className="text-[9pt] break-inside-avoid pb-0.5" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between font-bold text-gray-800 text-[9.5pt]">
                    {edu.degree && <span>{edu.degree}</span>}
                    {edu.duration && <span className="font-mono text-[8.5pt]">{edu.duration}</span>}
                  </div>
                  {edu.institution && <p className="font-semibold text-emerald-700 italic text-[8.5pt]">{edu.institution}</p>}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-[8.5pt] text-gray-600 mt-0.5 space-y-0.5">
                      {edu.achievements.map((ach, aIdx) => <li key={aIdx}>{ach}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {publications.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b pb-0.5 text-gray-800">Selected Publications</h2>
            <div className="space-y-2">
              {publications.map((pub, idx) => (
                <div key={idx} className="text-[9pt] break-inside-avoid pb-0.5" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  {pub.title && <p className="font-bold text-gray-800 text-[9.5pt] leading-tight">{pub.title}</p>}
                  {(pub.authors || pub.journal || pub.year) && (
                    <p className="text-gray-500 text-[8.5pt] italic mt-0.5">
                      {pub.authors} {pub.authors && (pub.journal || pub.year) ? '—' : ''} {pub.journal} {pub.year ? `(${pub.year})` : ''}
                    </p>
                  )}
                  {pub.doi && <p className="text-gray-400 text-[8pt] font-mono">DOI: {pub.doi}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
