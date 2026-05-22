import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X, Youtube, Link as LinkIcon } from 'lucide-react';
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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { metadata } = useMetadata();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1c1c1e]/60 backdrop-blur-md border-b border-zinc-900 w-full transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-3xl sm:text-4xl font-sans tracking-tighter font-extrabold text-white uppercase select-none">
              {metadata.name.split(' ').map(n => n[0]).join('')}
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden sm:flex items-center gap-6"
          >
            {metadata.socials.map((link) => {
              const Icon = getSocialIcon(link.id);
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-emerald-400 transition-colors duration-300 md:cursor-pointer p-1"
                  aria-label={link.label}
                >
                  <Icon className="w-6.5 h-6.5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Mobile hamburger menu */}
          <div className="sm:hidden flex items-center">
            <button
              id="mobile_menu_toggle"
              onClick={() => setIsOpen(true)}
              className="text-zinc-400 hover:text-zinc-100 p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/10 md:cursor-pointer transition-colors"
              aria-label="Open Social Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide and Overlay Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop cover */}
            <motion.div
              id="drawer_backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm sm:hidden"
            />

            {/* Slideout right sidebar */}
            <motion.div
              id="mobile_sidebar_drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#1c1c1e] border-l border-zinc-900 p-6 flex flex-col justify-between sm:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-zinc-900">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Connect</span>
                  <button
                    id="close_sidebar_btn"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-100 border border-zinc-800 rounded bg-zinc-950/20 md:cursor-pointer"
                    aria-label="Close Social Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-5 pt-2">
                  {metadata.socials.map((link) => {
                    const Icon = getSocialIcon(link.id);
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-16 h-16 text-white hover:text-emerald-400 hover:border-emerald-900/40 hover:bg-emerald-950/10 transition-all duration-300 border border-zinc-900 bg-zinc-950 rounded-2xl"
                        aria-label={link.label}
                      >
                        <Icon className="w-8 h-8" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="text-[12px] font-mono text-zinc-500 text-center border-t border-zinc-900 pt-6">
                {metadata.name} • Bioinformatician
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
