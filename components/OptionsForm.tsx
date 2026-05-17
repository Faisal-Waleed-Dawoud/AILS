interface OptionsFormProps {
  difficulty: string;
  setDifficulty: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  format: string;
  setFormat: (val: string) => void;
}

export default function OptionsForm({
  difficulty, setDifficulty,
  type, setType,
  format, setFormat
}: OptionsFormProps) {
  const selectClass = "w-full p-2 border rounded focus:outline-none text-[13px] transition-colors bg-white border-gray-200 text-black focus:border-[#88c2fb] dark:bg-[#131520] dark:border-[#31374a] dark:text-white dark:focus:border-[#6a65ff]";
  const labelClass = "text-[13px] mb-1.5 text-black dark:text-white";

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="flex flex-col">
        <label className={labelClass}>Questions-Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={selectClass}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>Questions Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          <option value="MCQs">MCQs</option>
          <option value="Written">Written</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>Files Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className={selectClass}>
          <option value="Word">Word</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
    </div>
  );
}
