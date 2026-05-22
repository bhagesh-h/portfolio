import yaml from 'js-yaml';

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface PinnedRepoConfig {
  name: string;
  title: string;
  tags: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  tools: string[];
}

export interface AcademicEducation {
  degree: string;
  institution: string;
  duration: string;
  achievements: string[];
}

export interface Publication {
  title: string;
  journal: string;
  year: string;
  authors: string;
  link: string;
  doi?: string;
  type?: string;
}

export interface MetadataConfig {
  username: string;
  name: string;
  email?: string;
  location?: string;
  designations: string[];
  socials: SocialLink[];
  pinned_repos: PinnedRepoConfig[];
  experiences: WorkExperience[];
  education: AcademicEducation[];
  publications: Publication[];
  cv_bio?: string;
  portfolio_bio?: string;
}

// Full offline/network-resilient default presets to guarantee a flawless initial load status
export const DEFAULT_METADATA: MetadataConfig = {
  username: "bhagesh-h",
  name: "Bhagesh Hunakunti",
  email: "bhagc0ded@gmail.com",
  location: "Bengaluru, Karnataka, India",
  cv_bio: "Experienced Bioinformatician with a demonstrated history of working in the service-based and e-learning industries. Skilled in Python, Perl, R, and bash scripting. Likes to devour code and exhale programs, loves to 'gene'-rate new solutions to complex biological data problems, and can automate anything.",
  portfolio_bio: "I build scalable bioinformatics pipelines, analyze multi-omics data, and apply machine learning to uncover the mechanisms of complex diseases.",
  designations: [
    "Bioinformatician",
    "Senior Software Engineer",
    "Vibe Code Cleanup Specialist"
  ],
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/bhagesh-h" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/bhagesh-hunakunti/" },
    { id: "x", label: "X (Twitter)", href: "https://x.com/bhagc0de" },
    { id: "substack", label: "Substack", href: "https://substack.com/@bhagc0ded" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@stupidbio" },
    { id: "email", label: "Email", href: "mailto:bhagc0ded@gmail.com" }
  ],
  pinned_repos: [
    {
      name: "biotools-explorer",
      title: "BioTools Explorer",
      tags: ["React", "Node.js", "Vite", "PubMed API", "Tailwind"]
    },
    {
      name: "MinD.md",
      title: "MinD.md",
      tags: ["TypeScript", "Markdown", "Productivity", "Local-First", "SPA"]
    },
    {
      name: "seqtools",
      title: "seqtools",
      tags: ["Bioinformatics", "JavaScript", "Rust", "WebAssembly", "FASTA"]
    },
    {
      name: "textorcist",
      title: "textorcist",
      tags: ["TypeScript", "OCR", "Handwritten", "React", "Vite"]
    },
    {
      name: "sortit",
      title: "sortit",
      tags: ["TypeScript", "AI", "File-Organization", "Local-First"]
    },
    {
      name: "ClarityAI",
      title: "ClarityAI",
      tags: ["TypeScript", "Browser-Extension", "AI", "Reader-Mode"]
    }
  ],
  experiences: [
    {
      role: "Senior Software Engineer",
      company: "Eurofins",
      duration: "May 2025 — Present",
      description: "Leading a team of Software Engineers and support initiatives for the global Eurofins team by providing advanced Bioinformatics solutions and ensuring seamless service delivery. Architecting and automating scalable on-prem Snakemake workflows with an emphasis on robust reporting and reproducibility. Designing and deploying production-grade CI/CD Bioinformatics pipelines on Microsoft Azure, optimizing performance, scalability, and cost-efficiency. Overseeing Sanger Peaktrace data QC and delivery. Spearheading complex analyses of short-read (Illumina) and long-read (Oxford Nanopore) sequencing data.",
      tools: ["Python", "Snakemake", "Azure", "Sanger Peaktrace", "Docker", "Illumina", "Nanopore", "APIs"]
    },
    {
      role: "Software Engineer",
      company: "Eurofins",
      duration: "Sep 2022 — April 2025",
      description: "Supported global Eurofins team on Bioinformatics services. Automated on-prem Snakemake pipelines and reporting, and implemented pipelines on Microsoft Azure. Streamlined Sanger Peaktrace data QC and delivery workflows. Built, maintained, and updated in-house APIs, and analyzed short and long-read sequencing data for Microbiome, Genome, and Metagenome studies.",
      tools: ["Python", "Snakemake", "Azure", "APIs", "Sanger Peaktrace", "Docker"]
    },
    {
      role: "Bioinformatician",
      company: "Kasturba Medical College",
      duration: "Sep 2021 — Sep 2022",
      description: "Analyzed Human Exome and Whole Genome data for 2K+ rare genetic disorder patients. Deployed and customized GATK best practice pipelines. Annotated and analyzed sequencing data for Mendelian disorders to identify pathogenic variants. Developed reusable Python and Bash scripts for high-throughput pipeline integration.",
      tools: ["GATK", "Python", "Bash", "WES", "WGS", "APIs"]
    }
  ],
  education: [
    {
      degree: "M.Sc. in Bioinformatics",
      institution: "Manipal University",
      duration: "Aug 2019 — Aug 2021",
      achievements: [
        "CGPA: 8.6/10",
        "Focused coursework in Bioinformatics, Cell and Molecular Biology, and Data Science."
      ]
    },
    {
      degree: "B.Sc. in Biotechnology",
      institution: "Goa University - Dhempe",
      duration: "Aug 2015 — Aug 2018",
      achievements: [
        "CGPA: 8.0/10",
        "Formative training in Biotechnology, Plant & Animal Tissue Culture, and Bioinformatics."
      ]
    }
  ],
  publications: [
    {
      title: "Neuroimaging to Genotype: Delineating the Spectrum of Disorders With Deficient Myelination in the Indian Population",
      journal: "AJMG (American Journal of Medical Genetics)",
      year: "2024",
      authors: "Hunakunti B., et al.",
      link: "https://doi.org/10.1002/ajmg.a.63859",
      doi: "AJMG Oct 2024",
      type: "Peer-Reviewed"
    }
  ]
};

