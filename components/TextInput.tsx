interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

export default function TextInput({ text, setText }: TextInputProps) {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full h-32 p-3 mb-6 border rounded-md resize-none focus:outline-none transition-colors bg-white border-gray-200 text-black focus:border-[#88c2fb] dark:bg-[#131520] dark:border-[#31374a] dark:text-white dark:focus:border-[#6a65ff]"
    />
  );
}
