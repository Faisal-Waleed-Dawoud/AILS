"use client";

import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import OptionsForm from '../components/OptionsForm';
import ActionButtons from '../components/ActionButtons';
import GeneratedFileBanner from '../components/GeneratedFileBanner';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [type, setType] = useState('MCQs');
  const [format, setFormat] = useState('Word');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<{ name: string, format: string } | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const theme = window.localStorage.getItem("theme")
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem("theme", "light")
    }
  }, [isDarkMode]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }

        if (finalTranscript) {
          setText((prev) => prev + finalTranscript);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition API is not supported in this browser. Try using Chrome.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      alert("Please enter some text or use voice recording first.");
      return;
    }

    setIsGenerating(true);
    setGeneratedFile(null);


  };

  return (
    <div className="min-h-screen py-10 transition-colors duration-300 font-sans flex flex-col justify-center items-center relative bg-[#cde4fb] dark:bg-[#292f44]">
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="w-full max-w-lg p-8 rounded-lg flex flex-col transition-colors duration-300 bg-white shadow-lg border-0 dark:bg-[#1b2031] dark:border dark:border-[#6a65ff] dark:shadow-[0_0_15px_rgba(106,101,255,0.4)]">
        <Header />

        <TextInput text={text} setText={setText} />

        <OptionsForm
          difficulty={difficulty} setDifficulty={setDifficulty}
          type={type} setType={setType}
          format={format} setFormat={setFormat}
        />

        <ActionButtons
          isRecording={isRecording} toggleRecording={toggleRecording}
          isGenerating={isGenerating} handleGenerate={handleGenerate}
        />

        <GeneratedFileBanner
          generatedFile={generatedFile} isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
