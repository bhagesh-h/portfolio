import { useMetadata } from '../context/MetadataContext';

export function Footer() {
  const { metadata } = useMetadata();

  return (
    <footer className="py-8 mt-10 border-t border-zinc-900 border-dashed">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-mono">
        <p>© {new Date().getFullYear()} {metadata.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
