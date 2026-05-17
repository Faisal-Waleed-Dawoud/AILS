import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function ThemeToggle({ isDarkMode, setIsDarkMode }: ThemeToggleProps) {
  return (
    <div className="absolute top-6 right-6">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="w-10 h-10 bg-white rounded-full cursor-pointer flex items-center justify-center shadow-md transition-transform hover:scale-105"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={20} color="#6a65ff" /> : <Moon size={20} color="#000" />}
      </button>
    </div>
  );
}