// Robust browser-safe zero-dependency YAML parser leveraging js-yaml
export function parseMetadataYaml(yamlText: string): MetadataConfig {
  try {
    const rawData = yaml.load(yamlText) as any;
    if (!rawData || typeof rawData !== 'object') {
      return DEFAULT_METADATA;
    }

    const username = typeof rawData.username === 'string' ? rawData.username : DEFAULT_METADATA.username;
    const name = typeof rawData.name === 'string' ? rawData.name : DEFAULT_METADATA.name;
    const designations = Array.isArray(rawData.designations) ? rawData.designations.map(String) : DEFAULT_METADATA.designations;
    
    const socials: SocialLink[] = [];
    if (Array.isArray(rawData.socials)) {
      rawData.socials.forEach((item: any) => {
        if (item && item.id) {
          socials.push({
            id: String(item.id),
            label: typeof item.label === 'string' ? item.label : String(item.id).toUpperCase(),
            href: typeof item.href === 'string' ? item.href : '#'
          });
        }
      });
    }

    const pinned_repos: PinnedRepoConfig[] = [];
    if (Array.isArray(rawData.pinned_repos)) {
      rawData.pinned_repos.forEach((item: any) => {
        if (item && item.name) {
          pinned_repos.push({
            name: String(item.name),
            title: typeof item.title === 'string' ? item.title : String(item.name),
            tags: Array.isArray(item.tags) ? item.tags.map(String) : []
          });
        }
      });
    }

    const experiences: WorkExperience[] = [];
    if (Array.isArray(rawData.experiences)) {
      rawData.experiences.forEach((item: any) => {
        if (item && item.role && item.company) {
          experiences.push({
            role: String(item.role),
            company: String(item.company),
            duration: typeof item.duration === 'string' ? item.duration : '',
            description: typeof item.description === 'string' ? item.description : '',
            tools: Array.isArray(item.tools) ? item.tools.map(String) : []
          });
        }
      });
    }

    const education: AcademicEducation[] = [];
    if (Array.isArray(rawData.education)) {
      rawData.education.forEach((item: any) => {
        if (item && (item.degree || item.institution)) {
          education.push({
            degree: typeof item.degree === 'string' ? item.degree : '',
            institution: typeof item.institution === 'string' ? item.institution : '',
            duration: typeof item.duration === 'string' ? item.duration : '',
            achievements: Array.isArray(item.achievements) ? item.achievements.map(String) : []
          });
        }
      });
    }

    const publications: Publication[] = [];
    if (Array.isArray(rawData.publications)) {
      rawData.publications.forEach((item: any) => {
        if (item && item.title) {
          publications.push({
            title: String(item.title),
            journal: typeof item.journal === 'string' ? item.journal : '',
            year: typeof item.year === 'string' ? item.year : String(item.year || ''),
            authors: typeof item.authors === 'string' ? item.authors : '',
            link: typeof item.link === 'string' ? item.link : '#',
            doi: typeof item.doi === 'string' ? item.doi : undefined,
            type: typeof item.type === 'string' ? item.type : 'Peer-Reviewed'
          });
        }
      });
    }

    const cv_bio = typeof rawData.cv_bio === 'string' ? rawData.cv_bio : DEFAULT_METADATA.cv_bio;
    const portfolio_bio = typeof rawData.portfolio_bio === 'string' ? rawData.portfolio_bio : DEFAULT_METADATA.portfolio_bio;
    const email = typeof rawData.email === 'string' ? rawData.email : DEFAULT_METADATA.email;
    const location = typeof rawData.location === 'string' ? rawData.location : DEFAULT_METADATA.location;

    return {
      username,
      name,
      email,
      location,
      cv_bio,
      portfolio_bio,
      designations: designations.length > 0 ? designations : DEFAULT_METADATA.designations,
      socials: socials.length > 0 ? socials : DEFAULT_METADATA.socials,
      pinned_repos: pinned_repos.length > 0 ? pinned_repos : DEFAULT_METADATA.pinned_repos,
      experiences: experiences.length > 0 ? experiences : DEFAULT_METADATA.experiences,
      education: education.length > 0 ? education : DEFAULT_METADATA.education,
      publications: publications.length > 0 ? publications : DEFAULT_METADATA.publications
    };

  } catch (error) {
    console.error("YAML compilation error in parseMetadataYaml:", error);
    return DEFAULT_METADATA;
  }
}

