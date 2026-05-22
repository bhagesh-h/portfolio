import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Youtube, Link as LinkIcon } from 'lucide-react';
import { useMetadata } from '../context/MetadataContext';

const CustomXIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
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
    strokeWidth="2" 
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function Hero() {
  const { metadata } = useMetadata();
  const designations = metadata.designations;

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    if (designations.length === 0) return;
    
    let timer: NodeJS.Timeout;
    const currentWord = designations[currentWordIdx] || designations[0] || "";

    const handleType = () => {
      if (!isDeleting) {
        // Typing forward
        const nextText = currentWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        setSpeed(80);

        if (nextText === currentWord) {
          // Pause at end of full word
          setSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        const nextText = currentWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        setSpeed(40);

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % designations.length);
          setSpeed(400); // Pause before next word typing starts
        }
      }
    };

    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, speed, designations]);

  return (
    <section className="pt-10 pb-8 sm:pt-14 sm:pb-10">
      <div className="max-w-3xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          
          <motion.h1 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-[1.25] mb-6">
            Turning biological chaos into clinical clarity.
          </motion.h1>
          
          <motion.p variants={item} className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-light max-w-2xl min-h-[140px] sm:min-h-[120px]">
            Hi, I'm <span className="text-zinc-200 font-medium">{metadata.name}</span>, a{" "}
            <span className="text-emerald-400 font-mono font-medium border-r border-emerald-500/80 pr-1 whitespace-nowrap">
              {currentText}
            </span>
            .
            <span className="block mt-4">
              {metadata.portfolio_bio || "I build scalable bioinformatics pipelines, analyze multi-omics data, and apply machine learning to uncover the mechanisms of complex diseases."}
            </span>
          </motion.p>

          {/* Socials circled with a green handwriting loop and custom caption */}
          <motion.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-4 text-center w-full max-w-xl mx-auto">
            <div className="relative inline-flex items-center px-6 py-3">
              {/* Overlapping twin-loop stroke */}
              <svg 
                className="absolute -inset-y-3 -inset-x-5 w-[calc(100%+2.5rem)] h-[calc(100%+1.5rem)] pointer-events-none text-emerald-400/90" 
                viewBox="0 0 340 75" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                preserveAspectRatio="none"
              >
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, ease: "easeInOut", delay: 0.9 }}
                  d="M 12 37 C 12 12, 328 10, 328 37 C 328 64, 16 63, 14 39 C 14 22, 215 13, 310 21" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              
              <div className="flex items-center gap-6 relative z-10">
                {metadata.socials.map((link) => {
                  const Icon = getSocialIcon(link.id);
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.25, rotate: [0, -4, 4, 0] }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white hover:text-emerald-400 transition-colors duration-200 p-1 md:cursor-pointer"
                      aria-label={link.label}
                    >
                      <Icon className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="font-hand text-2xl sm:text-3xl text-emerald-400/95 tracking-wider select-none -rotate-1 origin-center mt-3 filter drop-shadow-[0_2px_4px_rgba(16,185,129,0.15)] leading-tight"
            >
              obsessed with the same problem ? <br /> lets connect here!
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

