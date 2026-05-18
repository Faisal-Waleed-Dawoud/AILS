"use client";

import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import OptionsForm from '../components/OptionsForm';
import ActionButtons from '../components/ActionButtons';
import GeneratedFileBanner from '../components/GeneratedFileBanner';
import { generateSummary } from '@/lib/utils/genai';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer"
import {
  Document as docxDocument,
  Packer,
  Paragraph,
  TextRun,
} from "docx"
import { CircleXIcon } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("")
  const [error, setError] = useState(false)
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [type, setType] = useState('MCQs');
  const [format, setFormat] = useState('docx');
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
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
        return err
      }
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please enter some text or use voice recording first.");
      return;
    }

    setIsGenerating(true);
    setGeneratedFile(null);
    const { title, summary, status } = await generateSummary(text, type, difficulty)

    if (status === 400) {
      setError(true);
      setGeneratedFile(null);
      setIsGenerating(false);
    }

    if (format === "pdf") {

      const styles = StyleSheet.create({
        page: {
          padding: 30,
        },
        title: {
          fontSize: 20,
          marginBottom: 20,
          color: "#51a2ff",
          textAlign: "center",
        },
        body: {
          fontSize: 14,
          lineHeight: 1.5,
        },
      })

      const file = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.body}>
              {summary}
            </Text>
          </Page>
        </Document>
      )

      const blob = await pdf(file).toBlob()
      setPdfUrl(URL.createObjectURL(blob))


    } else if (format === "docx") {

      const doc = new docxDocument({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    color: "#51a2ff",
                    font: "Arial",
                    bold: true,
                    size: 40,
                  }),
                ],
                alignment: "center",
              }),

              ...summary.split("\n").map((text) => {
                return new Paragraph({
                  children:[
                    new TextRun({
                      text: text,
                      size:24,
                      font:"Arial",
                    })
                  ]
                })
              })
            ],
          },
        ],
      })

      const blob = await Packer.toBlob(doc)
      setPdfUrl(URL.createObjectURL(blob))

    }

    setGeneratedFile({ name: title, format });
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen overflow-hidden py-10 transition-colors duration-300 font-sans flex flex-col justify-center items-center relative bg-[#cde4fb] dark:bg-[#292f44]">
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
          generatedFile={generatedFile} isGenerating={isGenerating} url={pdfUrl}
        />

        <div 
          className={`fixed flex gap-2 items-center bottom-6 right-6 p-4 shadow-xl transition-all duration-500 ease-out z-50 rounded-lg bg-red-500 text-white font-semibold border border-red-400 ${error ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
        >
          <CircleXIcon />
          <p>Something went wrong!</p>
        </div>
      </div>
    </div>
  );
}