// Fetch helper with caching/cache-busting to support instant reload on metadata.yaml updates
export async function fetchMetadata(): Promise<MetadataConfig> {
  try {
    const response = await fetch(`/metadata.yaml?t=${Date.now()}`);
    if (response.ok) {
      const text = await response.text();
      return parseMetadataYaml(text);
    }
  } catch (err) {
    console.warn("Failed to fetch custom metadata.yaml, loading embedded fallbacks", err);
  }
  return DEFAULT_METADATA;
}

export interface ResumeConfig {
  name?: string;
  title?: string;
  email?: string;
  location?: string;
  cv_bio?: string;
  socials?: SocialLink[];
  experiences?: WorkExperience[];
  education?: AcademicEducation[];
  publications?: Publication[];
}

export const DEFAULT_RESUME: ResumeConfig = {
  name: "Bhagesh Hunakunti",
  title: "Senior Software Engineer",
  email: "bhagc0ded@gmail.com",
  location: "Bengaluru, Karnataka, India",
  cv_bio: "Experienced Bioinformatician with a demonstrated history of working in the service-based and e-learning industries. Skilled in Python, Perl, R, and bash scripting. Likes to devour code and exhale programs, loves to 'gene'-rate new solutions to complex biological data problems, and can automate anything.",
  socials: [
    { id: "email", label: "Email", href: "mailto:bhagc0ded@gmail.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/bhagesh-hunakunti/" },
    { id: "github", label: "GitHub", href: "https://github.com/bhagesh-h" }
  ],
  experiences: [
    {
      role: "Senior Software Engineer",
      company: "Eurofins",
      duration: "May 2025 — Present",
      description: "Leading a team of Software Engineers and support initiatives for the global Eurofins team by providing advanced Bioinformatics solutions and ensuring seamless service delivery. Architecting and automating scalable on-prem Snakemake workflows with an emphasis on robust reporting and reproducibility. Designing and deploying production-grade CI/CD Bioinformatics pipelines on Microsoft Azure, optimizing performance, scalability, and cost-efficiency. Overseeing Sanger Peaktrace data QC and delivery. Spearheading complex analyses of short-read (Illumina) and long-read (Oxford Nanopore) sequencing data.",
      tools: ["Python", "Snakemake", "Azure", "Sanger Peaktrace", "Docker", "Illumina", "Nanopore", "APIs"]
    },
    {
      role: "Software Engineer",
      company: "Eurofins",
      duration: "Sep 2022 — April 2025",
      description: "Supported global Eurofins team on Bioinformatics services. Automated on-prem Snakemake pipelines and reporting, and implemented pipelines on Microsoft Azure. Streamlined Sanger Peaktrace data QC and delivery workflows. Built, maintained, and updated in-house APIs, and analyzed short and long-read sequencing data for Microbiome, Genome, and Metagenome studies.",
      tools: ["Python", "Snakemake", "Azure", "APIs", "Sanger Peaktrace", "Docker"]
    },
    {
      role: "Bioinformatician",
      company: "Kasturba Medical College",
      duration: "Sep 2021 — Sep 2022",
      description: "Analyzed Human Exome and Whole Genome data for 2K+ rare genetic disorder patients. Deployed and customized GATK best practice pipelines. Annotated and analyzed sequencing data for Mendelian disorders to identify pathogenic variants. Developed reusable Python and Bash scripts for high-throughput pipeline integration.",
      tools: ["GATK", "Python", "Bash", "WES", "WGS", "APIs"]
    },
    {
      role: "Project Instructor",
      company: "Coursera",
      duration: "Aug 2020 — Feb 2022",
      description: "Authored biological data curriculum and guided over 4,000+ learners worldwide. Built custom guides and code tutorials including: '3D SARS-CoV-19 Protein Visualization with BioPython', 'SARS-CoV-2 Protein Modeling and Drug Docking', and 'Access Bioinformatics Databases with BioPython'.",
      tools: ["BioPython", "Python", "Protein Modeling", "Drug Docking", "3D Visualization"]
    },
    {
      role: "Research & Development Intern",
      company: "Hindustan Unilever",
      duration: "May 2021 — Sep 2021",
      description: "Created and updated interactive PowerBI dashboards for FMCG data. Performed Microbiome 16sRNA OTU data analysis and visualization. Built machine learning-based Python-Streamlit dashboards for rapid diagnostic reporting.",
      tools: ["Streamlit", "Python", "16sRNA", "PowerBI", "Machine Learning"]
    },
    {
      role: "Bioinformatics Intern",
      company: "Relevance Lab",
      duration: "Mar 2021 — Aug 2021",
      description: "Conducted SARS-CoV-2 RNA-Seq analysis using Nextflow workflows. Deployed, debugged, and optimized nf-core and GATK4 NGS pipelines on AWS cluster compute environments.",
      tools: ["Nextflow", "GATK4", "nf-core", "AWS", "RNASeq", "Docker"]
    }
  ],
  education: [
    {
      degree: "M.Sc. in Bioinformatics",
      institution: "Manipal University",
      duration: "Aug 2019 — Aug 2021",
      achievements: [
        "CGPA: 8.6/10",
        "Focused coursework in Bioinformatics, Cell and Molecular Biology, and Data Science."
      ]
    },
    {
      degree: "B.Sc. in Biotechnology",
      institution: "Goa University - Dhempe",
      duration: "Aug 2015 — Aug 2018",
      achievements: [
        "CGPA: 8.0/10",
        "Formative training in Biotechnology, Plant & Animal Tissue Culture, and Bioinformatics."
      ]
    }
  ],
  publications: [
    {
      title: "Neuroimaging to Genotype: Delineating the Spectrum of Disorders With Deficient Myelination in the Indian Population",
      journal: "AJMG (American Journal of Medical Genetics)",
      year: "2024",
      authors: "Hunakunti B., et al.",
      link: "https://doi.org/10.1002/ajmg.a.63859",
      doi: "AJMG Oct 2024",
      type: "Peer-Reviewed"
    },
    {
      title: "Genetic and phenotypic landscape of pediatric-onset epilepsy in 142 Indian families: Counseling and therapeutic implications",
      journal: "Wiley Clinical Genetics",
      year: "2024",
      authors: "Hunakunti B., et al.",
      link: "https://onlinelibrary.wiley.com/doi/10.1111/cge.14494",
      doi: "Wiley Feb 2024",
      type: "Peer-Reviewed"
    },
    {
      title: "De novo variants underlying monogenic syndromes with intellectual disability in a neurodevelopmental cohort from India",
      journal: "European Journal of Human Genetics",
      year: "2023",
      authors: "Hunakunti B., et al.",
      link: "https://www.nature.com/articles/s41431-023-01490-x",
      doi: "EJHG Dec 2023",
      type: "Peer-Reviewed"
    },
    {
      title: "Stokes–Mueller polarization-based analysis of model SARS-CoV-2 virions",
      journal: "Springer, Lasers in Medical Science",
      year: "2023",
      authors: "Hunakunti B., et al.",
      link: "https://link.springer.com/article/10.1007/s10103-022-03699-y",
      doi: "Springer Jan 2023",
      type: "Peer-Reviewed"
    },
    {
      title: "An insight on advances and applications of 3d bioprinting: A review",
      journal: "Elsevier, Bioprinting",
      year: "2021",
      authors: "Hunakunti B., et al.",
      link: "https://doi.org/10.1016/j.bprint.2021.e00155",
      doi: "Elsevier Oct 2021",
      type: "Peer-Reviewed"
    }
  ]
};

