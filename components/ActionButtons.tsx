import { Mic, MicOff, Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  isRecording: boolean;
  toggleRecording: () => void;
  isGenerating: boolean;
  handleGenerate: () => void;
}

export default function ActionButtons({
  isRecording, toggleRecording,
  isGenerating, handleGenerate
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={toggleRecording}
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors bg-[#82bdf9] hover:bg-[#72b4fc] dark:bg-[#7570f7] dark:hover:bg-[#6a65ff] cursor-pointer"
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? <MicOff className="text-white" size={24} /> : <Mic className="text-white" size={24} />}
      </button>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="grow rounded-md text-white font-medium transition-colors flex items-center justify-center bg-[#8ec7fc] hover:bg-[#7abcfb] dark:bg-[#7570f7] dark:hover:bg-[#6a65ff] cursor-pointer"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Generating...
          </span>
        ) : (
          'Generate Files'
        )}
      </button>
    </div>
  );
}
