import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MetadataConfig, ResumeConfig, DEFAULT_METADATA, DEFAULT_RESUME, fetchMetadata, fetchResumeMetadata } from '../utils/metadata';

interface MetadataContextType {
  metadata: MetadataConfig;
  resume: ResumeConfig;
  isLoading: boolean;
}

const MetadataContext = createContext<MetadataContextType>({
  metadata: DEFAULT_METADATA,
  resume: DEFAULT_RESUME,
  isLoading: true
});

export function MetadataProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] = useState<MetadataConfig>(DEFAULT_METADATA);
  const [resume, setResume] = useState<ResumeConfig>(DEFAULT_RESUME);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const [appData, resumeData] = await Promise.all([
        fetchMetadata(),
        fetchResumeMetadata()
      ]);
      if (active) {
        setMetadata(appData);
        setResume(resumeData);
        setIsLoading(false);
        if (appData.name) {
          document.title = `${appData.name} - Portfolio & CV`;
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <MetadataContext.Provider value={{ metadata, resume, isLoading }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  return useContext(MetadataContext);
}