export function parseResumeYaml(yamlText: string): ResumeConfig {
  try {
    const rawData = yaml.load(yamlText) as any;
    if (!rawData || typeof rawData !== 'object') {
      return DEFAULT_RESUME;
    }

    const name = typeof rawData.name === 'string' ? rawData.name : undefined;
    const title = typeof rawData.title === 'string' ? rawData.title : undefined;
    const email = typeof rawData.email === 'string' ? rawData.email : undefined;
    const location = typeof rawData.location === 'string' ? rawData.location : undefined;
    const cv_bio = typeof rawData.cv_bio === 'string' ? rawData.cv_bio : undefined;

    const socials: SocialLink[] = [];
    if (Array.isArray(rawData.socials)) {
      rawData.socials.forEach((item: any) => {
        if (item && item.id) {
          socials.push({
            id: String(item.id),
            label: typeof item.label === 'string' ? item.label : String(item.id).toUpperCase(),
            href: typeof item.href === 'string' ? item.href : '#'
          });
        }
      });
    }

    const experiences: WorkExperience[] = [];
    if (Array.isArray(rawData.experiences)) {
      rawData.experiences.forEach((item: any) => {
        if (item && (item.role || item.company)) {
          experiences.push({
            role: item.role ? String(item.role) : '',
            company: item.company ? String(item.company) : '',
            duration: typeof item.duration === 'string' ? item.duration : '',
            description: typeof item.description === 'string' ? item.description : '',
            tools: Array.isArray(item.tools) ? item.tools.map(String) : []
          });
        }
      });
    }

    const education: AcademicEducation[] = [];
    if (Array.isArray(rawData.education)) {
      rawData.education.forEach((item: any) => {
        if (item && (item.degree || item.institution)) {
          education.push({
            degree: typeof item.degree === 'string' ? item.degree : '',
            institution: typeof item.institution === 'string' ? item.institution : '',
            duration: typeof item.duration === 'string' ? item.duration : '',
            achievements: Array.isArray(item.achievements) ? item.achievements.map(String) : []
          });
        }
      });
    }

    const publications: Publication[] = [];
    if (Array.isArray(rawData.publications)) {
      rawData.publications.forEach((item: any) => {
        if (item && item.title) {
          publications.push({
            title: String(item.title),
            journal: typeof item.journal === 'string' ? item.journal : '',
            year: typeof item.year === 'string' ? item.year : String(item.year || ''),
            authors: typeof item.authors === 'string' ? item.authors : '',
            link: typeof item.link === 'string' ? item.link : '#',
            doi: typeof item.doi === 'string' ? item.doi : undefined,
            type: typeof item.type === 'string' ? item.type : undefined
          });
        }
      });
    }

    // Return strictly only properties specified in the yaml
    return {
      name,
      title,
      email,
      location,
      cv_bio,
      socials: rawData.socials ? socials : undefined,
      experiences: rawData.experiences ? experiences : undefined,
      education: rawData.education ? education : undefined,
      publications: rawData.publications ? publications : undefined
    };
  } catch (error) {
    console.error("YAML compilation error in parseResumeYaml:", error);
    return DEFAULT_RESUME;
  }
}

export async function fetchResumeMetadata(): Promise<ResumeConfig> {
  try {
    const response = await fetch(`/resume.yaml?t=${Date.now()}`);
    if (response.ok) {
      const text = await response.text();
      return parseResumeYaml(text);
    }
  } catch (err) {
    console.warn("Failed to fetch custom resume.yaml, using defaults", err);
  }
  return DEFAULT_RESUME;
}

