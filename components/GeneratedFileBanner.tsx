import { FileText, Download } from 'lucide-react';
import Link from 'next/link';

interface GeneratedFileBannerProps {
  generatedFile: { name: string; format: string } | null;
  isGenerating: boolean;
  url: string
}

export default function GeneratedFileBanner({
  generatedFile, isGenerating, url
}: GeneratedFileBannerProps) {
  if (!generatedFile || isGenerating) return null;

  return (
    <Link href={url} download={`${generatedFile.name}.${generatedFile.format}`} className="mt-6 p-4 rounded-md flex items-center justify-between border transition-all duration-500 translate-y-0 opacity-100 bg-[#eef5fd] border-[#d4e7f9] dark:bg-[#131520] dark:border-[#31374a]">
      <div className="flex items-center gap-3">
        <FileText className={generatedFile.format === 'pdf' ? 'text-red-500' : 'text-blue-500'} size={24} />
        <span className="font-medium truncate max-w-50 sm:max-w-md text-sm text-gray-800 dark:text-gray-200">
          {generatedFile.name}
        </span>
      </div>
      <button className="p-2 rounded-md transition-colors hover:bg-[#dcecfe] text-blue-700 dark:hover:bg-[#31374a] dark:text-gray-300">
        <Download size={20} />
      </button>
    </Link>
  );
}
