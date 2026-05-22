import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Star, GitFork, Loader2 } from 'lucide-react';
import { useMetadata } from '../context/MetadataContext';

interface Project {
  title: string;
  description: string;
  href: string;
  githubRepo: string;
  tags: string[];
  stars?: number;
  forks?: number;
  language?: string;
}

// High-fidelity helper to fetch language circle colors
function getLanguageColor(language?: string): string {
  if (!language) return "bg-zinc-600";
  const mapped: Record<string, string> = {
    typescript: "bg-sky-500",
    javascript: "bg-amber-400",
    rust: "bg-orange-600",
    python: "bg-indigo-500",
    code: "bg-emerald-500"
  };
  return mapped[language.toLowerCase()] || "bg-zinc-500";
}

export function Projects() {
  const { metadata, isLoading: isMetadataLoading } = useMetadata();
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isGitHubStatsLoading, setIsGitHubStatsLoading] = useState(true);

  // Synchronously initialize the temporary projects display as soon as YAML loads
  useEffect(() => {
    if (metadata.pinned_repos) {
      setProjectsList(metadata.pinned_repos.map(r => ({
        title: r.title,
        description: "Bioinformatics and computational biology research repository.",
        href: `https://github.com/${metadata.username}/${r.name}`,
        githubRepo: `https://github.com/${metadata.username}/${r.name}`,
        tags: r.tags,
        stars: 0,
        forks: 0,
        language: "TypeScript"
      })));
    }
  }, [metadata]);

  // Fetch live stats whenever metadata (username or repositories config) changes
  useEffect(() => {
    if (!metadata.pinned_repos || metadata.pinned_repos.length === 0) return;

    let isMounted = true;
    async function loadConfigAndFetchStats() {
      try {
        setIsGitHubStatsLoading(true);
        const targetUsername = metadata.username;
        const targetRepos = metadata.pinned_repos;

        // Fetch live repo list from Github
        let apiReposMap: Record<string, any> = {};
        try {
          const apiResponse = await fetch(`https://api.github.com/users/${targetUsername}/repos?per_page=100`);
          if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            if (Array.isArray(apiData)) {
              apiData.forEach((repo: any) => {
                if (repo && repo.name) {
                  apiReposMap[repo.name.toLowerCase()] = repo;
                }
              });
            }
          }
        } catch (apiError) {
          console.warn("GitHub API fetch missed, using defaults", apiError);
        }

        if (!isMounted) return;

        // Assemble mapped results
        const finalProjects: Project[] = targetRepos.map(yamlRepo => {
          const matchNameLower = yamlRepo.name.toLowerCase();
          const liveRepo = apiReposMap[matchNameLower];

          return {
            title: yamlRepo.title || yamlRepo.name,
            description: liveRepo?.description || "Bioinformatics and computational biology research repository.",
            href: liveRepo?.html_url || `https://github.com/${targetUsername}/${yamlRepo.name}`,
            githubRepo: liveRepo?.html_url || `https://github.com/${targetUsername}/${yamlRepo.name}`,
            tags: yamlRepo.tags,
            stars: liveRepo ? liveRepo.stargazers_count : 0,
            forks: liveRepo ? liveRepo.forks_count : 0,
            language: liveRepo?.language || "TypeScript"
          };
        });

        if (finalProjects.length > 0) {
          setProjectsList(finalProjects);
        }
      } catch (err) {
        console.error("Failure in loadConfigAndFetchStats pipeline", err);
      } finally {
        if (isMounted) {
          setIsGitHubStatsLoading(false);
        }
      }
    }

    loadConfigAndFetchStats();
    return () => {
      isMounted = false;
    };
  }, [metadata]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const isLoading = isMetadataLoading || isGitHubStatsLoading;

  return (
    <section className="py-10 sm:py-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item} className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-4">
          <h2 className="text-xl font-medium text-zinc-100">
            Personal Projects
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              <span>Fetching live...</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsList.map((project, i) => (
            <motion.div 
              variants={item}
              whileHover={{ y: -4 }}
              key={i} 
              className="group relative p-6 bg-zinc-900/20 hover:bg-zinc-900/50 transition-all duration-300 border border-zinc-800/60 hover:border-emerald-900/50 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] rounded-xl flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-zinc-200 transition-colors duration-300 group-hover:text-emerald-400 pr-4">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2.5 shrink-0">
                  {project.githubRepo && (
                    <a href={project.githubRepo} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors md:cursor-pointer" aria-label="GitHub Repository">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.href !== "#" && (
                    <a href={project.href} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors md:cursor-pointer" aria-label="Project Link">
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Dynamic stats badge line */}
              <div className="flex items-center gap-3 mb-4 text-xs font-mono text-zinc-500">
                {project.language && (
                  <span className="flex items-center gap-1.5 mr-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(project.language)}`} />
                    <span className="text-zinc-400 text-xs font-sans font-medium">{project.language}</span>
                  </span>
                )}
                {project.stars !== undefined && project.stars > 0 && (
                  <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                    {project.stars}
                  </span>
                )}
                {project.forks !== undefined && project.forks > 0 && (
                  <span className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-sky-500" />
                    {project.forks}
                  </span>
                )}
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[12px] font-mono px-2 py-1 bg-zinc-950/50 text-zinc-500 border border-transparent group-hover:border-zinc-800/50 transition-colors duration-300 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
